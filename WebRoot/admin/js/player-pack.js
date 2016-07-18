
(function(){
	/**LOCK FORM START*/
	var buttonCreator = function(methodName, pageTitle, extraWidth){
		if(!extraWidth){
			extraWidth = 0
		}
		var xHistory = function(user){
			
			var callBack = function (r, option, success) {
                if (!success) {
                    failedInfo = failedInfo + server.data.name + "  无法连接<br/>";
                    Ext.Msg.alert("服务器连接异常", failedInfo);
                } else {

                }
            };

			var tbar = new Ext.Toolbar({
				width:'100%',
				style:'padding:5px;text-align:center;'
			});
			
			var itemNumSelector = new Ext.form.TextField({
		        width: 80,
		        fieldLabel: '数量',
		        editable: false,
		        format: 'Y-m-d',
		        value: 0,
		        regex: /^\d+$/,
		        regexText: '请输入数字',
		        emptyText: '请填写数字',
		        blankText: '不能为空'
		    });
			
			tbar.add(
					new Ext.form.Label({html:"<b> 服务器</b>： " + user.serverName ,style:'padding:8px 20px 8px 20px;'}),
					new Ext.form.Label({html:"<b>角色名</b>: " + user.name ,style:'padding:8px 20px 8px 20px;'}),
					new Ext.form.Label({html:"<b> 最大格数</b>： " ,style:'padding:8px 0px 8px 20px;'}),
					new Ext.form.Label({id: "maxBagSize"})
			);
			var store = new Ext.data.Store({
				reader:new Ext.data.JsonReader({
					root:"items",
					totalProperty:"results",
					fields:[
					        {name:"goodsId"},
					        {name:"goodsName"},
					        {name:"goodsCount"},
					        {name:"goodsType"},
					        {name:"packId"}
					        ]
				}),
				proxy : new Ext.data.HttpProxy({
					url:'userManager.do?method='+methodName
				}),
				baseParams:{playerId:user.playerId, serverId:user.serverId}
			});
			store.load({
				callback:callBack
			});
			
			var sm = new Ext.grid.CheckboxSelectionModel({
                singleSelect: true
            });
			
			var grid = new Ext.grid.EditorGridPanel({
				frame:true,
				tbar:tbar,
				stripeRows:true,
				tortable:true,
				loadMask: {msg:'正在加载数据，请稍候...'},
				store:store,
				sm:sm,
				clicksToEdit: 1,
				viewConfig: {columnsText:'显示列',sortAscText:'升序',sortDescText:'降序' },
				columns:[//对应的列
				         sm,
				         {header:'物品名 ',width:130,dataIndex:'goodsName',sortable:true},
				         {header:'物品ID ',width:100,dataIndex:'goodsId',sortable:true},
				         {header:'数量 ',width:60,dataIndex:'goodsCount',sortable:true,editor: new Ext.grid.GridEditor(itemNumSelector)},
				         {header:'类型 ',width:40,dataIndex:'goodsType',sortable:true},
				],
				listeners:{
					'afterEdit':function afterEdit(e) {
						var record=e.record.data;
		                console.log("setPack --- serverId:" + user.serverId + ", playerId:" + user.playerId + ", goodsId:" + record.goodsId+",num:"+e.value);
		                Ext.Ajax.request({
		                    url: "gmEdit.do?method=setPlayerPack",
		                    params: {serverId: user.serverId, playerId: user.playerId, goodsId: record.goodsId,num:e.value},
		                    success: function (response, opts) {
		                        Ext.Msg.alert('提示', '成功', function () {
		                            store.reload({
		                                callback: callBack
		                            });
		                        });
		                    },
		                    failure: function (response, opts) {
		                        Ext.Msg.alert('提示', '失败');
		                    }
		                });
					}
				},
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
				width: 630 + extraWidth,
				height:465,							//是否渲染表单
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
	window.extraButton.push({text:'道具列表',iconCls:'editButton', func:buttonCreator("showPackInfo","道具列表")});
	//window.extraButton.push({text:'道具记录',iconCls:'editButton', func:buttonCreator("showGoodsHistory","道具记录 ",50)});
})();