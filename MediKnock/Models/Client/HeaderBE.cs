using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MediKnock.Models.Client
{
    public class HeaderBE
    {
        
        public List<Category> lstCategory { get; set; }
        public List<Sub_Category> lstSub_Category { get; set; }
        public List<Product> lstProduct { get; set; }

        public HeaderBE()
        {
            lstCategory = new HeaderDAL().GetAllCategories();
            lstSub_Category = new HeaderDAL().GetAllSub_Categories();
            lstProduct = new HeaderDAL().GetAllProducts();
        }
       
    }
}