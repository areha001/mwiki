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
                switch (fieldName) {}
            };

            function addFriend() {
                Ext.MessageBox.prompt("提示", "请输入好友ID", function (id, msg) {
                    if (id == 'ok') {
                        if (isNaN(msg)) {
                            Ext.MessageBox.alert("提示", "请输入整数");
                            return;
                        }
                        var friendId = parseInt(msg);
                        Ext.Ajax.request({
                            url: "gmEdit.do?method=editFriend&edit=add",
                            params: {
                                serverId: user.serverId,
                                playerId: user.playerId,
                                friendId: friendId
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
                });
            }

            function deleteFriend() {
                var friends = sm.getSelections();
                if (friends.length != 1) {
                    Ext.MessageBox.alert("提示", "请选择一条记录!");
                    return;
                }

                var friendId = friends[0].data.playerId;
                if (!window.confirm("确认删除好友" + friends[0].data.name + "?")) {
                    return;
                }

                Ext.Ajax.request({
                    url: "gmEdit.do?method=editFriend&edit=delete",
                    params: {
                        serverId: user.serverId,
                        playerId: user.playerId,
                        friendId: friendId
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

            function resetEnergy() {
                var friends = sm.getSelections();
                if (friends.length != 1) {
                    Ext.MessageBox.alert("提示", "请选择一条记录!");
                    return;
                }

                var friendId = friends[0].data.playerId;
                if (!window.confirm("确认重置" + friends[0].data.name + "?")) {
                    return;
                }

                Ext.Ajax.request({
                    url: "gmEdit.do?method=editFriend&edit=reset",
                    params: {
                        serverId: user.serverId,
                        playerId: user.playerId,
                        friendId: friendId
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
            if(window.canDo){
	            tbar.add(
                    new Ext.Button({
                        text: "添加好友",
                        iconCls: "editButton",
                        handler: addFriend
                    }),
                    new Ext.Button({
                        text: "删除好友",
                        iconCls: "editButton",
                        handler: deleteFriend
                    }),
                    new Ext.Button({
                        text: "重置体力",
                        iconCls: "editButton",
                        handler: resetEnergy
                    })
	            );
            }
            var store = new Ext.data.Store({
                reader: new Ext.data.JsonReader({
                    root: "items",
                    totalProperty: "results",
                    fields: [
                        {
                            name: "id"
                        },
                        {
                            name: "state"
                        },
                        {
                            name: "receiveState"
                        },
                        {
                            name: "giveState"
                        },
                        {
                            name: "playerId"
                        },
                        {
                            name: "name"
                        },
                        {
                            name: "level"
                        },
                        {
                            name: "vipLevel"
                        },
                        {
                            name: "faceLevel"
                        },
                        {
                            name: "head"
                        }
                    ]
                }),
                proxy: new Ext.data.HttpProxy({
                    url: 'userManager.do?method=' + methodName
                }),
                baseParams: {
                    playerId: user.playerId,
                    serverId: user.serverId
                }
            });
            store.load({
                callback: callBack
            });

            var sm = new Ext.grid.CheckboxSelectionModel({
                singleSelect: true
            });

            var grid = new Ext.grid.GridPanel({
                frame: true,
                tbar: tbar,
                stripeRows: true,
                tortable: true,
                loadMask: {
                    msg: '正在加载数据，请稍候...'
                },
                store: store,
                sm: sm,
                viewConfig: {
                    columnsText: '显示列',
                    sortAscText: '升序',
                    sortDescText: '降序'
                },
                columns: [ //对应的列
                    sm,
                    {
                        header: '玩家ID ',
                        width: 120,
                        dataIndex: 'playerId',
                        sortable: true
                    },
                    {
                        header: '玩家名 ',
                        width: 120,
                        dataIndex: 'name',
                        sortable: true
                    },
                    {
                        header: '等级 ',
                        width: 60,
                        dataIndex: 'level',
                        sortable: true
                    },
                    {
                        header: 'vip等级 ',
                        width: 60,
                        dataIndex: 'vipLevel',
                        sortable: true
                    },
                    {
                        header: '赠送状态 ',
                        width: 60,
                        dataIndex: 'giveState',
                        sortable: true,
                        renderer: function (value, metadata, record) {
                            var type = record.data.giveState;
                            return window.giveStatusMap.get(type);
                        }
                    },
                    {
                        header: '接收状态 ',
                        width: 60,
                        dataIndex: 'receiveState',
                        sortable: true,
                        renderer: function (value, metadata, record) {
                            var type = record.data.receiveState;
                            return window.receiveStatusMap.get(type);
                        }
                    }
                ],
                listeners: {
                    'cellclick': cellClickFunc
                },
                bbar: new Ext.PagingToolbar({
                    pageSize: 15,
                    store: store,
                    beforePageText: "当前第",
                    afterPageText: "页",
                    lastText: "尾页",
                    nextText: "下一页",
                    prevText: "上一页",
                    firstText: "首页",
                    refreshText: "刷新页面",
                    displayInfo: true,
                    emptyMsg: '<span style="color:#414141;font-weight:bold;">当前没有任何数据</span>',
                    displayMsg: "当前显示 {0} - {1}条"
                })
            });
            var xWindow = new Ext.Window({
                title: pageTitle,
                width: 800 + extraWidth,
                height: 465, //是否渲染表单
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
    window.extraButton.push({
        text: '好友',
        iconCls: 'editButton',
        func: buttonCreator("showFriend", "好友")
    });
})();