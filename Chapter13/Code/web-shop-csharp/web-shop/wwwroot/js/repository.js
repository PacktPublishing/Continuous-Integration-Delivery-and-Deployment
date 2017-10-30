module.exports = function($http) {
    'use strict';

    return {
        getTopProducts: function (callback) {
            $http.post('/Home/GetTopProducts')
            .then(function (response) {
                callback(response.data);
            }, function () {
                alert('An error has occurred.');
            });
        },
        getProduct: function (id, callback) {
            $http.post('/Product/GetProduct', {
                value: id
            })
            .then(function (response) {
                callback(response.data);
            }, function () {
                alert('An error has occurred.');
            });
        },
        search: function (q, callback) {
            $http.post('/Search/SearchProducts', {
                value: q
            })
            .then(function (response) {
                callback(response.data);
            }, function () {
                alert('An error has occurred.');
            });
        },
        getCart: function (callback) {
            $http.post('ShoppingCart/GetCart')
            .then(function (response) {
                callback(response.data);
            }, function () {
                alert('An error has occurred.');
            });
        },
        addToCart: function (product) {
            $http.post('ShoppingCart/AddProductToCart', {
                value: product.id
            }).then(function (response) {
                if (response.data.authenticated) {
                    alert('Product added to your cart.');
                } else {
                    location.replace('/Login');
                }
            }, function () {
                alert('An error has occurred.');
            });
        },
        removeFromCart: function (product, callback) {
            $http.post('ShoppingCart/RemoveProductFromCart', {
                value: product.id
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