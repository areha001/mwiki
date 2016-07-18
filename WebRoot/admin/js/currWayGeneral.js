Ext.onReady(function(){

	Ext.BLANK_IMAGE_URL = "../js/ext-3.3.1/resources/images/default/s.gif";
	
	Ext.QuickTips.init();    //初始化信息提示
	Ext.form.Field.prototype.msgTarget = "qtip";//统一指定错误信息提示方式
	
	Ext.Msg.buttonText.yes = "确定";
	Ext.Msg.buttonText.ok = "确定";
	Ext.Msg.buttonText.cancel = "取消";
	Ext.Msg.buttonText.no = "取消";
	var DefaultLimitSize = 20;
	//定义菜单选择项
	var toolbar = new Ext.Toolbar({
		width:'100%'
	});
	

	var departNameStoreWithBlank = new Ext.data.SimpleStore({
		   fields:['dcode','text'],
		   data:serverData
	 });
	toolbar.add("开始日期",
			  new Ext.form.DateField({ 
	  			   	id:"start",
	  	            name:"start",  
	  	            editable:false, //不允许对日期进行编辑  
	  	            width:90,  
	  	            format:"Y-m-d",  
	  	          value:esparams.esStart,
	  	            emptyText:"选择开始日期"
	  	        }),"-","结束日期",
		  		   new Ext.form.DateField({ 
		  			   	id:"end",
		  	            name:"end",  
		  	            editable:false, //不允许对日期进行编辑  
		  	            width:90,  
		  	            format:"Y-m-d",  
		  	          value:esparams.esEnd,
		  	            emptyText:"选择结束日期"  
		  	        }),
		  	      "-","版本",
	  		     new Ext.form.ComboBox({
	  		    	 id:'edition',
	  		    	 width:120,
	  		  	   store:editionStoreData,
	  		  	   triggerAction:'all',
	  		  	   fieldLabel:'版本',
	  		  	   valueField:'id',
	  		  	   displayField:'text',
	  		  	   editable:false,
	  		  	   mode:'local',
	  		  	   forceSelection:true,
	  		     value:esparams.esEdition,
	  		  	   allowBlank:true,
	  		  	   blankText:'请选择状态'
	  		     }),
	  		   "-","区服",
	  		     new Ext.form.ComboBox({
	  		    	 id:'serverId',
	  		    	 width:150,
	  		  	   store:departNameStoreWithBlank,
	  		  	   triggerAction:'all',
	  		  	   fieldLabel:'渠道',
	  		  	   valueField:'dcode',
	  		  	   displayField:'text',
	  		  	   editable:false,
	  		  	   mode:'local',
	  		  	   forceSelection:true,
	  			   value:esparams.esServer,
	  		  	   allowBlank:true,
	  		  	   blankText:'请选择状态'
	  		     }),
	  		   "-","货币",
	  		     new Ext.form.ComboBox({
	  		    	 id:'currType',
	  		    	 width:120,
	  		  	   store:currStoreData,
	  		  	   triggerAction:'all',
	  		  	   fieldLabel:'货币',
	  		  	   valueField:'id',
	  		  	   displayField:'text',
	  		  	   editable:false,
	  		  	   mode:'local',
	  		  	   forceSelection:true,
	  			   value:esparams.esCurrType,
	  		  	   allowBlank:true,
	  		  	   blankText:'请选择状态'
	  		     }),
	  		   "-","类型",
	  		     new Ext.form.ComboBox({
	  		    	 id:'wayType',
	  		    	 width:120,
	  		  	   store:wayTypeStoreData,
	  		  	   triggerAction:'all',
	  		  	   fieldLabel:'类型',
	  		  	   valueField:'id',
	  		  	   displayField:'text',
	  		  	   editable:false,
	  		  	   mode:'local',
	  		  	   forceSelection:true,
	  			   value:esparams.esWayType,
	  		  	   allowBlank:true,
	  		  	   blankText:'请选择类型'
	  		     }),
	 			new Ext.Button({
	 				text:'查询',
	 				iconCls:'findButton',
	 				handler:search
	 			}),
	  		  '-',
				 new Ext.Button({
						iconCls:'editButton',
						text: '导出下方表格',
						handler:function(){
							var start = Ext.getCmp('start').getValue();
							var end = Ext.getCmp('end').getValue();
							var edition = Ext.getCmp('edition').getValue();
							var serverId = Ext.getCmp('serverId').getValue();
							var currType = Ext.getCmp('currType').getValue();
							var wayType = Ext.getCmp('wayType').getValue();
							var param = {start:start,end:end, edition:edition, serverId:serverId, currType:currType, wayType:wayType};
							var url='currWayAnalyze.do?method=generalData&target=excel&' + Ext.urlEncode(param);
							window.open(url);
						}
				 })
	); 
	
	function search(){
		var start = Ext.getCmp('start').getValue();
		var end = Ext.getCmp('end').getValue();
		var edition = Ext.getCmp('edition').getValue();
		var serverId = Ext.getCmp('serverId').getValue();
		var currType = Ext.getCmp('currType').getValue();
		var wayType = Ext.getCmp('wayType').getValue();
		var param = {start:start,end:end, edition:edition, serverId:serverId, currType:currType, wayType:wayType};
		window.location.href='currWayAnalyze.do?method=listPage&' + Ext.urlEncode(param);

	};
	var fieldNames = [];
	fieldNames.push("dateInterval");
	fieldNames.push("edition");
	fieldNames.push("game");
	fieldNames.push("serverId");
	fieldNames.push("currType");
	fieldNames.push("action");
	fieldNames.push("retval");
	fieldNames.push("percent");
	
	store = new Ext.data.Store({
		data:storeData ,
		reader:new Ext.data.JsonReader({
			root:"data",
			fields:fieldNames
		})
	});
	var dateRenderer = function(value){
	   	 if(value!=null){
	  	   return Ext.util.Format.date(new Date(value.time),'Y-m-d H:i:s');
	  	 }else{
	  		 return "";
	  	 }
   };
	var sm = new Ext.grid.CheckboxSelectionModel();         //定义选择模式
	
	var dymanicGrid = function(renderTo){
		if(store.data.length == 0){
			return  new Ext.grid.GridPanel({
				title:window.title,
				frame:true,
				stripeRows:true,
				tortable:true,
				loadMask: {msg:'正在加载数据，请稍候...'},
				store:store,
				viewConfig: {columnsText:'显示列',sortAscText:'升序',sortDescText:'降序' },
				columns:[//对应的列
					     {header:'日期',width:100,dataIndex:'xdate',sortable:true},
					     {header:'游戏',width:100,dataIndex:'game',sortable:true,renderer:function(){return "大战略"}},
					     {header:'版本',width:100,dataIndex:'edition',sortable:true, renderer: function(value){
					    	 if(value == 'a'){return "android"}
					    	 else if(value == 'i'){return "ios正版"}
					    	 else if(value == 'o'){return "ios越狱"}
					    	 else{return "所有"}
					     }},
					     {header:'区服',width:100,dataIndex:'serverId',sortable:true, renderer: function(value){
					    	 if(value == ''){
					    		 return "所有"
					    	 }else{
					    		 return serverMap[value]
					    	 }
					     }}]
			})
		}
		var summary = new Ext.ux.grid.GridSummary();
		var percentRender = function(value){if(value=="" || value=="-") return value; return value+"%"};
		return new Ext.grid.GridPanel({
			title:window.title,
			renderTo:renderTo,
			frame:true,
			stripeRows:true,
			height:1000,
			tortable:true,
			loadMask: {msg:'正在加载数据，请稍候...'},
			store:store,
			viewConfig: {columnsText:'显示列',sortAscText:'升序',sortDescText:'降序' },
			columns:[//对应的列
				     {header:'日期',width:160,dataIndex:'dateInterval',sortable:true, summaryRenderer: function (v, params, data) { return '合计'; }},
				   
				     {header:'游戏',width:100,dataIndex:'game',sortable:true,renderer:function(){return "大战略"}},
				     {header:'版本',width:100,dataIndex:'edition',sortable:true, renderer: function(value){
				    	 if(value == 'a'){return "android"}
				    	 else if(value == 'i'){return "ios正版"}
				    	 else if(value == 'o'){return "ios越狱"}
				    	 else{return "所有"}
				     }},
				     {header:'区服',width:100,dataIndex:'serverId',sortable:true, renderer: function(value){
				    	 //alert(value);
				    	 window.jjj = value;
				    		 return serverMap[value]
				     }},
				     {header:'货币',width:100,dataIndex:'currType',sortable:true, renderer: function(value){
				    	 if(value == 'money'){return "金币"}
				    	 else if(value == 'gold'){return "钻石"}
				    	 else if(value == 'honor'){return "声望"}
				    	 else{return "所有"}
				     }},
			         {header:cols[0],width:150,dataIndex:'action',sortable:true},
			         {header:cols[1],width:150,dataIndex:'retval',summaryType: 'sum',sortable:true},
			         {header:cols[2],width:150,dataIndex:'percent',sortable:true,renderer:percentRender}
			],
			 plugins: summary
		});
	}
	
	var dymanicChart = function(data){
		var mseries = [];
		var i = 0;
		var color = ["5555e0","#e05555","55e055","e0e055","55e0e0","e055e0"];
		if(store.data.length==0)
			return new Ext.Panel();
		return new Ext.chart.ColumnChart ({
			url : '../js/ext-3.3.1/resources/charts.swf',
			title: '生产消耗',
			xtype: 'columnchart',
			store: store,
			xField: 'action',
			yField: 'retval',
			chartStyle: {
	                dataTip: {
	                    padding: 3
	                    ,font: {
	                         family: 'Tahoma'
	                        ,size: 12
	                        ,bold: true
	                    }
	                }
	        }
	      
	});
	}
	var lineChart = dymanicChart();
	window.aa = store;
	var grid = dymanicGrid();
	var refreshGrid = function(){
		var pid = grid.getEl().dom.parentNode.id;
		var gridNext = dymanicGrid(pid);
		grid.destroy();
		grid = gridNext;
	}
	

	
	new Ext.Viewport({
		layout: 'border',
		items:[
		       {
			        title:"在线统计",
			        region:"north",
			        height: 300,tbar:[toolbar],
			        collapsible:true, 
			        items:[lineChart]
			    },
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
	
	
	var hmenu = grid.view.grid.view.hmenu;
	hmenu.add({
		checked: true,
		itemId: 'filters',
		text: "全选/全不选",
		menu: this.filterMenu,
		handler:function(){
			for(var i=1; i<grid.colModel.config.length; i++){
				grid.colModel.setHidden(i,this.checked)
			}
		}
	});
});