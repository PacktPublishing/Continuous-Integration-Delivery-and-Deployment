angular.module('shopApp', [])
    .service('utilsService', require('./utils.js'))
    .service('repositoryService', ['$http', require('./repository.js')])
    .controller('productController', ['$scope', 'utilsService', 'repositoryService', function ($scope, utils, repository) {

        var id = +utils.getQueryParams().id;
        repository.getProduct(id, function (p) {
            $scope.product = p;
        });
        $scope.addToCart = function (product) {
            repository.addToCart(product);
        };
    }]);