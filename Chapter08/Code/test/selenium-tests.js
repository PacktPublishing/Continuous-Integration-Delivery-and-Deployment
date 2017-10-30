describe('Selenium tests', function () {
    var EC = protractor.ExpectedConditions;
    
    describe('homepage', function () {
        it('should cut off long titles', function () {
            browser.get('index.html');
            browser.wait(EC.presenceOf($('h3'), 1000));
            
            var elems = element.all(by.css('h3'));
            expect(elems.count()).toBe(3);
    
            var elem = elems.get(0);
            expect(elem.getCssValue('overflow')).toBe('hidden');
            expect(elem.getCssValue('text-overflow')).toBe('ellipsis');
            expect(elem.getCssValue('white-space')).toBe('nowrap');
        });
        
        it('should navigate to the clicked product', function () {
            browser.get('index.html');
            browser.wait(EC.presenceOf($('[ng-controller=homeController]'), 2000));
            
            var product = element.all(by.css('h3')).get(1);
            product.click();
            browser.wait(EC.presenceOf($('[ng-controller=productController]'), 2500));
            var title = $('h2');
            expect(title.getText()).toBe('Captain America: Civil War');
        });
        
        it('should search for all products containing "fanta"', function () {
            browser.get('index.html');
            browser.wait(EC.presenceOf($('[ng-controller=homeController]'), 2000));
            
            var input = element(by.css('[ng-model=query]'));
            input.sendKeys('fanta');            
            var searchBtn = element(by.css('#search-btn'));
            searchBtn.click();
            browser.wait(EC.presenceOf($('[ng-controller=searchController]'), 2500));
            var results = element.all(by.css('.thumbnail'));
            expect(results.count()).toBeLessThan(20);

            var allHaveFanta = results.reduce(function (acc, elem) {
                return elem.element(by.css('h3')).getText().then(function (caption) {
                    return acc && caption.toLowerCase().indexOf('fanta') > -1;
                });
            }, true);
            
            expect(allHaveFanta).toBeTruthy();
        });
        
        it('should remove an item from the shopping cart', function (done) {
            browser.get('shopping-cart.html');
            // redirect
            browser.wait(EC.presenceOf($('[ng-controller=loginController]'), 2000));
            
            var username = $('input[ng-model=username]');
            var password = $('input[type=password]');
            
            username.sendKeys('sander');
            password.sendKeys('1234');
            
            var submit = $('input[type=submit]');
            submit.click();
            // another redirect
            browser.wait(EC.presenceOf($('[ng-controller=shoppingCartController]'), 2000));
            
            browser.get('index.html');
            browser.wait(EC.presenceOf($('.btn.btn-primary'), 2000));
            
            var alert;
            var buttons = $$('.btn.btn-primary');
            
            buttons.get(0).click();
            browser.wait(EC.alertIsPresent(), 2000);
            alert = browser.switchTo().alert();
            alert.accept();
            
            buttons.get(1).click();
            browser.wait(EC.alertIsPresent(), 2000);
            var alert = browser.switchTo().alert();
            alert.accept();
            
            browser.get('shopping-cart.html');
            browser.wait(EC.presenceOf($('[ng-controller=shoppingCartController]'), 2000));
            
            browser.wait(EC.presenceOf($('.thumbnail'), 2000));
            
            var items = $$('.thumbnail');
            items.count().then(function (count) {
                var first = items.get(0);
                first.$('h3').getText().then(function (caption) {
                    first.$('button').click().then(function () {
                        // we don't really have anything to wait on...
                        // waiting for the element not to be there may cause
                        // an infinite loop, so just sleep for a second and continue.
                        browser.sleep(1000);
                        var newItems = $$('.thumbnail');
                        expect(newItems.count()).toBe(count - 1);
                        expect(newItems.get(0).$('h3').getText()).not.toBe(caption);
                        
                        // Refresh and check if the deleted item is still gone.
                        browser.refresh();
                        browser.wait(EC.presenceOf($('.thumbnail'), 2000));
            
                        var afterRefresh = $$('.thumbnail');
                        expect(afterRefresh.count()).toBe(count - 1);
                        done();
                    });
                });
            });
        });
    });
});
