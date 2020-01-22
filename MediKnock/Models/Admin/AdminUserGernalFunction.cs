using MediKnock.Models.Admin;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace MediKnock.Models.Admin
{
    public class AdminUserGernalFunction
    {


        public static string ImageCroping(string Strem, string FileSavePath)
        {
            if (!String.IsNullOrEmpty(Strem))
            {
                var fileName = "";
                var imageStr64 = Strem;
                var imgCode = imageStr64.Split(',');
                var bytes = Convert.FromBase64String(imgCode[1]);
                using (var stream = new MemoryStream(bytes))
                {
                    using (var img = System.Drawing.Image.FromStream(stream))
                    {
                        var file = DateTime.Now.Ticks.ToString();
                        var filename = file + ".jpg";
                        var fileNameNew = file;
                        var path = HttpContext.Current.Server.MapPath(FileSavePath);
                        var ext = Path.GetExtension(filename);
                        var i = 0;
                        while (File.Exists(path + fileNameNew + ext))
                        {
                            i++;
                            fileNameNew = Path.GetFileNameWithoutExtension(filename);
                            fileNameNew += i;
                        }
                        fileName = fileNameNew + ext;
                        var filePath = HttpContext.Current.Server.MapPath(HttpContext.Current.Request.ApplicationPath + FileSavePath + fileName);
                        File.WriteAllBytes(filePath, bytes);
                        //img.Save(filePath);
                    }
                }
                return fileName;
            }
            else
            {
                return null;
            }
        }
        //public string ImageCroping(string crop)
        //{
        //    if (!String.IsNullOrEmpty(crop))
        //    {
        //        var fileName = "";
        //        var imageStr64 = crop;
        //        var imgCode = imageStr64.Split(',');

        //        var bytes = Convert.FromBase64String(imgCode[1]);

        //        using (var stream = new MemoryStream(bytes))
        //        {
        //            using (var img = System.Drawing.Image.FromStream(stream))
        //            {
        //                var filename = "";
        //                var fileext = "";
        //                if (imgCode.Contains("png"))
        //                {
        //                    filename = "Image";
        //                    fileext = ".png";
        //                }
        //                else
        //                {
        //                    filename = "Image";
        //                    fileext = ".jpg";
        //                }

        //                var fileNameNew = filename;
        //                var path = HttpContext.Current.Server.MapPath("/Resources/AdminPictures/");

        //                var ext = Path.GetExtension(filename);
        //                var i = 0;
        //                while (File.Exists(path + fileNameNew + fileext))
        //                {
        //                    i++;
        //                    fileNameNew = Path.GetFileNameWithoutExtension(filename);
        //                    fileNameNew += i;

        //                }
        //                fileName = fileNameNew + fileext;
        //                var filePath = HttpContext.Current.Server.MapPath(System.Web.HttpContext.Current.Request.ApplicationPath + "/Resources/AdminPictures/" + fileName);
        //                File.WriteAllBytes(filePath, bytes);
        //                //img.Save(filePath);
        //            }

        //        }

        //        return fileName;
        //    }
        //    else
        //    {
        //        return null;
        //    }
        //}
        public void SetCookie(AdminUser ObjAdminUserBE)
        {
            HttpCookie AdminCookie = new HttpCookie("AdminCookies");
            AdminCookie.Values["UserName"] = ObjAdminUserBE.UserName.ToString();
            AdminCookie.Values["Password"] = ObjAdminUserBE.Password.ToString();
            AdminCookie.Values["ID"] = ObjAdminUserBE.ID.ToString();
            HttpContext.Current.Response.SetCookie(AdminCookie);
        }
        public void CheckAdminLogin()
        {
            HttpCookie cookie = HttpContext.Current.Request.Cookies["AdminCookies"];
            if (cookie == null || String.IsNullOrEmpty(Convert.ToString(cookie)))
            {
                HttpContext.Current.Server.ClearError();
                HttpContext.Current.Response.Redirect("/Admin/Login", false);
            }
            else if (cookie.Values["Password"] == "-")
            {
                string url = "/Admin/LockScreen?ID=" + cookie.Values["ID"].ToString();
                HttpContext.Current.Server.ClearError();
                HttpContext.Current.Response.Redirect(url, false);
            }
        }
    }
}