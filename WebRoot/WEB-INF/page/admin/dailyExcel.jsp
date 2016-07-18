<%@page contentType="application/vnd.ms-excel; charset=utf-8" pageEncoding="UTF-8"%>
<%@include file="taglibs.jsp"%>
<%response.setHeader( "Content-Disposition", "attachment;filename=daily.xls");%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=utf-8" /> 
	<title>导出</title>
</head>
<body>
	<table border="1" >
		<tr><th>时间</th><th>付费</th><th>付费人数</th><th>ARPU值</th>
		<th>付费渗透率</th><th>活跃数</th><th>新增数</th></tr>
		<c:forEach var="i" items="${list}">
		<tr>
			<td>${i.datatime}</td>
			<td>${i.pay}</td>
			<td>${i.payNum}</td>
			<td>${i.ARPU}</td>
			<td>${i.rate}</td>
			<td>${i.activity}</td>
			<td>${i.newAdd}</td>
		</tr>
		</c:forEach>
	</table>
</body>
</html>