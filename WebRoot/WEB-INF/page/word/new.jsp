<%@ page language="java" contentType="text/html" pageEncoding="utf-8"%>
<%@include file="../admin/taglibs.jsp"%>
<script src="<c:url value='/static/ckeditor/ckeditor.js'/>"></script>
<script src="<c:url value='/static/js/jquery-ui/external/jquery/jquery.js'/>"></script>
<script src="<c:url value='/static/js/jquery-ui/jquery-ui.min.js'/>"></script>
<link href="<c:url value='/static/js/jquery-ui/jquery-ui.min.css'/>" rel="stylesheet" type="text/css" />

<div class="bf_container_nav">
<ul>
<li class="normal"><a href="<c:url value='/'/>">首页</a></li>
<li class="normal"><a href="<c:url value='/word'/>">词条</a></li>
<li class="normal"><a href="">建立词条</a></li>
<li class="last"></li>
</ul>
</div>
<div class="container">
	<div class="edit_area edit_word" id="add_new_word">
	<form action="<c:url value='/word/add'/>" method="post">
		<div class="edit_main">
		<p><span class="form_label">词条名: </span><input type="text" name="name" /></p>
		<p><span class="form_label">词条分类: </span><input type="text" id="group_name" name="group_name" /></p>
		<p><span class="form_label">父级词条: </span><input type="text" id="parent_name" name="parent_name" /></p>
		<p class="ta_center"><input type="submit" class="submit" value="建立词条"/></p>
		</div>
	</form>
	</div>
</div>
<script>
var availableTags = [];
<c:forEach var="i" items="${parentList}">
availableTags.push("${i.name}")
</c:forEach>
                   
$( "#parent_name" ).autocomplete({
    source: availableTags,
    minLength:0
  }).dblclick(function(){$(this).autocomplete("search","")})
  
</script>