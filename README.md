#Block.js: Client-side Monero Miner

A boilerplate using NodeJs, Express, and Angular.

## Getting up and running

1. Clone the repository: git clone https://github.com/sjkim1995/block.js
2. Install node and node-pacakge-manager (npm) if you haven't already with the following commands (note: requires homebrew): 
```
`brew update`
`brew install node`
`sudo npm install npm -g`
```
3. `npm install`
4. `npm run dev`
5. Visit `https://localhost:3000`
6. Visit `https://localhost:3000/apidoc` to see the existing API

## Coding Style

The coding style used is the airbnb one: https://github.com/airbnb/javascript

You can configure it in the `.eslintrc` file.

## Architecture

The architecture is MVR (Model View Route)

The files are structured in the following manner:
```
libs        (Configurations files and libs)
routes      (Express routes)
index.js    (Entry point)
ntask.*     (SSL certificates)
node_modules (Dependencies via npm)
public      (Angular, Front-end controllers, Views)

```

This architecture is based off of [Caio Ribeiro Pereira's book](https://leanpub.com/building-apis-with-nodejs).

## Credit

This project is based on [the book of Caio Ribeiro Pereira](https://leanpub.com/building-apis-with-nodejs) and [his repository](https://github.com/caio-ribeiro-pereira/building-apis-with-nodejs) so, all the credit goes to him. Also, I recommend you his book.
