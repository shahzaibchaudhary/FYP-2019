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
        // GET: /AdminControllerDoctor/

        public ActionResult AddDoctorInfo()
        {
            new AdminUserGernalFunction().CheckAdminLogin();

            DoctorModel Model = new DoctorModel();
            Model.lstDoctorInfo = new DoctorDAL().GetAllDoctorInfo();
            if (Convert.ToInt32(Request.QueryString["ID"]) != 0 && Request.QueryString["ID"] != null && Request.QueryString["ID"] != "")
            {
                int ID = Convert.ToInt32(Request.QueryString["ID"]);
                Model.DoctorInfoDetail = new DoctorDAL().GetDoctorInfoDetailbyID(ID);
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
        public ActionResult AddDoctorInfo(DoctorModel Model)
        {


            new AdminUserGernalFunction().CheckAdminLogin();

            if (Model.DoctorInfoDetail.Id != 0)
            {

                new DoctorDAL().UpdateDoctorInfo(Model.DoctorInfoDetail);
                return RedirectToAction("ManageDoctorInfo");
            }
            else
            {



                new DoctorDAL().SaveDoctorInfo(Model.DoctorInfoDetail);
                return RedirectToAction("ManageDoctorInfo");
            }
        }
        public ActionResult ManageDoctorInfo()
        {
            DoctorModel Model = new DoctorModel();
            Model.lstDoctorInfo = new DoctorDAL().GetAllDoctorInfo();
            if (Model.lstDoctorInfo != null)
            {
                Model.lstDoctorInfo = Model.lstDoctorInfo.OrderBy(x => x.Id).ToList();
            }
            return View(Model);
        }

        //public ActionResult ListProduct()
        //{
        //    ProductModel Model = new ProductModel();
        //    Model.lstProduct = new ProductDAL().GetAllProducts();
        //    if (Model.lstProduct != null)
        //    {
        //        Model.lstProduct = Model.lstProduct.OrderBy(x => x.ID).ToList();
        //    }

        //    return View(Model);
        //}

        public void DeleteDoctorInfo()
        {
            int ID = Convert.ToInt32(Request.QueryString["ID"]);
            new DoctorDAL().DeleteDoctorInfo(ID);
            Response.Redirect("~/Admin/ManageDoctorInfo");
        }

    }
}
