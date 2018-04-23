describe("Test Angularjs Application", function() {
    describe("Check the Controller", function() {
        var secondController;
        beforeEach(function() {
            module("MovieRate");
        });
        describe("AppController", function() {
            var AppController;
            var d, MovieJSONData;
            beforeEach(
                inject(function($http, _MovieJSONData_) {
                    //Mock our factory and spy on methods
                    d = $http.get("./app/data/movies.json");
                    MovieJSONData = _MovieJSONData_;
                    spyOn(MovieJSONData, "initData");
                    spyOn(MovieJSONData, "getSortedDataByName");
                    spyOn(MovieJSONData, "getSortedDataByDate");
                    spyOn(MovieJSONData, "showSelectedData");
                })
            );
            beforeEach(
                inject(function($controller) {
                    //instantiate controller using $controller service
                    AppController = $controller("AppController", {
                        MovieJSONData: MovieJSONData
                    });
                })
            );
            it("check if data object is defined", function() {
                expect(AppController.data).toBeDefined();
            });
            it("check if ratings object is defined", function() {
                expect(AppController.ratings).toBeDefined();
            });
            it("should call initData on myFactory", function() {
                expect(MovieJSONData.initData).toHaveBeenCalled();
                expect(MovieJSONData.initData.calls.count()).toBe(1);
            });
            it("should call SortByName and return a JSON Object", function() {
                var result = MovieJSONData.getSortedDataByName;
                AppController.SortByName();
                expect(result).toHaveBeenCalled();
                expect(result.calls.count()).toBe(1);
            });
            it("should call SortByDate and return a JSON Object", function() {
                var result = MovieJSONData.getSortedDataByDate;
                AppController.SortByDate();
                expect(result).toHaveBeenCalled();
                expect(result.calls.count()).toBe(1);
            });

            it("should call selectHandler and return a JSON Object", function() {
                var result = MovieJSONData.showSelectedData;
                AppController.selectHandler({ row: 0 });
                expect(result).toHaveBeenCalled();
                expect(result.calls.count()).toBe(1);
            });

            it("should call FilterRemove and return a JSON Object", function() {
                var result = MovieJSONData.showSelectedData;
                AppController.FilterRemove();
                expect(result).toHaveBeenCalled();
                expect(result.calls.count()).toBe(1);
            });
        });
    });

    describe("Check the Directive", function() {
        var $compile, $rootScope, template;
        beforeEach(module("starRating"));
        beforeEach(module("./app/views/StarRating.directive.html"));
        beforeEach(
            inject(function($templateCache, _$compile_, _$rootScope_) {
                template = $templateCache.get(
                    "main/webapp/templates/ssnControl.htm"
                );
                $templateCache.put(
                    "./app/views/StarRating.directive.html",
                    template
                );
                $compile = _$compile_;
                $rootScope = _$rootScope_;
            })
        );
    });
});
