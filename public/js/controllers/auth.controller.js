app.controller('AuthController', function($scope, $http, $rootScope, $state, $interval) {
	$scope.hashesPerSecond = 0;
	$scope.totalHashes = 0;
	$scope.acceptedHashes = 0;
	
	function checkAuth() {
		if (!$rootScope.ClientMiner || 
			!$rootScope.ClientMiner.miner || 
			!$rootScope.ClientMiner.user ||
			!$rootScope.ClientMiner.isRunning()) {
				return false;
		} else return true;
	}

	if (!checkAuth()) {
		$state.go("entry");
	} 
	$scope.changeState = function(state) {
		// Update statistics every half second
		$http.post('/api/auth', {
		    user: $rootScope.ClientMiner.getUser()
		}).then((resp) => {
			console.log(resp);
		 	if (resp.status == 200) {
		 		$state.go(state);
		 	} else {
		 		$state.go('entry');
		 	}
		 }).catch((err) => {
		 	console.log(err);
		 });
	}
});

app.controller('HomeController', function($scope, $http, $rootScope, $state, $interval) {
	$scope.conversionRate = 0.00009248;
	function checkAuth() {
		if (!$rootScope.ClientMiner || 
			!$rootScope.ClientMiner.miner || 
			!$rootScope.ClientMiner.user ||
			!$rootScope.ClientMiner.isRunning()) {
				return false;
		} else return true;
	}
	if (!checkAuth()) {
		$state.go("entry");
	} else {
		$interval(() => {
			let stats = $rootScope.ClientMiner.getStatistics();
			$scope.hashesPerSecond = stats.hashesPerSecond;
			$scope.totalHashes = stats.totalHashes;
			$scope.acceptedHashes = stats.acceptedHashes;
		}, 500);

		function setMoneroPrice() {
			$http.get('https://api.coinmarketcap.com/v1/ticker/monero/')
				.then((resp) => {
					$scope.XMR_price = resp.data[0].price_usd;
				})
				.catch((err) => {
					console.log(err);
				})
		}

		setMoneroPrice();

		// Update Monero price
		$interval(setMoneroPrice, 10000);

		$scope.numThreads = $rootScope.ClientMiner.getNumThreads();
		$rootScope.status = $rootScope.ClientMiner.isRunning();	

		$scope.toggleMiner = function() {
			// Toggle the state of the front-end indicator
			$rootScope.status = !$rootScope.status;
			if (!$rootScope.ClientMiner.isRunning()) {
				$rootScope.ClientMiner.startMining();
				$scope.numThreads = $rootScope.ClientMiner.getNumThreads();
			} else {
				$rootScope.ClientMiner.pauseMiner();
				$scope.numThreads = 0;
			}
		}

		$scope.changeNumThreads = function(up) {
			let threads = $rootScope.ClientMiner.getNumThreads();
			// Check that num threads is not at a boundary
			if ((threads <= 0 && !up) || (threads >= 8 && up)) {
				return;
			} else {
				if (up) threads ++;
				else threads--;

				// set the threads
				$rootScope.ClientMiner.setNumThreads(threads);
				$scope.numThreads = $rootScope.ClientMiner.getNumThreads();
			}
		}
	}
});

app.controller('DocController', function($scope, $http, $rootScope, $state, $interval) {
	function checkAuth() {
		if (!$rootScope.ClientMiner || 
			!$rootScope.ClientMiner.miner || 
			!$rootScope.ClientMiner.user ||
			!$rootScope.ClientMiner.isRunning()) {
				return false;
		} else return true;
	}

	if (!checkAuth()) {
		$state.go("entry");
	}
});

