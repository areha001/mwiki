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
	window.serverMap = {};
	<c:forEach var="i" items="${serverList}">
	serverMap["<c:out value='${i.serverId}' escapeXml='true'/>"] = "<c:out value='${i.name}' escapeXml='true'/>"
	</c:forEach>
		var serverData = [["","不限"]];
		var checkServ = "${checkServ}";
		for(var i in serverMap){
			serverData.push([i,  serverMap[i]]);
		}
	serverMap[""] = "所有"
	

	var hashKeyArr = ['xdate','week','game','edition','serverId','PaySum','SubServTotalFee','CreateUserCount','SubServTotalCUC',
	                   'ActiveUserCount'
	                  ]

	var fieldNames = ['收入','累计收入','创角用户数','累计创角用户数','活跃用户数'];

    <c:if test="${adminPermission.level>=2}">
    hashKeyArr.push('PayUserCount','SubServTotalPUC','SubServArppu','SubServArpu','SubServPUP','SubServACU',
            'SubServPCU','ACUPCUCal');
    fieldNames.push('付费用户数','累计付费用户数',
            '付费Arppu值','付费Arpu值','付费渗透率','ACU','PCU','ACU/PCU');
    </c:if>
    window.mLevel = ${adminPermission.level}
	</script>
	<script type="text/javascript" src="js/subServGeneral.js"></script>
</head>
<body>
</body>
</html>