angular.module('shopApp', [])
    .service('repositoryService', ['$http', require('./repository.js')])
    .controller('shoppingCartController', ['$scope', 'repositoryService', function ($scope, repository) {
        var order = require('./order.js');
        
        $scope.order = new order.Order();

        repository.getCart(function (data) {
            if (data.authenticated) {
                $scope.order.lines = data.shoppingCart.map(function (l) {
                    return new order.Line({
                        product: l.product,
                        number: l.number
                    });
                });
            } else {
                location.replace('/Login');
            }
        });

        $scope.removeLine = function (line) {
            repository.removeFromCart(line.product, function () {
                $scope.order.removeLine(line);
            });
        };
    }]);