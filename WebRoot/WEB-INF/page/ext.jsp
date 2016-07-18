<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="./admin/taglibs.jsp"%>
<%response.setHeader("Access-Control-Allow-Origin", "*"); %>
<!DOCTYPE html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
	<title>信息管理</title>
	
    <script type="text/javascript" src="<c:url value='/js/Jquery UI/js/jquery.js'/>"></script>
    
    
    <style type="text/css">
        .x-panel-body p {
            margin: 10px;
            font-size: 12px;
        }
    </style>
</head>
<body>
<script>
$.get("http://www.wdsgame.com", {}, function(){
	alert(1)
});
window.alert()</script>
<input type="button" id="show-btn" value="Layout Window"/><br/><br/>
</body>
</html>