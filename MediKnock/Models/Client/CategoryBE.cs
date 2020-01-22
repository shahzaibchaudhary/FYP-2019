using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MediKnock.Models.Client
{
    public class CategoryBE
    {
        public List<Category> lstCategory { get; set; }
       // public Category CategoryDetail { get; set; }
        public List<Product> lstProduct { get; set; }
        public Product ProductDetail { get; set; }
        public ShopingCart CartDetail { get; set; }
        public CartItem CartItemDetail { get; set; }
        public int QuantitytoPurchase { get; set; }

        public CategoryBE()
        {
            lstCategory = new List<Category>();
            //CategoryDetail = new Category();
            lstProduct = new List<Product>();
            ProductDetail = new Product();
            CartDetail = new ShopingCart();
            CartItemDetail = new CartItem();
            QuantitytoPurchase = 0;

        }
    }
}