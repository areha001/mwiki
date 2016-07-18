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
	var selectedLine = ['LoseUserCount','ReturnUserCount','LoseUserPercent',
		                  'LosePayUserCount','LosePayPercent',
		                  'LoseCreateUserCount','LoseCreateUserPercent'];


	var hashKeyArr = ['xdate','week','edition','serverId','LoseUserCount','ReturnUserCount','LoseUserPercent',
	                  'LosePayUserCount','LosePayPercent',
	                  'LoseCreateUserCount','LoseCreateUserPercent']
	var fieldNames = ['流失用户数','回流用户数','流失率','流失付费用户数','付费用户流失率','流失创角用户数','创角用户流失率'];
	var keyName = [];
	var hashkeyMap = {};
	for(var i=4; i< hashKeyArr.length; i++){
		keyName.push([hashKeyArr[i], fieldNames[i-4]]);
		hashkeyMap[hashKeyArr[i]] = fieldNames[i-4]
	}
	

	var collectStore = function(superStore, key, subKey, v, reverse){
		var cols = [key];
		var newStoreHash = {}
		Ext.each(v, function(i){
			collectSingle(superStore, key, subKey, i, cols, newStoreHash, reverse);
		})
		var arr = [];
		var xkeySort = []
		for(var x in newStoreHash){
			xkeySort.push(x);
		}
		for(i=0; i < xkeySort.length; i++){ 
			 for(j=xkeySort.length-1;j>=1;j--){
				if(xkeySort[j] < xkeySort[j-1]){ 
					tmp = xkeySort[j]; 
					xkeySort[j] = xkeySort[j-1]; 
					xkeySort[j-1] = tmp; 
				} 
			}
		}
		Ext.each(xkeySort, function(x){
			newStoreHash[x][key] = x;
			arr.push(newStoreHash[x]);
		});
		
		var chartCol = [];
		Ext.each(cols, function(i){ 
			if(i!= key && i!=reverse){
				chartCol.push(i);
			}
		})
		return [chartCol, new Ext.data.JsonStore({
				fields:cols,
				data: arr
		})];
	}
	var collectSingle = function(superStore, xkey, subKey, singlev, cols, g, reverse){
		Ext.each(superStore.data.items, function(e){
			var ee = e.data;
			var k = g[ee[xkey]];
			if(!k){ 
				k = {};
				g[ee[xkey]] = k;
				k[reverse] = ee[reverse];
			}
			var newKey = serverMap[ee[subKey]] +"_" + hashkeyMap[singlev];
			k[newKey] = ee[singlev];
			if(cols.indexOf(newKey)<0){
				cols.push(newKey);
			}
			if(cols.indexOf(reverse)<0){
				cols.push(reverse);
			}
		})
	}
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
	  	           value:new Date().add(Date.DAY, -30),
	  	            emptyText:"选择开始日期"
	  	        }),"-","结束日期",
		  		   new Ext.form.DateField({ 
		  			   	id:"end",
		  	            name:"end",  
		  	            editable:false, //不允许对日期进行编辑  
		  	            width:90,  
		  	            format:"Y-m-d",  
		  	            value:new Date().add(Date.DAY, -26),
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
	  		  	   value:"",
	  		  	   forceSelection:true,
	  		  	   allowBlank:true,
	  		  	   blankText:'请选择状态'
	  		     }),"-",
	  		   "-",
	 			new Ext.Button({
	 				text:'查询',
	 				iconCls:'findButton',
	 				handler:search
	 			}),
	  		   "-","&nbsp;&nbsp;&nbsp;趋势图显示指标",
	  		     new Ext.form.MultiSelect({
	  		    	 id:'channdel',
	  		    	 width:150,
	  		  	   store:new Ext.data.SimpleStore({
	  		  		   fields:['id','name'],
	  		  		   data:keyName
	  		  	   }),
	  		  	   triggerAction:'all',
	  		  	   fieldLabel:'状态',
	  		  	   valueField:'id',
	  		  	   displayField:'name',
	  		  	   editable:false,
	  		  	   mode:'local',
	  		  	   forceSelection:true,
	  		  	   value:'',
	  		  	   allowBlank:true,
	  		  	   blankText:'请选择状态',
	  		  	   afterSure:function(data){
	  		  		   selectedLine = data;
	  		  		   refreshChart(data)
	  		  		}
	  		     
	  		     }),'-',
				 new Ext.Button({
						iconCls:'editButton',
						text: '导出下方表格',
						handler:function(){
							var start = Ext.getCmp('start').getValue();
							var end = Ext.getCmp('end').getValue();
							var edition = Ext.getCmp('edition').getValue();
							var serverId = Ext.getCmp('serverId').getValue();
							var param = {start:start,end:end, edition:edition, serverId:serverId};
							var url='lostAnalyze.do?method=generalData&target=excel&' + Ext.urlEncode(param);
							window.open(url);
						}
				 })
	); 
	
	function search(){
		store.load({callback:function(){
			refreshChart(selectedLine);
		}});
	};
	Ext.each(hashKeyArr, function(i){
		fieldNames.push({name:i});
	})	

	store = new Ext.data.Store({
		proxy:new Ext.data.HttpProxy({url:'lostAnalyze.do?method=generalData'}),
		reader:new Ext.data.JsonReader({
			root:"items",
			totalProperty:"results",
			fields:fieldNames
		})
	});
	store.on('beforeload', function(s, options){
		var start = Ext.getCmp('start').getValue();
		var end = Ext.getCmp('end').getValue();
		var edition = Ext.getCmp('edition').getValue();
		var serverId = Ext.getCmp('serverId').getValue();
		var param = {start:start,end:end, edition:edition, serverId:serverId};
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
	
	var dymanicChart = function(data, renderTo){
		var mseries = [];
		var i = 0;
		var color = ["5555e0","#e05555","55e055","e0e055","55e0e0","e055e0"];
		if(store.data.length==0)
			return new Ext.Panel();
		var arrs = collectStore(store, "xdate", "serverId", data, "week");
		var cols = arrs[0];
		Ext.each(cols, function(y){
			var hashParam = {type:'line', displayName:y, yField:y};
			if(color.length>i){
				hashParam.style = {color:color[i]};
			}
			i++;
			mseries.push(hashParam);
		})
		return new Ext.chart.LineChart({
			url : '../js/ext-3.3.1/resources/charts.swf',
			xtype: 'linechart',
			store: arrs[1],
			renderTo:renderTo,
			xField: 'xdate',
			listeners: {},

			tipRenderer  : function(chart, record, index, series){ 
				window.chart = chart;
				window.record = record;
				window.index = index;
				window.series = series;
				return series.yField + ":" + series.data[index][series.yField]+ "\n" + 
				series.data[index][chart.xField] + "  " + series.data[index]["week"]
			},
			 series: mseries,
	         chartStyle : { 
	             animationEnabled : true, 
	             legend : {
	             display : "bottom",  spacing : 2, 
	             padding : 0, 
	             font : {
	                   name : 'Tahoma',  color : '#3366FF',
	                   size : 12,  bold : true
	                    } 
	             }}
	});
	}
	var lineChart = dymanicChart(selectedLine);
	var refreshChart = function(data){
		var lineChartNext = dymanicChart(data,lineChart.getEl().dom.parentNode.id);
		lineChart.destroy();
		lineChart = lineChartNext;
	}
	


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
			     {header:'日期',width:100,dataIndex:'xdate',sortable:true, summaryRenderer: function (v, params, data) { return '合计'; }},
			     {header:'星期',width:100,dataIndex:'week',sortable:true},
			     {header:'游戏',width:100,dataIndex:'game',sortable:true,renderer:function(){return "大战略"}},
			     {header:'版本',width:100,dataIndex:'edition',sortable:true, renderer: function(value){
			    	 if(value == 'a'){return "android"}
			    	 else if(value == 'i'){return "ios正版"}
			    	 else if(value == 'o'){return "ios越狱"}
			    	 else{return "所有"}
			     }},
			     {header:'流失用户数',width:100,dataIndex:'LoseUserCount',sortable:true},
		         {header:'回流用户数',width:150,dataIndex:'ReturnUserCount',summaryType: 'sum',sortable:true},
		         {header:'流失率',width:150,dataIndex:'LoseUserPercent',summaryType: 'average',sortable:true, renderer:Ext.piggy.percentRender},
		         {header:'流失付费用户数',width:150,dataIndex:'LosePayUserCount',summaryType: 'sum',sortable:true},
		         {header:'付费用户流失率',width:150,dataIndex:'LosePayPercent',summaryType: 'average',sortable:true, renderer:Ext.piggy.percentRender},
		         {header:'流失创角用户数',width:150,dataIndex:'LoseCreateUserCount',summaryType: 'sum',sortable:true},
		         {header:'创角用户流失率',width:150,dataIndex:'LoseCreateUserPercent',summaryType: 'average',sortable:true, renderer:Ext.piggy.percentRender}
		],
		 plugins: summary
	});
	
	new Ext.Viewport({
		layout: 'border',
		items:[
		       {
			        title:"分服统计",
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
		refreshChart(selectedLine);
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