using System;
using System.Collections.Generic;
using web_shop.Controllers;
using web_shop.Database;
using web_shop.Invoicing;
using Xunit;

namespace web_shop_tests
{
    public class OrderTests
    {
        private Order CreateOrder()
        {
            return new Order
            {
                Lines = new List<OrderLine>
                {
                    new OrderLine
                    {
                        Product = new Product
                        {
                            Price = 1.23M
                        },
                        Number = 1
                    },
                    new OrderLine
                    {
                        Product = new Product
                        {
                            Price = 5M
                        },
                        Number = 1
                    }
                }
            };
        }

        [Fact]
        public void CalculateTotal_Test()
        {
            var order = CreateOrder();
            Assert.Equal(6.23M, order.GetTotal());
        }

        [Fact]
        public void UpdateLineTotalOnNumberChange_Test()
        {
            var order = CreateOrder();
            order.Lines[0].Number = 2;
            Assert.Equal(2.46M, order.Lines[0].GetSubTotal());
        }

        [Fact]
        public void UpdateTotalOnLineInsert_Test()
        {
            var order = CreateOrder();
            order.Lines.Add(new OrderLine
            {
                Product = new Product
                {
                    Price = 2
                },
                Number = 1
            });
            Assert.Equal(8.23M, order.GetTotal());
        }

        [Fact]
        public void UpdateTotalOnLineRemoval_Test()
        {
            var order = CreateOrder();
            order.Lines.RemoveAt(0);
            Assert.Equal(5, order.GetTotal());
        }
    }
}
