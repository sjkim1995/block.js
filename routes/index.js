import path from 'path';
import request from "request";
import moment from "moment";

const secret_key = 'L759bZPzJgPFFLdyWy7Tz4MkMcYuPFlr';

module.exports = app => {

  // middleware for checking if miner is still running
  app.use('/api/auth*', (req, res, next) => {
  	
  	// Parse params from request body
  	const user = req.body.user;
  	const baseUrl = 'https://api.coinhive.com/user/balance';
  	console.log(user);
	// Build params
	const options = {
		'url': baseUrl,
	  	'method': 'GET',
	  	'qs': {
	  		'secret': secret_key,
	  		'name': user
	  	},
	  	json: true
	}
	
	request.get(options, (err, response, body) => {
	  	if (!body.success) {
	  		res.status(400).send("Invalid Request");
	  	} else if (!(body.name in req.app.locals.bookkeeping)) {
	  		req.app.locals.bookkeeping[body.name] = {
	  			total: body.total,
	  			timestamp: moment()
	  		};
	  		res.status(200).send("OK");
	  	} else {
	  		if (body.total < req.app.locals.bookkeeping[body.name].total) {
	  			res.status(400).send("Miner is turned off");
	  		} else if (body.total == req.app.locals.bookkeeping[body.name].total) {
	  			// Check the time stamp
	  			const now = moment();
	  			const diff = now.diff(req.app.locals.bookkeeping[body.name].timestamp);
	  			if (diff > 60) {
	  				res.status(200).send("OK");
	  			} else {
	  				res.status(400).send("Miner is turned off");
	  			}
	  		} else {
	  			res.status(200).send("OK");
	  		}
	  	}
	  	res.end();
	});

 });



 app.get("*", (req, res) => {
  res.sendFile(path.resolve('public/index.html'));
 });
};
