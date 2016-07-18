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
                    Ext.getCmp("activePoint").setText(store.reader.jsonData.data.point);
                }
            };

            var cellClickFunc = function (grid, rowIndex, columnIndex, e) {
                var record = grid.getStore().getAt(rowIndex).data;
                var fieldName = grid.getColumnModel().getDataIndex(columnIndex);
                var value = record[fieldName];
                switch (fieldName) {
                }
            };

            function resetQuest() {
                var quests = sm.getSelections();
                if (quests.length != 1) {
                    Ext.MessageBox.alert("提示", "请选择一条记录!");
                    return;
                }

                var quest = quests[0].data;
                if (!window.confirm("确认重置成就" + quest.name + "?")) {
                    return;
                }

                Ext.Ajax.request({
                    url: "gmEdit.do?method=editQuest",
                    params: {
                        serverId: user.serverId,
                        playerId: user.playerId,
                        questId: quest.id,
                        phase: quest.phase
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
                }),
                new Ext.form.Label({html: "<b>已完成成就</b>: ", style: 'padding:8px 00px 8px 20px;'}),
                new Ext.form.Label({id: "activePoint"})
            );
            if(window.canDo){
	            tbar.add(
                    new Ext.Button({
                        text: "重置成就",
                        iconCls: "editButton",
                        style: 'padding:8px 00px 8px 20px;',
                        handler: resetQuest
                    })
	            );
            }

            var bbar = new Ext.Toolbar({
                width: '100%',
                style: 'padding:5px;text-align:center;'
            });

            var store = new Ext.data.Store({
                reader: new Ext.data.JsonReader({
                    root: "data.questProgress",
                    fields: [
                        {name: "id"},
                        {name: "phase"},
                        {name: "name"},
                        {name: "description"},
                        {name: "progress"},
                        {name: "targetProgress"},
                        {name: "status"},
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
                    sm,
                    {header: 'ID ', width: 50, dataIndex: 'id', sortable: true},
                    {header: '阶段 ', width: 50, dataIndex: 'phase', sortable: true},
                    {header: '任务名 ', width: 100, dataIndex: 'name', sortable: true},
                    {header: '描述 ', width: 150, dataIndex: 'description', sortable: true},
                    {
                        header: '进度 ', width: 130, sortable: true,
                        renderer: function (value, metadata, record) {
                            return record.data.progress + "/" + record.data.targetProgress;
                        }
                    },
                    {
                        header: '奖励状态 ', width: 60, sortable: true,
                        renderer: function (value, metadata, record) {
                            var type = record.data.status;
                            return window.awardStatusMap.get(type);
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
                width: 700 + extraWidth,
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
    window.extraButton2.push({text: '成就', iconCls: 'editButton', func: buttonCreator("showQuest", "成就")});
})();