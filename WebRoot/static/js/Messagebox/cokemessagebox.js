/*
 * author: 可乐加糖
 * email:  black.angel.liu@gmail.com
 * des:    消息框弹出组件
 */
var coke = function(){};
coke.message = function(){};
coke.message.showBox = function(content,title,obj){
	var objwindow;
	var scontent = content==undefined?"暂时没有内容":content;
	if(scontent.length>150){
		scontent = scontent.substring(0,147);
	}
	var stitle = title==undefined?"提示":title;
	if(obj==undefined){
		objwindow = document.createElement("div");
		objwindow.id = "coke_messagebox"
		objwindow.style.position = "absolute";
		objwindow.style.right = "0px";
		objwindow.style.bottom = "0px";
		objwindow.style.width = "267px";
		objwindow.style.height = "0px";
		objwindow.style.voerflow = "hidden";
		//这里应该创建对象,为了省事我就直接写上去了,不要鄙视我....   ^_^
		objwindowHTML = "<div id='coke_messagebox_header' style='text-align:right;padding-top:15px;'><span onclick='javascript:new coke.message.closeBox()' style='font-size:12px;color:#5d5d5d;cursor:pointer;text-indent:-9999px;padding-right:20px;'>关闭</span></div>" +
				"<div id='coke_messagebox_content' style='padding:15px 10px 10px 15px;font-size:12px;'>"+scontent+"</div>";
		objwindow.innerHTML = objwindowHTML;
		document.body.appendChild(objwindow);
	}else{
		objwindow = document.getElementById("coke_messagebox");
	}
	objwindow.style.height=  (parseInt(objwindow.clientHeight)+2)+"px";
	if (objwindow.clientHeight<178){
		setTimeout(function(){new coke.message.showBox(stitle,scontent,objwindow);},5);  
	}
}
coke.message.closeBox = function(){
	if(document.getElementById("coke_messagebox")){
		document.getElementById("coke_messagebox").style.display = "none";
	}else{
		return false;
	}
}