<%@ page language="java" contentType="text/html" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/page/common/taglibs.jsp"%>
<div class="bf_container_nav">
<ul>
<li class="normal"><a href="<c:url value='/'/>">首页</a></li>
<li class="normal"><a href="">搜索结果</a></li>
<li class="last"></li>
</ul>
</div>
<div class="container">
	<div id="word_content">
		<h1 class="word_title">搜索：${search_keyword_global }</h1>
		<div class="">
			<div class="word_description_wrapper">
				<div class="word_desc">
					共收录 <a >${page.totalResults }</a> 条词汇， 当前显示 ${page.pageStart+1 } - ${page.pageEnd } 条  上一页 下一页
				</div>
		
				<div class="related_word">
					<div class="">
						<dl>
							<dt></dt>
							<c:forEach var="i" items="${list }">
								<dd class="rlw">
									<a class="innerlink" href="<c:url value='/word/${i.name }'/>">${i.name }</a>
								</dd>
							</c:forEach>
							<dd class="clear">&nbsp;</dd>
						</dl>
					</div>
				</div>
		</div>
		</div>
 </div>
</div>