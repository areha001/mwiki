<%@ page language="java" contentType="text/html" pageEncoding="utf-8"%>
<%@include file="../admin/taglibs.jsp"%>
<script src="<c:url value='/static/ckeditor/ckeditor.js'/>"></script>

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
  	<textarea name="description" id="description" rows="10" cols="80">ddd</textarea>
	<script>
	CKEDITOR.config.height=300;
	CKEDITOR.replace("description");
	</script>
	<p class="line" style="display:none;"><span class="form_label">TAG: </span><input type="text" name="tags" style="width:85%;"/></p>
	<p class="ta_center"><input type="submit" class="submit" value="保存编辑"/></p>
	</div>
</form>
</div>
