(function () {

    /**LOCK FORM START*/
    var buttonCreator = function (methodName, pageTitle, extraWidth) {
        if (!extraWidth) {
            extraWidth = 0
        }

        var xHistory = function (user, role) {

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
                    html: "<b>玩家名</b>: " + user.name,
                    style: 'padding:8px 20px 8px 20px;'
                }),
                new Ext.form.Label({
                    html: "<b>角色名</b>: " + role.name,
                    style: 'padding:8px 20px 8px 20px;'
                })
            );

            var bbar = new Ext.Toolbar({
                width: '100%',
                style: 'padding:5px;text-align:center;'
            });

            var store = new Ext.data.Store({
                reader: new Ext.data.JsonReader({
                    root: "items",
                    fields: [
                        {name: "effectId"},
                        {name: "left"},
                        {name: "val"}
                    ]
                }),
                proxy: new Ext.data.HttpProxy({
                    url: 'userManager.do?method=' + methodName
                }),
                scope: store,
                baseParams: {playerId: user.playerId, serverId: user.serverId, roleId: role.roleId}
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
                    {
                        header: ' ', width: 60, dataIndex: 'left', sortable: true,
                        renderer: function (val) {
                            return val ? "左边" : "右边";
                        }
                    },
                    {
                        header: '效果 ', width: 80, dataIndex: 'effectId', sortable: true,
                        renderer: function (val) {
                            return window.roleRingSkillMap.get(val);
                        }
                    },
                    {header: '数值 ', width: 130, dataIndex: 'val', sortable: true},
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
    window.gfunc["roleRing"] = buttonCreator("showRoleRing", "洗练");
})();