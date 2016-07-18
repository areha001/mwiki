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
	/******************************
	 *         定义表格组件         *
	 ******************************/


	//定义菜单选择项
	var toolbar = new Ext.Toolbar({
		width:'100%'
	});
	var changeStatus = function(arrId, actions)
	{
		Ext.Ajax.request({
			url: 'researchLib.do?method=status', //根据id删除节点
			//
			params:{'ids':arrId, 'actions': actions},            
			method: 'post', 
			//
			success: function(request) {
				store.reload();
				window.request = request;
				var xstatus = Ext.decode(request.responseText).xstatus;
				var str = "操作成功!";
				if(xstatus=='pass')
					str = "审核通过，学生可以在选题库中申报参与"
				Ext.MessageBox.alert("提示",str);
			},
			failure: function() {
				Ext.MessageBox.alert("提示","操作成失败!");
			}
		}
		);
	}
	var uppanel = function(xid)
	{ 
		var titleName = "修改";
		if(xid=="")
			titleName = "添加";
		window.top.pWindow = new window.top.Ext.Window({
			title: titleName,
			width: 780,
			height:530,
			layout: 'fit',
			plain:true,
			modal:true,
			draggable:true,
			resizable:false,
			closable:false,
			bodyStyle:'padding:3px;',
			buttonAlign:'center',
			html:'<iframe src="researchLib.do?method=manageForm&id=' + xid + '" width="760" height="460"></iframe>',
			myAfterSubmit:function(){
				window.top.pWindow.destroy();
				store.reload();
			},
			buttons: [{
				text: '确定',
				handler:function(){
					window.top.submitWindow();
				}
			},
			{
				text: '取消',
				handler:function(){
					window.top.pWindow.destroy();
				}
			}]
		});
		window.top.pWindow.show();
		return window.top.pWindow;
	}
	
	researchTypestore = new Ext.data.Store({
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
			//.getElementById("clazzid").value表示获取的是managerStudent.jsp页面的<input type="text" id="clazzid" value="${clazzid}" />中的id的值			
			url:'dict.do?method=showDicts&type=researchType&showHead=true' //访问路径
		})
	});
		
	subjectTypestore = new Ext.data.Store({
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
			//.getElementById("clazzid").value表示获取的是managerStudent.jsp页面的<input type="text" id="clazzid" value="${clazzid}" />中的id的值			
			url:'dict.do?method=showDicts&type=subject&showHead=true' //访问路径
		})
	});
	if(BACK_BUTTON)
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
	if(!SHOW_OLD)
	{
		toolbar.add(
			'-',
			new Ext.Button({
				text:'审核通过',
				iconCls:'backButton',
				handler:function(){
				var arrId = getMySelect();
				changeStatus(arrId,'pass');
			}
			}),
			new Ext.Button({
				text:'审核不通过',
				iconCls:'runButton',
				handler:function(){
				var arrId = getMySelect();
				changeStatus(arrId,'nopass');
			}
			}),
			new Ext.Button({
				text:'删除',
				iconCls:'deleteButton',
				handler:function(){
				var arrId = getMySelect();
				if(!arrId) return;
				Ext.Msg.show({
					title:'删除?',
					msg: '确定要删除选中记录吗,删除之后无法恢复?',
					buttons: Ext.Msg.YESNO,
					modal:true,
					fn:callback,
					icon: Ext.MessageBox.WARNING
				});
				function callback(id,msg){
					if(id=="yes")
						changeStatus(arrId,'delete');
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
			}),
			
			'-');
		}
		toolbar.add(
			'&nbsp;',
			new Ext.form.ComboBox({
	       		id:'sResearchTypeId',
	    	   name:'rtid',
	    	   width:120,
	    	   allowBlank:true,
	    	   mode:'local',
	    	   emptyText:'课题分类',
	    	   hiddenName:'research',
	    	   store:researchTypestore,
	    	   triggerAction:'all', displayField:'name', valueField:'id', editable: false
	       }),'&nbsp;',
			new Ext.form.ComboBox({
	       		id:'sSubjectTypeId',
	    	   name:'stid',
	    	   width:120,
	    	   allowBlank:true,
	    	   mode:'local',
	    	   emptyText:'学科分类',
	    	   hiddenName:'subject',
	    	   store:subjectTypestore,
	    	   triggerAction:'all', displayField:'name', valueField:'id', editable: false
	       }),'&nbsp;',
	       new Ext.Button({
				text:'搜索',
				iconCls:'findButton',
			    handler:function(){
			    	var researchTypeId = Ext.getCmp('sResearchTypeId').getValue();
			    	var subjectTypeId = Ext.getCmp('sSubjectTypeId').getValue();
					store.baseParams = {'researchTypeId':researchTypeId, 'subjectTypeId':subjectTypeId}
					store.reload({params:{start:0,limit:25}});
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
			        {name:"createTime"},
			        {name:"useCount"},
			        {name:"statusX"},
			        {name:"typeName"},
			        {name:"sTypeName"},
			        {name:"topicLibName"},
			        {name:"topicLibId"},
			        {name:"teacherNames"},
			        {name:"gradeNames"}
			        ]
		}),
		proxy:new Ext.data.HttpProxy({
			//.getElementById("clazzid").value表示获取的是managerStudent.jsp页面的<input type="text" id="clazzid" value="${clazzid}" />中的id的值			
			url:'researchLib.do?method=list&topicLibId=' + TOPIC_LIB_ID + "&studyYearId=" + STUDY_YEAR_ID//访问路径
		})
	});

	var sm = new Ext.grid.CheckboxSelectionModel();         //定义选择模式
	var grid = new Ext.grid.GridPanel({
		title: "申报选题管理（"+ STUDY_YEAR_NAME + "）",
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
		         {header:'名称',width:300,dataIndex:'title',sortabel:true,
		         renderer : function(value, metadata,record){  
			            var id = record.data.id;
			            var showPro = "<a target='_blank' href='../researchLib.do?method=showLib&from=admin&id=" + id + "'>" + 
			            record.data.title + '</a>';
			            return showPro;
		            }},
		            
		         {header:'指导老师',width:110,dataIndex:'teacherNames',sortabel:true},
		         {header:'申报时间',width:110,dataIndex:'createTime',sortabel:true},
		         {header:'研究次数',width:80,dataIndex:'useCount',sortabel:true},
		         {header:'当前状态',width:80,dataIndex:'statusX',sortabel:true},
		         {header:'课题分类',width:100,dataIndex:'typeName',sortabel:true},
		         {header:'学科分类',width:100,dataIndex:'sTypeName',sortabel:true},
		         {header:'适用年级',width:80,dataIndex:'gradeNames',sortabel:true},
		         {header:'对应指南课题',width:150,dataIndex:'topicLibName',sortabel:true}
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
	store.load({params:{start:0,limit:DefaultLimitSize}});
}
);