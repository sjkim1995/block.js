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

