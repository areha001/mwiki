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
	var toolbar1 = new Ext.Toolbar({
		width:'100%'
	});
	var toolbar2 = new Ext.Toolbar({
		width:'100%'
	});


	var fieldNames = ['dateInterval','edition','serverId','goods_name','putv','outv','rtv'];
	
	var departNameStoreWithBlank = new Ext.data.SimpleStore({
		   fields:['dcode','text'],
		   data:serverData
	 });
	
	toolbar1.add("开始日期",
	  		   new Ext.form.DateField({ 
	  			   	id:"start",
	  	            name:"start",  
	  	            editable:false, //不允许对日期进行编辑  
	  	            width:90,  
	  	            format:"Y-m-d",  
	  	           value:new Date().add(Date.DAY, -5),
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
		  	        }),"-","版本",
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
					      })
	); 
	toolbar2.add("区服",
		      new Ext.form.ComboBox({
		     	 id:'serverId',
		     	 width:150,
		   	   store:departNameStoreWithBlank,
		   	   triggerAction:'all',
		   	   fieldLabel:'区服',
		   	   valueField:'dcode',
		   	   displayField:'text',
		   	   editable:true,
		   	   mode:'local',
		   	   forceSelection:true,
		   	   value:checkServ,
		   	   allowBlank:true,
		   	   blankText:'请选择状态'
		      }),"-",
		    "-","道具类型",
		      new Ext.form.ComboBox({
		     	 id:'propsType',
		     	 width:120,
		   	   store:propsStoreData,
		   	   triggerAction:'all',
		   	   fieldLabel:'道具类型',
		   	   valueField:'id',
		   	   displayField:'text',
		   	   editable:false,
		   	   mode:'local',
		   	   forceSelection:true,
		   	   value:'equip',
		   	   allowBlank:true,
		   	   blankText:'请选择状态'
		      }),"-","道具名称",
		      new Ext.form.TextField({  
	                id:'goods_name',  
	                selectOnFocus:true                 
	            }),  
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
		 				var end = Ext.getCmp('end').getValue();
		 				var edition = Ext.getCmp('edition').getValue();
		 				var serverId = Ext.getCmp('serverId').getValue();
		 				var propsType = Ext.getCmp('propsType').getValue();
		 				var goods_name = Ext.getCmp('goods_name').getValue();
		 				var param = {start:start,end:end, edition:edition, serverId:serverId, propsType:propsType,goods_name:goods_name};
		 				var url='propsAnalyze.do?method=generalData&target=excel&' + Ext.urlEncode(param);
		 				window.open(url);
		 			}
		 	 })
	); 
	
	
	
	function search(){
		store.load({callback:function(){
			//refreshChart(selectedLine);
		}});
	};

	store = new Ext.data.Store({
		proxy:new Ext.data.HttpProxy({url:'propsAnalyze.do?method=generalData'}),
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
		var propsType = Ext.getCmp('propsType').getValue();
		var goods_name = Ext.getCmp('goods_name').getValue();
		var param = {start:start,end:end, edition:edition, serverId:serverId, propsType:propsType,goods_name:goods_name};
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
			     {header:'日期',width:170,dataIndex:'dateInterval',sortable:true, summaryRenderer: function (v, params, data) { return '合计'; }},
			     {header:'版本',width:100,dataIndex:'edition',sortable:true, renderer: function(value){
			    	 if(value == 'a'){return "android"}
			    	 else if(value == 'i'){return "ios正版"}
			    	 else if(value == 'o'){return "ios越狱"}
			    	 else{return "所有"}
			     }},
			     {header:'区服',width:100,dataIndex:'serverId',sortable:true, renderer: function(value){
			    	 //alert(value);
			    		 return serverMap[value]
			     }},
			     {header:'道具',width:100,dataIndex:'goods_name',sortable:true},
		         {header:'产出量',width:150,dataIndex:'putv',summaryType: 'sum',sortable:true},
		         {header:'消耗量',width:150,dataIndex:'outv',summaryType: 'sum',sortable:true},
		         {header:'留存量',width:150,dataIndex:'rtv',summaryType: 'sum',sortable:true},
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
		       {    //剧中的容器
		    	   title:"",
		    	   region:"center",
		    	   tbar:[toolbar1],
		    	   listeners : {   
		               'render' : function(){   
		            	toolbar2.render(this.tbar); //add two tbar   
		                }},  
		    	   border:false,
		    	   layout:"fit",
		    	   bodyBorder:false,
		    	   items:[grid]
		       }
		       ]
	}
	);
	store.load({callback:function(){
	//	refreshChart(selectedLine);
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