package com.piggysnow.boss.core.web.admin.controller;

import java.io.PrintWriter;
import java.util.Date;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

import com.piggysnow.boss.utils.DataFormat;
import com.piggysnow.common.utils.TimeUtil;

/**
 * 
 * 后台管理--教师管理 
 */

public class EasyController extends MultiActionController {

	static Logger log = Logger.getLogger(EasyController.class);
/*
	public static class GMEasyCaller {
		private Server s;

		public GMEasyCaller(Server s) {
			this.s = s;
		}

		public <T> T createRemote(Class<T> clz) {
			EasyCaller ec = EasyCaller.getInstance(s.toCoreServer(),5);
			return ec.createCrossRemote(clz, GMHandler.GMID);
		}
		public <T> T createRemote(Class<T> clz, int count) {
			EasyCaller ec = EasyCaller.getInstance(s.toCoreServer(),count);
			return ec.createCrossRemote(clz, GMHandler.GMID);
		}
	}
	
	protected GMEasyCaller call(Server s){
		return new GMEasyCaller(s);//EasyCaller.getInstance(s.toCoreServer());
	}
*/
	protected ModelAndView sendJson(HttpServletResponse response, int totalSize, List list) throws Exception{
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html");
		String info=DataFormat.getJsonFormList(totalSize,list);
		PrintWriter out = response.getWriter();
		out.print(info);
		log.info(" sendJson: " + info);
		out.flush();
		out.close();
		return null;
	}

	protected ModelAndView sendJsonWithInfo(HttpServletResponse response, int totalSize, List list, HashMap<String,Object> hm) throws Exception{
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html");
		String info=DataFormat.getJsonFormList(totalSize,list, hm);
		PrintWriter out = response.getWriter();
		out.print(info);
		log.info(" sendJson: " + info);
		out.flush();
		out.close();
		return null;
	}

	protected ModelAndView sendJson(HttpServletResponse response, String info) throws Exception{
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		out.print(info);
		log.info(" sendJson: " + info);
		out.flush();
		out.close();
		return null;
	}

	protected ModelAndView sendJson(HttpServletResponse response, boolean result) throws Exception{
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		
		JsonObjectWrapper jow = new JsonObjectWrapper();
		jow.setSuccess(result);
		String info = JSONObject.fromObject(jow).toString();
		out.print(info);
		log.info(" sendJson: " + info);
		out.flush();
		out.close();
		return null;
	}

	protected ModelAndView sendJson(HttpServletResponse response, Object o) throws Exception{
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		
		String info = JSONObject.fromObject(new JsonObjectWrapper(o)).toString();
		out.print(info);
		log.info(" sendJson: " + info);
		out.flush();
		out.close();
		return null;
	}
	
	public static class JsonObjectWrapper{
		private boolean success;
		private Object data;
		
		public JsonObjectWrapper(){}
		public JsonObjectWrapper(Object o){
			this.data = o;
			this.success = true;
		}
		public boolean isSuccess() {
			return success;
		}
		public void setSuccess(boolean success) {
			this.success = success;
		}
		public Object getData() {
			return data;
		}
		public void setData(Object o) {
			this.data = o;
		}
		
	}
	
	protected void showParameters(HttpServletRequest request) {
		Enumeration<String> e = request.getParameterNames();
		while (e.hasMoreElements()) {
			String k = e.nextElement();
			System.out.println(k + " --> " + request.getParameter(k));
		}
	}
	
	protected int getIntParameter(HttpServletRequest request, String key, int defVal) {
		String v = request.getParameter(key);
		if (StringUtils.isEmpty(v)) {
			return defVal;
		}
		return Integer.valueOf(v);
	}
	
	protected String getStringParameter(HttpServletRequest request, String key, String defVal) {
		String v = request.getParameter(key);
		if (StringUtils.isEmpty(v)) {
			return defVal;
		}
		return v;
	}

	protected long getLongParameter(HttpServletRequest request, String key, long defVal) {
		String v = request.getParameter(key);
		if (StringUtils.isEmpty(v)) {
			return defVal;
		}
		return Long.valueOf(v);
	}

	protected boolean getBoolParameter(HttpServletRequest request, String key) {
		String v = request.getParameter(key);
		if (StringUtils.isEmpty(v)) {
			return false;
		}
		return Boolean.valueOf(v);
	}
	
	protected Date getDateParameter(HttpServletRequest request, String key) {
		String v = request.getParameter(key);
		if (StringUtils.isEmpty(v)) {
			return null;
		}
		return TimeUtil.formatToDate(v);
	}

	
	protected void writeData(HttpServletResponse response, String str)throws Exception{
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		out.print(str);
		out.flush();
		out.close();
	}
}
