using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MediKnock.Models.Client
{
    public class HeaderDAL
    {
        MediKnock_DBEntities db = new MediKnock_DBEntities();

        public List<Category> GetAllCategories()
        {
            try
            {
                return db.Categories.OrderBy(x => x.ID).ToList();
            }
            catch (Exception exp)
            {
                throw exp;
            }
        }

        public List<Sub_Category> GetAllSub_Categories()
        {
            try
            {
                return db.Sub_Category.OrderBy(x => x.ID).ToList();
            }
            catch (Exception exp)
            {
                throw exp;
            }
        }

        public List<Product> GetAllProducts()
        {
            try
            {
                return db.Products.OrderBy(x => x.ID).ToList();
            }
            catch (Exception exp)
            {
                throw exp;
            }
        }

       


    }
}