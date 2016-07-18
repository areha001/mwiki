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


	var hashKeyArr = ['xdate','week','game','edition','serverId','lv','active','percent']
	var fieldNames = [];


	var departNameStoreWithBlank = new Ext.data.SimpleStore({
		   fields:['dcode','text'],
		   data:serverData
	 });
	toolbar.add("日期",
	  		   new Ext.form.DateField({ 
	  			   	id:"start",
	  	            name:"start",  
	  	            editable:false, //不允许对日期进行编辑  
	  	            width:90,  
	  	            format:"Y-m-d",  
	  	           value:new Date().add(Date.DAY, -1),
	  	            emptyText:"选择开始日期"
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
	  		  	   value:'',
	  		  	   allowBlank:true,
	  		  	   blankText:'请选择状态'
	  		     }), "-","区服",
	  		     new Ext.form.ComboBox({
	  		    	 id:'serverId',
	  		    	 width:150,
	  		  	   store:departNameStoreWithBlank,
	  		  	   triggerAction:'all',
	  		  	   fieldLabel:'区服',
	  		  	   valueField:'dcode',
	  		  	   displayField:'text',
	  		  	   editable:false,
	  		  	   mode:'local',
	  		  	   forceSelection:true,
	  		  	   value:checkServ,
	  		  	   allowBlank:true,
	  		  	   blankText:'请选择状态'
	  		     }),"-","等级",
			      new Ext.form.TextField({  
		                id:'lv',  
		                selectOnFocus:true                 
		            }),"-",
		  		   
	 			new Ext.Button({
	 				text:'查询',
	 				iconCls:'findButton',
	 				handler:search
	 			}),'-',
				 new Ext.Button({
						iconCls:'editButton',
						text: '导出下方表格',
						handler:function(){
							var start = Ext.getCmp('start').getValue();
							var edition = Ext.getCmp('edition').getValue();
							var serverId = Ext.getCmp('serverId').getValue();
							var lv = Ext.getCmp('lv').getValue();
							var param = {start:start, edition:edition, serverId:serverId, lv:lv};
							var url='activeByLVAnalyze.do?method=generalData&target=excel&' + Ext.urlEncode(param);
							window.open(url);
						}
				 })
	
	); 
	
	function search(){
		store.load({callback:function(){
			//refreshChart(selectedLine);
		}});
	};
	Ext.each(hashKeyArr, function(i){
		fieldNames.push({name:i});
	})	
	store = new Ext.data.Store({
		proxy:new Ext.data.HttpProxy({url:'activeByLVAnalyze.do?method=generalData'}),
		reader:new Ext.data.JsonReader({
			root:"items",
			totalProperty:"results",
			fields:fieldNames
		})
	});
	store.on('beforeload', function(s, options){
		var start = Ext.getCmp('start').getValue();
		var edition = Ext.getCmp('edition').getValue();
		var serverId = Ext.getCmp('serverId').getValue();
		var lv = Ext.getCmp('lv').getValue();
		var param = {start:start, edition:edition, serverId:serverId, lv:lv};
		Ext.apply(store.baseParams, param);
	});
	var dateRenderer = function(value){
	   	 if(value!=null){
	  	   return Ext.util.Format.date(new Date(value.time),'Y-m-d H:i:s');
	  	 }else{
	  		 return "";
	  	 }
   };
	var sm = new Ext.grid.CheckboxSelectionModel();         //定义选择模式
	var lineChart =  new Ext.chart.ColumnChart ({
		url : '../js/ext-3.3.1/resources/charts.swf',
		title: '活跃用户数',
		xtype: 'columnchart',
		store: store,
		xField: 'lv',
		yField: 'active',
		tipRenderer  : function(chart, record, index, series){ 
//			return series.yField + ":" + series.data[index][series.yField]+ "\n" + 
//			series.data[index][chart.xField] + "  " + series.data[index]["week"]
			return "等级：" + record.data.lv + "\n" + "活跃用户数：" + record.data.active
//			window.ccc = chart;
//			window.rrr = record;
//			window.iii =index;
//			window.sss = series;
		},
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

	


	var summary = new Ext.ux.grid.GridSummary();
	var percentRender = function(value){if(value=="" || value=="-") return value; return value+"%"}
	var grid = new Ext.grid.GridPanel({
		title:window.title,
		frame:true,
		stripeRows:true,
		tortable:true,
		loadMask: {msg:'正在加载数据，请稍候...'},
		store:store,
		viewConfig: {columnsText:'显示列',sortAscText:'升序',sortDescText:'降序' },
		columns:[//对应的列
			     {header:'日期',width:100,dataIndex:'xdate',sortable:true, summaryRenderer: function (v, params, data) { return '合计'; }},
			     {header:'星期',width:100,dataIndex:'week',sortable:true},
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
			     }},
		         {header:'等级',width:150,dataIndex:'lv',sortable:true},
		         {header:'活跃用户数',width:150,dataIndex:'active',summaryType: 'sum',sortable:true},
		         {header:'用户比例',width:150,dataIndex:'percent', sortable:true, renderer:percentRender}
		       
		],
		 plugins: summary
	});
	

	new Ext.Viewport({
		layout: 'border',
		items:[
		       {
			        title:"综合数据",
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
	store.load({callback:function(){
		//refreshChart(selectedLine);
	}});
	
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