<%@page contentType="application/vnd.ms-excel; charset=utf-8" pageEncoding="UTF-8"%>
<%@include file="taglibs.jsp"%>
<%response.setHeader( "Content-Disposition", "attachment;filename=playerRole.xls");%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=utf-8" /> 
	<title>导出</title>
</head>
<body>
	<table border="1" >
		<tr><th>玩家ID</th><th>玩家名</th><th>服务器</th><th>拥有角色</th><th>角色来源</th><th>时间</th></tr>
		<c:forEach var="i" items="${list}">
		<tr>
			<td>${i.playerId}</td>
			<td>${i.name}</td>
			<td>${i.serverId}</td>
			<td>${i.roleName}</td>
			<td>${i.action}</td>
			<td>${i.date}</td>
		</tr>
		</c:forEach>
	</table>
</body>
</html>
