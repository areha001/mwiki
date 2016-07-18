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

	var serverId = "";
	var serverList = new Ext.data.Store({
		autoLoad:true,
		proxy:new Ext.data.HttpProxy({
			url:'serverManager.do?method=findallServer'  //
		}),
		reader:new Ext.data.JsonReader({},['id','text','groupType'])
	});
	
	function getServerList(groupId){
		var sid = groupId;
		serverList.load({
			params:{"serverId":sid},
			callback:function(record,options,success){
				if(success){
					serverId = "";
					for(var i =0; i < record.length;i++){
						if(i==0){
							window.top.bbb = record;
						}
						var dataId = record[i].data.text;
						if(dataId!=""){
							console.log(dataId);
							serverId = serverId+dataId+",";
						}
						Ext.getCmp('serverid').setValue(serverId);
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
	       	   id:'partnerid',
	    	   name:'partnerid',
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
	    			  var c = this.textValue;
	    		        getServerList(c);
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
   	   				afterSure : function(){ 
   	   					serverId = Ext.getCmp('serverid').getValue();
   	   				},
	    	   triggerAction:'all', 
	    	   displayField:'text', 
	    	   valueField:'text', 
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
					   value:new Date(new Date().getTime() - 7*3600*24*1000),
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
		var beginTime = Ext.getCmp('beginTime').getValue();
		var endTime = Ext.getCmp('endTime').getValue();	
		console.log(endTime);
		var parnter = Ext.getCmp('partnerid').getValue();
		var params={"serverId":serverId,"target":"excel","beginTime":beginTime,"endTime":endTime,"parnter":parnter};
		var url='userRetention.do?method=findRetenTion&target=excel&' + Ext.urlEncode(params);
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
		var beginTime = Ext.getCmp('beginTime').getValue();
		var endTime = Ext.getCmp('endTime').getValue();
		var parnter = Ext.getCmp('partnerid').getValue();
		storeUser.load({
			params:{"serverId":serverId,"beginTime":beginTime,"endTime":endTime,"parnter":parnter},
			});
		}		
	
	var storeUser = new Ext.data.Store({
//	   autoLoad:true,
		reader:new Ext.data.JsonReader({
			root:"items",
			fields:[
			        {name:"date"},
			        {name:"total"},
			        {name:"eight"},
			        {name:"two"},
			        {name:"three"},
			        {name:"four"},
			        {name:"five"},
			        {name:"six"},
			        {name:"seven"}
			     ]
		}),
		proxy : new Ext.data.HttpProxy({
			url:'userRetention.do?method=findRetenTion'//点击进入
			//baseParams:{hello:1}
			//alert();
		})
//		baseParams:{"beginTime":Ext.getCmp('beginTime').getValue(),"endTime":Ext.getCmp('endTime').getValue()}
	});
	//加载
	//storeUser.load({params:{ parnterid:2}});
	var toolbarUser = new Ext.Toolbar({
		width:'100%'
	}); 
		
	
	var grid = new Ext.grid.GridPanel({
		title:'用户留存',
		frame:true,
		stripeRows:true,
		tortable:true,
		loadMask: {msg:'正在加载数据，请稍候...'},
		tbar:[searchGold],
	//	sm:sm,
		store:storeUser,
		viewConfig: {columnsText:'显示列',sortAscText:'升序',sortDescText:'降序' },
		columns:[
				{header:'时间',width:'10%',dataIndex:'date',sortable:true},
				{header:'新增用户',width:130,dataIndex:'total',sortable:true},
				{header:'次日留存',width:130,dataIndex:'two',sortable:true},
				{header:'三日留存',width:130,dataIndex:'three',sortable:true},
				{header:'四日留存',width:130,dataIndex:'four',sortable:true},
				{header:'五日留存',width:130,dataIndex:'five',sortable:true},
				{header:'六日留存',width:130,dataIndex:'six',sortable:true},
				{header:'七日留存',width:130,dataIndex:'seven',sortable:true},
				{header:'八日留存',width:130,dataIndex:'eight',sortable:true}
		   ]
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
})
