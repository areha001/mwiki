//======================树种字典======================
function TREETYPE() {
	this.common   = "c_";  //公共区目录树 任何人都可以浏览
	this.choose   = "h_";  //学科选择树     
	this.manager   = "m_";  //学科目录树管理
 	this.subject_common = "sc_";  //同步学科目录浏览
	this.subject_choose = "sh_";  //同步学科选择树
	this.sync_common = "syc_";  //同步资源目录浏览
}
var TreeType=new TREETYPE();
//=====================上一个聚焦的Id=================
var preOpenedFolderId="";
var preCurTextId="";
var mClass="";
//=================== used images ====================
var vBgImg = new String("../images/tree/vert_line.gif");

var last1child1=new String("../images/tree/vert_line_s10.gif");
var last1child0=new String("../images/tree/vert_line_n10.gif");
var last0child1=new String("../images/tree/vert_line_s00.gif");
var last0child0=new String("../images/tree/vert_line_n00.gif");

var openedLast=new String("../images/tree/vert_line_s11.gif")
var openedNotLast=new String("../images/tree/vert_line_s01.gif")

var addIcon = new String("../images/tree/add.gif");
var modifyIcon = new String("../images/tree/modify.gif");
var deleteIcon = new String("../images/tree/delete.gif");
var moveIcon = new String("../images/tree/move.gif");

var temp_team_id_in_tree = 1;

if(window.get_team_id_js)
{
	temp_team_id_in_tree = window.get_team_id_js();
}
//=============打开图标与关闭图标的对应===============
var arrOpenedFd=[]
    arrOpenedFd[arrOpenedFd.length]=new String("../images/tree/folder1.gif")//0
	arrOpenedFd[arrOpenedFd.length]=new String("../images/tree/ie.gif")//1
	arrOpenedFd[arrOpenedFd.length]=new String("../images/tree/root0.gif")//2
	
var arrClosedFd=[]
    arrClosedFd[arrClosedFd.length]=new String("../images/tree/folder0.gif")//0
	arrClosedFd[arrClosedFd.length]=new String("../images/tree/ielock.gif")//1
	arrClosedFd[arrClosedFd.length]=new String("../images/tree/root0.gif")//2

//default
var openedFolder=arrOpenedFd[0];
var closedFolder=arrClosedFd[0];

function genClosedPic(openedImg){
	for(var i=0;i<arrOpenedFd.length;i++){
	    if(openedImg.indexOf(arrOpenedFd[i])!=-1){
			return arrClosedFd[i];
		}
	}
	return closedFolder;
}

function genOpenedPic(closedImg){
	for(var i=0;i<arrClosedFd.length;i++){
	    if(closedImg.indexOf(arrClosedFd[i])!=-1){
			return arrOpenedFd[i];
		}
	}
	return openedFolder;
}
//=====================打开关闭图标结束========================


//树展开锁，主要是防止抢占临时处理桢，TODO:这里可以应用web2.0来避免
var isLoading=false; //数据载入锁

var treedoc=document;   //目录树展示文档
var targetFrame=parent.MainFrame;   //跳转目标桢，请通过initEnv()设置
var treeTempFrame=null; //临时处理页面桢，请通过initEnv()设置

function initEnv(){
  //alert("initEnv:ListFrame"+parent.MainFrame.ListFrame)
  if(!targetFrame){
    targetFrame=document.getElementById("frmtarget");
  }
   
  if(!treeTempFrame){
    treeTempFrame=document.getElementById("tree_temp");
  }
}

/*
 * id :String  
 * pid: String 父ID
 * title:String 节点显示字符
 * havechild:true/false
 * needturnto: "0"/"1"/allUrl
 */
function Node(id,pid,title,havechild,treetype,needturnto,icon,iconOpen){
   this.id=id;
   this.pid=pid;
   this.icon=icon;
   this.iconOpen=iconOpen;
   this.title=title;
   this.havechild=havechild;
   this.treetype=treetype;
   this.needturnto=needturnto;
   //this.nodes=[];    //要生成的同级节点列表
}

/*供load页调用*/
function buildNewNode(id,pid,title,havechild,treetype,needturnto,icon,iconOpen){
  return new Node(id,pid,title,havechild,treetype,needturnto,icon,iconOpen);
}

/*获取+-图片类型*/
function genVImage(havechild,LastOne){
   var ret="";
   ////alert(havechild==true);
   ////alert(LastOne==true);
   if(havechild){
	  if(LastOne){
		  ret = last1child1;    
	  }else{
	      ret = last0child1;
	  }
   }else{
	  if(LastOne){
		  ret = last1child0;  
	  }else{
	      ret = last0child0;
	  }		
   }
   return ret;
}

//===================节点构成对象的获取================
function genVImgObj(id,treetype){
  return treedoc.getElementById("a_"+treetype+id);
}
function genFolderImgObj(id,treetype){
  return treedoc.getElementById("b_"+treetype+id);
}
function genTextObj(id,treetype){
  return treedoc.getElementById("c_"+treetype+id);
}
function genDivObj(id,treetype){
  return treedoc.getElementById("d_"+treetype+id);
}
function genVTd(id,treetype){//垂直线的背景所在TD
  return treedoc.getElementById("tdv_"+treetype+id);
}

function genLoadUrl(id,treeType){
	switch(treeType){
	  case TreeType.common   : return "tree.do?method=classifytreeload&pid="+id+"&treetype="+treeType;      //
	  case TreeType.manager   : return "tree.do?method=classifytreeload&pid="+id+"&treetype="+treeType;      //
	  case TreeType.choose   : return "tree.do?method=classifytreeload&pid="+id+"&treetype="+treeType;
	  case TreeType.subject_common : return "tree.do?method=subjecttreeload&pid="+id+"&treetype="+treeType;
	  case TreeType.subject_choose : return "tree.do?method=subjecttreeload&pid="+id+"&treetype="+treeType;
	  case TreeType.sync_common : return "syncres.do?method=synctreeload&pid="+id+"&treetype="+treeType;
	  default:
		   return "";
	}
	//return "tree.do?method=classifytreeload&pid="+id+"&treetype="+treeType; 
}

function genTurnToPage(id,treeType){
	//alert(treeType)
	switch(treeType){
	  case TreeType.common   : return "resource.do?method=list&teamId="+temp_team_id_in_tree+"&classifyId="+id;      //资源列表
	  case TreeType.choose   : return "";
	  case TreeType.manager   : return "manager.do?method=list&teamID="+temp_team_id_in_tree+"&classifyId="+id+"&class="+mClass;
	  case TreeType.sync_common : return "syncres.do?method=list&teamID="+temp_team_id_in_tree+"&classifyId="+id;
	  default:
		   return "";
	}
}

//=====================================================
/*将节点集合转化成HTML表格代码*/
function nodesToHtml(data_nodes,treetype){
    
	if((!data_nodes)||data_nodes.length<=0) return "";
    
	var tableHtml="<table border=0 cellpadding=0 cellspacing=0 width=10>";
	var node=null;
	var isLast=false;
	var vBg=""

    var vImg="";//vert_line_n00.gif/ vert_line_n10.gif/ vert_line_s00.gif/ vert_line_s01.gif/ vert_line_s10.gif/ vert_line_s11.gif
    var vClick="";
    var defaultImg="";
    var leafNode = "";
	for(i=0;i<data_nodes.length;i++){
	    node=data_nodes[i]
		
		ItemText=(node.title).replace(/^[\s]+/gi,"").replace(/[\s]+$/gi,"");
		//ItemID=(node.id).replace(/^[\s]+/gi,"").replace(/[\s]+$/gi,"");???
		ItemID = node.id;
		//ItemSub=(node.title).replace(/^[\s]+/gi,"").replace(/[\s]+$/gi,"")

		//有无儿子，是否最后一个
		vImg=genVImage(node.havechild,i==data_nodes.length-1);
		
        //最后一个节点
		if(i == data_nodes.length-1){
	       vBg = "";
		   isLast=true;
	    }else{
		   vBg = " background="+vBgImg
		   isLast=false;
		}

        if(node.havechild){
		   vClick=" onclick=\"getChildren('"+node.id+"','"+treetype+"')\"";
		}else{
		   vClick="";
		   leafNode = "leafNode";
		}
        
		//alert(node.icon);
		if(node.icon && node.icon.length>0){
		  defaultImg=node.icon;
		}else{
		  defaultImg=closedFolder;
		}
        


		tableHtml+="<tr class=td10>"
		//第一列的Td
		tableHtml+="  <td width=19 id=\"tdv_\""+treetype+ItemID+" height=18 valign=top "+ vBg +">"
		      //点击展开
		tableHtml+="     <img id=\"a_"+treetype+ItemID+"\" class=\"FdReady\" src=\"" + vImg +"\" "+ vClick +">"
		tableHtml+="  </td>"
		//第二列的Td
		tableHtml+="  <td height=16 nowrap class=None_Button>"
		tableHtml+="<img id=\"b_"+treetype+ItemID+"\" src=\""+defaultImg+"\" align=absmiddle  onClick=\"clickFolderImg('"+ItemID+"','"+treetype+"','"+node.needturnto+"');\" style='cursor:hand' >"
		tableHtml+="<span id=\"c_"+treetype+ItemID+"\" class=\"unFocusText\" lang=\""+leafNode+"\" onClick=\"clickText('"+ItemID+"','"+treetype+"',"+ isLast +","+node.havechild+",'"+node.needturnto+"');return false;\" valign=absmiddle>"
		tableHtml+="<a href='#'>"+ItemText+"</a>"
		tableHtml+="     </span>"
		      //子节点容器
		tableHtml+="    <span id=\"d_"+treetype+ItemID+"\" class=None_Button></span>"
		tableHtml+="  </td></tr>"
    }//end for

    tableHtml+="</table>"
	return tableHtml;
}

/*点击文字打开子节点*/
function getChildrenByClickText(id,treetype,isLast){
	//取得目标节点相关对象
	var oDiv=genDivObj(id,treetype);
	var oFolderImg=genFolderImgObj(id,treetype);
	var oVImg=genVImgObj(id,treetype);

    initEnv();
    //============================
	if(oVImg.className=="FdReady"){ //没打开过，生成它
			refreshNode(id,treetype,isLast,oDiv,oVImg);
			openFolderImg(id,treetype);
	}else if(oVImg.className=="FdClose"){ //打开过，则开启树状目录
			oVImg.className="FdOpen"
			if(oVImg.src==last1child1){
			   oVImg.src=openedLast;
			}else{
			   oVImg.src=openedNotLast;
			}
			oDiv.style.position=""
			oDiv.style.visibility=""
	}
}

/*===================================================
| 点击+ -图标的事件
|      打开或关闭子节点块
| id,操作的分类，isLast:true/false,是否为最后一个
| By 陈祝华 2006.04.13
*===================================================*/
function getChildren(id,treetype,isLast){
	//取得目标节点相关对象
	var oDiv=genDivObj(id,treetype);
	var oFolderImg=genFolderImgObj(id,treetype);
	var oVImg=genVImgObj(id,treetype);

    initEnv();
    //============================

	if(oVImg.className=="FdReady"){ //没打开过，生成它
			refreshNode(id,treetype,isLast,oDiv,oVImg);
			openFolderImg(id,treetype);
	}else if(oVImg.className=="FdOpen"){ //已经打开，则关闭树状目录
			oVImg.className="FdClose";
			if(oVImg.src==openedLast){
			   oVImg.src=last1child1;
			}else{
			   oVImg.src=last0child1;
			}
			oDiv.style.position="absolute";
			oDiv.style.visibility="hidden";
    
	}else if(oVImg.className=="FdClose"){ //打开过，则开启树状目录
			oVImg.className="FdOpen"
			if(oVImg.src==last1child1){
			   oVImg.src=openedLast;
			}else{
			   oVImg.src=openedNotLast;
			}
			oDiv.style.position=""
			oDiv.style.visibility=""
	}

}

/*private 无条件刷新某个节点*/
function refreshNode(id,treetype,isLast,obj1,obj2){
	if(isLoading) return;//防止同时开放两个目录
	
	var oDiv=obj1
	var oVImg=obj2;
	if(!obj1){
	  oDiv=genDivObj(id,treetype);
	}
	if(!obj2){
	  oVImg=genVImgObj(id,treetype);
	}

	oDiv.innerHTML="<div class=FdWait>Loading...</div>"
	oVImg.className="FdOpen"
	if(isLast)
		oVImg.src=openedLast
	else
		oVImg.src=openedNotLast

	//处理子节点数据获取
	var sLoadurl=genLoadUrl(id,treetype);
	//alert("sLoadurl="+sLoadurl);
	treeTempFrame.src=sLoadurl;//刷新单个接点的方法
	isLoading=true;
}

function buildNodeRoot(nodeId,treetype){
	if(isLoading) return;//防止同时开放两个目录
	initEnv();
	var oDiv=null
	oDiv=genDivObj(id,treetype);
	if(oDiv.innerText.length==0){
	   var sLoadurl=genLoadUrl(id,treetype);
       treeTempFrame.src=sLoadurl;//刷新单个接点的方法
	   isLoading=true;	
	}else{
	   if(oDiv.style.visibility==""){
          oDiv.style.position="absolute";
	      oDiv.style.visibility="hidden";	   
	   }else{
          oDiv.style.position="";
	      oDiv.style.visibility="";	   
	   }
	}
	//changetdColor(id,treetype);
	//处理子节点数据获取
}

function refreshRoot(id,treetype){
	if(isLoading) return;//防止同时开放两个目录
	initEnv();
	var oDiv=null
	oDiv=genDivObj(id,treetype);
	if(oDiv.innerText.length==0){
	   var sLoadurl=genLoadUrl(id,treetype);
       treeTempFrame.src=sLoadurl;//刷新单个接点的方法
	   isLoading=true;	
	}else{
	   if(oDiv.style.visibility==""){
          oDiv.style.position="absolute";
	      oDiv.style.visibility="hidden";	   
	   }else{
          oDiv.style.position="";
	      oDiv.style.visibility="";	   
	   }
	}
	//changetdColor(id,treetype);
	//处理子节点数据获取
	
}

/*=========================================
| 点击节点文字事件
|    样式改变、跳转
|*=========================================*/
function clickText(id,treetype,isLast,haveChild,needTurnto){   
    //alert("click text");
	//取得目标节点相关对象
	var oDiv=genDivObj(id,treetype);
	var oFolderImg=genFolderImgObj(id,treetype);
	var oVImg=genVImgObj(id,treetype);

    initEnv();
    //============================
	//alert(haveChild && oFolderImg.src.search(closedFolder)!=-1)
	//如果是关闭的
    if(haveChild && oFolderImg.src.search(closedFolder)!=-1){
       getChildrenByClickText(id,treetype,isLast)
    }
	//样式改变
    changetdColor(id,treetype);   
	
	//
	openFolderImg(id,treetype);
	if(treetype == TreeType.common || treetype == TreeType.manager || treetype == TreeType.sync_common){
	   //转
	   turn2Page(id,treetype,needTurnto);
	}else{
	   setSubjectPath(id,treetype);
	}
	
}



/*
 * 点击文件夹事件
 *   1、改变文件夹图标状态
 *   2、跳转
 *   3、选中文字
 */
function clickFolderImg(id,treetype,needTurnto){ //开启选取的物件
    if(isLoading) return;
    //alert("clickFolderImg");
	var oDiv=genDivObj(id,treetype);
	var oFolderImg=genFolderImgObj(id,treetype);
	var oVImg=genVImgObj(id,treetype);
    initEnv()

    openFolderImg(id,treetype);
	
	turn2Page(id,treetype,needTurnto);

    changetdColor(id,treetype)
}

/*private 页面跳转*/
function turn2Page(id,treetype,needTurnTo){
	//alert("turn2Page ："+needTurnTo);
	if(needTurnTo=="0") return;

	initEnv();
    
	if(needTurnTo!="1"&&needTurnTo){//自定义节点自带的URL
	   targetFrame.src=needTurnTo;
	   return;
	}
	//alert("genTurnToPage(id,treetype):"+ genTurnToPage(id,treetype));
	if(targetFrame){	   
	   if(targetFrame.setClassify){
	     targetFrame.setClassify(id,treetype);
	   }else{
		  if(treetype == TreeType.common){
	        window.parent.document.getElementById("list").src="resource.do?method=list&teamId="+temp_team_id_in_tree+"&classifyId="+id;
		  }else if(treetype == TreeType.manager){			  
			  window.parent.document.getElementById("list").src="manager.do?method=list&teamId="+temp_team_id_in_tree+"&classifyId="+id+"&class="+mClass;
		  }else if(treetype == TreeType.sync_common){
			  window.parent.document.getElementById("list").src="syncres.do?method=list&teamId="+temp_team_id_in_tree+"&classifyId="+id;
		  }
	   }
	}else{
	   alert("找不到目标窗口！");
	}
	//alert("123=="+targetFrame.location);
}

/*private 打开文件夹图片
*  1、开当前节点
*  2、关闭前一个打开的图片
*/
function openFolderImg(id,treetype){
   //alert("openFolderImg");

   //关闭前一个打开的Folder
	closeFolderImg(id);

    //打开
    var obj=genFolderImgObj(id,treetype);
	//alert(obj);
    if(obj){
		 //要照顾自定义图标
	     obj.src=genOpenedPic(obj.src);
    }	
    
	//缓存当前的id
	if(obj)
	  preOpenedFolderId=obj.id;
    //alert("end openFOlderImg")
}


/*private*/
function closeFolderImg(filterId){
  if(preOpenedFolderId&&preOpenedFolderId.length>0&&filterId!=preOpenedFolderId){
	//要照顾自定义图标
	var obj=document.getElementById(preOpenedFolderId);
	if(obj){
	  obj.src=genClosedPic(obj.src);
	}
    
  }
}

/*增加垂直背景线，用于多棵树并列显示，并且该树的根节点只有一个节点的情况*/
function addVBgImg(id,treetype){
  var objVImg=genVTd(id,treetype);
  //alert(objVImg);
  if(objVImg){
    objVImg.background = vBgImg;
  }
}

/*private*/
function clearTextStyle(filterId){
  if(preCurTextId&&preCurTextId.length>0){
    var obj= document.getElementById(preCurTextId);
    if(obj)
       obj.className="unFocusText";
  }
}

/*private 点击变色*/
function changetdColor(id,treetype){
    //alert("changetdColor");
	//取消前一个节点的选中样式
	clearTextStyle(id);

	var obj = genTextObj(id,treetype);
	if(obj&&obj.className!="FocusText"){
	   obj.className="FocusText";
	}

    //缓存当前的id
	if(obj)
	   preCurTextId=obj.id;
}

//==================================工具类函数=======================
/*插入HTML代码*/
function insertChildHtml(id,outterNodes,treetype){
    var html = nodesToHtml(outterNodes,treetype);
	var obj=genDivObj(id,treetype)
    if(!obj){
	   alert("目标节点没有找到！");return;
	}

	if(html&&html.length>0){
	   obj.innerHTML = html;
	}else{//没有子节点
	   obj.innerHTML = "";
	}
	
    
	//解锁
	isLoading=false;
}
/*取得地址栏参数*/
function getLocationParam(objLoc,paramname){
   var ret="";
   if(objLoc){
      var loc=new String(objLoc.search);
	  if(loc.length<=1) return null;
	  var param="?"+paramname+"="
	  var pos=loc.indexOf(param);
	  var str=null;
	  if(pos==-1){
	     param="&"+paramname+"="
	     pos=loc.indexOf(param); 
	  }
	  //
	  if(pos==-1){
	     return null;
	  }else{
	     str=loc.substring(pos+param.length,loc.length)
	  }
      
	  pos=str.indexOf("&")
	  if(pos!=-1){
	    ret=str.substring(0,pos);
	  }else{
	    ret=str;
	  }
      return ret;

   }
}


//设置学科路径
function setSubjectPath(id,treetype){
    parent.document.getElementById("nodeid").value = id;
    if(treetype == TreeType.choose){
    	setClassifySubjectPath(id);
    }else if(treetype == TreeType.subject_choose){
    	setNodeSubjectPath(id);
    }
    
    
}

//设置同步资源学科节点
function setNodeSubjectPath(id){
	SubjectNodeAction.getSubjectNodeChineseNodePathByID(id,showSetNodeSubjectPath);	
}
function showSetNodeSubjectPath(chinesePath){
   parent.document.getElementById("chinesePath").value = chinesePath;
}

//设置目录节点
function setClassifySubjectPath(id){
	ClassifyAction.getCategoryChineseNodePathByID(id,showSetClassifySubjectPath);	
}
function showSetClassifySubjectPath(chinesePath){
   parent.document.getElementById("chinesePath").value = chinesePath;
}

//**************************
//用于解决在Mozilla/Firefox下不支持innerText属性的方法。
if(!document.all){
HTMLElement.prototype.__defineGetter__
(
"innerText",
function ()
{
var anyString = "";

var childS = this.childNodes;
for(var i=0; i<childS.length; i++)
{
if(childS[i].nodeType==1)
anyString += childS[i].tagName=="BR" ? '\n' : childS[i].innerText;
else if(childS[i].nodeType==3)
anyString += childS[i].nodeValue;
}

return anyString;
}
);
}
