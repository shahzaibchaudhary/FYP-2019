using MediKnock.CommonClasses;
using MediKnock.Models.Admin;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MediKnock.Controllers.Admin
{
    public partial class AdminController : Controller
    {
        //
        // GET: /AdminControllerComany/
        public ActionResult AddProduct()
        {
            ProductModel Model = new ProductModel();
            Model.lstCategory = new CategoryDAL().GetAllCategories();
            if (Convert.ToInt32(Request.QueryString["ID"]) != 0 && Request.QueryString["ID"] != null && Request.QueryString["ID"] != "")
            {
                int ID = Convert.ToInt32(Request.QueryString["ID"]);
                Model.ProductDetail = new ProductDAL().GetProductbyID(ID);
                Model.add = "update";               
                return View(Model);
            }
            else
            {

                Model.add = "add";
                return View(Model);
            }
        }
        [HttpPost]
        public ActionResult AddProduct(ProductModel Model, string Company, string Category, string hdnCropImageStream, string hdnImageOldName)
        {


            new AdminUserGernalFunction().CheckAdminLogin();

            

            if (Model.ProductDetail.Image != null)
            {
                if (!Model.ProductDetail.Image.Contains("resources/adminPictures"))
                {
                    Model.ProductDetail.Image = AdminUserGernalFunction.ImageCroping(Model.ProductDetail.Image, Constants.ProductImages);
                }
                else
                {
                    Model.ProductDetail.Image = Path.GetFileName(Model.ProductDetail.Image);
                }
            }

        
            ViewBag.SelectMainSlides = "";
            
            if (string.IsNullOrEmpty(Model.ProductDetail.Image))
            {
                ViewBag.SelectMainSlides = "noimage";
            }
            if (ViewBag.SelectMainSlides != "")
            {
                return View("AddProduct");
            }
            

            if (Model.ProductDetail.ID != 0)
            {

                new ProductDAL().UpdateProduct(Model.ProductDetail);
                return RedirectToAction("ManageProduct");
            }
            else
            {

                

                new ProductDAL().SaveProduct(Model.ProductDetail);
                return RedirectToAction("ManageProduct");
            }
        }
        public ActionResult ManageProduct()
        {
            ProductModel Model = new ProductModel();
            Model.lstProduct = new ProductDAL().GetAllProducts();
            if (Model.lstProduct != null)
            {
                Model.lstProduct = Model.lstProduct.OrderBy(x => x.ID).ToList();
            }
            return View(Model);
        }

        public void DeleteProduct()
        {
            int ID = Convert.ToInt32(Request.QueryString["ID"]);
            new ProductDAL().DeleteProduct(ID);
            Response.Redirect("~/Admin/ManageProduct");
        }

       
       
	}
}