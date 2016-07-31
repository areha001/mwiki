<%@ page language="java" contentType="text/html" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/page/common/taglibs.jsp"%>


<div id="footer">
版权所有 @Copyright 2016
</div>
<c:if test="${!empty errors}">
<div class="errmsg bottom_tips">
${errors }
</div>
</c:if>