using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public static class CommonClassModel
    {
        public static string RootDirectoryName { get; } = ConfigurationManager.AppSettings["RootDirectryName"] ?? "";
        public static string ChildDirectoryName { get; } = ConfigurationManager.AppSettings["ChildDirectryName"] ?? "";
        public static string RootFolderName { get; } = ConfigurationManager.AppSettings["RootFolderName"] ?? "";
        public static string Annotation { get; } = ConfigurationManager.AppSettings["Annotation"] ?? "";
        public static string ConnectionString { get; } = $"Data Source={HttpContext.Current.Server.MapPath("~/App_Data/MasterFormDB.sdf")}";
        public static string omrAnnotationColor { get; set; } = "magenta";
        
    }
}