(function () {
    var lockFormCreator = function (user) {
        lockForm = new Ext.form.FormPanel({
            bodyStyle: 'padding:10px 0 0 30px',					//表单边距
            style: "margin: 0 0 0 0",
            labelWidth: 80,
            frame: true,
            items: [
                comboBox,
                new Ext.Button({
                    text: "充值",
                    iconCls: "editButton",
                    handler: function () {
                        var id = comboBox.getValue();
                        Ext.Msg.confirm("确认给" + user.name + "充值" + window.chargeIdMap.get(id) + "?", "", function (op) {
                            if (op == 'yes') {
                                Ext.Ajax.request({
                                    url: "gmEdit.do?method=charge",
                                    params: {serverId:user.serverId, playerId: user.playerId, chargeId: id},
                                    loadMask: {msg: '正在加载数据，请稍候...'},
                                    success: function (response, opts) {
                                    	Ext.Msg.alert('提示', '成功!', function () {
                                            storeUser.reload();
                                            lockWindow.hide();
                                        });
                                    },
                                    failure: function (response, opts) {
                                        Ext.Msg.alert('提示', '失败!');
                                    }
                                });
                            }
                        })
                    }
                })
            ]
        });
    };

    var comboBox = new Ext.form.ComboBox({
        id: 'chargeId',
        width: 100,
        store: new Ext.data.SimpleStore({
            fields: ['id', 'name'],
            data: window.chargeIdMap.arr
        }),
        triggerAction: 'all',
        fieldLabel: '套餐',
        valueField: 'id',
        displayField: 'name',
        editable: false,
        mode: 'local',
        value: "1",
        forceSelection: true,
        allowBlank: false,
        blankText: '请选择套餐'
    });

    var lockForm = {};
    var lockWindow;
    var lockPage = function (user) {
        lockFormCreator(user);
        lockWindow = new Ext.Window({
            title: "充值 ",
            width: 400,
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
                    lockForm.form.submit({
                        clientValidation: true,
                        waitMsg: '正在提交信息,请稍后...',
                        waitTitle: '提示',
                        url: "gmEdit.do?method=charge",
                        params: {serverId: user.serverId, playerId: user.playerId, chargeId: comboBox.getValue()},
                        success: function (form, action) {
                            window.Ext.Msg.alert("提示", "操作成功！", function () {
                                storeUser.reload();
                                lockWindow.hide();
                            });
                        },
                        failure: function (form, action) {
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
    if(window.canDo){
    	window.extraButton2.push({text: 'VIP', iconCls: 'editButton', func: lockPage});
    }
})();