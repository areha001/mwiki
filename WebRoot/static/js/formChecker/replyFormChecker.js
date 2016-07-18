/*
 * @author Snow
 */



function checkForm(title_name, body_name)
{		
	if($('#title').val().match(/^\s*$/))
		return defuse(title_name+"不能为空");
	if($('#title').val().length>200)
		return defuse(title_name+"太长");
	if($('#body').val().match(/^\s*$/))
		return defuse(body_name+"不能为空");
	if($('#body').val().length>10000)
		return defuse(body_name+"太长");
	return true;
}

function defuse(msg)
{
	alert(msg);
	return false;
}