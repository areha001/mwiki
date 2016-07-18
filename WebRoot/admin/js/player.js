Ext.onReady(function () {

    Ext.BLANK_IMAGE_URL = "../js/ext-3.3.1/resources/images/default/s.gif";
    Ext.QuickTips.init();    //初始化信息提示
    Ext.form.Field.prototype.msgTarget = "qtip";//统一指定错误信息提示方式

    Ext.Msg.buttonText.yes = "确定";
    Ext.Msg.buttonText.ok = "确定";
    Ext.Msg.buttonText.cancel = "取消";
    Ext.Msg.buttonText.no = "取消";
    var DefaultLimitSize = 20;
    var getMySelect = function () {
        var records = grid.getSelectionModel().getSelections();
        if (records == "") {
            Ext.MessageBox.alert("提示", "请选择记录后再进行操作!");
            return;
        }
        var arrId = new Array();
        for (var i = 0; i < records.length; i++) {
            arrId.push(records[i].id);
        }
        return arrId;
    }
	
	var departName = new Ext.data.Store({
		proxy:new Ext.data.HttpProxy({
			url:'partnerManager.do?method=findPartner'
		}),
		reader:new Ext.data.JsonReader({},['id','dcode','text'])
	});
	departName.load({
		callback: function (store) {
			Ext.getCmp("partnerCodeId").setValue(store[0].store.getAt(0).get('dcode'));
		}
	})
    //定义菜单选择项
    var toolbarServer = new Ext.Toolbar({
        width: '100%'
    });

    var toolbar1 = new Ext.Toolbar({
        width: '100%'
    });

    toolbar1.add('-', '合作商:',
			new Ext.form.ComboBox({
				   fieldLabel:'所属渠道',
		    	   width:120,
		    	   id:'partnerCodeId',
		    	   hiddenName:'partnerCodeId',
				   store:departName,
				   triggerAction:'all',
				   valueField:'dcode',
				   displayField:'text',
				   editable:false,
				   mode:'remote',
				   forceSelection:true,
				   allowBlank:false,
				   blankText:'请填写渠道'
		       }),"-",
		        new Ext.form.TextField({
		            id: 'splayerId',
		            name: 'playerId',
		            fieldLabel: '',
		            width: 120,
		            value: window.top.splayerId ? window.top.splayerId : '',
		            allowBlank: true,//数据库中可以为空的话 这二行可以去掉
		            emptyText: '玩家ID'
		        }),"-",
		
		        new Ext.form.TextField({
		            id: 'suserName',
		            name: 'userName',
		            fieldLabel: '',
		            width: 120,
		            value: '',
		            allowBlank: true,//数据库中可以为空的话 这二行可以去掉
		            emptyText: '帐号名',
		            hidden: true
		        }),
		
		        new Ext.form.TextField({
		            id: 'sname',
		            name: 'name',
		            fieldLabel: '',
		            width: 120,
		            value: '',
		            allowBlank: true,//数据库中可以为空的话 这二行可以去掉
		            blankText: '不能为空',
		            emptyText: '角色名'
		        }),
		        new Ext.Button({
		            text: '查找',
		            iconCls: 'findButton',
		            handler: searchUser
		        })
    );

    var toolbar2 = new Ext.Toolbar({
        width: '100%'
    });

    function searchUser() {
        var playerId = Ext.getCmp('splayerId').getValue();
        var userName = Ext.getCmp('suserName').getValue();
        var name = Ext.getCmp('sname').getValue();
        var channel = Ext.getCmp('partnerCodeId').getValue();
        var selectedCount = smServer.getCount();
        if (selectedCount != 1) {
            Ext.Msg.alert("错误", "请选择一个服务器")
            return;
        }
        var servers = smServer.getSelections();
        storeUser.removeAll();
        var failedInfo = "";
        Ext.each(servers, function (server) {
            window.serverId = server.id;

            storeUser.load({
                params: {"channel": channel, "name": name, "userName": userName, "playerId": playerId, "serverId": server.id},
                //add :true,
                callback: function (r, option, success) {
                    if (!success) {
                        failedInfo = failedInfo + server.data.name + "  无法连接<br/>";
                        Ext.Msg.alert("服务器连接异常", failedInfo);
                    }
                    else {
                        if (servers.length == 1 && storeUser.data.length == 1) {
                            var pid = storeUser.getAt(0).data.playerId;
                            Ext.getCmp("splayerId").setValue(pid);
                            window.top.splayerId = pid;
                        }


                    }
                }
            });
        });

    };

    if (window.extraButton.length > 0) {
        for (var i = 0; i < window.extraButton.length; i++) {
            var btn = window.extraButton[i];
            toolbar1.add('-',
                new Ext.Button({
                    text: btn.text,
                    iconCls: btn.iconCls,
                    myTrigger: btn.func,
                    handler: function () {
                        var users = sm.getSelections();
                        if (users.length != 1) {
                            Ext.MessageBox.alert("提示", "请选择一条用户记录!");
                            return;
                        }
                        this.myTrigger(users[0].data)
                    }
                })
            );
        }
    }

    if (window.extraButton2.length > 0) {
        for (var i = 0; i < window.extraButton2.length; i++) {
            var btn = window.extraButton2[i];
            toolbar2.add('-',
                new Ext.Button({
                    text: btn.text,
                    iconCls: btn.iconCls,
                    myTrigger: btn.func,
                    handler: function () {
                        var users = sm.getSelections();
                        if (users.length != 1) {
                            Ext.MessageBox.alert("提示", "请选择一条用户记录!");
                            return;
                        }
                        this.myTrigger(users[0].data)
                    }
                })
            );
        }
    }

    storeUser = new Ext.data.Store({
        reader: new Ext.data.JsonReader({
            root: "data",
            fields: [
                {name: "serverId"},
                {name: "serverName"},
                {name: "roleId"},
                {name: "userName"},
                {name: "name"},
                {name: "createTime"},
                {name: "lastLoginTime"},
                {name: "status"},
                {name: "energy"},
                {name: "playerId"},
                {name: "accountID"},
                {name: "vipLevel"},
                {name: "level"},
                {name: "gold"},
                {name: "diamond"},
                {name: "publishChannel"},
                {name: "playerUnlockedTime"},
                {name: "exp"},
                {name: "apple"}
            ]
        }),
        proxy: new Ext.data.HttpProxy({
            url: 'userManager.do?method=searchUser'
        })
    });

    var sm = new Ext.grid.CheckboxSelectionModel({
    	singleSelect: true
    });         //定义选择模式

    var gridServer = window.createServerGrid();
    var smServer = gridServer.getSelectionModel();
    var grid = new Ext.grid.GridPanel({
        title: '用户基本信息',
        frame: true,
        stripeRows: true,
        tortable: true,
        loadMask: {msg: '正在加载数据，请稍候...'},
        tbar: [],
        sm: sm,
        store: storeUser,
        viewConfig: {columnsText: '显示列', sortAscText: '升序', sortDescText: '降序'},
        columns: [//对应的列
            sm,//对应ID
            {header: '玩家ID ', width: 110, dataIndex: 'playerId', sortable: true},
            {header: '渠道 ', width: 80, dataIndex: 'publishChannel', sortable: true},
            {header: '服务器 ', width: 100, dataIndex: 'serverName', sortable: true},
            {header: '角色名 ', width: 100, dataIndex: 'name', sortable: true},
            {header: '角色等级', width: 80, dataIndex: 'level', sortable: false},
            {header: '角色总经验', width: 100, dataIndex: 'exp', sortable: false},
            {header: '体力', width: 90, dataIndex: 'energy', sortable: false},
            {header: '钻石', width: 80, dataIndex: 'diamond', sortable: false},
            {header: '金币', width: 80, dataIndex: 'gold', sortable: false},
            {header: '苹果币', width: 80, dataIndex: 'apple', sortable: false},
            {header: 'VIP等级', width: 80, dataIndex: 'vipLevel', sortable: false},
            {header: '最后登录时间', width: 130, dataIndex: 'lastLoginTime', sortable: false, renderer: Ext.dateRenderer},
            {header: '创角时间 ', width: 130, dataIndex: 'createTime', sortable: true, renderer: Ext.dateRenderer},
            {header: '帐号名 ', width: 100, dataIndex: 'userName', sortable: true},
            {
                header: '目前状态', width: 140, dataIndex: 'status', sortable: false, sortable: true,
                renderer: function (value, metadata, record) {
                    var status = record.data.status;
                    if (status == "-1") {
                        return "<font color='red'>永久封号</font>"
                    }
                    if (status == "0") {
                        return "正常"
                    }
                    var lockTo = record.data.playerUnlockedTime - 0;
                    var adate = "封至<font color='red'>" + Ext.util.Format.date(new Date(lockTo), 'Y-m-d  H:i') + "</font>";
                    if (lockTo >= new Date().getTime()) {
                        return adate;
                    }
                    return record.data.playerUnlockedTime//"正常"
                }
            }
        ],
        listeners: {
            'render': function () {
                toolbar1.render(this.tbar);
                toolbar2.render(this.tbar);
            }
        }
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