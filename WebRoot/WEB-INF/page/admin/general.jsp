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

	window.channelMap = {};
	<c:forEach var="i" items="${channelList}">
	channelMap["<c:out value='${i.dcode}' escapeXml='true'/>"] = "<c:out value='${i.name}' escapeXml='true'/>"
	</c:forEach>

		var channelData = [["","不限"]];

		for(var i in channelMap){
			channelData.push([i,  channelMap[i]]);
		}
	channelMap[""] = "所有"
	

	window.hashKeyArr = ['xdate','week','game','edition','channel','DailyUserCount','NewUserCount','RegUserCount',
	                  'RegAccCount','ActiveUserCount','ActiveAccCount','CreateUserCount','NewUserCreateCharCount',
	                  'NewUserCreateCharPercent','CreateCharCount']
	window.fieldNames = ['用户数','新用户数','注册用户数','注册账号数','活跃用户数','活跃账号数','创角用户数'
	                  ,'新用户创角用户数','新用户创角率','创角个数'];

    <c:if test="${adminPermission.level>=2}">
	window.hashKeyArr.push('PayUserCount','PayAccCount',
	                  'NewPayUserCount','PaySum','Arppu','Arpu','PayUserPercent','LTV');
	window.fieldNames.push('付费用户数','付费账号数',
	                  '新增付费用户数','收入','付费Arppu值','付费Arpu值','付费渗透率','LTV');
	</c:if>
	window.mLevel = ${adminPermission.level}
	</script>
	<script type="text/javascript" src="js/general.js"></script>
</head>
<body>
</body>
</html>