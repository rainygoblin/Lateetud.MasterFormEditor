using System;
using System.Collections.Generic;
using System.Data.SQLite;
using System.Data;

namespace WebApp.Models
{
    public static class DBHelper
    {
        #region CreateDirectory
        public static string CreateDirectory(string key, string value, string tifPageCount)
        {
            SQLiteCommand command;
            string myQuery, responce = "fail";
            try
            {
                if (!string.IsNullOrEmpty(key?.Trim()) && !string.IsNullOrEmpty(value?.Trim()) && !string.IsNullOrEmpty(tifPageCount?.Trim()))
                {
                    using (SQLiteConnection dbConnection = new SQLiteConnection(CommonClassModel.ConnectionString))
                    {
                        myQuery = $"select Id from Directories where Key='{key.Trim()}' or Value='{value.Trim()}'";
                        command = new SQLiteCommand(myQuery, dbConnection);
                        dbConnection.Open();
                        string id = command.ExecuteScalar()?.ToString().Trim();
                        dbConnection.Close();
                        if (string.IsNullOrEmpty(id))
                        {
                            myQuery = $"insert into Directories (Value, TifPageCount, Key) values ('{value.Trim()}',{Convert.ToInt32(tifPageCount.Trim())}, '{key.Trim()}')";
                            command = new SQLiteCommand(myQuery, dbConnection);
                            dbConnection.Open();
                            int affectedRows = command.ExecuteNonQuery();
                            if (affectedRows > 0)
                            {
                                responce = "success";
                            }
                            dbConnection.Close();
                        }
                        else
                        {
                            responce = "exists";
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                responce = $"exception Message={ex.Message}";
            }
            return responce;
        }
        #endregion CreateDirectory

        #region DeleteDirectory
        public static string DeleteDirectory(string key)
        {
            SQLiteCommand command;
            string myQuery, responce = "fail";
            try
            {
                if (!string.IsNullOrEmpty(key.Trim()))
                {
                    using (SQLiteConnection dbConnection = new SQLiteConnection(CommonClassModel.ConnectionString))
                    {
                        myQuery = $"delete from Directories where Key ='{key.Trim()}'";
                        command = new SQLiteCommand(myQuery, dbConnection);
                        dbConnection.Open();
                        int affectedRows = command.ExecuteNonQuery();
                        if (affectedRows > 0)
                        {
                            responce = "success";
                        }
                        dbConnection.Close();
                    }
                }
            }
            catch (Exception ex)
            {
                responce = $"exception Message={ex.Message}";
            }
            return responce;
        }
        #endregion DeleteDirectory

        #region UpdateTifPageCount
        public static string UpdateTifPageCount(string tifPageCount, string key)
        {
            SQLiteCommand command;
            string myQuery, responce = "fail";
            try
            {
                if (!string.IsNullOrEmpty(tifPageCount.Trim()) && !string.IsNullOrEmpty(key.Trim()))
                {
                    using (SQLiteConnection dbConnection = new SQLiteConnection(CommonClassModel.ConnectionString))
                    {
                        myQuery = $"update Directories set TifPageCount ='{Convert.ToInt32(tifPageCount.Trim())}' where Key='{key.Trim()}'";
                        command = new SQLiteCommand(myQuery, dbConnection);
                        dbConnection.Open();
                        int affectedRows = command.ExecuteNonQuery();
                        if (affectedRows > 0)
                        {
                            responce = "success";
                        }
                        dbConnection.Close();
                    }
                }
            }
            catch (Exception ex)
            {
                responce = $"exception Message={ex.Message}";
            }
            return responce;
        }
        #endregion UpdateTifPageCount

        #region GetDirectoryList
        public static List<CreateDrictryModel> GetDirectoryList()
        {
            SQLiteCommand command;
            string myQuery, responce = "fail";
            List<CreateDrictryModel> Listmodel = null;
            CreateDrictryModel createDrictryModel;
            try
            {
                using (SQLiteConnection dbConnection = new SQLiteConnection(CommonClassModel.ConnectionString))
                {
                    myQuery = $"select * from Directories";
                    command = new SQLiteCommand(myQuery, dbConnection);
                    Listmodel = new List<CreateDrictryModel>();
                    dbConnection.Open();
                    
                   
                    SQLiteDataReader dataReader = command.ExecuteReader();
                    while (dataReader.Read())
                    {
                        createDrictryModel = new CreateDrictryModel();
                        createDrictryModel.Key = dataReader["Key"].ToString();
                        createDrictryModel.Value = dataReader["Value"].ToString();
                        createDrictryModel.TifPageCount = dataReader["TifPageCount"].ToString();
                        Listmodel.Add(createDrictryModel);
                    }

                    System.Data.DataTable dt = new DataTable();
                    SQLiteDataAdapter adp = new SQLiteDataAdapter();
                    adp.Fill(dt);
                    dbConnection.Close();
                }
            }
            catch (Exception ex)
            {
                responce = $"exception Message={ex.Message}";
            }
            return Listmodel;
        }
        #endregion GetDirectoryList

        #region GetFileFriendlyName
        public static string GetFileFriendlyName(string key)
        {
            SQLiteCommand command;
            string myQuery, responce = "fail";
            try
            {
                using (SQLiteConnection dbConnection = new SQLiteConnection(CommonClassModel.ConnectionString))
                {
                    myQuery = $"select Value from Directories where Key='{key}'";
                    command = new SQLiteCommand(myQuery, dbConnection);
                    dbConnection.Open();
                    responce = command.ExecuteScalar()?.ToString().Trim();
                    if (responce == null)
                    {
                        responce = "notexists";
                    }
                    dbConnection.Close();
                }
            }
            catch (Exception ex)
            {
                responce = $"exception Message={ex.Message}";
            }
            return responce;
        }
        #endregion GetFileFriendlyName
    }
}