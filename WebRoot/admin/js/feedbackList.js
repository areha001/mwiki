Ext.onReady(function(){

	Ext.BLANK_IMAGE_URL = "../js/ext-3.3.1/resources/images/default/s.gif";
	Ext.QuickTips.init();    //初始化信息提示
	Ext.form.Field.prototype.msgTarget = "qtip";//统一指定错误信息提示方式
	
	Ext.Msg.buttonText.yes = "确定";
	Ext.Msg.buttonText.ok = "确定";
	Ext.Msg.buttonText.cancel = "取消";
	Ext.Msg.buttonText.no = "取消";
	var DefaultLimitSize = 20;
	//定义菜单选择项
	var toolbarServer = new Ext.Toolbar({
		width:'100%'
	});

	var toolbarUser = new Ext.Toolbar({
		width:'100%'
	});
	
	var departNameStoreWithBlank = new Ext.data.SimpleStore({
		   fields:['dcode','text'],
		   data:serverData
	 });
	
	var serverList = new Ext.data.Store({
		autoLoad:true,
		proxy:new Ext.data.HttpProxy({
			url:'serverManager.do?method=findallServer'  //
		}),
		reader:new Ext.data.JsonReader({},['id','text','groupType'])
	});

	var partnerList = new Ext.data.Store({
		autoLoad:true,
		proxy:new Ext.data.HttpProxy({
			url:'partnerManager.do?method=findPartner'
		}),
		reader:new Ext.data.JsonReader({},['id','dcode','text'])
	});

		toolbarServer.add("-",
	  		    new Ext.form.ComboBox({
	  		       id:'partnerid',
	 	    	   width:150,
	 	    	   mode:'local',
	 	    	   emptyText:'合作商',
	 	    	   store:partnerList,
	 	    	   triggerAction:'all', 
	 	    	   displayField:'text', 
	 	    	   valueField:'id', 
	 	    	   forceSelection:true,
	 	    	   editable: false,
	  		  	   forceSelection:true,
	  		  	   value:'',
	  		  	   allowBlank:true
	  		     }),"-",
	  	       new Ext.form.MultiSelect({
		    	   id:'serverid',
		    	   width:150,
		    	   emptyText:'服务器',
	 	    	   store:serverList,
		    	   allowBlank:true,
		    	   mode:'local',
		    	   triggerAction:'all', 
		    	   displayField:'text', 
		    	   valueField:'id', 
		    	   editable: false
		       }),"-","状态",
	  		     new Ext.form.ComboBox({
	  		    	 id:'status',
	  		    	 name:'status',
	  		  	   store:new Ext.data.SimpleStore({
	  		  		   fields:['id','name'],
	  		  		   data:[['','不限'],['0','未回复'],['1','已回复']]
	  		  	   }),
	  		  	   triggerAction:'all',
	  		  	   valueField:'id',
	  		  	   displayField:'name',
	  		  	   editable:false,
	  		  	   mode:'local',
	  		  	   forceSelection:true,
	  		  	   value:'',
	  		  	   allowBlank:true
	  		     }),
		  		    "-","角色名",
		   		  new Ext.form.TextField({  
	                id:'nickname',  
	                selectOnFocus:true                 
	            }),
	 			new Ext.Button({
	 				text:'查询',
	 				iconCls:'findButton',
	 				handler:search
	 			}));
	 			
	if(window.extraButton.length>0){
		for(var i=0 ;i<window.extraButton.length; i++){
			var btn = window.extraButton[i];
			toolbarServer.add('-',
					new Ext.Button({
						text:btn.text,
						iconCls:btn.iconCls,
						myTrigger:btn.func,
						handler:function(){
							var feedbacks = sm.getSelections();
							if(feedbacks.length!=1){
								Ext.MessageBox.alert("提示","请选择一条记录!");
								return ;
							}
							
							if(feedbacks[0].data.status == '1'){
								Ext.MessageBox.alert("提示","该条记录已回复!");
								return ;
							}
							
							this.myTrigger(feedbacks[0].data)
						}
					})
				);
		}
	} 			
	 			
	function search(){
		var partner = Ext.getCmp('partnerid').getValue();
		var serverId = Ext.getCmp('serverid').getValue();
		var nickname = Ext.getCmp('nickname').getValue(); 
		var status = Ext.getCmp('status').getValue();
		store.load({params:{partner:partner,serverId:serverId,name:nickname,status:status,start:0,limit:25}});
	};

	store = new Ext.data.Store({
		proxy:new Ext.data.HttpProxy({url:'feedback.do?method=dataList'}),
		reader:new Ext.data.JsonReader({
			root:"items",
			totalProperty:"results",
			fields:[
			        {name:"id"},//流水id 不须更改
			        {name:"serverId"},
			        {name:"playerId"},
			        {name:"title"},
			        {name:"info"},
			        {name:"reply"},
			        {name:"status"},
			        {name:"createTime"},
			        {name:"replyTime"}
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
			     {header:'服务器',width:100,dataIndex:'serverId',sortable:true},
		         {header:'角色名',width:100,dataIndex:'title', sortable:true},
		         {header:'反馈意见',width:250,dataIndex:'info',sortable:true},
		         {header:'回复状态',width:80,dataIndex:'status',sortable:true, renderer:function(value){
		         	if(value == '0'){
		         		return "未回复"
		         	}else{
		         		return "已回复";
		         	}
		         }},
		         {header:'GM回复',width:250,dataIndex:'reply',sortable:true},
		         {header:'反馈时间',width:150,dataIndex:'createTime',sortable:true},
		         {header:'回复时间',width:150,dataIndex:'replyTime',sortable:true}
		]
	});

	new Ext.Viewport({
		layout: 'border',
		items:[
		       {    //剧中的容器
		    	   title:"",
		    	   region:"center",
		    	   tbar:[toolbarServer],
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