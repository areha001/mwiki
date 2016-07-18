<%@page contentType="application/vnd.ms-excel; charset=utf-8" pageEncoding="UTF-8"%>
<%@include file="taglibs.jsp"%>
<%response.setHeader( "Content-Disposition", "attachment;filename=order.xls");%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=utf-8" /> 
	<title>导出</title>
</head>
<body>
	<table border="1" >
		<tr><th>订单号</th><th>商家订单号</th><th>充值渠道</th><th>服务器ID</th><th>服务器ip</th><th>玩家ID</th><th>玩家名</th>
		<th>充值套餐</th><th>钻石</th><th>人民币</th><th>状态</th><th>生成时间</th><th>支付时间</th><th>充值时间</th></tr>
		<c:forEach var="i" items="${list}">
		<tr>
			<td>${i.id}</td>
			<td>${i.orderId}</td>
			<td>${i.channel}</td>
			<td>${i.serverId}</td>
			<td>${i.payServerIp}</td>
			<td>${i.playerId}</td>
			<td>${i.name}</td>
			<td>${i.mallId}</td>
			<td>${i.diamond}</td>
			<td>${i.rmb}</td>
			<td>${i.status}</td>
			<td>${i.createTime}</td>
			<td>${i.payTime}</td>
			<td>${i.chargeTime}</td>
		</tr>
		</c:forEach>
	</table>
</body>
</html>
