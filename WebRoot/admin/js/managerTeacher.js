Ext.onReady(function(){

	Ext.BLANK_IMAGE_URL = "../js/ext-3.3.1/resources/images/default/s.gif";
	Ext.QuickTips.init();    //初始化信息提示
	Ext.form.Field.prototype.msgTarget = "qtip";//统一指定错误信息提示方式
	
	Ext.Msg.buttonText.yes = "确定";
	Ext.Msg.buttonText.ok = "确定";
	Ext.Msg.buttonText.cancel = "取消";
	Ext.Msg.buttonText.no = "取消";
	var DefaultLimitSize = 20;
    var getMySelect = function(){
		var records = grid.getSelectionModel().getSelections();
		if(records == ""){
			Ext.MessageBox.alert("提示","请选择记录后再进行操作!");
			return ;
		}
		var arrId = new Array();
		for(var i=0;i<records.length;i++){
			arrId.push(records[i].id);
		}
		return arrId;
	}
	//定义菜单选择项
	var toolbar = new Ext.Toolbar({
		width:'100%'
	});
	if(window.special == "role")
	{
		toolbar.add(
			new Ext.Button({
				iconCls:'editButton',
				id:'setAdminButton',
				text:'设置角色',
				handler:setAdmin_
		}));
		window.top.roleData = new Ext.data.Store({
	    	autoLoad:true,
			reader:new Ext.data.JsonReader({
				root:"items",
				totalProperty:"results",
				fields:[
				        {name:"id"},//流水id 不须更改
				        {name:"name"},
				        {name:"subRoles"}
				        ]
			}),
		proxy:new Ext.data.HttpProxy({
			url:'roleManager.do?method=showRoleAllList'  //访问路径
		})
	});
	}
	else
	{
		toolbar.add(
			new Ext.Button({
				text:'添加',
				iconCls:'addButton',
				handler:add
			}),
			new Ext.Button({
				text:'删除',
				iconCls:'deleteButton',
				handler:delete_
			}),
			new Ext.Button({
				text:'修改',
				iconCls:'editButton',
				id:'edit',
				disabled:true,
				handler:edit
			})
		);
	}
	
	var departNameStoreWithBlank = new Ext.data.Store({
		autoLoad:true,
		proxy:new Ext.data.HttpProxy({
			url:'gm.do?method=departJosn&withBlank=true'
		}),
		reader:new Ext.data.JsonReader({},['id','text'])
	});
	var departNameStore = new Ext.data.Store({
		autoLoad:true,
		proxy:new Ext.data.HttpProxy({
			url:'gm.do?method=departJosn'
		}),
		reader:new Ext.data.JsonReader({},['id','text'])
	});
	toolbar.add('-',
			new Ext.form.ComboBox({
	       		id:'deptid',
	    	   name:'deptid',
	    	   width:120,
	    	   emptyText:'所属合作方',
	    	   allowBlank:true,
	    	   mode:'local',
	    	   store:departNameStoreWithBlank, triggerAction:'all', displayField:'text', valueField:'id', editable: false
	       }),
			new Ext.form.TextField({
				labelSeparator:":",
				id:'teacherName',
				width:'130',
				maxLength:50
			}),
			new Ext.Button({
				text:'搜索',
				iconCls:'findButton',
				handler:search
			}))
	
	store = new Ext.data.Store({
		reader:new Ext.data.JsonReader({
			root:"items",
			totalProperty:"results",
			fields:[
			        {name:"id"},//流水Id 不须更改
			        {name:"loginName"},
			        {name:"realName"},
			        {name:"sex"},
			        {name:"birthday"},
			        {name:"teamAdmin"},
			        {name:"cnpath"},//此处对应的是该老师所授学科
			        {name:"departName"},
			        {name:"roleId"},
			        {name:"roleName"}
			        ]
		}),
		proxy:new Ext.data.HttpProxy({
			url:'gm.do?method=showTeacherInfo&deptid='+document.getElementById("deptid").value    //访问路径
		})
	});
	var sm = new Ext.grid.CheckboxSelectionModel();         //定义选择模式
	var grid = new Ext.grid.GridPanel({
		title: special?'用户授权管理':'用户基本信息',
		frame:true,
		stripeRows:true,
		tortable:true,
		loadMask: {msg:'正在加载数据，请稍候...'},
		tbar:[toolbar],
		sm:sm,
		listeners:
		{
			"rowclick": function(grid, rowIndex, e)
			{
			var btn = Ext.getCmp('edit'); 
			var setAdmin = Ext.getCmp('setAdminButton'); 
			if(sm.getCount() == 1)
			{
				if(btn)
				btn.enable();
				if(setAdmin)
				setAdmin.enable();
			}
			else
			{
				if(btn)
				btn.disable();
				if(setAdmin)
				setAdmin.disable();
			} 
			}
		},
		store:store,
		viewConfig: {columnsText:'显示列',sortAscText:'升序',sortDescText:'降序' },
		bbar:new Ext.PagingToolbar({
			pageSize:DefaultLimitSize,  
			store:store,
			beforePageText:"当前第",  
			afterPageText:"页，共{0}页",  
			lastText:"尾页",  
			nextText :"下一页",  
			prevText :"上一页",  
			firstText :"首页",  
			refreshText:"刷新页面",  
			displayInfo: true,  
			emptyMsg:'<span style="color:#414141;font-weight:bold;">当前没有任何数据</span>',
			displayMsg:"当前显示 {0} - {1}条, 共 {2}"
		}),
		columns:[//对应的列
		         sm,//对应ID
		         {header:'用户名 ',width:100,dataIdex:'loginName',sortabel:true},
		         {header:'姓名',width:100,dataIdex:'realName',sortabel:true},
		         {header:'合作方',width:150,dataIndex:'departName',sortabel:false},
		         {header:'角色',width:150,dataIndex:'roleName',sortabel:false}
		]
	});

	new Ext.Viewport({
		layout: 'border',
		items:[
		       {    //剧中的容器
		    	   title:"",
		    	   region:"center",
		    	   border:false,
		    	   layout:"fit",
		    	   bodyBorder:false,
		    	   items:[grid]
		       }
		       ]
	});
	store.load({params:{start:0,limit:DefaultLimitSize}});
	
	function add(){
		var dataform = new Ext.form.FormPanel({
			labelSeparator:':',								//分隔符
			labelWidth:70,                                 //标签宽度
			bodyStyle:'padding:0 0 0 0',					//表单边距
			frame:true,										//是否渲染表单
			height:'auto',
			//fileUpload :true,
			width:600,
			items:[{
				autoHeight:true,
				layout:'column',
				border:false,
				items: [{
					columnWidth:.5,
					layout:'form',
					defaults: {anchor: '95%'},
					items:[
						   new Ext.form.TextField({
							   name:'loginName',
							   width:150,
							   fieldLabel:'用户名',
							   allowBlank:false,//是否允许为空。数据库中可以为空的话 这二行可以去掉
							   emptyText:'请填写用户名',
							   blankText:'用户名不能为空'
						   }),
						   new Ext.form.TextField({
							   name:'realName',
							   width:150,
							   fieldLabel:'姓名',
							   allowBlank:false,
							   emptyText:'请填写真实姓名',
							   blankText:'真实姓名不能为空'
						   }),
						   new Ext.form.TextField({
							   name:'password',
							   width:150,
							   inputType:'password',
							   fieldLabel:'登陆密码',
							   allowBlank:false,
							   emptyText:'请填写密码',
							   blankText:'密码不能为空'
						   })
						   ]
				},
				{
					columnWidth:.5,
					layout:'form',
					defaults: {anchor: '95%'},
					items:[
						   new Ext.form.ComboBox({
						   		id:'com_7',
						   		width:115,
						   		fieldLabel:'合作方',
						   		hiddenName:'departId',
						   		triggerAction:'all',     //触法
						   		store:departNameStore,      //数据源
						   		displayField:'text',     //显示字段
						   		valueField:'id',     //值字段
						   		mode:'local',            //模式,本地 
						   		forceSelection:true,
						   		resizable:true,
						   		typeAhead:true,
						   		handleHeight:10,
						   		allowBlank:true,
						   		emptyText:'留空为所有合作方'   
					       }),
						   new Ext.form.TextField({
					    	   name:'email',
					    	   width:150,
					    	   fieldLabel:'地址',
					    	   allowBlank:true,
					    	   blankText:'请填写地址'
					       })
						   ]
						}]
					}]
				});
		var windowpanel = new Ext.Window({
					title: '添加用户',
					height:280,
					width:600,
					layout: 'fit',
					plain:true,
					draggable:false,
					resizable:false,
					closable:false,
					bodyStyle:'padding:5px;',
					modal:true,
					buttonAlign:'center',
					items: dataform,
					buttons: [{
						text: '确定',
						handler:function(){
						if(!dataform.form.isValid()){
							top.Ext.Msg.alert('提示','提交失败，请确定表单填写已正确。');
							return false;
						}	
					dataform.form.submit({
							clientValidation:true,
							waitMsg:'正在添加信息,请稍后...',
							waitTitle:'提示',
							url:"gm.do?method=addTeacher",   // <-这里输入添加教师信息的servlet地址。   return null out.print({"success":false});
							success:function(form,action){
								windowpanel.destroy();
								store.reload();
								window.Ext.Msg.alert("提示","添加成功！");
								return false;
							},
							failure:function(form,action){
								window.Ext.Msg.alert("提示","添加失败!"+action.result.info);
							}
					});
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
	function edit(){
		//修改一个老师
		var dataform = new Ext.form.FormPanel({
			labelSeparator:':',								//分隔符
			labelWidth:70,                                 //标签宽度
			bodyStyle:'padding:0 0 0 0',					//表单边距
			frame:true,										//是否渲染表单
			height:'auto',
			width:600,
			items:[{
				autoHeight:true,
				layout:'column',
				border:false,
				items: [{
					columnWidth:.5,
					layout:'form',
					defaults: {anchor: '95%'},
					items:[
					       new Ext.form.TextField({
					    	   name:'id',
					    	   hidden: true,
					    	   width:150,
					    	   fieldLabel:'',
					    	   allowBlank:false,
					    	   blankText:''
					       }),	
					       new Ext.form.TextField({
					    	   width:150,
					    	   hidden: false,
					    	   readOnly:true,
					    	   fieldLabel:'用户名',
					    	   name:'loginName',
					    	   allowBlank:false,//  是否允许为空。数据库中可以为空的话 这二行可以去掉
					    	   blankText:'请填写用户名'
					       }),							 
					      
					       new Ext.form.TextField({
					    	   name:'realName',
					    	   width:150,
					    	   fieldLabel:'姓名',
					    	   allowBlank:false,
					    	   blankText:'请填写姓名'
					       }),
					       new Ext.form.TextField({
					    	   name:'password',
					    	   width:150,
					    	   inputType:'password',
					    	   fieldLabel:'登陆密码',
					    	   allowBlank:false,
					    	   readOnly:true,
					    	   blankText:'请填写密码'
					       }),
						   new Ext.form.ComboBox({
						   		id:'com_7',
						   		width:115,
						   		fieldLabel:'合作方',
						   		hiddenName:'departId',
						   		triggerAction:'all',     //触法
						   		store:departNameStore,      //数据源
						   		displayField:'text',     //显示字段
						   		valueField:'id',     //值字段
						   		mode:'local',            //模式,本地 
						   		forceSelection:true,
						   		resizable:true,
						   		typeAhead:true,
						   		handleHeight:10,
						   		allowBlank:true,
						   		emptyText:'留空为不限'   
					       })
					   
					       ]
				},
				{
					columnWidth:.5,
					layout:'form',
					defaults: {anchor: '95%'},
					items:[
					       new Ext.form.TextField({
					    	   name:'email',
					    	   width:150,
					    	   fieldLabel:'地址',
					    	   allowBlank:true,
					    	   blankText:'请填写地址'
					       })
						 ]
							}]
						}]
					});
						var windowpanel = new Ext.Window({
							title: '修改用户信息',
							width: 600,
							height:280,
							layout: 'fit',
							plain:true,
							modal:true,
							draggable:true,
							resizable:false,
							closable:false,
							bodyStyle:'padding:5px;',
							buttonAlign:'center',
							items: dataform,
		
					buttons: [{
						text: '确定',
						handler:function(){
							dataform.form.submit({
								clientValidation:true,
								waitMsg:'正在用户信息,请稍后...',
								waitTitle:'提示',
								url:"gm.do?method=updateTeacherInfo",   
								success:function(form,action){
									debugger;
								window.Ext.Msg.alert("提示","修改成功！");
								windowpanel.destroy();
								store.reload();
							},
							failure:function(form,action){
								debugger;
								window.Ext.Msg.alert("提示","修改失败！" );
							}
						});
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
		
					//Ext.MessageBox.alert("提示","编辑操作!");
					var records = grid.getSelectionModel().getSelections();
					if(records == ""){
						Ext.MessageBox.alert("提示","请选择记录后再进行编辑操作!");
						return ;
					}
					if(records.length > 1)
					{
						Ext.MessageBox.alert("提示","一次只能对一条记录后再进行编辑操作!");
						return ;
					}
					var teacherid = records[0].id;//在页面上选择的要修改的老师记录的ID,即request.get...("teacherid") [0]表示第一条，即选中的该条记录
					windowpanel.show();	
					dataform.form.load({
					clientValidation:false,
					url:"gm.do?method=getTeacherInfoById",  
					params:{'teacherid':teacherid},//传参数 teacherid
					waitMsg:'正在加载信息,请稍后...',
					waitTitle:'提示',
					success:function(form,action){},
					failure:function(form,action){
						window.Ext.Msg.alert("提示","数据加载失败！"+action.result.data);
						windowpanel.destroy();
					}
				});

	};
	function search(){
		var teacherName = document.getElementById("teacherName").value;
		var deptid = Ext.getCmp('deptid').getValue();
		teacherName=encodeURIComponent(teacherName);
		store.proxy = new Ext.data.HttpProxy({
			url:'gm.do?method=showTeacherInfo&teacherName='+ teacherName + "&deptid=" + deptid
		});
		store.load({params:{start:0,limit:DefaultLimitSize}});
	};
	function delete_(){
		var records = grid.getSelectionModel().getSelections();
		if(records == ""){
			Ext.MessageBox.alert("提示","请选择记录后再进行删除操作!");
			return ;
		}
		var arrId = new Array();
		for(var i=0;i<records.length;i++){
			arrId.push(records[i].id);
		}

		Ext.Msg.show({
			title:'删除?',
			msg: '确定要删除选中记录吗,删除之后无法恢复?',
			buttons: Ext.Msg.YESNO,
			modal:true,
			fn:callback,
			icon: Ext.MessageBox.WARNING
		});

		function callback(id,msg){
			if(id=="yes"){
				Ext.Ajax.request({
					// arrId.toString() 得到列表中选中的记录 ID
					url: 'gm.do?method=deleteTeacherRows&teacherList='+arrId.toString(), //根据id删除节点
					success: function(request) {
					store.reload();
					Ext.MessageBox.alert("提示","删除记录成功!");
					return false;
				},
				failure: function() {
					throw new Error("删除记录失败");
				}
				});
			}
		}
	};

	function setAdmin_(){
		var ids = getMySelect();
		if(!ids)
			return ;
		var rInfo = store.getById(ids[0]).data;
		var getRoleInfo = function(rid){
			var now = window.top.roleData.getById(rid);
			var str = "";
			if(now!=null){

				var dt = window.top.roleData.getById(rid).data;
				var srs = dt.subRoles;
				var k = [];
				for(var i=0 ;i < srs.length; i++)
				{
					k.push(srs[i].name + " ");
				}
				str = k.join("，");
			}
			if(str == "")
				str = "无任何管理权限";
			return str;
		}
		var roleForm = new Ext.form.FormPanel({
			bodyStyle:'padding:0 0 0 0',					//表单边距
			style:"margin: 0 0 0 0 ",
			labelWidth:1,
			frame:true,			
			items: [
				new Ext.form.Hidden({value: ids.join(","), name: "userIds"}),
				new Ext.form.ComboBox(
				{
					name:'roleName',
					displayField:'name',
					valueField:'id',
					hiddenValue:'id',
					value:rInfo.roleId,
					width:280,
					store:window.top.roleData,
					editable: false,
					triggerAction:'all',
					mode:'local',
					listeners:{"select":function(){
					Ext.getCmp('srInfos').setText(getRoleInfo(this.value))}}
				}
				), 
				new Ext.form.Label({
					id:'srInfos',
					text: function(){return getRoleInfo(rInfo.roleId)}(),
					width:280,
					style:"display:block;padding:5px;"
				})
				]
		});
		var roleWindow = new Ext.Window({
				title: "分配权限 ",
				width: 330,
				height:180,							//是否渲染表单
				layout: 'fit',
				plain:true,
				modal:true,
				draggable:true,
				resizable:false,
				closable:false,
				bodyStyle:'padding:5px;',
				buttonAlign:'center',
				items:roleForm,
				buttons: [{
					text: '确定',
					handler:function(){
						roleForm.form.submit({
						clientValidation:true,
						waitMsg:'正在修改信息,请稍后...',
						waitTitle:'提示',
						url:"roleManager.do?method=setUserRole",   
						success:function(form,action){
						window.Ext.Msg.alert("提示","操作成功！");
						store.reload();
						roleWindow.destroy();
					},
					failure:function(form,action){
						window.Ext.Msg.alert("提示","操作失败！");
					}
					});   
				}
				},
				{
					text: '取消',
					handler:function(){
					//关闭面板
						roleWindow.destroy();
					}
				}]
			});
			roleWindow.show();
		
	};
	
	
});