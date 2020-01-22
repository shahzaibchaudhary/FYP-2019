using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MediKnock.Models.Admin
{
    public class SubCategoryDAL
    {
        MediKnock_DBEntities db = new MediKnock_DBEntities();


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

        public void SaveSub_Category(Sub_Category Sub_CategoryDetail)
        {
            try
            {
                db.Sub_Category.Add(Sub_CategoryDetail);
                db.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void UpdateSub_Category(Sub_Category Sub_CategoryDetail)
        {
            try
            {
                db.Sub_Category.Attach(Sub_CategoryDetail);
                var Update = db.Entry(Sub_CategoryDetail);
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

        public Sub_Category GetSub_CategorybyID(int id)
        {
            try
            {
                return db.Sub_Category.Where(x => x.ID == id).FirstOrDefault();
            }
            catch (Exception)
            {
                throw;
            }
        }
        public Sub_Category GetSub_CategorybyName(string Name)
        {
            try
            {
                return db.Sub_Category.Where(x => x.Name.ToLower() == Name.ToLower()).FirstOrDefault();
            }
            catch (Exception)
            {
                throw;
            }

        }
        public void DeleteSub_Category(int id)
        {
            Sub_Category Sub_Category = db.Sub_Category.Where(x => x.ID == id).FirstOrDefault();
            db.Sub_Category.Remove(Sub_Category);
            db.SaveChanges();
        }
    }
}