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
		<tr><th>礼包码</th><th>礼包ID</th><th>当前状态</th><th>使用时间</th><th>使用者ID</th>
		<th>玩家帐号</th><th>角色名</th><th>导入时间</th></tr>
		<c:forEach var="i" items="${list}">
		<tr>
			<td>${i.code}</td>
			<td>${i.giftId}:${giftMap[i.giftId]}</td>
			<td>${i.status == 0 ? '未使用' : '已使用'}</td>
			<td><fmt:formatDate value="${i.useTime}" pattern="yyyy-MM-dd HH:mm:ss"/></td>
			<td>${i.playerId}</td>
			<td>${i.userName}</td>
			<td>${i.name}</td>
			<td><fmt:formatDate value="${i.createTime}" pattern="yyyy-MM-dd HH:mm:ss"/></td>
		</tr>
		</c:forEach>
	</table>
</body>
</html>