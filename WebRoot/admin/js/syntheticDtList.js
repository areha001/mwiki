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
//	    
//	     new Ext.form.ComboBox({
//	  	   hiddenName:'status',
//	  	   store:new Ext.data.SimpleStore({
//	  		   fields:['id', 'name'],
//	  		   data:[[0,'success'],[1,'error']]
//	  	   }),
//	  	   triggerAction:'all',
//	  	   fieldLabel:'状态',
//	  	   valueField:'id',
//	  	   displayField:'name',
//	  	   editable:false,
//	  	   mode:'local',
//	  	   forceSelection:true,
//	  	   value:0,
//	  	   allowBlank:true,
//	  	   blankText:'请选择状态'
//	     })  

		 ]);
		return arr};
	
	
	toolbarServer.add(
			
//	  		   new Ext.form.DateField({ 
//	  			   	id:"startdt",
//	  	            name:"startdt",  
//	  	            editable:false, //不允许对日期进行编辑  
//	  	            width:100,  
//	  	            format:"Y-m-d",  
//	  	            value:new Date(),
//	  	            emptyText:"选择开始日期"
//	  	        }),
//		  		   new Ext.form.DateField({ 
//		  			   	id:"enddt",
//		  	            name:"enddt",  
//		  	            editable:false, //不允许对日期进行编辑  
//		  	            width:100,  
//		  	            format:"Y-m-d",  
//		  	            value:new Date().add(Date.DAY, 7),
//		  	            emptyText:"选择结束日期"  
//		  	        })//,
	  	        
			
//	  		     new Ext.form.ComboBox({
//	  		    	 id:'status',
//	  		    	 name:'status',
//	  		  	   store:new Ext.data.SimpleStore({
//	  		  		   fields:['id','name'],
//	  		  		   data:[['','不限'],['0','success'],['1','error']]
//	  		  	   }),
//	  		  	   triggerAction:'all',
//	  		  	   fieldLabel:'状态',
//	  		  	   valueField:'id',
//	  		  	   displayField:'name',
//	  		  	   editable:false,
//	  		  	   mode:'local',
//	  		  	   forceSelection:true,
//	  		  	   value:'',
//	  		  	   allowBlank:true,
//	  		  	   blankText:'请选择状态'
//	  		     }),
			new Ext.Button({
				text:'导出',
				iconCls:'findButton',
				handler:exports
			})
//	  	
//	  		   
//	  		new Ext.Button({
//	  			text:'添加测试数据',
//	  			iconCls:'findButton',
//	  			handler:save
//	  		})
//	  		   
	  		   
	  		   

	
	); 

	function exports(){
		//Ext.ux.Toast.msg('操作提示', '导出!');
		Ext.Msg.alert('Hello', 'World');  
	}
	
//	function save(){
//		Ext.Ajax.request(
//				{url :  "logtest.do?method=setData",
//				method : "get",
//				async :  false,    //关键是这里哦!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!@@@@@@@@@@@@@@@@%%%%%%%%%%%%
//				
//					success : function() {Ext.ux.Toast.msg('操作提示', '成功!');},
//
//					failure : function() {  Ext.ux.Toast.msg('操作提示', '失败!');}
//					
//				});   
//
//	}
//				

	
	
//	function search(){
//		var status = Ext.getCmp('status').getValue();
//		var startdt = Ext.getCmp('startdt').getValue();
//		var enddt = Ext.getCmp('enddt').getValue();
//		
//		store.load({params:{status:status,startdt:startdt, enddt:enddt}});
//	};

//	store = new Ext.data.Store({
//		proxy:new Ext.data.HttpProxy({url:'logtest.do?method=dataList'}),
//		reader:new Ext.data.JsonReader({
//			root:"items",
//			totalProperty:"results",
//			fields:[
//			        {name:"id"},//流水id 不须更改
//			        {name:"name"},
//			        {name:"password"},
//			        {name:"status"},
//			        {name:"mod_time"}
//			        ]
//		})
//	});
	
	
	store = new Ext.data.JsonStore({
		fields:['dt', 'game', 'edition','channel','accCount','newAccCount'],
		data: [
		            {dt:'2014-08-11', game: '大战略',edition:'android',channel:'所有',accCount:10000,newAccCount:4000},
		            {dt:'2014-08-12', game: '大战略',edition:'android',channel:'所有',accCount:12000,newAccCount:4500},
		            {dt:'2014-08-13', game: '大战略',edition:'android',channel:'所有',accCount:13000,newAccCount:4800}
		       ]
		    });
	
	var dateRenderer = function(value){
	   	 if(value!=null){
	  	   return Ext.util.Format.date(new Date(value.time),'Y-m-d H:i:s');
	  	 }else{
	  		 return "";
	  	 }
   };
	//var sm = new Ext.grid.CheckboxSelectionModel();         //定义选择模式

	var stores = new Ext.data.JsonStore({
		fields:['name', 'visits', 'views'],
		data: [
		            {name:'Jul 07', visits: 245000, views: 3000000},
		            {name:'Aug 07', visits: 240000, views: 3500000},
		            {name:'Sep 07', visits: 355000, views: 4000000},
		            {name:'Oct 07', visits: 375000, views: 4200000},
		            {name:'Nov 07', visits: 490000, views: 4500000},
		            {name:'Dec 07', visits: 495000, views: 5800000},
		            {name:'Jan 08', visits: 520000, views: 6000000},
		            {name:'Feb 08', visits: 620000, views: 7500000}
		       ]
		    });
//    {dt:'2014-08-11', game: '大战略',edition:'android',channel:'所有',accCount:10000},
//    {dt:'2014-08-12', game: '大战略',edition:'android',channel:'所有',accCount:12000},
//    {dt:'2014-08-13', game: '大战略',edition:'android',channel:'所有',accCount:13000}
	var lineChart = new Ext.chart.LineChart({
		url : '../js/ext-3.3.1/resources/charts.swf',
		xtype: 'linechart',
		store: store,
		xField: 'dt',
		listeners: {},
		 series: [{
             type: 'line',displayName: '用户数',
             yField: 'accCount', style: {color:0x99BBE8} 
           },{
               type:'line',displayName: '新建用户数',
               yField: 'newAccCount', style: {color: 0x15428B} 
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
	//	sm:sm,
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
			     {header:'日期',width:100,dataIndex:'dt',sortable:true},
			     {header:'游戏',width:100,dataIndex:'game',sortable:true},
			     {header:'版本',width:100,dataIndex:'edition',sortable:true},
			     {header:'渠道',width:100,dataIndex:'channel',sortable:true},
			     {header:'用户数',width:100,dataIndex:'accCount',sortable:true},
			     {header:'新建用户数', width:100,dataIndex:'newAccCount',sortable:true}
		]
	});

	
	var movie_form = new Ext.FormPanel({ 
		url: 'movie-form-submit.php', 
		//renderTo: document.body, 
		frame: true, 
		title: '', 
		items: [{
			 layout:'hbox', 
			 items:[{     
					width:185,    
			     	layout:'form', 
			  		labelWidth:35,
			     	items:[{xtype:'textfield',fieldLabel:'姓名',width:140}]
			        },
			       {
						width:185,       
			  		layout:'form', 
			  		labelWidth:35,
			     	items:[{xtype:'textfield',fieldLabel:'年龄',width:140}]
			       },
			       {
						width:185,     
				  		labelWidth:35,
			        layout:'form', 
			     	items:[{xtype:'textfield',fieldLabel:'性别',width:140}]     
			       },
			       { 
			    	    layout:'form', 
						width:185,     
				  		labelWidth:35,
			    	   items:[{
			    	     fieldLabel:'Genre',
			    	    xtype: 'combo', 
			    	    mode: 'local',  
			    	   width:140,
			    	   store: new Ext.data.SimpleStore({  fields: ['id', 'text'], 
			    			 data : [['1','Comedy'],['2','Drama'],['3','Action']] 
			   				}),
			   			valueField:"id",
			   			displayField:"text",
			   			 triggerAction:'all',
					  	   editable:true
			    	   }]   
			      } 
			       
			       
			       ] 
			   }], 
	    buttons:[{     text:'按钮', 
			    handler:function(){
				      form.getForm().submit(); 
			    } 
			   
			}]
	});
	
	
	
	new Ext.Viewport({
		layout: 'border',
		items:[

{
	title:"",
//    region:"south",
  //  region:"north",
    region:"north",
    width:300,
    height: 100,
    collapsible:false, 
    items:[movie_form]
	},
		       {
	                 title:"",
//	                 region:"south",
	               //  region:"north",
	                 region:"center",
	                 width:500,
	                 height: 200,
	                 border:false,
	                 collapsible:false, 
	                 items:[lineChart]
	             },
		       {    //剧中的容器
		    	   title:"",
		    	   region:"south",
		    	   width:500,
	               height: 300,
		    	   border:false,
		    	   layout:"fit",
		    	   collapsible:true, 
		    	   items:[grid]
		       }
		       ]
	}
	);
//	store.load({params:{start:0,limit:25}});
});