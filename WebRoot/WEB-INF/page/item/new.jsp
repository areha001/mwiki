<%@ page language="java" contentType="text/html" pageEncoding="utf-8"%>
<%@include file="../admin/taglibs.jsp"%>
<!DOCTYPE html>
<html>
	<head>
		<title>文件名映射控制器</title>
</head>  
  <body>
  	<form action="<c:url value='/item/add'/>" method="post">
		<p>title: <input type="text" name="name" /></p>
		<p>body: <textarea name="content" ></textarea></p>
		<p>TAG:<input type="text" name="tags" /></p>
		<p><input type="submit" value="dd"/></p>
	</form>
  </body>
</html>
