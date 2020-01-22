using MediKnock.Models.Admin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MediKnock.Controllers
{
    public class DoctorInfoController : Controller
    {
        //
        // GET: /DoctorInfo/

        public ActionResult Index()
        {
            DoctorModel Model = new DoctorModel();
            Model.lstDoctorInfo = new DoctorDAL().GetAllDoctorInfo();
            return View(Model);
        }

    }
}
