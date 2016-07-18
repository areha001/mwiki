/*
****Active UC API js
*/
function IM_Start(username,password){ //启动UC
	var serverip = "222.240.192.93";
	var serverudpport = "8080";
	var servertcpport="11010";
	var protocol_im="1"; 
	var protocol_mt_rcv="1";
	var protocol_mt_send="1";
	var startasminisize="0";
	var useDyncUName="0"; 
	var param;
	param="IA2#" + "&SrvIP=" + serverip + "&SrvUDPPort=" + serverudpport + "&SrvTCPPort=" + servertcpport + "&UserName=" + username + "&Password=" + password ;
		param= param + "&loginProtocol=" + protocol_im + "&MtRcvProtocol=" + protocol_mt_rcv + "&MtSndProtocol=" + protocol_mt_send;
		param= param + "&startasminisize=" + startasminisize + "&useDyncUName=" + useDyncUName;
	
	try
		{
			ACStart.Start("SOFTWARE\\iActive\\ActiveCenter_Client", "ActiveUC.exe", param);
			return true;
		}
		catch(e)
		{
			if(confirm("使用该服务需要下载安装客户端，点击“确认”继续；客户端安装完后，请刷新当前页面！")==1){
				window.open("/zjer2/client/UC_Client.zip");
			}
			return false;
		}
	return true;
}

function IM_Exit(username){  //退出UC
	ACStart.ExitICQClient( username );
}

function IM_TextChat(username,password,username2)
{
	ACStart.StartTextMsgSend(username,username2);
}

function IM_CreateDynamicMeeting(xusername,xpassword,serverip,ischairman,roomname)
{
	var roomid = "0";
	var serverip="222.240.192.93"; // 服务器IP
	var serverport="11010"; // 服务器端口
	var handle="0"; // 保留
	var message="Hi!"; // 登入会议室弹出的消息，仅对动态会议室有效
	//var ischairman="1"; // 是否为主持人，1为主持人，0为普通用户，仅对动态会议室有效
	var protocol_rcv="1"; // 0=TCP；1＝UDP；2=Multicast
	var protocol_send="1"; // 0=TCP；1＝UDP
	var need_relay_data="0"; // 1=转播数据；0＝不转播数据
	var isanyuser="0"; // 1=匿名登录；0＝非匿名登录
	var layoutName="MtNormal"; // 界面名字, for Meeting is 'MtNormal'
	var layoutURL=""; // 界面下载URL
	var bandMIP="0.0.0.0"; // 采用组播协议接收时的绑定IP
	var param;
		
	param = "IA#" + serverip + ";" + xusername + ";" + xpassword + ";" + roomid.toString() + ";" + serverport + ";";
	param = param + roomname + ";" + handle + ";" + message + ";" + ischairman + ";" + protocol_rcv + ";" + protocol_send + ";";
	param = param + need_relay_data + ";" + isanyuser + ";" + layoutName + ";" + layoutURL + ";" + bandMIP + ";";

	try
	{
		res = ACDownload.StartDownload();
		if (res == 2) ACStart.Start("SOFTWARE\\iActive\\ActiveCenter_Client", "ActiveMeeting.exe", param);
	}
	catch(e)
	{
		if (confirm("使用该服务需要先下载安装客户端，请点击“确定”继续；客户端安装后，请刷新当前页面！") == 1)
		{
			window.open("/zjer2/client/UC_Client.zip");
		}
	}
}

function IM_EnterDynamicMeeting(xusername,xpassword,serverip,ischairman,roomname)
	{
		var roomid = "0";
		var serverip="222.240.192.93"; // 服务器IP
		var serverport="11010"; // 服务器端口
		var handle="0"; // 保留
		var message="Hi!"; // 登入会议室弹出的消息，仅对动态会议室有效
		//var ischairman="0"; // 是否为主持人，1为主持人，0为普通用户，仅对动态会议室有效
		var protocol_rcv="1"; // 0=TCP；1＝UDP；2=Multicast
		var protocol_send="1"; // 0=TCP；1＝UDP
		var need_relay_data="0"; // 1=转播数据；0＝不转播数据
		var isanyuser="0"; // 1=匿名登录；0＝非匿名登录
		var layoutName="MtNormal"; // 界面名字, for Meeting is 'MtNormal'
		var layoutURL=""; // 界面下载URL
		var bandMIP="0.0.0.0"; // 采用组播协议接收时的绑定IP
		var param;
		
		param = "IA#" + serverip + ";" + xusername + ";" + xpassword + ";" + roomid.toString() + ";" + serverport + ";";
		param = param + roomname + ";" + handle + ";" + message + ";" + ischairman + ";" + protocol_rcv + ";" + protocol_send + ";";
		param = param + need_relay_data + ";" + isanyuser + ";" + layoutName + ";" + layoutURL + ";" + bandMIP + ";";

		try
		{
			res = ACDownload.StartDownload();
			if (res == 2) ACStart.Start("SOFTWARE\\iActive\\ActiveCenter_Client", "ActiveMeeting.exe", param);
		}
		catch(e)
		{
			if (confirm("使用该服务需要先下载安装客户端，请点击“确定”继续；客户端安装后，请刷新当前页面！") == 1)
			{
				window.open("/zjer2/client/UC_Client.zip");
			}
		} 
	}