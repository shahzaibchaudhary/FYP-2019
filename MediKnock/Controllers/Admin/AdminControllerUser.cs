using MediKnock.CommonClasses;
using MediKnock.Models.Admin;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
//using EmailFunctions;

namespace MediKnock.Controllers.Admin
{
    public partial class AdminController : Controller
    {
        //
        // GET: /AdminControllerUser/
        public ActionResult Login()
        {
            ViewBag.Validation = "";
            return View();
        }
        [HttpPost]
        public ActionResult Login(AdminUserModel UserLoginDetail, string username, string password)
        {
            UserLoginDetail.UserDetail = new AdminUserModel().GetAdminUserByUserNameandPassword(username, password);
            if (UserLoginDetail.UserDetail != null)
            {
                if (UserLoginDetail.UserDetail.IsActive == true)
                {
                    new AdminUserGernalFunction().SetCookie(UserLoginDetail.UserDetail);
                    return RedirectToAction("DashboardIndex");
                }
                else
                {
                    ViewBag.Validation = "Deactive";
                    return View();
                }
            }
            ViewBag.Validation = "False";
            return View();
        }

        public ActionResult AddUser(AdminUserModel EditUser)
        {
            new AdminUserGernalFunction().CheckAdminLogin();

            if (Convert.ToInt32(Request.QueryString["ID"]) != 0 && Request.QueryString["ID"] != null && Request.QueryString["ID"] != "")
            {
                int UserID = Convert.ToInt32(Request.QueryString["ID"]);
                EditUser.UserDetail = new AdminUserModel().GetUserByID(UserID);
                ViewBag.Active = EditUser.UserDetail.IsActive;
                return View(EditUser);
            }
            else
            {
                return View();
            }
        }
        [HttpPost]
        public ActionResult AddUser(AdminUserModel CreateUser, string Active)
        {
            new AdminUserGernalFunction().CheckAdminLogin();
            if (Active == "on")
            {
                CreateUser.UserDetail.IsActive = true;
            }
            else
            {
                CreateUser.UserDetail.IsActive = false;
            }

            
            if (CreateUser.UserDetail.ID != 0)
            {
                new AdminUserModel().UpdateUser(CreateUser.UserDetail);
            }
            else
            {
                #region Username and Email Exists

                bool Email = new AdminUserModel().EmailExist(CreateUser.UserDetail.Email);
                ViewBag.Exists = "";
                if (Email == false)
                {
                    bool username = new AdminUserModel().UsernameExist(CreateUser.UserDetail.UserName);
                    if (username == true)
                    {
                        ViewBag.Exists = "Username";
                    }
                }
                else
                {
                    ViewBag.Exists = "Email";
                }

                if (ViewBag.Exists != "")
                {
                    return View("AddUser");
                }
                #endregion
                new AdminUserModel().AddUser(CreateUser.UserDetail);
            }

            return RedirectToAction("ManageUsers");
        }
        public ActionResult ManageUsers(AdminUserModel ManageUser)
        {
            new AdminUserGernalFunction().CheckAdminLogin();
            ManageUser.lstUser = new AdminUserModel().GetAllUser();
            return View(ManageUser);
        }
        public void Delete()
        {
            int UserID = Convert.ToInt32(Request.QueryString["ID"]);
            new AdminUserModel().DeleteUserByID(UserID);
            Response.Redirect("~/Admin/ManageUsers");
        }

        public ActionResult ChangePassword()
        {
            return View();
        }

        [HttpPost]
        public ActionResult ChangePassword(AdminUserModel UserDetail, string old, string newpass, string confrim)
        {

            if (old != null && old != "" && newpass != null && newpass != "" && confrim != null && confrim != "")
            {
                //if (newpass == confrim)
                //{
                HttpCookie cookie = HttpContext.Request.Cookies["AdminCookies"];
                int ID = Convert.ToInt32(cookie.Values["ID"]);
                UserDetail.UserDetail = new AdminUserModel().GetUserByID(ID);
                //  User usr = new UserModel().GetUserByID(ID);
                if (UserDetail.UserDetail.Password == old)
                {
                    UserDetail.UserDetail.Password = newpass;
                    new AdminUserModel().ChangePassByID(UserDetail.UserDetail);
                    return RedirectToAction("DashboardIndex");
                }
                else
                {
                    ViewBag.ErrorMsg = "oldpass";
                }
                //}
                //else
                //{
                //    ViewBag.ErrorMsg = "PasswordsNotMatch";
                //}
            }
            else
            {
                ViewBag.ErrorMsg = "CannotEmpty";
            }


            return View();
        }
        public ActionResult LockScreen()
        {

            if (Request.Cookies["AdminCookies"] != null)
            {
                Response.Cookies["AdminCookies"].Expires = DateTime.Now.AddDays(-1);
            }
            return View();
        }
        [HttpPost]
        public ActionResult LockScreen(AdminUserModel UserLockScreen, string password, int hdn_ID)
        {
            UserLockScreen.UserDetail = new AdminUserModel().GetUserByID(hdn_ID);
            if (UserLockScreen.UserDetail.Password == password)
            {
                new AdminUserGernalFunction().SetCookie(UserLockScreen.UserDetail);
                return RedirectToAction("DashboardIndex");
            }
            else
            {
                ViewBag.Pass = "Incorrect Password";
                return View();
            }
        }
        public void Logout()
        {
            if (Request.Cookies["AdminCookies"] != null)
            {
                Response.Cookies["AdminCookies"].Expires = DateTime.Now.AddDays(-1);
            }
            Response.Redirect("~/Admin/Login");
            // return View();
        }


        public ActionResult ForgotPassword()
        {
            return View();
        }
        [HttpPost]
        public ActionResult ForgotPassword(string email)
        {

            bool Email = new AdminUserModel().EmailExist(email);

            if (Email == false)
            {
                ViewBag.status = "emailnotexist";
                return View();

            }
            else
            {
                string token = DateTime.Now.Ticks + "1";

                new AdminUserModel().UpdateUserbyVerficationCode(email, token);

                var resetLink = "<a href='" + Url.Action("ResetPassword", "Admin", new { em = email, rt = token }, "http") + "'>Reset Password</a>";


                Boolean SentOrNot = false;
                try
                {
                    string EmailSubject = "Password Reset";
                    string EmailBody = "<b>Please Click here to Reset Password </b><br/>" + resetLink;

                    //  SentOrNot = EmailSubject.EmailSend(Contact.Email.Trim(), Contact.FirstName.Trim() + " " + Contact.LastName.Trim(), "khurram@softsolutions.com.pk", EmailBody);
                    //SentOrNot = EmailSubject.EmailSend(email.Trim(), "American Holidays " + " " + " ", "tanseef@softsolutions.com.pk", EmailBody);
                    //  SentOrNot = EmailSubject.EmailSend(Constants.MAILING_EMAIL_ADDRESS, " " + " " + " ", email.Trim(), EmailBody);


                    if (SentOrNot)
                    {
                        // ViewBag.status = "Message Sent Sucessfully.";
                        ViewBag.status = "sent";

                    }
                    else
                    {
                        ViewBag.status = "sentnot";
                    }

                }
                catch (Exception)
                {
                    ViewBag.status = "sentnot";
                }
                return View();
                // return RedirectToAction("Login");
            }
        }

        public ActionResult ResetPassword(string em, string rt)
        {
            string vCode = new AdminUserModel().GetVerificationCodebyEmail(em);
            if (rt == vCode)
            {
                return View();
            }
            else
            {
                return RedirectToAction("Login");
            }
        }
        [HttpPost]
        public ActionResult ResetPassword(string em, string rt, string newpass, string confrim)
        {
            if (!string.IsNullOrEmpty(em) && !string.IsNullOrEmpty(rt) && !string.IsNullOrEmpty(newpass) && (newpass == confrim))
            {
                string vCode = new AdminUserModel().GetVerificationCodebyEmail(em);
                if (vCode == rt)
                {
                    new AdminUserModel().ChangePassByEmail(em, newpass);
                    return RedirectToAction("Login");
                }
                else
                {
                    return View("ResetPassword");
                }
            }
            else
            {
                return View("ResetPassword");
            }
        }
	}
}