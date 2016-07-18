
var OcxCodebase = "iacplayer.cab#version=1,0,1009,4082";

function OnWirtePlayerObject()
{
	var objectInfo = "<object classid=\"clsid:9ED4C0A9-C1ED-49DB-932D-3382422EAC5B\" CODEBASE=\"" + OcxCodebase+ "\" width=\"100\%\" height=\"100\%\" hspace=\"0\" vspace=\"0\" id=\"playerVideo\"/> ";

	document.write( objectInfo );

}

function OnSetUI( nNum )
{
	var w;
	var h;
	var leftOff;
	var topOff;
	if( nNum == 101 )
	{ // 数据一分屏
		w = window.screen.width-100;
		h = window.screen.height-200;
		leftOff = (window.screen.width-w)/2;
		topOff = 10;
	}
	else if( nNum == 2 )
	{
		w = (window.screen.width-100);
		h = w*3/8;
		h = h + 56;
		leftOff = (window.screen.width-w-28)/2;
		topOff = (window.screen.height-56-200-h)/2;
	}
	else if( nNum == 1 || nNum == 4 ||  nNum == 6 || nNum == 8 || nNum == 9 )
	{
		h = window.screen.height-200;
		w = (h-56)*4/3;
		leftOff = (window.screen.width-w)/2;
		topOff = 10;

	}
	
	
	
	div1.style.position="absolute";
	div1.style.top= topOff+"px";
	div1.style.left= leftOff + "px";
	
	Table1.width = w+10;
	Table1.height = h+10;
	td1.width = w;
	td1.height = h;
}


function OnPlayerOpenFile( player, url )
{
		var filename = getParameter(url, "filename");
		var username = getParameter(url,"username");
		var password = getParameter(url,"password");
		var verifyurl = getParameter(url,"verifyurl");
		var verifyurl2 = getParameter(url, "verifyurl2");
		var submiturl = getParameter(url, "submiturl");
		
		
		var encodeUri = getParameter(url,"encodeuri");
		var nEncode = parseInt(encodeUri);
		if( nEncode == 1 )
		{// 是不是加了密的
			filename = decodeURIComponent(filename);
			username = decodeURIComponent(username);
			password = decodeURIComponent(password);
			verifyurl = decodeURIComponent(verifyurl);
			verifyurl2 = decodeURIComponent(verifyurl2);
			submiturl = decodeURIComponent(submiturl);
		}
		
		var param = "";
		if (verifyurl != "")
		{
	
			param = "UserName="+username+"&Password="+password+"&VerifyURL='"+verifyurl+"'&VerifyURL2='"+verifyurl2+"'&SubmitURL='"+submiturl+"'";
		}

		
		//是不是接收实况转播
		var rcvCastData = getParameter(url,"rcvCastData"); if( rcvCastData=="") rcvCastData="0";
		var bRcvCastData = parseInt(rcvCastData);

		//是不是打开文件就开始播放
		var startplay = getParameter(url,"startplay"); if (startplay=="") startplay="0";
		var bStartPlay = parseInt(startplay);

		// 播放文件
		if( bRcvCastData != 0 )
		{ //接收录制程序的实况转播
			var rcvCastIP = getParameter(url,"castip"); if( rcvCastIP == "") rcvCastIP = "234.6.5.4";
			var rcvCastPort = getParameter(url,"castport"); if( rcvCastPort=="" ) rcvCastPort="12113";
			var nPort = parseInt(rcvCastPort);
			var rcvBandIP = getParameter(url,"bandip"); if( rcvBandIP == "") rcvBandIP="0.0.0.0";
			
			player.StartRcvRecordData(rcvCastIP, nPort, rcvBandIP );
		}
		else
		{
			player.OpenFile(filename, param, bStartPlay);
		}	
}

function getParameter( url, name) 
{
	    //var url = parent.location.href; // VERY IMPORTANT: PARENT
	    var start = url.indexOf("?")+1;
	    if (start==0) {
	        return "";
	    }

	    var value = "";
	    var queryString = url.substring(start);
	    var paraNames = queryString.split("&");
	    for (var i=0; i<paraNames.length; i++) 
		{
	        if (name==getParameterName(paraNames[i])) 
			{
	            value = getParameterValue(paraNames[i])
	        }
	    }
	    return value;
	}

function getParameterName(str) 
{
	    var start = str.indexOf("=");
	    if (start==-1) 
		{
	        return str;
	    }
	    return str.substring(0,start);
}

function getParameterValue(str) 
{
	    var start = str.indexOf("=");
	    if (start==-1) 
		{
	        return "";
	    }
	    return str.substring(start+1);
}
