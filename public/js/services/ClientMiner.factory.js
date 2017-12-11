app.factory("ClientMiner", function(socketFactory) {

	ClientMiner = {};
	ClientMiner.socket = null;
	ClientMiner.miner = null;
	ClientMiner.found = 0;
	ClientMiner.accepted = 0;

	ClientMiner.getToken = function() {
		if (!this.miner) 
			throw new Error("Miner is not set. Call the setMiner() method");
		return this.miner.getToken();
	}

	// Instantiate a socket handshake with the server
	ClientMiner.openSocket = function() {
		var socket = io.connect("https://localhost:3000");
		SocketFactory = socketFactory({
			ioSocket: socket
		});

		this.socket = socketFactory();
	}


	// Close the miner's socket connection with the server
	ClientMiner.closeSocket = function() {
		if (this.socket) {
			this.socket.disconnect();
			this.socket = null;
		}
	}

	// Update statistics on mining every second
	ClientMiner.getStatistics = function() {
		return {
			hashesPerSecond: round(this.miner.getHashesPerSecond(), 2),
			totalHashes: this.miner.getTotalHashes(),
			acceptedHashes: this.miner.getAcceptedHashes()/256
		}
	}

	// Start mining
	ClientMiner.startMining = function() {
		if (!this.miner) {
			throw new Error("Miner is not set. Call the setMiner() method.");
		}
		this.miner.start();
	}

	// Instantiate the CoinHive Miner 
	ClientMiner.setMiner = function() {
		if (this.miner) {
			throw new Error("Miner is already set.");
		}

		this.miner = new CoinHive.Token('5x67Y2WJfAZWnsaOYn42BwKp56n126AX', 1000*256);
		
		// Callback for token once authed
		this.miner.on('authed', (params) => {
			this.token = this.miner.getToken();
		});

		// On successful hash
		this.miner.on('found', function() {
			this.found++;
		});

		// Hash accepted by the pool
		this.miner.on('accepted', function() {
			this.accepted++;
		});
	}

	// Pause mining
	ClientMiner.pauseMiner = function() {
		if (!this.miner) {
			throw new Error("Miner is not set. Call the setMiner() method.");
		} else if (!this.miner.isRunning()) {
			throw new Error("Miner is not running. Call the startMiner() method.");
		}
		this.miner.stop();
		this.socket.removeAllListeners("isMining");
	}

	// Returns whether or not the miner is still running
	ClientMiner.isRunning = function() {
		if (!this.miner) {
			return false;
		}
		return this.miner.isRunning();
	}

	// Helper function to round a value to a certain number of decimals
	function round(value, decimals) {
	  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
	}

	return ClientMiner;
});