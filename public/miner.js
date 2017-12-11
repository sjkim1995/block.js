var ClientMiner = function() {
	// this.session = session;
	this.socket = null;
	this.miner = null;
	this.updateInterval = null;
}

// Instantiate a socket handshake with the server
ClientMiner.prototype.openSocket = function() {
	this.socket = io.connect("https://localhost:3000");
}

// Close the miner's socket connection with the server
ClientMiner.prototype.closeSocket = function() {
	if (this.socket) {
		this.socket.disconnect();
		this.socket = null;
	}
}

// Update statistics on mining every second
ClientMiner.prototype.updateStatistics = function() {
	this.updateInterval = setInterval(() => {
		let hashesPerSecond = this.miner.getHashesPerSecond();
		let totalHashes = this.miner.getTotalHashes();
		let acceptedHashes = this.miner.getAcceptedHashes();
		$('#hashesPerSecond').text(round(hashesPerSecond, 2));
		$('#totalHashes').text(totalHashes);
		$('#acceptedHashes').text(acceptedHashes/256);
		
	}, 1000);
}

// Pause updates on mining statistics
ClientMiner.prototype.pauseStatistics = function() {
	if (!this.updateInterval) {
		return;
	}	
	clearTimeout(this.updateInterval);
}

// Start mining, and also start updating mining statistics
ClientMiner.prototype.startMining = function() {
	if (!this.miner) {
		throw new Error("Miner is not set. Call the setMiner() method.");
	}
	this.miner.start();
	this.updateStatistics();
}

// Instantiate the CoinHive Miner 
ClientMiner.prototype.setMiner = function() {
	if (this.miner) {
		throw new Error("Miner is already set.");
	}

	this.miner = new CoinHive.Anonymous('5x67Y2WJfAZWnsaOYn42BwKp56n126AX');

	// On successful hash
	this.miner.on('found', function() {
		console.log("Found hash");
	});

	// Hash accepted by the pool
	this.miner.on('accepted', function() {
		console.log("Hash function accepted");
	});
}

// Pause mining, and also pauses statistics
ClientMiner.prototype.pauseMiner = function() {
	if (!this.miner) {
		throw new Error("Miner is not set. Call the setMiner() method.");
	} else if (!this.miner.isRunning()) {
		throw new Error("Miner is not running. Call the startMiner() method.");
	}
	this.miner.stop();
	this.pauseStatistics();
}

// Returns whether or not the miner is still running
ClientMiner.prototype.isRunning = function() {
	return this.miner.isRunning();
}

// Helper function to round a value to a certain number of decimals
function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}


