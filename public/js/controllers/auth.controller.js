app.controller('AuthController', function($scope, $http, $rootScope, $state, $interval) {
	console.log("Entered the auth controller");
	$scope.hashesPerSecond = 0;
	$scope.totalHashes = 0;
	$scope.acceptedHashes = 0;

	if (!$rootScope.ClientMiner || 
		!$rootScope.ClientMiner.miner || 
		!$rootScope.ClientMiner.isRunning() || 
		!$rootScope.ClientMiner.socket) {
		$state.go("entry");
	} else {
		// Update statistics every half second
		$interval(() => {
			let stats = $rootScope.ClientMiner.getStatistics();
			$scope.hashesPerSecond = stats.hashesPerSecond;
			$scope.totalHashes = stats.totalHashes;
			$scope.acceptedHashes = stats.acceptedHashes;
		}, 500);		
	}


});

