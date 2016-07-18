Ext.onReady(function(){

	Ext.BLANK_IMAGE_URL = "../js/ext-3.3.1/resources/images/default/s.gif";
	
	Ext.QuickTips.init();    //初始化信息提示
	Ext.form.Field.prototype.msgTarget = "qtip";//统一指定错误信息提示方式
	
	Ext.Msg.buttonText.yes = "确定";
	Ext.Msg.buttonText.ok = "确定";
	Ext.Msg.buttonText.cancel = "取消";
	Ext.Msg.buttonText.no = "取消";
	var DefaultLimitSize = 20;
    var getMySelect = function(){
		var records = grid.getSelectionModel().getSelections();
		if(records == ""){
			Ext.MessageBox.alert("提示","请选择记录后再进行操作!");
			return ;
		}
		var arrId = new Array();
		for(var i=0;i<records.length;i++){
			arrId.push(records[i].id);
		}
		return arrId;
	}
	//定义菜单选择项
	var toolbarServer = new Ext.Toolbar({
		width:'100%'
	});

	var toolbarUser = new Ext.Toolbar({
		width:'100%'
	});
	
	var departNameStoreWithBlank = new Ext.data.Store({
		autoLoad:true,
		proxy:new Ext.data.HttpProxy({
			url:'gm.do?method=departJosn&withBlank=true'
		}),
		reader:new Ext.data.JsonReader({},['id','text'])
	});
	var departNameStore = new Ext.data.Store({
		autoLoad:true,
		proxy:new Ext.data.HttpProxy({
			url:'gm.do?method=departJosn'
		}),
		reader:new Ext.data.JsonReader({},['id','text'])
	});
	
	
	var create_logtest_form = function(arr){
		if(arr==null){
			arr = [];
		}
		arr.push([
	
	     new Ext.form.TextField({
	  	   name:'name',
	  	   fieldLabel:'姓名',
	  	   allowBlank:false,//数据库中可以为空的话 这二行可以去掉
	  	   emptyText:'请填写姓名名',
	  	   blankText:'姓名不能为空'
	     }),
	     new Ext.form.TextField({
	  	   name:'password',
	  	   fieldLabel:'密码',
	  	   allowBlank:false,//数据库中可以为空的话 这二行可以去掉
	  	   emptyText:'easou8888',
	  	   blankText:'密码不能为空'
	     }),
	    
	     new Ext.form.ComboBox({
	  	   hiddenName:'status',
	  	   store:new Ext.data.SimpleStore({
	  		   fields:['id', 'name'],
	  		   data:[[0,'success'],[1,'error']]
	  	   }),
	  	   triggerAction:'all',
	  	   fieldLabel:'状态',
	  	   valueField:'id',
	  	   displayField:'name',
	  	   editable:false,
	  	   mode:'local',
	  	   forceSelection:true,
	  	   value:0,
	  	   allowBlank:true,
	  	   blankText:'请选择状态'
	     })  

		 ]);
		return arr};
	
	
	toolbarServer.add(
			
	  		   new Ext.form.DateField({ 
	  			   	id:"startdt",
	  	            name:"startdt",  
	  	            editable:false, //不允许对日期进行编辑  
	  	            width:100,  
	  	            format:"Y-m-d",  
	  	            value:new Date(),
	  	            emptyText:"选择开始日期"
	  	        }),
		  		   new Ext.form.DateField({ 
		  			   	id:"enddt",
		  	            name:"enddt",  
		  	            editable:false, //不允许对日期进行编辑  
		  	            width:100,  
		  	            format:"Y-m-d",  
		  	            value:new Date().add(Date.DAY, 7),
		  	            emptyText:"选择结束日期"  
		  	        }),
	  	        
			
	  		     new Ext.form.ComboBox({
	  		    	 id:'status',
	  		    	 name:'status',
	  		  	   store:new Ext.data.SimpleStore({
	  		  		   fields:['id','name'],
	  		  		   data:[['','不限'],['0','success'],['1','error']]
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
	  		  	   blankText:'请选择状态'
	  		     }),
			new Ext.Button({
				text:'查询',
				iconCls:'findButton',
				handler:search
			}),
	  	
	  		   
	  		new Ext.Button({
	  			text:'添加测试数据',
	  			iconCls:'findButton',
	  			handler:save
	  		})
	  		   
	  		   
	  		   

	
	); 
	
	function save(){
		Ext.Ajax.request(
				{url :  "logtest.do?method=setData",
				method : "get",
				async :  false,    //关键是这里哦!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!@@@@@@@@@@@@@@@@%%%%%%%%%%%%
				
					success : function() {Ext.ux.Toast.msg('操作提示', '成功!');},

					failure : function() {  Ext.ux.Toast.msg('操作提示', '失败!');}
					
				});   

	}
				

	
	
	function search(){
		var status = Ext.getCmp('status').getValue();
		var startdt = Ext.getCmp('startdt').getValue();
		var enddt = Ext.getCmp('enddt').getValue();
		
		store.load({params:{status:status,startdt:startdt, enddt:enddt}});
	};

	store = new Ext.data.Store({
		proxy:new Ext.data.HttpProxy({url:'logtest.do?method=dataList'}),
		reader:new Ext.data.JsonReader({
			root:"items",
			totalProperty:"results",
			fields:[
			        {name:"id"},//流水id 不须更改
			        {name:"name"},
			        {name:"password"},
			        {name:"status"},
			        {name:"mod_time"}
			        ]
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

	var stores = new Ext.data.JsonStore({
		fields:['name', 'visits', 'views', 'qq'],
		data: [
		            {name:'Jul 07', qq:'a',  visits: 245000, views: 3000000},
		            {name:'Jul 07', qq:'b',  visits: 240000, views: 3500000},
		            {name:'Jul 08', qq:'a',  visits: 355000, views: 4000000},
		            {name:'Jul 08', qq:'b',  visits: 375000, views: 4200000},
		            {name:'Jul 09', qq:'a',  visits: 490000, views: 4500000},
		            {name:'Jul 09', qq:'b',  visits: 495000, views: 5800000}
		       ]
		    });
	
	var lineChart = new Ext.chart.LineChart({
		url : '../js/ext-3.3.1/resources/charts.swf',
		xtype: 'linechart',
		store: stores,
		 xField: 'name',
		listeners: {},
		 series: [{
             type: 'line',displayName: 'Views',
             yField: 'visits', style: {color:0x99BBE8} 
           },{
              type:'line',displayName: 'Visits',
              yField: 'views', style: {color: 0x15428B} 
           }],
		         chartStyle : { 
		             animationEnabled : true, 
		             legend : {
		             display : "bottom",  spacing : 2, 
		             padding : 5, 
		             font : {
		                   name : 'Tahoma',  color : '#3366FF',
		                   size : 12,  bold : true
		                    } 
		             }}
		});
	
	
	
	var grid = new Ext.grid.GridPanel({
		title:window.title,
		frame:true,
		stripeRows:true,
		tortable:true,
		loadMask: {msg:'正在加载数据，请稍候...'},
		tbar:[toolbarServer],
		sm:sm,
		store:store,
		viewConfig: {columnsText:'显示列',sortAscText:'升序',sortDescText:'降序' },
		bbar:new Ext.PagingToolbar({
			pageSize:25,  
			store:store,
			beforePageText:"当前第",  
			afterPageText:"页，共{0}页",  
			lastText:"尾页",  
			nextText :"下一页",  
			prevText :"上一页",  
			firstText :"首页",  
			refreshText:"刷新页面",  
			displayInfo: true,  
			emptyMsg:'<span style="color:#414141;font-weight:bold;">当前没有任何数据</span>',
			displayMsg:"当前显示 {0} - {1}条, 共 {2}"
		}),
		columns:[//对应的列
			     {header:'id',width:100,dataIndex:'id',sortable:true},
		         {header:'状态',width:60,dataIndex:'status',renderer:function(value){
			    	   	 if(value!=null){
			    	   		 if(value==0){return "success"}
			    	   		 if(value==1){return "error"}
			    	   		 return value;
			    	   	 }
		    	   	 }
		         },
		         {header:'姓名',width:60,dataIndex:'name',sortable:true},
		         {header:'密码',width:180,dataIndex:'password',sortable:true},
		        
		         {header:'修改时间',width:150,dataIndex:'mod_time',sortable:true,renderer:dateRenderer}
		]
	});

	new Ext.Viewport({
		layout: 'border',
		items:[
		       {
	                 title:"",
//	                 region:"south",
	                 region:"north",
	                 width:500,
	                 height: 300,
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
	store.load({params:{start:0,limit:25}});
});