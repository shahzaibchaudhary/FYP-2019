using MediKnock.CommonClasses;
using MediKnock.Models;
using MediKnock.Models.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MediKnock.Controllers
{
    public class CategoryController : Controller
    {
        //
        // GET: /Category/

        public ActionResult Cate_Index(string ID)
        {
            CategoryBE Model = new CategoryBE();
            Model.lstCategory = new CategoryDAL().GetAllCategories();

            Model.lstProduct = new MediKnock.Models.Admin.ProductDAL().GetAllProducts();

            Model.lstProduct = Model.lstProduct.Where(x => x.CategoryID == Convert.ToInt32(ID)).ToList();

            //Model.CategoryDetail = Model.lstCategory.Where(x => x.Name.ToLower() == url.ToLower()).FirstOrDefault(); 


            return View(Model);
        }

        public ActionResult Sub_Cate_Index(string Sub_cate_ID)
        {
            CategoryBE Model = new CategoryBE();
            Model.lstCategory = new CategoryDAL().GetAllCategories();
            Model.lstProduct = new MediKnock.Models.Admin.ProductDAL().GetAllProducts();
            Model.lstProduct = Model.lstProduct.Where(x => x.Sub_CategoryID == Convert.ToInt32(Sub_cate_ID)).ToList();

            return View(Model);
        }
        public ActionResult Product_Detail(string Product_ID)
        {
            CategoryBE Model = new CategoryBE();
            Model.lstCategory = new CategoryDAL().GetAllCategories();

            Model.lstProduct = new MediKnock.Models.Admin.ProductDAL().GetAllProducts();
            Model.ProductDetail = Model.lstProduct.Where(x => x.ID == Convert.ToInt32(Product_ID)).FirstOrDefault();

            Model.lstProduct = Model.lstProduct.Where(x => x.ProductSalt == Model.ProductDetail.ProductSalt).ToList();

            return View(Model);
        }

        [HttpPost]
        public ActionResult AddCart(CategoryBE Model)
        {

            int UserId = GenericFuntions.GetCookieUserLogin();
            if (UserId > 0)
            {
                ShopingCart InProgressCart = new CartDAL().GetCartIsInProgressByUserId(UserId);
                if (InProgressCart != null)
                {
                    Model.CartItemDetail.ProductId = Model.ProductDetail.ID;

                    Model.CartItemDetail.CategoryID = Model.ProductDetail.CategoryID;
                    Model.CartItemDetail.Sub_CategoryID = Model.ProductDetail.Sub_CategoryID;
                    Model.CartItemDetail.CompanyName = Model.ProductDetail.CompanyName;
                    Model.CartItemDetail.ProductName = Model.ProductDetail.Name;
                    Model.CartItemDetail.Potency = Model.ProductDetail.Potency;
                    Model.CartItemDetail.Price = Model.ProductDetail.Price;
                    Model.CartItemDetail.Quantity = Model.QuantitytoPurchase;

                    Model.CartItemDetail.TotalPrice = Convert.ToInt32(Model.ProductDetail.Price) * Model.QuantitytoPurchase; 

                    Model.CartItemDetail.UserID = UserId;
                    Model.CartItemDetail.CartID = InProgressCart.Id;

                    new CartDAL().SaveCartItems(Model.CartItemDetail);

                    return RedirectToAction("Profile", "UserProfile", new { CartID = Model.CartItemDetail.CartID });
                }
                else
                {
                    Model.CartDetail.UserId = UserId;
                    Model.CartDetail.IsInProgress = true;
                    Model.CartDetail.IsOrderCompleted = false;


                    int CartId = new CartDAL().SaveCart(Model.CartDetail);

                    Model.CartItemDetail.ProductId = Model.ProductDetail.ID;
                    Model.CartItemDetail.CategoryID = Model.ProductDetail.CategoryID;
                    Model.CartItemDetail.Sub_CategoryID = Model.ProductDetail.Sub_CategoryID;
                    Model.CartItemDetail.CompanyName = Model.ProductDetail.CompanyName;
                    Model.CartItemDetail.ProductName = Model.ProductDetail.Name;
                    Model.CartItemDetail.Potency = Model.ProductDetail.Potency;
                    Model.CartItemDetail.Price = Model.ProductDetail.Price;
                    Model.CartItemDetail.Quantity = Model.QuantitytoPurchase;

                    Model.CartItemDetail.TotalPrice = Convert.ToInt32(Model.ProductDetail.Price) * Model.QuantitytoPurchase; 


                    Model.CartItemDetail.UserID = UserId;
                    Model.CartItemDetail.CartID = CartId;

                    Model.CartItemDetail.CreatedDate = DateTime.Now;

                    new CartDAL().SaveCartItems(Model.CartItemDetail);
                    return RedirectToAction("Profile", "UserProfile", new { CartId = CartId });

                }

            }
            else
            {
                return RedirectToAction("RegisterNLogin", "UserProfile", new { isSentOrExist = "unathorize" });
            }



        }


        public string GetProductsbySearchText(string text)
        {
            CategoryBE Model = new CategoryBE();

            Model.lstProduct = new MediKnock.Models.Admin.ProductDAL().GetAllProducts();
            Model.lstProduct = Model.lstProduct.Where(x => x.Name.ToLower().Contains(text)).ToList();

            string HTML = "";

            if (Model.lstProduct != null && Model.lstProduct.Count > 0)
            {
                HTML += "<ul>";
                foreach (var item in Model.lstProduct)
                {
                    HTML += "<li>" +
                        //"<a href=\"product.html\">" +
                            "<a href=\"/Cat-SubCat-Product-" + item.ID + "\">" +
                            "<h6>" + item.Name + "</h6>" +
                            "</a>" +
                            "</li>";                            

                }
                 HTML += "</ul>" ;
            }


            return HTML;
        }


    }
}
