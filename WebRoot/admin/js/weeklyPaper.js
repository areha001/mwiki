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
	    	   triggerAction:'all', 
	    	   displayField:'text', 
	    	   valueField:'id', 
	    	   forceSelection:true,
	    	   editable: false,
	       })),"-",
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
		var beginTime = Ext.getCmp('beginTime').getValue();
		var endTime = Ext.getCmp('endTime').getValue();	
		var partnerId = Ext.getCmp('parnterid').getValue();
		console.log(endTime);
		var params={"target":"excel","beginTime":beginTime,"endTime":endTime,"parnter":partnerId};
		var url='weekly.do?method=findWeekly&target=excel&' + Ext.urlEncode(params);
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
		var partnerId = Ext.getCmp('parnterid').getValue();
		storeUser.load({
			params:{"beginTime":beginTime,"endTime":endTime,"parnter":partnerId},
			});
		}		
	
	var storeUser = new Ext.data.Store({
		reader:new Ext.data.JsonReader({
			root:"items",
			fields:[
			        {name:"channel"},
			        {name:"pay"},
			        {name:"payNum"},
			        {name:"ARPU"},
			        {name:"rate"},
			        {name:"activity"},
			        {name:"newAdd"}
			     ]
		}),
		proxy : new Ext.data.HttpProxy({
			url:'weekly.do?method=findWeekly',//点击进入
			//alert();
		}),
	});
	//加载
//	search();
	var toolbarUser = new Ext.Toolbar({
		width:'100%'
	}); 
	
	var grid = new Ext.grid.GridPanel({
		title:'运营周报',
		frame:true,
		stripeRows:true,
		tortable:true,
		loadMask: {msg:'正在加载数据，请稍候...'},
		tbar:[searchGold],
		store:storeUser,
		viewConfig: {columnsText:'显示列',sortAscText:'升序',sortDescText:'降序' },
		columns:[
				{header:'平台',width:'10%',dataIndex:'channel',sortable:true},
				{header:'付费',width:130,dataIndex:'pay',sortable:true},
				{header:'付费人数',width:130,dataIndex:'payNum',sortable:true},
				{header:'ARPU值',width:130,dataIndex:'ARPU',sortable:true},
				{header:'付费渗透率',width:130,dataIndex:'rate',sortable:true},
				{header:'活跃数',width:130,dataIndex:'activity',sortable:true},
				{header:'新增数',width:130,dataIndex:'newAdd',sortable:true}
		   ]
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
