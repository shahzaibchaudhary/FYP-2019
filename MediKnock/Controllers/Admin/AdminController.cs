using MediKnock.Models.Admin;
using MediKnock.Models.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MediKnock.Controllers.Admin
{
    public partial class AdminController : Controller
    {
        //
        // GET: /Admin/
        public ActionResult Index()
        {
            return RedirectToAction("Login", "Admin");
        }
        public ActionResult DashboardIndex()
        {
            new AdminUserGernalFunction().CheckAdminLogin();
            
            return View();
        }

        public ActionResult OrdersCompleted()
        {
            new AdminUserGernalFunction().CheckAdminLogin();

            UserProfileBE Model = new UserProfileBE();
           
            Model.lstCartItem = new CartDAL().GetOrderHistoryList();
            
            return View(Model);

           
        }
	}
}