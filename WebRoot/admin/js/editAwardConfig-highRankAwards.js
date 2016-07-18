(function () {

    function buttonCreator(server, config, dataStore) {
        if (!server || !config) {
            Ext.Msg.alert("错误", "请选择一条记录");
            return;
        }
        if (config.data.type != 5) {
            Ext.Msg.alert("错误", "请选择冲榜奖励");
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
                html: "<b> ID </b>：" + config.data.id,
                style: 'padding:8px 10px 8px 10px;'
            }),
            new Ext.form.Label({
                html: "<b> 名字 </b>：" + window.getHighRankAwardsName(config.data.subType),
                style: 'padding:8px 10px 8px 10px;'
            })
        );

        var boardType = window.getBoardType(config.data.subType);
        var startIndex = window.getStartIndex(config.data.subType);
        var endIndex = window.getEndIndex(config.data.subType);

        var bbar = new Ext.Toolbar({
            width: '100%',
            style: 'padding:5px;text-align:center;'
        });
        bbar.add(
            new Ext.Button({
                text: "保存",
                iconCls: "editButton",
                handler: function () {

                    var bt = Ext.getCmp("boardType").getValue();
                    var start = Ext.getCmp("startIndex").getValue();
                    var end = Ext.getCmp("endIndex").getValue();

                    if (start < 1 || end < 1 || start > end || end > 50) {
                        window.Ext.Msg.alert("提示", "范围不合法！");
                        return;
                    }

                    if (!confirm("确定要保存?")) {
                        return;
                    }

                    var subType = window.calSubType(bt, start, end);
                    Ext.Ajax.request({
                        url: "awardConfig.do?method=edit",
                        params: {
                            serverId: server.data.id,
                            id: config.data.id,
                            type: config.data.type,
                            subType: subType
                        },
                        success: function (response, opts) {
                            Ext.Msg.alert('提示', '成功', function () {
                                xWindow.close();
                                dataStore.reload();
                            });
                        },
                        failure: function (response, opts) {
                            Ext.Msg.alert('提示', '失败');
                        }
                    });
                }
            })
        );

        var childGrid = new Ext.form.FormPanel({
                frame: true,
                tbar: tbar,
                bbar: bbar,
                loadMask: {
                    msg: '正在加载数据，请稍候...'
                },
                items: [
                    new Ext.form.ComboBox({
                        id: 'boardType',
                        width: 100,
                        store: new Ext.data.SimpleStore({
                            fields: ['type', 'name'],
                            data: window.rankIdMap.arr
                        }),
                        triggerAction: 'all',
                        fieldLabel: '榜单',
                        valueField: 'type',
                        displayField: 'name',
                        editable: false,
                        mode: 'local',
                        value: boardType,
                        forceSelection: true,
                        allowBlank: false,
                        blankText: '请选择榜单',
                    }),
                    new Ext.form.TextField({
                        id: 'startIndex',
                        value: startIndex,
                        fieldLabel: '开始范围',
                        width: 160,
                        allowBlank: false,
                        regex: /^\d+$/,
                        regexText: '请输入数字',
                        blankText: '请输入范围'
                    }),
                    new Ext.form.TextField({
                        id: 'endIndex',
                        value: endIndex,
                        fieldLabel: '结束范围',
                        width: 160,
                        allowBlank: false,
                        regex: /^\d+$/,
                        regexText: '请输入数字',
                        blankText: '请输入范围'
                    })
                ]
            })
            ;

        var xWindow = new Ext.Window({
            title: "冲榜奖励编辑",
            width: 400,
            height: 400,
            layout: 'fit',
            plain: true,
            modal: true,
            draggable: true,
            resizable: true,
            bodyStyle: 'padding:5px;',
            buttonAlign: 'center',
            items: childGrid,
            closable: true
        });
        xWindow.show();
    }

    window.extraButton.push({
        id: "btn2",
        disabled: true,
        text: '冲榜奖励编辑',
        iconCls: 'editButton',
        func: buttonCreator
    });
})
();