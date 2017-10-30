using Microsoft.AspNetCore.TestHost;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading;
using Xunit;
using web_shop;

namespace web_shop_selenium
{
    public class SeleniumTests : IDisposable
    {
        private readonly IWebDriver driver = new ChromeDriver();

        private readonly TestServer server;
        private readonly HttpClient client;

        public SeleniumTests()
        {
            server = new TestServer(new WebHostBuilder()
                .UseStartup<Startup>());
            client = server.CreateClient();
            client.BaseAddress = new Uri("http://ciserver:9999");
        }

        [Fact]
        public void ShouldCutOffLongTitles_Test()
        {
            driver.Navigate().GoToUrl($"{client.BaseAddress}");
            driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(2);
            var elems = driver.FindElements(By.CssSelector("h3"));
            Assert.Equal(3, elems.Count);

            var elem = elems[0];
            Assert.Equal("hidden", elem.GetCssValue("overflow"));
            Assert.Equal("ellipsis", elem.GetCssValue("text-overflow"));
            Assert.Equal("nowrap", elem.GetCssValue("white-space"));
        }

        [Fact]
        public void ShouldNavigateToTheClickedProduct_Test()
        {
            driver.Navigate().GoToUrl($"{client.BaseAddress}");
            driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(2);
            
            var product = driver.FindElements(By.CssSelector("h3"))[1];
            product.Click();

            var title = driver.FindElement(By.CssSelector("h2"));
            Assert.Equal("Captain America: Civil War", title.Text);
        }

        [Fact]
        public void ShouldSearchForAllProductsContainingFanta_Test()
        {
            driver.Navigate().GoToUrl($"{client.BaseAddress}");
            driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(2);
            
            var input = driver.FindElement(By.CssSelector("[ng-model=query]"));
            input.SendKeys("fanta");            
            var searchBtn = driver.FindElement(By.CssSelector("#search-btn"));
            searchBtn.Click();
            var results = driver.FindElements(By.CssSelector(".thumbnail"));
            Assert.True(results.Count < 20);

            var allHaveFanta = results.All(elem =>
            {
                var caption = elem.FindElement(By.CssSelector("h3")).Text;
                return caption.ToLowerInvariant().Contains("fanta");
            });
            
            Assert.True(allHaveFanta, "Not all found results contain the text 'fanta'.");
        }

        [Fact]
        public void ShouldRemoveAnItemFromTheShoppingCart_Test()
        {
            driver.Navigate().GoToUrl($"{client.BaseAddress}ShoppingCart");
            driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(2);
            
            // redirect            
            var username = driver.FindElement(By.CssSelector("input[ng-model=username]"));
            var password = driver.FindElement(By.CssSelector("input[type=password]"));
            
            username.SendKeys("user");
            password.SendKeys("password");
            
            var submit = driver.FindElement(By.CssSelector("input[type=submit]"));
            submit.Click();

            // another redirect
            driver.Navigate().GoToUrl($"{client.BaseAddress}");
            
            var buttons = driver.FindElements(By.CssSelector(".btn.btn-primary"));
            
            buttons[0].Click();
            driver.SwitchTo().Alert().Accept();
            
            buttons[1].Click();
            driver.SwitchTo().Alert().Accept();
            
            driver.Navigate().GoToUrl($"{client.BaseAddress}ShoppingCart");

            var items = driver.FindElements(By.CssSelector(".thumbnail"));
            var count = items.Count;
            var caption = items[0].FindElement(By.CssSelector("h3")).Text;
            items[0].FindElement(By.CssSelector("button")).Click();
            
            // Like with the JavaScript tests, just wait for a second...
            Thread.Sleep(1000);
            var newItems = driver.FindElements(By.CssSelector(".thumbnail"));
            Assert.Equal(count - 1, newItems.Count);
            Assert.NotEqual(caption, newItems[0].FindElement(By.CssSelector("h3")).Text);

            driver.Navigate().Refresh();
            var afterRefresh = driver.FindElements(By.CssSelector(".thumbnail"));
            Assert.Equal(count - 1, afterRefresh.Count);
        }

        #region IDisposable Support
        private bool disposedValue = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    driver.Dispose();
                    client.Dispose();
                    server.Dispose();
                }
                disposedValue = true;
            }
        }

        void IDisposable.Dispose()
        {
            Dispose(true);
        }
        #endregion
    }
}