using MediKnock.Models.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MediKnock.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        public ActionResult Index()
        {
            HomeBE Model = new HomeBE();

            Model.lstHomeSlider = new HomeDAL().GetAllHomeSliders();
            Model.lstProduct = new HomeDAL().GetAllProducts();


            return View(Model);
        }

    }
}
