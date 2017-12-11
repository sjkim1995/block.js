import https from 'https';
import fs from 'fs';

module.exports = app => {
  if (process.env.NODE_ENV !== 'test') {
    const credentials = {
      key: fs.readFileSync('ntask.key', 'utf8'),
      cert: fs.readFileSync('ntask.cert', 'utf8'),
    };
    app.db.sequelize.sync().done(() => {
      const server  = https.createServer(credentials, app);
      
      // attach socket io to the application
      const io = require('socket.io').listen(server);
      app.set("socketio", io);
      app.locals.openConnections = {};

      // on successful response, forward the request to the next uri
      io.on('connection', (socket) => {
        console.log("Connection established with ", socket.id);
        app.locals.openConnections[socket.id] = true
        socket.on('AuthRequest', (data, callback) => {
          callback("OK");
        });

        // Remove entry from the table on disconnect
        socket.on('disconnect', (socket) => {
          console.log("Socket has left the room");
          delete app.locals.openConnections[socket.id];
        });


      });

      
      // listen for requests on port 3000
      server.listen(app.get('port'), () => {
          console.log(`NTask API - Port ${app.get('port')}`);
      });
    });
  }
};
