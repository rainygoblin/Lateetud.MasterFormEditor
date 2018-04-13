using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Xml;
using System.Xml.Linq;
using WebApp.Models;
using System.Configuration;
using System.Net.Http.Formatting;

namespace WebApp.Controllers
{
    [EnableCorsAttribute("*", "*", "*")]
    public class MasterFormApiController : ApiController
    {
        string rootDirectoryName = CommonClassModel.RootDirectoryName;
        string childDirectoryName = CommonClassModel.ChildDirectoryName;
        string rootFolderName = CommonClassModel.RootFolderName;
        string annotation = CommonClassModel.Annotation;

        HttpResponseMessage httpResponseMessage;
        public HttpResponseMessage Create(CreateDrictryModel model)
        {
            try
            {
                httpResponseMessage = Request.CreateErrorResponse(HttpStatusCode.BadRequest, "error");
                if (!string.IsNullOrEmpty(model.Name))
                {
                    if (!Directory.Exists(HttpContext.Current.Server.MapPath("~/" + rootFolderName + "/ ")))
                    {
                        Directory.CreateDirectory(HttpContext.Current.Server.MapPath("~/" + rootFolderName + "/ "));
                    }
                    string guid = Guid.NewGuid().ToString();
                    string responce = DBHelper.CreateDirectory(guid, model.Name, "0");
                    string pathString = HttpContext.Current.Server.MapPath("~/" + rootFolderName + "/" + model.Name);
                    Directory.CreateDirectory(pathString);
                    httpResponseMessage = Request.CreateResponse(HttpStatusCode.Created, responce);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex.Message);
            }
            return httpResponseMessage;
        }

        public HttpResponseMessage Formlist()
        {
            try
            {
                List<CreateDrictryModel> Listmodel = DBHelper.GetDirectoryList()
                                                     .OrderBy(x => x.Value)
                                                     .ToList();

                return Request.CreateResponse(HttpStatusCode.OK, Listmodel);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [HttpPost]
        public HttpResponseMessage UploadFile()
        {
            httpResponseMessage = new HttpResponseMessage();
            httpResponseMessage.StatusCode = HttpStatusCode.BadRequest;
            httpResponseMessage.ReasonPhrase = "File not exists";
            try
            {
                if (HttpContext.Current.Request.Files.AllKeys.Any())
                {
                    if (!Directory.Exists(HttpContext.Current.Server.MapPath("~/" + rootFolderName + "/temp ")))
                    {
                        Directory.CreateDirectory(HttpContext.Current.Server.MapPath("~/" + rootFolderName + "/temp "));
                    }
                    var httpPostedFile = HttpContext.Current.Request.Files["UploadedFile"];
                    if (httpPostedFile != null)
                    {
                        string httpPostedFileFileName = Path.GetFileName(httpPostedFile.FileName);

                        string UniqueName = DateTime.Now.ToString("ddMMyyhhmmss");
                        string filename = DateTime.Now.ToString("ddMMyyhhmmss") + httpPostedFileFileName;
                        var fileSavePath = Path.Combine(HttpContext.Current.Server.MapPath("~/" + rootFolderName + "/temp "), UniqueName + httpPostedFileFileName);
                        httpPostedFile.SaveAs(fileSavePath);
                        httpResponseMessage.StatusCode = HttpStatusCode.OK;
                        httpResponseMessage.ReasonPhrase = filename;
                    }
                }
            }
            catch (Exception ex)
            {
                httpResponseMessage.StatusCode = HttpStatusCode.BadRequest;
                httpResponseMessage.ReasonPhrase = "Exception error:" + ex.Message;
            }
            return httpResponseMessage;
        }

        public HttpResponseMessage DeleteMasterForm(FormDataCollection Form)
        {
            try
            {
                string responce = "";

                if (Form != null)
                {
                    string Guid = Form["Guid"]?.ToString().Trim() ?? "";
                    string masterFormName = DBHelper.GetFileFriendlyName(Guid);

                    httpResponseMessage = Request.CreateErrorResponse(HttpStatusCode.BadRequest, "error");
                    if (!string.IsNullOrEmpty(masterFormName))
                    {
                        if (Directory.Exists(HttpContext.Current.Server.MapPath("~/" + rootFolderName + "/" + masterFormName)))
                        {
                            if (File.Exists(HttpContext.Current.Server.MapPath("~/" + rootFolderName + "/" + annotation + "/" + Guid + ".xml")))
                            {
                                File.Delete(HttpContext.Current.Server.MapPath("~/" + rootFolderName + "/" + annotation + "/" + Guid + ".xml"));
                            }
                            Directory.Delete(HttpContext.Current.Server.MapPath("~/" + rootFolderName + "/" + masterFormName), true);
                            responce = DBHelper.DeleteDirectory(Guid);
                        }
                        else
                        {
                            responce = DBHelper.DeleteDirectory(Guid);
                        }

                        httpResponseMessage = Request.CreateResponse(HttpStatusCode.OK, responce);
                    }
                }


            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex.Message);
            }
            return httpResponseMessage;
        }

    }
}
