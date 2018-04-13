using Leadtools;
//using Leadtools.Annotations.Core;
using Leadtools.Codecs;
using Leadtools.Forms;
using Leadtools.Forms.Auto;
using Leadtools.Ocr;
using Leadtools.Forms.Processing;
using Leadtools.Forms.Recognition;
using Leadtools.Forms.Recognition.Ocr;
using Leadtools.JSDemos.Tools.Helpers;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data;
using System.Data.SQLite;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Xml;
using System.Xml.Linq;
using System.Xml.XPath;
using WebApp.Models;

namespace WebApp.Controllers
{
  
    public class GenerateFileController : ApiController
    {
        string RootFolderName = System.Configuration.ConfigurationManager.AppSettings["RootFolderName"];
        private DiskMasterFormsRepository workingRepository;

        [EnableCors("*", "*", "*")]
        public HttpResponseMessage CreateFiles(FormDataCollection Form)
        {
            HttpResponseMessage httpResponseMessage = Request.CreateResponse(HttpStatusCode.OK, "Some problem in create master form set.");
            try
            {
                if (Form != null)
                {
                    string FileName = Form["FileName"]?.ToString().Trim() ?? "";
                    string folderName = Form["FolderName"]?.ToString().Trim() ?? "";
                    string FriendlyName = Form["FriendlyName"]?.ToString().Trim() ?? "";

                    string workingDirectory = HttpContext.Current.Server.MapPath("~/" + RootFolderName + "/" + FriendlyName);
                    string tempDirectory = HttpContext.Current.Server.MapPath("~/" + RootFolderName + "/temp");
                    string filePath = tempDirectory + @"\" + FileName;

                    if (Directory.Exists(workingDirectory) && Directory.Exists(tempDirectory) && File.Exists(filePath))
                    {
                        ServiceHelper.SetLicense();
                        RasterImage scannedImage = null;
                        using (RasterCodecs _codecs = new RasterCodecs())
                        {
                            //scannedImage = _codecs.Load(filePath);

                            CodecsImageInfo info = _codecs.GetInformation(filePath, true);
                            int infoTotalPages = info.TotalPages;
                            scannedImage = _codecs.Load(filePath, 0, CodecsLoadByteOrder.BgrOrGray, 1, info.TotalPages);
                            DirectoryInfo directoryInfo = new DirectoryInfo(workingDirectory);
                            if (directoryInfo.GetFiles("*").ToList().Count == 0)
                            {
                                CreateMasterForms(scannedImage, workingDirectory, FriendlyName, folderName);
                                File.Delete(filePath);
                                httpResponseMessage = Request.CreateResponse(HttpStatusCode.OK, "Master form created successfully.");
                            }
                            else
                            {
                                workingRepository = new DiskMasterFormsRepository(_codecs, workingDirectory);
                                var diskMasterForm = workingRepository?.RootCategory?.MasterForms?.FirstOrDefault();
                                if (diskMasterForm != null)
                                {
                                    AddMasterFormPages(scannedImage, (DiskMasterForm)diskMasterForm, folderName);
                                }
                                File.Delete(filePath);
                                httpResponseMessage = Request.CreateResponse(HttpStatusCode.OK, "Page added to master form set successfully.");
                            }

                        }
                    }
                }
            }
            catch (Exception ex)
            {
                httpResponseMessage = Request.CreateResponse(HttpStatusCode.OK, "Some problem in create master form set." + ex.Message.ToString());
            }
            return httpResponseMessage;
        }
        [EnableCors("*", "*", "*")]
        public HttpResponseMessage DeletePage(FormDataCollection Form)
        {
            HttpResponseMessage httpResponseMessage = Request.CreateResponse(HttpStatusCode.OK, "Some problem in delete master form page.");
            if (Form != null)
            {
                string PageNumber = Form["PageNumber"]?.ToString().Trim() ?? "";
                string FolderName = Form["FolderName"]?.ToString().Trim() ?? "";
                string result = DBHelper.GetFileFriendlyName(FolderName);

                string workingDirectory = HttpContext.Current.Server.MapPath("~/" + RootFolderName + "/" + result);
                if (Directory.Exists(workingDirectory))
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
                            FormRecognitionAttributes attributes = currentMasterForm.ReadAttributes();

                            int currentPageIdx = Convert.ToInt32(PageNumber);

                            FormPages formPages = currentMasterForm.ReadFields();
                            RasterImage formImage = currentMasterForm.ReadForm();

                            //Delete page from master form attaributes
                            DeletePageFromMasterForm(currentPageIdx + 1, attributes); //page number here is 1 based
                                                                                      //Delete fields page
                            formPages.RemoveAt(currentPageIdx);
                            //Delete the page from the image
                            if (formImage.PageCount == 1)
                                formImage = null; //You cannot remove the only page from a rasterimage, an exception will occur
                            else
                                formImage.RemovePageAt(currentPageIdx + 1);

                            //We need to recreate the FormPages to ensure the page numbers are updated correctly
                            for (int i = 0; i < formPages.Count; i++)
                            {
                                FormPage currentPage = formPages[i];
                                FormPage newPage = new FormPage(i + 1, currentPage.DpiX, currentPage.DpiY);
                                newPage.AddRange(currentPage.GetRange(0, currentPage.Count));
                                formPages[i] = newPage;
                            }
                            //Write the updated masterform to disk. Delete it first just in case the entire image was deleted
                            DiskMasterFormsCategory parentCategory = (workingRepository.RootCategory) as DiskMasterFormsCategory;
                            parentCategory.DeleteMasterForm(currentMasterForm);
                            parentCategory.AddMasterForm(attributes, formPages, formImage);
                            httpResponseMessage = Request.CreateResponse(HttpStatusCode.OK, "Page deleted from master set sucessfully.");
                            DBHelper.UpdateTifPageCount(formPages.Count.ToString(), FolderName);
                        }
                    }
                }
            }
            return httpResponseMessage;
        }
        [EnableCors("*", "*", "*")]
        private RasterCodecs StartUpRasterCodecs()
        {
            RasterCodecs rasterCodecs = null;
            try
            {
                rasterCodecs = new RasterCodecs();
                //To turn off the dithering method when converting colored images to 1-bit black and white image during the load
                //so the text in the image is not damaged.
                RasterDefaults.DitheringMethod = RasterDitheringMethod.None;
            }
            catch (Exception exp)
            {
                throw;
            }
            return rasterCodecs;
        }
        private void CreateMasterForms(RasterImage Image, string masterformsdirectory, string masterformsname, string folderName)
        {
            try
            {
                IMasterFormsCategory parentCategory = null;
                string _masterformsdirectory = masterformsdirectory;
                string _masterformsname = masterformsname;
                RasterImage _masterformsimage = Image;
                //nothing selected, add it to root category
                RasterCodecs rasterCodecs = StartUpRasterCodecs();
                DiskMasterFormsRepository workingRepository = new DiskMasterFormsRepository(rasterCodecs, _masterformsdirectory);
                //BuildMasterFormList(workingRepository.RootCategory, _tvMasterForms.Nodes, true);
                parentCategory = workingRepository.RootCategory;
                //parentCategoryNode = _tvMasterForms.Nodes[0];
                //Add master form to repository and tree view
                IMasterForm newForm = parentCategory.AddMasterForm(CreateMasterForm(_masterformsname), null, (RasterImage)null);

                if (_masterformsimage != null)
                {
                    AddMasterFormPages(_masterformsimage, newForm as DiskMasterForm, folderName);
                }
            }
            catch (Exception exp)
            {
                //Messager.ShowError(this, exp);
            }
        }
        public FormRecognitionAttributes CreateMasterForm(string name)
        {
            FormRecognitionOptions options = new FormRecognitionOptions();
            FormRecognitionEngine recognitionEngine = SetupRecognitionEngine();
            FormRecognitionAttributes attributes = recognitionEngine.CreateMasterForm(name, new Guid(), options);
            recognitionEngine.CloseMasterForm(attributes);
            return attributes;
        }
        private FormRecognitionEngine SetupRecognitionEngine()
        {
            FormRecognitionEngine recognitionEngine = null;
            IOcrEngine ocrEngine = OcrEngineManager.CreateEngine(OcrEngineType.LEAD, false);
            ocrEngine.Startup(null, null, null, null);
            try
            {
                if (recognitionEngine == null)
                    recognitionEngine = new FormRecognitionEngine();

                //Add appropriate object managers to recognition engine
                recognitionEngine.ObjectsManagers.Clear();
                //if (_menuItemDefaultManager.Checked)
                //{
                //    DefaultObjectsManager defaultObjectManager = new DefaultObjectsManager();
                //    recognitionEngine.ObjectsManagers.Add(defaultObjectManager);
                //}

                //if (_menuItemOCRManager.Checked && ocrEngine.IsStarted)
                //{
                OcrObjectsManager ocrObejectManager = new OcrObjectsManager(ocrEngine);
                ocrObejectManager.Engine = ocrEngine;
                recognitionEngine.ObjectsManagers.Add(ocrObejectManager);
                //}

                //if (_menuItemBarcodeManager.Checked && barcodeEngine != null)
                //{
                //    BarcodeObjectsManager barcodeObjectManager = new BarcodeObjectsManager(barcodeEngine);
                //    barcodeObjectManager.Engine = barcodeEngine;
                //    recognitionEngine.ObjectsManagers.Add(barcodeObjectManager);
                //}
            }
            catch (Exception exp)
            {
                //Messager.ShowError(this, exp);
                throw;
            }
            return recognitionEngine;
        }
        private void AddMasterFormPages(RasterImage imagesToAdd, DiskMasterForm currentform, string folderName)
        {
            try
            {
                DiskMasterForm currentMasterForm = currentform;
                FormRecognitionAttributes attributes = currentMasterForm.ReadAttributes();
                FormPages formPages = currentMasterForm.ReadFields();
                RasterImage formImage = currentMasterForm.ReadForm();

                for (int i = 0; i < imagesToAdd.PageCount; i++)
                {
                    //Add each new page to the masterform by creating attributes for each page
                    imagesToAdd.Page = i + 1;
                    AddPageToMasterForm(imagesToAdd.Clone(), attributes, -1, null);
                }

                //Add image
                if (formImage != null)
                    formImage.AddPages(imagesToAdd.CloneAll(), 1, imagesToAdd.PageCount);
                else
                    formImage = imagesToAdd.CloneAll();

                //Only add processing pages for the new pages
                if (formPages != null)
                {
                    for (int i = 0; i < imagesToAdd.PageCount; i++)
                        formPages.Add(new FormPage(formPages.Count + 1, imagesToAdd.XResolution, imagesToAdd.YResolution));
                }
                else
                {
                    //No processing pages exist so we must create them
                    FormRecognitionEngine recognitionEngine = SetupRecognitionEngine();
                    FormProcessingEngine tempProcessingEngine = new FormProcessingEngine();
                    tempProcessingEngine.OcrEngine = OcrEngineManager.CreateEngine(OcrEngineType.LEAD, false);
                    //tempProcessingEngine.BarcodeEngine = barcodeEngine;

                    for (int i = 0; i < recognitionEngine.GetFormProperties(attributes).Pages; i++)
                        tempProcessingEngine.Pages.Add(new FormPage(i + 1, imagesToAdd.XResolution, imagesToAdd.YResolution));

                    formPages = tempProcessingEngine.Pages;
                }

                //FormField newField = null;
                //AnnHiliteObject newObject = new AnnHiliteObject();
                //newField = new TextFormField();
                //newField.Name = "test";
                //newField.Bounds = new LogicalRectangle(50, 50, 50, 50, LogicalUnit.Pixel);

                //FormField newField1 = null;
                //AnnHiliteObject newObject1 = new AnnHiliteObject();
                //newField1 = new OmrFormField();
                //newField1.Name = "test1";
                //newField1.Bounds = new LogicalRectangle(50, 50, 50, 50, LogicalUnit.Pixel);

                //newObject.Tag = newField;
                //newObject1.Tag = newField1;
                //FormField currentField = newObject.Tag as FormField;
                //FormField currentField1 = newObject1.Tag as FormField;

                //formPages[0].Add(currentField);
                //formPages[0].Add(currentField1);

                currentMasterForm.WriteForm(formImage);
                currentMasterForm.WriteAttributes(attributes);
                currentMasterForm.WriteFields(formPages);
                DBHelper.UpdateTifPageCount(formImage.PageCount.ToString(), folderName);
            }
            catch (Exception ex)
            {
                throw;
            }

        }
        public void AddPageToMasterForm(RasterImage image, FormRecognitionAttributes attributes, int pageIndex, PageRecognitionOptions pageOptions)
        {
            try
            {
                FormRecognitionEngine recognitionEngine = SetupRecognitionEngine();
                recognitionEngine.OpenMasterForm(attributes);
                recognitionEngine.InsertMasterFormPage(pageIndex, attributes, image, pageOptions, null);
                recognitionEngine.CloseMasterForm(attributes);
            }
            catch (Exception ex)
            {

                throw;
            }
        }
        private void DeletePageFromMasterForm(int pagenumber, FormRecognitionAttributes form)
        {
            FormRecognitionEngine recognitionEngine = SetupRecognitionEngine();
            recognitionEngine.OpenMasterForm(form);
            recognitionEngine.DeleteMasterFormPage(form, pagenumber);
            recognitionEngine.CloseMasterForm(form);
        }
    }
}
