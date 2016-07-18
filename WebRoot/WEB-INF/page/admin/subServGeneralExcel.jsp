<%@page contentType="application/vnd.ms-excel; charset=utf-8" pageEncoding="UTF-8"%>
<%@include file="taglibs.jsp"%>
<%response.setHeader( "Content-Disposition", "attachment;filename=code.xls");%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=utf-8" /> 
	<title>导出</title>
</head>
<body>
	<table border="1" >
		<tr><th>日期</th><th>星期</th><th>游戏</th><th>版本</th><th>区服</th>
		<th>收入</th><th>累计收入</th><th>创角用户数</th><th>累计创角用户数</th><th>活跃用户数</th><th>付费用户数</th>
		<th>累计付费用户数</th><th>付费Arppu值</th><th>付费Arpu值</th><th>付费渗透率</th><th>ACU</th><th>PCU</th>
		<th>ACU/PCU</th></tr>
		<tr style="background-color: #dd3">
			<td>总和</td>
			<td></td>
			<td>大战略</td>
			<td></td>
			<td></td>
			<td>=SUM(F3:F65536)</td>
			<td></td>
			<td>=SUM(H3:H65536)</td>
			<td>=SUM(I3:I65536)</td>
			<td>=SUM(J3:J65536)</td>
			<td>=SUM(K3:K65536)</td>
			<td>=SUM(L3:L65536)</td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<c:forEach var="i" items="${list}">
		<tr>
			<td>${i.xdate}</td>
			<td>${i.week}</td>
			<td>大战略</td>
			<td>${i.edition}</td>
			<td>${i.serverId}</td>
			<td>${i.PaySum}</td>
			<td>${i.SubServTotalFee}</td>
			<td>${i.CreateUserCount}</td>
			<td>${i.SubServTotalCUC}</td>
			<td>${i.ActiveUserCount}</td>
			<td>${i.PayUserCount}</td>
			<td>${i.SubServTotalPUC}</td>
			<td>${i.SubServArppu}</td>
			<td>${i.SubServArpu}%</td>
			<td>${i.SubServPUP}</td>
			<td>${i.SubServACU}</td>
			<td>${i.SubServPCU}</td>
			<td>${i.ACUPCUCal}</td>
		</tr>
		</c:forEach>
	</table>
</body>
</html>