describe('Selenium Mocha tests', function () {
    var EC = protractor.ExpectedConditions;
    
    var chai = require('chai');
    var chaiAsPromised = require('chai-as-promised');
    chai.use(chaiAsPromised);
    var expect = chai.expect;
    
    describe('homepage', function () {
        it('should cut off long titles', function () {
            browser.get('index.html');
            browser.wait(EC.presenceOf($('h3'), 1000));
            
            var elems = element.all(by.css('h3'));
            expect(elems.count()).to.eventually.equal(3);
    
            var elem = elems.get(0);
            expect(elem.getCssValue('overflow')).to.eventually.equal('hidden');
            expect(elem.getCssValue('text-overflow')).to.eventually.equal('ellipsis');
            expect(elem.getCssValue('white-space')).to.eventually.equal('nowrap');
        });
        
        it('should navigate to the clicked product', function () {
            browser.get('index.html');
            browser.wait(EC.presenceOf($('[ng-controller=homeController]'), 1000));
            
            var product = element.all(by.css('h3')).get(1);
            product.click();
            browser.wait(EC.presenceOf($('[ng-controller=productController]'), 2500));
            var title = element(by.css('h2'));
            expect(title.getText()).to.eventually.equal('The Good, The Bad and The Ugly');
        });
        
        it('should search for all products containing "fanta"', function () {
            browser.get('index.html');
            browser.wait(EC.presenceOf($('[ng-controller=homeController]'), 1000));
            
            var input = element(by.css('[ng-model=query]'));
            input.sendKeys('fanta');            
            var searchBtn = element(by.css('#search-btn'));
            searchBtn.click();
            browser.wait(EC.presenceOf($('[ng-controller=searchController]'), 2500));
            var results = element.all(by.css('.thumbnail'));
            expect(results.count()).to.eventually.be.below(20);

            var allHaveFanta = results.reduce(function (acc, elem) {
                return elem.element(by.css('h3')).getText().then(function (caption) {
                    return acc && caption.toLowerCase().indexOf('fanta') > -1;
                });
            }, true);
            
            expect(allHaveFanta).to.eventually.be.true;
        });
        
        it('should remove an item from the shopping cart', function (done) {
            browser.get('views\\shopping-cart.html');
            browser.wait(EC.presenceOf($('[ng-controller=shoppingCartController]'), 1000));
            
            var items = element.all(by.css('.thumbnail'));
            var firstItem = items.get(0);
            var firstCaption = firstItem.element(by.css('h3')).getText();
            var deleteBtn = firstItem.element(by.css('button'));
            items.count().then(function (count) {
                deleteBtn.click().then(function () {
                    var newItems = element.all(by.css('.thumbnail'));
                    var newFirstCaption = newItems.get(0).element(by.css('h3')).getText();
                    expect(firstCaption).not.to.eventually.equal(newFirstCaption);
                    expect(newItems.count()).to.eventually.equal(count - 1)
                        .notify(done);
                });
            });
        });
    });
});
