(function () {

    /**LOCK FORM START*/
    var buttonCreator = function (methodName, pageTitle, extraWidth) {
        if (!extraWidth) {
            extraWidth = 0
        }

        var xHistory = function (user) {

            var callBack = function (r, option, success) {
                if (!success) {
                    failedInfo = failedInfo + server.data.name + "  无法连接<br/>";
                    Ext.Msg.alert("服务器连接异常", failedInfo);
                } else {
                }
            };

            var cellClickFunc = function (grid, rowIndex, columnIndex, e) {
                var record = grid.getStore().getAt(rowIndex).data;
                var fieldName = grid.getColumnModel().getDataIndex(columnIndex);
                var value = record[fieldName];
                switch (fieldName) {
                }
            };

            function resetArena(info, method) {
                if (!window.confirm("确认" + info + "?")) {
                    return;
                }

                Ext.Ajax.request({
                    url: "gmEdit.do?method=" + method,
                    params: {
                        serverId: user.serverId,
                        playerId: user.playerId,
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

            var tbar = new Ext.Toolbar({
                width: '100%',
                style: 'padding:5px;text-align:center;'
            });
            tbar.add(
                new Ext.form.Label({
                    html: "<b> 服务器</b>： " + user.serverName,
                    style: 'padding:8px 20px 8px 20px;'
                }),
                new Ext.form.Label({
                    html: "<b>角色名</b>: " + user.name,
                    style: 'padding:8px 20px 8px 20px;'
                })
            );

            var bbar = new Ext.Toolbar({
                width: '100%',
                style: 'padding:5px;text-align:center;'
            });
            if(window.canDo){
	            bbar.add(
	                new Ext.Button({
	                    text: "清除等待时间",
	                    iconCls: "editButton",
	                    handler: function() {
	                        resetArena("清除等待时间", "arenaWaitTime");
	                    }
	                }),
	                new Ext.Button({
	                    text: "重置挑战次数",
	                    iconCls: "editButton",
	                    handler: function() {
	                        resetArena("重置挑战次数", "resetArenaCount");
	                    }
	                })
	            );
            }

            var store = new Ext.data.Store({
                reader: new Ext.data.JsonReader({
                    root: "items",
                    fields: [
                        {name: "count"},
                        {name: "countMax"},
                        {name: "vipCount"},
                        {name: "waitTime"}
                    ]
                }),
                proxy: new Ext.data.HttpProxy({
                    url: 'userManager.do?method=' + methodName
                }),
                scope: store,
                baseParams: {playerId: user.playerId, serverId: user.serverId}
            });
            store.load({
                callback: callBack,
            });

            var sm = new Ext.grid.CheckboxSelectionModel({
                singleSelect: true
            });

            var grid = new Ext.grid.GridPanel({
                frame: true,
                tbar: tbar,
                stripeRows: true,
                tortable: true,
                loadMask: {msg: '正在加载数据，请稍候...'},
                store: store,
                sm: sm,
                viewConfig: {columnsText: '显示列', sortAscText: '升序', sortDescText: '降序'},
                columns: [//对应的列
                    {header: '已挑战次数 ', width: 120, dataIndex: 'count', sortable: true},
                    {header: '最大挑战次数 ', width: 120, dataIndex: 'countMax', sortable: true},
                    {header: 'VIP购买次数 ', width: 120, dataIndex: 'vipCount', sortable: true},
                    {
                        header: '等待时间 ', width: 140, dataIndex: 'waitTime', sortable: true,
                        renderer: function (value) {
                            if (value == null || value == 0) {
                                return '';
                            } else {
                                return Ext.util.Format.date(new Date(parseInt(value)), "Y-m-d H:i:s");
                            }
                        }
                    }
                ],
                listeners: {
                    'cellclick': cellClickFunc
                },
                bbar: bbar
            });
            var xWindow = new Ext.Window({
                title: pageTitle,
                width: 600 + extraWidth,
                height: 465,							//是否渲染表单
                layout: 'fit',
                plain: true,
                modal: true,
                draggable: true,
                resizable: false,
                bodyStyle: 'padding:5px;',
                buttonAlign: 'center',
                items: grid,
                closable: true
            });
            xWindow.show();
        }
        return xHistory;
    }
    window.extraButton2.push({text: '竞技场', iconCls: 'editButton', func: buttonCreator("showArenaInfo", "竞技场")});
})();