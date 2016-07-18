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
		console.log(endTime);
		var params={"target":"excel","beginTime":beginTime,"endTime":endTime,"parnter":""};
		var url='income.do?method=findInComeDaily&target=excel&' + Ext.urlEncode(params);
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
		storeUser.load({
			params:{"beginTime":beginTime,"endTime":endTime,"parnter":""},
			});
		}		
	
	var storeUser = new Ext.data.Store({
		reader:new Ext.data.JsonReader({
			root:"items",
			fields:[
			        {name:"datatime"},
//			        {name:"android"},
			        {name:"ios"},
//			        {name:"xiaomi"},
//			        {name:"k360"},
			        {name:"quick"},
			        {name:"gp"},
			        {name:"xy"},
			        {name:"ky"},
			        {name:"as"},
			        {name:"hm"},
			        {name:"tbt"},
			        {name:"total"}
			     ]
		}),
		proxy : new Ext.data.HttpProxy({
			url:'income.do?method=findInComeDaily',//点击进入
			//alert();
		}),
	});
	//加载
//	search();
	var toolbarUser = new Ext.Toolbar({
		width:'100%'
	}); 
	
	var grid = new Ext.grid.GridPanel({
		title:'收入日报',
		frame:true,
		//stripeRows:true,
		tortable:true,
		loadMask: {msg:'正在加载数据，请稍候...'},
		tbar:[searchGold],
	//	sm:sm,
		store:storeUser,
		viewConfig: {columnsText:'显示列',sortAscText:'升序',sortDescText:'降序' },
		columns:[
				{header:'时间',width:'10%',dataIndex:'datatime',sortable:true},
//				{header:'安卓',width:130,dataIndex:'android',sortable:true},
				{header:'ios',width:130,dataIndex:'ios',sortable:true},
//				{header:'小米',width:130,dataIndex:'xiaomi',sortable:true},
//				{header:'华为',width:130,dataIndex:'huawei',sortable:true},
//				{header:'腾讯',width:130,dataIndex:'tx',sortable:true},
//				{header:'360',width:130,dataIndex:'k360',sortable:true},
				{header:'Quick测试',width:130,dataIndex:'quick',sortable:true},
				{header:'果盘',width:130,dataIndex:'gp',sortable:true},
				{header:'XY',width:130,dataIndex:'xy',sortable:true},
				{header:'快用',width:130,dataIndex:'ky',sortable:true},
				{header:'爱思',width:130,dataIndex:'as',sortable:true},
				{header:'海马',width:130,dataIndex:'hm',sortable:true},
				{header:'同步推',width:130,dataIndex:'tbt',sortable:true},
				{header:'合计',width:130,dataIndex:'total',sortable:true}
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
		        height: 400,
		        minSize: 75,         // defaults to 50
		        margins: '5 5 0 0',
		        items:[grid]
		    }]
		}]
	});
})
