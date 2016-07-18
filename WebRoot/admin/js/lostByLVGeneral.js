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


	var fieldNames = ['dateInterval','edition','serverId','lv','lost','lost_percent','createUserLost','createUserLost_percent'];

	var showTypeData = [['a','数据列表'],['i','图表']];
	var departNameStoreWithBlank = new Ext.data.SimpleStore({
		   fields:['dcode','text'],
		   data:serverData
	 });
	
	toolbar.add("开始日期",
	  		   new Ext.form.DateField({ 
	  			   	id:"startDt",
	  	            name:"startDt",  
	  	            editable:false, //不允许对日期进行编辑  
	  	            width:90,  
	  	            format:"Y-m-d",  
	  	           value:new Date().add(Date.DAY, -8),
	  	            emptyText:"选择开始日期"
	  	        }),"-","结束日期",
		  		   new Ext.form.DateField({ 
		  			   	id:"endDt",
		  	            name:"endDt",  
		  	            editable:false, //不允许对日期进行编辑  
		  	            width:90,  
		  	            format:"Y-m-d",  
		  	            value:new Date().add(Date.DAY, -5),
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
	  		  	   value:'',
	  		  	   allowBlank:true,
	  		  	   blankText:'请选择状态'
	  		     }),
	  		   "-","区服",
	  		     new Ext.form.ComboBox({
	  		    	 id:'serverId',
	  		    	 width:150,
	  		  	   store:departNameStoreWithBlank,
	  		  	   triggerAction:'all',
	  		  	   valueField:'dcode',
	  		  	   displayField:'text',
	  		  	   editable:false,
	  		  	   mode:'local',
	  		  	   value:'',
	  		  	   forceSelection:true,
	  		  	   allowBlank:true,
	  		  	   blankText:'请选择状态'
	  		     }),
	  		   "-",
	 			new Ext.Button({
	 				text:'查询',
	 				iconCls:'findButton',
	 				handler:search
	 			}),'-',
				 new Ext.Button({
						iconCls:'editButton',
						text: '导出下方表格',
						handler:function(){
							var startDt = Ext.getCmp('startDt').getValue();
							var endDt = Ext.getCmp('endDt').getValue();
							var edition = Ext.getCmp('edition').getValue();
							var serverId = Ext.getCmp('serverId').getValue();
							var param = {startDt:startDt,endDt:endDt, edition:edition, serverId:serverId};
							var url='lostByLVAnalyze.do?method=generalData&target=excel&' + Ext.urlEncode(param);
							window.open(url);
						}
				 })
	); 
	
	var storeConfig = {
			proxy:new Ext.data.HttpProxy({url:'lostByLVAnalyze.do?method=generalData'}),
			reader:new Ext.data.JsonReader({
				root:"items",
				totalProperty:"results",
				fields:fieldNames
			})
		};
	var beforeloadCallback = function(s, options){
		var startDt = Ext.getCmp('startDt').getValue();
		var endDt = Ext.getCmp('endDt').getValue();
		var edition = Ext.getCmp('edition').getValue();
		var serverId = Ext.getCmp('serverId').getValue();
		var param = {startDt:startDt,endDt:endDt, edition:edition, serverId:serverId};
		Ext.apply(store.baseParams, param);
		Ext.apply(p_store.baseParams, param);
	}
	p_store = new Ext.data.Store(storeConfig);
	store = new Ext.data.Store(storeConfig);
	store.on('beforeload', beforeloadCallback);
	p_store.on('beforeload', beforeloadCallback);
	
	var summary = new Ext.ux.grid.GridSummary();
	var percentRender = function(value){if(value=="" || value=="-") return value; return value+"%"}
	window.kkk = store;
	var grid = new Ext.grid.GridPanel({
		title:window.title,
		frame:true,
		stripeRows:true,
		tortable:true,
		loadMask: {msg:'正在加载数据，请稍候...'},
		store:store,
		viewConfig: {columnsText:'显示列',sortAscText:'升序',sortDescText:'降序' },
		columns:[//对应的列
			     {header:'日期',width:150,dataIndex:'dateInterval',sortable:true, summaryRenderer: function (v, params, data) { return '合计'; }},
			   
			     {header:'版本',width:100,dataIndex:'edition',sortable:true, renderer: function(value){
			    	 if(value == 'a'){return "android"}
			    	 else if(value == 'i'){return "ios正版"}
			    	 else if(value == 'o'){return "ios越狱"}
			    	 else{return "所有"}
			     }},
			     {header:'区服',width:100,dataIndex:'serverId',sortable:true, renderer: function(value){
			    	 if(value == ''){return '所有'}
			    	 else{
			    		 return serverMap[value];
			    	 }
			     }},
		         {header:'等级',width:150,dataIndex:'lv',sortable:true},
		         {header:'流失用户',width:150,dataIndex:'lost',summaryType: 'sum',sortable:true},
		         {header:'比例',width:150,dataIndex:'lost_percent',sortable:true, renderer:Ext.piggy.percentRender},
		         {header:'流失创角用户数',width:150,dataIndex:'createUserLost',summaryType: 'sum',sortable:true},
		         {header:'比例',width:150,dataIndex:'createUserLost_percent',sortable:true, renderer:Ext.piggy.percentRender},
		     
		],
		 plugins: summary
	});
	
	function search(){
		store.reload();
		p_store.reload({params:{start:0,limit:2}});
	};	
	
	var columnchart1 =new Ext.chart.BarChart ({
		url : '../js/ext-3.3.1/resources/charts.swf',
		title: '流失用户',
		xtype: 'barChart',
		store: p_store,
		xField: 'lost',
		yField: 'lv',
		tipRenderer  : function(chart, record, index, series){ 
			return "等级：" + record.data.lv + "\n" + "流失用户数：" + record.data.lost
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
	
	
	
	var columnchart2 =new Ext.chart.BarChart ({
		url : '../js/ext-3.3.1/resources/charts.swf',
		title: '流失创角用户',
		xtype: 'barChart',
		store: p_store,
		xField: 'createUserLost',
		yField: 'lv',
		tipRenderer  : function(chart, record, index, series){ 
//			return series.yField + ":" + series.data[index][series.yField]+ "\n" + 
//			series.data[index][chart.xField] + "  " + series.data[index]["week"]
			return "等级：" + record.data.lv + "\n" + "流失创角用户：" + record.data.createUserLost
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
	new Ext.Viewport({
		layout: 'border',
		items:[ 
		       {    //剧中的容器
		    	   title:"",
		    	   region:"center",tbar:[toolbar],
		    	   border:false,
		    	   layout:"fit",
		    	   bodyBorder:false,
		    	   items:[{
		    		   layout: 'border',
		    		   height: '100%',
		    		   items:[
		    		          {
		    		        	  title:"表格<span style='float:right;margin-right:5px;'>图表切换</span>",
		    		        	  region:"north",
		    		        	  border:false,
		    		        	  height:800,
		    		        	  layout:"fit",
		    		        	  split:true,
		    		        	  items:[grid],
		    		        	  plugins: [Ext.ux.PanelCollapsedTitle],
		    		        	  titleCollapse : true,
		    		        	  collapsible:true
//		    		        	  listeners : { 
//		    		        	  render : function(p) {
//		    		        		  var tool = p.header.child('.x-tool');
//		    		        		  tool.setStyle('position', 'absolute');
//		    		        		  tool.setStyle("left", '80');
//		    		        		  },
//		    		        		  expand : function(p) {
//		    		        		  var tool = p.header.child('.x-tool');
//		    		        		  tool.setStyle('position', 'absolute');
//		    		        		  tool.setStyle("left", '80');
//		    		        		  },
//		    		        		  collapse : function(p) {
//		    		        		  var tool = p.el.parent('.x-window-body').child('.x-tool-expand-west');
//		    		        		  tool.setStyle('position', 'absolute');
//		    		        		  tool.setStyle("top", '80');
//		    		        		  }
//		    		        	 }
		    		          },
//		    		          {
//		    		        	  title:"图表",
//		    		        	  region:"center",
//		    		        	  height:700,
//		    		        	  border:false,
//		    		        	  items:[{
//		    		        		  	title:"用户",
//		    					        region:"west",
//		    					        height: 400,
//		    					        width:200,
//		    					        collapsible:false, 
//		    					        items:[columnchart1]
//		    		        	  },{title:"ss",
//		    					        region:"center",
//		    					        height: 400,
//		    					        width:10,
//		    					        collapsible:false, 
//		    					        items:[{html:""}]
//		    		        	  },
//		    					  {
//		    		        		  title:"创角用户",
//		    					        region:"east",
//		    					        height: 400,
//		    					        width:200,
//		    					        collapsible:false, 
//		    					        items:[columnchart2]
//		    		        	  }]
//		    		          }
		    		          {
		    		        	  	id:'pn',  
		    		        	    title:"图表",    
		    		        	    region:"center",
		    		        	    width:800,  
		    		        	    height:700,  
		    		        	    layout:"table",   
		    		        	    bodyStyle:'padding:10 10 10 10;overflow-x:scroll; overflow-y:scroll', 
		    		        	    layoutConfig:{  
		    		        	        columns:2  
		    		        	    },  
		    		        	    defaults:{  
		    		        	        height:500,  
		    		        	        width:600,  
		    		        	        frame:true  
		    		        	    },  
		    		        	    bbar:new Ext.PagingToolbar({
		    		        			pageSize:2,  
		    		        			store:p_store,
		    		        			beforePageText:"当前第",  
		    		        			afterPageText:"页",  
		    		        			lastText:"尾页",  
		    		        			nextText :"下一页",  
		    		        			prevText :"上一页",  
		    		        			firstText :"首页",  
		    		        			refreshText:"刷新页面",  
		    		        			displayInfo: true,  
		    		        			emptyMsg:'<span style="color:#414141;font-weight:bold;">当前没有任何数据</span>',
		    		        			displayMsg:"当前显示 {0} - {1}条, 共 {2}"
		    		        		}),
		    		        	    items:[  
		    		        	        {
		    		        	        	title:"用户",
		    		        	        	region:"west",
		    		        	        	height: 570,
		    		        	        	width:600,
		    		        	        	collapsible:false, 
		    		        	        	items:[columnchart1]
		    		        	        },  
		    		        	        {
		    		        	        	title:"创角用户",
				    					    region:"east",
				    					    height: 570,
				    					    width:600,
				    					    collapsible:false, 
				    					    items:[columnchart2]
				    		        	  }
		    		        	    ] 
		    		          }
		    		   ]
		    	   }]
		       }
		       ]
	}
	);
	
	p_store.load({params:{start:0,limit:2}});
	store.load({callback:function(){
	
	}});
	
});