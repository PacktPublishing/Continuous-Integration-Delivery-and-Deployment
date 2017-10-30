angular.module('shopApp', [])
    .service('utilsService', require('./utils.js'))
    .service('repositoryService', ['$http', require('./repository.js')])
    .controller('searchController', ['$scope', 'utilsService', 'repositoryService', function ($scope, utils, repository) {

        var q = utils.getQueryParams().q;
        repository.search(q, function (results) {
            $scope.results = results;
        });
        $scope.addToCart = function (product) {
            repository.addToCart(product);
        };
    }]);