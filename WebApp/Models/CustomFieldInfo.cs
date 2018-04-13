using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class CustomFieldInfo
    {
        public string Name { get; set; }
        public int ObjectId { get; set; }
        public Bound Bounds { get; set; }
        public OcrFieldInfo OcrFieldInfo { get; set; }
        public OmrFieldInfo OmrFieldInfo { get; set; }
    }
    public class Bound
    {
        public decimal Top { get; set; }

        public decimal Left { get; set; }
        public decimal Height { get; set; }
        public decimal Width { get; set; }
    }

    public class OcrFieldInfo
    {
        public bool Character { get; set; }
        public bool Numeric { get; set; }
        public bool Data { get; set; }
        public bool EnableOCR { get; set; }
        public bool EnableICR { get; set; }
        public bool Words { get; set; }
        public bool CellBoarders { get; set; }
    }
    public class OmrFieldInfo
    {
        public bool Lowest { get; set; }

        public bool Low { get; set; }
        public bool High { get; set; }
        public bool Highest { get; set; }
        public bool Auto { get; set; }
        public bool WithFrame { get; set; }
        public bool WithoutFrame { get; set; }
    }
}