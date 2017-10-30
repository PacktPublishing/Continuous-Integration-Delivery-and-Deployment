angular.module('shopApp', [])
    .controller('shoppingCartController', function ($scope) {
        var Line = function (options) {
            this.product = options.product,
            this.number = options.number
        };
        Line.prototype.subTotal = function () {
            return (this.product.price * this.number).toFixed(2);
        }
        
        $scope.lines = [new Line({
            product: repository.getProduct(1),
            number: 1
        }), new Line({
            product: repository.getProduct(3),
            number: 2
        })];
        
        $scope.total = function () {
            var sum = 0;
            $scope.lines.forEach(function (l) {
                sum += +l.subTotal();
            });
            return sum.toFixed(2);
        };
        
        $scope.removeLine = function (line) {
            $scope.lines.splice($scope.lines.indexOf(line), 1);
        }
    });