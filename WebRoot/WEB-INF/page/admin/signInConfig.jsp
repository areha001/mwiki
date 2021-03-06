<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="taglibs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8" /> 
	<title>信息管理</title>
	<link href="../js/ext-3.3.1/resources/css/ext-all.css" rel="stylesheet" type="text/css" />
	<link href="../js/ext-3.3.1/resources/css/xtheme-gray.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="../js/ext-3.3.1/adapter/ext/ext-base.js"></script>
	<script type="text/javascript" src="../js/ext-3.3.1/ext-all.js"></script>
	<script type="text/javascript" src="../js/ext-plugin/piggy.js"></script>

	<script type="text/javascript">
		window.extraButton = [];
		window.vmap = [];
		<c:forEach var="i" items="${itemMap}">
		vmap.push(["<c:out value='${i.key}' escapeXml='true'/>","${i.value}"]);
		</c:forEach>
		
	</script>
	<script type="text/javascript" src="js/const.js"></script>
	<script type="text/javascript" src="js/server-top.js"></script>
	<script type="text/javascript" src="js/editSignInConfig.js"></script>
	<script type="text/javascript" src="js/signInConfig.js"></script>
</head>
<body>
</body>
</html>