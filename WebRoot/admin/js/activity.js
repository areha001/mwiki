Ext.onReady(function () {

    Ext.BLANK_IMAGE_URL = "../js/ext-3.3.1/resources/images/default/s.gif";
    Ext.QuickTips.init();    //初始化信息提示
    Ext.form.Field.prototype.msgTarget = "qtip";//统一指定错误信息提示方式

    Ext.Msg.buttonText.yes = "确定";
    Ext.Msg.buttonText.ok = "确定";
    Ext.Msg.buttonText.cancel = "取消";
    Ext.Msg.buttonText.no = "取消";

    var toolbarUser = new Ext.Toolbar({
        width: '100%'
    });

    toolbarUser.add('-',
        new Ext.Button({
            text: '查询',
            iconCls: 'searchButton',
            handler: queryActivity
        })
    );

    if (window.extraButton.length != 0) {
        for (var i = 0; i < window.extraButton.length; i++) {
            var btn = window.extraButton[i];
            toolbarUser.add(
                new Ext.Button({
                    text: btn.text,
                    iconCls: btn.iconCls,
                    myHandler: btn.func,
                    handler: function () {
                        var selections = sm.getSelections();
                        if (selections.length != 1) {
                            Ext.MessageBox.alert("提示", "请选择一条记录!");
                            return;
                        }
                        this.myHandler(lastSelectedServer, selections[0], dataStore);
                    }
                })
            );
        }
    }

    toolbarUser.add(
        new Ext.Button({
        	id: "btn2",
            disabled: true,
            text: "重置活动数据",            
            iconCls: "editButton",
            handler:resetActivity
        })
    );

    toolbarUser.add(
        new Ext.Button({
            text: "上传到服务器",
            iconCls: "xchangeButton",
            handler: uploadActivity
        })
    );

    toolbarUser.add(
        new Ext.Button({
        	id: "btn3",
            disabled: true,
            text: "修改基金购买人数",
            iconCls: "editButton",
            handler: updateBuyFundCount
        })
    );

    var lastSelectedServer = null;

    function resetActivity() {
        var selectedCount = smServer.getCount();
        if (selectedCount != 1) {
            Ext.Msg.alert("错误", "请选择一个服务器!");
            return;
        }
        var server = smServer.getSelections()[0];

        if (sm.getCount() != 1) {
            Ext.Msg.alert("错误", "请选择一个活动!");
            return;
        }
        var ac = sm.getSelections()[0];
        if(ac.data.id != 3 && ac.data.id != 11 && ac.data.id != 12){
        	Ext.Msg.alert("错误", "不能重置该活动数据!");
            return;
        }
        if (!confirm("确定要重置 " +  window.activityIdMap.get(ac.data.id) + "?")) {
            return;
        }

        Ext.Ajax.request({
            url: "activity.do?method=resetActivity",
            params: {
                serverId: server.data.id,
                activityId: ac.data.id
            },
            success: function (response, opts) {
                Ext.Msg.alert('提示', '成功', function () {
                    xWindow.close();
                    dataStore.reload();
                });
            },
            failure: function (response, opts) {
                Ext.Msg.alert('提示', '失败');
            }
        });
    }
    
    function updateBuyFundCount() {
        var selectedCount = smServer.getCount();
        var server = smServer.getSelections()[0];
        if (selectedCount != 1) {
            Ext.Msg.alert("错误", "请选择一个服务器!");
            return;
        }

        var tbar = new Ext.Toolbar({
            width: '100%',
            style: 'padding:5px;text-align:center;'
        });
        tbar.add(
            new Ext.form.Label({
                html: "<b> 服务器</b>： " + server.data.name,
                style: 'padding:8px 20px 8px 10px;'
            }),
            new Ext.form.Label({
                html: "<b> 已购买基金人数 </b>：" + dataStore1.getAt(0).get('buyFundCount'),
                style: 'padding:8px 10px 8px 10px;'
            })
        );
        
        var childGrid = new Ext.form.FormPanel({

			bodyStyle:'padding:25px 20px 0 30px',					//表单边距
			style:"margin: 0 0 0 0",
			labelWidth:100,
			frame:true,
			tbar: tbar,
			items: [
            new Ext.form.TextField({
                name: 'num',
                value: 0,
                fieldLabel: '增加购买人数',
                width: 150,
                labelSeparator: '：',
                style: 'margin-bottom:8px;',
                allowBlank: false,
                blankText: '修改人数'
            })
			]
        });

        var aWindow = new Ext.Window({
            title: "修改购买基金人数",
            width: 400,
            height: 200,
            layout: 'fit',
            plain: true,
            modal: true,
            draggable: true,
            resizable: true,
            bodyStyle: 'padding:5px;',
            buttonAlign: 'center',
            items: childGrid,
            closable: true,
			buttons: [{
				text: '确定',
				handler:function(){
					childGrid.form.submit({
					clientValidation:true,
					waitMsg:'正在修改信息,请稍后...',
					waitTitle:'提示',
					url:"activity.do?method=updateServerConsts",
					params: {serverId: server.data.id},
					success:function(form,action){
					window.Ext.Msg.alert("提示","操作成功！",function(){
						dataStore1.reload();
						aWindow.hide();
					});
				},
				failure:function(form,action){
					window.Ext.Msg.alert("提示","操作失败！");
				}
				});
			}
			},
			{
				text: '取消',
				handler:function(){
				//关闭面板
					aWindow.hide();
				}
			}]
        });
        aWindow.show();
    }

    var dataStore1 = new Ext.data.Store({
        reader: new Ext.data.JsonReader({
            root: "data",
            fields: [
                {name: "id"},
                {name: "buyFundCount"},
                {name: "createTime"},
            ]
        }),
        proxy: new Ext.data.HttpProxy({
            url: 'activity.do?method=getServerConsts'
        })
    });


    function uploadActivity() {
        var selectedCount = smServer.getCount();
        if (selectedCount <= 0) {
            Ext.Msg.alert("错误", "请至少选择一个服务器!");
            return;
        }
        var servers = smServer.getSelections();

        var count = dataStore.getCount();
        if (count <= 0) {
            Ext.Msg.alert("错误", "请先查询数据!");
            return;
        }

        if (!confirm("确定要上传服务器?")) {
            return;
        }

        var jsonArray = [];
        for (var i = 0; i < count; ++i) {
            var record = dataStore.getAt(i);
            jsonArray.push(record.json);
        }
        var json = JSON.stringify(jsonArray);

        Ext.each(servers, function (server) {
            Ext.Ajax.request({
                url: "activity.do?method=uploadActivity",
                params: {
                    serverId: server.id,
                    data: json
                },
                success: function (response, opts) {
                    Ext.Msg.alert("提示", server.json.name + "上传成功！ ");
                },
                failure: function (response, opts) {
                    Ext.Msg.alert("提示", server.json.name + "上传失败！ ");
                }
            });
        });
    }

    function queryActivity() {
        var selectedCount = smServer.getCount();
        if (selectedCount != 1) {
            Ext.Msg.alert("错误", "请选择一个服务器!");
            return;
        }
        var servers = smServer.getSelections();
        dataStore.removeAll();
        dataStore1.removeAll();
        var failedInfo = "";
        var server = servers[0];
        lastSelectedServer = server;

        dataStore.load({
            params: {"serverId": server.id},
            callback: function (r, option, success) {
                if (!success) {
                    failedInfo = failedInfo + server.data.name + "  无法连接<br/>";
                    Ext.Msg.alert("服务器连接异常", failedInfo);
                }
                else {
                }
            }
        });
        
        dataStore1.load({
            params: {"serverId": server.id},
            callback: function (r, option, success) {
//                if (!success) {
//                    failedInfo = failedInfo + server.data.name + "  无法连接<br/>";
//                    Ext.Msg.alert("服务器连接异常", failedInfo);
//                }
//                else {
//                }
            }
        });

    }

    var dataStore = new Ext.data.Store({
        reader: new Ext.data.JsonReader({
            root: "items",
            totalProperty: "results",
            fields: [
                {name: "id"},
                {name: "name"},
                {name: "active"},
                {name: "startTime"},
                {name: "endTime"},
                {name: "description"},
                {name: "vorder"},
                {name: "vtype"},
            ]
        }),
        proxy: new Ext.data.HttpProxy({
            url: 'activity.do?method=showActivity'
        })
    });

    var sm = new Ext.grid.CheckboxSelectionModel({
        singleSelect: true,
        listeners: {
            rowselect: function (sm, num, record) {
                Ext.getCmp("btn2").setDisabled(record.data.id != 3 && record.data.id != 11 && record.data.id != 12);
                Ext.getCmp("btn3").setDisabled(record.data.id != 9);
            }
        }
    });         //定义选择模式

    var gridServer = window.createServerGrid();
    var smServer = gridServer.getSelectionModel();
    var grid = new Ext.grid.GridPanel({
        title: '活动列表',
        frame: true,
        stripeRows: true,
        tortable: true,
        loadMask: {msg: '正在加载数据，请稍候...'},
        tbar: [toolbarUser],
        sm: sm,
        store: dataStore,
        viewConfig: {columnsText: '显示列', sortAscText: '升序', sortDescText: '降序'},
        columns: [//对应的列
            sm,
            {header: 'ID ', width: 80, dataIndex: 'id', sortable: true},
            {header: '名字', width: 150, dataIndex: 'name', sortable: true},
            {header: '开始时间', width: 150, dataIndex: 'startTime', sortable: true, renderer: Ext.dateRenderer},
            {header: '结束时间', width: 150, dataIndex: 'endTime', sortable: true, renderer: Ext.dateRenderer},
            {
                header: '激活状态 ', width: 80, dataIndex: 'active', sortable: true,
                renderer: function (value, metadata, record) {
                    return value ? "是" : "否";
                }
            },
            {header: '排序', width: 80, dataIndex: 'vorder', sortable: true},
            {
            	header: '类型', width: 80, dataIndex: 'vtype', sortable: true,
            	renderer: function (value) {
            		if(value == 2){
		         		return value+":活动";
		         	}else if(value == 1){
		         		return value+":福利";
		         	}else if(value == 0){
		         		return value+":独立入口";
		         	}
                }
            },
            {header: '描述', width: 300, dataIndex: 'description', sortable: true},
        ]
    });

    new Ext.Viewport({
        layout: 'fit',
        items: [{
            layout: 'border',
            items: [{
                // xtype: 'panel' implied by default
                title: '服务器过滤',
                region: 'north',
                margins: '5 0 0 5',
                height: 150,
                collapsible: true,   // make collapsible
                split: true,         // enable resizing
                cmargins: '5 5 0 5', // adjust top margin when collapsed
                id: 'west-region-container',
                layout: 'fit',
                items: [gridServer]
            }, {
                title: 'Center Region',
                region: 'center',     // center region is required, no width/height specified
                xtype: 'container',
                layout: 'fit',
                height: 100,
                minSize: 75,         // defaults to 75
                margins: '5 5 0 0',
                items: [grid]
            }]
        }]
    });

});