angular.module('shopApp', [])
    .controller('productController', ['$scope', function ($scope) {
        var repository = require('./repository.js');
        var utils = require('./utils.js');
        
        var id = +utils.getQueryParams().id,
            p = repository.getProduct(id);
        $scope.name = p.name;
        $scope.price = p.price;
        $scope.description = p.description;
        $scope.category = p.category;
    }]);