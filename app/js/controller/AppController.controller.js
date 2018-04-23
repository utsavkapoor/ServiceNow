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

        /**
         * Function called when any rating is updated. The controller calls the data service to update the data and eventually update the view.
         * @param  {[type]} rating [description]
         * @param  {[type]} id     [description]
         * @return {[type]}        [description]
         */

        application.getSelectedRating = (rating, id) => {
            MovieJSONData.setJSON(rating, id);
            application.data = MovieJSONData.showSelectedData(
                application.row,
                application.row_selected
            );
            application.ratings = MovieJSONData.getStars();
            application.myobj = BarChartService.drawGraph();
        };

        /**
         * Function calls the service to get the sorted data by Name and updates the view
         */

        application.SortByName = () => {
            application.data = MovieJSONData.getSortedDataByName(
                application.row,
                application.row_selected
            );
        };

        /**
         * Function calls the service to get the sorted data by Date and updates the view
         */

        application.SortByDate = () => {
            application.data = MovieJSONData.getSortedDataByDate(
                application.row,
                application.row_selected
            );
        };

        /**
         * Function calls the service to get the Filtered data and updates the view
         * @param  {[type]} selectedItem [description]
         * @return {[type]}              [description]
         */
        application.selectHandler = selectedItem => {
            application.row = selectedItem.row;
            application.row_selected = true;
            application.data = MovieJSONData.showSelectedData(
                application.row,
                application.row_selected
            );
        };

        /**
         * Function to Remove any filter
         */

        application.FilterRemove = () => {
            application.row_selected = false;
            application.data = MovieJSONData.showSelectedData(
                application.row,
                application.row_selected
            );
        };
    }
})();
