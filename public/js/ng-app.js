(() => {
    "use strict";

    angular.module("MovieRate", ["ui.router", "googlechart"]);
})();

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

(() => {
    "use strict";

    const app = angular.module("MovieRate");

    app.controller("AppController", AppController);

    AppController.$inject = ["MovieJSONData", "BarChartService", "$timeout"];

    function AppController(MovieJSONData, BarChartService, $timeout) {
        let application = this;
        application.row_selected = false;
        application.row = 100;
        MovieJSONData.initData();
        application.data = MovieJSONData.getJSON();
        application.ratings = MovieJSONData.getStars();

        $timeout(() => {
            application.myobj = BarChartService.drawGraph();
        }, 1000);

        application.getSelectedRating = (rating, id) => {
            MovieJSONData.setJSON(rating, id);
            application.data = MovieJSONData.showSelectedData(
                application.row,
                application.row_selected
            );
            application.ratings = MovieJSONData.getStars();
            application.myobj = BarChartService.drawGraph();
        };

        application.SortByName = () => {
            application.data = MovieJSONData.getSortedDataByName(
                application.row,
                application.row_selected
            );
        };

        application.SortByDate = () => {
            application.data = MovieJSONData.getSortedDataByDate(
                application.row,
                application.row_selected
            );
        };

        application.selectHandler = selectedItem => {
            application.row = selectedItem.row;
            application.row_selected = true;
            application.data = MovieJSONData.showSelectedData(
                application.row,
                application.row_selected
            );
        };

        application.FilterRemove = () => {
            application.row_selected = false;
            application.data = MovieJSONData.showSelectedData(
                application.row,
                application.row_selected
            );
        };
    }
})();

(() => {
    "use strict";

    const app = angular.module("MovieRate");

    app.service("MovieJSONData", MovieJSONData);

    MovieJSONData.$inject = ["$http"];

    function MovieJSONData($http) {
        const data = this;
        let JSONdata = new Array();
        let Stars = new Array();

        data.initData = () => {
            const url = "data/movies.json";
            $http
                .get(url)
                .then(response => {
                    response.data.forEach(obj => {
                        JSONdata.push(obj);
                        let temp_obj = {};
                        temp_obj[obj["id"]] = obj["rating"];
                        Stars.push(temp_obj);
                    });
                })
                .catch(error => {
                    console.log(error);
                });
        };

        data.setJSON = (value, id) => {
            console.log(JSONdata);
            for (let i = 0; i < JSONdata.length; i++) {
                let object = JSONdata[i];
                let object2 = Stars[i];
                if (object["id"] === id.toString()) {
                    object["rating"] = value.toString();
                    object2[id] = value.toString();
                }
            }
        };

        data.getJSON = () => {
            return JSONdata;
        };

        data.getStars = () => {
            return Stars;
        };

        data.getSortedDataByName = (rating, filter) => {
            let object = [];
            if (!filter) {
                object = JSONdata;
            } else {
                for (let i = 0; i < JSONdata.length; i++) {
                    if (JSONdata[i]["rating"] === rating.toString()) {
                        object.push(JSONdata[i]);
                    }
                }
            }
            object.sort((a, b) => {
                if (a.title < b.title) return -1;
                if (a.title > b.title) return 1;
                return 0;
            });
            return object;
        };

        data.getSortedDataByDate = (rating, filter) => {
            let object = [];
            if (!filter) {
                object = JSONdata;
            } else {
                for (let i = 0; i < JSONdata.length; i++) {
                    if (JSONdata[i]["rating"] === rating.toString()) {
                        object.push(JSONdata[i]);
                    }
                }
            }
            object.sort((a, b) => {
                if (a.releaseDate < b.releaseDate) return -1;
                if (a.releaseDate > b.releaseDate) return 1;
                return 0;
            });
            return object;
        };

        data.getStarCount = () => {
            let rating_count = {
                "0": 0,
                "1": 0,
                "2": 0,
                "3": 0,
                "4": 0,
                "5": 0
            };
            for (let i = 0; i < JSONdata.length; i++) {
                rating_count[JSONdata[i]["rating"]] += 1;
            }
            return rating_count;
        };

        data.showSelectedData = (rating, filter) => {
            if (!filter) {
                return JSONdata;
            }
            let object = [];
            for (let i = 0; i < JSONdata.length; i++) {
                if (JSONdata[i]["rating"] === rating.toString()) {
                    object.push(JSONdata[i]);
                }
            }
            return object;
        };
    }
})();

(() => {
    "use strict";

    const app = angular.module("MovieRate");

    app.directive("starRating", starRating);

    starRating.$inject = ["MovieJSONData"];

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

(() => {
    "use strict";

    const app = angular.module("MovieRate");

    app.service("BarChartService", BarChartService);

    BarChartService.$inject = ["MovieJSONData"];

    function BarChartService(MovieJSONData) {
        let chart = this;

        chart.drawGraph = data => {
            let object = {};
            let ratings = MovieJSONData.getStarCount();
            console.log(ratings);
            object.type = "ColumnChart";
            let onions = (object.data = {
                cols: [
                    { id: "t", label: "Rating", type: "string" },
                    { id: "s", label: "Count", type: "number" }
                ],
                rows: [
                    {
                        c: [{ v: "Not Rated" }, { v: ratings[0] }]
                    },
                    {
                        c: [{ v: "1 Star" }, { v: ratings[1] }]
                    },
                    { c: [{ v: "2 Stars" }, { v: ratings[2] }] },
                    {
                        c: [{ v: "3 Stars" }, { v: ratings[3] }]
                    },
                    {
                        c: [{ v: "4 Stars" }, { v: ratings[4] }]
                    },
                    {
                        c: [{ v: "5 Stars" }, { v: ratings[5] }]
                    }
                ]
            });

            return object;
        };
    }
})();
