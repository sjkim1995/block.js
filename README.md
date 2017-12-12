## Block.js: Client-side Monero Miner

A boilerplate using Node.js, Express, and Angular. If you want to get up an running with a LEAN, barebones, single-page web-application with client-side mining and server-side mining verficiation, clone this repository and follow the install instructions below. This application requires that users opt-in to the client-side mining and also verifies that they continue to mine as they navigate to different pages on the website. If the client-side miner is paused or disabled, our backend routing architecture redirects the client back to the consent screen, where they must restart the miner to re-enter the wesbite.

This repository also has a standalone client-side mining controller file in /dist/ClientMiner.js. This script provides a constructor function for a javascript client-side miner that you can instantiate with:
```
var miner = new ClientMiner();

```

You can include the standalone script in a project and begin the methods on the ClientMiner() constructor right out of the box, but you must include the following script before including the ClientMiner.js file:

```
<script src="https://coinhive.com/lib/coinhive.min.js"></script>

```

The ClientMiner.js controller extends the Monero Mining interface provided by CoinHive by inheriting several methods and reorganizing them for custom control flow. 

## Getting up and running

1. Clone the repository: git clone https://github.com/sjkim1995/block.js
2. Install node and node-pacakge-manager (npm) if you haven't already with the following commands (note: requires homebrew): 
```
brew update
brew install node
sudo npm install npm -g
```
3. `npm install`
4. `npm run dev`
5. Visit `https://localhost:3000`

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
