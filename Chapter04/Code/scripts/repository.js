var repository = (function () {
    'use strict';

    var products = [{
        id: 1,
        name: 'Final Fantasy XV',
        price: 55.99,
        description: 'Final Fantasy finally makes a come back!',
        category: 'Gaming'
    }, {
        id: 2,
        name: 'Captain America: Civil War',
        price: 19.99,
        description: 'Even more Avengers!',
        category: 'Movies'
    }, {
        id: 3,
        name: 'The Good, The Bad and The Ugly',
        price: 9.99,
        description: 'This timeless classic needs no description.',
        category: 'Movies'
    }, {
        id: 4,
        name: 'J.K. Rowling - Fantastic Beasts and Where to Find Them',
        price: 19.99,
        description: 'Not Harry Potter.',
        category: 'Books'
    }, {
        id: 5,
        name: 'Fantastic Four',
        price: 11.99,
        description: 'Supposedly, a very bad movie.',
        category: 'Movies'
    }];
    
    return {
        getTopProducts: function () {
            return [products[1], products[2], products[3]];
        },
        getProduct: function (id) {
            return products.filter(p => p.id === id)[0];
        },
        search: function (q) {
            if (q == null) {
                return [];
            } else {
                return products.filter(p => p.name.toLowerCase().indexOf(q.toLowerCase()) >= 0);
            }
        }
    };
})();