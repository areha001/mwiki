	$(document).ready(function(){
	$("#name").focus();
	$.formValidator.initConfig({formid:"photoTypeForm",
		onerror:function(){
			alert("校验没有通过，具体错误请看错误提示")
		}
	});
	//照片名称
	$("#name").formValidator({
	onshow:"请输入照片标题",onfocus:"照片标题至少1个字符,最多20个字符",oncorrect:"输入合法"
	}).inputValidator({
	min:1,max:20,
	onerror:"你输入的照片标题非法,请确认"})	
	
	//照片标签
	$("#tags").formValidator({
	onshow:"请输入照片标签",onfocus:"照片标签至少1个字符,最多20个字符",oncorrect:"输入合法"
	}).inputValidator({
	min:1,max:20,
	onerror:"你输入的照片标签非法,请确认"})	
	
	//照片描述
	$("#description").formValidator({
	onshow:"请输入照片描述",onfocus:"照片描述至少1个字符,最多100个字符",oncorrect:"输入合法",defaultvalue:"这家伙很懒，什么都没有留下。"
	}).inputValidator({
	min:1,max:100,
	onerror:"你输入的照片描述非法,请确认"})	
	//上传类型
	$("#fileImage").formValidator({
	onshow:"请上传图片",onfocus:"照片类型只能为bmp,png,gif,jpg,jpeg",oncorrect:"输入合法"
	}).functionValidator({
	 	fun:function(val,elem){
	      var endIndex = $("#fileImage").attr('value').lastIndexOf(".");
				var fileType = $("#fileImage").attr('value').substring(endIndex+1,$("#fileImage").attr('value').length);
				fileType = fileType.toUpperCase();
				if(fileType!='BMP' && fileType!='PNG' && fileType!='GIF' && fileType!='JPG' && fileType!='JPEG'){
					return "校验失败";
				}
				return true;
		    }
	})
});
