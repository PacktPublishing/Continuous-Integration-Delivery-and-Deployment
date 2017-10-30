module.exports = function($http) {
    'use strict';

    return {
        getTopProducts: function (callback) {
            $http.post('/getTopProducts')
            .then(function (response) {
                callback(response.data);
            }, function () {
                alert('An error has occurred.');
            });
        },
        getProduct: function (id, callback) {
            $http.post('/getProduct', {
                id: id
            }).then(function (response) {
                callback(response.data);
            }, function () {
                alert('An error has occurred.');
            });
        },
        search: function (q, callback) {
            $http.post('/searchProducts', {
                q: q
            }).then(function (response) {
                callback(response.data);
            }, function () {
                alert('An error has occurred.');
            });
        },
        getCart: function (callback) {
            $http.post('/getCart')
            .then(function (response) {
                callback(response.data);
            }, function () {
                alert('An error has occurred.');
            });
        },
        addToCart: function (product) {
            $http.post('/addProductToCart', {
                product: product
            }).then(function (response) {
                if (response.data.authenticated) {
                    alert('Product added to your cart.');
                } else {
                    location.replace('/login.html');
                }
            }, function () {
                alert('An error has occurred.');
            });
        },
        removeFromCart: function (product, callback) {
            $http.post('/removeProductFromCart', {
                product: product
            }).then(function (response) {
                if (response.data.authenticated) {
                    callback(product);
                }
            }, function () {
                alert('An error has occurred.');
            });
        }
    };
};