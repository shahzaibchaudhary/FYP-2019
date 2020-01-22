using MediKnock.Models.Admin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MediKnock.Models.Admin
{
    public class ProductDAL
    {
        MediKnock_DBEntities db = new MediKnock_DBEntities();

        public List<Product> GetAllProducts()
        {
            try
            {
                return db.Products.OrderByDescending(x => x.ID).ToList();
            }
            catch (Exception exp)
            {                
                throw exp;
            }
        }

        public void SaveProduct(Product ProductDetail)
        {
            try
            {
                db.Products.Add(ProductDetail);
                db.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }
        
        public void UpdateProduct(Product ProductDetail)
        {
            try
            {
                db.Products.Attach(ProductDetail);
                var Update = db.Entry(ProductDetail);
                Update.Property(x => x.ID).IsModified = true;
                Update.Property(x => x.CategoryID).IsModified = true;
                Update.Property(x => x.Heading).IsModified = true;
                Update.Property(x => x.ShortDescription).IsModified = true;
                Update.Property(x => x.LongDescription).IsModified = true;
                Update.Property(x => x.Name).IsModified = true;
                Update.Property(x => x.Price).IsModified = true;
                Update.Property(x => x.Quantity).IsModified = true;
                Update.Property(x => x.CreatedDate).IsModified = true;
                Update.Property(x => x.UpdatedDate).IsModified = true;
                              
                db.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public bool NameAlreadyExist(string name)
        {
            if ((db.Products.Where(x => x.Name.ToLower() == name.ToLower()).FirstOrDefault()) != null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public Product GetProductbyID(int id)
        {
            try
            {
                return db.Products.Where(x => x.ID == id).FirstOrDefault();
            }
            catch (Exception)
            {
                throw;
            }
        }
        public Product GetProductbyName(string Name)
        {
            try
            {
                return db.Products.Where(x => x.Name.ToLower() == Name.ToLower()).FirstOrDefault();
            }
            catch (Exception)
            {
                throw;
            }

        }
        public void DeleteProduct(int id)
        {
            Product Product = db.Products.Where(x => x.ID == id).FirstOrDefault();
            db.Products.Remove(Product);
            db.SaveChanges();
        }
      
    }
}