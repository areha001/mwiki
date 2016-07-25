<%@ page language="java" contentType="text/html" pageEncoding="utf-8"%>
<%@include file="../admin/taglibs.jsp"%>

<c:forEach var="i" items="${list }">
	${i.name } <br/>
</c:forEach>