using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MediKnock.Models.Admin
{
    public class DoctorModel
    {
        public DoctorInfo DoctorInfoDetail { get; set; }       
        public List<DoctorInfo> lstDoctorInfo{ get; set; }

        public string add { get; set; }

        public string IsNameAlreadyExist { get; set; }

        public DoctorModel()
        {
            DoctorInfoDetail = new DoctorInfo();
            lstDoctorInfo = new List<DoctorInfo>();
            add = "";

            IsNameAlreadyExist = "";
           
        }
    }
}