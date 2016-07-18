<%@ page language="java" contentType="text/html" pageEncoding="utf-8"%>
<%@include file="../admin/taglibs.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<title>文件名映射控制器</title>
</head>  
  <body>
  	<c:forEach var="i" items="${list }">
  		${i.name } <br/>
  	</c:forEach>
  </body>
</html>
