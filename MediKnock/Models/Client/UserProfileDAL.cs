using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MediKnock.Models.Client
{
    public class UserProfileDAL
    {
        MediKnock_DBEntities db = new MediKnock_DBEntities();

        public void SaveUserProfile(UserProfile UserProfileDetail)
        {
            try
            {
                db.UserProfiles.Add(UserProfileDetail);
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool EmailAlreadyExist(string email)
        {
            if ((new UserProfileDAL().GetUserProfilebyEmail(email)) != null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        public UserProfile GetEmailandPassword(string email, string password)
        {
            try
            {
                return db.UserProfiles.Where(x => x.Email == email && x.Password == password).FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public void UpdateUserProfile(UserProfile UserProfileDetail)
        {
            try
            {
                UserProfileDetail.UpdatedDate = DateTime.Now;
                db.UserProfiles.Attach(UserProfileDetail);
                var Update = db.Entry(UserProfileDetail);
                Update.Property(x => x.ID).IsModified = true;               
                Update.Property(x => x.FirstName).IsModified = true;              
                Update.Property(x => x.LastName).IsModified = true;
                Update.Property(x => x.Gender).IsModified = true;               
                Update.Property(x => x.ContactNo).IsModified = true;
                Update.Property(x => x.Email).IsModified = true;
                Update.Property(x => x.Address).IsModified = true;
                Update.Property(x => x.Password).IsModified = true;
                Update.Property(x => x.UpdatedDate).IsModified = true;

                Update.Property(x => x.isActive).IsModified = true;


                db.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public UserProfile GetUserProfileByID(int id)
        {
            return db.UserProfiles.Where(x => x.ID == id).FirstOrDefault();
        }
        public string GetPasswordbyEmail(string email)
        {
            var item = db.UserProfiles.Where(x => x.Email == email).FirstOrDefault();
            return item.Password;
        }
        public UserProfile GetUserProfilebyEmail(string email)
        {
            var item = db.UserProfiles.Where(x => x.Email.ToLower() == email.ToLower()).FirstOrDefault();
            return item;
        }
        public void ChangePassword(string email, string newpass)
        {
            UserProfile m = db.UserProfiles.Where(x => x.Email == email).FirstOrDefault();
            m.Password = newpass;
            db.UserProfiles.Attach(m);
            var Update = db.Entry(m);
            Update.Property(x => x.Password).IsModified = true;
            db.SaveChanges();

        }
    }
}