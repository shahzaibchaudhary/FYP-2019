using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MediKnock.Models.Admin
{
    public class AdmincategoryModel
    {
        public string CategoryName { get; set; }

        public Category CategoryDetail { get; set; }      
        public List<Category> lstCategory { get; set; }
        public List<Sub_Category> lstSub_Category { get; set; }

        public string add { get; set; }
        public string SubCategoryName { get; set; }

        public AdmincategoryModel()
        {
            CategoryName = "";
            lstCategory = new List<Category>();
            lstSub_Category = new List<Sub_Category>();
            add = "";
            SubCategoryName = "";
            CategoryDetail = new Category();
           
        }

    }
}