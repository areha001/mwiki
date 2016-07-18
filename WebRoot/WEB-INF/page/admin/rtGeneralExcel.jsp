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
		<tr><th>日期</th><th>星期</th><th>游戏</th><th>版本</th><th>渠道</th>
		<th>新用户</th><th>次日留存</th><th>三日留存</th><th>7日留存</th><th>15日留存</th><th>7日内留存</th>
		<th>15日内留存</th></tr>

		<c:forEach var="i" items="${list}">
		<tr>
			<td>${i.xdate}</td>
			<td>${i.week}</td>
			<td>大战略</td>
			<td>${i.edition}</td>
			<td>${i.channel}</td>
			<td>${i.rt_newuser}</td>
			<td>${i.rt_2}%</td>
			<td>${i.rt_3}%</td>
			<td>${i.rt_7}%</td>
			<td>${i.rt_15}%</td>
			<td>${i.rt_a7}%</td>
			<td>${i.rt_a15}%</td>
		</tr>
		</c:forEach>
	</table>
</body>
</html>