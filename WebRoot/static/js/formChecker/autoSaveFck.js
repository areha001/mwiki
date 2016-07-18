/*
 * @author Snow
 */
	var oEditer;
	function FCKeditor_OnComplete( editorInstance )
	{ 
	    oEditer = editorInstance;
	}
	function save_to_textarea(textarea_id)
	{
		$("#"+textarea_id).val(oEditer.GetXHTML(false));
	}
	function fck_set_html(html)
	{
		oEditer.SetHTML(html);
	}
	