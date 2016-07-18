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

	toolbar.add(
			new Ext.Button({
				text:'添加',
				iconCls:'addButton',
				handler:function(){
				//添加一个学生
				var dataform = new Ext.form.FormPanel({
					labelSeparator:':',
					labelWidth:60,
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
							items:[
							       new Ext.form.TextField({
							    	   name:'name',
							    	   fieldLabel:'合作方名称',
							    	   allowBlank:false,//数据库中可以为空的话 这二行可以去掉
							    	   emptyText:'请填写合作方名称',
							    	   blankText:'合作方名称不能为空'
							       }),
							       new Ext.form.TextField({
							    	   name:'dcode',
							    	   fieldLabel:'合作方编码',
							    	   allowBlank:false,//数据库中可以为空的话 这二行可以去掉
							    	   emptyText:'请填写合作方编码',
							    	   blankText:'合作方编码不能为空'
							       }),
							       new Ext.form.ComboBox({
							    	   hiddenName:'status',
							    	   store:new Ext.data.SimpleStore({
							    		   fields:['id', 'name'],
							    		   data:[[0,'正常'],[1,'异常']]
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
							       ]
						}]
					}]
				});

				var windowpanel = new Ext.Window({
					title: '新增合作方',
					width: 300,
					height:200,
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
							url:"partnerManager.do?method=AddDept" ,
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
							url: 'partnerManager.do?method=extDeleteDeptRows', //根据id删除节点
							params:{'CheckDeptList':arrId},            
							method: 'post', 
							success: function(request) {
								store.reload();
								var obj = Ext.decode(request.responseText);
								if(obj.faileds == "")
									Ext.MessageBox.alert("提示","删除记录成功!");
								else
									Ext.MessageBox.alert("提示",obj.faileds + "中有配置GM，无法删除!");
									
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
			//修改学生 信息...........................................
			new Ext.Button({
				text:'修改',
				iconCls:'editButton',
				id:'edit',
				disabled:true,
				handler:function(){  
				var dataform = new Ext.form.FormPanel({
					labelSeparator:':',								//分隔符
					labelWidth:70,                                 //标签宽度
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
							items:[
							       new Ext.form.TextField({
							    	   name:'id',
							    	   hidden: true,
							    	   fieldLabel:'',
							    	   allowBlank:false,
							    	   blankText:''
							       }),
							       new Ext.form.TextField({
							    	   name:'name',
							    	   fieldLabel:'合作方名称',
							    	   allowBlank:false,//数据库中可以为空的话 这二行可以去掉
							    	   emptyText:'请填写合作方名称',
							    	   blankText:'合作方名称不能为空'
							       }),
							       new Ext.form.TextField({
							    	   name:'dcode',
							    	   fieldLabel:'合作方编码',
							    	   allowBlank:false,//数据库中可以为空的话 这二行可以去掉
							    	   emptyText:'请填写合作方编码',
							    	   blankText:'合作方编码不能为空'
							       }),
							       new Ext.form.ComboBox({
							    	   hiddenName:'status',
							    	   store:new Ext.data.SimpleStore({
							    		   fields:['id', 'name'],
							    		   data:[[0,'正常'],[1,'异常']]
							    	   }),
							    	   triggerAction:'all',
							    	   fieldLabel:'状态',
							    	   valueField:'id',
							    	   displayField:'name',
							    	   editable:false,
							    	   mode:'local',
							    	   forceSelection:true,
							    	   name:'status',
							    	   allowBlank:true,
							    	   blankText:'请选择状态'
							       })
							       ]
						}]
					}]
				});

				var windowpanel = new Ext.Window({
					title: '修改合作方信息',
					width: 300,
					height:200,
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
							url:"partnerManager.do?method=AddDept",   
							success:function(form,action){
							window.Ext.Msg.alert("提示","修改合作方名称成功！");
							windowpanel.destroy();
							store.reload();
						},
						failure:function(form,action){
							window.Ext.Msg.alert("提示","修改合作方名称失败！"+action.result.info);
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
					url:"partnerManager.do?method=getDeptById",  
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
			'-',
			new Ext.form.TextField({
				labelSeparator:":",
				id:'name',
				width:'130',
				maxLength:50
			}),
			new Ext.Button({
				text:'搜索',
				iconCls:'findButton',
				handler:function(){
				var name = document.getElementById("name").value;
				name=encodeURI(name);//解决了乱码。。
				
				//alert('studentManager.do?method=searchStudentByName&studentName='+ studentName+ '&clazzid='+clazzid );
				//搜索按钮的点击事件    只要动态的设置 store 的代理就OK了，包括过滤，搜索关键字，按照媒体格式筛选，都可以使用这样的格式
				store.proxy = new Ext.data.HttpProxy({
					url:'partnerManager.do?method=searchDeptByName&name='+ name  //重新设置 grid 组件的数据代理地址
				});
				store.load({params:{start:0,limit:25}});
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
			        {name:"dcode"},
			        {name:"createDate"},
			        {name:"status"},
			        {name:"edition"}
			        ]
		}),
		proxy:new Ext.data.HttpProxy({
			//.getElementById("clazzid").value表示获取的是managerStudent.jsp页面的<input type="text" id="clazzid" value="${clazzid}" />中的id的值			
			url:'partnerManager.do?method=showDeptList'  //访问路径
		})
	});

	var sm = new Ext.grid.CheckboxSelectionModel();         //定义选择模式
	var grid = new Ext.grid.GridPanel({
		title:'合作方管理',
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
			pageSize:25,  
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
		         {header:'合作方名称',width:200,dataIndex:'name',sortabel:true},
		         {header:'合作方编码',width:200,dataIndex:'dcode',sortabel:true},
		         {header:'创建时间',width:200,dataIndex:'createDate',sortabel:true,renderer:function(value){
		        	 if(value!=null){
		        	   return Ext.util.Format.date(new Date(value.time),'Y-m-d');
		        	 }else{
		        		 return "";
		        	 }
		        	 
		         }},
		         {header:'状态',width:200,dataIndex:'status',sortabel:true,
		        	 renderer:function(value, metadata,record)
	        		 {
		        		 return record.data.status == 0?"正常":"<font color='red'>禁用</font>";
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