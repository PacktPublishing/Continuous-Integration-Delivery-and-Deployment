(function () {
    'use strict';
    var o = require('../../scripts/order.js');

    describe('web app tests', function () {
        describe('order object', function () {
            var order;
            
            beforeEach(function () {
                order = new o.Order();
                order.lines.push(new o.Line({
                    product: {
                        price: 1.23
                    },
                    number: 1
                }));
                order.lines.push(new o.Line({
                    product: {
                        price: 5
                    },
                    number: 1
                }));
            });
            
            it('should correctly calculate the total', function () {
                expect(order.total()).toBe(6.23);
            });
            
            it('should update the line sub total when the number of products is changes', function () {
                var line = order.lines[0];
                line.number = 2;
                expect(line.subTotal()).toBe(2.46);
            });
            
            it('should update the total when a product is added', function () {
                order.lines.push(new o.Line({
                    product: {
                        price: 2
                    },
                    number: 1
                }));
                expect(order.total()).toBe(8.23);
            });
            
            it('should update the total when a product is removed', function () {
                order.removeLine(order.lines[0]);
                expect(order.total()).toBe(5);
            });
        });
    });
})();
