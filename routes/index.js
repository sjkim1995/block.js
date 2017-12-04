module.exports = app => {


	// middleware for checking if miner is still running
  app.use('/', (req, res, next) => {
  	const io = app.get('socketio');
  	next();
  })

  app.get('/', (req, res) => {
    res.render('../views/index');
  });

  app.get('/boilerplate', (req, res) => {
  	res.render('../views/boilerplate');
  });

};
