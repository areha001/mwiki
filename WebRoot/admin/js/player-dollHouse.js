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

            function changeHouse() {
                var houses = sm.getSelections();
                if (houses.length != 1) {
                    Ext.MessageBox.alert("提示", "请选择一条记录!");
                    return;
                }
                var selector = Ext.getCmp("houseSelector");
                if (selector.getRawValue() == "") {
                    Ext.MessageBox.alert("错误", "请选择房子");
                    return;
                }

                console.log("changeHouse --- serverId:" + user.serverId + ", playerId:" + user.playerId + ", addressId:" + houses[0].data.addressId + ", houseId:" + selector.getValue());

                Ext.Ajax.request({
                    url: "gmEdit.do?method=changeDollHouse",
                    params: {serverId: user.serverId, playerId: user.playerId, addressId: houses[0].data.addressId, houseId: selector.getValue()},
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

            function clearDecorate() {
                var houses = sm.getSelections();
                if (houses.length != 1) {
                    Ext.MessageBox.alert("提示", "请选择一条记录!");
                    return;
                }

                console.log("changeHouse --- serverId:" + user.serverId + ", playerId:" + user.playerId + ", addressId:" + houses[0].data.addressId);

                Ext.Ajax.request({
                    url: "gmEdit.do?method=decorateDollHouse",
                    params: {serverId: user.serverId, playerId: user.playerId, addressId: houses[0].data.addressId},
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

            var tbar = new Ext.Toolbar({
                width: '100%',
                style: 'padding:5px;text-align:center;'
            });
            tbar.add(
                new Ext.form.Label({html: "<b> 服务器</b>： " + user.serverName, style: 'padding:8px 20px 8px 20px;'}),
                new Ext.form.Label({html: "<b>角色名</b>: " + user.name, style: 'padding:8px 20px 8px 20px;'})
            );
            if(window.canDo){
	            tbar.add(
	                    new Ext.form.ComboBox({
	                        id: 'houseSelector',
	                        width: 90,
	                        store: new Ext.data.SimpleStore({
	                            fields: ['id', 'name'],
	                            data: window.housemap
	                        }),
	                        triggerAction: 'all',
	                        fieldLabel: '选择物品',
	                        valueField: 'id',
	                        typeAhead: true,
	                        displayField: 'name',
	                        editable: false,
	                        mode: 'local',
	                        forceSelection: true,
	                        value: "1",
	                        allowBlank: true,
	                        blankText: '请选择发送方式',
	                        listeners: {
	                        }
	                    }),
	                    new Ext.Button({
	                        text: "更换房子",
	                        iconCls: "editButton",
	                        style: 'padding:8px 20px 8px 20px;',
	                        handler: changeHouse
	                    }),
	                    new Ext.Button({
	                        text: "清除装饰",
	                        iconCls: "editButton",
	                        style: 'padding:8px 20px 8px 20px;',
	                        handler: clearDecorate
	                    })
	            );
            }
            var store = new Ext.data.Store({
                reader: new Ext.data.JsonReader({
                    root: "items",
                    totalProperty: "results",
                    fields: [
                        {name: "addressId"},
                        {name: "houseId"},
                        {name: "houseName"},
                        {name: "decorate"},
                        {name: "active"}
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
                    {header: '地皮ID ', width: 60, dataIndex: 'addressId', sortable: true},
                    {header: '房子ID ', width: 60, dataIndex: 'houseId', sortable: true},
                    {header: '房子 ', width: 90, dataIndex: 'houseName', sortable: true},
                    {header: '装饰 ', width: 300, dataIndex: 'decorate', sortable: true},
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
    window.extraButton.push({text: '娃娃屋', iconCls: 'editButton', func: buttonCreator("showDollHouse", "娃娃屋")});
})();