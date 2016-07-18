<%@page contentType="application/vnd.ms-excel; charset=utf-8" pageEncoding="UTF-8"%>
<%@include file="taglibs.jsp"%>
<%response.setHeader( "Content-Disposition", "attachment;filename=income.xls");%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=utf-8" /> 
	<title>导出</title>
</head>
<body>
	<table border="1" >
		<tr><th>时间</th><th>ios</th><th>Quick测试</th><th>果盘</th><th>XY</th><th>快用</th><th>爱思</th><th>海马</th>
		<th>同步推</th><th>总计</th></tr>
		<c:forEach var="i" items="${list}">
		<tr>
			<td>${i.datatime}</td>
			<td>${i.ios}</td>
			<td>${i.quick}</td>
			<td>${i.gp}</td>
			<td>${i.xy}</td>
			<td>${i.ky}</td>
			<td>${i.as}</td>
			<td>${i.hm}</td>
			<td>${i.tbt}</td>
			<td>${i.total}</td>
		</tr>
		</c:forEach>
	</table>
</body>
</html>