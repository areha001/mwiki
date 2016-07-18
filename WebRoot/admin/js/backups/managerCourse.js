/**
 * @author Administrator
 */

Ext.onReady(function(){

	Ext.BLANK_IMAGE_URL = "../js/ext-3.3.1/resources/images/default/s.gif";
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget = "side";

	Ext.Msg.buttonText.yes = "确定";
	Ext.Msg.buttonText.ok = "确定";
	Ext.Msg.buttonText.cancel = "取消";
	Ext.Msg.buttonText.no = "取消";


	/******************************
	 *         定义表格组件         *
	 ******************************/

	store = new Ext.data.Store({
		reader:new Ext.data.JsonReader({
			root:"items",
			totalProperty:"results",
			fields:[
			        {name:"id"},//流水Id 不须更改
			        {name:"clazzName"},
			        {name:"terminfo"},
			        {name:"cnpath"},
			        {name:"teacherName"},
			        {name:"active"},
			        ]
		}),
		proxy:new Ext.data.HttpProxy({
			url:'courseManager.do?method=showClazzCourseList&clazzid='+document.getElementById("clazzid").value   //访问路径
		})
	});
	var toolbar = new Ext.Toolbar({
		width:'100%'
	});
	toolbar.add(new Ext.Button({
		text:'返回上级管理',
		iconCls:'backButton',
		handler:function(){
		window.history.back(-1);
	}
	}));

	
	var sm = new Ext.grid.CheckboxSelectionModel();         //定义选择模式
	var grid = new Ext.grid.GridPanel({
		//title:''+document.getElementById("clazzname").value+'--课程表',
		title:''+document.getElementById("grade").value+'--'+''+document.getElementById("clazzname").value+'--课程表',//
		frame:true,
		stripeRows:true,
		tortable:true,
		loadMask: {msg:'正在加载数据，请稍候...'},
		tbar:toolbar,//   在面版上添加按扭（添加，删除。。。）
		sm:sm,
		store:store,
		viewConfig: {columnsText:'显示列',sortAscText:'升序',sortDescText:'降序' },
		bbar:new Ext.PagingToolbar({
			pageSize:10,  
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
		         sm,//对应ID
		         {header:'班级',width:120,dataIdex:'clazzName',sortabel:true},
		         {header:'学期',width:120,dataIdex:'terminfo',sortabel:true},
     	         {header:'课程/版本',width:250,dataIdex:'cnpath',sortabel:true},
		         {header:'辅导老师',width:120,dataIdex:'teacherName',sortabel:true},
		         {header:'状态',width:80,dataIdex:'active',sortabel:true,
		        	 renderer:function(value)
		        	 {
		        	 if(value == 0)
		        	 {
		        		 return "关闭";
		        	 }
		        	 else
		        	 {
		        		 return "正常";
		        	 }
		        	 }
		         }
		         ]
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
	});
	store.load({params:{start:0,limit:25}});
});