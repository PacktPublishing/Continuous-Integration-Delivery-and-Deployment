module.exports = (function () {
    var Order = function () {
        this.lines = [];
    };
    
    Order.prototype.removeLine = function (line) {
        this.lines.splice(this.lines.indexOf(line), 1);
    };
    
    Order.prototype.total = function () {
        var sum = 0;
        this.lines.forEach(function (l) {
            sum += l.subTotal();
        });
        return +sum.toFixed(2);
    };
    
    var Line = function (options) {
        this.product = options.product;
        this.number = options.number;
    };
    
    Line.prototype.subTotal = function () {
        return +(this.product.price * this.number).toFixed(2);
    };
    
    return {
        Order: Order,
        Line: Line
    };
})();