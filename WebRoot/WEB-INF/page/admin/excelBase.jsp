<%@page pageEncoding="UTF-8"%>
<%@include file="taglibs.jsp"%>
<%!
	String sum(String s){
		return "=SUM("+s+"3:"+s+"65536)";
	}
	String ave(String s){
		return "=ROUND(AVERAGE("+s+"3:"+s+"65536)*100,1)&\"%\"";
	}
%>