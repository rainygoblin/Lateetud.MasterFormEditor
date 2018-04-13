using Leadtools.Codecs;
using Leadtools.JSDemos.Models.Raster;
using Leadtools.JSDemos.Tools.Helpers;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Leadtools.JSDemos.Controllers
{
    /// <summary>
    /// For use with many of the JavaScript Demos, gathering basic information
    /// about an image and loading it.
    /// </summary>
    [EnableCors("*", "*", "*")]
    public class RasterController : ApiController
    {

        public RasterController()
        {
            // Unlock support
            ServiceHelper.SetLicense();
        }

        private static void Log(string message)
        {
            string tempPath = System.IO.Path.GetTempPath();
            string logFile = System.IO.Path.Combine(tempPath, "Raster.log");
            DateTime date = DateTime.Now;
            StringBuilder sb = new StringBuilder();
            sb.AppendLine();
            sb.AppendLine("==================================");
            sb.AppendFormat("*** Date: {0}", date.ToString());
            sb.AppendLine();
            sb.Append(message);
            sb.AppendLine();
            sb.AppendLine("==================================");
            File.AppendAllText(logFile, sb.ToString());
        }

        /// <summary>
        /// Gets the information about an image, such as mimetype, size, and resolution.
        /// </summary>
        /// <param name="uri">The source URI. http, ftp and file protocols are supported.</param>
        /// <param name="pageNumber">1-based page number.</param>
        /// <returns>The ImageInfo for the image at the URI.</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1026:DefaultParametersShouldNotBeUsed")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1822:MarkMembersAsStatic")]
        [HttpGet]
        public ImageInfo Info(Uri uri, int pageNumber = 1)
        {
            if (uri == null)
                throw new ArgumentNullException("uri");

            if (pageNumber < 0)
                throw new ArgumentOutOfRangeException("pageNumber", "must be a value greater than or equal to 0");

            var page = pageNumber;
            // Default is page 1
            if (page == 0)
                page = 1;

            // Use a temp file, much faster than calling Load/Info from a URI directly
            // In a production service, you might want to create a caching mechanism
            string tempFile = Path.GetTempFileName();
            try
            {
                // Force the uri to be fully qualified, reject everything else for security reasons
                if (uri.IsFile || uri.IsUnc)
                    throw new ArgumentException("URL cannot be local file or UNC path.");

                // Download the file
                if (File.Exists(HttpContext.Current.Server.MapPath("~/" + uri.LocalPath.ToString())))
                {
                    using (WebClient client = new WebClient())
                        client.DownloadFile(uri, tempFile);
                }
                else
                {
                    ImageInfo imginfo = new ImageInfo();
                    return imginfo;
                    //throw new FileNotFoundException("Master set detail does not exists.");
                }

                using (RasterCodecs codecs = new RasterCodecs())
                {
                    // Initialize the options for RasterCodecs
                    ServiceHelper.InitCodecs(codecs, 0);

                    using (CodecsImageInfo info = codecs.GetInformation(tempFile, true, page))
                    {
                        ImageInfo imageInfo = new ImageInfo();
                        imageInfo.Uri = uri.ToString();
                        imageInfo.FormatId = (int)info.Format;
                        imageInfo.FormatName = info.Format.ToString();
                        imageInfo.MimeType = RasterCodecs.GetMimeType(info.Format);
                        imageInfo.Width = info.Width;
                        imageInfo.Height = info.Height;
                        imageInfo.BitsPerPixel = info.BitsPerPixel;
                        imageInfo.BytesPerLine = info.BytesPerLine;
                        imageInfo.SizeDisk = info.SizeDisk;
                        imageInfo.SizeMemory = info.SizeMemory;
                        imageInfo.Compression = info.Compression;
                        imageInfo.ViewPerspective = GetViewPerspectiveName(info.ViewPerspective);
                        imageInfo.Order = info.Order.ToString();
                        imageInfo.ColorSpace = info.ColorSpace.ToString();
                        imageInfo.PageNumber = info.PageNumber;
                        imageInfo.TotalPages = info.TotalPages;
                        imageInfo.HasResolution = info.HasResolution;
                        imageInfo.XResolution = info.XResolution;
                        imageInfo.YResolution = info.YResolution;
                        imageInfo.IsRotated = info.IsRotated;
                        imageInfo.IsSigned = info.IsSigned;
                        imageInfo.HasAlpha = info.HasAlpha;

                        imageInfo.BrowserCompatible = false;

                        switch (info.Format)
                        {
                            case RasterImageFormat.Png:
                            case RasterImageFormat.Gif:
                            case RasterImageFormat.Jpeg:
                            case RasterImageFormat.Jpeg411:
                            case RasterImageFormat.Jpeg422:
                            case RasterImageFormat.JpegLab:
                            case RasterImageFormat.JpegLab411:
                            case RasterImageFormat.JpegLab422:
                            case RasterImageFormat.JpegRgb:
                                imageInfo.BrowserCompatible = true;
                                break;

                            default:
                                break;
                        }

                        return imageInfo;
                    }

                }
            }

            catch (Exception ex)
            {
                Log(string.Format("Info - Error:{1}{0}TempFile:{2}{0}Uri:{3}, PageNumber:{4}", Environment.NewLine, ex.Message, tempFile, uri, page));
                throw;
            }
            finally
            {
                if (File.Exists(tempFile))
                {
                    try
                    {
                        File.Delete(tempFile);
                    }
                    catch { }
                }
            }
        }

        /// <summary>
        /// Loads an image and returns it in one of the specfied formats.
        /// </summary>
        /// <param name="uri">The source URI. http, ftp and file protocols are supported.</param>
        /// <param name="pageNumber">1-based page number to load.</param>
        /// <param name="resolution">Resolution to use if the image does not have one. For example, to load a PDF or DOC file at 300 DPI, pass 300 for the resolution
        /// value.</param>
        /// <param name="mimeType">Output image format. Currently supports
        ///   "image/jpeg" for JPEG (Supported by all browsers),
        ///   "image/png" for PNG (Supported by all browsers),
        ///   "image/gif" for GIF (Supported by all browsers),
        ///   "image/tiff" for TIF (Not supported by default by any browser),
        ///   "image/x-lead-cmp" for LEAD CMP (Not supported by default by any browser),
        ///   "image/bmp" for BMP (Not supported by default by any browser),
        ///   "application/pdf" for PDF (Not supported by default by any browser),
        ///   "image/x-jpeg-2000" for JPEG 2000 (Not supported by default by any browser),
        ///   "image/x-lead-cmw" for LEAD CMW (Not supported by default by any browser),
        ///   "image/x-jpeg-xr" for JPEG XR (JXR) (Not supported by default by any browser),
        ///   "image/x-xps" for Microsoft XPS (Not supported by default by any browser).
        /// </param>
        /// <param name="bitsPerPixel">Save bits per pixel. The default value of 0 means to use the best value based on input image
        /// bits per pixel and the values supported by the output format.</param>
        /// <param name="qualityFactor">Quality factor. Used by JPEG, PNG and TIFF with embedded JPEG images.
        ///   0: Default value by the format. For example, 20 for JPEG and PNG images.
        ///   1 .. 99: Value to use. 1 = Low quality/Smallest image size, 99 = High quality/Largest image size. 
        ///   100: Highest quality. For JPEG, this produces lossless JPEG files that are not supported by any of the current browsers.
        /// </param>
        /// <param name="imageWidth">Width in pixels of the result image. Default value is 0 which means use the input image width. This method will use the value of
        /// width and height to resize the input image to a size that does not exceed "width" by "height" pixels, keeping the original
        /// image aspect ratio. To not use resizing, do not pass a parameter for width nor height.</param>
        /// <param name="imageHeight">Height in pixels of the result image.</param>
        /// <returns>A stream containing the image data.</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Performance", "CA1822:MarkMembersAsStatic")]
        [HttpGet]
        public HttpResponseMessage Load(Uri uri, int pageNumber = 1, int resolution = 0, string mimeType = null, int bitsPerPixel = 0, int qualityFactor = 0, int imageWidth = 0, int imageHeight = 0)
        {
            if (uri == null)
                throw new ArgumentNullException("uri");
            if (pageNumber < 0)
                throw new ArgumentOutOfRangeException("pageNumber", "must be a value greater than or equal to 0");

            var page = pageNumber;
            // Default is page 1
            if (page == 0)
                page = 1;

            if (resolution < 0)
                throw new ArgumentOutOfRangeException("resolution", "must be a value greater than or equals to 0");

            // Sanity check on other parameters
            if (qualityFactor < 0 || qualityFactor > 100)
                throw new ArgumentOutOfRangeException("qualityFactor", "must be a value between 0 and 100");

            if (imageWidth < 0)
                throw new ArgumentOutOfRangeException("width", "must be a value greater than or equal to 0");
            if (imageHeight < 0)
                throw new ArgumentOutOfRangeException("height", "must be a value greater than or equal to 0");

            // Get the image format
            SaveImageFormat saveFormat = SaveImageFormat.GetFromMimeType(mimeType);

            // Use a temp file, much faster than calling Load/Info from a URI directly
            // In a production service, you might want to create a caching mechanism
            string tempFile = Path.GetTempFileName();

            try
            {
                // Force the uri to be fully qualified, reject everything else for security reasons
                if (uri.IsFile || uri.IsUnc)
                    throw new ArgumentException("URL cannot be local file or UNC path.");

                //Download the file

                try
                {
                    using (WebClient client = new WebClient())
                    {
                        client.DownloadFile(uri, tempFile); // exception occurs when file is used by another process.(getting error code=>500(internal server error))
                    }

                    using (RasterCodecs codecs = new RasterCodecs())
                    {
                        ServiceHelper.InitCodecs(codecs, resolution);

                        // Load the page
                        using (RasterImage image = codecs.Load(tempFile, 0, CodecsLoadByteOrder.BgrOrGray, pageNumber, pageNumber))
                        {
                            // Resize it (will only resize if both width and height are not 0), will also take care of FAX images (with different resolution)
                            ImageResizer.ResizeImage(image, imageWidth, imageHeight);

                            // We need to find out the format, bits/pixel and quality factor
                            // If the user gave as a format, use it
                            if (saveFormat == null)
                            {
                                // If the user did not give us a format, use PNG
                                saveFormat = new PngImageFormat();
                                mimeType = "image/png";
                            }

                            saveFormat.PrepareToSave(codecs, image, bitsPerPixel, qualityFactor);

                            // Save it to a memory stream
                            MemoryStream ms = null;
                            HttpResponseMessage response = null;
                            try
                            {
                                ms = new MemoryStream();
                                codecs.Save(image, ms, saveFormat.ImageFormat, saveFormat.BitsPerPixel);
                                ms.Position = 0;

                                // Set the MIME type and Content-Type if there is a valid web context
                                HttpContext currentContext = HttpContext.Current;
                                if (currentContext != null)
                                {
                                    currentContext.Response.ContentType = mimeType;
                                    currentContext.Response.Headers.Add("ContentLength", ms.Length.ToString());
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
                    }
                }
                catch (Exception)
                {
                    return new HttpResponseMessage();
                }



            }
            catch (Exception ex)
            {
                Log(string.Format("Load - Error:{1}{0}TempFile:{2}{0}Uri:{3}, PageNumber:{4}", Environment.NewLine, ex.Message, tempFile, uri, pageNumber));
                throw;
            }
            finally
            {
                if (File.Exists(tempFile))
                {
                    try
                    {
                        File.Delete(tempFile);
                    }
                    catch { }
                }
            }
        }

        private static string GetViewPerspectiveName(RasterViewPerspective value)
        {
            switch (value)
            {
                case RasterViewPerspective.TopRight: return "TopRight";
                case RasterViewPerspective.BottomRight: return "BottomRight";
                case RasterViewPerspective.BottomLeft: return "BottomLeft";
                case RasterViewPerspective.LeftTop: return "LeftTop";
                case RasterViewPerspective.RightTop: return "RightTop";
                case RasterViewPerspective.RightBottom: return "RightBottom";
                case RasterViewPerspective.LeftBottom: return "LeftBottom";
                case RasterViewPerspective.TopLeft:
                default: return "TopLeft";
            }
        }
    }
}
