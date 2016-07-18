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
  		     }),"-",
			new Ext.form.TextField({
  		        id: 'playerName',
  		        name: 'playerName',
  		        fieldLabel: '玩家名',
  		        width: 150,
  		        value: '',
  		        allowBlank: true,
  		        emptyText: '玩家名'
  		    })
		)
			
			searchGold.add('-','订单状态:',
				    new Ext.form.ComboBox({
				        id:'payStatus',
				    	name:'payStatus',
				        width: 80,
				        store: new Ext.data.SimpleStore({
				            fields: ['id', 'name'],
				            data: window.payStatusMap.arr
				        }),
				        triggerAction: 'all',
				        valueField: 'id',
				        displayField: 'name',
				        editable: false,
				        mode: 'local',
				        forceSelection: true,
				        value: '-1',
				        allowBlank: false,
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
		var status = Ext.getCmp('payStatus').getValue();
		var serverId = Ext.getCmp('serverid').getValue();
		var beginTime = Ext.getCmp('beginTime').getValue();
		var endTime = Ext.getCmp('endTime').getValue();	
		var parnter = Ext.getCmp('parnterid').getValue();
		var params={"serverId":serverId,"target":"excel","beginTime":beginTime,"endTime":endTime,"status":status,"parnter":parnter};
		var url='statistics.do?method=showIncome&target=excel&' + Ext.urlEncode(params);
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
		var status = Ext.getCmp('payStatus').getValue();
		var serverId = Ext.getCmp('serverid').getValue();
		var beginTime = Ext.getCmp('beginTime').getValue();
		var endTime = Ext.getCmp('endTime').getValue();
		var parnter = Ext.getCmp('parnterid').getValue();
		var playerName = Ext.getCmp('playerName').getValue();
		storeUser.removeAll();
		storeUser.load({
			params:{"serverId":serverId,"beginTime":beginTime,"endTime":endTime,"status":status,"parnter":parnter,"playerName":playerName},

		});
		}		
	
	var storeUser = new Ext.data.Store({
//		autoLoad:true,
		reader:new Ext.data.JsonReader({
			root:"items",
            totalProperty: "results",
            fields: [
                {name: "id"},
                {name: "playerId"},
                {name: "serverId"},
                {name: "name"},
                {name: "channel"},
                {name: "diamond"},
                {name: "rmb"},
                {name: "status"},
                {name: "createTime"},
                {name: "payTime"},
                {name: "chargeTime"},
                {name: "payServerIp"},
                {name: "orderId"},
                {name: "mallId"}

            ]
		}),
		proxy : new Ext.data.HttpProxy({
			url:'statistics.do?method=showIncome'
		})
//		baseParams:{"beginTime":Ext.getCmp('beginTime').getValue(),"endTime":Ext.getCmp('endTime').getValue()}
	});
		
	
	var grid = new Ext.grid.GridPanel({
        title: '订单查询',
        frame: true,
        stripeRows: true,
        tortable: true,
        loadMask: {msg: '正在加载数据，请稍候...'},
        tbar: [searchGold],
        sm: sm,
        store: storeUser,
        viewConfig: {columnsText: '显示列', sortAscText: '升序', sortDescText: '降序'},
        columns: [//对应的列
            {header: '订单号 ', width: 100, dataIndex: 'id', sortable: true},
            {header: '商家订单号 ', width: 100, dataIndex: 'orderId', sortable: true},
            {header: '充值渠道 ', width: 100, dataIndex: 'channel', sortable: true},
            {header: '服务器ID ', width: 100, dataIndex: 'serverId', sortable: true},
            {header: '服务器ip ', width: 100, dataIndex: 'payServerIp', sortable: true},
            {header: '玩家ID ', width: 100, dataIndex: 'playerId', sortable: true},
            {header: '玩家名 ', width: 100, dataIndex: 'name', sortable: true},
            {
                header: '充值套餐 ',
                width: 100,
                dataIndex: 'mallId',
                sortable: true,
                renderer: function (value, metadata, record) {
                    var type = record.data.mallId;
                    return window.chargeIdMap.get(type);
                }
            },
            {header: '钻石 ', width: 100, dataIndex: 'diamond', sortable: true},
            {header: '人民币 ', width: 100, dataIndex: 'rmb', sortable: true},
            {header: '状态 ', width: 100, dataIndex: 'status', sortable: true},
            {header: '生成时间 ', width: 140, dataIndex: 'createTime', sortable: true},
            {header: '支付时间 ', width: 140, dataIndex: 'payTime', sortable: true},
            {header: '充值时间 ', width: 140, dataIndex: 'chargeTime', sortable: true},
        ],
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
