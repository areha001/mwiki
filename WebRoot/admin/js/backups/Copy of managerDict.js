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
	var DefaultLimitSize = 20;

	/******************************
	 *         定义表格组件         *
	 ******************************/


	//定义菜单选择项
	var toolbar = new Ext.Toolbar({
		width:'100%'
	});
	window.selected_id = "";
	window.selected_name = "";
	var uppanel = function(xid, xname)
	{ 
		var titleName = "修改";
		if(xid=="")
		{
			titleName = "添加";
		}
		var dictForm = new Ext.form.FormPanel({
						labelSeparator:':',								//分隔符
						fileUpload: true,
						enctype : "multipart/form-data",
						labelWidth:widthName? 90 : 65,                                 //标签宽度
						bodyStyle:'padding:0 0 0 0',					//表单边距
						frame:true,										//是否渲染表单
						height:200,
						items: [{
							autoHeight:false,
							layout:'column',
							border:false,
							items: [{
								columnWidth:1,
								layout:'form',
								defaults: {anchor: '95%'},
								items:[
								       new Ext.form.TextField({
								    	   hidden: false,
								    	   readOnly:false,
								    	   fieldLabel:window.typeName,
								    	   name:'name',
								    	   value:xname,
	    						    	   allowBlank:false,//  是否允许为空。数据库中可以为空的话 这二行可以去掉
	    						    	   blankText:'不能为空'
								       }),
								    	new Ext.form.Hidden({
								    		name:"id",
								    		value:xid
								    	}),
								    	new Ext.form.Hidden({
								    		name:"type",
								    		value: window.ctype
								    	})
								    	]
							}]
						}]
					});
					
			dictWindow = new Ext.Window({
					title: titleName,
					width: 400,
					height:120,
					layout: 'fit',
					plain:true,
					modal:true,
					draggable:true,
					resizable:false,
					closable:false,
					bodyStyle:'padding:5px;',
					buttonAlign:'center',
					items:  dictForm,
					buttons: [{
						text: '确定',
						handler:function(){
							dictForm.form.submit({
							clientValidation:true,
							waitMsg:'正在提交表单,请稍后...',
							waitTitle:'提示',
							url:"dict.do?method=manageDict",   
							success:function(form,action){
							var failed = Ext.decode(action.response.responseText).failed;
							if(failed == "")
								window.Ext.Msg.alert("提示",titleName+"成功！");
							else
								window.Ext.Msg.alert("提示", failed);
								
							dictWindow.destroy();
							store.reload();
						},
						failure:function(form,action){
							window.Ext.Msg.alert("提示",titleName+"失败！"+action.result.info);
						}
						});   
					}
					},
					{
						text: '取消',
						handler:function(){
						//关闭面板
							dictWindow.destroy();
						}
					}]
				});
				dictWindow.show();
				return dictWindow;
	}
	var change_status = function(status)
	{
		var records = grid.getSelectionModel().getSelections();
		if(records == ""){
			Ext.MessageBox.alert("提示","请选择记录后再进行删除操作!");
			return ;
		}
		var arrId = new Array();
		for(var i=0;i<records.length;i++){
			arrId.push(records[i].id);
		}
		Ext.Ajax.request({
			url: 'dict.do?method=statusDict&status=' + status, //根据id删除节点
			params:{'id':arrId},            
			method: 'post', 
			success: function(request) {
				store.reload();
				Ext.MessageBox.alert("提示","操作成功!");
				return false;
			},
			failure: function() {
				throw new Error("操作失败");
			}
		});
	}
	toolbar.add(
			new Ext.Button({
				text:'添加',
				iconCls:'addButton',
			    handler:function(){
			    	uppanel("","");
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

				function callback(id,msg){
					if(id=="yes"){
						Ext.Ajax.request({
							url: 'dict.do?method=statusDict', //根据id删除节点
							params:{'id':arrId},            
							method: 'post', 
							success: function(request) {
								store.reload();
								
								var obj=Ext.decode(request.responseText)
								if(obj.failed=="")
									Ext.MessageBox.alert("提示","删除记录成功!");
								else
									Ext.MessageBox.alert("提示","因为有关联数据，" + obj.failed + "无法删除");
									
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
			'-',
			new Ext.Button({
				text:'禁用',
				iconCls:'runButton',
				handler:function(){
					change_status(-1);
				}
			}),
			new Ext.Button({
				text:'启用',
				iconCls:'backButton',
				handler:function(){
					change_status(0);
				}
			}),
			'-',
			//修改学生 信息...........................................
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
			    uppanel(id,name);
				}
			})
	);

	if(backButton)
	{
		toolbar.add('-',
			new Ext.Button({
				text:'返回',
				iconCls:'backButton',
				handler:function(){
					history.back(-1)
				}
			})
		
		)
	}
	store = new Ext.data.Store({
		reader:new Ext.data.JsonReader({
			root:"items",
			totalProperty:"results",
			fields:[
			        {name:"id"},//流水id 不须更改
			        {name:"name"},
			        {name:"status"}
			        ]
		}),
		proxy:new Ext.data.HttpProxy({
			//.getElementById("clazzid").value表示获取的是managerStudent.jsp页面的<input type="text" id="clazzid" value="${clazzid}" />中的id的值			
			url:'dict.do?method=showDicts&type='+ctype  //访问路径
		})
	});

	var sm = new Ext.grid.CheckboxSelectionModel();         //定义选择模式
	var grid = new Ext.grid.GridPanel({
		title: (showTitle ? typeName+'管理' : '' ),
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
				var data = grid.store.getAt(rowIndex).data;
				window.selected_id = data.id;
				window.selected_name = data.name;
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
			pageSize:9999,  
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
		         {header:'名称',width:300,dataIndex:'name',sortabel:true},
		         {header:'状态',width:100,dataIndex:'status',sortabel:true, 
			         renderer:function(value, metadata,record){  
				            var status = record.data.status;
				           	if(status == 0)
				           		return "正常";
				           	if(status == -1)
				           		return "<span style='color:red;'>禁用</span>"
				           	else
				           		return "正常"
			         }
			     }
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
	store.load();
}
);