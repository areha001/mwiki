<%@ page language="java" contentType="text/html" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/page/common/taglibs.jsp"%>
<div class="bf_container_nav">
<ul>
<li class="normal"><a href="<c:url value='/'/>">首页</a></li>
<!-- 
<li class="normal"><a href="<c:url value='/word/list'/>">Lolita词条</a></li>
<li class="normal"><a href="<c:url value='/word/list'/>">常用词表</a></li> -->
<li class="last"></li>
</ul>
</div>
<div class="container">
	<div class="item " id="word_top">
		<div class="left top_left">
			<h3>Lo星人语言 - 从入门到精通</h3>
			<div class="word_info">
 				<c:forEach var="i" items="${list }" varStatus="vv">
				简介简介简介简介简介简介简介简介简介简介简介简介
				</c:forEach>
			</div>
		</div>
		<div class="right top_right">
			<h3><a href="<c:url value='/word/latest' />">最新词条</a></h3>
			<div class="word_info" id="latest_word">
 				<c:forEach var="i" items="${list }" varStatus="vv">
					<a href="<c:url value='/word/${i.name }' />">${i.name }</a>
				</c:forEach>
			</div>
		</div>
		<div class="clear before_bottom"></div>
	</div>
	<div class="item" id="word_top">
		<div class="left itemw30">
			<h3><a href="<c:url value='/word/category/店铺名称' />">店铺名称</a></h3>
			<div class="word_info">
 				<c:forEach var="i" items="${list }" varStatus="vv">
					<a href="<c:url value='/word/${i.name }' />">${i.name }</a>
				</c:forEach>
			</div>
		</div>
		<div class="left itemw30">
			<h3><a href="<c:url value='/word/category/柄图简称' />">柄图简称</a></h3>
			<div class="word_info">
 				<c:forEach var="i" items="${list }" varStatus="vv">
					<a href="<c:url value='/word/${i.name }' />">${i.name }</a>
				</c:forEach>
			</div>
		</div>
		<div class="left itemw30">
			<h3><a href="<c:url value='/word/category/常用词语' />">常用词语</a></h3>
			<div class="word_info">
 				<c:forEach var="i" items="${list }" varStatus="vv">
					<a href="<c:url value='/word/${i.name }' />">${i.name }</a>
				</c:forEach>
			</div>
		</div>
		<div class="clear before_bottom page_bottom"></div>
	</div>
 </div>
