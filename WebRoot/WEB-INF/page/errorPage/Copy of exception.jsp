<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="../admin/taglibs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8" /> 
	<title>信息管理</title>
</head>
<body>
${exception}
<c:set var="myex" value="${exception}"/>
<c:forEach var="i" begin="1" end="10">
<c:set var="myexc" value="${myex.cause}"/>
<c:if test="${!empty myexc}">
<c:set var="myex" value="myexc"/>
</c:if>
</c:forEach>
<c:set var="traces" value="${myex.stackTrace}"/>
<c:forEach var="tra" items="${traces}">
${tra}<br/>
</c:forEach>
</body>
</html>
