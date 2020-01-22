using MediKnock.Models.Admin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MediKnock.Models.Admin
{
    public class ProductModel
    {
        public Product ProductDetail { get; set; }       
        public List<Product> lstProduct { get; set; }
        public List<Category> lstCategory { get; set; }
        public List<Sub_Category> lstSub_Category { get; set; }

        public string add { get; set; }

        public string IsNameAlreadyExist { get; set; }
      
        public ProductModel()
        {
            ProductDetail = new Product();
            lstProduct = new List<Product>();
            lstCategory = new List<Category>();
            add = "";
            lstSub_Category = new List<Sub_Category>();
            IsNameAlreadyExist = "";
           
        }
    }
}