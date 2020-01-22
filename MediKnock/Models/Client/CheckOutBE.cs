using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MediKnock.Models.Client
{
    public class CheckOutBE
    {

        public List<ShippingDetail> lstShipping { get; set; }
        public ShippingDetail ShippingDetail { get; set; }
        public int CartId { get; set; }

        public CheckOutBE()
        {
            ShippingDetail = new ShippingDetail();
            lstShipping = new List<ShippingDetail>();

        }
    }
}