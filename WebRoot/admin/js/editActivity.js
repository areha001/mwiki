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
                        url: "activity.do?method=editActivity",
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
                        	name: 'name',
                        	value: config.data.name,
                            fieldLabel: '名字',
                            width: 150,
                            labelSeparator: '：',
                            allowBlank: false,
                            blankText: '名字'
                        }),
                        new Ext.form.TextField({
                            name: 'vorder',
                            value: config.data.vorder,
                            fieldLabel: '排序',
                            width: 150,
                            labelSeparator: '：',
                            allowBlank: false,
                            blankText: '排序'
                        }),
                    new Ext.ux.form.DateTimeField({
                        name: 'startTime',
                        fieldLabel: '开始时间',
                        width: 150,
                        value: new Date(config.data.startTime.time),
                        timeFormat: 'H',
                        dateFormat: 'Y-m-d',
                        picker: { // optional; xtype is supported
                            // picker conf (see above example)
                        }
                    }),
                    new Ext.ux.form.DateTimeField({
                        name: 'endTime',
                        fieldLabel: '结束时间',
                        width: 150,
                        value: new Date(config.data.endTime.time),
                        timeFormat: 'H',
                        dateFormat: 'Y-m-d',
                        picker: { // optional; xtype is supported
                            // picker conf (see above example)
                        }
                    }),
					new Ext.form.TextArea({
						   name:'description',
						   value: config.data.description,
						   width:400,
						   height:250,
						   fieldLabel:'描述',
						   emptyText:''
					}),
                    new Ext.form.CheckboxGroup({
                        xtype: 'checkboxgroup',
                        width: 80,
                        columns: 1,
                        fieldLabel: '激活',
                        items: [
                            {name: 'active', checked: true},
                        ]
                    })
                ]
            })
            ;

        var xWindow = new Ext.Window({
            title: "活动编辑",
            width: 600,
            height: 500,
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