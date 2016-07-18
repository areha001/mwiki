<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="taglibs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8" /> 
	<title>教师管理</title>
	<link href="../js/ext-3.3.1/resources/css/ext-all.css" rel="stylesheet" type="text/css" />
	<link href="../js/ext-3.3.1/resources/css/xtheme-gray.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="../js/ext-3.3.1/adapter/ext/ext-base.js"></script>
	<script type="text/javascript" src="../js/ext-3.3.1/ext-all.js"></script>
	<script type="text/javascript" src="js/server-top.js"></script>
	<script type="text/javascript" src="../js/ext-plugin/piggy.js"></script>
	<script type="text/javascript" src="../js/addons/deepClone.js"></script>
	<script>
		window.canDo = ${canDo}
	</script>
	<script type="text/javascript">
		window.special = "${param.manageType}";
		window.extraButton = [];
		window.extraButton2 = [];
		window.actionMap = {};
		<c:forEach var="i" items="${actionMap}">
			actionMap["<c:out value='${i.key}' escapeXml='true'/>"] = "<c:out value='${i.value}' escapeXml='true'/>"
		</c:forEach>
		window.resMap = {};
		<c:forEach var="i" items="${itemMap}">
			resMap["<c:out value='${i.key}' escapeXml='true'/>"] = "<c:out value='${i.value}' escapeXml='true'/>"
		</c:forEach>
	</script>
	
	<script type="text/javascript">
	window.vmap = [];
	<c:forEach var="i" items="${itemMap}">
	vmap.push(["<c:out value='${i.key}' escapeXml='true'/>","${i.value}"]);
	</c:forEach>
	
	window.housemap = [];
	<c:forEach var="i" items="${houseMap}">
	housemap.push(["<c:out value='${i.key}' escapeXml='true'/>","${i.value}"]);
	</c:forEach>
	
	window.mmap = [];
	<c:forEach var="i" items="${memberMap}">
	mmap.push(["<c:out value='${i.key}' escapeXml='true'/>","${i.value}"]);
	</c:forEach>

	window.pmap = [];
	<c:forEach var="i" items="${petMap}">
	pmap.push(["<c:out value='${i.key}' escapeXml='true'/>","${i.value}"]);
	</c:forEach>
	
	window.gfunc = {};
	</script>
	
	<script type="text/javascript" src="js/const.js"></script>
	<script type="text/javascript" src="js/player-pack.js"></script>
	<script type="text/javascript" src="js/player-roleRing.js"></script>
	<script type="text/javascript" src="js/player-member.js"></script>
	<script type="text/javascript" src="js/player-pet.js"></script>
	<script type="text/javascript" src="js/player-dollHouse.js"></script>
	<script type="text/javascript" src="js/player-dollHouseItem.js"></script>
	<script type="text/javascript" src="js/player-friend.js"></script>
	<script type="text/javascript" src="js/player-log.js"></script>
	<script type="text/javascript" src="js/player-career.js"></script>
	<script type="text/javascript" src="js/player-challenge.js"></script>
	<script type="text/javascript" src="js/player-arena.js"></script>
	<script type="text/javascript" src="js/player-star.js"></script>
	<script type="text/javascript" src="js/player-dailyQuest.js"></script>
	<script type="text/javascript" src="js/player-quest.js"></script>
	<script type="text/javascript" src="js/player-mailList.js"></script>
	<script type="text/javascript" src="js/player-edit2.js"></script>
	<script type="text/javascript" src="js/player-edit.js"></script>
	<script type="text/javascript" src="js/player-sendItem.js"></script>
	<script type="text/javascript" src="js/player-sendPet.js"></script>
	<script type="text/javascript" src="js/player-sendRole.js"></script>
	<script type="text/javascript" src="js/player-vip.js"></script>
	<!-- <script type="text/javascript" src="js/player-sendMember.js"></script> -->
	<!-- <script type="text/javascript" src="js/player-moreFunc.js"></script> -->
	<!-- <script type="text/javascript" src="js/player-lock.js"></script> -->
	<script type="text/javascript" src="js/player.js"></script>
</head>
<body>
</body>
</html>