(function () {

    function buttonCreator(server, awardConfig, dataStore) {
        if (!server || !awardConfig) {
            Ext.Msg.alert("错误", "请选择一条记录");
            return;
        }

        var tbar = new Ext.Toolbar({
            width: '100%',
            style: 'padding:5px;text-align:center;'
        });
        tbar.add(
            new Ext.form.Label({html: "<b> 服务器</b>： " + server.data.name, style: 'padding:8px 20px 8px 20px;'}),
            new Ext.form.Label({html: "<b> ID </b>：" + awardConfig.data.id, style: 'padding:8px 10px 8px 10px;'})
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
                        console.log("server:[" + server.data.id + "], id:[" + awardConfig.data.id + "], lootInfo:[" + lootItemDataHelper.getInfo() + "], numInfo:[" + numDataHelper.getInfo() + "], randomLootInfo:[" + randomLootItemDataHelper.getInfo() + "]");
                        Ext.Ajax.request({
                            url: "awardConfig.do?method=edit",
                            params: {
                                serverId: server.data.id,
                                id: awardConfig.data.id,
                                type: awardConfig.data.type,
                                lootInfo: lootItemDataHelper.getInfo(),
                                numInfo: numDataHelper.getInfo(),
                                randomLootInfo: randomLootItemDataHelper.getInfo(),  
                                name:getName.getValue(),
                                subType:getSubType.getValue()
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
                }
            )
        );

        function parseItemDesc(info) {
            var datas = info.split(",");
            if (datas[0] == '0') {
                return datas[2] + "  个  " + window.itemIdMap.get(datas[1]) + "  [" + datas[3] + "]";
            } else {
                return datas[2] + "  个  " + window.awardTypeMap.get(datas[0]) + "  [" + datas[3] + "]";
            }
        }

        function parseNumDesc(info) {
            var datas = info.split(",");
            return datas[0] + "  个  " + "  [" + datas[1] + "]";
        }

        function initLootInfo(dataHelper, info, func) {
            if (!info) {
                return;
            }
            var datas = info.split(";");
            if (datas.length > 0) {
                for (var i = 0; i < datas.length; ++i) {
                    var desc = func(datas[i]);
                    dataHelper.initItem(desc, datas[i]);
                }
            }
        }

        function DataHelper(attr) {
            this.id = attr.id;
            this.dom = attr.dom;
            this.labelIndex = 0;
            this.data = {};
            this.addItem = function (desc, data) {
                var index = ++this.labelIndex;
                var id = this.id + "_" + index;
                var domId = this.dom.id;
                this.data[id] = data;
                new Ext.form.Label({
                    id: id,
                    renderTo: domId,
                    html: "<p class='vo'><span><a onclick='clearSelectedItem(\"" + id + "\")'>X</a> " + desc + " </span></p>"
                });
            };
            this.initItem = function (desc, data) {
                var index = ++this.labelIndex;
                var id = this.id + "_" + index;
                this.data[id] = data;
                this.dom.items.add(new Ext.form.Label({
                    id: id,
                    html: "<p class='vo'><span><a onclick='clearSelectedItem(\"" + id + "\")'>X</a> " + desc + " </span></p>"
                }));
            };
            this.removeItem = function (index) {
                var id = this.id + "_" + index;
                Ext.getCmp(id).destroy();
                delete(this.data[id]);
            };
            this.getInfo = function () {
                var arr = [];
                var cnt = 0;
                for (var i in this.data) {
                    console.log("key " + i + " value " + this.data[i]);
                    arr.push(this.data[i]);
                    ++cnt;
                }
                console.log("size is " + cnt);
                return arr.join(";");
            };

        }

        window.clearSelectedItem = function (id) {
            var data = id.split("_");

            if (data[0] == "lootItemDataHelper") {
                lootItemDataHelper.removeItem(data[1]);
            } else if (data[0] == "randomLootItemDataHelper") {
                randomLootItemDataHelper.removeItem(data[1]);
            } else if (data[0] == "numDataHelper") {
                numDataHelper.removeItem(data[1]);
            } else {
                alert("unknown id " + id);
            }
        };

        var lootItemFieldSet = new Ext.form.FieldSet({
            id: 'lootItemFieldSet',
            labelAlign: 'left',
            defaultType: 'label',
            name: 'itemNames',
            width: 220,
            autoHeight: true,
            fieldLabel: '固定奖励',
            items: []
        });
        var lootItemDataHelper = new DataHelper({id: "lootItemDataHelper", dom: lootItemFieldSet});

        var randomLootItemFieldSet = new Ext.form.FieldSet({
            id: 'randomLootItemFieldSet',
            labelAlign: 'left',
            defaultType: 'label',
            name: 'itemNames',
            width: 220,
            autoHeight: true,
            fieldLabel: '随机奖励',
            items: []
        });
        var randomLootItemDataHelper = new DataHelper({id: "randomLootItemDataHelper", dom: randomLootItemFieldSet});

        var numFieldSet = new Ext.form.FieldSet({
            id: 'numFieldSet',
            labelAlign: 'left',
            defaultType: 'label',
            name: 'itemNames',
            width: 120,
            autoHeight: true,
            fieldLabel: '随机奖励数量',
            items: []
        });
        var numDataHelper = new DataHelper({id: "numDataHelper", dom: numFieldSet});

        var getName = new Ext.form.TextField({
        	name: 'name',
        	value: awardConfig.data.name,
            fieldLabel: '礼包名',
            width: 150,
            labelSeparator: '：',
            allowBlank: false,
            blankText: '礼包名'
        });
        var getSubType = new Ext.form.TextField({
            name: 'subType',
            value: awardConfig.data.subType,
            fieldLabel: '子类型',
            width: 150,
            labelSeparator: '：',
            allowBlank: false,
            blankText: '子类型'
        });

        var childGrid = new Ext.form.FormPanel({
            frame: true,
            tbar: tbar,
            bbar: bbar,
            loadMask: {msg: '正在加载数据，请稍候...'},
            items: [
						getName,
						getSubType,
                {
                    columnWidth: ".5",
                    layout: 'column',
                    items: [
                        {
                            columnWidth: 1,
                            layout: 'hbox',
                            items: [
                                {
                                    layout: 'form',
                                    style: 'padding-right:10px;',
                                    items: [
                                        new Ext.form.ComboBox({
                                            id: 'typeSelector',
                                            width: 90,
                                            store: new Ext.data.SimpleStore({
                                                fields: ['id', 'name'],
                                                data: window.awardTypeMap.arr
                                            }),
                                            triggerAction: 'all',
                                            fieldLabel: '物品类型',
                                            valueField: 'id',
                                            displayField: 'name',
                                            editable: false,
                                            mode: 'local',
                                            forceSelection: true,
                                            value: '0',
                                            allowBlank: false,
                                            blankText: '请选择物品类型',
                                            listeners: {
                                                'select': function (combo, record, index) {
                                                    if (index == 0) {
                                                        Ext.getCmp("itemSelector").show();
                                                    } else {
                                                        Ext.getCmp("itemSelector").hide();
                                                    }
                                                }
                                            }
                                        })

                                    ]
                                },
                                {
                                    layout: 'form',
                                    style: 'padding-right:10px;',
                                    items: [
                                        new Ext.form.ComboBox({
                                            id: 'itemSelector',
                                            width: 120,
                                            fieldLabel: '选择物品',
                                            store: new Ext.data.SimpleStore({
                                                fields: ['id', 'name'],
                                                data: window.vmap
                                            }),
                                            triggerAction: 'query',
                                            valueField: 'id',
                                            typeAhead: true,
                                            displayField: 'name',
                                            editable: true,
                                            queryMode: "local",
                                            mode: 'local',
                                            forceSelection: true,
                                            value: '',
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
                                        })]
                                },
                                {
                                    width: 150,
                                    layout: 'form',
                                    labelWidth: 50,
                                    items: [
                                        new Ext.form.TextField({
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
                                            blankText: '不能为空'
                                        })]
                                },
                                {
                                    width: 150,
                                    layout: 'form',
                                    labelWidth: 50,
                                    items: [
                                        new Ext.form.TextField({
                                            id: 'itemWeight',
                                            width: 80,
                                            fieldLabel: '权重',
                                            allowBlank: false,
                                            editable: false,
                                            format: 'Y-m-d',
                                            value: 1,
                                            regex: /^\d+$/,
                                            regexText: '请输入数字',
                                            emptyText: '请填写数字',
                                            blankText: '不能为空'
                                        })]
                                },
                                {
                                    width: 100,
                                    layout: 'form',
                                    items: [
                                        new Ext.Button({
                                            text: "添加固定奖励",
                                            handler: function () {
                                                var typeSelector = Ext.getCmp("typeSelector");
                                                var type = typeSelector.getValue();
                                                if (type == 0) {
                                                    var itemSelector = Ext.getCmp("itemSelector");
                                                    if (itemSelector.getRawValue() == "") {
                                                        Ext.Msg.alert("错误", "请选择物品")
                                                        return;
                                                    }
                                                }
                                                var count = Ext.getCmp("itemNum").getValue() - 0;
                                                if (count <= 0 || count + "" == "NaN") {
                                                    Ext.Msg.alert("错误", "请输入正整数")
                                                    return;
                                                }
                                                var weight = Ext.getCmp("itemWeight").getValue() - 0;
                                                if (count <= 0 || count + "" == "NaN") {
                                                    Ext.Msg.alert("错误", "请输入正整数")
                                                    return;
                                                }

                                                if (type == 0) {
                                                    var itemStr = "0," + itemSelector.getValue() + "," + count + "," + weight;
                                                } else {
                                                    var itemStr = type + "," + "0," + count + "," + weight;
                                                }
                                                var desc = parseItemDesc(itemStr);
                                                lootItemDataHelper.addItem(desc, itemStr);
                                            }
                                        })]
                                },
                                {
                                    width: 100,
                                    layout: 'form',
                                    items: [
                                        new Ext.Button({
                                            text: "添加随机奖励",
                                            handler: function () {
                                                var typeSelector = Ext.getCmp("typeSelector");
                                                var type = typeSelector.getValue();
                                                if (type == 0) {
                                                    var itemSelector = Ext.getCmp("itemSelector");
                                                    if (itemSelector.getRawValue() == "") {
                                                        Ext.Msg.alert("错误", "请选择物品")
                                                        return;
                                                    }
                                                }
                                                var count = Ext.getCmp("itemNum").getValue() - 0;
                                                if (count <= 0 || count + "" == "NaN") {
                                                    Ext.Msg.alert("错误", "请输入正整数")
                                                    return;
                                                }
                                                var weight = Ext.getCmp("itemWeight").getValue() - 0;
                                                if (count <= 0 || count + "" == "NaN") {
                                                    Ext.Msg.alert("错误", "请输入正整数")
                                                    return;
                                                }

                                                if (type == 0) {
                                                    var itemStr = "0," + itemSelector.getValue() + "," + count + "," + weight;
                                                } else {
                                                    var itemStr = type + "," + "0," + count + "," + weight;
                                                }
                                                var desc = parseItemDesc(itemStr);
                                                randomLootItemDataHelper.addItem(desc, itemStr);
                                            }
                                        })]
                                },
                                {
                                    width: 120,
                                    layout: 'form',
                                    items: [
                                        new Ext.Button({
                                            text: "添加随机奖励数量",
                                            handler: function () {
                                                var count = Ext.getCmp("itemNum").getValue() - 0;
                                                if (count <= 0 || count + "" == "NaN") {
                                                    Ext.Msg.alert("错误", "请输入正整数")
                                                    return;
                                                }
                                                var weight = Ext.getCmp("itemWeight").getValue() - 0;
                                                if (count <= 0 || count + "" == "NaN") {
                                                    Ext.Msg.alert("错误", "请输入正整数")
                                                    return;
                                                }

                                                var itemStr = count + "," + weight;
                                                var desc = parseNumDesc(itemStr);
                                                numDataHelper.addItem(desc, itemStr);
                                            }
                                        })]
                                }
                            ]
                        },
                        {
                            columnWidth: 1,
                            layout: 'form',
                            items: [
                                {
                                    columnWidth: 1,
                                    layout: 'hbox',
                                    items: [
                                        {
                                            height: 500,
                                            layout: 'form',
                                            style: 'padding-right:20px;',
                                            items: [lootItemFieldSet]
                                        },
                                        {
                                            height: 500,
                                            layout: 'form',
                                            style: 'padding-right:20px;',
                                            items: [randomLootItemFieldSet]
                                        },
                                        {
                                            height: 500,
                                            layout: 'form',
                                            items: [numFieldSet]
                                        }
                                    ]
                                }

                            ]
                        }

                    ]
                }
            ]
        });

        initLootInfo(lootItemDataHelper, awardConfig.data.lootInfo, parseItemDesc);
        initLootInfo(randomLootItemDataHelper, awardConfig.data.randomLootInfo, parseItemDesc);
        initLootInfo(numDataHelper, awardConfig.data.numInfo, parseNumDesc);

        var xWindow = new Ext.Window({
            title: "礼包编辑",
            width: 1100,
            height: 600,
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

    window.extraButton.push({text: '编辑礼包', iconCls: 'editButton', func: buttonCreator});
})
();