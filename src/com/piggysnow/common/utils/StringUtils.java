package com.piggysnow.common.utils;

import java.net.URLEncoder;
import java.text.DecimalFormat;
import java.util.Random;

public class StringUtils {

	/**
	 * 字符串长度格式化，用于避免由于字符串过长破坏页面样式.
	 * 
	 * @param str
	 *            原字符串
	 * @param maxLength
	 *            最大长度
	 * @return 格式化后的字符串
	 */
	public static String lengthFormat(String str, int maxLength) {
		return str.length() > maxLength ? str.substring(0, maxLength) + "..."
				: str;
	}

	/**
	 * 用于判断一系列id拼在一起的字符串中是否包含此id
	 * 
	 * @param ids
	 *            类似“1,2,3,4,5,”的字符串
	 * @param id
	 *            字符形id
	 * @return 是否包含
	 */
	public static boolean contains(String ids, String id) {
		ids = "," + ids;
		return ids.contains("," + id + ",");
	}

	/**
	 * 将字节数转换为"KB"、"GB"等字符串
	 * 
	 * @param byteSize
	 * @return
	 * @author huangqiao
	 * @since 2007-11-15
	 */
	public static String formatByteSize(double byteSize) {
		String formatedByteSize = null;
		double size = 0.00;
		String unit = "B"; // 单位
		if (byteSize < 1024) {
			size = byteSize;
		} else if (byteSize >= 1024 && byteSize < 1024 * 1024L) {
			size = byteSize / 1024.00;
			unit = "KB";
		} else if (byteSize >= 1024 * 1024L && byteSize < 1024 * 1024 * 1024L) {
			size = byteSize / (1024L * 1024.00);
			unit = "MB";
		} else if (byteSize >= 1024 * 1024 * 1024L
				&& byteSize < 1024 * 1024 * 1024 * 1024L) {
			size = byteSize / (1024 * 1024L * 1024.00);
			unit = "GB";
		} else if (byteSize >= 1024 * 1024 * 1024 * 1024L
				&& byteSize < 1024 * 1024 * 1024 * 1024 * 1024L) {
			size = byteSize / (1024 * 1024 * 1024L * 1024.00);
			unit = "TB";
		} else if (byteSize >= 1024 * 1024 * 1024 * 1024 * 1024L
				&& byteSize < 1024 * 1024 * 1024 * 1024 * 1024 * 1024L) {
			size = byteSize / (1024 * 1024 * 1024 * 1024L * 1024.00);
			unit = "PB";
		}

		DecimalFormat df = new DecimalFormat("#.##");
		formatedByteSize = df.format(size) + " " + unit; // 最多保留小数点后两位
		return formatedByteSize;
	}
	
	
	/**
	 * 根据 资源的资源类型，获取资源类型小图标
	 * @param restype
	 * @return
	 */
	public static String getIconByResType(String restype){
		String iconName = "";
		if(restype.length() == 3){
			iconName = restype.toLowerCase()+".gif";
		}else{
			restype = restype.substring(restype.indexOf("/")+1);
			iconName = restype.toLowerCase()+".gif";
		}
		return iconName;
	}
	
	/**
	 * 根据 资源的中文节点路径，获取学科
	 * @param chineseNode
	 * @param type 课件，教案...
	 * @return
	 */
	public static String getResSubject(String chineseNode,String type){
		String subject = "";
		String[] subjects = chineseNode.split(">");
		if(subjects.length >= 2)
			subject = subjects[1];
		else
			subject = subjects[0];

		if(subject.length() == 2){
			subject = subject + type;
		}else if(subject.length() > 4){
			subject = subject.substring(0,2) + type;
		}
		
		return subject;
	}
	/**
	 * 根据数据生成 SQL in 子句
	 * */
	public static String createQuestionMarks(Object[] arr )
	{
		return createQuestionMarks(arr, "");
	}
	/**
	 * 根据数据生成 SQL in 子句
	 * */
	public static String createQuestionMarks(Object[] arr , String prefix)
	{
		if(arr==null || arr.length == 0)
			return "";
		StringBuilder sb = new StringBuilder(prefix);
		sb.append(" ( ? ");
		for(int i=1 ; i<arr.length; i++)
		{
			sb.append(" ,? ") ;
		}
		
		sb.append(" ) "); 
		return sb.toString();
	}
	
	/**
	 * 将String数组拼接成String，带separator
	 * */
	public static String join(Object[] objects, String separator) {
	    StringBuffer sb = new StringBuffer();
	    for (int i=0; i < objects.length; i++) {
	        if (i != 0) sb.append(separator);
	  	    sb.append(objects[i]);
	  	}
	  	return sb.toString();
	}

	
	/**
	 * 根据数据生成SQL in 字句 in的值为字符串
	 */
	public static String getInStatment(Object[] arr,String prefix)
	{
		if(arr==null || arr.length == 0)
			return "";
		StringBuilder sb = new StringBuilder(prefix);
		sb.append(" (");
		for(int i=0 ; i<arr.length; i++)
		{
			if(i==0){
				sb.append("'"+arr[i]+"'") ;
			}else{
				sb.append(",'"+arr[i]+"'") ;
			}
		}
		
		sb.append(") "); 
		return sb.toString();
	}
	
	private static String[] chars = new String[]{"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t",
		"u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9"};
	/**
	 * 取随机字符串
	 * */
	public static String getRandomString(int count)
	{
		StringBuilder sb = new StringBuilder();
		for(int i=0 ; i<count ; i++)
			sb.append(getRandomChar());
		return sb.toString();
	}	
	/**
	 * 取随机字符串
	 * */
	public static String getRandomString(int count, boolean withInt)
	{
		StringBuilder sb = new StringBuilder();
		if(withInt)
			for(int i=0 ; i<count ; i++)
				sb.append(getRandomChar());
		else
			for(int i=0 ; i<count ; i++)
				sb.append(getRandomCharWithoutInt());
			
		return sb.toString();
	}
	/**
	 * 取随机字符
	 * */
	private static String getRandomChar()
	{
		Random i = new Random();
		return chars [i.nextInt(chars.length)];
	}
	/**
	 * 取随机字符
	 * */
	private static String getRandomCharWithoutInt()
	{
		Random i = new Random();
		return chars [i.nextInt(26)];
	}

	public static String formatXML(String s)
	{
		return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").
		replace("\"", "&quot;").replace("'", "&apos;");

	}
}
