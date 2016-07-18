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
            text: '战力榜',
            iconCls: 'searchButton',
            handler: showFightingRank
        }),
        new Ext.Button({
            text: '竞技榜',
            iconCls: 'searchButton',
            handler: showArenaRank
        }),
        new Ext.Button({
            text: '队伍榜',
            iconCls: 'searchButton',
            handler: showLevelRank
        }),
        new Ext.Button({
            text: '颜值榜',
            iconCls: 'searchButton',
            handler: showFaceRank
        }),
        new Ext.Button({
            text: '角色榜',
            iconCls: 'searchButton',
            handler: showPlayerRoleRank
        }),
        new Ext.Button({
            text: '钻石榜',
            iconCls: 'searchButton',
            handler: showDiamondRank
        }),
        new Ext.Button({
            text: '副本榜',
            iconCls: 'searchButton',
            handler: showPVERank
        })
    );

    var lastSelectedServer = null;

    function showFightingRank() {

        var selectedCount = smServer.getCount();
        if (selectedCount != 1) {
            Ext.Msg.alert("错误", "请选择一个服务器!");
            return;
        }
        var servers = smServer.getSelections();
        dataStore.removeAll();
        var server = servers[0];
        lastSelectedServer = server;

        dataStore = new Ext.data.Store({
            reader: new Ext.data.JsonReader({
                root: "items",
                totalProperty: "results",
                fields: [
                    {name: "fighting"},
                    {name: "leagueName"},
                    {name: "name"},
                    {name: "head"},
                    {name: "rank"},
                    {name: "uid"},
                ]
            }),
            proxy: new Ext.data.HttpProxy({
                url: 'rankList.do?method=list&which=1'
            }),
            baseParams: {"serverId": server.id},
        });
        var columns = [
            {header: 'ID ', width: 110, dataIndex: 'uid', sortable: true},
            {header: '名字 ', width: 120, dataIndex: 'name', sortable: true},
            {header: '公会名 ', width: 150, dataIndex: 'leagueName', sortable: true},
            {header: '战力 ', width: 80, dataIndex: 'fighting', sortable: true},
            {header: '排名 ', width: 70, dataIndex: 'rank', sortable: true},
        ];

        grid.reconfigure(dataStore, new Ext.grid.ColumnModel(columns));
        grid.doLayout();
        dataStore.load({
            callback: function() {
                grid.setTitle("排行榜-战力榜");
            }
        });
    }

    function showArenaRank() {

        var selectedCount = smServer.getCount();
        if (selectedCount != 1) {
            Ext.Msg.alert("错误", "请选择一个服务器!");
            return;
        }
        var servers = smServer.getSelections();
        dataStore.removeAll();
        var server = servers[0];
        lastSelectedServer = server;

        dataStore = new Ext.data.Store({
            reader: new Ext.data.JsonReader({
                root: "items",
                totalProperty: "results",
                fields: [
                    {name: "fighting"},
                    {name: "leagueName"},
                    {name: "name"},
                    {name: "head"},
                    {name: "rank"},
                    {name: "uid"},
                    {name: "level"},
                ]
            }),
            proxy: new Ext.data.HttpProxy({
                url: 'rankList.do?method=list&which=2'
            }),
            baseParams: {"serverId": server.id},
        });
        var columns = [
            {header: 'ID ', width: 110, dataIndex: 'uid', sortable: true},
            {header: '名字 ', width: 120, dataIndex: 'name', sortable: true},
            {header: '等级 ', width: 70, dataIndex: 'level', sortable: true},
            {header: '公会名 ', width: 150, dataIndex: 'leagueName', sortable: true},
            {header: '战力 ', width: 80, dataIndex: 'fighting', sortable: true},
            {header: '排名 ', width: 70, dataIndex: 'rank', sortable: true},
        ];

        grid.reconfigure(dataStore, new Ext.grid.ColumnModel(columns));
        grid.doLayout();
        dataStore.load({
            callback: function() {
                grid.setTitle("排行榜-竞技榜");
            }
        });
    }

    function showLevelRank() {

        var selectedCount = smServer.getCount();
        if (selectedCount != 1) {
            Ext.Msg.alert("错误", "请选择一个服务器!");
            return;
        }
        var servers = smServer.getSelections();
        dataStore.removeAll();
        var server = servers[0];
        lastSelectedServer = server;

        dataStore = new Ext.data.Store({
            reader: new Ext.data.JsonReader({
                root: "items",
                totalProperty: "results",
                fields: [
                    {name: "leagueName"},
                    {name: "name"},
                    {name: "head"},
                    {name: "rank"},
                    {name: "uid"},
                    {name: "level"},
                    {name: "exp"},
                ]
            }),
            proxy: new Ext.data.HttpProxy({
                url: 'rankList.do?method=list&which=3'
            }),
            baseParams: {"serverId": server.id},
        });
        var columns = [
            {header: 'ID ', width: 110, dataIndex: 'uid', sortable: true},
            {header: '名字 ', width: 120, dataIndex: 'name', sortable: true},
            {header: '等级 ', width: 70, dataIndex: 'level', sortable: true},
            {header: '经验 ', width: 70, dataIndex: 'exp', sortable: true},
            {header: '公会名 ', width: 150, dataIndex: 'leagueName', sortable: true},
            {header: '排名 ', width: 70, dataIndex: 'rank', sortable: true},
        ];

        grid.reconfigure(dataStore, new Ext.grid.ColumnModel(columns));
        grid.doLayout();
        dataStore.load({
            callback: function() {
                grid.setTitle("排行榜-队伍榜");
            }
        });
    }

    function showFaceRank() {

        var selectedCount = smServer.getCount();
        if (selectedCount != 1) {
            Ext.Msg.alert("错误", "请选择一个服务器!");
            return;
        }
        var servers = smServer.getSelections();
        dataStore.removeAll();
        var server = servers[0];
        lastSelectedServer = server;

        dataStore = new Ext.data.Store({
            reader: new Ext.data.JsonReader({
                root: "items",
                totalProperty: "results",
                fields: [
                    {name: "leagueName"},
                    {name: "name"},
                    {name: "head"},
                    {name: "rank"},
                    {name: "uid"},
                    {name: "face"},
                    {name: "faceLevel"},
                ]
            }),
            proxy: new Ext.data.HttpProxy({
                url: 'rankList.do?method=list&which=4'
            }),
            baseParams: {"serverId": server.id},
        });
        var columns = [
            {header: 'ID ', width: 110, dataIndex: 'uid', sortable: true},
            {header: '名字 ', width: 120, dataIndex: 'name', sortable: true},
            {header: '颜值 ', width: 70, dataIndex: 'face', sortable: true},
            {header: '颜值等级 ', width: 80, dataIndex: 'faceLevel', sortable: true},
            {header: '公会名 ', width: 150, dataIndex: 'leagueName', sortable: true},
            {header: '排名 ', width: 70, dataIndex: 'rank', sortable: true},
        ];

        grid.reconfigure(dataStore, new Ext.grid.ColumnModel(columns));
        grid.doLayout();
        dataStore.load({
            callback: function() {
                grid.setTitle("排行榜-颜值榜");
            }
        });
    }

    function showPlayerRoleRank() {

        var selectedCount = smServer.getCount();
        if (selectedCount != 1) {
            Ext.Msg.alert("错误", "请选择一个服务器!");
            return;
        }
        var servers = smServer.getSelections();
        dataStore.removeAll();
        var server = servers[0];
        lastSelectedServer = server;

        dataStore = new Ext.data.Store({
            reader: new Ext.data.JsonReader({
                root: "items",
                totalProperty: "results",
                fields: [
                    {name: "name"},
                    {name: "head"},
                    {name: "rank"},
                    {name: "uid"},
                    {name: "roleName"},
                    {name: "level"},
                    {name: "rebirth"},
                ]
            }),
            proxy: new Ext.data.HttpProxy({
                url: 'rankList.do?method=list&which=5'
            }),
            baseParams: {"serverId": server.id},
        });
        var columns = [
            {header: 'ID ', width: 110, dataIndex: 'uid', sortable: true},
            {header: '名字 ', width: 120, dataIndex: 'name', sortable: true},
            {header: '角色名 ', width: 80, dataIndex: 'roleName', sortable: true},
            {header: '转生 ', width: 80, dataIndex: 'rebirth', sortable: true},
            {header: '角色等级 ', width: 80, dataIndex: 'level', sortable: true},
            {header: '排名 ', width: 70, dataIndex: 'rank', sortable: true},
        ];

        grid.reconfigure(dataStore, new Ext.grid.ColumnModel(columns));
        grid.doLayout();
        dataStore.load({
            callback: function() {
                grid.setTitle("排行榜-角色榜");
            }
        });
    }

    function showDiamondRank() {

        var selectedCount = smServer.getCount();
        if (selectedCount != 1) {
            Ext.Msg.alert("错误", "请选择一个服务器!");
            return;
        }
        var servers = smServer.getSelections();
        dataStore.removeAll();
        var server = servers[0];
        lastSelectedServer = server;

        dataStore = new Ext.data.Store({
            reader: new Ext.data.JsonReader({
                root: "items",
                totalProperty: "results",
                fields: [
                    {name: "name"},
                    {name: "head"},
                    {name: "rank"},
                    {name: "uid"},
                    {name: "diamond"},
                    {name: "level"},
                    {name: "leagueName"},
                ]
            }),
            proxy: new Ext.data.HttpProxy({
                url: 'rankList.do?method=list&which=6'
            }),
            baseParams: {"serverId": server.id},
        });
        var columns = [
            {header: 'ID ', width: 110, dataIndex: 'uid', sortable: true},
            {header: '名字 ', width: 120, dataIndex: 'name', sortable: true},
            {header: '等级 ', width: 80, dataIndex: 'level', sortable: true},
            {header: '钻石 ', width: 80, dataIndex: 'diamond', sortable: true},
            {header: '排名 ', width: 70, dataIndex: 'rank', sortable: true},
        ];

        grid.reconfigure(dataStore, new Ext.grid.ColumnModel(columns));
        grid.doLayout();
        dataStore.load({
            callback: function() {
                grid.setTitle("排行榜-钻石榜");
            }
        });
    }

    function showPVERank() {

        var selectedCount = smServer.getCount();
        if (selectedCount != 1) {
            Ext.Msg.alert("错误", "请选择一个服务器!");
            return;
        }
        var servers = smServer.getSelections();
        dataStore.removeAll();
        var server = servers[0];
        lastSelectedServer = server;

        dataStore = new Ext.data.Store({
            reader: new Ext.data.JsonReader({
                root: "items",
                totalProperty: "results",
                fields: [
                    {name: "name"},
                    {name: "head"},
                    {name: "rank"},
                    {name: "uid"},
                    {name: "star"},
                    {name: "leagueName"},
                ]
            }),
            proxy: new Ext.data.HttpProxy({
                url: 'rankList.do?method=list&which=7'
            }),
            baseParams: {"serverId": server.id},
        });
        var columns = [
            {header: 'ID ', width: 110, dataIndex: 'uid', sortable: true},
            {header: '名字 ', width: 120, dataIndex: 'name', sortable: true},
            {header: '星星 ', width: 80, dataIndex: 'star', sortable: true},
            {header: '排名 ', width: 70, dataIndex: 'rank', sortable: true},
        ];

        grid.reconfigure(dataStore, new Ext.grid.ColumnModel(columns));
        grid.doLayout();
        dataStore.load({
            callback: function() {
                grid.setTitle("排行榜-副本榜");
            }
        });
    }

    var dataStore = new Ext.data.Store();

    var sm = new Ext.grid.CheckboxSelectionModel({
        singleSelect: true
    });         //定义选择模式

    var gridServer = window.createServerGrid();
    var smServer = gridServer.getSelectionModel();
    var grid = new Ext.grid.GridPanel({
        title: '排行榜',
        frame: true,
        stripeRows: true,
        tortable: true,
        loadMask: {msg: '正在加载数据，请稍候...'},
        tbar: [toolbarUser],
        sm: sm,
        store: dataStore,
        viewConfig: {columnsText: '显示列', sortAscText: '升序', sortDescText: '降序'},
        columns: []
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
                id: "container",
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