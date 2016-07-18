
(function(){
	/**LOCK FORM START*/
	var buttonCreator = function(methodName, pageTitle, extraWidth){
		if(!extraWidth){
			extraWidth = 0
		}
		var xHistory = function(user){
			var dt = new Date();
			dt.setMonth(dt.getMonth()-1);
			dt.setDate(1);
			var tbar = new Ext.Toolbar({
				width:'100%'
			});
			var startDate = new Ext.form.DateField({
				   name:'startDate',
				   width:150,
				   value:dt,
				   fieldLabel:'日期',
				   allowBlank:false,
				   editable:false,
				   format:'Y-m-d',
				   emptyText:'请填写开始日期',
				   blankText:'开始日期不能为空',
				   hiddenName:'startDate'
			});
			var endDate = new Ext.form.DateField({
				   name:'endDate',
				   width:150,
				   value:new Date(),
				   fieldLabel:'结束日期',
				   allowBlank:false,
				   editable:false,
				   format:'Y-m-d',
				   emptyText:'请填写结束日期',
				   blankText:'结束日期不能为空',
				   hiddenName:'endDate'
			});
			
			var actionData = [['','不限']];
			for(var i in window.actionMap){
				actionData.push([i, i+":"+window.actionMap[i]]);
			}
			var actionFilter = new Ext.form.ComboBox({
		       name:'actionFilter',
		  	   store:new Ext.data.SimpleStore({
		  		   fields:['id','name'],
		  		   data:actionData
		  	   }),
		  	   width:180,
		  	   triggerAction:'all',
		  	   fieldLabel:'分组',
		  	   valueField:'id',
		  	   displayField:'name',
		  	   editable:false,
		  	   mode:'local',
		  	   forceSelection:true,
		  	   allowBlank:true,
		  	   blankText:'请选择分组'
		     });
			
			var resData = [['','不限']];
			for(var i in window.resMap){
				resData.push([i, i+":"+window.resMap[i]]);
			}
			var resName = new Ext.form.ComboBox({
		       name:'resName',
		  	   store:new Ext.data.SimpleStore({
		  		   fields:['id','name'],
		  		   data:resData
		  	   }),
		  	   width:180,
		  	   triggerAction:'all',
		  	   fieldLabel:'物品',
		  	   valueField:'id',
		  	   displayField:'name',
		  	   editable:false,
		  	   mode:'local',
		  	   forceSelection:true,
		  	   allowBlank:true,
		  	   blankText:'请选择物品',
		  	   hidden:methodName!="showGoodsHistory"
		     });
			
			tbar.add(
					new Ext.form.Label({html:"按日期过滤：",style:'margin:5px 20px 0px 20px;',}),
					startDate,
					new Ext.form.Label({html:"-",style:'margin:5px 10px 0px 10px;',}),
					endDate,
					new Ext.form.Label({html:"类型：",style:'margin:5px 10px 0px 10px;',}),
					actionFilter,
					new Ext.form.Label({html:"物品名：",style:'margin:5px 10px 0px 10px;',hidden:methodName!="showGoodsHistory"}),
					resName,
					new Ext.Button({
						text: '搜索',
						iconCls:'findButton',
						handler:function(){
							var start = startDate.getValue();
							var end = endDate.getValue();
							if(start>end){
								Ext.Msg.alert("错误","开始时间不能早于结束时间")
							}
							var startMonth = start.getYear()*12 + start.getMonth();
							var endMonth = end.getYear()*12 + end.getMonth();
							if(startMonth+4<endMonth){
								Ext.Msg.alert("错误","时间跨度不能多于4个月")
							}
							store.load({})
						}
					}));
			var store = new Ext.data.Store({
				reader:new Ext.data.JsonReader({
					root:"items",
					totalProperty:"results",
					fields:[
					        {name:"name"},
					        {name:"add"},//流水id 不须更改
					        {name:"org"},
					        {name:"remain"},
					        {name:"action"},
					        {name:"actionID"},
					        {name:"goodsName"},
					        {name:"modTime"}
					        ]
				}),
				proxy : new Ext.data.HttpProxy({
					url:'userManager.do?method='+methodName,
					extraParams:{}
				}),
				baseParams:{playerId:user.playerId}
			});
			store.on('beforeload', function(s, options){
				var param = {startDate:startDate.getValue(), endDate:endDate.getValue(), actionId:actionFilter.getValue(), resName:resName.getValue()};
				Ext.apply(store.baseParams, param);
			});
			store.load();
			var grid = new Ext.grid.GridPanel({
				frame:true,
				tbar:tbar,
				stripeRows:true,
				tortable:true,
				loadMask: {msg:'正在加载数据，请稍候...'},
				store:store,
				viewConfig: {columnsText:'显示列',sortAscText:'升序',sortDescText:'降序' },
				columns:[//对应的列
				         {header:'角色名 ',width:100,dataIndex:'name',sortable:true},
				         {header:'物品名 ',width:150,dataIndex:'goodsName',sortable:true, hidden:methodName!="showGoodsHistory"},
				         {header:'变更数量 ',width:90,dataIndex:'add',sortable:true},
				         {header:'原有数量 ',width:90,dataIndex:'org',sortable:true},
				         {header:'现有数量 ',width:90,dataIndex:'remain',sortable:true},
				         {header:'变更原因 ',width:130,dataIndex:'actionID',sortable:true,renderer:function(value, metadata,record)
			        		 {
				        	 	return value + ":" + window.actionMap[value+""];
		        		 }},
				         {header:'原因杂项 ',width:100,dataIndex:'action',sortable:true},
				         {header:'操作时间 ',width:115,dataIndex:'createTime',sortable:true,renderer:function(value, metadata,record)
			        		 {
			        		 	var tm = record.data.modTime.time;
			        			 return  Ext.util.Format.date(new Date(tm),'Y-m-d  H:i') 
		        		 }},
				         {header:'原因杂项2 ',width:100,dataIndex:'summary',sortable:true}
				],
				bbar:new Ext.PagingToolbar({
					pageSize:15,  
					store:store,
					beforePageText:"当前第",  
					afterPageText:"页",  
					lastText:"尾页",  
					nextText :"下一页",  
					prevText :"上一页",  
					firstText :"首页",  
					refreshText:"刷新页面",  
					displayInfo: true,  
					emptyMsg:'<span style="color:#414141;font-weight:bold;">当前没有任何数据</span>',
					displayMsg:"当前显示 {0} - {1}条"
				})
			});
			var xWindow = new Ext.Window({
				title: pageTitle,
				width: 1000 + extraWidth,
				height:455,							//是否渲染表单
				layout: 'fit',
				plain:true,
				modal:true,
				draggable:true,
				resizable:false,
				closable:false,
				bodyStyle:'padding:5px;',
				buttonAlign:'center',
				items:  grid,
				closable:true
			});
			xWindow.show();
		}
		return xHistory;
	}
	window.extraButton2.push({text:'经验记录',iconCls:'editButton', func:buttonCreator("showExpHistory","经验记录 ")});
	window.extraButton2.push({text:'金币记录',iconCls:'editButton', func:buttonCreator("showGoldHistory","金币记录 ")});
	window.extraButton2.push({text:'钻石记录',iconCls:'editButton', func:buttonCreator("showDiamondHistory","钻石记录 ")});
	window.extraButton2.push({text:'道具记录',iconCls:'editButton', func:buttonCreator("showGoodsHistory","道具记录 ",50)});
	window.extraButton2.push({text:'体力记录',iconCls:'editButton', func:buttonCreator("showEnergyHistory","体力记录 ")});
})();