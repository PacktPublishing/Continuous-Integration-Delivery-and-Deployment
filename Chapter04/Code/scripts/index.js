angular.module('shopApp', [])
    .controller('homeController', function ($scope) {
        $scope.topProducts = repository.getTopProducts();
        $scope.searchTerm = '';
    });