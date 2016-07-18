<%@page contentType="application/vnd.ms-excel; charset=utf-8" pageEncoding="UTF-8"%>
<%@include file="taglibs.jsp"%>
<%response.setHeader( "Content-Disposition", "attachment;filename=diamond.xls");%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=utf-8" /> 
	<title>导出</title>
</head>
<body>
	<table border="1" >
	<c:if test="${param.wayid=='0' || param.wayid == '' || param.wayid == '3'}">
		<tr><th>时间</th><th>任务奖励</th><th>充值</th><th>邮件</th><th>新手引导</th><th>GM后台发放</th><th>通关宝箱</th>
		<th>活动基金个人</th><th>活动基金全服</th><th>充值活动</th><th>消费活动</th><th>活动累计充值</th><th>活动累计消费</th>
		<th>竞技场挑战奖励</th><th>星座副本</th><th>七天登录</th><th>签到</th><th>等级奖励</th><th>节日礼包</th><th>VIP礼包</th></tr>
		<c:forEach var="i" items="${list}">
		<tr>
			<td>${i.date}</td>
			<td>${i.missionReward}</td>
			<td>${i.recharge}</td>
			<td>${i.mail}</td>
			<td>${i.newGuide}</td>
			<td>${i.gm}</td>
			<td>${i.pass}</td>
			<td>${i.fund}</td>
			<td>${i.allFund}</td>
			<td>${i.activityRecharge}</td>
			<td>${i.activityCost}</td>
			<td>${i.totalRecharge}</td>
			<td>${i.totalCost}</td>
			<td>${i.arenaFight}</td>
			<td>${i.copy}</td>
			<td>${i.login}</td>
			<td>${i.sign}</td>
			<td>${i.lvReward}</td>
			<td>${i.festivalBag}</td>
			<td>${i.vipBag}</td>
		</tr>
		</c:forEach>
	</c:if>
	<c:if test="${param.wayid=='1' || param.wayid == '2'}">
		<tr><th>时间</th><th>购买金币</th><th>购买体力</th><th>购买基金</th><th>商城购买</th><th>时装购买</th><th>创建联盟</th>
		<th>更换昵称</th><th>修改头像</th><th>修改名字</th><th>娃娃屋</th><th>魔法屋</th><th>VIP礼包</th><th>代付</th>
		<th>竞技场</th><th>竞技场付费</th><th>PVP抢夺</th><th>PVE复活</th><th>PVE重打</th><th>重生</th><th>洗练属性解锁</th>
		<th>洗练确定</th><th>洗练刷新</th><th>召唤兽刷新</th><th>清除PVP等待时间</th><th>重置精英副本</th></tr>
		<c:forEach var="i" items="${list}">
			<tr>
				<td>${i.date}</td>
				<td>${i.buyGold}</td>
				<td>${i.buyEnegry}</td>
				<td>${i.buyFund }</td>
				<td>${i.mallBuy}</td>
				<td>${i.buyFashion}</td>
				<td>${i.createUnion }</td>
				<td>${i.changeNickname}</td>
				<td>${i.changeIcon}</td>
				<td>${i.changeName}</td>
				<td>${i.dollhouse}</td>
				<td>${i.magicHouse}</td>
				<td>${i.vipBag}</td>
				<td>${i.payforAnother}</td>
				<td>${i.arena}</td>
				<td>${i.arenaPay}</td>
				<td>${i.loot}</td>
				<td>${i.resurgence}</td>
				<td>${i.overtype}</td>
				<td>${i.rebirth}</td>
				<td>${i.unlock}</td>
				<td>${i.makesure}</td>
				<td>${i.refresh}</td>
				<td>${i.summoningMonster}</td>
				<td>${i.cleanTime}</td>
				<td>${i.resetCopy}</td>
			</tr>
		</c:forEach>
	</c:if>
	<%-- <c:if test="${param.wayid=='2'}">
		<tr><th>时间</th><th>购买金币</th><th>购买领导力</th><th>购买精力</th><th>刷新火花小店</th><th>刷新詹皇小店</th><th>刷新市场</th>
		<th>火花小店购买</th><th>詹皇小店购买</th><th>购买商城物品</th><th>小店购买总计</th><th>精彩活动</th><th>市场美金单抽</th>
		<th>市场美金十连抽</th><th>排名赛重置购买</th><th>联盟捐献</th><th>联盟建筑捐献</th></tr>
		<c:forEach var="i" items="${list}">
			<tr>
				<td>${i.date}</td>
				<td>${i.shopGold}</td>
				<td>${i.shoplead}</td>
				<td>${i.shopEnergy}</td>
				<td>${i.huohua}</td>
				<td>${i.zhanhuang}</td>
				<td>${i.shuaxinshichang }</td>
				<td>${i.shophuohua}</td>
				<td>${i.shopzhanhuang}</td>
				<td>${i.shopstore}</td>
				<td>${i.shopTotal}</td>
				<td>${i.jingcai }</td>
				<td>${i.danchou}</td>
				<td>${i.shilianchou}</td>
				<td>${i.resetpaimingsai}</td>
				<td>${i.juanxian}</td>
				<td>${i.leaJuanxian}</td>
			</tr>
		</c:forEach>
	</c:if> --%>
	</table>
</body>
</html>