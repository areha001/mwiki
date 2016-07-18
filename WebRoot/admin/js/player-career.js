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
                    Ext.getCmp("maxGate").setText(store.reader.jsonData.data.maxGateId);
                    Ext.getCmp("maxEliteGate").setText(store.reader.jsonData.data.maxEliteGateId);
                }
            };

            var cellClickFunc = function (grid, rowIndex, columnIndex, e) {
                var record = grid.getStore().getAt(rowIndex).data;
                var fieldName = grid.getColumnModel().getDataIndex(columnIndex);
                var value = record[fieldName];
                switch (fieldName) {
                }
            };

            function editCareer() {
                var ybbar = new Ext.Toolbar({
                    width: '100%',
                    style: 'padding:5px;text-align:center;'
                });
                ybbar.add(
                    new Ext.Button({
                        text: "保存",
                        iconCls: "editButton",
                        handler: function () {
                            childGrid.form.submit({
                                clientValidation: true,
                                waitMsg: '正在提交信息,请稍后...',
                                waitTitle: '提示',
                                url: "gmEdit.do?method=editPlayerCareer",
                                params: {playerId: user.playerId, serverId: user.serverId},
                                success: function (form, action) {
                                    window.Ext.Msg.alert("提示", "操作成功！", function () {
                                        store.reload({
                                            callback: callBack,
                                        });
                                        yWindow.close();
                                    });
                                },
                                failure: function (form, action) {
                                    window.Ext.Msg.alert("提示", "操作失败！");
                                }
                            });
                        }
                    })
                );
                var childGrid = new Ext.form.FormPanel({
                    frame: true,
                    bbar: ybbar,
                    loadMask: {
                        msg: '正在加载数据，请稍候...'
                    },
                    items: [
                        new Ext.form.TextField({
                            name: 'gateCount',
                            value: 0,
                            fieldLabel: '已通关关卡数',
                            width: 80,
                            allowBlank: false,
                            blankText: '请输入数量'
                        }),
                        new Ext.form.RadioGroup({
                            xtype: 'radiogroup',
                            width: 80,
                            columns: 1,
                            fieldLabel: '星级',
                            items: [
                                {boxLabel: "一星", name: 'star', inputValue: '1', checked: true},
                                {boxLabel: "二星", name: 'star', inputValue: '2'},
                                {boxLabel: "三星", name: 'star', inputValue: '3'},
                            ]
                        }),
                        new Ext.form.CheckboxGroup({
                            xtype: 'checkboxgroup',
                            width: 80,
                            columns: 1,
                            fieldLabel: '含精英',
                            items: [
                                {name: 'withElite'},
                            ]
                        })
                    ]
                });
                var yWindow = new Ext.Window({
                    title: pageTitle,
                    width: 250 + extraWidth,
                    height: 300,
                    layout: 'fit',
                    plain: true,
                    modal: true,
                    draggable: true,
                    resizable: false,
                    bodyStyle: 'padding:5px;',
                    buttonAlign: 'center',
                    items: childGrid,
                    closable: true
                });
                yWindow.show();
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
                new Ext.form.Label({html: "<b>普通最大关卡</b>: ", style: 'padding:8px 00px 8px 20px;'}),
                new Ext.form.Label({id: "maxGate"}),
                new Ext.form.Label({html: "<b>精英最大关卡</b>: ", style: 'padding:8px 00px 8px 20px;'}),
                new Ext.form.Label({id: "maxEliteGate"})
            );

            var bbar = new Ext.Toolbar({
                width: '100%',
                style: 'padding:5px;text-align:center;'
            });
            if(window.canDo){
	            bbar.add(
	                new Ext.Button({
	                    text: "修改生涯信息",
	                    iconCls: "editButton",
	                    handler: editCareer
	                })
	            );
            }

            var store = new Ext.data.Store({
                reader: new Ext.data.JsonReader({
                    root: "data.careerInfo",
                    fields: [
                        {name: "gateId"},
                        {name: "star"},
                        {name: "eliteStar"},
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
                    {header: '关卡ID ', width: 120, dataIndex: 'gateId', sortable: true},
                    {header: '普通星级 ', width: 120, dataIndex: 'star', sortable: true},
                    {header: '精英星级 ', width: 120, dataIndex: 'eliteStar', sortable: true},
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
    window.extraButton2.push({text: '副本进度', iconCls: 'editButton', func: buttonCreator("showCareer", "副本进度")});
})();