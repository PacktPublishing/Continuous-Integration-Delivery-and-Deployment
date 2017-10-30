// Intentionally outside the scope of the tests...
var math = {
    add: function (a, b) {
        return a + b;
    }
};

(function () {
    'use strict';

    describe('sample tests', function () {
        describe('our first Jasmine tests', function () {
            it('should succeed', function () {
                expect(true).toBe(true);
            });
            it('should fail', function () {
                expect(false).toBe(false);
            });
            it('should be the same object', function () {
                var o1 = {
                    firstName: 'Sander',
                    lastName: 'Rossel'
                };
                var o2 = {
                    firstName: 'Sander',
                    lastName: 'Rossel'
                };
                expect(o1).toEqual(o2);
            });
            it('should be the same array', function () {
                var arr1 = ['Hello', {}, 1, true];
                var arr2 = ['Hello', {}, 1, true];
                expect(arr1).toEqual(arr2);
            });
        });
        
        describe('setup and teardown tests', function () {
            var something;
            
            beforeEach(function () {
                something = 'Some value';
            });
            
            afterEach(function () {
                something = null;
            });
            
            it('should do stuff with something', function () {
                expect(something).toBe('Some value');
            });
        });
        
        describe('spy tests', function () {
            beforeEach(function () {
                spyOn(math, 'add').and.callThrough();
            });
            
            it('should add 1 and 2 and call on the add function', function () {
                expect(math.add(1, 2)).toBe(3);
                expect(math.add).toHaveBeenCalled();
            });
        });
    });

    describe('web app tests', function () {
        describe('shopping cart controller', function () {
            // module has a name collision with Browserify,
            // so use the full angular.mock.module.
            beforeEach(angular.mock.module('shopApp'));
            
            var controller;
            var $scope = {};
            var repositoryService = {
                getCart: function (callback) {
                    callback({
                        authenticated: true,
                        shoppingCart: [{
                            product: {
                                price: 1.23
                            },
                            number: 1
                        }, {
                            product: {
                                price: 5
                            },
                            number: 1
                        }]
                    });
                },
                removeLine: function () {
                    // Do nothing.
                }
            };

            beforeEach(inject(function($controller) {
                controller = $controller;
                controller('shoppingCartController', {
                    $scope: $scope,
                    repositoryService: repositoryService
                });
            }));
            
            it('should load the cart', function () {
                expect($scope.order.total()).toBe(6.23);
            });
        });
    });
})();
