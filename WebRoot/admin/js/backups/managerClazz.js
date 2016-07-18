/**
 * @author Administrator
 */

Ext.onReady(function(){

	Ext.BLANK_IMAGE_URL = "../js/ext-3.3.1/resources/images/default/s.gif";
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget = "side";

	Ext.Msg.buttonText.yes = "确定";
	Ext.Msg.buttonText.ok = "确定";
	Ext.Msg.buttonText.cancel = "取消";
	Ext.Msg.buttonText.no = "取消";
	DefaultLimitSize = 20;

	//定义菜单选择项
	var toolbar = new Ext.Toolbar({
		width:'100%'
	});
	var classes = [];
		classes[0] = [[1,'1年级'],[2,'2年级'],[3,'3年级'],[4,'4年级'],[5,'5年级'],[6,'6年级']];
		classes[1] = [[7,'1年级'],[8,'2年级'],[9,'3年级']];
		classes[2] = [[10,'1年级'],[11,'2年级'],[12,'3年级']];

	var classData = new Ext.data.SimpleStore({
	   fields:['value','text'],
	   data:[]
    });
    studyYearData = new Ext.data.Store({
    	autoLoad:true,
		reader:new Ext.data.JsonReader({
			root:"items",
			totalProperty:"results",
			fields:[
			        {name:"id"},//流水id 不须更改
			        {name:"name"}
			        ]
		}),
		proxy:new Ext.data.HttpProxy({
			url:'studyYear.do?method=studyYearList'  //访问路径
		}),
		listeners:{load:function(){ 
				var sycombox = Ext.getCmp("sStudyYear");
				if(sycombox)
				sycombox.setValue(STUDY_YEAR_ID);
			}}
	});
	toolbar.add(
			new Ext.Button({
				text:'添加',
				iconCls:'addButton',
				handler:function(){  
				//添加一个班级
				var dataform = new Ext.form.FormPanel({
					labelSeparator:':',
					labelWidth:70,
					bodyStyle:'padding:0 0 0 0',
					frame:true,
					height:'auto',
					width:300,
					items:[
					       new Ext.form.TextField({
					    	   name:'clazzName',
					    	   width:200,
					    	   fieldLabel:'班级名称',
					    	   allowBlank:false,//数据库中可以为空的话 这二行可以去掉
					    	
					    	   emptyText:'请填写班级名称',
					    	   blankText:'班级名称不能为空'
					       }),
					       new Ext.form.ComboBox({
					    	   name:'edutype',
					    	   width:200,
					    	   fieldLabel:'所属学段',
					    	   allowBlank:false,
					    	   mode:'local',
					    	   emptyText:'请填写所属学段',
					    	   blankText:'学段不能为空',
					    	   hiddenName:'edutype',
					    	   store:new Ext.data.SimpleStore({
					    		   fields:['value','text'],
					    		   data:[[1,'小学'],[2,'初中'],[3,'高中']]
					    	   }), triggerAction:'all', displayField:'text', valueField:'value', editable: false,
					    	   listeners:{select:function(combo,record,index){classData.clearData();classData.loadData(classes[index]);}}
					       }),

					       new Ext.form.ComboBox({
					    	   name:'grade',
					    	   mode:'local',
					    	   width:200,
					    	   fieldLabel:'所属年级',
					    	   allowBlank:false,
					    	   emptyText:'请选择年级',
					    	   hiddenName:'grade',
					    	   store:classData, triggerAction:'all', displayField:'text', valueField:'value', editable: false
					       }),

					       new Ext.form.ComboBox({
					       	   id:'sStudyYear',
					    	   name:'studyYear',
					    	   mode:'local',
					    	   width:200,
					    	   fieldLabel:'所属学年',
					    	   allowBlank:false,
					    	   emptyText:'请选择学年',
					    	   hiddenName:'studyYear',
					    	   value:STUDY_YEAR_ID,
					    	   store:studyYearData, triggerAction:'all', displayField:'name', valueField:'id', editable: false
					       }),
					       //stateStore
					       new Ext.form.ComboBox({
					    	   hiddenName:'state',
					    	   store:new Ext.data.SimpleStore({
					    		   fields:['id', 'name'],
					    		   data:[[1,'启用'],[0,'禁用']]

					    	   }),
					    	   triggerAction:'all',
					    	   width:200,
					    	   fieldLabel:'状态',
					    	   valueField:'id',
					    	   displayField:'name',
					    	   editable:false,
					    	   mode:'local',
					    	   forceSelection:true,
					    	   value:1,
					    	   allowBlank:false,
					    	   blankText:'请填写状态'
					       })

					       ]
				});

				var windowpanel = new Ext.Window({
					title: '添加班级',
					width: 350,
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
							url:"clazzManager.do?method=extAddClazz",   // <-这里输入添加教师信息的servlet地址。   return null out.print({"success":false});
							success:function(form,action){
							windowpanel.destroy();
							store.reload();
							window.Ext.Msg.alert("提示","添加新班级成功！");
							return false;
						},
						failure:function(form,action){
							//window.Ext.Msg.alert("提示","添加新班级失败！");
							window.Ext.Msg.alert("提示","添加新班级失败!"+action.result.info);
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
			}),


			//修改班级信息...........................................
			new Ext.Button({
				text:'修改',
				iconCls:'editButton',
				id:'edit',
				disabled:true,
				handler:function(){  
				//修改一个班级
					
				var dataform = new Ext.form.FormPanel({
					labelSeparator:':',
					labelWidth:70,
					bodyStyle:'padding:0 0 0 0',
					frame:true,
					height:'auto',
					width:300,
					items:[
					       new Ext.form.TextField({
					    	   name:'id',
					    	   hidden: true,
					    	   width:200,
					    	   fieldLabel:'',
					    	   allowBlank:false,
					    	   blankText:''
					       }),
					       new Ext.form.TextField({
					    	   name:'clazzName',
					    	   width:200,
					    	   fieldLabel:'班级名称',
					    	   allowBlank:false,//数据库中可以为空的话 这二行可以去掉
					    	
					    	   emptyText:'请填写班级名称',
					    	   blankText:'班级名称不能为空'
					       }),
					       edutype = new Ext.form.ComboBox({
					    	   name:'edutype',
					    	   width:200,
					    	   fieldLabel:'所属学段',
					    	   allowBlank:false,
					    	   mode:'local',
					    	   emptyText:'请填写所属学段',
					    	   blankText:'学段不能为空',
					    	   hiddenName:'edutype',
					    	   store:new Ext.data.SimpleStore({
					    		   fields:['value','text'],
					    		   data:[[1,'小学'],[2,'初中'],[3,'高中']]
					    	   }), triggerAction:'all', displayField:'text', valueField:'value', editable: false,
					    	   listeners:{select:function(combo,record,index){classData.clearData();classData.loadData(classes[index]);}}
					       }),

					       grade = new Ext.form.ComboBox({
					    	   name:'grade',
					    	   mode:'local',
					    	   width:200,
					    	   fieldLabel:'所属年级',
					    	   allowBlank:false,
					    	   emptyText:'请选择年级',
					    	   hiddenName:'grade',
					    	   store:classData, triggerAction:'all', displayField:'text', valueField:'value', editable: false
					       }),

					       new Ext.form.ComboBox({
					    	   name:'studyYear',
					    	   mode:'local',
					    	   width:200,
					    	   fieldLabel:'所属学年',
					    	   allowBlank:false,
					    	   emptyText:'请选择学年',
					    	   hiddenName:'studyYear',
					    	   value:STUDY_YEAR_ID,
					    	   store:studyYearData, triggerAction:'all', displayField:'name', valueField:'id', editable: false
					       }),
					       //stateStore
					       new Ext.form.ComboBox({
					    	   hiddenName:'state',
					    	   store:new Ext.data.SimpleStore({
					    		   fields:['id', 'name'],
					    		   data:[[1,'启用'],[0,'禁用']]

					    	   }),
					    	   triggerAction:'all',
					    	   width:200,
					    	   fieldLabel:'状态',
					    	   valueField:'id',
					    	   displayField:'name',
					    	   editable:false,
					    	   mode:'local',
					    	   forceSelection:true,
					    	   value:1,
					    	   allowBlank:false,
					    	   blankText:'请填写状态'
					       })
					       ]
				}
				);


				var windowpanel = new Ext.Window({
					title: '修改班级信息',
					width: 350,
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
							url:"clazzManager.do?method=updateClazzInfo",   
							success:function(form,action){
							window.Ext.Msg.alert("提示","修改班级信息成功！");
							windowpanel.destroy();
							store.reload();
						},
						failure:function(form,action){
							window.Ext.Msg.alert("提示","修改班级信息失败！"+action.result.info);
						}
						}
						);   
					}
					},
					{
						text: '取消',
						handler:function(){
						//关闭面板
						windowpanel.destroy();
					}
					}
					]
				}
				);

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
				var clazzid = records[0].id;
				windowpanel.show();	
				dataform.form.load({
					clientValidation:false,
					url:"clazzManager.do?method=getClazzInfoById",   
					params:{'clazzid':clazzid},
					waitMsg:'正在加载信息,请稍后...',
					waitTitle:'提示',
					success:function(form,action){
						//debugger;
						classData.clearData();
						classData.loadData(classes[parseInt(action.result.data.edutype)-1]);
						form.findField("grade").setValue(action.result.data.grade);
					},
					failure:function(form,action){
						window.Ext.Msg.alert("提示","数据加载失败！"+action.result.data);
						windowpanel.destroy();
					}
				}
				);
			}
			}
			),

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
				Ext.MessageBox.confirm('确认删除', '删除班级将无法恢复，并且丢失其统计信息，你真的要删除这些班级吗?', function(btn) { 
					if(btn == 'yes'){
						Ext.Ajax.request({
							url: 'clazzManager.do?method=extEnableDisableClazzRows', //根据id删除节点
							//
							params:{'CheckList':arrId},            
							method: 'post', 
							//
							success: function(request) {
								store.reload();
								var obj = Ext.decode(request.responseText);
								if(obj.failedClazz == "")
									Ext.MessageBox.alert("提示","修改启禁状态成功!");
								else
									Ext.MessageBox.alert("提示", obj.failedClazz + "因为有学生不能删除!");
									
							},
							failure: function() {
								Ext.MessageBox.alert("提示","修改启禁状态失败!");
							}
						}
						);
					}
				})
			}
			}
			)	
	);

	/******************************
	 *         定义表格组件         *
	 ******************************/
	store = new Ext.data.Store({
		reader:new Ext.data.JsonReader({
			root:"items",
			totalProperty:"results",
			fields:[
			        {name:"id"},//流水Id 不须更改
			        //{name:"schoolId"},
			        {name:"clazzName"},
			        {name:"eduName"},
			        {name:"gradeName"},
			        {name :'createDate'},
			        {name:"studentNum"},
			        {name:"year"},
			        {name:"state"},
			        {name:"studyYearName"}

			        ]
		}),
		proxy:new Ext.data.HttpProxy({
			url:'clazzManager.do?method=showClazzList'  //访问路径clazzManager.do?method=showClazzList
		})
	});

	var sm = new Ext.grid.CheckboxSelectionModel();   //定义选择模式
	var grid = new Ext.grid.GridPanel({
		title:'年级班级管理',
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
		         //{header:'学校',width:100,dataIdex:'schoolName',sortabel:true},
		         {header:'班级名称',width:100,dataIndex:'clazzName',sortabel:true},
		         {header:'所属学段',width:100,dataIndex:'eduName',sortabel:true},
		         {header:'所属年级',width:100,dataIndex:'gradeName',sortabel:true},
		         {header:'所属学年',width:150,dataIndex:'studyYearName',sortabel:true},
		         {header : '创建时间', width:150,dataIndex : 'createDate',sortable : true},
		         {header:'状态',width:80,dataIdex:'state',sortabel:true,
	        		 renderer:function(value, metadata,record)
	        		 {
		        		 if(record.data.state == 0)
		        		 {
		        			 return "禁用";
		        		 }
		        		 else
		        		 {
		        			 return "启用";
		        		 }
	        		 }
	        	 },
		         {header:'学生人数',width:100,dataIdex:'studentNum',sortabel:true,renderer:function(value, metadata,record)
		        	 {  
		        	 var studentNum = record.data.studentNum;
		        	 var cnpath = record.data.cnpath;
		        	 var clazzid = record.data.id;
			         return "<a href='studentManager.do?method=getShowStudentJson&clazzId="+clazzid+"'>"+ studentNum +"人"+"</a>";
		        	
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
	});
	store.load({params:{start:0,limit:DefaultLimitSize}});
});