using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MediKnock.Models.Client
{
    public class CartDAL
    {
        MediKnock_DBEntities db = new MediKnock_DBEntities();

        public int SaveCart(ShopingCart CartDetail)
        {
            try
            {
                int CartId = 0;

                db.ShopingCarts.Add(CartDetail);
                db.SaveChanges();

                CartId = CartDetail.Id;
                return CartId;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void SaveCartItems(CartItem CartItemDetail)
        {
            try
            {
                db.CartItems.Add(CartItemDetail);
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public ShopingCart GetCartIsInProgressByUserId(int UserId)
        {
            ShopingCart cart = new ShopingCart();

            cart = db.ShopingCarts.Where(x => x.UserId == UserId && x.IsInProgress == true).FirstOrDefault();
            return cart;
        }

        public ShopingCart GetCartByUserIdAndCartId(int UserId, int CartId)
        {
            ShopingCart cart = new ShopingCart();

            cart = db.ShopingCarts.Where(x => x.UserId == UserId && x.Id == CartId).FirstOrDefault();
            return cart;
        }

        public List<CartItem> GetCartItemListbyUserId(int UserId, int CartID)
        {
            List<CartItem> lstCart = new List<CartItem>();

            lstCart = db.CartItems.Where(x => x.UserID == UserId && x.CartID == CartID).ToList();
            return lstCart;
        }

        public List<CartItem> GetOrderHistoryListbyUserId(int UserId)
        {
            List<CartItem> lstCartItem = new List<CartItem>();
            List<ShopingCart> lstCart = new List<ShopingCart>();


            lstCart = db.ShopingCarts.Where(x => x.UserId == UserId && x.IsInProgress == false && x.IsOrderCompleted == true).ToList();

            if (lstCart != null && lstCart.Count > 0)
            {
                foreach (var item in lstCart)
                {
                    List<CartItem> LocallstCartItem = new List<CartItem>();

                    LocallstCartItem = db.CartItems.Where( x=> x.CartID == item.Id).ToList();
                    lstCartItem.AddRange(LocallstCartItem);
                }
            }

            return lstCartItem;
        }

        public List<CartItem> GetOrderHistoryList()
        {
            List<CartItem> lstCartItem = new List<CartItem>();
            List<ShopingCart> lstCart = new List<ShopingCart>();


            lstCart = db.ShopingCarts.Where(x => x.IsOrderCompleted == true).ToList();

            if (lstCart != null && lstCart.Count > 0)
            {
                foreach (var item in lstCart)
                {
                    List<CartItem> LocallstCartItem = new List<CartItem>();

                    LocallstCartItem = db.CartItems.Where(x => x.CartID == item.Id).ToList();
                    lstCartItem.AddRange(LocallstCartItem);
                }
            }

            return lstCartItem;
        }


        public List<CartItem> GetCurrentCartItemsCountbyUserId(int UserId)
        {
            List<CartItem> lstCartItem = new List<CartItem>();
            List<ShopingCart> lstCart = new List<ShopingCart>();


            lstCart = db.ShopingCarts.Where(x => x.UserId == UserId && x.IsInProgress == true && x.IsOrderCompleted == false).ToList();

            if (lstCart != null && lstCart.Count > 0)
            {
                foreach (var item in lstCart)
                {
                    List<CartItem> LocallstCartItem = new List<CartItem>();

                    LocallstCartItem = db.CartItems.Where(x => x.CartID == item.Id).ToList();
                    lstCartItem.AddRange(LocallstCartItem);
                }
            }

            return lstCartItem;
        }

        public ShopingCart GetInProgressCartbyUserId(int UserId)
        {
            List<CartItem> lstCartItem = new List<CartItem>();
            ShopingCart Cart = new ShopingCart();

            Cart = db.ShopingCarts.Where(x => x.UserId == UserId && x.IsInProgress == true && x.IsOrderCompleted == false).FirstOrDefault();

            return Cart;
        }

        public void SaveShippingDetail(ShippingDetail ShippingDetail)
        {
            try
            {
                db.ShippingDetails.Add(ShippingDetail);
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        //public void UpdateCartInProgress(ShopingCart CartDetail)
        //{
        //    try
        //    {

        //        db.ShopingCarts.Attach(CartDetail);
        //        var Update = db.Entry(CartDetail);

        //        Update.Property(x => x.IsInProgress).IsModified = true;
        //        Update.Property(x => x.IsOrderCompleted).IsModified = false;



        //        db.SaveChanges();
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}

        public void UpdateCartCompleted(ShopingCart CartDetail)
        {
            try
            {

                db.ShopingCarts.Attach(CartDetail);
                var Update = db.Entry(CartDetail);

                Update.Property(x => x.IsInProgress).IsModified = true;
                Update.Property(x => x.IsOrderCompleted).IsModified = true;



                db.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}