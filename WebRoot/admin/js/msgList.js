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
	toolbarServer.add('-',
			new Ext.Button({
				iconCls:'editButton',
				text: '修改',
				handler:function(){
					var records = grid.getSelectionModel().getSelections();
					if(records.length!=1){
						top.Ext.Msg.alert('提示','请选择一条记录。');
						return;
					}
					window.location.href="msg.do?method=page&type="+window.special+"&id="+records[0].id
	       }}),'-',
			new Ext.form.ComboBox({
	       		id:'partnerId',
	    	   name:'partnerId',
	    	   width:120,
	    	   emptyText:'所属合作方',
	    	   allowBlank:true,
	    	   mode:'local',
	    	   store:departNameStoreWithBlank, triggerAction:'all', displayField:'text', valueField:'id', editable: false
	       }),
			new Ext.Button({
				text:'过滤服务器',
				iconCls:'findButton',
				handler:search
			}));
	function search(){
		var partnerId = Ext.getCmp('partnerId').getValue();
		store.load({params:{partnerId:partnerId}});
	};

	store = new Ext.data.Store({
		proxy:new Ext.data.HttpProxy({url:'msg.do?method=dataList&type='+window.special}),
		reader:new Ext.data.JsonReader({
			root:"items",
			totalProperty:"results",
			fields:[
			        {name:"id"},//流水id 不须更改
			        {name:"content"},
			        {name:"startTime"},
			        {name:"endTime"},
			        {name:"minutes"},
			        {name:"status"},
			        {name:"partnerId"},
			        {name:"partnerName"},
			        {name:"createTime"},
			        {name:"serverName"}
			        ]
		})
	});
	var dateRenderer = function(value){
	   	 if(value!=null){
	  	   return Ext.util.Format.date(new Date(value.time),'Y-m-d');
	  	 }else{
	  		 return "";
	  	 }
   };
	var sm = new Ext.grid.CheckboxSelectionModel();         //定义选择模式

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
			     {header:'服务器ID',width:200,dataIndex:'serverName',sortable:true},
		         {header:'内容',width:200,dataIndex:'content',sortable:true},
		         {header:'开始时间',width:100,dataIndex:'startTime',sortable:true,renderer:dateRenderer},
		         {header:'结束时间',width:100,dataIndex:'endTime',sortable:true,renderer:dateRenderer},
		         {header:'间隔分钟',width:80,dataIndex:'minutes',sortable:true,hidden:window.special==2},
			     {header:'合作方',width:150,dataIndex:'partnerName',sortable:true},
		         {header:'状态',width:60,dataIndex:'status',sortable:true,
		        	 renderer:function(value, metadata,record)
	        		 {
		        		 return record.data.status == 0?"启用":"<font color='red'>禁用</font>";
	        		 }},
		         {header:'创建时间',width:100,dataIndex:'createTime',sortable:true,renderer:dateRenderer}
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