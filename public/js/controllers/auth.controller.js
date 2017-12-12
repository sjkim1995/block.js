app.controller('AuthController', function($scope, $http, $rootScope, $state, $interval) {
	$scope.hashesPerSecond = 0;
	$scope.totalHashes = 0;
	$scope.acceptedHashes = 0;
	if (!$rootScope.ClientMiner || 
		!$rootScope.ClientMiner.miner || 
		!$rootScope.ClientMiner.user ||
		!$rootScope.ClientMiner.isRunning()) {
			$state.go("entry");
	} else {
		// Update statistics every half second
		$http.post('/api/auth', {
		    user: $rootScope.ClientMiner.getUser()
		}).then((resp) => {
		 	console.log(resp);
		 }).catch((err) => {
		 	console.log(err);
		 })

		$interval(() => {
			let stats = $rootScope.ClientMiner.getStatistics();
			$scope.hashesPerSecond = stats.hashesPerSecond;
			$scope.totalHashes = stats.totalHashes;
			$scope.acceptedHashes = stats.acceptedHashes;
		}, 500);		
	}


});

