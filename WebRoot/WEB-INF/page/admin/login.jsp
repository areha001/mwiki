<%@page contentType="text/html; charset=utf-8" pageEncoding="UTF-8"%>
<%@include file="taglibs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv=content-type content="text/html; charset=utf-8" /> 
	<title>GM管理工具 - 登录</title>
	<link href="css/global.css" rel="stylesheet" type="text/css" />
</head>
<body>
	<div id="loginpanel">
		<form name="frm_login" method="post" action="adminLogin.do?method=adminLogin">
		<table width="583" border="0" cellspacing="0" cellpadding="0">
		  <tr>
		    <td width="15" height="65" rowspan="2"><img src="images/loginleft.gif" width="15" height="358" /></td>
		    <td width="553" height="65" align="left" valign="top"><img src="images/logintop.gif" width="553" height="65" /></td>
		    <td width="15" height="65" rowspan="2"><img src="images/loginright.gif" width="15" height="358" /></td>
		  </tr>
		  <tr>
		    <td width="553" height="293" align="center" valign="middle" bgcolor="#e7e7e7">
            	<!-- 登陆的表格 -->
		    	<table id="tablogin" width="390" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td width="87" align="center">用户名：</td>${message}
                    <td width="303"><input type="text" value="admin"  name="loginName" id="username" /></td>
                  </tr>
                  <tr>
                    <td align="center">密　码：</td>
                    <td><input type="password" value="admin" name="password" id="userpass" /></td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                    <td>
                    	<button class="button" type="submit">
                    		<span>确定</span>
                    	</button>
                    	<button class="button" >
                    		<span>取消</span>
                    	</button>
                    </td>
                  </tr>
                </table>
				<!-- 登陆结束 -->
		    </td>
		  </tr>
		  <tr>
		    <td colspan="3"><img src="images/loginfooter.gif" width="583" height="58" /></td>
		  </tr>
		</table>
		</form>
	</div>
	<script>
		window.document.onload=document.getElementById("username").focus();
	</script>
</body>
</html>