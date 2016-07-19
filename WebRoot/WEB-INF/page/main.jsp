<%@ page language="java" contentType="text/html" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/page/common/taglibs.jsp"%>
最近更新<br/>
<div class="container">
 	<c:forEach var="i" items="${list }">
 		<div class="item item_one" id="item_${i.id }">
  		<h2><a href="<c:url value='/item/${i.id }'/>">${i.name } </a></h2>
  		<div class="item_content"><c:out value="${i.content }" escapeXml="true"/></div>
  		<p class="item_p_more"><a class="more" href="<c:url value='/item/${i.id }'/>">点击查看详请--&gt;</a></p>
 		</div>
 	</c:forEach>
 </div>
