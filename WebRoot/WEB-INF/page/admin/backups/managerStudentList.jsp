<%@page contentType="text/html; charset=utf-8" pageEncoding="UTF-8"%>
<%@include file="../taglibs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv=content-type content="text/html; charset=utf-8" /> 
	<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
	<title>学生管理</title>
	<link href="../js/ext-3.3.1/resources/css/ext-all.css" rel="stylesheet" type="text/css" />
	<link href="../js/ext-3.3.1/resources/css/xtheme-gray.css" rel="stylesheet" type="text/css" />
	<script>
		var MANAGEABLE = ${empty manageable? true : manageable};
		var UPGRADE_PANEL = ${!empty param.upgrade};
		var URLSUFFIX = UPGRADE_PANEL? "&normal=true" : "";
		var STUDY_YEAR = {"id":"${sy.id}", "name":"<c:out value='${sy.name}' escapeXml='true'/>"};
		var CLAZZ = {"id":"${clazzid}","clazzName":"<c:out value='${clazz.clazzName}' escapeXml='true'/>",
		"grade":"${clazz.grade}", "edutype":"${clazz.edutype}"};
	</script>
	<script type="text/javascript" src="<c:url value='/js/ext-3.4.0/adapter/ext/ext-base.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/ext-3.4.0/ext-all.js'/>"></script>
	<script type="text/javascript" src="js/strangeChange.js"></script>
	<script type="text/javascript" src="js/managerStudentList.js"></script>
</head>
<body>
 <input type="hidden" id="studentName" value="${studentName}" /> 
</body>
</html>