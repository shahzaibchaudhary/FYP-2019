using MediKnock.Models.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EmailFunctions;
using MediKnock.Models;
using MediKnock.CommonClasses;

namespace MediKnock.Controllers
{
    public class UserProfileController : Controller
    {
        //
        // GET: /UserProfile/

        public ActionResult RegisterNLogin(string isSentOrExist)
        {
            UserProfileBE Model = new UserProfileBE();
            ViewBag.isSentOrExist = isSentOrExist;
            return View(Model);
        }

        [HttpPost]
        public ActionResult SubmitRegister(UserProfileBE Model, string password)
        {

            try
            {
                if (Model.UserProfileDetail.ID > 0)
                {
                    if (!string.IsNullOrEmpty(Model.strGender))
                    {
                        Model.UserProfileDetail.Gender = Model.strGender;
                    }
                    new UserProfileDAL().UpdateUserProfile(Model.UserProfileDetail);

                    

                    Response.Redirect("/Member/Profile");
                }
                else
                {
                    bool EmailExist = false;
                    EmailExist = new UserProfileDAL().EmailAlreadyExist(Model.UserProfileDetail.Email);
                    if (EmailExist == true)
                    {
                        return RedirectToAction("RegisterNLogin", new { isSentOrExist = "exist" });
                    }

                    if (!string.IsNullOrEmpty(Model.strGender))
                    {
                        Model.UserProfileDetail.Gender = Model.strGender;
                    }

                    Model.UserProfileDetail.Password = password;
                    new UserProfileDAL().SaveUserProfile(Model.UserProfileDetail);

                    
                }
            }
            catch (Exception)
            {

            }
            return RedirectToAction("RegisterNLogin", new { isSentOrExist = "true" });

            //  return View();
        }

        [HttpPost]
        public string SubmitLogInn(string email, string password)
        {
            UserProfile UserProfile = new UserProfile();

            UserProfile = new UserProfileDAL().GetEmailandPassword(email, password);

            if (UserProfile != null)
            {
                GenericFuntions.CreateCockiesUserLogin(UserProfile.ID);
                return "true";
            }
            else
            {
                return "false";
            }

            //return RedirectToAction("RegisterNLogin");
        }

        public ActionResult Profile(int CartId)
        {
            UserProfileBE Model = new UserProfileBE();
            int UserId = GenericFuntions.GetCookieUserLogin();
            if (CartId == null)
            {
                CartId = 0;
            }
            Model.lstCartItem = new CartDAL().GetCartItemListbyUserId(UserId, CartId);
            Model.CartId = CartId;

            List<CartItem> lstCartItem = new List<CartItem>();
            lstCartItem = new CartDAL().GetCurrentCartItemsCountbyUserId(UserId);

            if (lstCartItem != null)
	{
        ViewBag.CartAmount = lstCartItem.Count;
	}
             
            return View(Model);
        }

        [HttpPost]
        public ActionResult Profile(CheckOutBE Model)
        {

            int UserId = GenericFuntions.GetCookieUserLogin();
            Model.ShippingDetail.UserID = UserId;

         

            return RedirectToAction("CheckOut", "UserProfile", new { CartId = Model.CartId });
        }



        public ActionResult Logout()
        {
            GenericFuntions.ExpireCookieUserLogin();
            return RedirectToAction("RegisterNLogin", "UserProfile");
        }

        public ActionResult CheckOut(int CartId)
        {
            CheckOutBE Model = new CheckOutBE();
            int UserId = GenericFuntions.GetCookieUserLogin();

            Model.CartId = CartId;
           

            return View(Model);
        }

        [HttpPost]
        public ActionResult CheckOut(CheckOutBE Model)
        {
            
            int UserId = GenericFuntions.GetCookieUserLogin();
            Model.ShippingDetail.UserID = UserId;

            new CartDAL().SaveShippingDetail(Model.ShippingDetail);

            return RedirectToAction("PaymentMethod", "UserProfile", new { CartId = Model.CartId});
        }

       
        public ActionResult PaymentMethod(int CartId)
        {
            CheckOutBE Model = new CheckOutBE();
            int UserId = GenericFuntions.GetCookieUserLogin();
            Model.CartId = CartId;

            //Model.lstCart = new CartDAL().GetCartListbyUserId(UserId);

            return View(Model);
        }

        [HttpPost]
        public ActionResult PaymentMethod(CheckOutBE Model)
        {
            
            int UserId = GenericFuntions.GetCookieUserLogin();

            ShopingCart Cart = new CartDAL().GetCartByUserIdAndCartId(UserId, Model.CartId);
            if (Cart != null)
            {
                Cart.IsInProgress = false;
                Cart.IsOrderCompleted = true;

                new CartDAL().UpdateCartCompleted(Cart); 
            }

            //return RedirectToAction("PaymentMethod", "UserProfile", new { CartId = Model.CartId });
            //return View(Model);
            return RedirectToAction("OrderHistory", "UserProfile"); 
        }
        public ActionResult OrderHistory()
        {
            UserProfileBE Model = new UserProfileBE();
            int UserId = GenericFuntions.GetCookieUserLogin();
            //if (CartId == null)
            //{
            //    CartId = 0;
            //}
            Model.lstCartItem = new CartDAL().GetOrderHistoryListbyUserId(UserId);
            //Model.CartId = CartId;
            return View(Model);
        }

        public ActionResult ResetPassword()
        {
            UserProfileBE Model = new UserProfileBE();

            new CartDAL().SaveCart(Model.CartDetail); 

            return View(Model);
        }

        [HttpPost]
        public ActionResult ResetPassword(UserProfileBE Model)
        {

            bool IsEmailExist = new UserProfileDAL().EmailAlreadyExist(Model.UserProfileDetail.Email);
            if (IsEmailExist)
            {
                Model.UserProfileDetail  = new UserProfileDAL().GetUserProfilebyEmail(Model.UserProfileDetail.Email);

                string Subject = "Your Password Information at www.MediKnock.com";
                string Title = "All Natural";
                string Password = Model.UserProfileDetail.Password;
                string Body = "Your password at www.MediKnock.com is : " + Password;

                bool IsSent = Subject.EmailSend("ideaimplements@gmail.com", Title, Model.UserProfileDetail.Email, Body);
                ViewBag.isexist = "yes";   
              
            }
            else
            {
                ViewBag.isexist = "no";                
            }
            return View(Model);
        }
       
    }

}
