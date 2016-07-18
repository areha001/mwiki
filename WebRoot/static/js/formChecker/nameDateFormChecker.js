/*
 * @author Snow
 */


function checkForm(nameString)
{		
	if($('#name').val().match(/^\s*$/))
		return defuse(nameString+"不能为空");
	if($('#startTimeString').val().match(/^\s*$/))
		return defuse("开始时间不能为空");
	if($('#endTimeString').val().match(/^\s*$/))
		return defuse("结束时间不能为空");
	if($('#endTimeString').val()<$('#startTimeString').val())
		return defuse("结束时间不能在开始时间之前");
	if($('#endTimeString').val()==$('#startTimeString').val())
	{
		if($('#startTimeHour')!=null )
		{
			if(parseInt($('#startTimeHour').val()) > parseInt($('#endTimeHour').val()))
			{
				return defuse("结束时间不能在开始时间之前");
			}
		}
	}
	return true;
}

function defuse(msg)
{
	alert(msg);
	return false;
}