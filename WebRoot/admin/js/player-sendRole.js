(function () {

    var toolbar1 = new Ext.Toolbar({
        width: '100%',
    });

    var toolbar2 = new Ext.Toolbar({
        width: '100%',
    });

    var petAllStore = new Ext.data.SimpleStore({
        data: window.mmap,
        fields: ["id", "name", "num"],
        sortInfo: {field: "id", direction: "ASC"}
    });

    var sm2 = new Ext.grid.CheckboxSelectionModel({});

    var dataStore2 = new Ext.data.SimpleStore({
        data: [],
        fields: ["id", "name", "num"],
    });

    var itemNumSelector = new Ext.form.TextField({
        width: 80,
        fieldLabel: '数量',
        editable: false,
        format: 'Y-m-d',
        value: 0,
        regex: /^\d+$/,
        regexText: '请输入数字',
        emptyText: '请填写数字',
        blankText: '不能为空'
    });

    toolbar1.add(
        new Ext.Button({
            text: "添加",
            iconCls: "editButton",
            handler: function () {
                var datas = petAllStore.modified;
                Ext.each(datas, function (item) {
                    if (!item.data.num) {
                        return;
                    }
                    var size = dataStore2.getCount();
                    for (var i = 0; i < size; ++i) {
                        var id = dataStore2.getAt(i).get("id");
                        if (id == item.data.id) {
                            dataStore2.getAt(i).set("num", parseInt(dataStore2.getAt(i).get("num")) + parseInt(item.data.num));
                            dataStore2.commitChanges();
                            return;
                        }
                    }
                    dataStore2.add(new Ext.data.Record(window.deepClone(item.data)));
                });
            }
        }),
        new Ext.Button({
            text: "重置",
            iconCls: "editButton",
            handler: function () {
                petAllStore.rejectChanges();
            }
        })
    );

    toolbar2.add(
        new Ext.Button({
            text: "发送",
            iconCls: "editButton",
            handler: function () {
                sendFunc();
            }
        }),
        new Ext.Button({
            text: "删除",
            iconCls: "editButton",
            handler: function () {
                var records = sm2.getSelections();
                Ext.each(records, function (r) {
                    dataStore2.remove(r);
                });
            }
        })
    );

    var grid1 = new Ext.grid.EditorGridPanel({
        title: '选择角色 ',
        tbar: toolbar1,
        frame: true,
        stripeRows: true,
        width: 300,
        height: 450,
        tortable: true,
        clicksToEdit: 1,
        store: petAllStore,
        loadMask: {msg: '正在加载数据，请稍候...'},
        viewConfig: {columnsText: '显示列', sortAscText: '升序', sortDescText: '降序'},
        columns: [
            {header: 'ID', width: 70, dataIndex: 'id', sortable: true},
            {header: '名字 ', width: 100, dataIndex: 'name', sortable: true},
            {
                header: '等级 ',
                width: 80,
                dataIndex: 'num',
                sortable: false,
                editor: new Ext.grid.GridEditor(itemNumSelector)
            }
        ]
    });

    var grid2 = new Ext.grid.EditorGridPanel({
        title: '发送角色',
        tbar: toolbar2,
        frame: true,
        stripeRows: true,
        width: 300,
        height: 400,
        tortable: true,
        clicksToEdit: 1,
        store: dataStore2,
        loadMask: {msg: '正在加载数据，请稍候...'},
        viewConfig: {columnsText: '显示列', sortAscText: '升序', sortDescText: '降序'},
        sm: sm2,
        columns: [
            sm2,
            {header: 'ID', width: 70, dataIndex: 'id', sortable: true},
            {header: '名字 ', width: 100, dataIndex: 'name', sortable: true},
            {
                header: '等级 ',
                width: 80,
                dataIndex: 'num',
                sortable: false,
            }
        ]
    });

    var lockForm = new Ext.form.FormPanel({
        style: "margin: 0 0 0 0",
        frame: true,
        items: [
            {
                layout: 'form',
                items: [

                    {
                        columnWidth: 1,
                        layout: 'hbox',
                        items: [
                            {
                                layout: 'form',
                                items: [grid1]
                            },
                            {
                                layout: 'form',
                                width: 60
                            },
                            {
                                layout: 'form',
                                items: [grid2]
                            }
                        ]
                    }
                ]
            }
        ]
    });

    var sendFunc = null;

    var lockWindow = new Ext.Window({
        width: 700,
        height: 500,
        layout: 'fit',
        plain: true,
        modal: true,
        draggable: true,
        resizable: false,
        closable: false,
        bodyStyle: 'padding:5px;',
        buttonAlign: 'center',
        items: lockForm,
        buttons: [
            {
                text: '取消',
                handler: function () {
                    //关闭面板
                    lockWindow.hide();
                }
            }]
    });
    var lockPage = function (user) {
        sendFunc = function () {
            var size = dataStore2.getCount();
            var itemInfo = "";
            for (var i = 0; i < size; ++i) {
                var item = dataStore2.getAt(i);
                itemInfo += item.data.id + "," + item.data.num + "#";
            }
            console.log("userId = " + user.playerId + ", size = " + size, ", itemInfo = " + itemInfo);

            if (!window.confirm("确认发送" + size + "个角色给" + user.name + "?")) {
                return;
            }

            Ext.Ajax.request({
                url: "gmEdit.do?method=sendPlayerRole",
                params: {serverId: window.serverId, playerId: user.playerId, itemInfo: itemInfo},
                loadMask: {msg: '正在加载数据，请稍候...'},
                success: function (response, opts) {
                    Ext.Msg.alert('提示', '成功');
                },
                failure: function (response, opts) {
                    Ext.Msg.alert('提示', '失败');
                }
            });
        };
        lockWindow.show();
    };
//    if(window.canDo){
//    	window.extraButton.push({text: '发放角色', iconCls: 'editButton', func: lockPage});
//    }
})();

/**LOCK FORM END*/