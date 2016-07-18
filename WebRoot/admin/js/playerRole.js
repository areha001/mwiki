//充值查询
Ext.onReady(function(){
	
	
	Ext.BLANK_IMAGE_URL = "../js/ext-3.3.1/resources/images/default/s.gif";
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget = "qtip";

	Ext.Msg.buttonText.yes = "确定";
	Ext.Msg.buttonText.ok = "确定";  
	Ext.Msg.buttonText.cancel = "取消";
	Ext.Msg.buttonText.no = "取消";
	
	var toolbar = new Ext.Toolbar({
		width:'100%'
	});
	
	var sm = new Ext.grid.CheckboxSelectionModel();         //定义选择模式
	var searchGold = new Ext.Toolbar({
		width:'100%'
	});
	
	var serverList = new Ext.data.Store({
		autoLoad:true,
		proxy:new Ext.data.HttpProxy({
			url:'serverManager.do?method=findallServer'  //
		}),
		reader:new Ext.data.JsonReader({},['id','text','groupType'])
	});
	
	function getServersByPartner(partnerId){
		var sid = partnerId;
		list.load({
			params:{"partnerId":sid},
			callback:function(record,options,success){
				if(success){
					var serverid = "";
					for(var i =0; i < record.length;i++){
						if(i==0){
							//window.top.bbb = record;
						}
						var dataId = record[i].data.id;
						if(dataId!="" && dataId != null){
							console.log(dataId);
							serverid = serverid+dataId+",";
						}
					}
					Ext.getCmp('serverid').setValue(serverid);
				}
			}
			});
	};
	
	function getServerList(groupId){
		console.log(groupId);
		var sid = groupId;
		serverList.load({
			params:{"serverId":sid},
			callback:function(record,options,success){
				if(success){
					var serverid = "";
					for(var i =0; i < record.length;i++){
						if(i==0){
							window.top.bbb = record;
						}
						var dataId = record[i].data.id;
						if(dataId!=""){
							console.log(dataId);
							serverid = serverid+dataId+",";
						}
						Ext.getCmp('serverid').setValue(serverid);
					}
				}
			}
			});
	};
	
	var groupList = new Ext.data.Store({
		autoLoad:true,
		proxy:new Ext.data.HttpProxy({
			url:'serverManager.do?method=findGroupType'
		}),
		reader:new Ext.data.JsonReader({},['id','dcode','text'])
	});
	
	var partnerList = new Ext.data.Store({
		autoLoad:true,
		proxy:new Ext.data.HttpProxy({
			url:'partnerManager.do?method=findPartner'
		}),
		reader:new Ext.data.JsonReader({},['id','dcode','text'])
	});
	
	searchGold.add('-',
			new Ext.form.ComboBox({
	       	   id:'parnterid',
	    	   name:'parnterid',
	    	   width:150,
	    	   mode:'local',
	    	   emptyText:'合作商',
	    	   store:partnerList,
	    	   listeners:{
	    		   select:function(combo, record, index){
	    			   Ext.getCmp('groupid').setValue("");
	    			   var id = record.data.dcode;
	    			//   getServersByPartner(id);
	    		   }
	    	   },
	    	   triggerAction:'all', 
	    	   displayField:'text', 
	    	   valueField:'id', 
	    	   forceSelection:true,
	    	   editable: false,
	       }),"-",
	       new Ext.form.MultiSelect({
	    	   id:'groupid',
	    	   name:'groupid',
	    	   width:150,
	    	   emptyText:'分组',
	    	   allowBlank:true,
	    	   mode:'local',
	    	   store:groupList, 
	    		   afterSure:function(){
	    		        var combo = this.textValue;
	    		        getServerList(combo);
	    		   },
	    		   getTextValue : function(){  
	    		        return this.textValue;  
	    		    },
	    	   triggerAction:'all', 
	    	   displayField:'text', 
	    	   valueField:'id', 
	    	   editable: false
	       }),"-",
	       new Ext.form.MultiSelect({
	       	   id:'serverid',
	    	   name:'serverid',
	    	   width:150,
	    	   emptyText:'服务器',
	    	   allowBlank:true,
	    	   mode:'local',
	    	   store:serverList, 
	    	   triggerAction:'all', 
	    	   displayField:'text', 
	    	   valueField:'id', 
	    	   editable: false
  		     })
		)
			
			searchGold.add('-','开始时间:',
				new Ext.form.DateField({
					xtype : "datefield",  
		              emptyText : '开始时间',
		              id:'beginTime',  
		              format:'Y-m-d',//指定显示格式  
		              width:150,
					   value:new Date(new Date().getTime() - 6*3600*24*1000),
		              validator : checkTime, 
		              invalidText:'请选择日期', 
				})
			)
			searchGold.add('-','结束时间:',
				new Ext.form.DateField({
					xtype : "datefield",  
		              emptyText : '结束时间',
		              id:'endTime',  
		              format:'Y-m-d',//指定显示格式  
		              width:150,
					   value:new Date(),
		              invalidText:'请选择日期', 
		              validator : checkTime, 
				})
			);
			searchGold.add('-',
					new Ext.Button({
						text:'搜索',
						iconCls:'findButton',
						handler:search
					}),
					new Ext.Button({
						text:'导出EXCEL',
						iconCls:'changeButton',
						handler:exportExcel
					})
			)
			
	//导出excel
	function exportExcel(){
		var serverId = Ext.getCmp('serverid').getValue();
		var beginTime = Ext.getCmp('beginTime').getValue();
		var endTime = Ext.getCmp('endTime').getValue();	
		console.log(endTime);
		var parnter = Ext.getCmp('parnterid').getValue();
		var params={"serverId":serverId,"target":"excel","beginTime":beginTime,"endTime":endTime,"parnter":parnter};
		var url='playerRole.do?method=findPlayerRole&target=excel&' + Ext.urlEncode(params);
		window.open(url);	
	}
	
	function checkTime(){
		var beginTime = Ext.getCmp('beginTime').getValue();
		var endTime = Ext.getCmp('endTime').getValue();
		if(endTime != ""){
			if(endTime < beginTime){
				Ext.MessageBox.alert("警告","开始时间不能大于结束时间！");
				Ext.getCmp('endTime').setValue("");
			}
		}
		
	}
	var colums = [];
	
	function search(){
		var serverId = Ext.getCmp('serverid').getValue();
		var beginTime = Ext.getCmp('beginTime').getValue();
		var endTime = Ext.getCmp('endTime').getValue();
		var parnter = Ext.getCmp('parnterid').getValue();
//		Ext.apply(baseParams,
//				{"serverId":Ext.getCmp('serverid').getValue(),"beginTime":Ext.getCmp('beginTime').getValue(),"endTime":Ext.getCmp('endTime').getValue(),"parnter":Ext.getCmp('parnterid').getValue(),"type":Ext.getCmp('type').getValue(), start:0,limit:25
//				})
		storeUser.load({
			params:{"serverId":serverId,"beginTime":beginTime,"endTime":endTime,"parnter":parnter},
			});
		storeUser.on("beforeload",function(){
		    Ext.apply(this.baseParams, {"serverId":Ext.getCmp('serverid').getValue(),"beginTime":Ext.getCmp('beginTime').getValue(),"endTime":Ext.getCmp('endTime').getValue(),
				"parnter":Ext.getCmp('parnterid').getValue(), start:0,limit:25});
		});
		}		
	
	var storeUser = new Ext.data.Store({
//	   autoLoad:true,
		reader:new Ext.data.JsonReader({
			root:"items",
			totalProperty:"results",
			fields:[
			        {name:"playerId"},
			        {name:"name"},
			        {name:"serverId"},
			        {name:"roleName"},
			        {name:"action"},
//			        {name:"num"},
			        {name:"date"},
			     ]
		}),
		proxy : new Ext.data.HttpProxy({
			url:'playerRole.do?method=findPlayerRole'//点击进入
		})
//		baseParams : {"serverId":Ext.getCmp('serverid').getValue(),"beginTime":Ext.getCmp('beginTime').getValue(),"endTime":Ext.getCmp('endTime').getValue(),
//			"parnter":Ext.getCmp('parnterid').getValue(), start:0,limit:25}
	});
	
	var toolbarUser = new Ext.Toolbar({
		width:'100%'
	}); 
	
	var grid = new Ext.grid.GridPanel({
		title:'角色统计',
		frame:true,
		stripeRows:true,
		tortable:true,
		loadMask: {msg:'正在加载数据，请稍候...'},
		tbar:[searchGold],
		//sm:sm,
		store:storeUser,
		viewConfig: {columnsText:'显示列',sortAscText:'升序',sortDescText:'降序'},
		columns:[
				{header:'玩家ID',width:130,dataIndex:'playerId',sortable:true},
				{header:'玩家名',width:130,dataIndex:'name',sortable:true},
				{header:'服务器',width:130,dataIndex:'serverId',sortable:true},
				{header:'拥有角色',width:130,dataIndex:'roleName',sortable:true},
				{header:'角色来源',width:130,dataIndex:'action',sortable:true},
//				{header:'数量',width:130,dataIndex:'num',sortable:true},
				{header:'时间',width:150,dataIndex:'date',sortable:true}
		   ],
			bbar:new Ext.PagingToolbar({
				pageSize:25,  
				store:storeUser,
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
			})
	});
	window.top.ee = grid;
	new Ext.Viewport({
		layout: 'fit',
		items:[{
			layout: 'border',
			items: [
				{
		        title: 'Center Region',
		        region: 'center',     // center region is required, no width/height specified
		        xtype: 'container',
		        layout: 'fit',
		        height: 100,
		        minSize: 75,         // defaults to 50
		        margins: '5 5 0 0',
		        items:[grid]
		    }]
		}]
	});
}
)
