using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MediKnock.Models.Client
{
    public class CategoryDAL
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
    }
}