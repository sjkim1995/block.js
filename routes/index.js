import path from 'path';

module.exports = app => {

  // middleware for checking if miner is still running
  app.get('/api/auth*', (req, res, next) => {
    const io = req.app.get('socketio');
    // TODO REGISTER SOCKET

    res.status(200).send("OK");
  });

 app.get("*", (req, res) => {
  res.sendFile(path.resolve('public/index.html'));
 });
};
