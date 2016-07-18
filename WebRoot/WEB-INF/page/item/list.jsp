<%@ page language="java" contentType="text/html" pageEncoding="utf-8"%>
<%@include file="../admin/taglibs.jsp"%>
<!DOCTYPE html>
<html>
	<head>
		<title>文件名映射控制器</title>
</head>  
  <body>
  	<c:forEach var="i" items="${list }">
  		<h2>${i.name } </h2>
  		<div class="item_content"><c:out value="${i.content }" escapeXml="true"/></div>
  	</c:forEach>
  </body>
</html>
