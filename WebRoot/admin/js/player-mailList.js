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

            var store = new Ext.data.Store({
                reader: new Ext.data.JsonReader({
                    root: "items",
                    fields: [
                        {name: "id"},
                        {name: "isRead"},
                        {name: "isReceive"},
                        {name: "mailType"},
                        {name: "sendTime"},
                        {name: "senderName"},
                        {name: "title"},
                        {name: "content"},
                        {name: "awards"},

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
                    {header: 'ID ', width: 80, dataIndex: 'id', sortable: true},
                    {header: '标题 ', width: 120, dataIndex: 'title', sortable: true},
                    {
                        header: '内容 ', width: 150, dataIndex: 'content', sortable: true,
                        renderer: function (value, metadata, record) {
                            metadata.attr = 'style="white-space:normal;word-wrap:break-word;word-break:break-all;"';
                            return value;
                        }
                    },
                    {
                        header: '邮件类型 ', width: 90, dataIndex: 'mailType', sortable: true,
                        renderer: function (value, metadata, record) {
                            return window.mailTypeMap.get(value);
                        }
                    },
                    {header: '发送人 ', width: 100, dataIndex: 'senderName', sortable: true},
                    {header: '发送时间 ', width: 140, dataIndex: 'sendTime', sortable: true, renderer: Ext.dateRenderer},
                    {
                        header: '读取 ', width: 50, dataIndex: 'isRead', sortable: true,
                        renderer: function (value, metadata, record) {
                            return value == "0" ? "未读" : "已读";
                        }
                    },
                    {
                        header: '领取 ', width: 50, dataIndex: 'isReceive', sortable: true,
                        renderer: function (value, metadata, record) {
                            return value == "0" ? "未领取" : "已领取";
                        }
                    },
                    {header: '奖励 ', width: 200, dataIndex: 'awards', sortable: true},
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
                width: 1100 + extraWidth,
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
    window.extraButton.push({text: '玩家邮件', iconCls: 'editButton', func: buttonCreator("showMailList", "玩家邮件")});
})();