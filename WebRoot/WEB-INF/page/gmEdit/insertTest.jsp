<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="../admin/taglibs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" /> 
	<title>信息管理</title>
	
	<style>
form {
 border: 1px dotted #aaaaaa;
 padding: 3px 6px 3px 6px;
 text-align:center;
 width:300px;
}
input.txt{
 color: #00008B;
 background-color: #ADD8E6;
 border: 1px inset #00008B;
 width: 200px;
}
input.btn {
 color: #00008B;
 background-color: #ADD8E6;
 border: 1px outset #00008B;
 padding: 2px 4px 2px 4px;
}
</style>
<body>
	<form action="feedback.do?method=submitFeedback" method="post"  style="margin:" >
		<p>服务器ID: <input type="text" name="serverId"/></p>
		<p>角色名： <input type="text" name="nickName"/></p>
		<p>  反馈信息： <input type="text" name="info"/></p>	
		<p>  playerId：<input type="text" name="playerId"/></p>
		<p><input type="submit" value="提交" name="submit"/>&nbsp;&nbsp;<input type="reset" value="重置" name="reset"/></p>
	</form>
</body>
</html>