angular.module('shopApp', [])
    .controller('productController', function ($scope) {
        var id = +utils.getQueryParams()['id'],
            p = repository.getProduct(id);
        $scope.name = p.name;
        $scope.price = p.price;
        $scope.description = p.description;
        $scope.category = p.category;
    });