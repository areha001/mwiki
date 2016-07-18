/**
 * @author Administrator
 */

Ext.onReady(function(){

	Ext.BLANK_IMAGE_URL = "../js/ext-3.3.1/resources/images/default/s.gif";
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget = "qtip";

	Ext.Msg.buttonText.yes = "确定";
	Ext.Msg.buttonText.ok = "确定";
	Ext.Msg.buttonText.cancel = "取消";
	Ext.Msg.buttonText.no = "取消";

	/******************************
	 *         定义表格组件         *
	 ******************************/


	//定义菜单选择项
	var toolbar = new Ext.Toolbar({
		width:'100%'
	});
	/*toolbar.add(new Ext.Button({
		text:'返回上级管理',
		iconCls:'backButton',
		handler:function(){
		window.history.back(-1);
	}
	})),*/

	toolbar.add(

			new Ext.form.TextField({
					id:'name',
				   width:120,
				   fieldLabel:'操作者',
				   allowBlank:true,
				   editable:false,
				   value:'',
				   emptyText:'请填写操作者'
			}),
			new Ext.Button({
				text:'搜索',
				iconCls:'findButton',
				handler:function(){
				var name = Ext.getCmp("name").getValue();
				name=encodeURI(name);//解决了乱码。。
				
				//alert('studentManager.do?method=searchStudentByName&studentName='+ studentName+ '&clazzid='+clazzid );
				//搜索按钮的点击事件    只要动态的设置 store 的代理就OK了，包括过滤，搜索关键字，按照媒体格式筛选，都可以使用这样的格式
				store.proxy = new Ext.data.HttpProxy({
					url:'happen.do?method=dataList&name='+ name  //重新设置 grid 组件的数据代理地址
				});
				store.load({params:{start:0,limit:25}});
			}
			}),"-"
	);

	store = new Ext.data.Store({
		reader:new Ext.data.JsonReader({
			root:"items",
			totalProperty:"results",
			fields:[
			        {name:"id"},//流水id 不须更改
			        {name:"info"},
			        {name:"creatorName"},
			        {name:"createTime"}
			        ]
		}),
		proxy:new Ext.data.HttpProxy({
			url:'happen.do?method=dataList'  //访问路径
		})
	});

	var sm = new Ext.grid.CheckboxSelectionModel();         //定义选择模式
	var grid = new Ext.grid.GridPanel({
		title:'GM操作日志',
		frame:true,
		stripeRows:true,
		tortable:true,
		loadMask: {msg:'正在加载数据，请稍候...'},
		tbar:[toolbar],
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
			     {header:'ID',width:80,dataIndex:'id',sortabel:true},
			     {header:'操作者',width:130,dataIndex:'creatorName',sortabel:true},
		         {header:'操作描述',width:500,dataIndex:'info',sortabel:true},
		         {header:'时间',width:130,dataIndex:'createTime',sortabel:true,renderer:function(value){
		        	   return Ext.util.Format.date(new Date(value.time),'Y-m-d H:i:s');
		         }}
		        	
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
	}
	);
	store.load({params:{start:0,limit:25}});
}
);