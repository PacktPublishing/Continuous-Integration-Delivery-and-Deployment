angular.module('shopApp', [])
    .controller('searchController', function ($scope) {
        var q = utils.getQueryParams()['q'];
        $scope.results = repository.search(q);
    });