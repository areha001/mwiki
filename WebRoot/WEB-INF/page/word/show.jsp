<%@ page language="java" contentType="text/html" pageEncoding="utf-8"%>
<%@include file="../admin/taglibs.jsp"%>

<div class="bf_container_nav">
<ul>
<li class="normal"><a href="<c:url value='/'/>">首页</a></li>
<li class="normal"><a href="<c:url value='/word'/>">词条</a></li>
<li class="normal"><a href="">${word.name }</a></li>
<li class="last"></li>
</ul>
</div>
<div class="container">
	<div id="word_content">
		<h1 class="word_title">${word.name }</h1>
		<div class="">
			<div class="word_description_wrapper">
				<div id="word_category">
					<span class="word_elem">上级词条：<a href="<c:url value='/word/${word.parentName }'/>">${word.parentName }</a></span>
					<span class="word_elem">所属分类：<a href="<c:url value='/word/${word.groupName }'/>">${word.groupName }</a></span>
				</div>
				<c:if test="${empty wh }">
					<div class="no_word_tips"><span>很报歉，这个词条尚未完善，暂时还没有内容，您可以<a href="<c:url value='/word/edit/${word.name }'/>" class="click_here">点击这里</a>投稿</span></div>
				</c:if>
				<c:if test="${!empty wh }">
						<div class="word_desc">
							${wh.description }
						</div>
				</c:if>
				<dl id="word_analyze">
					<dt>词条统计</dt>
					<dd>
						<ul>
							<li><span>访问次数：</span>100 次</li>
							<li><span>编辑次数：</span>2 次</li>
							<li><span>最近更新：</span>2016-08-12</li>
							<li><span>最近编辑：</span>${word.creatorName }</li>
							<li><span>创建者：</span>${word.creatorName }</li>
						</ul>
					</dd>
				</dl>
			</div>
			<!-- 
			<p class="return_last"><a href="javascript:window.history.back(-1);">&lt;&nbsp;返回上一词条</a></p> -->
		</div>
		<div class="related_word">
		<h2>相关词条</h2>
		<div>暂无相关词条</div>
		</div>
	</div>
		<div class="clear before_bottom page_bottom"></div>
</div>