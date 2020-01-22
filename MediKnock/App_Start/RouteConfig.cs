using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace MediKnock
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.Ignore("{*allasmx}", new { allasmx = @".*\.asmx(/.*)?" });


            routes.MapRoute(
            name: "Category",
            url: "Category-{ID}",
            defaults: new { controller = "Category", action = "Cate_Index" }
             );

            routes.MapRoute(
           name: "Sub_cate_url",
           url: "Category-SubCategory-{Sub_cate_ID}",
           defaults: new { controller = "Category", action = "Sub_Cate_Index" }
            );

            routes.MapRoute(
          name: "Product_url",
          url: "Cat-SubCat-Product-{Product_ID}",
          defaults: new { controller = "Category", action = "Product_Detail" }
           );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );



        }
    }
}