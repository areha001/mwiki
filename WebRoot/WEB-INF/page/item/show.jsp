<%@ page language="java" contentType="text/html" pageEncoding="utf-8"%>
<%@include file="../admin/taglibs.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<title>文件名映射控制器</title>
</head>  
  <body>
		<p>title: ${item.name }</p>
		<p>body: ${item.content }</p>
		<p><a href="javascript:window.history.back(-1);" >返回</a></p>
  </body>
</html>
