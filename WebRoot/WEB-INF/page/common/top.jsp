<%@ page language="java" contentType="text/html" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/page/common/taglibs.jsp"%>
<div id="top_login_area">
  <a href="<c:url value='/item/new'/>">+添加Lo裙</a>
  <a class="ml30" href="<c:url value='/word/new'/>">+添加词汇</a>
</div>
  
 <div id="lo_search">
  <form id="searchform" action="<c:url value='/search'/>" method="get">
		  <input type="text" id="search_keyword" name="keyword" />
		  <input type="submit" id="search_btn" class="search_btn" value="搜索" onclick="return $('#search_keyword').val()!=''"/>
  </form>
 </div>