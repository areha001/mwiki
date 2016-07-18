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
			url:'serverManager.do?method=findallServer'
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
	    			   //getServersByPartner(id);
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
			
			searchGold.add('-','方式',
					new Ext.form.ComboBox({
						id:'wayid',
				    	name:'wayid',
				    	width:150,
				    	mode:'local',
				    	store:new Ext.data.SimpleStore({
				    		fields:['id','name'],
				    		data:[['0','产出'],['1','消耗'],['2','消耗人数'],['3','产出人数']]
				    	}),
				    	triggerAction:'all', 
				    	displayField:'text', 
				    	valueField:'id', 
				    	displayField:'name',
				    	value:'0',
				    	forceSelection:true,
				    	editable: false
					})
			),
			
			searchGold.add('-','开始时间:',
				new Ext.form.DateField({
					xtype : "datefield",  
		              emptyText : '开始时间',
		              id:'beginTime',  
		              format:'Y-m-d',//指定显示格式  
		              width:150,
		              value:new Date(new Date().getTime() - 14*3600*24*1000),
		              validator : checkTime, 
		              invalidText:'请选择日期'
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
		              validator : checkTime
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
		var wayid = Ext.getCmp('wayid').getValue();
		console.log(wayid);
		var serverId = Ext.getCmp('serverid').getValue();
		var beginTime = Ext.getCmp('beginTime').getValue();
		var endTime = Ext.getCmp('endTime').getValue();	
		var parnter = Ext.getCmp('parnterid').getValue();
		var params={"serverId":serverId,"target":"excel","beginTime":beginTime,"endTime":endTime,"wayid":wayid,"parnter":parnter};
		var url='moneyAnalyze.do?method=findallMoney&target=excel&' + Ext.urlEncode(params);
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
		var wayid = Ext.getCmp('wayid').getValue();
		var serverId = Ext.getCmp('serverid').getValue();
		var beginTime = Ext.getCmp('beginTime').getValue();
		var endTime = Ext.getCmp('endTime').getValue();
		var parnter = Ext.getCmp('parnterid').getValue();
		storeUser.removeAll();
		storeUser.load({
			params:{"serverId":serverId,"beginTime":beginTime,"endTime":endTime,"wayid":wayid,"parnter":parnter},

		});
			if(wayid=='0'||wayid==''|| wayid == '3'){
				storeUser.removeAll();
				grid.colModel.setConfig(incolumnArr)
			}else{
				storeUser.removeAll();
				grid.colModel.setConfig(outcolumnArr)
			}
		}		
	
	var storeUser = new Ext.data.Store({
//		autoLoad:true,
		reader:new Ext.data.JsonReader({
			root:"items",
			fields:[
			        {name:"date"},
			        {name:"buyGold"},
			        {name:"pvpHunt"},
			        {name:"compound"},
			        {name:"mallBuy"},
			        {name:"reincarnation"},
			        {name:"shapeshifting"},
			        {name:"furniture"},
			        {name:"changeIcon"},
			        {name:"skill"},
			        {name:"dollhouse"},
			        {name:"magicHouse"},
			        {name:"vipBag"},
			        {name:"payforAnother"},
			        {name:"arena"},
			        {name:"arenaRank"},
			        {name:"equipment"},
			        {name:"attribute"},
			        {name:"sell"},
			        {name:"rebirth"},
			        {name:"dream"},
			        {name:"openBag"},
			        {name:"refresh"},
			        {name:"summoningMonster"},
			        {name:"dailyVip"},
			        {name:"passChests"},
			        {name:"missionReward"},
			        {name:"achievement"},
			        {name:"gm"},
			        {name:"mail"},
			        {name:"newGuide"},
			        {name:"pass"},
			        {name:"face"},
			        {name:"allFund"},
			        {name:"login"},
			        {name:"sign"},
			        {name:"lvReward"},
			        {name:"festivalBag"},
			        {name:"activityRecharge"},
			        {name:"activityCost"}
			     ]
		}),
		proxy : new Ext.data.HttpProxy({
			url:'moneyAnalyze.do?method=findallMoney'
		})
//		baseParams:{"beginTime":Ext.getCmp('beginTime').getValue(),"endTime":Ext.getCmp('endTime').getValue()}
	});
	
	var toolbarUser = new Ext.Toolbar({
		width:'100%'
	}); 
	
	var toolbarUser = new Ext.Toolbar({
		width:'100%'
	}); 
	
	var outcolumnArr = [
	            		{header:'时间',width:'10%',dataIndex:'date',sortable:true},
	            		{header:'PVP搜索',width:100,dataIndex:'pvpHunt',sortable:true},
	            		{header:'道具合成',width:100,dataIndex:'compound',sortable:true},
	            		{header:'转生',width:100,dataIndex:'reincarnation',sortable:true},
	            		{header:'商城购买',width:100,dataIndex:'mallBuy',sortable:true},
	            		{header:'变身',width:100,dataIndex:'shapeshifting',sortable:true},
	            		{header:'家私升级',width:100,dataIndex:'furniture',sortable:true},
	            		{header:'技能升级',width:100,dataIndex:'skill',sortable:true},
	            		{header:'修改头像',width:100,dataIndex:'changeIcon',sortable:true},
	            		{header:'角色装备升级',width:100,dataIndex:'equipment',sortable:true},
	            		{header:'娃娃屋',width:100,dataIndex:'dollhouse',sortable:true},
	            		{header:'刷新角色属性加点',width:105,dataIndex:'attribute',sortable:true},
	            		{header:'代付',width:100,dataIndex:'payforAnother',sortable:true},
	            		{header:'竞技场',width:100,dataIndex:'arena',sortable:true},
	            		{header:'洗练刷新',width:100,dataIndex:'refresh',sortable:true}
	            	];
	var outcolums = new Ext.grid.ColumnModel(outcolumnArr);
	var incolumnArr = [
	           		{header:'时间',width:80,dataIndex:'date',sortable:true},
	        		{header:'任务奖励',width:100,dataIndex:'missionReward',sortable:true},
	        		{header:'商城购买',width:100,dataIndex:'mallBuy',sortable:true},
	        		{header:'购买金币',width:100,dataIndex:'buyGold',sortable:true},
	        		{header:'GM后台发放',width:100,dataIndex:'gm',sortable:true},
	        		{header:'邮件',width:100,dataIndex:'mail',sortable:true},
	        		{header:'新手引导',width:100,dataIndex:'newGuide',sortable:true},
	        		{header:'通关',width:100,dataIndex:'pass',sortable:true},
	        		{header:'通关宝箱',width:100,dataIndex:'passChests',sortable:true},
	           		{header:'出售物品',width:100,dataIndex:'sell',sortable:true},
	        		{header:'活动基金全服',width:100,dataIndex:'allFund',sortable:true},
	        		{header:'充值活动',width:100,dataIndex:'activityRecharge',sortable:true},
	        		{header:'消费活动',width:100,dataIndex:'activityCost',sortable:true},
	        		{header:'梦境之塔',width:100,dataIndex:'dream',sortable:true},
	        		{header:'开礼包',width:100,dataIndex:'openBag',sortable:true},
	        		{header:'竞技场排名奖励',width:100,dataIndex:'arenaRank',sortable:true},
	        		{header:'任务成就',width:100,dataIndex:'achievement',sortable:true},
	        		{header:'召唤兽转金币',width:100,dataIndex:'summoningMonster',sortable:true},
	        		{header:'重生',width:100,dataIndex:'rebirth',sortable:true},
	        		{header:'颜值等级奖励',width:100,dataIndex:'face',sortable:true},
	        		{header:'魔法屋',width:100,dataIndex:'magicHouse',sortable:true},
	        		{header:'活动VIP每日领取',width:100,dataIndex:'dailyVip',sortable:true},
	        		{header:'七天登录',width:100,dataIndex:'login',sortable:true},
	        		{header:'签到',width:100,dataIndex:'sign',sortable:true},
	        		{header:'等级奖励',width:100,dataIndex:'lvReward',sortable:true},
	        		{header:'节日礼包',width:100,dataIndex:'festivalBag',sortable:true},
	        		{header:'VIP礼包',width:100,dataIndex:'vipBag',sortable:true}
	        	]
	var incolums = new Ext.grid.ColumnModel(incolumnArr);
		
	
	var grid = new Ext.grid.GridPanel({
		title:'金币统计',
		frame:true,
		stripeRows:true,
		tortable:true,
		templates:Ext.grid.GridView.CellJson,
		loadMask: {msg:'正在加载数据，请稍候...'},
		tbar:[searchGold],
		store:storeUser,
		viewConfig: {columnsText:'显示列',sortAscText:'升序',sortDescText:'降序' },
		colModel:incolums
	});
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
