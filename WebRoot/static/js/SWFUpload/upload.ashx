<%@ WebHandler Language="C#" Class="Handler" %>

using System;
using System.Web;
using System.IO;

public class Handler : IHttpHandler
{

	public void ProcessRequest(HttpContext context)
	{
		if (context.Request.Files.Count == 0) return;

		HttpPostedFile file = context.Request.Files[0];
		if (file.ContentLength > 0)
		{
			file.SaveAs(context.Server.MapPath("Files/" + file.FileName));
			//string fn = (context.Request.Form["f_discription"] + "").Trim();
			//if (fn != "")
			//{
			//    StreamWriter sw = new StreamWriter(context.Server.MapPath("Files/" + file.FileName + ".txt"), false);
			//    sw.Write(fn);
			//    sw.Close();
			//}
		}
		context.Response.Write("ok");
	}

	public bool IsReusable
	{
		get
		{
			return false;
		}
	}

}