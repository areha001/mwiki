<%@page contentType="application/vnd.ms-excel; charset=utf-8" pageEncoding="UTF-8"%>
<%@include file="taglibs.jsp"%>
<%response.setHeader( "Content-Disposition", "attachment;filename=energy.xls");%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=utf-8" /> 
	<title>导出</title>
</head>
<body>
	<table border="1" >
	<c:if test="${param.wayid=='0' || param.wayid == '' || param.wayid == '3'}">
		<tr><th>时间</th><th>任务奖励</th><th>商城购买</th><th>自动恢复</th><th>购买体力</th><th>GM后台发放</th><th>邮件</th>
		<th>新手引导</th><th>好友系统</th><th>活动VIP每日领取</th><th>充值活动</th><th>消费活动</th><th>七天登录</th>
		<th>玩家升级</th><th>VIP礼包</th></tr>
		<c:forEach var="i" items="${list}">
		<tr>
				<td>${i.date}</td>
				<td>${i.missionReward}</td>
				<td>${i.mallBuy}</td>
				<td>${i.energyRecover}</td>
				<td>${i.buyEnegry}</td>
				<td>${i.gm}</td>
				<td>${i.mail}</td>
				<td>${i.newGuide}</td>
				<td>${i.friend}</td>
				<td>${i.dailyVip}</td>
				<td>${i.activityRecharge}</td>
				<td>${i.activityCost}</td>
				<td>${i.login}</td>
				<td>${i.level}</td>
				<td>${i.vipBag}</td>
		</tr>
		</c:forEach>
	</c:if>
	<c:if test="${param.wayid=='1' || param.wayid == '2'}">
		<tr><th>时间</th><th>闯关</th><th>通关</th><th>好友系统</th><th>扫荡</th><th>竞技场</th></tr>
		<c:forEach var="i" items="${list}">
			<tr>
				<td>${i.date}</td>
				<td>${i.emigrated}</td>
				<td>${i.pass}</td>
				<td>${i.friend}</td>
				<td>${i.sweep}</td>
				<td>${i.arena}</td>
			</tr>
		</c:forEach>
	</c:if>
	</table>
</body>
</html>