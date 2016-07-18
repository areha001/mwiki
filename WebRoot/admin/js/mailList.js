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
	if(window.canPass){
		toolbarServer.add('-',
				new Ext.Button({
					iconCls:'editButton',
					text: '通过',
					handler:function(){
						var records = grid.getSelectionModel().getSelections();
						if(records.length!=1){
							top.Ext.Msg.alert('提示','请选择一条记录。');
							return;
						}
						if(!window.confirm("确认通过?")){
							return;
						}
						Ext.Ajax.request({     
					       url:'mail.do?method=sendMail',  
					       params:{id:records[0].id},  
					        success: function(resp, result) {
								var respJson = {};
								try {
									respJson = JSON.parse(resp.responseText);
									console.log(respJson);
								} catch (e) {
									console.error(e);
									Ext.Msg.alert('提示', resp.responseText);
									return;
								}

								if(respJson.success){
									Ext.Msg.alert('提示', "发送成功");
									store.reload();
								}
					        	else{
									Ext.Msg.alert('提示',resp.responseText);
								}
							},
		                     failure: function(resp,action) { 
		                    	 window.Ext.Msg.alert("提示","数据加载失败！"+action.result.data);  
		                      }     
					      })
		       }}),
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
						       url:'mail.do?method=delete',  
						       params:{id:records[0].id},  
						        success: function(resp,opts) {   
						        	store.reload();
			                     },   
			                     failure: function(resp,opts) { 
			                    	 window.Ext.Msg.alert("提示","数据加载失败！"+action.result.data);  
			                      }     
						      })
		       }})
		);
	}
	toolbarServer.add('-',
	  		     new Ext.form.ComboBox({
	  		    	 id:'status',
	  		    	 name:'status',
	  		  	   store:new Ext.data.SimpleStore({
	  		  		   fields:['id','name'],
	  		  		   data:[['','不限'],['0','未审核'],['1','已审核'],['2','已发送'],['9','发送失败']]
	  		  	   }),
	  		  	   triggerAction:'all',
	  		  	   fieldLabel:'分组',
	  		  	   valueField:'id',
	  		  	   displayField:'name',
	  		  	   editable:false,
	  		  	   mode:'local',
	  		  	   forceSelection:true,
	  		  	   value:'',
	  		  	   allowBlank:true,
	  		  	   blankText:'请选择分组'
	  		     }),
			new Ext.Button({
				text:'过滤邮件',
				iconCls:'findButton',
				handler:search
			}));
	function search(){
		var status = Ext.getCmp('status').getValue();
		store.load({params:{status:status,start:0,limit:25}});
	};

	store = new Ext.data.Store({
		proxy:new Ext.data.HttpProxy({url:'mail.do?method=dataList&type='+window.special}),
		reader:new Ext.data.JsonReader({
			root:"items",
			totalProperty:"results",
			fields:[
			        {name:"id"},//流水id 不须更改
			        {name:"title"},
			        {name:"content"},
			        {name:"startTime"},
			        {name:"serverName"},
			        {name:"status"},
			        {name:"sendType"},
			        {name:"createTime"},
			        {name:"userName"},
			        {name:"partnerName"},
			        {name:"gold"},
			        {name:"diamond"},
			        {name:"apple"},
			        {name:"sendType"},
			        {name:"itemInfoString"},
			        {name:"errMsg"},
			        {name:"cause"},
			        {name:"statusString"},
			        {name:"leader"},
			        {name:"exp"}
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
			     {header:'服务器ID',width:100,dataIndex:'serverName',sortable:true},
		         {header:'发送方式',width:60,dataIndex:'sendType',renderer:function(value){
			    	   	 if(value!=null){
			    	   		 if(value==0){return "指定用户"}
			    	   		 if(value==1){return "全服发送"}
			    	   		 return value;
			    	   	 }
		    	   	 }
		         },
		         {header:'用户名',width:180,dataIndex:'userName',renderer:function(value){
			    	   	 if(value!=null && value!= ""){
			    	   		var count = value.split(",").length;
			    	   		return count + "人：" + value;
			    	   	 }
		    	   	 }
		         },
		         {header:'标题',width:180,dataIndex:'title',sortable:true},
		         {header:'内容',width:200,dataIndex:'content',sortable:true,renderer:function(v){ 
			        	var s = v;
			        	var g = s;
			        	 while(s!=g){
			        		 g=s;
			        		 s = s.replace("<","&lt;").replace("'","&#39;");
			        	 }
			        	 return "<p title='" + s + "'>" + s+ "</p>"
		        	 }
		         },
		         {header:'发送时间',width:130,dataIndex:'startTime',sortable:true,renderer:dateRenderer},
		         {header:'金币',width:50,dataIndex:'gold',sortable:true},
		         {header:'钻石',width:50,dataIndex:'diamond',sortable:true},
		         {header:'苹果币',width:50,dataIndex:'apple',sortable:true},
		         {header:'经验',width:50,dataIndex:'exp',sortable:true},
		         {header:'领导力',width:50,dataIndex:'leader',sortable:true},
			     {header:'附带物品',width:150,dataIndex:'itemInfoString',sortable:true},
		         {header:'状态',width:60,dataIndex:'statusString',sortable:true,renderer:function(value,metadata,record){
		    	   	 if(record.data.errMsg==""){
		    	   		 return value
		    	   	 }
		    	   	 return "<font style='color:red'>" + value + "</font>" + record.data.errMsg ;
		    	   		
		    	   }},
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