<%@page contentType="text/html; charset=utf-8" pageEncoding="UTF-8"%>
<%@include file="taglibs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8" /> 
	<title>管理</title>
	<link href="../js/ext-3.3.1/resources/css/ext-all.css" rel="stylesheet" type="text/css" />
	<link href="../js/ext-3.3.1/resources/css/xtheme-gray.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="../js/ext-3.4.0/adapter/ext/ext-base.js"></script>
	<script type="text/javascript" src="../js/ext-3.4.0/ext-all.js"></script>
	<script type="text/javascript" src="../js/ext-plugin/piggy.js"></script>
	<script type="text/javascript" src="../js/ext-plugin/GridSummary.js"></script>
	<script>
	window.title = "${dq.name}"
	window.dqResult = ${list}
	window.dqKeys = "${dq.keys}";
	</script>
	<script type="text/javascript" src="js/dynamicExecute.js"></script>
</head>
<body>
</body>
</html>