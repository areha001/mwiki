<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ include file="../taglibs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>${research.name}</title>
<link type="text/css" rel="stylesheet" href="<c:url value='/xreport/pages/css/global.css'/>" />
<script type="text/javascript" src="<c:url value='/xreport/pages/js/jquery-1.4.1-vsdoc.js'/>"></script>
<script type="text/javascript" src="<c:url value='/xreport/pages/js/tinybox/packed.js'/>"></script>
<script type="text/javascript" src="<c:url value='/xreport/pages/js/showMessage.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/facebox/facebox.js'/>"></script>
<link type="text/css" rel="stylesheet" href="<c:url value='/js/facebox/facebox.css'/>" />
<c:if test="${submitSuccess}">
<script> 
parent.store.reload();
parent.windowpanel.destroy();</script>
</c:if>
<script src="<c:url value='/js/SWFUpload/swfupload.js'/>" type="text/javascript"></script>
<style type="text/css">
body{background-position: center;}
.do_task_work{
	margin-top:28px;
	margin-left:15px;
}
p{margin:10px;}
p object,p span{vertical-align: bottom;}
.activity ul li {margin:0}
</style>
<script>
parent.subwindow = window;
</script>
</head>
<body>
<div class="wapper">
            
				<script type="text/javascript" src="<c:url value='/js/formChecker/articleFormChecker.js'/>"></script>
				<script type="text/javascript" src="<c:url value='/commons/fckeditor/fckeditor.js'/>"></script>
				<script type="text/javascript" src="<c:url value='/js/formChecker/autoSaveFck.js'/>"></script>
				
               <div class="do_task_work">
                <form id="task_work_form" onsubmit="return normalcheck()" enctype="multipart/form-data" method="post" name="task_work_form" action="<c:url value='/admin/blog/createArticle.do?status=2&randomCode=${randomCode }'/>">
           	    <p><span>标题：</span>
           	    <input type="hidden" name="articleType" value="15"/>
           	    <input id="title" name="title" type="text" size="70" value="" maxlength="100"/></p>
           	    <p style="display:none;"><span>分类：</span>
           	    
           	    <select name="primaryTag">
							<c:forEach var="ptag" items="${primaryTags}">
							<option ${ptag==article.primaryTag ? 'selected="selected"' : '' }>${ptag }</option>
							</c:forEach>
							</select>
				</p>
                    <p><span style="vertical-align: top;">内容：</span><textarea id="body" name="body"></textarea></p>
                    <p><span>附件：</span><span id="addpic">dd</span>
                    	<ul class="file_upload">
                    	</ul>
                    </p>
                    <p class="task_submit_line">
                      <input id="xform_submit" type="submit" style="display:none;" value="提交" />
                    </p>
                </form>
                <script>
					function normalcheck()
					{
						save_to_textarea("body");
						return checkForm('标题','内容');
					}
					var checkAttachUrl = "<c:url value='/module/attaches/main.do?method=checkAttach'/>";
					
					 var oFCKeditor = new FCKeditor( 'body' ) ;
					    oFCKeditor.BasePath	=  "<c:url value='/commons/fckeditor/'/>" ;
							oFCKeditor.Height = "250";
							oFCKeditor.Width = "600";
					
					 oFCKeditor.ToolbarSet = "Basic" ;
					     oFCKeditor.ReplaceTextarea() ;
				</script>
            </div>
</div>

</body>
</html>
