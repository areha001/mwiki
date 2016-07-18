<%@page contentType="application/vnd.ms-excel; charset=utf-8" pageEncoding="UTF-8"%>
<%@include file="taglibs.jsp"%>
<%response.setHeader( "Content-Disposition", "attachment;filename=activity.xls");%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=utf-8" /> 
	<title>导出</title>
</head>
<body>
	<table border="1" >
		<tr><th>时间</th><th>新增账户</th><th>登陆用户</th></tr>
		<c:forEach var="i" items="${list}">
		<tr>
			<td>${i.date}</td>
			<td>${i.newAccount}</td>
			<td>${i.loginAccount}</td>
		</tr>
		</c:forEach>
	</table>
</body>
</html>