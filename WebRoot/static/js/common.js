var BuyLo = {};
BuyLo.before_search = function(){
	$('#search_keyword').val($('#search_keyword').val().replace(/(^\s*)|(\s*$)/g,''));  
	return $('#search_keyword').val()!='';
}