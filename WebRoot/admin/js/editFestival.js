(function () {

    function buttonCreator(server, config, dataStore) {
        if (!server || !config) {
            Ext.Msg.alert("错误", "请选择一条记录");
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
                html: "<b> 名字 </b>：" + config.data.name,
                style: 'padding:8px 10px 8px 10px;'
            })
        );
        var bbar = new Ext.Toolbar({
            width: '100%',
            style: 'padding:5px;text-align:center;'
        });
        bbar.add(
            new Ext.Button({
                text: "保存",
                iconCls: "editButton",
                handler: function () {

                    if (!confirm("确定要保存?")) {
                        return;
                    }

                    childGrid.form.submit({
                        clientValidation: true,
                        waitMsg: '正在提交信息,请稍后...',
                        waitTitle: '提示',
                        url: "festival.do?method=editFestival",
                        params: {serverId: server.data.id, id: config.data.id},
                        success: function (form, action) {
                            window.Ext.Msg.alert("提示", "操作成功！", function () {
                                dataStore.reload();
                                xWindow.close();
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
                tbar: tbar,
                bbar: bbar,
                loadMask: {
                    msg: '正在加载数据，请稍候...'
                },
                items: [
                    new Ext.form.TextField({
                        name: 'description',
                        value: config.data.description,
                        fieldLabel: '描述',
                        width: 160,
                        allowBlank: true,
                    }),
                    new Ext.form.TextField({
                        id: 'month',
                        name: 'month',
                        value: config.data.month,
                        fieldLabel: '月份',
                        width: 160,
                        allowBlank: false,
                        regex: /^\d+$/,
                        regexText: '请输入数字',
                        blankText: '请输入月份'
                    }),
                    new Ext.form.TextField({
                        id: 'date',
                        name: 'date',
                        value: config.data.date,
                        fieldLabel: '日期',
                        width: 160,
                        allowBlank: false,
                        regex: /^\d+$/,
                        regexText: '请输入数字',
                        blankText: '请输入日期'
                    }),
                    new Ext.form.CheckboxGroup({
                        xtype: 'checkboxgroup',
                        width: 80,
                        columns: 1,
                        fieldLabel: '农历',
                        items: [
                            {name: 'lunar', checked: config.data.lunar},
                        ]
                    })
                ]
            })
            ;

        var xWindow = new Ext.Window({
            title: "节日编辑",
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
        text: '编辑',
        iconCls: 'editButton',
        func: buttonCreator
    });
})
();