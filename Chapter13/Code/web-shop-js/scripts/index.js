angular.module('shopApp', [])
    .service('repositoryService', ['$http', require('./repository.js')])
    .controller('homeController', ['$scope', 'repositoryService', function ($scope, repository) {
        repository.getTopProducts(function (results) {
            $scope.topProducts = results;
        });
        $scope.searchTerm = '';
        $scope.addToCart = function (product) {
            repository.addToCart(product);
        };
    }]);