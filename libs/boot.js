import https from 'https';
import fs from 'fs';
import http from 'http';

module.exports = app => {
  if (process.env.NODE_ENV !== 'test') {
    const credentials = {
      key: fs.readFileSync('ntask.key', 'utf8'),
      cert: fs.readFileSync('ntask.cert', 'utf8'),
    };

    const server = https.createServer(credentials, app);
    
    // Table to keep track of number of hashes that have been attempted by the user
    app.locals.bookkeeping = {}; 

    // listen for requests on port 3000
    server.listen(app.get('port'), () => {
        console.log(`NTask API - Port ${app.get('port')}`);
    });

  }
};
