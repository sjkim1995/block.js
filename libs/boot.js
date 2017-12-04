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
      const io = require('socket.io').listen(server);
      app.set("socketio", io);
      
      io.sockets.on('connection', (socket) => {
        console.log("socket handshake established");
      });

      server.listen(app.get('port'), () => {
          console.log(`NTask API - Port ${app.get('port')}`);
      });
    });
  }
};
