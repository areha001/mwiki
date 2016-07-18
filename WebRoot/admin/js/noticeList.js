Ext.onReady(function () {

    Ext.BLANK_IMAGE_URL = "../js/ext-3.3.1/resources/images/default/s.gif";
    Ext.QuickTips.init();    //初始化信息提示
    Ext.form.Field.prototype.msgTarget = "qtip";//统一指定错误信息提示方式

    Ext.Msg.buttonText.yes = "确定";
    Ext.Msg.buttonText.ok = "确定";
    Ext.Msg.buttonText.cancel = "取消";
    Ext.Msg.buttonText.no = "取消";

    var toolbar = new Ext.Toolbar({
        width: '100%'
    });

    toolbar.add(
        new Ext.Button({
            text: '编辑',
            iconCls: 'editButton',
            handler: edit
        }),
        new Ext.Button({
            text: '删除',
            iconCls: 'editButton',
            handler: deleteAll
        })
    );

    function edit() {
        var count = sm.getCount();
        if (count != 1) {
            Ext.Msg.alert("错误", "请选择一条数据!");
            return;
        }

        var data = sm.getSelections()[0].data;
        if (!data) {
            return;
        }

        var ybar = new Ext.Toolbar({
            width: '100%',
            style: 'padding:5px;text-align:center;'
        });
        ybar.add(
            new Ext.Button({
                text: "保存",
                iconCls: "editButton",
                handler: function () {
                    if (!window.confirm("确认保存数据?")) {
                        return;
                    }
                    childGrid.form.submit({
                        clientValidation: true,
                        waitMsg: '正在提交信息,请稍后...',
                        waitTitle: '提示',
                        url: "notice.do?method=editNotice",
                        params: {noticeId:data.noticeId},
                        success: function (form, action) {
                            window.Ext.Msg.alert("提示", "操作成功！", function () {
                                dataStore.reload();
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
            bbar: ybar,
            loadMask: {
                msg: '正在加载数据，请稍候...'
            },
            items: [
                new Ext.form.TextField({
                    name: 'title',
                    value: data.title,
                    fieldLabel: '标题',
                    width: 600,
                    allowBlank: false,
                    blankText: '请输入标题'
                }),
                new Ext.form.TextArea({
                    name: 'body',
                    value: data.body,
                    fieldLabel: '内容',
                    width: 600,
                    height: 450,
                    allowBlank: false,
                    blankText: '请输入内容'
                })
            ]
        });
        var yWindow = new Ext.Window({
            title: "编辑公告",
            width: 800,
            height: 580,
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

    function deleteAll() {
        var count = sm.getCount();
        if (!count) {
            Ext.Msg.alert("错误", "请至少选择一条数据!");
            return;
        }

        if (!window.confirm("确认删除" + count + "条数据?")) {
            return;
        }

        var selections = sm.getSelections();
        var ids = selections.map(function (v) {
            return v.data.noticeId;
        }).join(",");

        Ext.Ajax.request({
            url: "notice.do?method=deleteAll",
            params: {ids: ids},
            loadMask: {msg: '正在加载数据，请稍候...'},
            success: function (response, opts) {
                Ext.Msg.alert('提示', '成功');
                dataStore.reload();
            },
            failure: function (response, opts) {
                Ext.Msg.alert('提示', '失败');
            }
        });
    }

    var dataStore = new Ext.data.Store({
        reader: new Ext.data.JsonReader({
            root: "items",
            totalProperty: "results",
            fields: [
                {name: "noticeId"},
                {name: "title"},
                {name: "body"},
                {name: "createTime"},
                {name: "startTime"},
                {name: "endTime"},
                {name: "priority"},
                {name: "serverId"},
                {name: "channelId"},
                {name: "delaySecond"},
                {name: "xtype"}
            ]

        }),
        proxy: new Ext.data.HttpProxy({
            url: 'notice.do?method=show'
        }),
        baseParams: {}
    });
    dataStore.load();

    var sm = new Ext.grid.CheckboxSelectionModel({
//    	singleSelect: true
    });         //定义选择模式

    var grid = new Ext.grid.GridPanel({
        title: '公告列表',
        frame: true,
        stripeRows: true,
        tortable: true,
        loadMask: {msg: '正在加载数据，请稍候...'},
        tbar: [toolbar],
        sm: sm,
        store: dataStore,
        viewConfig: {columnsText: '显示列', sortAscText: '升序', sortDescText: '降序'},
        columns: [
            sm,
            {header: 'id', width: 60, dataIndex: 'noticeId', sortable: true},
            {header: '标题', width: 130, dataIndex: 'title', sortable: true},
            {header: '内容', width: 450, dataIndex: 'body', sortable: true},
            {header: '渠道', width: 130, dataIndex: 'channelId', sortable: true},
            {header: '服务器', width: 100, dataIndex: 'serverId', sortable: true},
            {header: '周期', width: 60, dataIndex: 'delaySecond', sortable: true},
            {
                header: '公告类型', width: 100, dataIndex: 'xtype', sortable: true,
                renderer: function (value) {
                    return window.noticeIdMap.get(value);
                }
            },
            {header: '开始时间', width: 130, dataIndex: 'startTime', sortable: true, renderer: Ext.dateRenderer},
            {header: '结束时间', width: 130, dataIndex: 'endTime', sortable: true, renderer: Ext.dateRenderer}
        ]
    });

    new Ext.Viewport({
        layout: 'fit',
        items: [{
            layout: 'border',
            items: [{
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