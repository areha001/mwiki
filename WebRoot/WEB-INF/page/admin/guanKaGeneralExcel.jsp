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
		<tr><th>日期</th><th>版本</th><th>区服</th>
		<th>关卡</th><th>进入次数</th><th>开启次数</th><th>首次通关次数</th><th>成功率</th></tr>

		<c:forEach var="i" items="${list}">
		<tr>
			<td>${i.dateInterval}</td>
			<td>${i.edition}</td>
			<td>${serverMap[i.serverId]}</td>
			<td>${i.step}、${gkMap[i.step]}</td>
			<td>${i.enterNum}</td>
			<td>${i.openNum}</td>
			<td>${i.passNum}</td>
			<td>${i.percent}%</td>
		</tr>
		</c:forEach>
	</table>
</body>
</html>