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
        // GET: /AdminControllerSubCategory/


        public ActionResult AddSubCategory()
        {
            
            AdminSubCategoryModel Model = new AdminSubCategoryModel();

            Model.lstCategory = new CategoryDAL().GetAllCategories();

            if (Convert.ToInt32(Request.QueryString["ID"]) != 0 && Request.QueryString["ID"] != null && Request.QueryString["ID"] != "")
            {
                int ID = Convert.ToInt32(Request.QueryString["ID"]);
                Model.Sub_CategoryDetail = new SubCategoryDAL().GetSub_CategorybyID(ID);
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
        public ActionResult AddSubCategory(AdminSubCategoryModel Model)
        {
            new AdminUserGernalFunction().CheckAdminLogin();

            if (Model.Sub_CategoryDetail.ID != 0)
            {
                new SubCategoryDAL().UpdateSub_Category(Model.Sub_CategoryDetail);
                return RedirectToAction("ManageSubCategory");
            }
            else
            {
                new SubCategoryDAL().SaveSub_Category(Model.Sub_CategoryDetail);
                return RedirectToAction("ManageSubCategory");
            }
        }
        public ActionResult ManageSubCategory()
        {
            AdminSubCategoryModel Model = new AdminSubCategoryModel();
            Model.lstSub_Category = new SubCategoryDAL().GetAllSub_Categories();
            if (Model.lstSub_Category != null)
            {
                Model.lstSub_Category = Model.lstSub_Category.OrderBy(x => x.ID).ToList();
            }
            return View(Model);
        }


        public void DeleteSubCategory()
        {
            int ID = Convert.ToInt32(Request.QueryString["ID"]);
            new SubCategoryDAL().DeleteSub_Category(ID);
            Response.Redirect("~/Admin/ManageSubCategory");
        }
    }
}

