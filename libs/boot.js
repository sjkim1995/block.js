import https from 'https';
import fs from 'fs';

module.exports = app => {
  if (process.env.NODE_ENV !== 'test') {
    const credentials = {
      key: fs.readFileSync('ntask.key', 'utf8'),
      cert: fs.readFileSync('ntask.cert', 'utf8'),
    };

    const server  = https.createServer(credentials, app);
    
    // listen for requests on port 3000
    server.listen(app.get('port'), () => {
        console.log(`NTask API - Port ${app.get('port')}`);
    });

  }
};
