using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MediKnock.Models.Admin
{
    public class AdminSubCategoryModel
    {
        public string CategoryName { get; set; }
      
        public List<Category> lstCategory { get; set; }
        public List<Sub_Category> lstSub_Category { get; set; }
        public Sub_Category Sub_CategoryDetail { get; set; }      
        public string add { get; set; }
        public string SubCategoryName { get; set; }

        public AdminSubCategoryModel()
        {
            CategoryName = "";
            lstCategory = new List<Category>();
            lstSub_Category = new List<Sub_Category>();
            add = "";
            SubCategoryName = "";
            Sub_CategoryDetail = new Sub_Category();
           
        }

    }
}