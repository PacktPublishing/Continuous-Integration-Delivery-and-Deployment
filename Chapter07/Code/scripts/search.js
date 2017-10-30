angular.module('shopApp', [])
    .controller('searchController', ['$scope', function ($scope) {
        var repository = require('./repository.js');
        var utils = require('./utils.js');
        
        var q = utils.getQueryParams().q;
        $scope.results = repository.search(q);
    }]);