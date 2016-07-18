package com.piggysnow.boss.utils.searchUtils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.piggysnow.common.utils.StringUtils;
import com.piggysnow.common.utils.TimeUtil;

/**
 * 搜索过滤器
 * */
public class SearchFilter {

	private String hql;
	
	private List dataList;
	
	private String requestUrl;
	
	private String condition;
	
	private Map requestMap;

	private boolean keywordSearch = false;
	public static final int TYPE_ARTICLE = 1;
	public static final int TYPE_RESEARCH = 2;
	
	
	/**
	 * 初始化过滤器
	 * */
	public SearchFilter(HttpServletRequest request , int type)
	{
		String createTimeMin = request.getParameter("createTimeMin");
		String createTimeMax = request.getParameter("createTimeMax");
		String researchType = request.getParameter("researchType");
		String keyword = null;
		String author = null;
		String primaryTag = null;
		String tag = null;
		requestMap = new HashMap();
		try
		{
			if(request.getParameter("queryString")!=null)
			{
				keyword = new String(request.getParameter("queryString").getBytes("ISO-8859-1"), "utf-8");
				keyword = keyword.replaceAll(" ", "");
			}
			if(request.getParameter("author")!=null)
				author = new String(request.getParameter("author").getBytes("ISO-8859-1"), "utf-8");
			if(request.getParameter("primaryTag")!=null)
				primaryTag = new String(request.getParameter("primaryTag").getBytes("ISO-8859-1"), "utf-8");
			if(request.getParameter("tag")!=null)
				tag = new String(request.getParameter("tag").getBytes("ISO-8859-1"), "utf-8");
		}
		catch(Exception e){e.printStackTrace();}
		String teamId = request.getParameter("teamId");
		
		this.dataList =  new ArrayList();
		StringBuilder sb = new StringBuilder();
		List<String> con = new ArrayList<String>();
		if(createTimeMin!=null && !"".equals(createTimeMin))
		{
			sb.append(" and createTime >= ? ");
			dataList.add(TimeUtil.formatToDate(createTimeMin));
			con.add(" 晚于：" + createTimeMin );
			requestMap.put("createTimeMin", createTimeMin);
		}
		if(createTimeMax!=null && !"".equals(createTimeMax))
		{
			sb.append(" and createTime <= ? ");
			dataList.add(TimeUtil.formatToDate(createTimeMax));
			con.add(" 早于：" + createTimeMax );
			requestMap.put("createTimeMax", createTimeMax);
		}
		if(author!=null && !"".equals(author))
		{
			sb.append(" and creatorName = ? ");
			dataList.add(author);
			con.add(" 作者：" + author );
			requestMap.put("author", author);
		}
		if(keyword!=null && !"".equals(keyword))
		{
			if(type== SearchFilter.TYPE_ARTICLE)
			{
				sb.append(" and ( title like ? or primaryTag = ? or tagCache like ? ) ");
				dataList.add("%"+keyword+"%");
				dataList.add(keyword);
				dataList.add("%"+keyword+"%");
			}
			if(type== SearchFilter.TYPE_RESEARCH)
			{
				sb.append(" and ( name like ?  ) ");
				dataList.add("%"+keyword+"%");
			}
			con.add(" 关键字：" + keyword );
			requestMap.put("queryString", keyword);
			
		}
		if(teamId!=null && !"".equals(teamId))
		{
			sb.append(" and teamId = ? ");
			dataList.add(Long.valueOf(teamId));
			requestMap.put("teamId", teamId);
		}
		else
		{
			sb.append(" and teamId is not null");
		}
		if(primaryTag!=null && !"".equals(primaryTag))
		{
			sb.append(" and primaryTag = ? ");
			dataList.add(primaryTag);
			con.add(" 系统分类：" + primaryTag );
			requestMap.put("primaryTag", primaryTag);
		}		
		if(researchType!=null && !"".equals(researchType))
		{
			sb.append(" and researchType = ? ");
			dataList.add(Long.valueOf(researchType));
			con.add(" 系统分类：" + researchType );
			requestMap.put("researchType", researchType);
		}		
		if(tag!=null && !"".equals(tag))
		{
			sb.append(" and exists (select t.id from ArticleTag at, Tag t where at.tagId = t.id and at.articleId = a.id and t.name = ? ) ");
			keywordSearch = true;
			dataList.add(tag);
			con.add(" 标签："+tag );
		}
		
		this.requestUrl = "search.do?"+request.getQueryString().replaceAll("\\&pageindex=\\d+", "").replaceAll("pageindex=\\d+\\&", "");
		this.condition = StringUtils.join(con.toArray(), " 、");
		if("".equals(condition))
			this.condition = "全部";
		this.hql = sb.toString();
	}
	/**
	 * 取得文章类HQL
	 * */
	public String getArticleHql(int articleType )
	{
			return " from Article a where publicStatus > 4  " +
					" and articleType = " + articleType + " " + this.hql + " order by createTime desc ";
	}	
	/**
	 * 取得活动类HQL
	 * */
	public String getResearchHql()
	{
		return " from Research where status > 5 " + this.hql + " order by createTime desc ";
	}
	/**
	 * 取得数据
	 * */
	public Object[] getDatas()
	{
		return this.dataList.toArray();
	}
	public String getRequestUrl() {
		return requestUrl;
	}
	public String getTinyRequestUrl()
	{
		return this.requestUrl.replaceAll("primaryTag=(.*?)(\\&)", "");
	}
	public String getCondition() {
		return condition;
	}
	public Map getRequestMap() {
		return requestMap;
	}
	public boolean isKeywordSearch() {
		return keywordSearch;
	}
	
}
