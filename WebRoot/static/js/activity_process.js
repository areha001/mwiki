/*
 * authro:     可乐加糖
 * email:      black.angel.liu@gmail.com	
 * des:        活动流程页面的JavaScript
 */
 
$(document).ready(function(){
	var emArr = $("em");
	for(var i=0;i<emArr.length;i++){
		emArr[i].onclick = function(){
			//先处理文字
			if(this.innerHTML=="展开"){
				this.innerHTML="收缩"
			}else{
				this.innerHTML="展开"
			}
			//平滑处理效果
			var divArr = this.parentNode.parentNode.getElementsByTagName("div");
			var targetDiv;
			for(var j=0;j<divArr.length;j++){
				if(divArr[j].className=="md"){
					targetDiv = divArr[j];
				}
			}
			$(targetDiv).slideToggle("slow");
		}
	}
})