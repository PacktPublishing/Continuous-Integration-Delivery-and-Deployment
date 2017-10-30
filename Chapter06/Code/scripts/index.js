angular.module('shopApp', [])
    .controller('homeController', ['$scope', function ($scope) {
        var repository = require('./repository.js');
        
        $scope.topProducts = repository.getTopProducts();
        $scope.searchTerm = '';
    }]);