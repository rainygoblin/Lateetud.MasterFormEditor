using Leadtools.Annotations.Engine;//.Core;
using Leadtools;
using Leadtools.Codecs;
using Leadtools.Forms;
using Leadtools.Forms.Auto;
using Leadtools.Forms.Processing;
using Leadtools.Forms.Recognition;
using Leadtools.JSDemos.Tools.Exceptions;
using Leadtools.JSDemos.Tools.Helpers;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Hosting;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApp.Models;
using System.Xml;
using Newtonsoft.Json;
using Leadtools.Ocr;
using Leadtools.Annotations;

namespace Leadtools.JSDemos.Controllers
{
    /// <summary>
    /// For use with the Annotations Demo, showing that annotations can be saved to
    /// the server and then downloaded and reloaded.
    /// </summary>
    [EnableCors("*", "*", "*")]
    public class DataController : ApiController
    {
        string RootFolderName = System.Configuration.ConfigurationManager.AppSettings["RootFolderName"];
        private DiskMasterFormsRepository workingRepository;

        public DataController()
        {
            ServiceHelper.SetLicense();
        }

        /// <summary>
        /// Redirects data as a stream for downloading.
        /// This method is useful for "Save" operation from JavaScript. For example, the Annotations demo will serialize the container as XML
        /// and then calls Get passing text/xml as the mime type and the serialized string as data, then does a window.open(url) to allow
        /// the user to save the container XML file to their machine.
        /// </summary>
        /// <param name="uri">The uri of the data.</param>
        /// <param name="mimeType">Mime type - any is supported.</param>
        /// <param name="name">Optional name for the data file when downloaded.</param>
        /// <returns>The annotations data, as a stream, for downloading.</returns>
        /// <remarks>
        /// </remarks>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1822:MarkMembersAsStatic")]
        [HttpGet]
        [ServiceErrorAttribute(Message = "The data could not be downloaded")]
        public HttpResponseMessage Download(string mimeType, string name, Uri uri)
        {
            if (uri == null)
                throw new ArgumentNullException("uri");

            // Save it to a memory stream
            byte[] data = null;

            try
            {
                using (WebClient client = new WebClient())
                {
                    string uriString = uri.ToString();
                    if (!ServiceHelper.IsAbsolutePath(uriString))
                        uri = new Uri(Path.Combine(HostingEnvironment.ApplicationPhysicalPath, uriString));
                    data = client.DownloadData(uri);
                }
            }
            catch
            {
                // disregard original Exception, it doesn't match up
                throw new InvalidOperationException("Download URI is not available. Ensure a visible hosting location through your config.");
            }

            MemoryStream ms = new MemoryStream(data);
            HttpResponseMessage response = null;
            try
            {
                ms.Position = 0;

                // Set the MIME type and Content-Type if there is a valid web context
                HttpContext currentContext = HttpContext.Current;
                if (currentContext != null)
                {
                    currentContext.Response.ContentType = mimeType;
                    currentContext.Response.Headers.Add("ContentLength", ms.Length.ToString());

                    if (!string.IsNullOrEmpty(name))
                        currentContext.Response.Headers.Add("content-disposition", string.Format("attachment;filename={0}", name));
                }

                // If we just return the stream, Web Api will try to serialize it.
                // If the return type is "HttpResponseMessage" it will not serialize
                // and you can set the content as you wish.
                response = new HttpResponseMessage();
                response.Content = new StreamContent(ms);
                return response;
            }
            catch
            {
                if (ms != null)
                    ms.Dispose();
                if (response != null)
                    response.Dispose();
                throw;
            }
        }

        /// <summary>
        /// Saves the data as XML to a local file and returns the URL to the file. Used in conjunction with "Download" to download the XML (annotation) data.
        /// </summary>
        /// <param name="data">Data to save, in XML.</param>
        /// <param name="FolderName">folder name</param>
        /// <returns>The path to the file.</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1059:MembersShouldNotExposeCertainConcreteTypes", MessageId = "System.Xml.XmlNode")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1822:MarkMembersAsStatic")]
        [HttpPost]
        [ServiceErrorAttribute(Message = "The data could not be saved")]
        public bool SaveXml([FromBody] XmlElement data, [FromUri] string FolderName)
        {
            try
            {
                #region Added by Prasanta, For saving XML in physical folder
                string strLogicalFolderName = string.Empty;
                string strPhysicalFolderName = string.Empty;

                int start = FolderName.IndexOf("[[") + 2;
                int end = FolderName.IndexOf("]]", start);
                strPhysicalFolderName = FolderName.Substring(start, end - start);
                strLogicalFolderName = FolderName.Substring(0, FolderName.IndexOf("[["));
                #endregion

                //if (string.IsNullOrEmpty(Data))
                if (data == null)
                    throw new ArgumentNullException("data");

                // get an element from the string
                var element = data;
                string filePath = "";
                if (string.IsNullOrEmpty(FolderName))
                {
                    return true;
                }
                //filePath = Path.Combine(HostingEnvironment.ApplicationPhysicalPath, @"MasterForm\Annotation\" + FolderName + ".xml");//commented By Prasanta
                filePath = Path.Combine(HostingEnvironment.ApplicationPhysicalPath, @"MasterForm\Annotation\" + strLogicalFolderName + ".xml");

                // Save the data
                XmlWriterSettings settings = new XmlWriterSettings();
                settings.Indent = true;
                settings.OmitXmlDeclaration = false;
                settings.Encoding = Encoding.UTF8;

                using (XmlWriter writer = XmlWriter.Create(filePath, settings))
                {
                    writer.WriteStartDocument();
                    element.WriteTo(writer);
                    writer.WriteEndDocument();
                }

                //string workingDirectory = HttpContext.Current.Server.MapPath("~/" + RootFolderName + "/" + FolderName);//Commented by Prasanta
                //string workingFile = HttpContext.Current.Server.MapPath("~/" + RootFolderName + "/Annotation/" + FolderName + ".xml");//Commented by Prasanta
                string workingDirectory = HttpContext.Current.Server.MapPath("~/" + RootFolderName + "/" + strPhysicalFolderName);
                string workingFile = HttpContext.Current.Server.MapPath("~/" + RootFolderName + "/Annotation/" + strLogicalFolderName + ".xml");
                if (Directory.Exists(workingDirectory) && File.Exists(workingFile))
                {
                    using (RasterCodecs _codecs = new RasterCodecs())
                    {
                        RasterDefaults.DitheringMethod = RasterDitheringMethod.None;
                        ServiceHelper.SetLicense();
                        workingRepository = new DiskMasterFormsRepository(_codecs, workingDirectory);
                        var masterForm = workingRepository?.RootCategory?.MasterForms?.FirstOrDefault();


                        if (masterForm != null)
                        {
                            DiskMasterForm currentMasterForm = (DiskMasterForm)masterForm;
                            bool result = AddField(currentMasterForm, GetPoints(workingFile));
                        }
                    }
                }
                string DirPath = GetEnvironmentVariable("SMART");
                var targetDocInput = Path.Combine(DirPath, "OCRMasterFormSets");
                CopyDirectory(workingDirectory, targetDocInput, strPhysicalFolderName);// copy the workingDirectory to SMART folder

                return true;
            }
            catch (Exception ex)
            {

                return false;
            }
        }
        private static string GetEnvironmentVariable(string latFormHome)
        {
            if (latFormHome == null)
            {
                return null;
            }

            var value = Environment.GetEnvironmentVariable(latFormHome);

            return value;
        }
        private static void CopyDirectory(string sourcePath, string destPath, string folderName)
        {
            string strTargetFolder = Path.Combine(destPath, folderName);
            if (!Directory.Exists(destPath))
            {
                Directory.CreateDirectory(destPath);
            }
            if (!Directory.Exists(strTargetFolder))
            {
                Directory.CreateDirectory(strTargetFolder);
            }
            else
            {
                foreach (string file in Directory.GetFiles(strTargetFolder))
                {

                    try { File.Delete(file); }
                    catch { }
                }
            }


            foreach (string file in Directory.GetFiles(sourcePath))
            {
               
                string dest = Path.Combine(strTargetFolder, Path.GetFileName(file)); //Path.Combine(destPath, Path.GetFileName(file));
                File.Copy(file, dest);
            }

            foreach (string folder in Directory.GetDirectories(sourcePath))
            {
                string dest = Path.Combine(destPath, Path.GetFileName(folder));
                CopyDirectory(folder, dest, folderName);
            }
        }
        private bool AddField(DiskMasterForm currentform, List<XmlModel> model)
        {
            try
            {
                DiskMasterForm currentMasterForm = currentform;
                FormRecognitionAttributes attributes = currentMasterForm.ReadAttributes();
                FormPages formPages = currentMasterForm.ReadFields();
                RasterImage formImage = currentMasterForm.ReadForm();
                foreach (XmlModel xmlModel in model)
                {
                    int i = formPages[xmlModel.PageNumber - 1].Count;
                    formPages[xmlModel.PageNumber - 1].RemoveRange(0, i);
                    foreach (XmlDetail xmlDetail in xmlModel.Detail)
                    {
                        FormField newField = null;

                        if (xmlDetail.FieldInfo.ObjectId == -51) // For textfield => -51 //for OmrField => -50
                        {
                            newField = new TextFormField();
                            (newField as TextFormField).EnableIcr = xmlDetail.FieldInfo.OcrFieldInfo.EnableICR;
                            (newField as TextFormField).EnableOcr = xmlDetail.FieldInfo.OcrFieldInfo.EnableOCR;
                            (newField as TextFormField).Type = (xmlDetail.FieldInfo.OcrFieldInfo.Character == true ? TextFieldType.Character : (xmlDetail.FieldInfo.OcrFieldInfo.Numeric == true ? TextFieldType.Numerical : TextFieldType.Data));
                            if (xmlDetail.FieldInfo.OcrFieldInfo.CellBoarders)
                                newField.Dropout |= DropoutFlag.CellsDropout;
                            else
                                newField.Dropout &= ~DropoutFlag.CellsDropout;

                            if (xmlDetail.FieldInfo.OcrFieldInfo.Words)
                                newField.Dropout |= DropoutFlag.WordsDropout;
                            else
                                newField.Dropout &= ~DropoutFlag.WordsDropout;
                        }
                        else
                        {
                            newField = new OmrFormField();
                            if (xmlDetail.FieldInfo.OmrFieldInfo.WithFrame)
                                (newField as OmrFormField).FrameMethod = OcrOmrFrameDetectionMethod.WithFrame;
                            else if (xmlDetail.FieldInfo.OmrFieldInfo.WithoutFrame)
                                (newField as OmrFormField).FrameMethod = OcrOmrFrameDetectionMethod.WithoutFrame;
                            else if (xmlDetail.FieldInfo.OmrFieldInfo.Auto)
                                (newField as OmrFormField).FrameMethod = OcrOmrFrameDetectionMethod.Auto;

                            if (xmlDetail.FieldInfo.OmrFieldInfo.Lowest)
                                (newField as OmrFormField).Sensitivity = OcrOmrSensitivity.Lowest;
                            else if (xmlDetail.FieldInfo.OmrFieldInfo.Low)
                                (newField as OmrFormField).Sensitivity = OcrOmrSensitivity.Low;
                            else if (xmlDetail.FieldInfo.OmrFieldInfo.High)
                                (newField as OmrFormField).Sensitivity = OcrOmrSensitivity.High;
                            else if (xmlDetail.FieldInfo.OmrFieldInfo.Highest)
                                (newField as OmrFormField).Sensitivity = OcrOmrSensitivity.Highest;
                        }
                        newField.Name = xmlDetail.FieldInfo.Name;
                        newField.Bounds = new LeadRect(Convert.ToInt32(Annotations.Engine.AnnUnitConverter.ConvertToPixels(xmlDetail.Cordinates.X, Leadtools.Annotations.Engine.AnnUnit.Unit, 96)), Convert.ToInt32(Annotations.Engine.AnnUnitConverter.ConvertToPixels(xmlDetail.Cordinates.Y, Annotations.Engine.AnnUnit.Unit, 96)), Convert.ToInt32(Annotations.Engine.AnnUnitConverter.ConvertToPixels(xmlDetail.Cordinates.Width, Annotations.Engine.AnnUnit.Unit, 96)), Convert.ToInt32(Annotations.Engine.AnnUnitConverter.ConvertToPixels(xmlDetail.Cordinates.Height, Annotations.Engine.AnnUnit.Unit, 96)));
                        // newField.Bounds= new LogicalRectangle(AnnUnitConverter.ConvertToPixels(xmlDetail.Cordinates.X, AnnUnit.Unit, 96), AnnUnitConverter.ConvertToPixels(xmlDetail.Cordinates.Y, AnnUnit.Unit, 96), AnnUnitConverter.ConvertToPixels(xmlDetail.Cordinates.Width, AnnUnit.Unit, 96), AnnUnitConverter.ConvertToPixels(xmlDetail.Cordinates.Height, AnnUnit.Unit, 96), LogicalUnit.Pixel);

                        Annotations.Engine.AnnHiliteObject newObject = new Annotations.Engine.AnnHiliteObject();
                        newObject.Tag = newField;
                        FormField currentField = newObject.Tag as FormField;
                        formPages[xmlModel.PageNumber - 1].Add(currentField);
                    }
                }
                currentMasterForm.WriteForm(formImage);
                currentMasterForm.WriteAttributes(attributes);
                currentMasterForm.WriteFields(formPages);
                return true;
            }
            catch (Exception ex)
            {
                return false;
                throw;
            }

        }
        public List<XmlModel> GetPoints(string file)
        {
            List<XmlModel> listXmlModel = new List<XmlModel>();
            try
            {
                XmlDocument xmlDoc = new XmlDocument();

                var fs = new FileStream(file, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
                using (StreamReader sr = new StreamReader(fs))
                {
                    xmlDoc.Load(sr);
                    fs.Close();
                    fs.Dispose();
                }
                #region SetContainerId
                XmlNodeList xmlNodeContainer = xmlDoc.SelectNodes("/Annotations/Container");
                int containerCounter = 1;
                if (xmlNodeContainer.Count > 0)
                {
                    foreach (XmlElement xmlElement in xmlNodeContainer)
                    {
                        xmlElement.SetAttribute("id", containerCounter.ToString());
                        containerCounter++;
                    }
                }
                #endregion SetContainerId

                #region SetObjectIdByContainerSize
                for (int i = 1; i <= xmlNodeContainer.Count; i++)
                {
                    XmlNodeList xmlNodeObject = xmlDoc.SelectNodes("/Annotations/Container[@id=" + i.ToString() + "]/Objects/Object");
                    int objectCounter = 1;
                    if (xmlNodeObject.Count > 0)
                    {
                        foreach (XmlElement xmlElement in xmlNodeObject)
                        {
                            xmlElement.SetAttribute("id", objectCounter.ToString());
                            objectCounter++;
                        }
                    }
                }
                #endregion SetObjectIdByContainerSize


                for (int j = 1; j <= xmlNodeContainer.Count; j++)
                {
                    XmlModel xmlModel = new XmlModel();
                    var objectCount = xmlDoc.SelectNodes("/Annotations/Container[@id=" + j.ToString() + "]/Objects/Object").Count;
                    List<XmlDetail> listXmlDetail = new List<XmlDetail>();
                    for (int i = 1; i <= objectCount; i++)
                    {
                        #region SetCordinates
                        XmlNodeList xmlNodePoints = xmlDoc.SelectNodes("/Annotations/Container[@id=" + j.ToString() + "]/Objects/Object[@id=" + i.ToString() + "]/Points/Point");
                        XmlDetail xmlDetail = new XmlDetail();
                        string[,] stringarr = new string[4, 2];

                        int index = 0;
                        foreach (XmlNode xmlNode in xmlNodePoints)
                        {
                            stringarr[index, 0] = xmlNode.FirstChild.InnerText;
                            stringarr[index, 1] = xmlNode.LastChild.InnerText;
                            index++;
                        }
                        Cordinate cordinate = new Cordinate();
                        cordinate.Width = Convert.ToDouble(stringarr[2, 0]) - Convert.ToDouble(stringarr[0, 0]);
                        cordinate.Height = Convert.ToDouble(stringarr[2, 1]) - Convert.ToDouble(stringarr[0, 1]);
                        cordinate.X = Convert.ToDouble(stringarr[0, 0]);
                        cordinate.Y = Convert.ToDouble(stringarr[0, 1]);
                        xmlDetail.Cordinates = cordinate;
                        #endregion SetCordinates

                        #region SetFieldInfo
                        XmlNodeList xmlNodeObjectTag = xmlDoc.SelectNodes("/Annotations/Container[@id=" + j.ToString() + "]/Objects/Object[@id=" + i.ToString() + "]/ObjectTag");
                        foreach (XmlNode xmlNode in xmlNodeObjectTag)
                        {
                            xmlDetail.FieldInfo = JsonConvert.DeserializeObject<CustomFieldInfo>(xmlNode.InnerText);
                        }
                        listXmlDetail.Add(xmlDetail);
                        #endregion SetFieldInfo
                    }

                    #region SetPageNumbersAndDetails
                    XmlNodeList xmlNodePageNumbers = xmlDoc.SelectNodes("/Annotations/Container[@id=" + j.ToString() + "]/PageNumber");
                    foreach (XmlNode xmlNode in xmlNodePageNumbers)
                    {
                        xmlModel.PageNumber = Convert.ToInt32(xmlNode.InnerText.ToString());
                    }
                    xmlModel.Detail = listXmlDetail;
                    #endregion SetPageNumbersAndDetails

                    listXmlModel.Add(xmlModel);
                }
            }
            catch (Exception)
            {
                listXmlModel = new List<XmlModel>();
            }

            return listXmlModel;
        }

        /// <summary>
        /// Saves the data as XML to a local file and returns the URL to the file. Used in conjunction with "Download" to download the XML (annotation) data.
        /// </summary>
        /// <param name="FolderName">Data to save, in XML.</param>
        /// <returns>The path to the file.</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1059:MembersShouldNotExposeCertainConcreteTypes", MessageId = "System.Xml.XmlNode")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1822:MarkMembersAsStatic")]
        [HttpGet]
        [ServiceErrorAttribute(Message = "The data could not be saved")]
        public string LoadXml(string FolderName)
        {
            string returnData = "";

            if (File.Exists(Path.Combine(HostingEnvironment.ApplicationPhysicalPath, @"MasterForm\Annotation\" + FolderName + ".xml")))
            {
                XmlDocument xmlDoc = new XmlDocument();
                var fs = new FileStream(Path.Combine(HostingEnvironment.ApplicationPhysicalPath, @"MasterForm\Annotation\" + FolderName + ".xml"), FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
                using (StreamReader sr = new StreamReader(fs))
                {
                    xmlDoc.Load(sr);
                    fs.Close();
                    fs.Dispose();
                }
                returnData = xmlDoc.InnerXml;
            }
            return returnData;
        }

        #region XmlModel
        public class XmlModel
        {
            public int PageNumber { get; set; } = 1;
            public List<XmlDetail> Detail { get; set; } = new List<XmlDetail>();
        }
        #endregion XmlModel

        #region XmlDetail
        public class XmlDetail
        {
            public Cordinate Cordinates { get; set; } = new Cordinate();
            public CustomFieldInfo FieldInfo { get; set; } = new CustomFieldInfo();
        }
        #endregion XmlDetail

        #region Cordinate
        public class Cordinate
        {
            public double X { get; set; } = 0;
            public double Y { get; set; } = 0;
            public double Width { get; set; } = 0;
            public double Height { get; set; } = 0;
        }
        #endregion Cordinate 
    }
}
