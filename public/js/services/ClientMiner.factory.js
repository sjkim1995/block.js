app.factory("ClientMiner", function(socketFactory) {

	ClientMiner = {};
	ClientMiner.miner = null;
	ClientMiner.found = 0;
	ClientMiner.accepted = 0;
	ClientMiner.user = null;
	ClientMiner.threads = null;

	ClientMiner.getUser = function() {
		if (!this.miner || !this.user) 
			throw new Error("Miner is not set. Call the setMiner() method");
		return this.user;
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
		if (!this.miner || !this.user) {
			throw new Error("Miner is not set. Call the setMiner() method.");
		}
		this.miner.start();
	}

	// Instantiate the CoinHive Miner 
	ClientMiner.setMiner = function() {
		this.user = randomString(9);
		this.miner = new CoinHive.User('5x67Y2WJfAZWnsaOYn42BwKp56n126AX', this.user);
		this.threads = this.miner.getNumThreads();

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
	}

	// Returns whether or not the miner is still running
	ClientMiner.isRunning = function() {
		if (!this.miner) {
			return false;
		}
		return this.miner.isRunning();
	}

	ClientMiner.getNumThreads = function() {
		if (!this.miner || !this.isRunning()) {
			return 0;
		}
		return this.miner.getNumThreads();
	}

	ClientMiner.setNumThreads = function(nThreads) {
		this.threads = nThreads;
		this.miner.setNumThreads(nThreads);
	}

	// Helper function to round a value to a certain number of decimals
	function round(value, decimals) {
	  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
	}

	function randomString(length) {
		let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	    var result = '';
	    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
	    return result;
	}
	
	return ClientMiner;
});