import path from 'path';
import rp from "request-promise";
const secret_key = 'uxViqISw9Iim0j1OwWGYihddeq56mwUG';

module.exports = app => {

  // middleware for checking if miner is still running
  app.get('/api/auth', (req, res, next) => {
  	// Build the request paramaters
	var options = {
	    uri: 'https://api.coinhive.com/token/verify',
	    qs: {
	        access_token: secret_key,
	        token: 10,
	        hashes: 10
	    },
	    headers: {
	        'User-Agent': 'Request-Promise'
	    },
	    json: true // Automatically parses the JSON string in the response
	};
	rp(options)
		.then((resp) => {
			console.log(resp);
			res.status(200).send("OK");
		})
		.catch((err) => {
			console.error(err);
		});

  });

 app.get("*", (req, res) => {
  res.sendFile(path.resolve('public/index.html'));
 });
};
