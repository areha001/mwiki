/*
 * des:        管理主界面
 */
 
Ext.onReady(function(){
	
	Ext.BLANK_IMAGE_URL = "../js/ext-3.3.1/resources/images/default/s.gif";
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget = "side";
	
	Ext.Msg.buttonText.yes = "确定";
	Ext.Msg.buttonText.ok = "确定";
	Ext.Msg.buttonText.cancel = "取消";
	Ext.Msg.buttonText.no = "取消";
	
	/**************************************
	 *              定义树节点             *
	 **************************************/
	//定义根节点
/*	var root = new Ext.tree.TreeNode({
		text:'根节点',
		url:'#',
		expanded:true //设置默认展开
	});
	var teachermanager = new Ext.tree.TreeNode({
		text:'教师管理',
		url:'gm.do?method=getShowTeacherInfoJson'
	});
	var classmanager = new Ext.tree.TreeNode({
		text:'班级管理',
		url:'clazzManager.do?method=getShowClazzListJson'
	});

	var deptmanager = new Ext.tree.TreeNode({
		text:'部门管理',
		url:'deptManager.do?method=getShowDeptListJson'
	});*/
	/*var coursesmanager = new Ext.tree.TreeNode({
		text:'班级课程管理',
		url:''
	});
	
	//添加子节点至根节点
	root.appendChild(teachermanager);
	root.appendChild(classmanager);
	root.appendChild(deptmanager);
	*/
	
	
	//以下两行有用不要删掉
	//root.appendChild(kcmanager);
	//root.appendChild(cumanager);
	//root.appendChild(studentsmanager);

	/***************************************
	 *  左侧的树组件,包括了增加,修改,删除事件  *
	 ***************************************/
	var tree = new Ext.tree.TreePanel({    //创建树形面版
		autoScroll : true,
		rootVisible:false,					//不显示根节点
        animate : true,
        enableDD : true,
        containerScroll : true,
		border: false,
		width:"100%",
		listeners: {
            click: function(n) {		//树节点单击事件
            	//得到点击节点的ID和TEXT
            	//var __nodeId__ = n.attributes.id;
            	var url = n.attributes.url;	//获取当前节点对应的URL地址
            	document.getElementById("ifr").src = url; 
            }
        },
		root:root
	})
    var root = new Ext.tree.AsyncTreeNode({
        expanded: true,
        children: childrenJson
    });

	//渲染面板
	new Ext.Viewport({
		layout: 'border',     //表格布局
		items:[
				{
                region: 'west',
                collapsible: true,
                title: '功能导航',
                xtype: 'treepanel',
                width: 200,
                autoScroll: true,
                loader: new Ext.tree.TreeLoader(),
                root: root,
                rootVisible: false,
                listeners: {
                    click: function (x)
                    {
                        if (x.attributes.href != 'javascript:;') document.getElementById('main').src = x.attributes.href
                    }
                }
            },
				{    //剧中的容器
					title:"",
					region:"center",
					border:false,
					bodyBorder:false,
					margins:'0 0px 5px 5px',
					html:'<iframe id="main" name="main" width="100%" height="100%" frameborder="0" src="'+ FIRST_PAGE_URL + '"></iframe>'
						
					
						
				},
				{    //顶部容器
					xtype:"container",
					autoEl:"div",
					region:"north",
					height:31,
					html:"<div id='logo' style='background-color:#454545;width=100%;display:block;height:30px;'><div style='float:left;'><h1 style='padding:8px 0 0 20px;font-size:18px;color:#ffffff;font-weight:bold;font-family:\"幼圆\";'>系统管理后台</h1></div>" +
							"<div style='float:right;margin:10px 10px 0 0;'>" +
							"<span style='font-size:12px;color:#ffffff;margin:0 15px 0 0;'>欢迎您，"+document.getElementById("realName").value+"</span>" +
							(isSuperAdmin ? "<a href='#' id='changePass' style='font-size:12px;color:#ffffff;margin:0 15px 0 0;'>修改密码</a>" : "" )+
							"<a href= './adminLogin.do?method=exit' style='font-size:12px;color:#ffffff;'>注销</a></div></<br style='clear:both;' /><div>"
				}
			]
	})
	
	if(document.getElementById("changePass") !=null)
	{
	//管理员密码修改
	document.getElementById("changePass").onclick = function(){
		var dataform = new Ext.form.FormPanel({
			labelSeparator:':',
			labelWidth:70,
			bodyStyle:'padding:0 0 0 0',
			frame:true,
			height:'auto',
			width:300,
			items:[
			       new Ext.form.TextField({
			    	   name:'oldpass',
			    	   id:'oldpass',
			    	   inputType:'password',
			    	   width:200,
			    	   fieldLabel:'原密码',
			    	   allowBlank:false,
			    	   blankText:'请输入原密码'
			       }),
			       new Ext.form.TextField({
			    	   name:'newpass',
			    	   id:'newpass',
			    	   inputType:'password',
			    	   width:200,
			    	   fieldLabel:'新密码',
			    	   allowBlank:false,
			    	   blankText:'请输入新密码'
			       }),
			       new Ext.form.TextField({
			    	   name:'confirmNewPassword',
			    	   id:'confirmNewPassword',
			    	   inputType:'password',
			    	   width:200,
			    	   fieldLabel:'确认密码',
			    	   allowBlank:false,
			    	   blankText:'请输入确认密码'
			       })
			   ]
		});

		var windowpanel = new Ext.Window({
			title: '修改密码',
			width: 350,
			height:180,
			layout: 'fit',
			plain:true,
			draggable:false,
			resizable:false,
			closable:false,
			modal:true,//屏蔽背景页面的操作
			bodyStyle:'padding:5px;',
			buttonAlign:'center',
			items: dataform,
			buttons: [{
				text: '确定',
				handler:function(){
					//这里加入判断，是否新密码和确认密码相等。
					var pass1,pass2 = null;
					pass1 = Ext.getCmp("newpass").getValue();//获取新密码的值
					pass2 = Ext.getCmp("confirmNewPassword").getValue();//获取确认密码的值
					//对新密码和确认密码进行比对，判断是否相等
					if(pass1!=pass2){
						Ext.MessageBox.alert("提示","两次密码输入不一致!");
						return false;
					}
					dataform.form.submit({
						clientValidation:true,
						waitMsg:'正在请求修改密码,请稍后...',
						waitTitle:'提示',
						url:"updateAdminPassword.do?method=updateAdminPassword",   // <-这里输入添加教师信息的servlet地址。   return null out.print({"success":false});
						success:function(form,action){
							windowpanel.destroy();
							window.Ext.Msg.alert("提示","修改密码成功！");
							return false;
						},
						failure:function(form,action){
							window.Ext.Msg.alert("提示","修改密码失败！"+action.result.info);
							//window.Ext.Msg.alert("提示","修改密码失败!");
						}
					}
					)
			}
			},
			{
				text: '取消',
				handler:function(){
				//关闭面板
				windowpanel.destroy();
			}
			}]
		});
		windowpanel.show();
	}
	
	}
	
	
})