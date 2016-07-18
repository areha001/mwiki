/*
 * @author Coke + Sugar
 * @email  black.angel.liu@gamil.com
 */

function resourcesUrl(obj){
	var selectValue = obj.value;
	if(selectValue=="添加资源"||selectValue=="添加活动"){
		return false;
	}else{
		document.getElementById("frmlink").action = selectValue;
		document.getElementById("frmlink").submit();
	}
}

window.onload = function(){
	/* 添加流程弹出的小页面 */
	var addproButton = $("#addprocess");
	addproButton.click(function(){
		//这里是许诺写的，为了做测试先注释掉了。
		jQuery.facebox({ ajax: 'addprocess.html'});
	})
}
