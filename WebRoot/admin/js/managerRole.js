/**
 * @author Administrator
 */
Ext.onReady(function(){


	
	Ext.BLANK_IMAGE_URL = "../js/ext-3.3.1/resources/images/default/s.gif";
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget = "qtip";

	Ext.Msg.buttonText.yes = "确定";
	Ext.Msg.buttonText.ok = "确定";
	Ext.Msg.buttonText.no = "取消";
	var DefaultLimitSize = 20;
	/******************************
	 *         定义表格组件         *
	 ******************************/

	var store = new Ext.data.Store({
		proxy:new Ext.data.HttpProxy({
			url:'roleManager.do?method=showRoleList' + (EXTRA_MODE? '&x=1' : '')
		}),
		reader:new Ext.data.JsonReader({
			root:"items",
			fields:[
			        {name:"id"},//流水id 不须更改
			        {name:"name"},
			        {name:"description"},
			        {name:"subRoleIds"}
			        ]
        })
	});
	store.load();
	
	var subRoleStore = new Ext.data.Store({
		autoLoad:true,
		proxy:new Ext.data.HttpProxy({
			url:'roleManager.do?method=showSubRoleList'
		}),
		reader:new Ext.data.JsonReader({
			root:"items",
			fields:[
			        {name:"id"},//流水id 不须更改
			        {name:"description"},
			        
			        {name:"name"}
			        ]
        })
	});
	var chkboxItems = [];
	
	function uppanel(id,rname,srIds)
	{
		var chkboxItems = [];
		var itm = subRoleStore.data.items;
		var count = subRoleStore.getCount();
		for(var i=0; i < count ; i++)
		{
			var itm = subRoleStore.getAt(i).data;
			chkboxItems.push(
				new Ext.form.Checkbox({
		    	   hidden: false,
		    	   readOnly:false,
		    	   name:'subRoleIds',
		    	   inputValue:itm.id,
		    	   checked:srIds.indexOf(itm.id)>=0, 
		    	   boxLabel:itm.description
		       })
		    )
		}
		var roleForm = new Ext.form.FormPanel({
			bodyStyle:'padding:0 0 0 0',					//表单边距
			style:"margin: 0 0 0 0 ",
			labelWidth:30,
			frame:true,			
			items: [
			new Ext.form.TextField(
			{
				name:'roleName', 
				value:rname, 
				fieldLabel:'角色名',
				labelSeparator:'：',
				labelStyle:'width:50px;margin-left:30px;' ,
				style:'margin-bottom:10px;',
				maxLength:30,
				allowBlank:false,
				blankText:'请输入角色名'
			}
			), 
			new Ext.form.CheckboxGroup({
				items:chkboxItems,
				columns:2
			}), 
			new Ext.form.Hidden({name:'roleId', value:id})
			]
		});
		
		var roleWindow = new Ext.Window({
					title: "角色设置 ",
					width: 400,
					height:350,							//是否渲染表单
					layout: 'fit',
					plain:true,
					modal:true,
					draggable:true,
					resizable:false,
					closable:false,
					bodyStyle:'padding:5px;',
					buttonAlign:'center',
					items:  roleForm,
					buttons: [{
						text: '确定',
						handler:function(){
							roleForm.form.submit({
							clientValidation:true,
							waitMsg:'正在修改信息,请稍后...',
							waitTitle:'提示',
							url:"roleManager.do?method=roleSetting",   
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
	}
	
	var toolbar = new Ext.Toolbar({
		width:'100%'
	});
	toolbar.add(
			new Ext.Button({
				text:'添加',
				iconCls:'addButton',
			    handler:function(){
			    	uppanel("","",[]);
			    }
			
			}),
			'-',
			new Ext.Button({
				text:'修改',
				iconCls:'editButton',
				id:'edit',
				disabled:true,
				handler:function(){  
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
				var id = records[0].data.id;//在页面上选择的要修改的学生记录的ID,即request.get...("studentid") [0]表示第一条，即选中的该条记录
				var name = records[0].data.name;
				var srIds = records[0].data.subRoleIds;
			    uppanel(id,name, srIds);
				}
			}),
			'-',
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
					function callback(id){
						if(id=="yes")
						{
							Ext.Ajax.request({
								url: 'roleManager.do?method=deleteRole', //根据id删除节点
								params:{'ids':arrId},            
								method: 'post', 
								success: function(request) {
									var obj=Ext.decode(request.responseText)
									store.reload();
									var str = "删除记录成功!";
									if(obj.data!="")
										str = obj.data;
									Ext.MessageBox.alert("提示",str);
									return false;
								},
								failure: function() {
									throw new Error("删除记录失败");
								}
							});
						}
					}
				}
			})
	)
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

	var sm = new Ext.grid.CheckboxSelectionModel();         //定义选择模式
	var grid = new Ext.grid.GridPanel({
		title: '角色管理' ,
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
				if(btn)
				{
					if(sm.getCount() == 1)
						btn.enable();
					else
						btn.disable();
				}
			}
		},
		store:store,
		viewConfig: {columnsText:'显示列',sortAscText:'升序',sortDescText:'降序' },
		columns:[//对应的列
		         sm,//对应ID
		         {header:'角色名',width:150,dataIndex:'name',sortable:true},
		         {header:'描述',width:300,dataIndex:'description',sortable:true}
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
	
	
}
);