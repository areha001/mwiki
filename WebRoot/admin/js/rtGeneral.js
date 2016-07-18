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
	var selectedLine = ['rt_2','rt_7'];


	var hashKeyArr = ['xdate','week','game','edition','channel','rt_newuser','rt_2','rt_3','rt_7','rt_15','rt_a7','rt_a15']
	var fieldNames = ['新用户','次日留存','3日留存','7日留存','15日留存','7日内留存','15日内留存'];
	var keyName = [];
	var hashkeyMap = {};
	for(var i=5; i< hashKeyArr.length; i++){
		keyName.push([hashKeyArr[i], fieldNames[i-5]]);
		hashkeyMap[hashKeyArr[i]] = fieldNames[i-5]
	}
	
	

	var collectStore = function(superStore, key, subKey, v, reverse){
		var cols = [key];
		var newStoreHash = {}
		Ext.each(v, function(i){
			collectSingle(superStore, key, subKey, i, cols, newStoreHash, reverse);
		})
		window.kkk = newStoreHash;
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

		
	//	Array.sort(xkeySort);
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
			var newKey = channelMap[ee[subKey]] +"_" + hashkeyMap[singlev];
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
		   data:channelData
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
		  	            value:new Date(),
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
	  		   "-","渠道",
	  		     new Ext.form.MultiSelect({
	  		    	 id:'channel',
	  		    	 width:150,
	  		  	   store:departNameStoreWithBlank,
	  		  	   triggerAction:'all',
	  		  	   fieldLabel:'渠道',
	  		  	   valueField:'dcode',
	  		  	   displayField:'text',
	  		  	   editable:false,
	  		  	   mode:'local',
	  		  	   forceSelection:true,
	  		  	   value:'',
	  		  	   allowBlank:true,
	  		  	   blankText:'请选择状态'
	  		     }),"-",
		  		   
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
							var channel = Ext.getCmp('channel').getValue();
							var param = {start:start,end:end, edition:edition, channel:channel};
							var url='rtAnalyze.do?method=generalData&target=excel&' + Ext.urlEncode(param);
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
		proxy:new Ext.data.HttpProxy({url:'rtAnalyze.do?method=generalData'}),
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
		var channel = Ext.getCmp('channel').getValue();
		var param = {start:start,end:end, edition:edition, channel:channel};
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
		var arrs = collectStore(store, "xdate", "channel", data, "week");
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


			 series: mseries,
				tipRenderer  : function(chart, record, index, series){ 
					return series.yField + ":" + series.data[index][series.yField]+ "\n" + 
					series.data[index][chart.xField] + "  " + series.data[index]["week"]
				},
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
	var grid = new Ext.grid.GridPanel({
		title:window.title,
		frame:true,
		stripeRows:true,
		tortable:true,
		loadMask: {msg:'正在加载数据，请稍候...'},
		store:store,
		viewConfig: {columnsText:'显示列',sortAscText:'升序',sortDescText:'降序' },
		columns:[//对应的列
			     {header:'日期',width:100,dataIndex:'xdate',sortable:true},
			     {header:'星期',width:100,dataIndex:'week',sortable:true},
			     {header:'游戏',width:100,dataIndex:'game',sortable:true,renderer:function(){return "大战略"}},
			     {header:'版本',width:100,dataIndex:'edition',sortable:true, renderer: function(value){
			    	 if(value == 'a'){return "android"}
			    	 else if(value == 'i'){return "ios正版"}
			    	 else if(value == 'o'){return "ios越狱"}
			    	 else{return "所有"}
			     }},
			     {header:'渠道',width:100,dataIndex:'channel',sortable:true, renderer: function(value){
			    	 if(value == ''){
			    		 return "所有"
			    	 }else{
			    		 return channelMap[value]
			    	 }
			     }},

			     {header:'新用户',width:150,dataIndex:'rt_newuser',sortable:true},
			     {header:'次日留存',width:150,dataIndex:'rt_2',sortable:true,renderer:percentRender},
			     {header:'3日留存',width:150,dataIndex:'rt_3',sortable:true,renderer:percentRender},
			     {header:'7日留存',width:150,dataIndex:'rt_7',sortable:true,renderer:percentRender},
			     {header:'15日留存',width:150,dataIndex:'rt_15',sortable:true,renderer:percentRender},
			     {header:'7日内留存',width:150,dataIndex:'rt_a7',sortable:true,renderer:percentRender},
			     {header:'15日内留存',width:150,dataIndex:'rt_a15',sortable:true,renderer:percentRender}
		],
		 plugins: summary
	});
	
	//
	//var hmenu = grid.getView().view.hmenu;

	//window.kk = hmenu;
	//hmenu.add({

       // checked: false,
//
       // itemId: 'filters',

       // text: this.menuFilterText,

        //menu: this.filterMenu

   // });
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