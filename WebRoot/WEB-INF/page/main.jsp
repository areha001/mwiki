<%@ page language="java" contentType="text/html" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/page/common/taglibs.jsp"%>
<div class="bf_container_nav">
<ul>
<li class="normal">最近更新</li>
<li class="last"></li>
</ul>
</div>
<div class="container">
 	<c:forEach var="i" items="${list }" varStatus="vv">
 		
 		<div class="item item_one ${vv.index % 3 == 2? 'hitem' : 'vitem'}" id="item_${i.id }">
 			<c:set var="k" value="${vv.index % 3 == 2? '2' : '1'}"/>
	  		<div class="item_pic item_p"><a href="<c:url value='/item/${i.id }'/>"><img src="<c:url value='/static/images/front/test${k }.jpg'/>" /></a></div>
	  		<div class="item_other item_p">
	  			<h2><a href="<c:url value='/item/${i.id }'/>">${i.name } </a></h2>
		  		<div class="item_content"><c:out value="${i.content }" escapeXml="true"/></div>
		  		<div class="item_bottom">
			  		<span class="create_info">本词条由 <span class="item_creator">${i.creatorName } </span>于 <span class="item_create_time"><fmt:formatDate value="${i.createTime }" pattern="yyyy-MM-dd HH:mm"/></span> 创建</span>
			  		<span class="item_p_more"><a class="more" href="<c:url value='/item/${i.id }'/>">点击查看详请--&gt;</a></span>
			  		<div class="clear"></div>
			 	</div>
			 	<div class="clear before_bottom"></div>
			 </div>
 		</div>
 	</c:forEach>
 </div>
