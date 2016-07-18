var fav_src = "http://218.16.245.34/zjer2?";
var favTitle = "";
var favUrl = window.location.href;
function show_fav(cid , ctitle, ticket)
{
	favTitle = ctitle;
	var url = fav_src + "code=gt000&ticket="+ ticket + "&redirectPage="+ 
		encodeURIComponent(
		"/zjer2/favclassify.do?method=favoriteclassify&favType=resource&cid=" 
		+ cid + "&favTitle="+encodeURIComponent(favTitle)+"&favUrl="+encodeURIComponent(favUrl) );
	jQuery.facebox($("#fav_iframe").html());
	$($("#facebox").find("iframe")[0]).attr("src",url);
}
document.writeln('<div id="fav_iframe" style="display:none;"><iframe src=""></iframe></div>');