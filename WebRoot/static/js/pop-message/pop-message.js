/*
 * @author:  可乐加糖
 * @emal:    black.angel.liu@gmail.com
 * @des:     一个页面弹出框特效(虽然我很不喜欢这样的东西)
 */

 
(function($) {
    showTip = function(msg){
        var popupPanel = document.createElement("div");
        popupPanel.innerHTML = 'abcbabcaksdjflaksjdlfasjkdf';
        popupPanel.id = "popupMessageBox";
        popupPanel.style.top = $(this).scrollTop()+200 + "px";
        popupPanel.style.left = ($(document).width() - 300) / 2 + "px";
        document.body.appendChild(popupPanel);
        $("#popupMessageBox").fadeIn("fast");
        setTimeout(function(){
        	$("#popupMessageBox").fadeOut("fast");
			popupPanel = null;
        },3000);
    }
})(jQuery);