/*
 * author: 可乐加糖
 * email:  black.angel.liu@gmail.com
 * des:    首页的轮转公告的JS功能.
 */ 

var s = true;
var t=0;
//滚动公告
function AutoScroll(obj){
	$(obj).find("ul:first").animate({marginTop:"-25px"},500,function(){
		$(this).css({marginTop:"0px"}).find("li:first").appendTo(this);
	});
}
function startli(){
	if(s) t = setInterval('AutoScroll("#scrolldiv")',2000);
}
//suggest
$(document).ready(function(){
	//滚动公告
	startli();
	$("#scrolldiv").hover(function(){
		clearInterval(t);
		var s = false;
	},function(){
		s = true;
		startli();
	});
})