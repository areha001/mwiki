package com.piggysnow.boss.utils;

import java.io.File;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

public class FileUtils {

	public static File fromRequest(HttpServletRequest request, HashMap<String, String> hm) throws Exception{
			File f = null;
		  boolean isMultipart = ServletFileUpload.isMultipartContent(request);
		  if (isMultipart) {
	            DiskFileItemFactory factory = new DiskFileItemFactory(1024 * 1024 * 20, null);
	            ServletFileUpload upload = new ServletFileUpload(factory);
	            upload.setHeaderEncoding("UTF-8");
	            upload.setSizeMax(1024 * 1024 * 20);
	            List<FileItem> fileItems = upload.parseRequest(request);
	            Iterator<FileItem> iter = fileItems.iterator();
	            while (iter.hasNext()) {
	                FileItem item = (FileItem) iter.next();
	                if (item.isFormField()) {
	                    String name = item.getFieldName();
	                    String value = item.getString("UTF-8");
	                    hm.put(name, value);
	                } else {
	                    byte[] filebytes = item.get();
	                    if (item.getName()==null || item.getName().isEmpty()) {
	                        continue;
	                    }
	                    String fname = item.getName();
	                    String content = new String(filebytes, "utf-8");
	                    f = PhpFileUtil.saveFile(fname, content);
	                }
	            }
	        }
		  return f;
	}
}
