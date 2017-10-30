angular.module('shopApp', [])
    .controller('loginController', ['$scope', '$http', function ($scope, $http) {
        $scope.username = null;
        $scope.password = null;
        $scope.notFound = false;
        $scope.login = function () {
            $scope.notFound = false;
            $http.post('/login', {
                username: $scope.username,
                password: $scope.password
            }).then(function (response) {
                if (response.data.success) {
                    window.location.replace("/shopping-cart.html");
                } else {
                    $scope.notFound = true;
                }
            }, function () {
                alert('An error has occurred.');
            });
        };
    }]);