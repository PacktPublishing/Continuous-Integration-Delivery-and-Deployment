describe('web app tests', function() {
    describe('repository', function () {
        it('should search products with "fantas"', function() {
            var products = repository.search('fantas');
            products.should.have.lengthOf(3);
            // Alternatively, Chai supports the following syntax:
            //chai.expect(products).to.have.lengthOf(3);
            //chai.assert.lengthOf(products, 3);
        });
    });
});
