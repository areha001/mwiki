/*
 * @author Snow
 */


function checkForm(title_name, body_name)
{		
	if($('#title').val().match(/^\s*$/))
		return defuse(title_name+"不能为空");
	if($('#title').val().length>200)
		return defuse(title_name+"不能超过200字");
	if($('#body').val().replace(new RegExp("<p>","g"),"").replace(new RegExp("</p>","g"),"").replace(new RegExp("<br\\s*/>","g"),"").match(/^\s*$/))
		return defuse(body_name+"不能为空");
	if($('#body').val().length>100000)
		return defuse(body_name+"不能超过10万字");
	if($("#reprint")!=null)
	{
		if($("#reprint").attr("checked") && $("#fromUrl").val().match(/^\s*$/))
			return defuse("转载请标明出处");
	}
	return true;
}

function defuse(msg)
{
	alert(msg);
	return false;
}