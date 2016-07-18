/**
 * @author Administrator
 */

Ext.onReady(function(){

	Ext.BLANK_IMAGE_URL = "../js/ext-3.3.1/resources/images/default/s.gif";
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget = "qtip";

	Ext.Msg.buttonText.yes = "确定";
	Ext.Msg.buttonText.ok = "确定";
	Ext.Msg.buttonText.cancel = "取消";
	Ext.Msg.buttonText.no = "取消";

	/******************************
	 *         定义表格组件         *
	 ******************************/


	//定义菜单选择项
	var toolbar = new Ext.Toolbar({
		width:'100%'
	});
	/*toolbar.add(new Ext.Button({
		text:'返回上级管理',
		iconCls:'backButton',
		handler:function(){
		window.history.back(-1);
	}
	})),*/

	var editionStoreData = new Ext.data.SimpleStore({
	   fields:['id','text'],
	   data:window.editionStoreData
    });
	var departNameStoreWithBlank = new Ext.data.Store({
		autoLoad:true,
		proxy:new Ext.data.HttpProxy({
			url:'gm.do?method=departJosn&withBlank=true'
		}),
		reader:new Ext.data.JsonReader({},['id','text'])
	});
	//192.168.8.93:8888/TempData
	var create_server_form = function(arr){
		if(arr==null){
			arr = [];
		}
		arr.push([
		 new Ext.form.TextField({
	  	   name:'subName',
	  	   fieldLabel:'服务器ID',
	  	   allowBlank:false,//数据库中可以为空的话 这二行可以去掉
	  	   emptyText:'请填写服务器ID',
	  	   blankText:'服务器ID不能为空'
	     }),
	     new Ext.form.TextField({
	  	   name:'name',
	  	   fieldLabel:'服务器名',
	  	   allowBlank:false,//数据库中可以为空的话 这二行可以去掉
	  	   emptyText:'请填写服务器名',
	  	   blankText:'服务器名不能为空'
	     }),
	     new Ext.form.TextField({
	  	   name:'clusterName',
	  	   fieldLabel:'集群标识',
	  	   allowBlank:false,//数据库中可以为空的话 这二行可以去掉
	  	   emptyText:'请填写服务器集群标识',
	  	   blankText:'服务器集群标识不能为空'
	     }),
	     new Ext.form.TextField({
	  	   name:'groupType',
	  	   fieldLabel:'分组',
	  	   allowBlank:false,//数据库中可以为空的话 这二行可以去掉
	  	   emptyText:'请填写服务器分组',
	  	   blankText:'服务器分组不能为空'
	     }),
	     new Ext.form.TextField({
	  	   name:'groupName',
	  	   fieldLabel:'节点名',
	  	   allowBlank:false,//数据库中可以为空的话 这二行可以去掉
	  	   emptyText:'请填写节点名',
	  	   blankText:'节点名不能为空',
	  	   readOnly:true,
	  	   value:'GAME',
	     }),
	     new Ext.form.TextField({
	  	   name:'innerAddr',
	  	   fieldLabel:'内网通信地址',
	  	   allowBlank:false,//数据库中可以为空的话 这二行可以去掉
	  	   emptyText:'192.168.0.2:8000',
	  	   blankText:'内网通信地址不能为空'
	     }),
	     new Ext.form.TextField({
	  	   name:'outAddr',
	  	   fieldLabel:'外网通信地址',
	  	   allowBlank:false,//数据库中可以为空的话 这二行可以去掉
	  	   emptyText:'192.168.0.2:8000',
	  	   blankText:'外网通信地址不能为空'
	     }),
	     new Ext.form.ComboBox({
	  	   hiddenName:'status',
	  	   store:new Ext.data.SimpleStore({
	  		   fields:['id', 'name'],
	  		   data:[[0,'正常'],[1,'关闭'],[2,'维护'],[3,'测试']]
	  	   }),
	  	   triggerAction:'all',
	  	   fieldLabel:'状态',
	  	   valueField:'id',
	  	   displayField:'name',
	  	   editable:false,
	  	   mode:'local',
	  	   forceSelection:true,
	  	   value:0,
	  	   allowBlank:true,
	  	   blankText:'请选择状态'
	     })
		 ]);
		return arr};
	toolbar.add(
			new Ext.Button({
				text:'添加',
				iconCls:'addButton',
				handler:function(){
				//添加
				var dataform = new Ext.form.FormPanel({
					labelSeparator:':',
					labelWidth:80,
					bodyStyle:'padding:0 0 0 0',
					frame:true,
					items:[{
						autoHeight:true,
						layout:'column',
						border:false,
						items: [{
							columnWidth:1,
							layout:'form',
							defaults: {anchor: '95%'},
							items:create_server_form()
						}]
					}]
				});

				var windowpanel = new Ext.Window({
					title: '新增服务器',
					width: 500,
					height:300,
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
						if(!dataform.form.isValid()){
							top.Ext.Msg.alert('提示','提交失败，请确定表单填写已正确。');
							return false;
						}	
						dataform.form.submit({
							clientValidation:true,
							waitMsg:'正在添加信息,请稍后...',
							waitTitle:'提示',
							url:"serverManager.do?method=add" ,
							// <-这里输入添加教师信息的servlet地址。   return null out.print({"success":false});
							success:function(form,action){
							windowpanel.destroy();
							store.reload();
							window.Ext.Msg.alert("提示","添加成功！");
							return false;
						},
						failure:function(form,action){
							window.Ext.Msg.alert("提示","添加失败！"+action.result.info);
						}
						})   ;
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
			}//function结尾处
			}),
			new Ext.Button({
				text:'删除',
				iconCls:'deleteButton',
				handler:function(){
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
							url: 'serverManager.do?method=delete', //根据id删除节点
							params:{'ids':arrId},            
							method: 'post', 
							success: function(request) {
								store.reload();
								var obj = Ext.decode(request.responseText);
								if(obj.success)
									Ext.MessageBox.alert("提示","删除记录成功!");
								else{
									Ext.MessageBox.alert("提示","删除记录失败");
								}
								return false;
							},
							failure: function() {
								throw new Error("删除记录失败");
							}
						});
					}
				}
			}
			}),
			//修改信息...........................................
			new Ext.Button({
				text:'修改',
				iconCls:'editButton',
				id:'edit',
				disabled:true,
				handler:function(){  
				var dataform = new Ext.form.FormPanel({
					labelSeparator:':',								//分隔符
					labelWidth:90,                                 //标签宽度
					bodyStyle:'padding:0 0 0 0',					//表单边距
					frame:true,										//是否渲染表单
					items:[{
						autoHeight:true,
						layout:'column',
						border:false,
						items: [{
							columnWidth:1,
							layout:'form',
							defaults: {anchor: '95%'},
							items: create_server_form([
							       new Ext.form.TextField({
							    	   name:'id',
							    	   hidden: true,
							    	   fieldLabel:'',
							    	   allowBlank:false,
							    	   blankText:''
							       })])
						}]}]
				});

				var windowpanel = new Ext.Window({
					title: '修改服务器信息',
					width: 500,
					height:300,
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
							waitMsg:'正在修改信息,请稍后...',
							waitTitle:'提示',
							url:"serverManager.do?method=update",   
							success:function(form,action){
							window.Ext.Msg.alert("提示","修改成功！");
							windowpanel.destroy();
							store.reload();
						},
						failure:function(form,action){
							window.Ext.Msg.alert("提示","修改失败！"+action.result.info);
						}
						})   ;
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
				var id = records[0].id;//在页面上选择的要修改的学生记录的ID,即request.get...("studentid") [0]表示第一条，即选中的该条记录
				windowpanel.show();	
				dataform.form.load({
					clientValidation:false,
					url:"serverManager.do?method=find",  
					params:{'id':id},//传参数 studentid
					waitMsg:'正在加载信息,请稍后...',
					waitTitle:'提示',
					success:function(form,action){
					},
					failure:function(form,action){
						window.Ext.Msg.alert("提示","数据加载失败！"+action.result.data);
						windowpanel.destroy();
					}
				});
			}
			}),
			new Ext.form.TextField({
	       		id:'groupName',
	    	   name:'groupName',
	    	   width:80,
	    	   emptyText:'节点名',
	    	   value:'GAME',
	    	   hidden:true,
	    	   allowBlank:true
	       }),
			'-',
			new Ext.form.TextField({
	       		id:'groupType',
	    	   name:'groupType',
	    	   width:80,
	    	   emptyText:'分组',
	    	   allowBlank:true
	       }),'-',
			new Ext.Button({
				text:'搜索',
				iconCls:'findButton',
				handler:function(){
				
				//alert('studentManager.do?method=searchStudentByName&studentName='+ studentName+ '&clazzid='+clazzid );
				//搜索按钮的点击事件    只要动态的设置 store 的代理就OK了，包括过滤，搜索关键字，按照媒体格式筛选，都可以使用这样的格式
				store.proxy = new Ext.data.HttpProxy({
					url:'serverManager.do?method=showList', //重新设置 grid 组件的数据代理地址
				});
				store.baseParams = {groupType:Ext.getCmp("groupType").getValue(),
					groupName:Ext.getCmp("groupName").getValue()}
				store.load({params:{start:0,limit:25}});
			}
			}),"-",
			new Ext.Button({
				text:'清空所有缓存',
				iconCls:'editButton',
				handler:function(){
					var servers = sm.getSelections();
                    if (servers.length != 1) {
                        Ext.MessageBox.alert("提示", "请选择一条服务器记录!");
                        return;
                    }
					Ext.Ajax.request({
						url:"gmEdit.do?method=clearCache",
                        params: {"serverId": servers[0].id},
						method:'post',
						waitMsg:'数据加载中，请稍后....',
						success:function(response,opts){
							var obj=Ext.decode(response.responseText);
							if(obj.success){
								Ext.MessageBox.alert("提示","操作成功");
							}
							else{
								Ext.MessageBox.alert("提示","操作失败，请换个服务器重试");
							}
						},
						failed:function(){
							Ext.MessageBox.alert("提示","操作失败");
						}
					})
			}
			}),"-",
			new Ext.Button({
				text:'清空配置缓存',
				iconCls:'editButton',
				handler:function(){
                    var servers = sm.getSelections();
                    if (servers.length != 1) {
                        Ext.MessageBox.alert("提示", "请选择一条服务器记录!");
                        return;
                    }
					Ext.Ajax.request({
						url:"gmEdit.do?method=clearCache&isConfig=isConfig",
                        params: {"serverId": servers[0].id},
						method:'post',
						waitMsg:'数据加载中，请稍后....',
						success:function(response,opts){
							var obj=Ext.decode(response.responseText);
							if(obj.success){
								Ext.MessageBox.alert("提示","操作成功");
							}
							else{
								Ext.MessageBox.alert("提示","操作失败，请换个服务器重试");
							}
						},
						failed:function(){
							Ext.MessageBox.alert("提示","操作失败");
						}
					})
			}
			})
	);

	store = new Ext.data.Store({
		reader:new Ext.data.JsonReader({
			root:"items",
			totalProperty:"results",
			fields:[
			        {name:"id"},//流水id 不须更改
			        {name:"name"},
			        {name:"innerAddr"},
			        {name:"outAddr"},
			        {name:"serverId"},
			        {name:"status"},
			        {name:"subName"},
			        {name:"groupName"},
			        {name:"clusterName"},
			        {name:"groupType"},
			        {name:"reportTime"},
			        {name:"connCount"},
			        {name:"createTime"}
			        ]
		}),
		proxy:new Ext.data.HttpProxy({
			//.getElementById("clazzid").value表示获取的是managerStudent.jsp页面的<input type="text" id="clazzid" value="${clazzid}" />中的id的值			
			url:'serverManager.do?method=showList&groupName=GAME'  //访问路径
		})
	});

	var sm = new Ext.grid.CheckboxSelectionModel();         //定义选择模式
	var grid = new Ext.grid.GridPanel({
		title:'服务器管理',
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
			if(sm.getCount() == 1)
			{
				btn.enable();
			}
			else
			{
				btn.disable();
			} 
			}
		},
		store:store,
		viewConfig: {columnsText:'显示列',sortAscText:'升序',sortDescText:'降序' },
		bbar:new Ext.PagingToolbar({
			pageSize:10,  
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
		         
			     {header:'服务器ID',width:130,dataIndex:'subName',sortable:true},
		         {header:'服务器名',width:100,dataIndex:'name',sortable:true},
			     {header:'所属分组',width:80,dataIndex:'groupType',sortable:true},
		         {header:'组内集群标识',width:100,dataIndex:'clusterName',sortable:true},
			     {header:'节点名',width:50,dataIndex:'groupName',sortable:true},
		         {header:'状态',width:50,dataIndex:'status',sortable:true,
		        	 renderer:function(value, metadata,record)
	        		 {
	        		 	if(value == 0){
	        		 		return "正常";
	        		 	}else if(value == 1){
	        		 		return "<font color='red'>关闭</font>";
	        		 	}else if(value == 2){
	        		 		return "<font color='red'>维护</font>";
	        		 	}else if(value == 3){
	        		 		return "<font color='red'>测试</font>";
	        		 	}
	        		 }},
		         {header:'内联地址',width:150,dataIndex:'innerAddr',sortable:true},
		         {header:'外联地址',width:150,dataIndex:'outAddr',sortable:true},
		         {header:'创建时间',width:120,dataIndex:'createTime',sortable:true,renderer:function(value){
		        	 if(value!=null){
		        	   return Ext.util.Format.date(new Date(value.time),'Y-m-d');
		        	 }else{
		        		 return "";
		        	 }
		        	 
		         }}
		        	
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
	}
	);
	store.load({params:{start:0,limit:25}});
}
);