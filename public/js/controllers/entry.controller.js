app.controller('EntryController', function($scope, $http, $rootScope, $state, ClientMiner) {
	if (!$rootScope.ClientMiner) {
		$rootScope.ClientMiner = ClientMiner;
	} 
	// Check if the miner has not been initialized
	if (!$rootScope.ClientMiner.miner) {
		$rootScope.ClientMiner.setMiner();
	}

    $scope.enterAuth = function() {
    	// Start mining
    	!$rootScope.ClientMiner.isRunning() ? $rootScope.ClientMiner.startMining() : null; 
        $state.go("auth.home");
    }
});

