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
	var toolbarServer = new Ext.Toolbar({
		width:'100%'
	});

	var toolbarUser = new Ext.Toolbar({
		width:'100%'
	});
	
	var departNameStoreWithBlank = new Ext.data.Store({
		autoLoad:true,
		proxy:new Ext.data.HttpProxy({
			url:'gm.do?method=departJosn&withBlank=true'
		}),
		reader:new Ext.data.JsonReader({},['id','text'])
	});

	var createCodeForm = function(giftId){return new Ext.form.FormPanel({
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
				    	   name:'giftId',
				    	   readOnly:true,
				    	   value:giftId,
				    	   fieldLabel:'礼包ID',
				    	   allowBlank:false,
				    	   blankText:''
				       }),
				       new Ext.form.TextField({
				    	   name:'count',
				    	   fieldLabel:'生成数量',
						   regex:/^\d+$/,
				    	   allowBlank:false,//数据库中可以为空的话 这二行可以去掉
				    	   emptyText:'请填写生成数量',
				    	   blankText:'生成数量不能为空'
				       })
				       ]
			}]
		}]
	});}
	var createCodeWindow = function(giftId){ 
		var dataForm = createCodeForm(giftId);
		var cwindow = new Ext.Window({
		title: '生成礼包码',
		width: 300,
		height:150,
		layout: 'fit',
		plain:true,
		modal:true,
		draggable:true,
		resizable:false,
		closable:false,
		bodyStyle:'padding:5px;',
		buttonAlign:'center',
		items: dataForm,
		buttons: [{
			text: '确定',
			handler:function(){
				dataForm.form.submit({
				clientValidation:true,
				waitMsg:'正在修改信息,请稍后...',
				waitTitle:'提示',
				url:"gift.do?method=genCode",   
				success:function(form,action){
				window.Ext.Msg.alert("提示","生成成功！");
				cwindow.destroy();
				window.location.reload();
			},
			failure:function(form,action){
				window.Ext.Msg.alert("提示","生成失败！"+action.result.failed);
			}
			})   ;
		}
		},
		{
			text: '取消',
			handler:function(){
			//关闭面板
				cwindow.destroy();
		}
		}]
	});
		return cwindow;
	};
	toolbarServer.add(
			new Ext.Button({
				iconCls:'editButton',
				text: '生成礼包码',
				handler:function(){
					var records = grid.getSelectionModel().getSelections();
					if(records.length!=1){
						top.Ext.Msg.alert('提示','请选择一条记录。');
						return;
					}
					var pwindow = createCodeWindow(records[0].id);
					pwindow.show();
				}
			}),
			new Ext.Button({
				iconCls:'editButton',
				text: '修改',
				handler:function(){
					var records = grid.getSelectionModel().getSelections();
					if(records.length!=1){
						top.Ext.Msg.alert('提示','请选择一条记录。');
						return;
					}
					window.location.href="gift.do?method=page&id=" + records[0].id
				}
			}),
	       new Ext.Button({
				iconCls:'deleteButton',
				text: '移除',
				handler:function(){
					var records = grid.getSelectionModel().getSelections();
					if(records.length!=1){
						top.Ext.Msg.alert('提示','请选择一条记录。');
						return;
					}
					if(!window.confirm("确认删除?")){
						return;
					}
					Ext.Ajax.request({     
					       url:'gift.do?method=delete',  
					       params:{id:records[0].id},  
					        success: function(resp,opts) {   
					        	store.reload();
		                     },   
		                     failure: function(resp,opts) { 
		                    	 window.Ext.Msg.alert("提示","数据加载失败！"+action.result.data);  
		                      }     
					      })
	       }}),'-');
	function search(){
		var status = Ext.getCmp('status').getValue();
		store.load({params:{status:status}});
	};

	store = new Ext.data.Store({
		proxy:new Ext.data.HttpProxy({url:'gift.do?method=dataList'}),
		reader:new Ext.data.JsonReader({
			root:"items",
			totalProperty:"results",
			fields:[
			        {name:"id"},//流水id 不须更改
			        {name:"name"},
			        {name:"serverName"},
			        {name:"status"},
			        {name:"createTime"},
			        {name:"partnerName"},
			        {name:"gold"},
			        {name:"diamond"},
			        {name:"itemInfoString"},
			        ]
		})
	});
	var dateRenderer = function(value){
	   	 if(value!=null){
	  	   return Ext.util.Format.date(new Date(value.time),'Y-m-d H:i:s');
	  	 }else{
	  		 return "";
	  	 }
   };

   	var sm = new Ext.grid.CheckboxSelectionModel({
   		singleSelect: true
   	});         //定义选择模式

	var grid = new Ext.grid.GridPanel({
		title:window.title,
		frame:true,
		stripeRows:true,
		tortable:true,
		loadMask: {msg:'正在加载数据，请稍候...'},
		tbar:[toolbarServer],
		sm:sm,
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
			     {header:'ID',width:100,dataIndex:'id',sortable:true},
			     {header:'礼包名',width:100,dataIndex:'name',sortable:true},

			     {header:'使用状态',width:150,dataIndex:'id',renderer:function(value){
			    	 var unused = analist[value+"-0"]
			    	 var used = analist[value+"-1"]
			    	 unused |= 0;used|= 0;
			    	 return "已用：" + used +" / 未用：" + unused; 
			     }},
			     
			     {header:'服务器ID',width:100,dataIndex:'serverName',sortable:true},
		         {header:'合作方',width:60,dataIndex:'partnerName',sortable:true},
		         {header:'金币',width:80,dataIndex:'gold',sortable:true},
		         {header:'钻石',width:50,dataIndex:'diamond',sortable:true},
			     {header:'附带物品',width:350,dataIndex:'itemInfoString',sortable:true},
		         {header:'创建时间',width:130,dataIndex:'createTime',sortable:true,renderer:dateRenderer}
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
});