

	function render_back_remove(xml)
	{
		var successed = xml.match(/.status.(\d+)..status./)
		if(successed!=null)
		{
			var removed_attach_id = successed[1];
			$("#attach_file_"+removed_attach_id).remove();
			alert("删除成功");
		}
	}
	var filecount = 2;
	function removeFileTag(pos)
	{
		$('#input_file'+pos).remove();
	}
	function addFileTag(obj)
	{
		$(obj).parent().parent().append("<div id=\"input_file"+filecount+"\"><input type=\"file\" name=\"fileImage"+filecount+"\"><a class=\"delete\" href=\"javascript:removeFileTag("+filecount+")\">取消</a></div>")
		filecount++;
		if(window.parent.setCwinHeight)
			window.parent.setCwinHeight();
	}
	
	function clean_file()
	{
		$("#fileImage1").html('<input id="fileImage1" type="file" name="fileImage1" value="">');
	}
	var uploadOldAction = "noaction";
	var uploadFormName = "#uploadForm";
	function checkAttach(checkAttachUrl)
	{
		
		if(uploadOldAction=="noaction")
			uploadOldAction = $(uploadFormName).attr("action");
		$(uploadFormName).attr("action" , checkAttachUrl).attr("target" , "unseenable_iframe");
		$(uploadFormName).submit();
	}
	function checkmsg(msg, success_status)
	{
		if(success_status==20)
		{
			alert(msg);
			return null;
		}
		if(success_status==10)
		{
			var commit = confirm(msg);
			if(commit)
				$(uploadFormName).attr("action" , uploadOldAction).attr("target" , "").submit();
		}
		if(success_status==0)
		{
			$(uploadFormName).attr("action" , uploadOldAction).attr("target" , "").submit();
		}
	}