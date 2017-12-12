app.config(function($stateProvider, $urlRouterProvider) {
    // Always redirect hard page loads (refreshes) to root
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state("entry", {
            url: "/",
            templateUrl: "../views/entry.html",
            controller: 'EntryController'
        })
        .state("auth", {
            abstract: true,
            url: "/auth",
            templateUrl: "../views/auth/index.html",
            controller: 'AuthController'
        })
        .state("auth.home", {
            url: "",
            templateUrl: "../views/auth/home.html",
            controller: 'HomeController'
        })
        .state("auth.about", {
            url: "/about",
            templateUrl: "../views/auth/about.html",
            controller: 'AboutController'
        })
        .state("auth.docs", {
            url: "/docs",
            templateUrl: "../views/auth/boilerplate.html",
            controller: 'DocController'
        });
});

