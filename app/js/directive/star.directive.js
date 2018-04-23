(() => {
    "use strict";

    const app = angular.module("MovieRate");

    app.directive("starRating", starRating);

    starRating.$inject = ["MovieJSONData"];

    /**
     * Directive for Star Widget
     * @param  {[type]} MovieJSONData [description]
     * @return {[type]}               [description]
     */

    function starRating(MovieJSONData) {
        const ddo = {
            restrict: "A",
            templateUrl: "views/StarRating.directive.html",
            scope: {
                ratingValue: "=",
                movieId: "=",
                onRatingSelected: "&",
                date: "=",
                check: "="
            },
            link: link
        };

        function link(scope, elem, attrs) {
            let updateStars = () => {
                scope.stars = [];
                for (let i = 0; i < 5; i++) {
                    scope.stars.push({
                        filled: i < scope.ratingValue
                    });
                }
            };

            /**
             * Function which updates the stars
             * @param  {[type]} index [description]
             * @return {[type]}       [description]
             */
            scope.toggle = index => {
                scope.ratingValue = index + 1;
                scope.onRatingSelected({
                    rating: index + 1,
                    id: scope.movieId
                });
            };

            scope.$watch("ratingValue", (oldVal, newVal) => {
                if (newVal) {
                    updateStars();
                }
            });
        }

        return ddo;
    }
})();
