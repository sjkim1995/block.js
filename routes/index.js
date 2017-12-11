import path from 'path';

module.exports = app => {

	// // middleware for checking if miner is still running
 //  app.use('/auth*', (req, res, next) => {
 //  	const io = app.get('socketio');
 //  	// on successful response, forward the request to the next uri
 //  	io.on('connection', (socket) => {
 //      console.log("Socket handsake established");
 //    // 	check whether client is still mining
 //  		socket.emit('isMining', {foo: "bar"}, (resp, err) => {
 //        if (err) {
 //          return res.redirect("/");
 //        } else {
 //          console.log(resp);
 //          next();
 //        }
 //      });
 //  	});  	
 //  });

 app.get("*", (req, res) => {
  res.sendFile(path.resolve('public/index.html'));
 });

  // app.get('/', (req, res) => {
  //   res.render('../views/entrypoint');
  // });

  // app.get('/auth', (req, res) => {
  //   res.render('../views/index');
  // });

  // app.get('/auth/boilerplate', (req, res) => {
  // 	res.render('../views/boilerplate');
  // });

};
