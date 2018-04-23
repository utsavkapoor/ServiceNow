(() => {
    "use strict";

    const app = angular.module("MovieRate");

    app.service("MovieJSONData", MovieJSONData);

    MovieJSONData.$inject = ["$http"];

    /**
     * Main Data Service for storing all data
     * @param       {[type]} $http [description]
     * @constructor
     */

    function MovieJSONData($http) {
        const data = this;
        let JSONdata = new Array();
        let Stars = new Array();

        /**
         * Initialise all data and store in local variables
         * @return {[type]} [description]
         */
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

        /**
         * A setter for JSONdata
         * @param {[type]} value [description]
         * @param {[type]} id    [description]
         */
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

        /**
         * getter for JSON data
         * @return {[type]} [description]
         */
        data.getJSON = () => {
            return JSONdata;
        };

        /**
         * getter for Star Data
         * @return {[type]} [description]
         */
        data.getStars = () => {
            return Stars;
        };
        /**
         * function which returns the data in Sorted order if filter is not applied else filters the data and then returns the sorted data.
         * @param  {[type]} rating [description]
         * @param  {[type]} filter [description]
         * @return {[type]}        [description]
         */
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

        /**
         * function which returns the data in Sorted order if filter is not applied else filters the data and then returns the sorted data.
         * @param  {[type]} rating [description]
         * @param  {[type]} filter [description]
         * @return {[type]}        [description]
         */
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

        /**
         * Function Returns the count of Movies filtered by stars
         * @return {[type]} [description]
         */
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

        /**
         * Returns data with filter
         * @param  {[type]} rating [description]
         * @param  {[type]} filter [description]
         * @return {[type]}        [description]
         */
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
