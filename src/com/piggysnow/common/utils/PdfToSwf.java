package com.piggysnow.common.utils;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

/**
 * pdf转换为swf，为试卷提供预览功能
 * @author wangyu
 *
 */

public class PdfToSwf {
	private String inputFile;// 需要转换的文件
	private String outputFile;// 输出的文件
	private String pages = "0";
	
	public PdfToSwf(String inputFile, String outputFile){
		this.inputFile = inputFile;
		this.outputFile = outputFile;
	}
	
	@SuppressWarnings("unused")
	private PdfToSwf() {}
	
	/**
	 * 要转换的页数
	 * 0：全部转换
	 * 1：只转换第1页
	 * 1,2：转换第1页和第2页
	 * 1-10：转换第1页至第10页
	 * @param pages
	 */
	public void setPages(String pages){
		this.pages = pages;
	}
	public void convertToSwfLinux() throws IOException{
		// 注：不支持文件夹名中含空格的情况
		StringBuffer convertCmd = new StringBuffer("");
		convertCmd.append("pdf2swf -q /home/snow/abc.pdf");
		String[] cmds = new String[]{"pdf2swf","-q", inputFile, "-s flashversion=9", "-o",  outputFile};
//		convertCmd.append("pdf2swf -q ");
//		convertCmd.append(inputFile);
//		convertCmd.append(" -s flashversion=9 -o ");
//		convertCmd.append(outputFile);
		String errorMessage = null;
		try {
			errorMessage = SystemUtils.runSysCommand(cmds, null, null);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if (errorMessage != null && !errorMessage.trim().equals("")) {
			throw new IOException(errorMessage);
		}
	}
	public void convertToSwf() throws IOException{
		// 注：不支持文件夹名中含空格的情况
		String configPath = PdfToSwf.class.getClassLoader().getResource("swfTools.properties").getPath();
		Properties convertPro = this.getSwfToolsConfiger(configPath);
		//SWFTOOLS工具的安装路径
		String swfToolsPath = convertPro.getProperty("swfTools.path");
		StringBuffer convertCmd = new StringBuffer(swfToolsPath);
		convertCmd.append("pdf2swf -q ");
		if(!this.pages.equalsIgnoreCase("0")){
			convertCmd.append("--pages ").append(pages);
			convertCmd.append(" ");
		}
		convertCmd.append(inputFile);
		convertCmd.append(" -s flashversion=9 -o ");
		convertCmd.append(outputFile);
		String errorMessage = null;
		try {
			errorMessage = SystemUtils.runSysCommand(convertCmd.toString(), null, null);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if (errorMessage != null && !errorMessage.trim().equals("")) {
			throw new IOException(errorMessage);
		}
	}

	
	/**
	 * 取得配置文件
	 * 
	 * @param filePath
	 *            地址
	 * @return
	 */
	private Properties getSwfToolsConfiger(String filePath) {
		Properties mailPro = new Properties();
		try {
			InputStream in = new BufferedInputStream(new FileInputStream(
					filePath));
			mailPro.load(in);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return mailPro;

	}
	
	public static void main2(String[] args){
		PdfToSwf swf = new PdfToSwf("c:/web.pdf","c:/web.swf");
		try { 
			swf.setPages("1,2");
			swf.convertToSwf();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public static void main(String[] args){
		PdfToSwf swf = new PdfToSwf("/home/snow/abc.pdf","/home/snow/abc.swf");
		try {
			swf.setPages("0");
			swf.convertToSwfLinux();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
