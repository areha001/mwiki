(function () {
    var lockFormCreator = function (user) {
        lockForm = new Ext.form.FormPanel({
            bodyStyle: 'padding:10px 0 0 30px',					//表单边距
            style: "margin: 0 0 0 0",
            labelWidth: 80,
            frame: true,
            items: [
                new Ext.form.TextField({
                    name: 'diamond',
                    value: 0,
                    fieldLabel: '钻石',
                    width: 200,
                    labelSeparator: '：',
                    style: 'margin-bottom:8px;',
                    allowBlank: false,
                    blankText: '钻石'
                }),
                new Ext.form.TextField({
                    name: 'gold',
                    value: 0,
                    fieldLabel: '金币',
                    width: 200,
                    labelSeparator: '：',
                    style: 'margin-bottom:8px;',
                    allowBlank: false,
                    blankText: '金币'
                }),
                new Ext.form.TextField({
                    name: 'energy',
                    value: 0,
                    fieldLabel: '体力',
                    width: 200,
                    labelSeparator: '：',
                    style: 'margin-bottom:8px;',
                    allowBlank: false,
                    blankText: '体力'
                }),
                new Ext.form.TextField({
                    name: 'level',
                    value: 0,
                    fieldLabel: '等级',
                    width: 200,
                    labelSeparator: '：',
                    style: 'margin-bottom:8px;',
                    allowBlank: false,
                    blankText: '等级'
                }),
                new Ext.form.TextField({
                	name: 'vip',
                	value: -1,
                    fieldLabel: 'VIP等级',
                    width: 200,
                    labelSeparator: '：',
                    style: 'margin-bottom:8px;',
                    allowBlank: false,
                    blankText: 'VIP等级'
                }),
                new Ext.form.TextField({
                    name: 'score',
                    value: 0,
                    fieldLabel: '竞技场积分',
                    width: 200,
                    labelSeparator: '：',
                    style: 'margin-bottom:8px;',
                    allowBlank: false,
                    blankText: '竞技场积分'
                }),
				new Ext.form.DateField({ 
					  fieldLabel: '是否封号',
					  labelSeparator: '：',
		              emptyText : '0',
	                  style: 'margin-bottom:8px;',
		              name: 'unlocked',  
		              format:'Y-m-d',//指定显示格式  
		              width:200,
					  value:0,
		              invalidText:'请选择日期', 
				}),
                new Ext.form.TextField({
                    name: 'newName',
                    value: "",
                    fieldLabel: '新角色名',
                    width: 200,
                    labelSeparator: '：',
                    allowBlank: true,
                    blankText: '新角色名'
                })
            ]
        });
    }
    var lockForm = {};
    var lockPage = function (user) {
        lockFormCreator(user);
        var lockWindow = new Ext.Window({
            title: "发放用户属性 ",
            width: 400,
            height: 410,							//是否渲染表单
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
                        url: "gmEdit.do?method=updatePlayerInfo",
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
    	window.extraButton.push({text: '修改用户', iconCls: 'editButton', func: lockPage});
    }
})();

(function () {
    var lockPage = function (user) {
        self.location = 'mail.do?method=page&playerId=' + user.playerId + '&serverId=' + window.serverId + '&userName=' + window.encodeURIComponent(user.name);

    }
    if(window.canDo){
    	window.extraButton.push({text: '发送邮件', iconCls: 'editButton', func: lockPage});
    }
})();
/**LOCK FORM END*/