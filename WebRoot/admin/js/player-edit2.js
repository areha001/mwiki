(function () {
    var lockFormCreator = function (user) {
        lockForm = new Ext.form.FormPanel({
            bodyStyle: 'padding:10px 0 0 30px',					//表单边距
            style: "margin: 0 0 0 0",
            labelWidth: 80,
            frame: true,
            items: [
                new Ext.form.TextField({
                    name: 'charge',
                    value: 0,
                    fieldLabel: '累计充值',
                    width: 200,
                    labelSeparator: '：',
                    style: 'margin-bottom:8px;',
                    allowBlank: false,
                    blankText: '累计充值'
                }),
                new Ext.form.TextField({
                    name: 'cost',
                    value: 0,
                    fieldLabel: '累计消费',
                    width: 200,
                    labelSeparator: '：',
                    style: 'margin-bottom:8px;',
                    allowBlank: false,
                    blankText: '累计消费'
                })
            ]
        });
    }
    var lockForm = {};
    var lockPage = function (user) {
        lockFormCreator(user);
        var lockWindow = new Ext.Window({
            title: "修改充值消费",
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
                        url: "gmEdit.do?method=updateChargeAndCost",
                        params: {serverId: user.serverId, playerId: user.playerId},
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
    }
    if(window.canDo){
    	window.extraButton.push({text: '修改充值消费', iconCls: 'editButton', func: lockPage});
    }
    
})();
/**LOCK FORM END*/