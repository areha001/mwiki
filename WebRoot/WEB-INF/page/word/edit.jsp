<%@ page language="java" contentType="text/html" pageEncoding="utf-8"%>
<%@include file="../admin/taglibs.jsp"%>
<script src="<c:url value='/static/ckeditor/ckeditor.js'/>"></script>
<script src="<c:url value='/static/js/jquery-ui/jquery-ui.min.js'/>"></script>
<link href="<c:url value='/static/js/jquery-ui/jquery-ui.min.css'/>" rel="stylesheet" type="text/css" />

<div class="bf_container_nav">
<ul>
<li class="normal"><a href="<c:url value='/'/>">首页</a></li>
<li class="normal"><a href="<c:url value='/word/list'/>">Lolita词条</a></li>
<li class="normal"><a href="">编辑词条内容</a></li>
<li class="last"></li>
</ul>
</div>
<div class="edit_area edit_word" id="add_new_word">
<form action="<c:url value='/word/edit/${name }'/>" method="post">
	<div class="edit_content">
	<p class="line"><span class="form_label">词条名: </span><input type="text" name="name" value="${name }" readonly="true"/></p>
  	<textarea name="description" id="description" rows="10" cols="80">${wordHistory.description }</textarea>
	<script>
	CKEDITOR.config.height=300;
	window.ck0 = CKEDITOR.replace("description");

	</script>
	<p class="line" style="display:none;"><span class="form_label">TAG: </span><input type="text" name="tags" style="width:85%;"/></p>
	<p class="ta_center"><input type="submit" class="submit" value="保存编辑"/></p>
	</div>
</form>
	<div id="add_word_link" style="display:none;">
		<p><span class="form_label">词条名: </span><input type="text" id="x_word_name" class="x_word_name" name="x_word_name" /></p>
		<p class="ta_center"><input type="submit" class="submit" value="添加" onclick="CKEDITOR.addWord()"/></p>
	</div>
	
<script>
var availableTags = ["aa","bb","cc","dd"];
$.facebox.settings.afterLoad = function(){
	$("#facebox").find(".x_word_name").autocomplete({
    source: availableTags,
    minLength:0
  }).dblclick(function(){$(this).autocomplete("search","")})
}
CKEDITOR.addWord = function(){
	
	var name = $("#facebox").find(".x_word_name").val();
	var html_element = CKEDITOR.dom.element.createFromHtml("<a href=\"innerlink word " + name + "\" >" + name + "</a>");
	ck0.insertElement(html_element);
	$.facebox.close();
}
</script>
</div>
