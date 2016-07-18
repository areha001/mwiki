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
		var url='diamondAnalyze.do?method=findallDiamond&target=excel&' + Ext.urlEncode(params);
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
			        {name:"buyEnegry"},
			        {name:"buyFund"},
			        {name:"mallBuy"},
			        {name:"buyFashion"},
			        {name:"createUnion"},
			        {name:"changeNickname"},
			        {name:"changeIcon"},
			        {name:"changeName"},
			        {name:"dollhouse"},
			        {name:"magicHouse"},
			        {name:"vipBag"},
			        {name:"payforAnother"},
			        {name:"arena"},
			        {name:"arenaPay"},
			        {name:"loot"},
			        {name:"resurgence"},
			        {name:"overtype"},
			        {name:"rebirth"},
			        {name:"unlock"},
			        {name:"makesure"},
			        {name:"refresh"},
			        {name:"summoningMonster"},
			        {name:"cleanTime"},
			        {name:"resetCopy"},
			        {name:"missionReward"},
			        {name:"recharge"},
			        {name:"gm"},
			        {name:"mail"},
			        {name:"newGuide"},
			        {name:"pass"},
			        {name:"fund"},
			        {name:"allFund"},
			        {name:"totalRecharge"},
			        {name:"totalCost"},
			        {name:"arenaFight"},
			        {name:"copy"},
			        {name:"login"},
			        {name:"sign"},
			        {name:"lvReward"},
			        {name:"festivalBag"},
			        {name:"activityRecharge"},
			        {name:"activityCost"}
			     ]
		}),
		proxy : new Ext.data.HttpProxy({
			url:'diamondAnalyze.do?method=findallDiamond'
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
	            		{header:'购买金币',width:80,dataIndex:'buyGold',sortable:true},
	            		{header:'购买体力',width:80,dataIndex:'buyEnegry',sortable:true},
	            		{header:'购买基金',width:80,dataIndex:'buyFund',sortable:true},
	            		{header:'商城购买',width:80,dataIndex:'mallBuy',sortable:true},
	            		{header:'时装购买',width:80,dataIndex:'buyFashion',sortable:true},
	            		{header:'创建联盟',width:80,dataIndex:'createUnion',sortable:true},
	            		{header:'更换昵称',width:80,dataIndex:'changeNickname',sortable:true},
	            		{header:'修改头像',width:80,dataIndex:'changeIcon',sortable:true},
	            		{header:'修改名字',width:80,dataIndex:'changeName',sortable:true},
	            		{header:'娃娃屋',width:80,dataIndex:'dollhouse',sortable:true},
	            		{header:'魔法屋',width:80,dataIndex:'magicHouse',sortable:true},
	            		{header:'VIP礼包',width:80,dataIndex:'vipBag',sortable:true},
	            		{header:'代付',width:80,dataIndex:'payforAnother',sortable:true},
	            		{header:'竞技场',width:80,dataIndex:'arena',sortable:true},
	            		{header:'竞技场付费',width:80,dataIndex:'arenaPay',sortable:true},
	            		{header:'PVP抢夺',width:80,dataIndex:'loot',sortable:true},
	            		{header:'PVE复活',width:80,dataIndex:'resurgence',sortable:true},
	            		{header:'PVE重打',width:80,dataIndex:'overtype',sortable:true},
	            		{header:'重生',width:80,dataIndex:'rebirth',sortable:true},
	            		{header:'洗练属性解锁',width:80,dataIndex:'unlock',sortable:true},
	            		{header:'洗练确定',width:80,dataIndex:'makesure',sortable:true},
	            		{header:'洗练刷新',width:80,dataIndex:'refresh',sortable:true},
	            		{header:'召唤兽刷新',width:80,dataIndex:'summoningMonster',sortable:true},
	            		{header:'清除PVP等待时间',width:100,dataIndex:'cleanTime',sortable:true},
	            		{header:'重置精英副本',width:80,dataIndex:'resetCopy',sortable:true}
	            	];
	var outcolums = new Ext.grid.ColumnModel(outcolumnArr);
	var incolumnArr = [
	           		{header:'时间',width:80,dataIndex:'date',sortable:true},
	        		{header:'任务奖励',width:80,dataIndex:'missionReward',sortable:true},
	        		{header:'充值',width:80,dataIndex:'recharge',sortable:true},
	        		{header:'GM后台发放',width:80,dataIndex:'gm',sortable:true},
	        		{header:'邮件',width:80,dataIndex:'mail',sortable:true},
	        		{header:'新手引导',width:80,dataIndex:'newGuide',sortable:true},
	        		{header:'通关宝箱',width:80,dataIndex:'pass',sortable:true},
	           		{header:'活动基金个人',width:80,dataIndex:'fund',sortable:true},
	        		{header:'活动基金全服',width:80,dataIndex:'allFund',sortable:true},
	        		{header:'充值活动',width:80,dataIndex:'activityRecharge',sortable:true},
	        		{header:'消费活动',width:80,dataIndex:'activityCost',sortable:true},
	        		{header:'活动累计充值',width:80,dataIndex:'totalRecharge',sortable:true},
	        		{header:'活动累计消费',width:80,dataIndex:'totalCost',sortable:true},
	        		{header:'竞技场挑战奖励',width:100,dataIndex:'arenaFight',sortable:true},
	        		{header:'星座副本',width:80,dataIndex:'copy',sortable:true},
	        		{header:'七天登录',width:80,dataIndex:'login',sortable:true},
	        		{header:'签到',width:80,dataIndex:'sign',sortable:true},
	        		{header:'等级奖励',width:80,dataIndex:'lvReward',sortable:true},
	        		{header:'节日礼包',width:80,dataIndex:'festivalBag',sortable:true},
	        		{header:'VIP礼包',width:80,dataIndex:'vipBag',sortable:true}
	        	]
	var incolums = new Ext.grid.ColumnModel(incolumnArr);
		
	
	var grid = new Ext.grid.GridPanel({
		title:'钻石统计',
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
