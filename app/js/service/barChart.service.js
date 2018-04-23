(() => {
    "use strict";

    const app = angular.module("MovieRate");

    app.service("BarChartService", BarChartService);

    BarChartService.$inject = ["MovieJSONData"];

    /**
     *  A service to draw the graph and keep updating it every time rating of any movie is changed.
     * @param       {[type]} MovieJSONData [description]
     * @constructor
     */

    function BarChartService(MovieJSONData) {
        let chart = this;
        /**
         * Function to draw the Graph
         * @param  {[type]} data [description]
         * @return {[type]}      [description]
         */
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
