using Leadtools.Codecs;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Hosting;

namespace Leadtools.JSDemos.Tools.Helpers
{
   internal static class ServiceHelper
   {
      public const string Key_License_FilePath = "lt.License.FilePath";
      public const string Key_License_DeveloperKey = "lt.License.DeveloperKey";
      public const string Key_Annotations_Temp_Url = "lt.Annotations.Temp.Url";
      public const string Key_Annotations_Temp_Dir = "lt.Annotations.Temp.Dir";
      public const string Key_Raster_OptionsPath = "lt.RasterCodecs.OptionsFilePath";

      private const int _defaultResolution = 300;

      public static void InitCodecs(RasterCodecs codecs, int resolution)
      {
         // See if we have an options file in the config
         string rasterCodecsOptionsFilePath = ServiceHelper.GetSettingValue(Key_Raster_OptionsPath);
         if (!string.IsNullOrEmpty(rasterCodecsOptionsFilePath) && File.Exists(rasterCodecsOptionsFilePath))
         {
            // Load the options
            codecs.LoadOptions(rasterCodecsOptionsFilePath);
         }

         // Set up any extra options to use here
         if (resolution == 0)
            resolution = _defaultResolution;

         // Set the load resolution
         codecs.Options.Wmf.Load.XResolution = resolution;
         codecs.Options.Wmf.Load.YResolution = resolution;
         codecs.Options.RasterizeDocument.Load.XResolution = resolution;
         codecs.Options.RasterizeDocument.Load.YResolution = resolution;
      }

      public static void SetLicense()
      {
         if (!RasterSupport.KernelExpired)
            return;

         // file path may be relative or absolute
         // dev key may be relative, absolute, or the full text
         string licensePath = null;
         string devKey = null;

         // First check the config file (appSettings)
         var licSetting = GetSettingValue(Key_License_FilePath);
         if (!string.IsNullOrEmpty(licSetting))
         {
            // If settings are wrong from here on out, we need to throw an exception
            licSetting = GetAbsolutePath(licSetting);
            if (File.Exists(licSetting))
            {
               licensePath = licSetting;

               // devKey can be relative, absolute, or file contents
               var devKeySetting = GetSettingValue(Key_License_DeveloperKey);
               if (devKeySetting != null)
                  devKeySetting = devKeySetting.Trim();

               if (devKeySetting != null && IsAbsolutePath(devKeySetting) && File.Exists(devKeySetting))
               {
                  var devKeyFile = devKeySetting;
                  devKey = File.ReadAllText(devKeyFile);
               }
               else if (devKeySetting != null)
               {
                  // Coule be a relative path or a developer key, see if the file exist
                  var devKeyFile = GetAbsolutePath(devKeySetting);
                  if (File.Exists(devKeyFile))
                     devKey = File.ReadAllText(devKeyFile);
                  else
                     devKey = devKeySetting;
               }
               else
               {
                  throw new InvalidOperationException("Developer key in configuration was invalid.");
               }
            }
            else
            {
               throw new InvalidOperationException("License file path in configuration does not exist.");
            }
         }
         else
         {
            // Was not found there, check the bin folder
            var currentContext = HttpContext.Current;
            if (currentContext != null && currentContext.Server != null)
            {
               string licBinPath = currentContext.Server.MapPath(@"~/bin/LEADTOOLS.LIC");
               if (File.Exists(licBinPath))
               {
                  licensePath = licBinPath;
                  // get value for devKey, process to get file contents
                  string devKeyBinPath = currentContext.Server.MapPath(@"~/bin/LEADTOOLS.LIC.key");
                  if (File.Exists(devKeyBinPath))
                     devKey = File.ReadAllText(devKeyBinPath);
               }
            }
         }

         if (!string.IsNullOrEmpty(licensePath) && !string.IsNullOrEmpty(devKey))
         {
            RasterSupport.SetLicense(licensePath, devKey);
         }
         else
         {
            // This will work for development if LEADTOOLS is installed on the machine
            RasterSupport.SetLicense("", "Nag");
         }
      }

      public static bool IsAbsolutePath(string path)
      {
         Uri result;
         return (Uri.TryCreate(path, UriKind.Absolute, out result));
      }

      public static string GetAbsolutePath(string relativePath)
      {
         if (string.IsNullOrEmpty(relativePath) || relativePath.IndexOfAny(Path.GetInvalidPathChars()) >= 0)
         {
            // Not a legal path
            return relativePath;
         }

         relativePath = relativePath.Trim();
         if (!Path.IsPathRooted(relativePath))
            relativePath = Path.Combine(HostingEnvironment.ApplicationPhysicalPath, relativePath);
         return relativePath;
      }

      public static string GetSettingValue(string key)
      {
         var currentContext = HttpContext.Current;
         if (currentContext != null)
         {
            // We are hosted as a service
            return ConfigurationManager.AppSettings[key];
         }
         else
         {
            // Load it from the config file
            Configuration config = ConfigurationManager.OpenExeConfiguration(typeof(ServiceHelper).Assembly.Location);
            if (config != null)
            {
               // Get the appSettings section
               AppSettingsSection appSettings = (AppSettingsSection)config.GetSection("appSettings");
               if (appSettings != null)
                  return appSettings.Settings[key].Value;
            }
         }

         return null;
      }

      public static string GetTempFolderPath()
      {
         // Returns the temp folder on the server (relative or absolute), not a URL
         string tempPath = GetSettingValue(Key_Annotations_Temp_Dir);

         if (!IsAbsolutePath(tempPath))
            tempPath = Path.Combine(HostingEnvironment.ApplicationPhysicalPath, tempPath);

         return tempPath;
      }

      public static void CleanupTemp()
      {
         string outDir = GetTempFolderPath();
         if (!Directory.Exists(outDir))
            return;

         // Check if we have old files in the directory, delete them
         DateTime yesterday = DateTime.Now;
         yesterday = yesterday.AddHours(-24);
         string[] files = Directory.GetFiles(outDir, "*.xml");
         foreach (string file in files)
         {
            DateTime fileTime = File.GetLastWriteTime(file);
            if (fileTime < yesterday)
            {
               // Delete it
               try
               {
                  File.Delete(file);
               }
               catch { }
            }
         }
      }
   }
}