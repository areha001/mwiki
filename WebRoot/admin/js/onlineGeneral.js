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
	
	var collectStore = function(superStore){
		
		
	}
	
	
	var getColByStore = function(superStore){
		
		var colLength = dateArray.length;
			var colMArray = new Array();
			colMArray[0]={header:'时间',width:100,dataIndex:'timeonly',sortable:true};
			colMArray[1]={header:'版本',width:100,dataIndex:'edition',sortable:true, renderer: function(value){
		   	 if(value == 'a'){return "android"}
		   	 else if(value == 'i'){return "ios正版"}
		   	 else if(value == 'o'){return "ios越狱"}
		   	 else if(value == '-'){return "-"}
		   	 else{return "所有"}
		    }};
		    colMArray[2]={header:'区服',width:100,dataIndex:'sid',sortable:true, renderer: function(value){
		   	 if(value == ''){ 
		   		 return "所有"
		   	 }else if(value == '-'){
		   		 return "-"
		   	 }else{
		   		 return serverMap[value]
		   	 }
		    }};
			for(var i=0; i<colLength; i++) {
			    colMArray[i+3] = {header:dateArray[i],width: 100,dataIndex:dateArray[i],sortable:true, renderer: function(value){
				   	 if(value == ''){return "0"}else{return value;}
				    }}
			     //此处的fieldArray[i]是fields的数据
			}
			//然后colMarray数组即是我们要动态构造的那个ColumnModel的参数，此处的动态的意
			//思是colM可以从request中获取,然后用来动态创建header即表头信息，同
			//理dataIndex也是一样的
			var column = new Ext.grid.ColumnModel(colMArray);
			return column;
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
	  		     new Ext.form.MultiSelect({
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
	  		     }),"-",
		  		   
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
							var param = {start:start,end:end, edition:edition, serverId:serverId};
							var url='onlineAnalyze.do?method=generalData&target=excel&' + Ext.urlEncode(param);
							window.open(url);
						}
				 })
	); 
	
	function search(){
		var start = Ext.getCmp('start').getValue();
		var end = Ext.getCmp('end').getValue();
		var edition = Ext.getCmp('edition').getValue();
		var serverId = Ext.getCmp('serverId').getValue();
		var param = {start:start,end:end, edition:edition, serverId:serverId};
		window.location.href='onlineAnalyze.do?method=listPage&' + Ext.urlEncode(param);

	};
	var fieldNames = [];
	Ext.each(dateArray, function(i){fieldNames.push(i)})
	fieldNames.push("edition");
	fieldNames.push("sid");
	fieldNames.push("timeonly");
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
					     }}]
			})
		}
		var columns = getColByStore(store);
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
			cm:columns
		});
	}
	
	var dymanicChart = function(data){
		var mseries = [];
		var i = 0;
		var color = ["5555e0","#e05555","55e055","e0e055","55e0e0","e055e0"];
		if(store.data.length==0)
			return new Ext.Panel();
		
		Ext.each(dateArray, function(y){
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
			store: store,
			xField: 'timeonly',
			listeners: {},

			/*tipRenderer  : function(chart, record, index, series){ 
				return series.yField + ":" + series.data[index][series.yField]+ "\n" + 
				series.data[index][chart.xField] + "  " + series.data[index]["week"]
			},*/
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
	var lineChart = dymanicChart();
	window.aa = store;
	var grid = dymanicGrid();
	var refreshGrid = function(){
		var pid = grid.getEl().dom.parentNode.id;
		var gridNext = dymanicGrid(pid);
		grid.destroy();
		grid = gridNext;
	}
	


	var summary = new Ext.ux.grid.GridSummary();
	var percentRender = function(value){if(value=="" || value=="-") return value; return value+"%"}
	
	
	

//	var grid = new Ext.grid.GridPanel({
//		title:window.title,
//		frame:true,
//		stripeRows:true,
//		tortable:true,
//		loadMask: {msg:'正在加载数据，请稍候...'},
//		store:store,
//		viewConfig: {columnsText:'显示列',sortAscText:'升序',sortDescText:'降序' },
//		cm:column,
//		 plugins: summary
//	});
	
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