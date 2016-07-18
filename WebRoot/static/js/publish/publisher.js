/*
 * @author Snow
 */



function publish(category, cid)
{
	$.post('publish.do?method=publish', {'category':category,'id':cid,'date':new Date()},render_publish_back);
}
function render_publish_back(xml)
{
	if(xml=='<status>no permission</status>')
		alert('你没有足够的权限');
	else
		window.parent.location.reload();
}