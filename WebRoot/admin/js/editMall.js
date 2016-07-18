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
                style: 'padding:8px 20px 8px 20px;'
            }),
            new Ext.form.Label({
                html: "<b> ID </b>：" + config.data.mallId,
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
                    var type = Ext.getCmp("buyType").value;
                    var itemName = Ext.getCmp("goodsId").getRawValue();
                    var num = Ext.getCmp("num").getRawValue();
                    var typeName = Ext.getCmp("buyType").getRawValue();
                    if (type == 0 && itemName == "") {
                        window.Ext.Msg.alert("提示", "请选择物品！");
                        return;
                    }
                    if (type == 0) {
                        var goodName = itemName;
                    } else {
                        var goodName = num + "" + typeName;
                    }

                    if (!confirm("确定要保存?")) {
                        return;
                    }

                    childGrid.form.submit({
                        clientValidation: true,
                        waitMsg: '正在提交信息,请稍后...',
                        waitTitle: '提示',
                        url: "mall.do?method=edit",
                        params: {serverId: server.data.id, mallId: config.data.mallId, name: goodName},
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

        function setComboBoxSelect(combo, id, idFieldName) {
            var store = combo.getStore();
            var count = store.getCount();
            for (var i = 0; i < count; ++i) {
                if (store.getAt(i).get(idFieldName) == id) {
                    var record = store.getAt(i);
                    break;
                }
            }
            if (!record) {
                return;
            }
            combo.setValue(id);
            combo.fireEvent("select", combo, record);
        }

        function initMall() {
            setComboBoxSelect(Ext.getCmp("buyType"), config.data.buyType, "type");

            if (config.data.goodsId > 0) {
                setComboBoxSelect(Ext.getCmp("goodsId"), config.data.goodsId, "id");
            }

            Ext.getCmp("num").setValue(config.data.num);
            setComboBoxSelect(Ext.getCmp("costType"), config.data.costType, "type");
            Ext.getCmp("cost").setValue(config.data.cost);
            Ext.getCmp("discount").setValue(config.data.discount);
            setComboBoxSelect(Ext.getCmp("labelType"), config.data.labelType, "type");
            setComboBoxSelect(Ext.getCmp("limitType"), config.data.limitType, "type");
            Ext.getCmp("limitNum").setValue(config.data.limitNum);
            setComboBoxSelect(Ext.getCmp("goodType"), config.data.goodType, "type");
            Ext.getCmp("goodRank").setValue(config.data.goodRank);
        }

        var childGrid = new Ext.form.FormPanel({
            frame: true,
            tbar: tbar,
            bbar: bbar,
            loadMask: {
                msg: '正在加载数据，请稍候...'
            },
            items: [
                new Ext.form.ComboBox({
                    id: 'buyType',
                    hiddenName: 'buyType',
                    width: 100,
                    store: new Ext.data.SimpleStore({
                        fields: ['type', 'name'],
                        data: window.awardTypeMap.arr
                    }),
                    triggerAction: 'all',
                    fieldLabel: '商品类型',
                    valueField: 'type',
                    displayField: 'name',
                    editable: false,
                    mode: 'local',
                    value: "0",
                    forceSelection: true,
                    allowBlank: false,
                    blankText: '请选择物品类型',
                    listeners: {
                        'select': function (combo, record, index) {
                            if (record.get("name") == "物品") {
                                Ext.getCmp("goodsId").show();
                            } else {
                                Ext.getCmp("goodsId").hide();
                            }
                        }
                    }
                }),
                new Ext.form.ComboBox({
                    id: 'goodsId',
                    hiddenName: 'goodsId',
                    width: 160,
                    store: new Ext.data.SimpleStore({
                        fields: ['id', 'name'],
                        data: window.vmap
                    }),
                    triggerAction: 'query',
                    fieldLabel: '选择物品',
                    valueField: 'id',
                    typeAhead: true,
                    displayField: 'name',
                    editable: true,
                    queryMode: "local",
                    mode: 'local',
                    forceSelection: true,
                    value: '',
                    allowBlank: true,
                    blankText: '请选择物品',
                    listeners: {
                        'beforequery': function (e) {
                            var combo = e.combo;
                            if (!e.forceAll) {
                                var input = e.query;
                                // 执行检索
                                combo.store.filterBy(function (record, id) {
                                    // 得到每个record的项目名称值
                                    var text = record.get(combo.displayField);
                                    return text.indexOf(input) != -1;
                                });
                                combo.expand();
                                return true;
                            }
                        }
                    }
                }),
                new Ext.form.TextField({
                    id: 'num',
                    name: 'num',
                    value: 0,
                    fieldLabel: '数量',
                    width: 160,
                    allowBlank: false,
                    blankText: '请输入数量'
                }),
                new Ext.form.ComboBox({
                    id: 'costType',
                    hiddenName: 'costType',
                    width: 100,
                    store: new Ext.data.SimpleStore({
                        fields: ['type', 'name'],
                        data: window.mallCostTypeMap.arr
                    }),
                    triggerAction: 'all',
                    fieldLabel: '消耗类型',
                    valueField: 'type',
                    displayField: 'name',
                    editable: false,
                    mode: 'local',
                    value: "3",
                    forceSelection: true,
                    allowBlank: false,
                    blankText: '请选择消耗类型',
                }),
                new Ext.form.TextField({
                    id: 'cost',
                    name: 'cost',
                    value: 0,
                    fieldLabel: '消耗数量',
                    width: 160,
                    allowBlank: false,
                    blankText: '请输入消耗数量'
                }),
                new Ext.form.TextField({
                    id: 'discount',
                    name: 'discount',
                    value: 100,
                    fieldLabel: '折扣',
                    width: 160,
                    allowBlank: false,
                    blankText: '请输入折扣'
                }),
                new Ext.form.ComboBox({
                    id: 'labelType',
                    hiddenName: 'labelType',
                    width: 100,
                    store: new Ext.data.SimpleStore({
                        fields: ['type', 'name'],
                        data: window.labelTypeMap.arr
                    }),
                    triggerAction: 'all',
                    fieldLabel: '标签类型',
                    valueField: 'type',
                    displayField: 'name',
                    editable: false,
                    mode: 'local',
                    value: "0",
                    forceSelection: true,
                    allowBlank: false,
                    blankText: '请选择标签类型',
                }),
                new Ext.form.ComboBox({
                    id: 'limitType',
                    hiddenName: 'limitType',
                    width: 100,
                    store: new Ext.data.SimpleStore({
                        fields: ['type', 'name'],
                        data: window.limitTypeMap.arr
                    }),
                    triggerAction: 'all',
                    fieldLabel: '限购类型',
                    valueField: 'type',
                    displayField: 'name',
                    editable: false,
                    mode: 'local',
                    value: '0',
                    forceSelection: true,
                    allowBlank: false,
                    blankText: '请选择限购类型',
                    listeners: {
                        'select': function (combo, record, index) {
                            if (record.get("type") != 0) {
                                Ext.getCmp("limitNum").show();
                            } else {
                                Ext.getCmp("limitNum").hide();
                            }
                        }
                    }

                }),
                new Ext.form.TextField({
                    id: 'limitNum',
                    name: 'limitNum',
                    value: 0,
                    fieldLabel: '限购数量',
                    width: 160,
                    allowBlank: false,
                    blankText: '请输入限购数量'
                }),
                new Ext.form.ComboBox({
                    id: 'goodType',
                    hiddenName: 'goodType',
                    width: 100,
                    store: new Ext.data.SimpleStore({
                        fields: ['type', 'name'],
                        data: window.showTypeMap.arr
                    }),
                    triggerAction: 'all',
                    fieldLabel: '展示类型',
                    valueField: 'type',
                    displayField: 'name',
                    editable: false,
                    mode: 'local',
                    value: "0",
                    forceSelection: true,
                    allowBlank: false,
                    blankText: '请选择展示类型',
                }),
                new Ext.form.TextField({
                    id: 'goodRank',
                    name: 'goodRank',
                    value: 0,
                    fieldLabel: '展示位置',
                    width: 160,
                    allowBlank: false,
                    blankText: '请输入展示位置'
                }),
            ]
        });

        var xWindow = new Ext.Window({
            title: "商城编辑",
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
        Ext.getCmp('limitNum').hide();
        initMall();
    }

    window.extraButton.push({
        text: '编辑',
        iconCls: 'editButton',
        func: buttonCreator
    });
})
();