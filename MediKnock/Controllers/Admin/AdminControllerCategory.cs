using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MediKnock.CommonClasses;
using MediKnock.Models.Admin;
using MediKnock.Models;

namespace MediKnock.Controllers.Admin
{
    public partial class AdminController : Controller
    {
        //
        // GET: /AdminControllerCategory/


        public ActionResult AddCategory()
        {
            new AdminUserGernalFunction().CheckAdminLogin();

            AdmincategoryModel Model = new AdmincategoryModel();


            if (Convert.ToInt32(Request.QueryString["ID"]) != 0 && Request.QueryString["ID"] != null && Request.QueryString["ID"] != "")
            {
                int ID = Convert.ToInt32(Request.QueryString["ID"]);
                Model.CategoryDetail = new CategoryDAL().GetCategorybyID(ID);
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
        public ActionResult AddCategory(AdmincategoryModel Model)
        {
            new AdminUserGernalFunction().CheckAdminLogin();

            if (Model.CategoryDetail.ID != 0)
            {
                new CategoryDAL().UpdateCategory(Model.CategoryDetail);
                return RedirectToAction("ManageCategory");
            }
            else
            {
                new CategoryDAL().SaveCategory(Model.CategoryDetail);
                return RedirectToAction("ManageCategory");
            }
        }
        public ActionResult ManageCategory()
        {
            new AdminUserGernalFunction().CheckAdminLogin();

            AdmincategoryModel Model = new AdmincategoryModel();
            Model.lstCategory = new CategoryDAL().GetAllCategories();
            if (Model.lstCategory != null)
            {
                Model.lstCategory = Model.lstCategory.OrderBy(x => x.ID).ToList();
            }
            return View(Model);
        }



        [HttpGet]
        public ActionResult GetSubCategory(string CategoryID)
        {
            new AdminUserGernalFunction().CheckAdminLogin();

            if (!string.IsNullOrEmpty(CategoryID))
            {
                List<Sub_Category> lstSub_Category = new List<Sub_Category>();
                lstSub_Category = new CategoryDAL().GetAllSub_Categories();

                return Json(lstSub_Category, JsonRequestBehavior.AllowGet);
            }
            return Json(new EmptyResult(), JsonRequestBehavior.AllowGet);
        }

        public void DeleteCategory()
        {
            new AdminUserGernalFunction().CheckAdminLogin();

            int ID = Convert.ToInt32(Request.QueryString["ID"]);
            new CategoryDAL().DeleteCategory(ID);
            Response.Redirect("~/Admin/ManageCategory");
        }
    }
}

