//选择资源文件后自动填写资源标题和关键字（均为文件名去掉后缀）
function fileSelect(){
	var startIndex = $("#file").attr("value").lastIndexOf("\\");
	var endIndex = $("#file").attr("value").lastIndexOf(".");
	$("#title").attr("value",$("#file").attr("value").substring(startIndex+1,endIndex));
	var fileExt = $("#file").attr("value").substring(endIndex+1,$("#file").attr("value").length);
	fileExt = fileExt.toLowerCase();
    if(fileExt == "swf"){
		$("#mediaformat").attr("value","animation/swf");
	}else if(fileExt == "mpeg"){
		$("#mediaformat").attr("value","animation/mpeg");
	}else if(fileExt == "asf"){
		$("#mediaformat").attr("value","video/asf");
	}else if(fileExt == "mpg"){
		$("#mediaformat").attr("value","video/mpg");
	}else if(fileExt == "rm"){
		$("#mediaformat").attr("value","video/rm");
	}else if(fileExt == "rmvb"){
		$("#mediaformat").attr("value","video/rmvb");
	}else if(fileExt == "avi"){
		$("#mediaformat").attr("value","video/avi");
	}else if(fileExt == "wmv"){
		$("#mediaformat").attr("value","video/wmv");
	}else if(fileExt == "ppt"){
		$("#mediaformat").attr("value","application/mspowerpoint");
	}else if(fileExt == "doc"){
		$("#mediaformat").attr("value","application/msword");
	}else if(fileExt == "xls"){
		$("#mediaformat").attr("value","application/msexcel");
	}else if(fileExt == "txt"){
		$("#mediaformat").attr("value","text/plain");
	}else if(fileExt == "pdf"){
		$("#mediaformat").attr("value","application/pdf");
	}else if(fileExt == "gif"){
		$("#mediaformat").attr("value","image/gif");
	}else if(fileExt == "jpg"){
		$("#mediaformat").attr("value","image/jpeg");
	}else if(fileExt == "jpeg"){
		$("#mediaformat").attr("value","image/jpeg");
	}else if(fileExt == "bmp"){
		$("#mediaformat").attr("value","image/bmp");
	}else if(fileExt == "psd"){
		$("#mediaformat").attr("value","image/psd");
	}else if(fileExt == "png"){
		$("#mediaformat").attr("value","image/png");
	}else if(fileExt == "zip"){
		$("#mediaformat").attr("value","application/zip");
	}else if(fileExt == "rar"){
		$("#mediaformat").attr("value","application/rar");
	}else if(fileExt == "wav"){
		$("#mediaformat").attr("value","audio/wav");
	}else if(fileExt == "wma"){
		$("#mediaformat").attr("value","audio/wma");
	}else if(fileExt == "mp3"){
		$("#mediaformat").attr("value","audio/mp3");
	}else if(fileExt == "exe"){
		$("#mediaformat").attr("value","application/exe");
	}else{
		$("#mediaformat").attr("value","others");
	}
}

//设置默认值
function init(){
		$("#language").attr("value","汉语");
		$("#learner").attr("value","学生");
}
var validator = $("#isMetadata").attr('value');
if("true" == validator){
	 $("#checkboxall").attr("checked",true);
 $('#mmInfo').show();
}else{
	  $("#checkboxall").attr("checked",false);
  $('#mmInfo').hide();
}
	

function checkFile()
{
	if($("#file").val()=='')
	{
		alert("请选择文件");
	}
	return true;
}