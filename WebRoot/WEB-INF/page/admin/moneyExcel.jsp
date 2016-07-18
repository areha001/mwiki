<%@page contentType="application/vnd.ms-excel; charset=utf-8" pageEncoding="UTF-8"%>
<%@include file="taglibs.jsp"%>
<%response.setHeader( "Content-Disposition", "attachment;filename=money.xls");%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=utf-8" /> 
	<title>导出</title>
</head>
<body>
	<table border="1" >
	<c:if test="${param.wayid=='0' || param.wayid == '' || param.wayid == '3'}">
		<tr><th>时间</th><th>任务奖励</th><th>商城购买</th><th>邮件</th><th>新手引导</th><th>GM后台发放</th><th>通关</th>
		<th>通关宝箱</th><th>购买金币</th><th>活动基金全服</th><th>充值活动</th><th>消费活动</th><th>出售物品</th><th>梦境之塔</th>
		<th>竞技场排名奖励</th><th>任务成就</th><th>召唤兽转金币</th><th>重生</th><th>颜值等级奖励</th><th>魔法屋</th>
		<th>活动VIP每日领取</th><th>开礼包</th><th>七天登录</th><th>签到</th><th>等级奖励</th><th>节日礼包</th><th>VIP礼包</th></tr>
		<c:forEach var="i" items="${list}">
		<tr>
			<td>${i.date}</td>
			<td>${i.missionReward}</td>
			<td>${i.mallBuy}</td>
			<td>${i.mail}</td>
			<td>${i.newGuide}</td>
			<td>${i.gm}</td>
			<td>${i.pass}</td>
			<td>${i.passChests}</td>
			<td>${i.buyGold}</td>
			<td>${i.allFund}</td>
			<td>${i.activityRecharge}</td>
			<td>${i.activityCost}</td>
			<td>${i.sell}</td>
			<td>${i.dream}</td>
			<td>${i.arenaRank}</td>
			<td>${i.achievement}</td>
			<td>${i.summoningMonster}</td>
			<td>${i.rebirth}</td>
			<td>${i.face}</td>
			<td>${i.magicHouse}</td>
			<td>${i.dailyVip}</td>
			<td>${i.openBag}</td>
			<td>${i.login}</td>
			<td>${i.sign}</td>
			<td>${i.lvReward}</td>
			<td>${i.festivalBag}</td>
			<td>${i.vipBag}</td>
		</tr>
		</c:forEach>
	</c:if>
	<c:if test="${param.wayid=='1' || param.wayid == '2'}">
		<tr><th>时间</th><th>PVP搜索</th><th>道具合成</th><th>转生</th><th>商城购买</th><th>变身</th><th>家私升级</th>
		<th>技能升级</th><th>修改头像</th><th>角色装备升级</th><th>娃娃屋</th><th>刷新角色属性加点</th><th>代付</th>
		<th>竞技场</th><th>洗练刷新</th></tr>
		<c:forEach var="i" items="${list}">
			<tr>
				<td>${i.date}</td>
				<td>${i.pvpHunt}</td>
				<td>${i.compound}</td>
				<td>${i.reincarnation }</td>
				<td>${i.mallBuy}</td>
				<td>${i.shapeshifting}</td>
				<td>${i.furniture }</td>
				<td>${i.skill}</td>
				<td>${i.changeIcon}</td>
				<td>${i.equipment}</td>
				<td>${i.dollhouse}</td>
				<td>${i.attribute}</td>
				<td>${i.payforAnother}</td>
				<td>${i.arena}</td>
				<td>${i.refresh}</td>
			</tr>
		</c:forEach>
	</c:if>
	</table>
</body>
</html>