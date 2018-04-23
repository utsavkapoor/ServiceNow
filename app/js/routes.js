(() => {
    "use strict";

    const app = angular.module("MovieRate");
    app.config(RouterConfig);
    RouterConfig.$inject = ["$stateProvider", "$urlRouterProvider"];

    function RouterConfig($stateProvider, $urlRouterProvider) {
        // Default
        $urlRouterProvider.otherwise("/");

        $stateProvider.state("/", {
            url: "/",
            templateUrl: "views/home.html",
            controller: "AppController as controller1"
        });
    }
})();
