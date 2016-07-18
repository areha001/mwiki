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
                    var type = store.reader.jsonData.data.stuntState;
                    var text = "";
                    if (type == 0) {
                        text = window.playerStarStuntMap.get(type);
                    } else {
                        for (var i = 1; i <= 8; i <<= 1) {
                            if ((type & i) != 0) {
                                text += " " + window.playerStarStuntMap.get(i);
                            }
                        }
                    }
                    Ext.getCmp("stunt").setText(text);
                }
            };

            var cellClickFunc = function (grid, rowIndex, columnIndex, e) {
                var record = grid.getStore().getAt(rowIndex).data;
                var fieldName = grid.getColumnModel().getDataIndex(columnIndex);
                var value = record[fieldName];
                switch (fieldName) {
                }
            };

            function resetPlayerStar() {
                if (!window.confirm("确认重置星座副本?")) {
                    return;
                }

                Ext.Ajax.request({
                    url: "gmEdit.do?method=resetPlayerStar",
                    params: {
                        serverId: user.serverId,
                        playerId: user.playerId,
                    },
                    success: function (response, opts) {
                        Ext.Msg.alert('提示', '成功', function () {
                            store.reload({
                                callback: callBack,
                            });
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
                }),
                new Ext.form.Label({html: "<b> 特技</b>： ", style: 'padding:8px 0px 8px 20px;'}),
                new Ext.form.Label({id: "stunt"})
            );

            var bbar = new Ext.Toolbar({
                width: '100%',
                style: 'padding:5px;text-align:center;'
            });
            if(window.canDo){
	            bbar.add(
	                new Ext.Button({
	                    text: "重置",
	                    iconCls: "editButton",
	                    handler: resetPlayerStar
	                })
	            );
            }

            var store = new Ext.data.Store({
                reader: new Ext.data.JsonReader({
                    root: "data.cardList",
                    fields: [
                        {name: "goodsId"},
                        {name: "name"},
                        {name: "starNum"},
                        {name: "state"},
                        {name: "type"},
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
                    {header: 'ID ', width: 80, dataIndex: 'goodsId', sortable: true},
                    {header: '名字 ', width: 120, dataIndex: 'name', sortable: true},
                    {header: '星星数 ', width: 100, dataIndex: 'starNum', sortable: true},
                    {
                        header: '类型 ', width: 100, dataIndex: 'type', sortable: true,
                        renderer: function (value, metadata, record) {
                            return window.starCardTypeMap.get(value);
                        }
                    },
                    {
                        header: '通关状态 ', width: 100, dataIndex: 'state', sortable: true,
                        renderer: function (value, metadata, record) {
                            return window.starCardStatusMap.get(value);
                        }
                    },
                ],
                listeners: {
                    'cellclick': cellClickFunc
                },
                bbar: bbar
            });
            var xWindow = new Ext.Window({
                title: pageTitle,
                width: 570 + extraWidth,
                height: 550,							//是否渲染表单
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
    window.extraButton2.push({text: '星座副本', iconCls: 'editButton', func: buttonCreator("showPlayerStar", "星座副本")});
})();