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
	var departNameStore = new Ext.data.Store({
		autoLoad:true,
		proxy:new Ext.data.HttpProxy({
			url:'gm.do?method=departJosn'
		}),
		reader:new Ext.data.JsonReader({},['id','text'])
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
		       	   id:'parnterid',
		    	   name:'parnterid',
		    	   width:150,
		    	   mode:'local',
		    	   emptyText:'渠道',
		    	   store:partnerList,
		    	   triggerAction:'all', 
		    	   displayField:'text', 
		    	   valueField:'id', 
		    	   forceSelection:true,
		    	   editable: false,
		       }),"-",
	  		     new Ext.form.ComboBox({
	  		       id:'status',
	  		       name:'status',
	  		       width:150,
	  		  	   store:new Ext.data.SimpleStore({
	  		  		   fields:['id','name'],
	  		  		   data:[['','不限'],['2','普通账号'],['3','测试账号']]
	  		  	   }),
	  		  	   triggerAction:'all',
	  		  	   fieldLabel:'分组',
	  		  	   valueField:'id',
	  		  	   displayField:'name',
	  		  	   editable:false,
	  		  	   mode:'local',
	  		  	   emptyText:'账号类别',
	  		  	   forceSelection:true,
	  		  	   allowBlank:true,
	  		  	   blankText:'请选择分组'
	  		     }),"-",
	  		     
	  		    new Ext.form.TextField({
		  	   id:'username',
		  	   name:'username',
		  	   fieldLabel:'账号名',
		  	   width:150,
		  	   value:'',
		  	   allowBlank:true,//数据库中可以为空的话 这二行可以去掉
		  	   emptyText:'帐号名'
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
							var users = sm.getSelections();
							if(users.length!=1){
								Ext.MessageBox.alert("提示","请选择一条用户记录!");
								return ;
							}
							this.myTrigger(users[0].data)
						}
					})
				);
		}
	}		
			
						
	function search(){
		var parnterid = Ext.getCmp('parnterid').getValue();
		var status = Ext.getCmp('status').getValue();
		var username = Ext.getCmp('username').getValue();
		store.load({params:{parnter:parnterid,status:status,username:username,start:0,limit:25}});
	};

	store = new Ext.data.Store({
		proxy:new Ext.data.HttpProxy({url:'account.do?method=dataList'}),
		reader:new Ext.data.JsonReader({
			root:"items",
			totalProperty:"results",
			fields:[
			        {name:"id"},//流水id 不须更改
			        {name:"username"},
			        {name:"password"},
			        {name:"type"},
			        {name:"token"},
			        {name:"publishChannel"},
			        {name:"publishChannelUsername"},
			        {name:"terminalType"},
			        {name:"createTime"},
			        {name:"forceTerminal"}
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
		         {header:'账号',width:150,dataIndex:'username', sortable:true},
		         {header:'密码',width:250,dataIndex:'password',sortable:true},
		         {header:'账号类别',width:150,dataIndex:'type', sortable:true, renderer:function(value){
		         	if(value == 2){
		         		return "普通账号";
		         	}else if(value == 3){
		         		return "测试账号";
		         	}else{
		         		return value;
		         	}
		         }},
		         {header:'渠道',width:80,dataIndex:'publishChannel',sortable:true},
		         {header:'渠道用户名',width:150,dataIndex:'publishChannelUsername',sortable:true},
		         {header:'终端类型',width:150,dataIndex:'terminalType',sortable:true},
		         {header:'创建时间',width:150,dataIndex:'createTime',sortable:true, renderer:dateRenderer}
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