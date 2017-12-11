app.controller('AuthController', function($scope, $http, $rootScope, $state, $interval) {
	$scope.hashesPerSecond = 0;
	$scope.totalHashes = 0;
	$scope.acceptedHashes = 0;
	console.log("here");
	if (!$rootScope.ClientMiner || 
		!$rootScope.ClientMiner.miner || 
		!$rootScope.ClientMiner.isRunning() || 
		!$rootScope.ClientMiner.socket) {
			$state.go("entry");
	} else {
		$http({
		    url: '/api/auth', 
		    method: "GET",
		    params: {token: $rootScope.ClientMiner.getToken()}
		 })
		 .then((resp) => {
		 	console.log(resp);
		 })
		 .catch((err) => {
		 	console.log(err);
		 })

		// Update statistics every half second
		$interval(() => {
			let stats = $rootScope.ClientMiner.getStatistics();
			$scope.hashesPerSecond = stats.hashesPerSecond;
			$scope.totalHashes = stats.totalHashes;
			$scope.acceptedHashes = stats.acceptedHashes;
		}, 500);		
	}


});

