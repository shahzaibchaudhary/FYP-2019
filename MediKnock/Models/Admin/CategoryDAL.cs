using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MediKnock.Models.Admin
{
    public class CategoryDAL
    {
        MediKnock_DBEntities db = new MediKnock_DBEntities();

        public List<Category> GetAllCategories()
        {
            try
            {
                return db.Categories.OrderByDescending(x => x.ID).ToList();
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
                return db.Sub_Category.OrderByDescending(x => x.ID).ToList();
            }
            catch (Exception exp)
            {
                throw exp;
            }
        }

        public void SaveCategory(Category CategoryDetail)
        {
            try
            {
                db.Categories.Add(CategoryDetail);
                db.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void UpdateCategory(Category CategoryDetail)
        {
            try
            {
                db.Categories.Attach(CategoryDetail);
                var Update = db.Entry(CategoryDetail);
                Update.Property(x => x.ID).IsModified = true;             
                Update.Property(x => x.ShortDescription).IsModified = true;
                Update.Property(x => x.LongDescription).IsModified = true;
                Update.Property(x => x.Name).IsModified = true;
                Update.Property(x => x.CreatedDate).IsModified = true;
                Update.Property(x => x.UpdatedDate).IsModified = true;

                db.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public Category GetCategorybyID(int id)
        {
            try
            {
                return db.Categories.Where(x => x.ID == id).FirstOrDefault();
            }
            catch (Exception)
            {
                throw;
            }
        }
        public Category GetCategorybyName(string Name)
        {
            try
            {
                return db.Categories.Where(x => x.Name.ToLower() == Name.ToLower()).FirstOrDefault();
            }
            catch (Exception)
            {
                throw;
            }

        }
        public void DeleteCategory(int id)
        {
            Category Category = db.Categories.Where(x => x.ID == id).FirstOrDefault();
            db.Categories.Remove(Category);
            db.SaveChanges();
        }
    }
}