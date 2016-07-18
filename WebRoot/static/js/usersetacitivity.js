/*
 * @author Coke + Sugar
 * @email  black.angel.liu@gamil.com
 */

window.onload = function(){
	var yqbtn = document.getElementsByName("yq");
	for(var i=0;i<yqbtn.length;i++){
		yqbtn[i].onclick = function(){
			var frmobj = document.getElementById("frmuser");
			frmobj.action = "groupuser.html";
			frmobj.submit();
		}
	}
}