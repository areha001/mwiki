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
                    if (!Ext.getCmp('numFilter').getValue()) {
                        store.filterBy(numFilter);
                    }
                }
            };
            var numFilter = function (record, id) {
                return record.get('num') > 0;
            };

            var dhiEditFunc = function (name, itemId, num) {
                Ext.MessageBox.confirm("提示", "是否添加" + num + "个" + name + "?",
                    function (id) {
                        if (id == 'yes') {
                            Ext.Ajax.request({
                                url: "gmEdit.do?method=addDollHouseItem",
                                params: {serverId: user.serverId, playerId: user.playerId, itemId: itemId, num: num},
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
                    });
            };

            var cellClickFunc = function (grid, rowIndex, columnIndex, e) {
                var record = grid.getStore().getAt(rowIndex).data;
                var fieldName = grid.getColumnModel().getDataIndex(columnIndex);
                var value = record[fieldName];
                switch (fieldName) {
                    case 'num':
                        dhiEditFunc(record.itemName, record.itemId, 1);
                        break;
                }
            };

            var tbar = new Ext.Toolbar({
                width: '100%',
                style: 'padding:5px;text-align:center;'
            });
            tbar.add(
                new Ext.form.Label({html: "<b> 服务器</b>： " + user.serverName, style: 'padding:8px 20px 8px 20px;'}),
                new Ext.form.Label({html: "<b>角色名</b>: " + user.name, style: 'padding:8px 20px 8px 20px;'}),
                new Ext.form.Label({html: "<b>显示未获得</b>: ", style: 'padding:8px 20px 8px 20px;'}),
                new Ext.form.Checkbox({
                    id: 'numFilter',
                    handler: function () {
                        if (!this.getValue()) {
                            store.filterBy(numFilter);
                        } else {
                            store.clearFilter();
                        }
                    }
                })
            );
            var store = new Ext.data.Store({
                reader: new Ext.data.JsonReader({
                    root: "items",
                    totalProperty: "results",
                    fields: [
                        {name: "itemId"},
                        {name: "num"},
                        {name: "itemName"},
                    ]
                }),
                proxy: new Ext.data.HttpProxy({
                    url: 'userManager.do?method=' + methodName
                }),
                baseParams: {playerId: user.playerId, serverId: user.serverId}
            });
            store.load({
                callback: callBack
            });

            var grid = new Ext.grid.GridPanel({
                frame: true,
                tbar: tbar,
                stripeRows: true,
                tortable: true,
                loadMask: {msg: '正在加载数据，请稍候...'},
                store: store,
                viewConfig: {columnsText: '显示列', sortAscText: '升序', sortDescText: '降序'},
                columns: [//对应的列
                    {header: '物品ID ', width: 100, dataIndex: 'itemId', sortable: true},
                    {header: '物品名 ', width: 130, dataIndex: 'itemName', sortable: true},
                    {header: '数量 ', width: 60, dataIndex: 'num', sortable: true},
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
                width: 630 + extraWidth,
                height: 465,							//是否渲染表单
                layout: 'fit',
                plain: true,
                modal: true,
                draggable: true,
                resizable: false,
                closable: false,
                bodyStyle: 'padding:5px;',
                buttonAlign: 'center',
                items: grid,
                closable: true
            });
            xWindow.show();
        }
        return xHistory;
    }
    window.extraButton.push({text: '娃娃屋物品', iconCls: 'editButton', func: buttonCreator("showDollHouseItem", "娃娃屋物品")});
})();