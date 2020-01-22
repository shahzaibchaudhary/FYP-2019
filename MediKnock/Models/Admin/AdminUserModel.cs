
using MediKnock.Models.Admin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MediKnock.Models.Admin
{
    public class AdminUserModel
    {
        MediKnock_DBEntities db = new MediKnock_DBEntities();

        public AdminUser UserDetail { get; set; }
        public List<AdminUser> lstUser { get; set; }
        public AdminUserModel()
        {
            UserDetail = new AdminUser();
            lstUser = new List<AdminUser>();
        }

        public AdminUser GetAdminUserByUserNameandPassword(string username, string password)
        {
            try
            {
                return db.AdminUsers.Where(x => x.UserName == username && x.Password == password).FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void AddUser(AdminUser user)
        {
            try
            {
                db.AdminUsers.Add(user);
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public void UpdateUser(AdminUser user)
        {
            try
            {
                db.AdminUsers.Attach(user);
                var Update = db.Entry(user);
                Update.Property(x => x.FullName).IsModified = true;
                Update.Property(x => x.Designation).IsModified = true;
                Update.Property(x => x.UserName).IsModified = true;
                Update.Property(x => x.Email).IsModified = true;
                Update.Property(x => x.Password).IsModified = true;
                Update.Property(x => x.Address).IsModified = true;
                Update.Property(x => x.ContactNo).IsModified = true;
                Update.Property(x => x.UserTypeID).IsModified = true;
                Update.Property(x => x.Picture).IsModified = true;
                Update.Property(x => x.IsActive).IsModified = true;
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public AdminUser GetUserByID(int UserID)
        {
            return db.AdminUsers.Where(x => x.ID == UserID).FirstOrDefault();

        }

        public List<AdminUser> GetAllUser()
        {
            return db.AdminUsers.OrderByDescending(x => x.ID).ToList();
        }
        public void DeleteUserByID(int UserId)
        {
            var item = db.AdminUsers.Where(x => x.ID == UserId).FirstOrDefault();
            db.AdminUsers.Remove(item);
            db.SaveChanges();
        }

        public void ChangePassByID(AdminUser user)
        {
            try
            {
                db.AdminUsers.Attach(user);
                var update = db.Entry(user);
                update.Property(x => x.Password).IsModified = true;
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        public void UpdateUserbyVerficationCode(string email, string token)
        {
            try
            {
                var item = db.AdminUsers.Where(x => x.Email == email).FirstOrDefault();
                if (item != null)
                {
                    item.VerificationCode = token;
                    db.AdminUsers.Attach(item);
                    var update = db.Entry(item);
                    update.Property(x => x.VerificationCode).IsModified = true;
                    db.SaveChanges();
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        public string GetVerificationCodebyEmail(string email)
        {
            var item = db.AdminUsers.Where(x => x.Email == email).FirstOrDefault();
            return item.VerificationCode;
        }

        public void ChangePassByEmail(string em, string newpass)
        {
            try
            {
                var user = db.AdminUsers.Where(x => x.Email == em).FirstOrDefault();

                if (user != null)
                {
                    user.Password = newpass;
                    db.AdminUsers.Attach(user);
                    var update = db.Entry(user);
                    update.Property(x => x.Password).IsModified = true;
                    db.SaveChanges();
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public bool EmailExist(string email)
        {
            var user = db.AdminUsers.Where(x => x.Email == email).FirstOrDefault();
            if (user != null && user.Email.ToLower() == email.ToLower())
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        public bool UsernameExist(string username)
        {
            var user = db.AdminUsers.Where(x => x.UserName.ToLower() == username.ToLower()).FirstOrDefault();
            if (user != null && user.UserName == username)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

    }
}