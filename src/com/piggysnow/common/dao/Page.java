package com.piggysnow.common.dao;

import javax.servlet.http.HttpServletRequest;

/**
 * 通用页面对象，用于分页
 * 
 */
public class Page {
	private int totalPage = 1;// 总页数
	private int prePage = 1;// 前一页
	private int nextPage = 1;// 下一页
	private int totalResults = 0;// 总记录数
	private static final int defaultPageSize = 15;// 默认每页记录数
	private int pageSize = defaultPageSize;// 每页记录数
	private int pageIndex = 1;// 当前页码，从1开始算起 
	private HttpServletRequest request;

	private boolean doCount = true;
	public boolean isDoCount(){
		return doCount;
	}
	public Page() {
	}
	public Page(int end, boolean doCount){
		this.pageSize = end;
		this.doCount = doCount;
	}
	public Page(HttpServletRequest request)
	{
		this(request, "pageindex");
	}

	public Page(HttpServletRequest request, int pageSize)
	{
		this(request);
		this.pageSize = pageSize;
	}
	/**
	 * 根据总记录条数，当前页数，和每页条数初始化page对象
	 * */
	public Page(int totalResults, int pageIndex, int pageSize)
	{
		this.pageSize = pageSize;
		this.updateInfo(totalResults, pageIndex);
	}
	/**
	 * 根据总记录条数，当前页数更新page对象
	 * */
	public void updateInfo(int totalResults, int pageIndex)
	{
		this.totalResults = totalResults;
		this.pageIndex = pageIndex;
		this.setTotalPage((totalResults % pageSize == 0) ? (totalResults / pageSize): (totalResults / pageSize + 1));
		if (pageIndex - 1 > 0) {
			this.setPrePage(pageIndex - 1);
		}
		if (pageIndex + 1 <= this.totalPage) {
			this.setNextPage(pageIndex + 1);
		}
	}
	
	public Page(HttpServletRequest request, String identify)
	{
		String pageStr = request.getParameter(identify);
		int pageno = 1;
		if(pageStr!=null && !"".equals(pageStr))
			pageno = Integer.parseInt(pageStr);
		this.setPageIndex(pageno);
		
		if(request.getParameter("start")!=null && request.getParameter("limit")!=null)
		{
			this.pageSize = Integer.valueOf(request.getParameter("limit"));
			this.setPageIndex(Integer.valueOf(request.getParameter("start"))/ this.getPageSize() +1 );
		}
		
		this.request = request;
	}
	/**
	 * 用request初始化page时可以调用此方法获取jsp:page的url参数
	 * */
	public String getLink() throws Exception
	{
		if(request == null)
			return "";
		String pageRequestPath = request.getRequestURI().replaceFirst(request.getContextPath()+"(/)?", "");
		
		if(request.getQueryString()!=null)
			pageRequestPath = pageRequestPath +"?" + request.getQueryString().replaceAll("pageindex=(\\d)*\\&", "").replaceAll("\\&pageindex=(\\d)*", "");
		
		pageRequestPath = new String(pageRequestPath.getBytes("ISO-8859-1"), "utf-8");
		
		return pageRequestPath;
	}

	public Page(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getTotalPage() {
		return totalPage;
	}

	public void setTotalPage(int totalPage) {
		this.totalPage = totalPage;
	}

	public int getPrePage() {
		return prePage;
	}

	public void setPrePage(int prePage) {
		this.prePage = prePage;
	}

	public int getNextPage() {
		return nextPage;
	}

	public void setNextPage(int nextPage) {
		this.nextPage = nextPage;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getPageIndex() {
		return pageIndex;
	}

	public void setPageIndex(int pageIndex) {
		this.pageIndex = pageIndex;
	}

	public int getTotalResults() {
		return totalResults;
	}

	public void setTotalResults(int totalResults) {
		this.totalResults = totalResults;
	}
	
	public int getPageStart(){
		return (getPageIndex() - 1) * getPageSize();
	}
}
