Ext.onReady(function () {

    Ext.BLANK_IMAGE_URL = "../js/ext-3.3.1/resources/images/default/s.gif";
    Ext.QuickTips.init();    //初始化信息提示
    Ext.form.Field.prototype.msgTarget = "qtip";//统一指定错误信息提示方式

    Ext.Msg.buttonText.yes = "确定";
    Ext.Msg.buttonText.ok = "确定";
    Ext.Msg.buttonText.cancel = "取消";
    Ext.Msg.buttonText.no = "取消";

    var toolbarUser = new Ext.Toolbar({
        width: '100%'
    });

    toolbarUser.add('-',
        new Ext.Button({
            text: '查询',
            iconCls: 'searchButton',
            handler: queryAwardConfig
        })
    );

    if (window.extraButton.length != 0) {
        for (var i = 0; i < window.extraButton.length; i++) {
            var btn = window.extraButton[i];
            toolbarUser.add(
                new Ext.Button({
                    id: btn.id,
                    disabled: btn.disabled,
                    text: btn.text,
                    iconCls: btn.iconCls,
                    myHandler: btn.func,
                    handler: function () {
                        var selections = sm.getSelections();
                        if (selections.length != 1) {
                            Ext.MessageBox.alert("提示", "请选择一条礼包记录!");
                            return;
                        }
                        this.myHandler(lastSelectedServer, selections[0], dataStore);
                    }
                })
            );
        }
    }

    var lastSelectedServer = null;

    function queryAwardConfig() {
        var selectedCount = smServer.getCount();
        if (selectedCount != 1) {
            Ext.Msg.alert("错误", "请选择一个服务器!!");
            return;
        }
        var servers = smServer.getSelections();
        window.ffff = servers;
        dataStore.removeAll();
        var failedInfo = "";
        var server = servers[0];
        lastSelectedServer = server;

        dataStore.load({
            params: {"serverId": server.id},
            callback: function (r, option, success) {
                if (!success) {
                    failedInfo = failedInfo + server.data.name + "  无法连接<br/>";
                    Ext.Msg.alert("服务器连接异常", failedInfo);
                }
                else {

                }
            }
        });

    }

    var dataStore = new Ext.data.Store({
        reader: new Ext.data.JsonReader({
            root: "items",
            totalProperty: "results",
            fields: [
                {name: "id"},
                {name: "type"},
                {name: "subType"},
                {name: "name"},
                {name: "lootInfo"},
                {name: "numInfo"},
                {name: "randomLootInfo"},
            ]
        }),
        proxy: new Ext.data.HttpProxy({
            url: 'awardConfig.do?method=list&tag=1'
        }),
    });

    var sm = new Ext.grid.CheckboxSelectionModel({
        singleSelect: true,
        listeners: {
            rowselect: function (sm, num, record) {
                Ext.getCmp("btn2").setDisabled(record.data.type != 5);
            }
        }
    });         //定义选择模式

    var gridServer = window.createServerGrid();
    var smServer = gridServer.getSelectionModel();
    var grid = new Ext.grid.GridPanel({
        title: '礼包信息',
        frame: true,
        stripeRows: true,
        tortable: true,
        loadMask: {msg: '正在加载数据，请稍候...'},
        tbar: [toolbarUser],
        sm: sm,
        store: dataStore,
        viewConfig: {columnsText: '显示列', sortAscText: '升序', sortDescText: '降序'},
        columns: [//对应的列
            sm,//对应ID
            {header: 'ID', width: 70, dataIndex: 'id', sortable: true},
            {
                header: '名字 ', width: 120, dataIndex: 'name', sortable: true,
                renderer: function (val, metadata, record) {

                    var subType = record.data.subType;
                    switch (record.data.type) {
                        case 5: // 冲榜奖励
                            return window.getHighRankAwardsName(subType);
                        case 6: // 节日礼包
                            return window.ftmap[subType];
                    }
                    return val;
                }
            },
            {
                header: '类型 ', width: 120, dataIndex: 'type', sortable: true,
                renderer: function (val) {
                    return window.awardConfigTypeMap.get(val);
                }
            },
            {header: '子类型 ', width: 60, dataIndex: 'subType', sortable: true},
            {header: '固定奖励 ', width: 450, dataIndex: 'lootInfo', sortable: true},
            {header: '数量权重 ', width: 200, dataIndex: 'numInfo', sortable: true},
            {header: '随机奖励 ', width: 450, dataIndex: 'randomLootInfo', sortable: true},
        ]
    });

    new Ext.Viewport({
        layout: 'fit',
        items: [{
            layout: 'border',
            items: [{
                // xtype: 'panel' implied by default
                title: '服务器过滤',
                region: 'north',
                margins: '5 0 0 5',
                height: 150,
                collapsible: true,   // make collapsible
                split: true,         // enable resizing
                cmargins: '5 5 0 5', // adjust top margin when collapsed
                id: 'west-region-container',
                layout: 'fit',
                items: [gridServer]
            }, {
                title: 'Center Region',
                region: 'center',     // center region is required, no width/height specified
                xtype: 'container',
                layout: 'fit',
                height: 100,
                minSize: 75,         // defaults to 75
                margins: '5 5 0 0',
                items: [grid]
            }]
        }]
    });

});