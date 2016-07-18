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

	var giftId = new Ext.form.ComboBox({
			id:'giftId',
	  	   hiddenName:'giftId',
	  	   store:new Ext.data.SimpleStore({
	  		   fields:['id', 'name'],
	  		   data:giftArr
	  	   }),
	  	   triggerAction:'all',
	  	   fieldLabel:'状态',
	  	   valueField:'id',
	  	   displayField:'name',
	  	   editable:false,
	  	   mode:'local',
	  	   forceSelection:true,
	  	   value:'',
	  	   allowBlank:true,
	  	   blankText:'请选择礼包ID'
	     })

	var status = new Ext.form.ComboBox({
			id:'status',
	  	   hiddenName:'status',
	  	   store:new Ext.data.SimpleStore({
	  		   fields:['id', 'name'],
	  		   data:[["","所有状态"],["0","未使用"],["1","已使用"]]
	  	   }),
	  	   triggerAction:'all',
	  	   fieldLabel:'状态',
	  	   valueField:'id',
	  	   displayField:'name',
	  	   editable:false,
	  	   mode:'local',
	  	   width:80,
	  	   forceSelection:true,
	  	   value:'',
	  	   allowBlank:true,
	  	   blankText:'请选择状态'
	     })

	var code = new Ext.form.TextField({
		   name:'code',
		   width:120,
		   fieldLabel:'指定激活码',
		   allowBlank:true,
		   editable:false,
		   emptyText:'查询指定激活码'
	})
	toolbarServer.add(giftId,'-', status,'-',code,'-',
	       new Ext.Button({
				iconCls:'findButton',
				text: '过滤',
				handler:search
					}),'-',
			 new Ext.Button({
					iconCls:'editButton',
					text: '导出以上分类',
					handler:function(){
						var url = "gift.do?method=codeList&limit=999999&start=0&target=excel";
						url= url + "&giftId="+giftId.getValue()+"&status=" + status.getValue();
						window.open(url);
					}
						}));
	function search(){
		Ext.apply(store.baseParams, {giftId:giftId.getValue(),status:status.getValue(),code:code.getValue()});
		store.load({params:{start:0,limit:25}});
	};
	

	store = new Ext.data.Store({
		proxy:new Ext.data.HttpProxy({url:'gift.do?method=codeList'}),
		reader:new Ext.data.JsonReader({
			root:"items",
			totalProperty:"results",
			fields:[
			        {name:"id"},//流水id 不须更改
			        {name:"giftId"},
			        {name:"status"},
			        {name:"useTime"},
			        {name:"createTime"},
			        {name:"code"},
			        {name:"createTime"},
			        {name:"playerId"},
			        {name:"userName"},
			        {name:"name"}
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
		         {header:'礼包码',width:80,dataIndex:'code',sortable:true},
			     {header:'礼包ID',width:120,dataIndex:'giftId',sortable:false,renderer:function(value){
			    	 return value + ":" + giftMap[value];
		         }},
		         {header:'状态',width:60,dataIndex:'status',renderer:function(value){
		    	   	 if(value==-1) return "未激活";
		    	   	 if(value==0) return "未使用";
		    	   	 if(value==1) return "已使用";
		         }
		         },
		         {header:'玩家ID',width:130,dataIndex:'playerId',sortable:true},
		         {header:'使用帐号',width:130,dataIndex:'userName',sortable:true},
		         {header:'使用角色',width:130,dataIndex:'name',sortable:true},
		         {header:'使用时间',width:130,dataIndex:'useTime',sortable:true,renderer:dateRenderer},
		         {header:'创建时间',width:130,dataIndex:'createTime',sortable:true,renderer:dateRenderer},
			     {header:'礼包码ID',width:65,dataIndex:'id',sortable:true}
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