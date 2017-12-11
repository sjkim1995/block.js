app.controller('EntryController', function($scope, $http, $rootScope, $state, ClientMiner) {
	if (!$rootScope.ClientMiner) {
		$rootScope.ClientMiner = ClientMiner;
	} 
	// Check if the miner has not been initialized
	if (!$rootScope.ClientMiner.miner || !$rootScope.ClientMiner.socket) {
		$rootScope.ClientMiner.init();
	}

    $scope.enterAuth = function() {
    	// Start mining
    	!$rootScope.ClientMiner.isRunning() ? $rootScope.ClientMiner.startMining() : null;  
        console.log("here");
    	$http.get("/api/auth")
    		.then((resp) => {    			
    			$state.go('auth.home');
    		}).catch((err) => {
    			console.error(resp);
    		});
    }
});

