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
	var DefaultLimitSize = 10;

	/******************************
	 *         定义表格组件         *
	 ******************************/


	//定义菜单选择项
	var toolbar = new Ext.Toolbar({
		width:'100%'
	});

	toolbar.add(
			new Ext.Button({
				text:'添加',
				iconCls:'addButton',
				handler:function(){
				//添加一个学生
				var dataform = new Ext.form.FormPanel({
					labelSeparator:':',
					labelWidth:60,
					bodyStyle:'padding:0;',
					frame:true,
					html:'<iframe src="bulManager.do?method=createForm" width="700" height="460"></iframe>'
				});

				window.windowpanel = new Ext.Window({
					title: '新增公告',
					width: 740,
					height:515,
					layout: 'fit',
					plain:true,
					autoScroll:true,
					modal:true,
					draggable:true,
					resizable:false,
					closable:false,
					bodyStyle:'padding:5px;',
					buttonAlign:'center',
					items: dataform,
					buttons: [{
						text: '确定',
						handler:function(){
							subwindow.start_upload();
						}
					},
					{
						text: '取消',
						handler:function(){
						//关闭面板
						windowpanel.destroy();
					}
					}]
				});
				windowpanel.show();
			}//function结尾处
			}),
			new Ext.Button({
				text:'删除',
				iconCls:'deleteButton',
				handler:function(){
				var records = grid.getSelectionModel().getSelections();
				if(records == ""){
					Ext.MessageBox.alert("提示","请选择记录后再进行删除操作!");
					return ;
				}
				var arrId = new Array();
				for(var i=0;i<records.length;i++){
					arrId.push(records[i].id);
				}
				Ext.Msg.show({
					title:'删除?',
					msg: '确定要删除选中记录吗,删除之后无法恢复?',
					buttons: Ext.Msg.YESNO,
					modal:true,
					fn:callback,
					icon: Ext.MessageBox.WARNING
				});

				function callback(id,msg){
					if(id=="yes"){
						Ext.Ajax.request({
							url: 'bulManager.do?method=delete', //根据id删除节点
							params:{'CheckDeptList':arrId},            
							method: 'post', 
							success: function(request) {
								store.reload();
								Ext.MessageBox.alert("提示","删除记录成功!");
								return false;
							},
							failure: function() {
								throw new Error("删除记录失败");
							}
						});
					}
				}
			}
			}),
			//修改学生 信息...........................................
			new Ext.Button({
				text:'修改',
				iconCls:'editButton',
				id:'edit',
				disabled:true,
				handler:function(){ 
				
				var id = grid.getSelectionModel().getSelected().data.id ;
					var dataform = new Ext.form.FormPanel({
					labelSeparator:':',
					labelWidth:60,
					bodyStyle:'padding:0;',
					frame:true,
					html:'<iframe src="bulManager.do?method=editForm&id=' + id + '" width="700" height="460"></iframe>'
					});

				window.windowpanel = new Ext.Window({
					title: '修改公告',
					width: 740,
					height:515,
					layout: 'fit',
					plain:true,
					autoScroll:true,
					modal:true,
					draggable:true,
					resizable:false,
					closable:false,
					bodyStyle:'padding:5px;',
					buttonAlign:'center',
					items: dataform,
					buttons: [{
						text: '确定',
						handler:function(){
							subwindow.start_upload();
						}
					},
					{
						text: '取消',
						handler:function(){
						//关闭面板
						windowpanel.destroy();
					}
					}]
				});
				windowpanel.show();
				}
			}),
			'-',
			new Ext.form.TextField({
				labelSeparator:":",
				id:'title',
				width:'130',
				maxLength:50
			}),
			new Ext.Button({
				text:'搜索',
				iconCls:'findButton',
				handler:function(){
				var name = document.getElementById("title").value;
				
				//alert('studentManager.do?method=searchStudentByName&studentName='+ studentName+ '&clazzid='+clazzid );
				//搜索按钮的点击事件    只要动态的设置 store 的代理就OK了，包括过滤，搜索关键字，按照媒体格式筛选，都可以使用这样的格式
				store.proxy = new Ext.data.HttpProxy({
					url:'bulManager.do?method=main'//重新设置 grid 组件的数据代理地址
				});
				store.load({params:{title:name, start:0,limit:DefaultLimitSize}});
			}
			})
	);

	store = new Ext.data.Store({
		reader:new Ext.data.JsonReader({
			root:"items",
			totalProperty:"results",
			fields:[
			        {name:"id"},//流水id 不须更改
			        {name:"title"},
			        {name:"createTime"},
			        {name:"creatorName"}
			        ]
		}),
		proxy:new Ext.data.HttpProxy({
			//.getElementById("clazzid").value表示获取的是managerStudent.jsp页面的<input type="text" id="clazzid" value="${clazzid}" />中的id的值			
			url:'bulManager.do?method=main'  //访问路径
		})
	});

	var sm = new Ext.grid.CheckboxSelectionModel();         //定义选择模式
	var grid = new Ext.grid.GridPanel({
		title:'公告管理',
		frame:true,
		stripeRows:true,
		tortable:true,
		loadMask: {msg:'正在加载数据，请稍候...'},
		tbar:[toolbar],
		sm:sm,
		listeners:
		{
			"rowclick": function(grid, rowIndex, e)
			{
			var btn = Ext.getCmp('edit'); 
			if(sm.getCount() == 1)
			{
				btn.enable();
			}
			else
			{
				btn.disable();
			} 
			}
		},
		store:store,
		viewConfig: {columnsText:'显示列',sortAscText:'升序',sortDescText:'降序' },
		bbar:new Ext.PagingToolbar({
			pageSize:DefaultLimitSize,  
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
		         {header:'公告标题',width:200,dataIndex:'title',sortabel:true,
			         renderer:function(value, metadata,record){  
			            var id = record.data.id;
		         		var s = "<a target='_blank' href='../main.do?method=showAnnounce&articleId=" + id + "'>" + 
		         			record.data.title + "</a>";
		         		return s;
			         }},
		         {header:'发布时间',width:200,dataIndex:'createTime',sortabel:true},
		         {header:'发布者',width:200,dataIndex:'creatorName',sortabel:true}
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
	store.load({params:{start:0,limit:DefaultLimitSize}});
}
);