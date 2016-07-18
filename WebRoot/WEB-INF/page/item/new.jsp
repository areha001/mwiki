<%@ page language="java" contentType="text/html" pageEncoding="utf-8"%>
<%@include file="../admin/taglibs.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<title>文件名映射控制器</title>
</head>  
  <body>
  	<form action="<c:url value='/item/add'/>" method="post">
		<p>title: <input type="text" name="name" /></p>
		<p>body: <textarea name="content" ></textarea></p>
		<p><input type="submit" value="dd"/></p>
	</form>
  </body>
</html>
