<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="../admin/taglibs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8" /> 
	<title>信息管理</title>
<script type="text/javascript" src="js/jquery.min.js"></script>
<link type="text/css" rel="stylesheet" href="js/facebox/facebox.css">
<script type="text/javascript" src="js/facebox/facebox.js"></script>

	
<style type="text/css">
table.gridtable {
	font-family: verdana,arial,sans-serif;
	font-size:11px;
	color:#333333;
	border-width: 1px;
	border-color: #666666;
	border-collapse: collapse;
}
table.gridtable th {
	border-width: 1px;
	padding: 8px;
	border-style: solid;
	border-color: #666666;
	background-color: #dedede;
}
table.gridtable td {
	border-width: 1px;
	padding: 8px;
	border-style: solid;
	border-color: #666666;
	background-color: #ffffff;
}

.currentPage{
    font-weight:bold;
    color:#ff9a00;
}

#jumpTo{
width:20px;
}
</style>

<script>
function gmReply(id)
{
	var info = id+"_info";
	$("#replyid").val(id);
	$("#info").html($("#"+info).html());
	$.facebox(
			{html:abcinner,hide:['object','select'],opacity:0.7, closeDiv:true}
		)
}



function jumpTo(maxPage){
    var page = $("#jumpTo").val();
    if(page > maxPage || page < 1){
        alert("对不起，无法到达该页")
    }else{
        $('body').load('feedback.do?method=showList&page=' + page);
    }
}


function search(){
	var nickName = $("#nickName").val();
	$('body').load('feedback.do?method=showList&page=1&nickName='+nickName);
}


</script>

</head>
<body>
	<p><b>玩家反馈</b></p>
	<p>玩家昵称：<input type="text" name="nickName" id="nickName" value="${nickName}"/> &nbsp;&nbsp;&nbsp;<input type="button" value="查询" onclick="search()"/></p>

	<table class="gridtable">
		<tr>
			<th>id</th>
			<th>serverId</th>
			<th>nickName</th>
			<th>info</th>
			<th>reply</th>
			<th>status</th>
			<th>createTime</th>
			<th>replyTime</th>
			<th>操作</th>
		</tr>
		
		<c:forEach var="i" items="${retList}">
		<tr>
			<td>${i.id}</td>
			<td>${i.serverId}</td>
			<td>${i.name}</td>
			<td id="${i.id}_info">${i.info}</td>
			<td id="${i.id}_reply">${i.reply}</td>
			<td>${i.status}</td>
			<td><fmt:formatDate value="${i.createTime}" pattern="yyyy-MM-dd HH:mm:ss"/></td>
			<td><fmt:formatDate value="${i.replyTime}" pattern="yyyy-MM-dd HH:mm:ss"/></td>
			<c:if test="${i.status == 0}">
				<td><input type="button" value="回复" onclick="gmReply(${i.id})" /></td>
			</c:if>
			<c:if test="${i.status == 1}">
				<td><input type="button" value="回复" disabled="disabled" /></td>
			</c:if>
		</tr>
		</c:forEach>
		
	</table>
	
	<!-- 上一页 按钮 -->
		<div id="pageControl">
<c:choose>
<c:when test="${page != 1}">
		<a href="feedback.do?method=showList&page=${page-1}"><input type="button" name="lastPage" value="上一页" /></a>
</c:when>
<c:otherwise>
		<input type="button" disabled="true" name="lastPage" value="上一页" /><!-- 为了要那个灰掉的button -->
</c:otherwise>
</c:choose>
		
		<!-- 页数列表 -->
<c:forEach items="${pageList}" var="item">
<c:choose>
<c:when test="${item == page}">
		<a href="feedback.do?method=showList&page=${item}" class="currentPage">${item}</a>
</c:when>
<c:otherwise>
		<a href="feedback.do?method=showList&page=${item}">${item}</a>
</c:otherwise>
</c:choose>
</c:forEach>
		
		<!-- 下一页 按钮 -->
<c:choose>
<c:when test="${page != totalPages}">
		<a href="feedback.do?method=showList&page=${page+1}">
		<input type="button" name="nextPage" value="下一页" />
		</a>
</c:when>
<c:otherwise>
		<input type="button" disabled=true name="nextPage" value="下一页" /><!-- 为了要那个灰掉的button -->
</c:otherwise>
</c:choose>

<!-- 直接跳转 -->
共${totalPages}页 -向<input type="text" id="jumpTo" />页 <input type="button" value="跳转" onclick="jumpTo(${totalPages})" />
</div>
	
	
	<div id="abc" style="display:none;">
				<div id="abcinner">
				<p>
				<b>玩家回馈：</b>
				</p>
				<p>
				<b id="info"></b>
				</p>
				<p>
				<b >回复：</b>
				</p>
				<form action="feedback.do?method=reply" method="post">
					<input type="hidden" id="replyid" name="replyid" value=""/>
					<textarea id="reply" value="" name="reply"></textarea>
					<input type="submit" value="提交" />
				</form>
				</div>
	</div>

</body>
</html>