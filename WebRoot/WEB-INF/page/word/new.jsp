<%@ page language="java" contentType="text/html" pageEncoding="utf-8"%>
<%@include file="../admin/taglibs.jsp"%>
<script src="<c:url value='/static/ckeditor/ckeditor.js'/>"></script>

<form action="<c:url value='/word/add'/>" method="post">
	<p>title: <input type="text" name="name" /></p>
  	<textarea name="description" id="description" rows="10" cols="80">ddd</textarea>
	<script>
	CKEDITOR.config.height=300;
	CKEDITOR.replace("description");
	</script>
	<p>TAG:<input type="text" name="tags" /></p>
	<p><input type="submit" value="dd"/></p>
</form>
