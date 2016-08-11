/*
 * @author Coke + Sugar
 * @email  black.angel.liu@gamil.com
 */

//工具方法
function ifejumpUrl(src){
	//如果存在父级页面
	if(window.parent){
		var fatherobj = window.parent;
		fatherobj.getElementById("pagelink").src= src;
	}else{
		throw new Error("页面不存在父级框架.");
		return false;
	}
}
