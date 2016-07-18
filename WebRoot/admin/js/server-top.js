
var smServer = new Ext.grid.CheckboxSelectionModel({
//	singleSelect: true
});         //定义选择模式

var createServerGrid = function() {
    return createServerGridByGroupName('GAME');
};

var createServerGridByGroupName = function(groupName){
	storeServer = new Ext.data.Store({
		proxy: new Ext.data.HttpProxy({
			url:'serverManager.do?method=showList&groupName=' + groupName
		}),
		reader:new Ext.data.JsonReader({
			root:"items",
			totalProperty:"results",
			fields:[
			        {name:"id"},//流水id 不须更改
			        {name:"name"},
			        {name:"innerAddr"},
			        {name:"outAddr"},
			        {name:"subName"},
			        {name:"status"},
			        {name:"partnerId"},
			        {name:"partnerName"},
			        {name:"createTime"},
			        {name:"groupType"}
			        ]
		})
	});
	storeServer.load({
		callback:function(){
			autoSelect();
            if (window.onServerListReady) {
                window.onServerListReady(storeServer);
            }
		}
		
	});

	var autoSelected ="";
	if(typeof(esparams)!="undefined"){
		autoSelected = esparams.serverId;	
	}
	var autoSelect = function(){
		var ids = autoSelected.split(',');
		var items = gridServer.store.data.items;
		var autos = [];
		Ext.each(items, function(i){
			if(ids.indexOf(i.id+"")>=0){
				autos.push(i);
			}
		});
		smServer.selectRecords(autos);
	}
	
	var gridServer = new Ext.grid.GridPanel({
		frame:true,
		stripeRows:true,
		tortable:true,
		loadMask: {msg:'正在加载数据，请稍候...'},
		sm:smServer,
		store:storeServer,
		viewConfig: {columnsText:'显示列',sortAscText:'升序',sortDescText:'降序' },
		columns:[//对应的列
		         smServer,
			     {header:'服务器ID',width:150,dataIndex:'subName',sortable:true},
		         {header:'服务器名',width:150,dataIndex:'name',sortable:true},
		         {header:'状态',width:50,dataIndex:'status',sortable:true,
		        	 renderer:function(value, metadata,record)
	        		 {
		        		 return record.data.status == 0?"正常":"<font color='red'>关闭</font>";
	        		 }},
		         {header:'内联地址',width:150,dataIndex:'innerAddr',sortable:true},
		         {header:'外联地址',width:150,dataIndex:'outAddr',sortable:true},
		         {header:'创建时间',width:200,dataIndex:'createTime',sortable:true,renderer:function(value){
		        	 if(value!=null){
		        	   return Ext.util.Format.date(new Date(value.time),'Y-m-d');
		        	 }else{
		        		 return "";
		        	 }
		        	 
		         }}
		]
	});
	return gridServer;
};