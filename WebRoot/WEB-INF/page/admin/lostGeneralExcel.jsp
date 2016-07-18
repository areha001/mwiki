<%@page contentType="application/vnd.ms-excel; charset=utf-8" pageEncoding="UTF-8"%>
<%@include file="taglibs.jsp"%>
<%@include file="excelBase.jsp"%>

<%response.setHeader( "Content-Disposition", "attachment;filename=code.xls");%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=utf-8" /> 
	<title>导出</title>
</head>
<body>
	<table border="1" >
		<tr><th>日期</th><th>星期</th><th>游戏</th><th>版本</th><th>流失用户数</th>
		<th>回流用户数</th><th>流失率</th><th>流失付费用户数</th><th>流失付费用户数</th>
		<th>付费用户流失率</th><th>流失创角用户数</th><th>创角用户流失率</th></tr>
		<tr style="background-color: #dd3">
			<td>总和</td>
			<td></td>
			<td>大战略</td>
			<td></td>
			<td><%=sum("E") %></td>
			<td><%=sum("F") %></td>
			<td><%=ave("G") %></td>
			<td><%=sum("H") %></td>
			<td><%=ave("I") %></td>
			<td><%=sum("J") %></td>
			<td><%=sum("K") %></td>
			<td><%=ave("L") %></td>
			<td></td>
		</tr>
		<c:forEach var="i" items="${list}">
		<tr>
			<td>${i.xdate}</td>
			<td>${i.week}</td>
			<td>大战略</td>
			<td>${i.edition}</td>
			<td>${i.LoseUserCount}</td>
			<td>${i.ReturnUserCount}</td>
			<td>${i.LoseUserPercent}%</td>
			<td>${i.LosePayUserCount}</td>
			<td>${i.LosePayPercent}%</td>
			<td>${i.LosePayUserCount}</td>
			<td>${i.LoseCreateUserCount}</td>
			<td>${i.LoseCreateUserPercent}%</td>
		</tr>
		</c:forEach>
	</table>
</body>
</html>