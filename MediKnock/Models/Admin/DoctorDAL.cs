using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MediKnock.Models.Admin;
namespace MediKnock.Models.Admin
{
    public class DoctorDAL
    {
        MediKnock_DBEntities db = new MediKnock_DBEntities();

        public List<DoctorInfo> GetAllDoctorInfo()
        {
            try
            {
                return db.DoctorInfoes.OrderByDescending(x => x.Id).ToList();
            }
            catch (Exception exp)
            {
                throw exp;
            }
        }

        public void SaveDoctorInfo(DoctorInfo DoctorInfo)
        {
            try
            {
                db.DoctorInfoes.Add(DoctorInfo);
                db.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void UpdateDoctorInfo(DoctorInfo DoctorInfoDetail)
        {
            try
            {
                db.DoctorInfoes.Attach(DoctorInfoDetail);
                var Update = db.Entry(DoctorInfoDetail);
                Update.Property(x => x.Id).IsModified = true;
                Update.Property(x => x.Name).IsModified = true;
                Update.Property(x => x.Hospital).IsModified = true;
                Update.Property(x => x.Phone).IsModified = true;
                Update.Property(x => x.Specialization).IsModified = true;
                Update.Property(x => x.Email).IsModified = true;
                Update.Property(x => x.Adress).IsModified = true;


                db.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }



        public DoctorInfo GetDoctorInfoDetailbyID(int id)
        {
            try
            {
                return db.DoctorInfoes.Where(x => x.Id == id).FirstOrDefault();
            }
            catch (Exception)
            {
                throw;
            }
        }
        public DoctorInfo GetDoctorInfobyName(string Name)
        {
            try
            {
                return db.DoctorInfoes.Where(x => x.Name.ToLower() == Name.ToLower()).FirstOrDefault();
            }
            catch (Exception)
            {
                throw;
            }

        }
        public void DeleteDoctorInfo(int id)
        {
            DoctorInfo DoctorInfo = db.DoctorInfoes.Where(x => x.Id == id).FirstOrDefault();
            db.DoctorInfoes.Remove(DoctorInfo);
            db.SaveChanges();
        }
    }
}