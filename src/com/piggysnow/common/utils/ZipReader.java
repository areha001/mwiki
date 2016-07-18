package com.piggysnow.common.utils;
import   java.io.*;
import   java.util.zip.*;

public class ZipReader {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		extZipFileList( "D:/bbb.zip",   "D:/aa/");
	}

	private static void extZipSteam(InputStream is, String extPlace)
	{
		File dir = new File(extPlace);
		if(!dir.exists())
			dir.mkdirs();
		try  
		{
			ZipInputStream in = new ZipInputStream(is);
			ZipEntry entry = null;
			while ((entry = in.getNextEntry()) != null) 
			{
				String entryName = entry.getName();
				if (entry.isDirectory()) 
				{
					File file = new File(extPlace + entryName);
					file.mkdirs();
					System.out.println( "生成文件夹："   +   entryName);
				}   
				else   
				{
					File file = new File(extPlace + entryName);
					FileOutputStream os = new FileOutputStream(file);
					byte[] buf = new byte[1024];
					int   len;
					while ((len = in.read(buf)) > 0) {
					os.write(buf,   0,   len);
					}
					os.close();
					in.closeEntry();
				}
			}
		}
		catch (IOException e){
			e.printStackTrace();
		}
		System.out.println("解压完成");
	}
	private static void extZipFileList(String zipFileName, String extPlace) 
	{
		try
		{
			FileInputStream fis = new FileInputStream(zipFileName);
			extZipSteam(fis, extPlace);
		}
		catch(FileNotFoundException e){e.printStackTrace();}
	}

}
