<%@page contentType="text/html; charset=utf-8" pageEncoding="UTF-8"%>
<%@include file="taglibs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8" /> 
	<title>管理</title>
	<link href="../js/ext-3.3.1/resources/css/ext-all.css" rel="stylesheet" type="text/css" />
	<link href="../js/ext-3.3.1/resources/css/xtheme-gray.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="../js/ext-3.3.1/adapter/ext/ext-base.js"></script>
	<script type="text/javascript" src="../js/ext-3.3.1/ext-all.js"></script>
	<script type="text/javascript" src="../js/ext-plugin/piggy.js"></script>
	<script>

	window.giftMap = {};
	<c:forEach var="i" items="${giftMap}">
	giftMap["<c:out value='${i.key}' escapeXml='true'/>"] = "<c:out value='${i.value}' escapeXml='true'/>"
	</c:forEach>

	var giftArr = [["","所有礼包ID"]];
	for(var i in giftMap){
		giftArr.push([i, i+":" + giftMap[i]]);
	}
	</script>
	<script type="text/javascript" src="js/giftCodeList.js"></script>
</head>
<body>
</body>
</html>