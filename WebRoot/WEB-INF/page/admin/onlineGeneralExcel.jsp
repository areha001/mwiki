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

		<tr><th>时间</th><th>版本</th><th>区服</th>
			<c:forEach var="i" items="${dates}">
			<th>${i}</th>
			</c:forEach>
		
		</tr>
		<c:forEach var="j" items="${list}">
		<tr>
			<td>${j.timeonly}</td>
			<td>${j.edition}</td>
			<td>${j.sid}</td>
			<c:forEach var="k" items="${dates}">
			<c:if test="${empty j[k]}"><td>0</td></c:if>
			<c:if test="${!empty j[k]}"><td>${j[k]}</td></c:if>
			</c:forEach>
		</tr>
		</c:forEach>
	</table>
</body>
</html>