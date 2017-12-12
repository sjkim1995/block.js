import path from 'path';
import request from "request";
const secret_key = 'L759bZPzJgPFFLdyWy7Tz4MkMcYuPFlr';

module.exports = app => {

  // middleware for checking if miner is still running
  app.use('/api/auth', (req, res, next) => {
  	const user = req.body.user;

  request.get('https://api.coinhive.com/user/balance', {secret: secret_key, name: 'ballz'}, (err, resp, body) => {
  	console.log(body);
  });

  
 });



 app.get("*", (req, res) => {
  res.sendFile(path.resolve('public/index.html'));
 });
};
