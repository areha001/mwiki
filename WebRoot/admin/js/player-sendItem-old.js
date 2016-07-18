(function () {
    var itemSelector = new Ext.form.ComboBox({
        id: 'itemSelector',
        width: 175,
        fieldLabel: '选择物品',
        store: new Ext.data.SimpleStore({
            fields: ['id', 'name'],
            data: window.vmap
        }),
        triggerAction: 'query',
        typeAhead: true,
        valueField: 'id',
        displayField: 'name',
        editable: true,
        mode: 'local',
        forceSelection: true,
        value: '',
        allowBlank: true,
        blankText: '请选择发送方式',
        listeners: {
            'beforequery': function (e) {
                var filterDebris = checkBox.items.itemAt(0).checked;
                var filterItem = checkBox.items.itemAt(1).checked;
                var combo = e.combo;
                if (!e.forceAll) {
                    var input = e.query;
                    // 执行检索
                    combo.store.filterBy(function (record, id) {
                        // 得到每个record的项目名称值
                        var text = record.get(combo.displayField);
                        if (filterDebris && text.indexOf("碎片") >= 0) {
                            return false;
                        }
                        if (filterItem && text.indexOf("碎片") < 0) {
                            return false;
                        }
                        return text.indexOf(input) != -1;
                    });
                    combo.expand();
                    return true;
                }
            }
        }
    });
    var itemNumSelector = new Ext.form.TextField({
        id: 'itemNum',
        width: 80,
        fieldLabel: '数量',
        allowBlank: false,
        editable: false,
        format: 'Y-m-d',
        value: 1,
        regex: /^\d+$/,
        regexText: '请输入数字',
        emptyText: '请填写数字',
        blankText: '间隔时间不能为空'
    });

    var checkBox = new Ext.form.CheckboxGroup({
        xtype: 'checkboxgroup',
        width: 80,
        columns: 1,
        fieldLabel: '过滤',
        items: [
            {boxLabel:"碎片"},
            {boxLabel:"物品"},
        ]
    });

    var lockFormCreator = function (user) {
        lockForm = new Ext.form.FormPanel({
            bodyStyle: 'padding:10px 0 0 30px',					//表单边距
            style: "margin: 0 0 0 0",
            labelWidth: 80,
            frame: true,
            items: [
                {
                    width: 680,
                    layout: 'form',
                    labelWidth: 70,
                    items: [

                        {
                            columnWidth: 1,
                            layout: 'hbox',
                            items: [
                                {
                                    width: 270,
                                    layout: 'form',
                                    items: [itemSelector]
                                },
                                {
                                    width: 140,
                                    layout: 'form',
                                    labelWidth: 40,
                                    items: [itemNumSelector]
                                },
                                {
                                    width: 60,
                                    labelWidth: 50,
                                    items: [
                                        new Ext.Button({
                                            text: "添加物品",
                                            handler: function () {
                                                var selector = Ext.getCmp("itemSelector");
                                                if (selector.getRawValue() == "") {
                                                    Ext.Msg.alert("错误", "请选择物品")
                                                    return;
                                                }
                                                var count = Ext.getCmp("itemNum").getValue() - 0;
                                                if (count <= 0 || count + "" == "NaN") {
                                                    Ext.Msg.alert("错误", "请输入非零整数")
                                                    return;
                                                }
                                                var str = count + "  个 " + selector.getRawValue();
                                                window.dymanicLabel++;
                                                var keyName = "s_" + window.dymanicLabel;
                                                selectedItems[keyName] = selector.getValue() + "," + count;
                                                new Ext.form.Label({
                                                    id: 'dymanicLabel' + window.dymanicLabel,
                                                    renderTo: 'itemFieldSet',
                                                    html: "<p class='vo'><span><a onclick='clearSelectedItem(" + window.dymanicLabel + ")'>X</a> " + str + " </span></p>"
                                                })
                                            }
                                        })]
                                },
                                {
                                    width: 60,
                                    labelWidth: 50,
                                    items: [
                                        new Ext.Button({
                                            text: "清除所有",
                                            handler: function () {
                                                var ix = window.dymanicLabel;
                                                window.dymanicLabel = 0;
                                                for (var i = 1; i <= ix; ++i) {
                                                    clearSelectedItem(i);
                                                }
                                            }
                                            })]
                                }]
                        }
                    ]
                },

                {
                    layout: 'form',
                    items: [checkBox]
                },
                {
                    style: 'padding-top:10px;',
                    layout: 'form',
                    items: [fieldSet]
                }
            ]
        });
    };

    var fieldSet = new Ext.form.FieldSet({
        id: 'itemFieldSet',
        defaultType: 'label',
        name: 'itemNames',
        width: 400,
        autoHeight: true,
        fieldLabel: '附带物品',
        items: []
    });
    window.dymanicLabel = 0;

    var selectedItems = {};
    window.clearSelectedItem = function (id) {
        var v = Ext.getCmp("dymanicLabel" + id);
        if (v != null) {
            v.destroy();
            delete(selectedItems["s_" + id]);
        }
    };
    var lockForm = {};
    var lockPage = function (user) {
        lockFormCreator(user);
        var lockWindow = new Ext.Window({
            title: "发放物品 ",
            width: 610,
            height: 400,							//是否渲染表单
            layout: 'fit',
            plain: true,
            modal: true,
            draggable: true,
            resizable: false,
            closable: false,
            bodyStyle: 'padding:5px;',
            buttonAlign: 'center',
            items: lockForm,
            buttons: [{
                text: '确定',
                handler: function () {
                    var itemInfo = [];
                    for (var i in selectedItems) {
                        itemInfo.push(selectedItems[i]);
                    }
                    var itemInfo = itemInfo.join("#");
                    lockForm.form.submit({
                        clientValidation: true,
                        waitMsg: '正在提交信息,请稍后...',
                        waitTitle: '提示',
                        url: "gmEdit.do?method=sendUserBag",
                        params: {serverId: window.serverId, playerId: user.playerId, itemInfo: itemInfo},

                        success: function (form, action, vv) {
                            window.top.pp = action;
                            window.top.qq = form;
                            var count = action.result.successCount;
                            var str = count + "项物品发放成功"
                            var fail = action.result.failed;
                            if (fail != "") {
                                str = str + "," + fail + " 发送失败";
                            }
                            window.Ext.Msg.alert("提示", str, function () {
                                storeUser.reload();
                                lockWindow.hide();
                            });
                        },
                        failure: function (form, action, vv) {
                            window.Ext.Msg.alert("提示", "操作失败！");
                        }
                    });
                }
            },
                {
                    text: '取消',
                    handler: function () {
                        //关闭面板
                        lockWindow.hide();
                    }
                }]
        });
        lockWindow.show();
    };
    window.extraButton.push({text: '发放物品', iconCls: 'editButton', func: lockPage});
})();

/**LOCK FORM END*/