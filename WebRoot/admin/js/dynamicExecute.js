Ext.onReady(function(){

	Ext.BLANK_IMAGE_URL = "../js/ext-3.3.1/resources/images/default/s.gif";
	Ext.QuickTips.init();    //初始化信息提示
	Ext.form.Field.prototype.msgTarget = "qtip";//统一指定错误信息提示方式
	
	Ext.Msg.buttonText.yes = "确定";
	Ext.Msg.buttonText.ok = "确定";
	Ext.Msg.buttonText.cancel = "取消";
	Ext.Msg.buttonText.no = "取消";
	var DefaultLimitSize = 20;
	var gridField = window.dqKeys.split(",")
	var columns = [];

	var toolbar = new Ext.Toolbar({
		width:'100%'
	});
	toolbar.add(
		new Ext.Button({
				text:'返回',
				iconCls:'backButton',
				handler:function(){window.history.back();}
			}),"-",
		new Ext.Button({
				text:'刷新',
				iconCls:'refreshButton',
				handler:function(){window.location.reload();}
			})
	);

   var commonRenderer = function(value){

		var dateRenderer = function(value){
		   	 if(value!=null){
		  	   return Ext.util.Format.date(new Date(value.time),'Y-m-d H:i:s');
		  	 }else{
		  		 return "";
		  	 }
	   };
	   if(typeof(value)=="object"){
		   if(value.date != undefined && value.time != undefined && value.day!=undefined){
		   return dateRenderer(value);
	   	}
	   } 
	   return value;
   }
	Ext.each(gridField, function(d){
		columns.push({header:d,dataIndex:d,sortable:true, renderer:commonRenderer, width:130});
	});
    var store = new Ext.data.JsonStore({
		fields:gridField,
		data: window.dqResult });
	var sm = new Ext.grid.CheckboxSelectionModel();         //定义选择模式

	var grid = new Ext.grid.GridPanel({
		title:window.title,
		tbar:toolbar,
		frame:true,
		stripeRows:true,
		tortable:true,
		loadMask: {msg:'正在加载数据，请稍候...'},
		sm:sm,
		store:store,
		viewConfig: {columnsText:'显示列',sortAscText:'升序',sortDescText:'降序' },
		columns:columns
	});

	new Ext.Viewport({
		layout: 'border',
		items:[
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
});