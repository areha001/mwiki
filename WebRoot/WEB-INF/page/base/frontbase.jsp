<%@ page language="java" contentType="text/html" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/page/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
	<head>
		<title>首页</title>
		<%@include file="/WEB-INF/page/common/front-css.jsp"%>
	</head>  
  <body>
  <div id="cleartop">
  </div>
	<%@include file="/WEB-INF/page/common/top.jsp"%>
  <div id="">
  </div>
  <div id="m_left">
	<%@include file="/WEB-INF/page/left/nav.jsp"%>
  </div>
  <div id="main">
	  <div id="m_right">
		  <div class="container">
				<% String urlPath = "/WEB-INF/page/" + request.getAttribute("subViewName") + ".jsp";%>
				
				<jsp:include page="<%=urlPath %>"></jsp:include>
		  </div>
	  </div>
	  <div class="clear"></div>
  </div>
	<%@include file="/WEB-INF/page/common/footer.jsp"%>
  </body>
</html>
