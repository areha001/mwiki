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
                handler: queryAwardConfig
            })
        );

        if (window.extraButton.length != 0) {
            for (var i = 0; i < window.extraButton.length; i++) {
                var btn = window.extraButton[i];
                toolbarUser.add(
                    new Ext.Button({
                        id: btn.id,
                        disabled: btn.disabled,
                        text: btn.text,
                        iconCls: btn.iconCls,
                        myHandler: btn.func,
                        handler: function () {
                            var selections = sm.getSelections();
                            if (selections.length != 1) {
                                Ext.MessageBox.alert("提示", "请选择一条礼包记录!");
                                return;
                            }
                            this.myHandler(lastSelectedServer, selections[0], dataStore);
                        }
                    })
                );
            }
        }

        var lastSelectedServer = null;

        function queryAwardConfig() {
            var selectedCount = smServer.getCount();
            if (selectedCount != 1) {
                Ext.Msg.alert("错误", "请选择一个服务器!!");
                return;
            }
            var servers = smServer.getSelections();
            window.ffff = servers;
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
                    if (!success) {
                        failedInfo = failedInfo + server.data.name + "  无法连接<br/>";
                        Ext.Msg.alert("服务器连接异常", failedInfo);
                    }
                    else {
                    }
                }
            });

        }
        
        function updateHeat() {
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
                    html: "<b> 当前热度 </b>：" + dataStore1.getAt(0).get('xvalue'),
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
                    name: 'heat',
                    value: -1,
                    fieldLabel: '修改热度',
                    width: 150,
                    labelSeparator: '：',
                    style: 'margin-bottom:8px;',
                    allowBlank: false,
                    blankText: '修改热度'
                })
    			]
            });

            var aWindow = new Ext.Window({
                title: "修改叶罗丽热度",
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
    					url:"awardConfig.do?method=updateHeat",
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
                    {name: "xvalue"},
                    {name: "updateTime"},
                ]
            }),
            proxy: new Ext.data.HttpProxy({
                url: 'awardConfig.do?method=getHeat'
            })
        });

        var dataStore = new Ext.data.Store({
            reader: new Ext.data.JsonReader({
                root: "items",
                totalProperty: "results",
                fields: [
                    {name: "id"},
                    {name: "type"},
                    {name: "subType"},
                    {name: "name"},
                    {name: "lootInfo"},
                    {name: "numInfo"},
                    {name: "randomLootInfo"},
                ]
            }),
            proxy: new Ext.data.HttpProxy({
                url: 'awardConfig.do?method=list&tag=2'
            }),
        });

        var sm = new Ext.grid.CheckboxSelectionModel({
            singleSelect: true,
            listeners: {
                rowselect: function (sm, num, record) {
                    Ext.getCmp("btn2").setDisabled(record.data.type != 5);
                    Ext.getCmp("btn3").setDisabled(record.data.type != 14);
                }
            }
        });         //定义选择模式

        var gridServer = window.createServerGrid();
        var smServer = gridServer.getSelectionModel();

        window.onServerListReady = function (store) {
            var data = [];
            for (var i = 0; i < store.getCount(); ++i) {
                data.push([store.getAt(i).get("id"), store.getAt(i).get("name")]);
            }
            var store = new Ext.data.SimpleStore({
                fields: ['id', 'name'],
                data: data
            });
            toolbarUser.add('-', '从',
                new Ext.form.ComboBox({
                    id: 'fromServer',
                    width: 120,
                    store: store,
                    triggerAction: 'all',
                    valueField: 'id',
                    displayField: 'name',
                    editable: false,
                    mode: 'local',
                    forceSelection: true,
                    allowBlank: false,
                    blankText: '请选择服务器'
                }),
                '同步到',
                new Ext.form.ComboBox({
                    id: "toServer",
                    width: 120,
                    store: store,
                    triggerAction: 'all',
                    valueField: 'id',
                    displayField: 'name',
                    editable: false,
                    mode: 'local',
                    forceSelection: true,
                    allowBlank: false,
                    blankText: '请选择服务器'
                }),
                new Ext.Button({
                    text: "上传到服务器",
                    iconCls: "xchangeButton",
                    handler: function () {
                        var fromServer = Ext.getCmp("fromServer").value;
                        var toServer = Ext.getCmp("toServer").value;

                        if (!fromServer || !toServer) {
                            Ext.Msg.alert("错误", "请选择一个服务器!");
                            return;
                        }
                        if (!confirm("确定要上传配置?")) {
                            return;
                        }

                        Ext.Ajax.request({
                            url: "awardConfig.do?method=uploadAwardConfig",
                            params: {
                                fromServerId: fromServer,
                                toServerId: toServer
                            },
                            success: function (response, opts) {
                                Ext.Msg.alert('提示', '成功', function () {
                                    store.reload();
                                });
                            },
                            failure: function (response, opts) {
                                Ext.Msg.alert('提示', '失败');
                            }
                        });
                    }
                })
            );
        };

        toolbarUser.add(
            new Ext.Button({
            	id: "btn3",
                disabled: true,
                text: "更新叶罗丽热度",
                iconCls: "editButton",
                handler: updateHeat
            })
        );

        var grid = new Ext.grid.GridPanel({
            title: '活动奖励信息',
            frame: true,
            stripeRows: true,
            tortable: true,
            loadMask: {msg: '正在加载数据，请稍候...'},
            tbar: [toolbarUser],
            sm: sm,
            store: dataStore,
            viewConfig: {columnsText: '显示列', sortAscText: '升序', sortDescText: '降序'},
            columns: [//对应的列
                sm,//对应ID
                {header: 'ID', width: 70, dataIndex: 'id', sortable: true},
                {
                    header: '名字 ', width: 120, dataIndex: 'name', sortable: true,
                    renderer: function (val, metadata, record) {

                        var subType = record.data.subType;
                        switch (record.data.type) {
                            case 5: // 冲榜奖励
                                return window.getHighRankAwardsName(subType);
                            case 6: // 节日礼包
                                return window.ftmap[subType];
                        }
                        return val;
                    }
                },
                {
                    header: '类型 ', width: 120, dataIndex: 'type', sortable: true,
                    renderer: function (val) {
                        return window.awardConfigTypeMap.get(val);
                    }
                },
                {header: '子类型 ', width: 60, dataIndex: 'subType', sortable: true},
                {header: '固定奖励 ', width: 450, dataIndex: 'lootInfo', sortable: true},
                {header: '数量权重 ', width: 200, dataIndex: 'numInfo', sortable: true},
                {header: '随机奖励 ', width: 450, dataIndex: 'randomLootInfo', sortable: true},
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

    }
)
;