//验证checkbox
function validator(checkboxName) {
	var checkarr = document.getElementsByName(checkboxName);
	for (var i = 0; i < checkarr.length; i++) {
		if (checkarr[i].checked) {
			return true;
		}
	}
	return false;
}

