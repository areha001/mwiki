package org.slave4j.utils;

import java.io.UnsupportedEncodingException;

import org.apache.commons.lang.StringUtils;

public class MyStringUtils
{
	/**
	 * iso8859-1转化为utf-8编码
	 * @param str
	 * @return
	 */
	public static String iso2utf(String str)
	{
		String result = StringUtils.stripToEmpty(str);
		try
		{
			result = new String(result.getBytes("ISO-8859-1"), "UTF-8");
		} catch (UnsupportedEncodingException e)
		{
			e.printStackTrace();
		}
		return result;
	}
}
