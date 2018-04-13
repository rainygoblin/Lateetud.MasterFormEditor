using System.Web.Http.Cors;
using WebApp.Models;
using System.Web.Mvc;
namespace WebApp.Controllers
{
    [EnableCorsAttribute("*", "*", "*")]
    public class MasterFormController : Controller
    {
        #region Index
        public ActionResult Index()
        {
            return View();
        }
        #endregion Index

        #region Editor
        public ActionResult Editor(string id)
        {
            if (!string.IsNullOrEmpty(id))
            {
                ViewBag.Key = id;
                ViewBag.Value = "";
                string result = DBHelper.GetFileFriendlyName(id);
                if (!result.Trim().Equals("fail") && result.ToString().ToLower().IndexOf("exception") == -1)
                {
                    ViewBag.Value = result;
                }
                return View();
            }
            return RedirectToAction("Index", "MasterForm");
        }
        #endregion Editor
    }
}