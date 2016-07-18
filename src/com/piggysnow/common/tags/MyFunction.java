package com.piggysnow.common.tags;

import java.io.UnsupportedEncodingException;

import org.apache.poi.util.StringUtil;

/**
 * 用于截断字符显示
 * 
 */
public class MyFunction {

	static final int DOT_COUNT = 3;

	public static String escape(String str)
	{
		if(str==null)
			return "";
		return str.replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quote;").
				replaceAll("'", "&#93;").replace("&", "&amp;").replace("\n", "<br/>").replace(" ", "&nbsp;");
	}
	
	public static String truncate(String str, int len) {

		if (str.length() <= len)
			return str;
		int doubleLen = len * 2;
		int passedChar = 0;
		int i;
		for(i=0; i<str.length()&& passedChar<doubleLen ; i++)
		{
			if(str.substring(i,   i+1).matches("[\\u4e00-\\u9fa5]+"))
				passedChar = passedChar + 2;
			else
				passedChar++;
			
		}
		String short_str = str.substring(0, i);
		return short_str + "...";
	}

	public static String encodeUrl(String url) {
		String newUrl = url.replaceAll("\\?", "%3F").replaceAll("\\&", "%26");
		return newUrl;
	}

	public static String uriEncoding(String param) {
		try {
			param = new String(param.getBytes("ISO-8859-1"), "utf-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return param;
	}

	public static void main(String[] args) {
		System.out.println(truncate(
				"1234567890１２３４５６７８９厅热噶登革热个合成塔一fdgfgdfgfdgfdgfdg", 15));
	}

}
