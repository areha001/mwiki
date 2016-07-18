<%@page contentType="text/html; charset=utf-8" pageEncoding="UTF-8"%>
<%@include file="taglibs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>    
	<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8" />  
	<meta http-equiv="content-type" content="text/html; charset=utf-8"/> 
	<title>系统管理后台</title>
	<link href="<c:url value='/js/ext-3.3.1/resources/css/ext-all.css'/>" rel="stylesheet" type="text/css" />
	<link href="<c:url value='/js/ext-3.3.1/resources/css/xtheme-gray.css'/>" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="<c:url value='/js/ext-3.4.0/adapter/ext/ext-base.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/ext-3.4.0/ext-all.js'/>"></script>
	<script>
	var childrenJson = [];
	 var elements = [];

	 <c:if test="${adminPermission.info}">
	 var element = { text: '角色查询', href: 'javascaript:;', expanded: true, children: []};
	 elements.push(element);
      element.children.push({ text: '角色查询', href: 'player.do?method=page', leaf: true, hrefTarget: 'main' });
     </c:if>
	 <c:if test="${adminPermission.mail}">
	 var element = { text: '邮件发送', href: 'javascaript:;', expanded: true, children: []};
	 elements.push(element);
	 element.children.push({ text: '邮件发送', href: 'mail.do?method=page', leaf: true, hrefTarget: 'main' });
	 element.children.push({ text: '邮件列表', href: 'mail.do?method=listPage', leaf: true, hrefTarget: 'main' });
	</c:if>
	 <c:if test="${adminPermission.deploy}">
	 var element = { text: '配置修改', href: 'javascaript:;', expanded: true, children: []};
	 elements.push(element);
	 element.children.push({ text: '商城配置', href: 'mall.do?method=page', leaf: true, hrefTarget: 'main' });
	 element.children.push({ text: '礼包配置', href: 'awardConfig.do?method=page', leaf: true, hrefTarget: 'main' });
	 element.children.push({ text: '活动奖励配置', href: 'awardConfig.do?method=page2', leaf: true, hrefTarget: 'main' });
	 element.children.push({ text: '签到配置', href: 'signInConfig.do?method=page', leaf: true, hrefTarget: 'main' });
	 element.children.push({ text: '魔法屋配置', href: 'magicShopConfig.do?method=page', leaf: true, hrefTarget: 'main' });
	 element.children.push({ text: '节日配置', href: 'festival.do?method=page', leaf: true, hrefTarget: 'main' });
	 element.children.push({ text: '排行榜', href: 'rankList.do?method=page', leaf: true, hrefTarget: 'main' });
	 element.children.push({ text: '活动列表', href: 'activity.do?method=listPage', leaf: true, hrefTarget: 'main' });
	 </c:if>
	 <c:if test="${adminPermission.notice}">
	 var element = { text: '公告管理', href: 'javascaript:;', expanded: true, children: []};
	 elements.push(element);
	 element.children.push({ text: '发送公告', href: 'notice.do?method=page', leaf: true, hrefTarget: 'main' });
	 element.children.push({ text: '公告列表', href: 'notice.do?method=pageList', leaf: true, hrefTarget: 'main' });
	 </c:if>	
	 <c:if test="${adminPermission.gift}">
	 var element = { text: '激活码管理', href: 'javascaript:;', expanded: true, children: []};
	 elements.push(element);
	 element.children.push({ text: '激活码礼包配置', href: 'gift.do?method=page', leaf: true, hrefTarget: 'main' });
	 element.children.push({ text: '激活码礼包列表', href: 'gift.do?method=listPage', leaf: true, hrefTarget: 'main' });
	 element.children.push({ text: '激活码列表', href: 'gift.do?method=codeListPage', leaf: true, hrefTarget: 'main' });
	 </c:if>

	 <c:if test="${adminPermission.statistics}">
	 var element = { text: '统计数据', href: 'javascript:;', expanded: true, children: []};
	 elements.push(element);
     element.children.push({ text: '订单查询', href: 'statistics.do?method=pageIncome', leaf: true, hrefTarget: 'main' });
	 element.children.push({ text: '钻石统计', href: 'diamondAnalyze.do?method=diamondAnalyze', leaf: true, hrefTarget: 'main' });
	 element.children.push({ text: '金币统计', href: 'moneyAnalyze.do?method=moneyAnalyze', leaf: true, hrefTarget: 'main' });
	 element.children.push({ text: '体力统计', href: 'energyAnalyze.do?method=energyAnalyze', leaf: true, hrefTarget: 'main' });
	 element.children.push({ text: '商城购买统计', href: 'mallBuy.do?method=findMallBuy', leaf: true, hrefTarget: 'main' });
	 element.children.push({ text: '角色获得统计', href: 'playerRole.do?method=findPlayer', leaf: true, hrefTarget: 'main' });
     </c:if>
	 <c:if test="${adminPermission.accredit}">
	 var element = { text: '授权管理', href: 'javascript:;', expanded: true, children: []};
	 elements.push(element);
      element.children.push({ text: '合作方管理', href: 'partnerManager.do?method=getShowDeptListJson', leaf: true, hrefTarget: 'main' });
      element.children.push({ text: 'GM基本信息', href: 'gm.do?method=getShowTeacherInfoJson', leaf: true, hrefTarget: 'main' });
      element.children.push({ text: '授权管理', href: 'gm.do?method=getShowTeacherInfoJson&manageType=role', leaf: true, hrefTarget: 'main' });
      element.children.push({ text: '角色权限设置', href: 'roleManager.do?method=getShowInfo', leaf: true, hrefTarget: 'main' });
 	</c:if>
     <c:if test="${adminPermission.history}">
     var element = { text: 'GM操作日志', href: 'javascript:;', expanded: true, children: []};
	 elements.push(element);
     element.children.push({ text: 'GM操作日志', href: 'happen.do?method=listPage', leaf: true, hrefTarget: 'main'})
      </c:if>
	 <c:if test="${adminPermission.feedback}">
     var element = { text: '玩家反馈', href: 'javascript:;', expanded: true, children: []};
	 elements.push(element);
	    element.children.push({ text: '玩家反馈', href: 'feedback.do?method=listPage', leaf: true, hrefTarget: 'main' });
	 </c:if>

	 <c:if test="${adminPermission.operate}">
     var element = { text: '经营分析', href: 'javascript:;', expanded: true, children: []};
	 elements.push(element);
	 element.children.push({ text: '充值查询', href: 'recharge.do?method=rechargequery', leaf: true, hrefTarget: 'main' });
	 element.children.push({ text: '账号用户留存', href: 'userRetention.do?method=getRetention', leaf: true, hrefTarget: 'main' });
	 <!-- element.children.push({ text: '设备用户留存', href: 'deviceRetention.do?method=getRetention', leaf: true, hrefTarget: 'main' }); -->
	 element.children.push({ text: '新进与活跃', href: 'newAndActive.do?method=getInfo', leaf: true, hrefTarget: 'main' });
	 element.children.push({ text: '充值排行榜', href: 'prepaidList.do?method=getPage', leaf: true, hrefTarget: 'main' });
	 element.children.push({ text: '钻石消费排行', href: 'consumer.do?method=findConsumer', leaf: true, hrefTarget: 'main' });
	 <!-- element.children.push({ text: '回本率', href: 'backRate.do?method=getPage', leaf: true, hrefTarget: 'main' }); -->
	 element.children.push({ text: '人均钻石', href: 'average.do?method=getPage', leaf: true, hrefTarget: 'main' });
	 element.children.push({ text: '运营日报', href: 'daily.do?method=findPage', leaf: true, hrefTarget: 'main' });
	 element.children.push({ text: '运营周报', href: 'weekly.do?method=findPage', leaf: true, hrefTarget: 'main' });
	 </c:if>
	 <c:if test="${adminPermission.paper}">
     var element = { text: '日报', href: 'javascript:;', expanded: true, children: []};
	 elements.push(element);
	 element.children.push({ text: '收入日报', href: 'income.do?method=findPage', leaf: true, hrefTarget: 'main' });
	 </c:if>
	 <c:if test="${adminPermission.super}">
     var element = { text: '超级权限', href: 'javascript:;', expanded: true, children: []};
	 elements.push(element);
     element.children.push({ text: '账号管理', href: 'account.do?method=listPage', leaf: true, hrefTarget: 'main' });
     element.children.push({ text: '服务器管理', href: 'serverManager.do?method=getShowInfo', leaf: true, hrefTarget: 'main' });
     element.children.push({ text: '分区开服管理', href: 'partitionInfo.do?method=getPartitionInfo', leaf: true, hrefTarget: 'main' });
     element.children.push({ text: '脚本配置', href: 'serverManager.do?method=groupSetting', leaf: true, hrefTarget: 'main' });
	 </c:if>
	 for(var i=0; i< elements.length ; i++)
	 {
	 	if(elements[i].children.length>0)
	 		childrenJson.push(elements[i]);
	 }
	 var FIRST_PAGE_URL = childrenJson[0].children[0].href;
	</script>
	
	<script type="text/javascript" src="<c:url value='/admin/js/main.js'/>"></script>
	<script>
		var isSuperAdmin = ${userSession.user.username == 'admin'};
	</script>
</head>
<body>
<input type="hidden" id="realName" value="${realName}" />
<input type="hidden" id="newpass" value="${newpass}" />
<input type="hidden" id="confirmNewPassword" value="${confirmNewPassword}" />

</body>
</html>