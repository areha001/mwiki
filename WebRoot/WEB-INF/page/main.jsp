<%@ page language="java" contentType="text/html" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/page/common/taglibs.jsp"%>
 Welcomeddd<br/>
 ${k }
<div class="container">
 	<c:forEach var="i" items="${list }">
 		<div class="item" id="item_${i.id }">
  		<h2>${i.name } </h2>
  		<div class="item_content"><c:out value="${i.content }" escapeXml="true"/></div>
  		<p><a class="more" href="<c:url value='/item/${i.id }'/>">点击查看详请--&gt;</a></p>
  		<p>------------</p>
 		</div>
 	</c:forEach>
 </div>
