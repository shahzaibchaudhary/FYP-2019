using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.WebPages.Html;

namespace MediKnock.Models.Client
{
    public class UserProfileBE
    {
        public UserProfile UserProfileDetail { get; set; }
        public IEnumerable<SelectListItem> ddlGender
        {
            get
            {
                return new[]
                {
                 new SelectListItem { Value = "Male", Text = "Male" },
                 new SelectListItem { Value = "Female", Text = "Female" }

                 };
            }

        }
        public string strGender { get; set; }
        public ShopingCart CartDetail { get; set; }
        public List<ShopingCart> lstCart { get; set; }

        public CartItem CartItemDetail { get; set; }
        public List<CartItem> lstCartItem { get; set; }

        public int CartId { get; set; }

        public UserProfileBE()
        {
            UserProfileDetail = new UserProfile();
            strGender = "Male";
            CartDetail = new ShopingCart();
            lstCart = new List<ShopingCart>();

            CartItemDetail = new CartItem();
            lstCartItem = new List<CartItem>();
        }
    }
}