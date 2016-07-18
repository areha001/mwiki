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
		<tr><th>日期</th><th>星期</th><th>游戏</th><th>版本</th><th>区服</th>
		<th>产出量</th><th>消耗量</th><th>留存量</th></tr>

		<c:forEach var="i" items="${list}">
		<tr>
			<td>${i.xdate}</td>
			<td>${i.week}</td>
			<td>大战略</td>
			<td>${i.edition}</td>
			<td>${i.serverId}</td>
			<td>${i.putV}</td>
			<td>${i.outV}</td>
			<td>${i.rtV}</td>
		</tr>
		</c:forEach>
	</table>
</body>
</html>