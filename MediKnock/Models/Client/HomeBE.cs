using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MediKnock.Models.Client
{
    public class HomeBE
    {        
        public List<HomeSlider> lstHomeSlider { get; set; }
        public List<Product> lstProduct { get; set; }
        public  List<Category> lstCategory { get; set; }
        public List<Sub_Category> lstSub_Category { get; set; }

        public HomeBE()
        {
            lstHomeSlider = new List<HomeSlider>();
            lstProduct = new List<Product>();
            lstSub_Category = new HomeDAL().GetAllSub_Categories();
            lstSub_Category = lstSub_Category.Where(x => x.CategoryID == 9).ToList();
            lstCategory = new HomeDAL().GetAllCategories();

        }
    }
}