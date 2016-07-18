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
	var rtypeStore = new Ext.data.Store({
		autoLoad:true,
		proxy:new Ext.data.HttpProxy({
			url:'rtypeManager.do?method=rtypeJosn'
		}),
		reader:new Ext.data.JsonReader({},['id','text'])
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
				text:'上传',
				iconCls:'addButton',
			    handler:function(){
			    	var articleForm = new Ext.form.FormPanel({
						labelSeparator:':',								//分隔符
						fileUpload: true,
						enctype : "multipart/form-data",
						labelWidth:70,                                 //标签宽度
						bodyStyle:'padding:0 0 0 0',					//表单边距
						frame:true,										//是否渲染表单
						height:300,
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
								    	   fieldLabel:'标题',
								    	   name:'title',
	    						    	   allowBlank:false,//  是否允许为空。数据库中可以为空的话 这二行可以去掉
	    						    	   blankText:'请填写标题'
								       }),
								       new Ext.form.HtmlEditor({
								    	   height: 200,
								    	   hidden: false,
								    	   readOnly:false,
								    	   fieldLabel:'描述',
								    	   name:'body',
	    						    	   allowBlank:false//  是否允许为空。数据库中可以为空的话 这二行可以去掉
								       }),
								       new Ext.form.TextField({
								    	   hidden: false,
								    	   readOnly:false,
								    	   fieldLabel:'文件',
								    	   inputType: 'file',
								    	   name:'deptName',
	    						    	   allowBlank:false//  是否允许为空。数据库中可以为空的话 这二行可以去掉
								       }),
										   new Ext.form.ComboBox({
										   		id:'com_6',
										   		width:115,
										   		fieldLabel:'分类',
										   		hiddenName:'forumId',
										   		triggerAction:'all',     //触法
										   		store:rtypeStore,      //数据源
										   		displayField:'text',     //显示字段
										   		valueField:'id',     //值字段
										   		forceSelection:true,
										   		resizable:true,
										   		typeAhead:true,
										   	  allowBlank:false,
										   		emptyText:'请选择分类'   
									       }),
								    	new Ext.form.Hidden({
								    		name:"articleType",
								    		value:17
								    	})]
							}]
						}]
					});
			    	var uppanel = new Ext.Window({
						title: '上传研究参考资料',
						width: 600,
						layout: 'fit',
						plain:true,
						modal:true,
						draggable:true,
						resizable:false,
						closable:false,
						bodyStyle:'padding:5px;',
						buttonAlign:'center',
						items:articleForm  ,
						buttons: [{
							text: '确定',
							handler:function(){
								articleForm.form.submit({
								clientValidation:true,
								waitMsg:'正在修改信息,请稍后...',
								waitTitle:'提示',
								url:"reacherCreate.do",   
								success:function(form,action){
								window.Ext.Msg.alert("提示","新增资源成功！");
								uppanel.destroy();
								store.reload();
							},
							failure:function(form,action){
								window.Ext.Msg.alert("提示","新增资源失败！"+action.result.info);
							}
							})  ; 
						}
						},
						{
							text: '取消',
							handler:function(){
							//关闭面板
								uppanel.destroy();
						}
						}]
					});
			    	uppanel.show();
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
							url: 'reacherManager.do?method=delete', //根据id删除节点
							params:{'CheckDeptList':arrId},            
							method: 'post', 
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
			}
			}),
			//修改学生 信息...........................................
			new Ext.Button({
				text:'修改',
				iconCls:'editButton',
				id:'edit',
				disabled:true,
				handler:function(){  
				//修改一个学生
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
							       //登录名不可修改，显示设置不可编辑，表单中多加一个登录名是为修改后设置成功
							       new Ext.form.TextField({
							    	   hidden: false,
							    	   readOnly:false,
							    	   fieldLabel:'分类名称',
							    	   name:'title',
    						    	   allowBlank:false,//  是否允许为空。数据库中可以为空的话 这二行可以去掉
    						    	   blankText:'请填写分类名称'
							       }),
							       
							       new Ext.form.HtmlEditor({
							    	   height: 200,
							    	   hidden: false,
							    	   readOnly:false,
							    	   fieldLabel:'描述',
							    	   name:'descipe',
    						    	   allowBlank:false//  是否允许为空。数据库中可以为空的话 这二行可以去掉
							       }),
								   new Ext.form.ComboBox({
								   		fieldLabel:'分类',
								   		hiddenName:'typeId',
								   		triggerAction:'all',     //触法
								   		store:rtypeStore,      //数据源
								   		displayField:'text',     //显示字段
								   		valueField:'id',     //值字段
								   		forceSelection:true,
								   		resizable:true,
								   	   allowBlank:false,
								   		typeAhead:true,
								   		handleHeight:10,
								   		name:'typeId',
								   		emptyText:'请选择分类'   
							       })
							       ]
						}]
					}]
				});

				var windowpanel = new Ext.Window({
					title: '修改研究参考资料',
					width: 600,
					height:400,
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
							url:"reacherManager.do?method=update",   
							success:function(form,action){
							window.Ext.Msg.alert("提示","修改分类名称成功！");
							windowpanel.destroy();
							store.reload();
						},
						failure:function(form,action){
							window.Ext.Msg.alert("提示","修改分类名称失败！"+action.result.info);
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
				var id = records[0].id;//在页面上选择的要修改的学生记录的ID,即request.get...("studentid") [0]表示第一条，即选中的该条记录
				windowpanel.show();	
				dataform.form.load({
					clientValidation:false,
					url:"reacherManager.do?method=load",  
					params:{'id':id},//传参数 studentid
					waitMsg:'正在加载信息,请稍后...',
					waitTitle:'提示',
					success:function(form,action){},
					failure:function(form,action){
						window.Ext.Msg.alert("提示","数据加载失败！"+action.result.data);
						windowpanel.destroy();
					}
				});
			}
			}),
			
			'-',
			new Ext.Button({
				text:'分类管理',
				iconCls:'backButton',
				handler:function(){
					window.location.href='rtypeManager.do?method=getShowDeptListJson';
				}
			}),
			'-',
			new Ext.form.TextField({
				labelSeparator:":",
				id:'title',
				width:'130',
				maxLength:50
			}),
			new Ext.Button({
				text:'搜索',
				iconCls:'findButton',
				handler:function(){
				var name = document.getElementById("title").value;
				name=encodeURI(name);//解决了乱码。。
				
				//alert('studentManager.do?method=searchStudentByName&studentName='+ studentName+ '&clazzid='+clazzid );
				//搜索按钮的点击事件    只要动态的设置 store 的代理就OK了，包括过滤，搜索关键字，按照媒体格式筛选，都可以使用这样的格式
				store.proxy = new Ext.data.HttpProxy({
					url:'rtypeManager.do?method=searchDeptByName&title='+ name  //重新设置 grid 组件的数据代理地址
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
			        {name:"title"},
			        "typeName",
			        {name:"uploadDate"}
			        ]
		}),
		proxy:new Ext.data.HttpProxy({
			//.getElementById("clazzid").value表示获取的是managerStudent.jsp页面的<input type="text" id="clazzid" value="${clazzid}" />中的id的值			
			url:'reacherManager.do?method=showReacherList'  //访问路径
		})
	});

	var sm = new Ext.grid.CheckboxSelectionModel();         //定义选择模式
	var grid = new Ext.grid.GridPanel({
		title:'研究参考资料管理',
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
		         {header:'标题',width:200,dataIndex:'title',sortabel:true,
		         	renderer : function(value, metadata,record){  
			            var id = record.data.id;
			            var showPro = "<a target='_blank' href='../researchMain.do?method=oneArticle&articleId=" + id + "'>" + 
			            record.data.title + '</a>';
			            return showPro;
		            }
		         },
		         {header:'分类',width:200,dataIndex:'typeName',sortabel:true},
		         {header:'上传时间',width:200,dataIndex:'uploadDate',sortabel:true,renderer:function(value){return Ext.util.Format.date(new Date(value.time),"Y-m-d");}}
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