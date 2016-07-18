<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="../admin/taglibs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" /> 
	<title>信息管理</title>
	
</head>
<body>
<ul>
<c:forEach var="i" items="${list }">
<li><a target="_blank" href="webxml.do?method=gen&file=${i }">${i }</a></li>
</c:forEach>
</ul>
</body>
</html>