/**
 * @author Administrator
 */

Ext.onReady(function(){

	Ext.apply(Ext.form.VTypes, {
	    daterange : function(val, field) {
	        var date = field.parseDate(val);
	
	        if(!date){
	            return false;
	        }
	        if (field.startDateField) {
	            var start = Ext.getCmp(field.startDateField);
	            if (!start.maxValue || (date.getTime() != start.maxValue.getTime())) {
	                start.setMaxValue(date);
	                start.validate();
	            }
	        }
	        else if (field.endDateField) {
	            var end = Ext.getCmp(field.endDateField);
	            if (!end.minValue || (date.getTime() != end.minValue.getTime())) {
	                end.setMinValue(date);
	                end.validate();
	            }
	        }
	        /*
	         * Always return true since we're only using this vtype to set the
	         * min/max allowed values (these are tested for after the vtype test)
	         */
	        return true;
	    }
	});
	
	Ext.BLANK_IMAGE_URL = "../js/ext-3.3.1/resources/images/default/s.gif";
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget = "side";

	Ext.Msg.buttonText.yes = "确定";
	Ext.Msg.buttonText.ok = "确定";
	Ext.Msg.buttonText.cancel = "取消";
	Ext.Msg.buttonText.no = "取消";
	
	//定义菜单选择项
	var toolbar = new Ext.Toolbar({
		width:'100%'
	});

	toolbar.add(
				new Ext.Button({
				text:'添加',
				iconCls:'addButton',
				handler:function(){  
				//学期添加  窗口中的表单设置
				var dataform = new Ext.form.FormPanel({    
					labelSeparator:':',
					labelWidth:70,
					bodyStyle:'padding:0 0 0 0',
					frame:true,
					height:'auto',
					width:260,
					items:[
					       new Ext.form.TextField({
					    	   name:'year',
					    	   width:180,
					    	   fieldLabel:'年度',
					    	   allowBlank:false,//数据库中可以为空的话 这二行可以去掉
					    	   emptyText:'请填写年度',
					    	   blankText:'年度不能为空'
					       }),
					       new Ext.form.ComboBox({
					    	   id:'term',
					    	   hiddenName:'term',
					    	   store:new Ext.data.SimpleStore({
					    		   fields:['term', 'name'],
					    		   data:[[1,'上学期'],[2,'下学期']]
					    	   }),
					    	   triggerAction:'all',
					    	   width:180,
					    	   fieldLabel:'学期',
					    	   valueField:'term',
					    	   displayField:'name',
					    	   editable:false,
					    	   mode:'local',
					    	   forceSelection:'true',
					    	   value:1,
					    	   allowBlank:false,
					    	   blankText:'状态修改'
					       }),
					       {
						        fieldLabel: '开始日期',
						        allowBlank:false,
					    	    blankText:'请选择开始日期',
						        width:180,
						        xtype:'datefield',
						        name: 'startDate',
						        id: 'startDate',
						        vtype: 'daterange',
						        format : 'Y-m-d',
						        endDateField: 'endDate' // id of the end date field
					       },{
						        fieldLabel: '结束日期',
						        allowBlank:false,
						        emptyText:'请选择开始结束日期',
					    	    blankText:'开始结束日期不能为空',
						        width:180,
						        xtype:'datefield',
						        name: 'endDate',
						        id: 'endDate',
						        vtype: 'daterange',
						        format : 'Y-m-d',
						        startDateField: 'startDate' // id of the start date field
					       }
					  ]
				});
				//学期添加的窗口 windowpanel
				var windowpanel = new Ext.Window({
					title: '学期添加',
					width: 320,//窗口的宽度
					height:195,//高度
					layout: 'fit',
					plain:true,
					modal:true,
					draggable:true,
					resizable:false,
					closable:false,
					bodyStyle:'padding:5px;',
					buttonAlign:'center',
					items: dataform,      //将上面的表单设置到此窗口
					buttons: [{
						text: '确定',
						handler:function(){
						//var termInfoId = document.getElementById("termInfoId").value;
						if(!dataform.form.isValid()){
							top.Ext.Msg.alert('提示','提交失败，请确定表单填写已正确。');
							return false;
						}	
						dataform.form.submit({
							clientValidation:true,
							waitMsg:'正在添加信息,请稍后...',
							waitTitle:'提示',
							// <-这里输入添加课程信息的servlet地址。   代码中return null out.print({"success":false});
							url:'termInfoManager.do?method=AddTermInfo',
							success:function(form,action){
							windowpanel.destroy();
							store.reload();
							window.Ext.Msg.alert("提示","添加新学期成功！");
							return false;
						},
						failure:function(form,action){
							window.Ext.Msg.alert("提示","添加新学期失败！"+action.result.info);
						}
						})   
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

			new Ext.Button({
				text:'修改',
				id:'edit',
				iconCls:'editButton',
				handler:function(){  
				//学期修改
				var dataform = new Ext.form.FormPanel({      //这是一个表单   
					labelSeparator:':',
					labelWidth:70,
					bodyStyle:'padding:0 0 0 0',
					frame:true,
					height:'auto',
					width:300,
					items:[
					       new Ext.form.TextField({
					    	   id:'id',
					    	   hiddenName:"id",
					    	   hidden: true,
					    	   width:200,
					    	   fieldLabel:'',
					    	   allowBlank:false,
					    	   blankText:''
					       }),
					       new Ext.form.TextField({
					    	   id:'year',
					    	   hiddenName:"year",//名字与request.get...一致

					    	   width:180,
					    	   fieldLabel:'年度',
					    	   allowBlank:false,//数据库中可以为空的话 这二行可以去掉
					    	   blankText:'请填写年度'
					       }),


					       new Ext.form.ComboBox({
					    	   id:'term',
					    	   hiddenName:'term',//此名字是从request.getParameter("term")获取的，此名字应与下面action.result.term)的term一致
					    	   store:new Ext.data.SimpleStore({
					    		   fields:['term', 'name'],
					    		   data:[[1,'上学期'],[2,'下学期']]

					    	   }),
					    	   triggerAction:'all',
					    	   width:180,
					    	   fieldLabel:'学期',
					    	   valueField:'term',
					    	   displayField:'name',
					    	   editable:false,
					    	   mode:'local',
					    	   forceSelection:'true',
					    	   value:1,
					    	   allowBlank:false,
					    	   blankText:'状态修改'
					       }),
					        {
						        fieldLabel: '开始日期',
						        allowBlank:false,
					    	    blankText:'请选择开始日期',
						        width:180,
						        xtype:'datefield',
						        name: 'startDate',
						        id: 'startDate',
						        vtype: 'daterange',
						        format : 'Y-m-d',
						        endDateField: 'endDate' // id of the end date field
					       },{
						        fieldLabel: '结束日期',
						        allowBlank:false,
					    	    blankText:'请选择结束日期',
						        width:180,
						        xtype:'datefield',
						        name: 'endDate',
						        id: 'endDate',
						        vtype: 'daterange',
						        format : 'Y-m-d',
						        startDateField: 'startDate' // id of the start date field
					       }
						]
				});

				var windowpanel = new Ext.Window({
					title: '学期 修改',
					width: 320,//窗口的宽度
					height:195,//高度
					layout: 'fit',
					plain:true,
					modal:true,
					draggable:true,
					resizable:false,
					closable:false,
					bodyStyle:'padding:5px;',
					buttonAlign:'center',
					items: dataform,//将上面的表单添加进来			
					buttons: [{
						text: '确定',
						handler:function(){
						dataform.form.submit({
							clientValidation:false,
							waitMsg:'正在修改信息,请稍后...',
							waitTitle:'提示',
							url:"termInfoManager.do?method=extUpdateTermInfo",  
							success:function(form,action){

							window.Ext.Msg.alert("提示","修改学期信息成功！");
							windowpanel.destroy();
							store.reload();
						},
						failure:function(form,action){
							window.Ext.Msg.alert("提示","修改学期信息失败！"+action.result.info);
						}  
						})   
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

				var termid = records[0].id;


				windowpanel.show();	
				dataform.form.load({
					clientValidation:false,
					url:"termInfoManager.do?method=getTermInfoById",  
					params:{'termid':termid},
					waitMsg:'正在加载信息,请稍后...',
					waitTitle:'提示',
					success:function(form,action){
						form.findField("id").setValue( parseInt(action.result.id));//学期表的ID
						form.findField("term").setValue( parseInt(action.result.term));//findField("term")是从响应中获得的，printRes对应的名字
						form.findField("year").setValue( action.result.year);
						if(!Ext.isEmpty(action.result.startDate))
						{
							var date1 = action.result.startDate.replace(/-/g, '/');//将时间—以/的形式替换
							var date2 = date1.split('.'); //将时间以后面的.0分割成二组
							form.findField("startDate").setValue( new Date(Date.parse(date2[0])));//只取.0前面的值
						}
						if(!Ext.isEmpty(action.result.endDate))
						{
							var date1 = action.result.endDate.replace(/-/g, '/');
							var date2 = date1.split('.'); 
							form.findField("endDate").setValue( new Date(Date.parse(date2[0])));
						}	    				
					},
					failure:function(form,action){
						window.Ext.Msg.alert("提示","数据加载失败！"+action.result.data);
						windowpanel.destroy();
					}
				})				
			}
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
							url: 'termInfoManager.do?method=extDeleteTermRows', //根据id删除节点
							params:{'CheckList':arrId},            
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
			})
	)

	/******************************
	 *         定义表格组件         *
	 ******************************/

	store = new Ext.data.Store({
		reader:new Ext.data.JsonReader({
			root:"items",
			totalProperty:"results",
			fields:[
			        {name:"id"},//流水Id 不须更改
			        {name:"year"},
			        {name:"term"},
			        {name:"startDate"},
			        {name:"endDate"}
			        ]
		}),

		proxy:new Ext.data.HttpProxy({
			url:'termInfoManager.do?method=showTermInfo'   //访问路径
		})
	})

	var sm = new Ext.grid.CheckboxSelectionModel();         //定义选择模式
	var grid = new Ext.grid.GridPanel({
		title:'学期信息表',
		frame:true,
		stripeRows:true,
		tortable:true,
		loadMask: {msg:'正在加载数据，请稍候...'},
		tbar:toolbar,//   在面版上添加按扭（添加，删除。。。）
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
		         {header:'年份',width:120,dataIdex:'year',sortabel:true},
		         {header:'学期',width:80,dataIdex:'term',sortabel:true,renderer:function(value, metadata,record)
		        	 {  
		        	 var termInfoId = record.data.term;
		        	 var showPro = "上学期"
		        		 if(termInfoId!=1){
		        			 showPro = "下学期";
		        		 }
		        	 return showPro;
		        	 }
		         },

		         {
		        	 header : '开学日期',
		        	 width:150,
		        	 dataIndex : 'startDate',
		        	 sortable : true,
		        	 renderer:function(value, metadata,record)
		        	 {  
		        	 if(Ext.isEmpty(record.data.startDate))
		        	 {
		        		 return "";
		        	 }
		        	 else
		        	 {
		        		 var date = new Date(record.data.startDate.time);
		        		 return Ext.util.Format.date(date,'Y年m月d日');
		        	 }
		        	 }
		         },
		         
		         {
		        	 header : '结束日期',
		        	 width:150,
		        	 dataIndex : 'endDate',
		        	 sortable : true,
		        	 renderer:function(value, metadata,record)
		        	 {  
		        	 if(Ext.isEmpty(record.data.endDate))
		        	 {
		        		 return "";
		        	 }
		        	 else
		        	 {
		        		 var date = new Date(record.data.startDate.time);
		        		 return Ext.util.Format.date(date,'Y年m月d日');
		        	 }
		        	 }
		         }
		         
		         
		         ]
	})

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
	})
	store.load({params:{start:0,limit:25}});
});