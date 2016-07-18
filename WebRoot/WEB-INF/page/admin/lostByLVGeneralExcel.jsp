<%@page contentType="application/vnd.ms-excel; charset=utf-8" pageEncoding="UTF-8"%>
<%@include file="taglibs.jsp"%>
<%response.setHeader( "Content-Disposition", "attachment;filename=code.xls");%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=utf-8" /> 
	<title>导出</title>
</head>
<body>
	<table border="1" >

		<tr><th>日期</th><th>版本</th><th>区服</th><th>等级</th>
			<th>流失用户</th><th>比例</th><th>流失创角用户数</th>
			<th>比例</th>
		</tr>
		<c:forEach var="j" items="${list}">
		<tr>
			<td>${j.dateInterval}</td>
			<td>${j.edition}</td>
			<td>${j.serverId}</td>
			<td>${j.lv}</td>
			<td>${j.lost}</td>
			<td>${j.lost_percent}%</td>
			<td>${j.createUserLost}</td>
			<td>${j.createUserLost_percent}%</td>
		</tr>
		</c:forEach>
	</table>
</body>
</html>