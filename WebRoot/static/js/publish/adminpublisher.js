/*
 * @author Snow
 */



function publishArticle(category, cid, teamId, commit)
{
	$.post('publishArticle.do?method=commitPublish', {'category':category,'id':cid,'date':new Date(),'teamId':teamId, 'commit': commit},render_publish_back);
}
function publishResult(category, cid, teamId, commit)
{
	$.post('publishResult.do?method=commitPublish', {'category':category,'id':cid,'date':new Date(),'teamId':teamId, 'commit': commit},render_publish_back);
}
function publishDiscuss(category, cid, teamId, commit)
{
	$.post('publishDiscuss.do?method=commitPublish', {'category':category,'id':cid,'date':new Date(),'teamId':teamId, 'commit': commit},render_publish_back);
}
function render_publish_back(xml)
{
	if(xml=='<status>no permission</status>')
		alert('你没有足够的权限');
	else
		window.location.reload();
}