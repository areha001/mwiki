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
		<tr><th>日期</th><th>星期</th><th>游戏</th><th>版本</th><th>渠道</th>
		<th>用户数</th><th>新用户数</th><th>注册用户数</th><th>注册账号数</th><th>活跃用户数</th><th>活跃账号数</th>
		<th>创角用户数</th><th>新用户创角用户数</th><th>新用户创角率</th><th>创角个数</th><th>付费用户数</th><th>付费账号数</th>
		<th>新增付费用户数</th><th>收入</th><th>付费Arppu值</th><th>付费Arpu值</th><th>付费Arpu值</th><th>LTV</th></tr>
		<tr style="background-color: #dd3">
			<td>总和</td>
			<td></td>
			<td>大战略</td>
			<td></td>
			<td></td>
			<td>=SUM(F3:F65536)</td>
			<td>=SUM(G3:G65536)</td>
			<td>=SUM(H3:H65536)</td>
			<td>=SUM(I3:I65536)</td>
			<td>=SUM(J3:J65536)</td>
			<td>=SUM(K3:K65536)</td>
			<td>=SUM(L3:L65536)</td>
			<td>=SUM(M3:M65536)</td>
			<td>=ROUND(AVERAGE(N3:N65536)*100,1)&"%"</td>
			<td>=SUM(O3:O65536)</td>
			<td>=SUM(P3:P65536)</td>
			<td>=SUM(Q3:Q65536)</td>
			<td>=SUM(R3:R65536)</td>
			<td>=SUM(S3:S65536)</td>
			<td></td>
			<td></td>
			<td>=ROUND(AVERAGE(V3:V65536)*100,1)&"%"</td>
			<td></td>
		</tr>
		<c:forEach var="i" items="${list}">
		<tr>
			<td>${i.xdate}</td>
			<td>${i.week}</td>
			<td>大战略</td>
			<td>${i.edition}</td>
			<td>${i.channel}</td>
			<td>${i.DailyUserCount}</td>
			<td>${i.NewUserCount}</td>
			<td>${i.RegUserCount}</td>
			<td>${i.RegAccCount}</td>
			<td>${i.ActiveUserCount}</td>
			<td>${i.ActiveAccCount}</td>
			<td>${i.CreateUserCount}</td>
			<td>${i.NewUserCreateCharCount}</td>
			<td>${i.NewUserCreateCharPercent}%</td>
			<td>${i.CreateCharCount}</td>
			<td>${i.PayUserCount}</td>
			<td>${i.PayAccCount}</td>
			<td>${i.NewPayUserCount}</td>
			<td>${i.PaySum}</td>
			<td>${i.Arppu}</td>
			<td>${i.Arpu}</td>
			<td>${i.PayUserPercent}%</td>
			<td>${i.LTV}</td>
		</tr>
		</c:forEach>
	</table>
</body>
</html>