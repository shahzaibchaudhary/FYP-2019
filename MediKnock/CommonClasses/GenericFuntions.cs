using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MediKnock.CommonClasses
{
    public class GenericFuntions
    {
        static string UserToken = "MediKnockUser";

        public static void CreateCockiesUserLogin(int UserId)
        {
            HttpCookie TokenCockie = new HttpCookie(UserToken);
          
            
            TokenCockie.Values.Add("userid", UserId.ToString());

            HttpContext.Current.Response.Cookies.Add(TokenCockie);
            if (HttpContext.Current.Request.Cookies[UserToken] != null)
            {
                ////////// Redirction//////////////
                //string RedirectUrl = "/Member/Dashboard";
                //HttpContext.Current.Response.Redirect(RedirectUrl);
                //////////////////////////////////
            }
        }
        public static int GetCookieUserLogin()
        {
            HttpCookie TokenCookie = HttpContext.Current.Request.Cookies[UserToken];

            int UserId = 0;
            if (TokenCookie != null)
            {

                UserId = Convert.ToInt32(TokenCookie.Values["userid"]);

            }
            return UserId;
        }
        public static void ExpireCookieUserLogin()
        {
            HttpCookie CookieAgent = HttpContext.Current.Request.Cookies[UserToken];

            if (CookieAgent != null)
            {
                HttpCookie AgentCookie = new HttpCookie(UserToken);
                AgentCookie.Expires = DateTime.Now;
                HttpContext.Current.Response.Cookies.Set(AgentCookie);
            }

        }


    }
}