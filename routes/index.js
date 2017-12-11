import path from 'path';
import rp from "request-promise";
const secret_key = 'uxViqISw9Iim0j1OwWGYihddeq56mwUG';

module.exports = app => {

  // middleware for checking if miner is still running
  app.post('/api/auth', (req, res, next) => {
  	const token = req.body.token;
  	// Build the request paramaters
	var options = {
		method: "POST",
	    uri: 'https://api.coinhive.com/token/verify',
	    params: {
	        secret: secret_key,
	        token: token,
	        hashes: 1000*256
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
