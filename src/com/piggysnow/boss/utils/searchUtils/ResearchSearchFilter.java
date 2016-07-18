package com.piggysnow.boss.utils.searchUtils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.piggysnow.common.utils.TimeUtil;

/**
 * 搜索过滤器
 * */
public class ResearchSearchFilter {

	private String hql;
	
	private List dataList;
	
	private String requestUrl;
	
	private Map requestMap;

	private String createTimeString;
	
	/**
	 * 初始化过滤器
	 * */
	public ResearchSearchFilter(HttpServletRequest request , String...createTimeStringArr )
	{
		if(createTimeStringArr.length==0)
			createTimeString = " i.createTime ";
		else
			createTimeString = createTimeStringArr[0];
		
		String createTimeMin = request.getParameter("createTimeMin");
		String createTimeMax = request.getParameter("createTimeMax");
		String researchType = request.getParameter("researchType");
		String researchName = null;
		String author = null;
		
		requestMap = new HashMap();
		try
		{
			researchName = new String(request.getParameter("researchName").getBytes("ISO-8859-1"), "utf-8");
			author = new String(request.getParameter("author").getBytes("ISO-8859-1"), "utf-8");
		}
		catch(Exception e){e.printStackTrace();}
		
		this.dataList =  new ArrayList();
		StringBuilder sb = new StringBuilder();
		if(createTimeMin!=null && !"".equals(createTimeMin))
		{
			sb.append(" and "+ createTimeString +" >= ? ");
			dataList.add(TimeUtil.formatToDate(createTimeMin));
			requestMap.put("createTimeMin", createTimeMin);
		}
		if(createTimeMax!=null && !"".equals(createTimeMax))
		{
			sb.append(" and  "+ createTimeString +"  <= ? ");
			dataList.add(TimeUtil.formatToDate(createTimeMax));
			requestMap.put("createTimeMax", createTimeMax);
		}
		if(author!=null && !"".equals(author))
		{
			if(createTimeStringArr.length==0)
			{
				sb.append(" and i.creatorName = ? ");
			}
			else
			{
				sb.append(" and i.user.name = ? ");
			}
			dataList.add(author);
			requestMap.put("author", author);
		}
		if(researchName!=null && !"".equals(researchName))
		{
			sb.append(" and r.name like ?  ");
			dataList.add("%"+researchName+"%");
			requestMap.put("researchName", researchName);
		}
		if(researchType!=null && !"".equals(researchType))
		{
			sb.append(" and r.researchType = ? ");
			dataList.add(Long.valueOf(researchType));
			requestMap.put("researchType", researchType);
		}		
		String uri = request.getRequestURI().replaceFirst(request.getContextPath()+"/", "")+"?";
		this.requestUrl = uri+request.getQueryString().replaceAll("\\&pageindex=\\d+", "").replaceAll("pageindex=\\d+\\&", "");
		this.hql = sb.toString();
	}
	/**
	 * 取得数据
	 * */
	public Object[] getDatas()
	{
		if(dataList == null)
			return new Object[]{};
		return this.dataList.toArray();
	}

	/**
	 * 取得数据
	 * */
	public Object[] getDatas(Object...objects)
	{
		List list = new ArrayList();
		for(Object obj: objects)
		{
			list.add(obj);
		}
		list.addAll(this.dataList);
		return list.toArray();
	}
	public String getRequestUrl() {
		return requestUrl;
	}
	public Map getRequestMap() {
		return requestMap;
	}
	public String getHql() {
		return hql;
	}
	
}
