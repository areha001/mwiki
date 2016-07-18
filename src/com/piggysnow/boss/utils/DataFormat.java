package com.piggysnow.boss.utils;

import java.io.IOException;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;

import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.io.xml.DomDriver;

public class DataFormat {
	public static int f(){return 1;}
	public static String getXMLFromList(long recordTotal,List beanList){
		Total total = new Total();
		total.setResult(recordTotal);//设计记录总数
		List results = new ArrayList();//创建历史的list对象
		results.add(total);
		results.addAll(beanList);
		XStream sm = new XStream(new DomDriver()); //创建 XStream 对象.
		for(int i=0;i<results.size();i++){
			Class c = results.get(i).getClass();
			String b = c.getName();
			String[] temp = b.split("\\.");
			sm.alias(temp[temp.length-1],c);
		}
		String xml = "<?xml version=\"1.0\"encoding=\"utf-8\"?>"+sm.toXML(results);
		return xml;
	}
	/**总数*/
	public static class Total implements Serializable{
		private long result;
		public long getResult() {
			return result;
		}
		public void setResult(long result) {
			this.result = result;
		}
		
	}

	public static String getJsonFormList(long recordTotal,List beanList, HashMap<String,Object> moreInfo){
		TotalJson total = new TotalJson();
		total.setResults(recordTotal);
		total.setItems(beanList);
		total.setMoreInfo(moreInfo);
		JSONObject jsonArray = JSONObject.fromObject(total);
		return jsonArray.toString();
	}
	public static String getJsonFormList(long recordTotal,List beanList){
		TotalJson total = new TotalJson();
		total.setResults(recordTotal);
		total.setItems(beanList);
		JSONObject jsonArray = JSONObject.fromObject(total);
		return jsonArray.toString();
	}
	//配合EXT分页使用的特殊返回JSON的方法
	public static <T> String getJsonFormArrayList(int recordTotal,List<T[]> beanList,long star,long limit){
		TotalJson total = new TotalJson();
		total.setResults(recordTotal);
		total.setStar(star);
		total.setLimit(limit);
		List<HashMap> list = new ArrayList<HashMap>();
		for(int x=0 ; x< beanList.size(); x++){
			HashMap hm = new HashMap<String, Object>();
			hm.put("id", String.valueOf(x));
			Object[] oArr = beanList.get(x);
			list.add(hm);
			for(int i=0 ;i <oArr.length ; i++)
				hm.put("e"+i, oArr[i]);
		}
		total.setItems(list);
		JSONObject jsonArray = JSONObject.fromObject(total);
		return jsonArray.toString();
	}

	public static class DataJson{
		private Object data;
		private boolean success;
		public DataJson(){}
		public DataJson(Object data){
			this.data = data;
			this.success = true;
		}
		public Object getData() {
			return data;
		}
		public void setData(Object data) {
			this.data = data;
		}
		public boolean isSuccess() {
			return success;
		}
		public void setSuccess(boolean success) {
			this.success = success;
		}
	}
	
	public static String toJson(Object o){
		DataJson dj = new DataJson(o);
		JSONObject jo = JSONObject.fromObject(dj);
		return jo.toString();
	}
	//配合EXT分页使用的特殊返回JSON的方法
	public static String getJsonFormList(long recordTotal,List beanList,HttpServletRequest request){
		TotalJson total = new TotalJson();
		total.setResults(recordTotal);
		total.setItems(beanList);
		total.setStar(Long.valueOf(request.getParameter("start")));
		total.setLimit(Long.valueOf(request.getParameter("limit")));
		JSONObject jsonArray = JSONObject.fromObject(total);
		return jsonArray.toString();
	}
	//配合EXT分页使用的特殊返回JSON的方法
	public static String getJsonFormList(long recordTotal,List beanList,long star,long limit){
		TotalJson total = new TotalJson();
		total.setResults(recordTotal);
		total.setItems(beanList);
		total.setStar(star);
		total.setLimit(limit);
		JSONObject jsonArray = JSONObject.fromObject(total);
		return jsonArray.toString();
	}
	//配合EXT分页使用的特殊返回JSON的方法
	public static String getJsonFormList(long recordTotal,List beanList,long star,long limit, JsonConfig jc){
		TotalJson total = new TotalJson();
		total.setResults(recordTotal);
		total.setItems(beanList);
		total.setStar(star);
		total.setLimit(limit);
		JSONObject jsonArray = JSONObject.fromObject(total , jc);
		return jsonArray.toString();
	}
	//过滤掉数据里面的HTML标签
	public static String Html2Text(String inputString){
          String htmlStr = inputString; //含html标签的字符串 
	      String textStr =""; 
	      java.util.regex.Pattern p_script; 
	      java.util.regex.Matcher m_script; 
	      java.util.regex.Pattern p_style; 
	      java.util.regex.Matcher m_style; 
	      java.util.regex.Pattern p_html; 
	      java.util.regex.Matcher m_html; 
	   
	      try { 
		      String regEx_script = "<[\\s]*?script[^>]*?>[\\s\\S]*?<[\\s]*?\\/[\\s]*?script[\\s]*?>"; //定义script的正则表达式{或<script[^>]*?>[\\s\\S]*?<\\/script> } 
		      String regEx_style = "<[\\s]*?style[^>]*?>[\\s\\S]*?<[\\s]*?\\/[\\s]*?style[\\s]*?>"; //定义style的正则表达式{或<style[^>]*?>[\\s\\S]*?<\\/style> } 
	          String regEx_html = "<[^>]+>"; //定义HTML标签的正则表达式 
	      
	          p_script = Pattern.compile(regEx_script,Pattern.CASE_INSENSITIVE); 
	          m_script = p_script.matcher(htmlStr); 
	          htmlStr = m_script.replaceAll(""); //过滤script标签 
	
	          p_style = Pattern.compile(regEx_style,Pattern.CASE_INSENSITIVE); 
	          m_style = p_style.matcher(htmlStr); 
	          htmlStr = m_style.replaceAll(""); //过滤style标签 
	      
	          p_html = Pattern.compile(regEx_html,Pattern.CASE_INSENSITIVE); 
	          m_html = p_html.matcher(htmlStr); 
	          htmlStr = m_html.replaceAll(""); //过滤html标签 
	          textStr = htmlStr; 
	      }catch(Exception e) { 
	           e.printStackTrace();
	      } 
          return textStr;//返回文本字符串 
   }
	
	//改变字符串的编码的方法
	public String changeCharEncoding(String str) throws IOException{
		return new String(str.getBytes("iso-8859-1"),"utf-8");
	}
	
	//文件上传时生成新的文件名方法
	public String getNewName(String fileName){
		return System.currentTimeMillis() + fileName.trim();
	}
}
