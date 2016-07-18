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

	var partnerList = new Ext.data.Store({
		autoLoad:true,
		proxy:new Ext.data.HttpProxy({
			url:'partnerManager.do?method=findPartner'
		}),
		reader:new Ext.data.JsonReader({},['id','dcode','text'])
	});
	var setStatusMulti = function(status){

		var arrId = getMySelect();
		Ext.Ajax.request({
			url: "partitionInfo.do?method=updateStatusMulti", //根据id删除节点
			params:{'ids':arrId,"status":status},            
			method: 'post', 
			success: function(request) {
				store.reload();
				Ext.MessageBox.alert("提示","操作成功!");
				return false;
			},
			failure: function() {
				throw new Error("操作失败");
			}
		});
	}
				
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
	  		  		data:[[10,'流畅'],[20,'火爆'],[30,'新开'],[40,'维护中'],[50,'停服'],[60,'测试']]
	  		  	   }),
	  		  	   triggerAction:'all',
	  		  	   fieldLabel:'状态',
	  		  	   valueField:'id',
	  		  	   displayField:'name',
	  		  	   editable:false,
	  		  	   mode:'local',
	  		  	   emptyText:'状态',
	  		  	   forceSelection:true,
	  		  	   allowBlank:true,
	  		  	   blankText:'请选择状态'
	  		     }),"-",

			new Ext.form.TextField({
				id : 'name',
				name : 'name',
				fieldLabel : '分区名',
				width : 150,
				value : '',
				allowBlank : true,// 数据库中可以为空的话 这二行可以去掉
				emptyText : '分区名'
			}),

			new Ext.Button({
				text : '搜索',
				iconCls : 'findButton',
				handler : search
			}),
			"-",
			new Ext.Button({
				text:"选中维护",
				iconCls:"editButton",
				handler:function(){
					setStatusMulti(40);
				}
			}),"-",
			new Ext.Button({
				text:"选中火爆",
				iconCls:"editButton",
				handler:function(){
					setStatusMulti(20);
				}
			}),"-",
			new Ext.Button({
				text:"选中新开",
				iconCls:"editButton",
				handler:function(){
					setStatusMulti(30);
				}
			}),"-",
			new Ext.Button({
				text:"选中流畅",
				iconCls:"editButton",
				handler:function(){
					setStatusMulti(10);
				}
			})
	);
	
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
		var name = Ext.getCmp('name').getValue();
		store.load({params:{parnter:parnterid,status:status,name:name,start:0,limit:25}});
	};

	store = new Ext.data.Store({
		proxy:new Ext.data.HttpProxy({url:'partitionInfo.do?method=dataList'}),
		reader:new Ext.data.JsonReader({
			root:"items",
			totalProperty:"results",
			fields:[
			        {name:"id"},//流水id 不须更改
			        {name:"name"},
			        {name:"channel"},
			        {name:"loginServerId"},
			        {name:"serverGroup"},
			        {name:"status"}
			        ]
		})
	});

   	var sm = new Ext.grid.CheckboxSelectionModel({
   		singleSelect: false
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
		         {header:'分区ID',width:100,dataIndex:'id',sortabel:true},
		         {header:'分区名称',width:100,dataIndex:'name',sortabel:true},
		         {header:'渠道',width:100,dataIndex:'channel',sortabel:true},
		         {header:'登录服务器ID',width:100,dataIndex:'loginServerId',sortabel:true},
		         {header:'服务器分组',width:100,dataIndex:'serverGroup',sortabel:true},
		         {header:'状态',width:100,dataIndex:'status',sortabel:true,
		        	 renderer: function (value) {
		        		 if(value == 10){
				         		return "流畅";
				         	}else if(value == 20){
				         		return "火爆";
				         	}else if(value == 30){
				         		return "新开";
				         	}else if(value == 40){
				         		return "维护中";
				         	}else if(value == 50){
				         		return "停服";
				         	}else if(value == 60){
				         		return "测试";
				         	}
		        	 }
		         }
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