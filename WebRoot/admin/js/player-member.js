(function () {

    /**LOCK FORM START*/
    var buttonCreator = function (methodName, pageTitle, extraWidth) {
        if (!extraWidth) {
            extraWidth = 0
        }
        var xHistory = function (user) {

            var tbar = new Ext.Toolbar({
                width: '100%',
                style: 'padding:5px;text-align:center;'
            });
            tbar.add(
                new Ext.form.Label({html: "<b> 服务器</b>： " + user.serverName, style: 'padding:8px 20px 8px 20px;'}),
                new Ext.form.Label({html: "<b> 角色名</b>: " + user.name, style: 'padding:8px 20px 8px 20px;'}),
                new Ext.Button({
                    text: "查看洗练",
                    iconCls: "editButton",
                    style: 'padding:8px 00px 8px 20px;',
                    handler: function() {
                        var data = sm.getSelections();
                        if (data.length != 1) {
                            Ext.MessageBox.alert("提示", "请选择一条记录!");
                            return;
                        }

                        window.gfunc["roleRing"](user, data[0].data);
                    }
                })
            );
            var store = new Ext.data.Store({
                reader: new Ext.data.JsonReader({
                    root: "items",
                    totalProperty: "results",
                    fields: [
                        {name: "roleId"},
                        {name: "name"},
                        {name: "level"},
                        {name: "suit"},
                        {name: "attr.fighting"},
                        {name: "exp"},
                        {name: "starName"},
                        {name: "skill1Level"},
                        {name: "skill2Level"},
                        {name: "skill3Level"},
                        {name: "skill4Level"},
                        {name: "roleGarment2"},
                        {name: "roleGarment3"},
                        {name: "roleEquip1"},
                        {name: "roleEquip2"},
                        {name: "roleEquip3"},
                        {name: "roleEquip4"},
                        {name: "roleEquip5"},
                        {name: "roleEquip6"},
                        {name: "shapeShifting"},
                        {name: "rebirth"}
                    ]

                }),
                proxy: new Ext.data.HttpProxy({
                    url: 'userManager.do?method=' + methodName
                }),
                baseParams: {playerId: user.playerId, serverId: user.serverId}
            });
            store.load({
                callback: function (r, option, success) {
                    if (!success) {
                        failedInfo = failedInfo + server.data.name + "  无法连接<br/>";
                        Ext.Msg.alert("服务器连接异常", failedInfo);
                    }
                }
            });

            var rgEditFunc = function (name, roleId, suit) {
                Ext.MessageBox.confirm("提示", "是否添加" + name + "第" + (suit + 1) + "套时装?",
                    function (id) {
                        if (id == 'yes') {
                            Ext.Ajax.request({
                                url: "gmEdit.do?method=addRoleGarment",
                                params: {serverId: user.serverId, playerId: user.playerId, roleId: roleId, suit: suit},
                                success: function (response, opts) {
                                    Ext.Msg.alert('提示', '成功', function () {
                                        store.reload();
                                    });
                                },
                                failure: function (response, opts) {
                                    Ext.Msg.alert('提示', '失败');
                                }
                            });
                        }
                    });
            };

            var lvEditFunc = function (name, roleId) {
                Ext.MessageBox.prompt("提示", "请输入" + name + "的等级", function (id, msg) {
                    if (id == 'ok') {
                        if (isNaN(msg)) {
                            Ext.MessageBox.alert("提示", "请输入整数");
                            return;
                        }
                        var lv = parseInt(msg);
                        Ext.Ajax.request({
                            url: "gmEdit.do?method=editRoleLevel",
                            params: {
                                serverId: user.serverId,
                                playerId: user.playerId,
                                roleId: roleId,
                                level: lv
                            },
                            success: function (response, opts) {
                                Ext.Msg.alert('提示', '成功', function () {
                                    store.reload();
                                });
                            },
                            failure: function (response, opts) {
                                Ext.Msg.alert('提示', '失败');
                            }
                        });
                    }
                });
            };

            var expEditFunc = function (name, roleId) {
                Ext.MessageBox.prompt("提示", "请输入" + name + "要添加的经验", function (id, msg) {
                    if (id == 'ok') {
                        if (isNaN(msg)) {
                            Ext.MessageBox.alert("提示", "请输入整数");
                            return;
                        }
                        var exp = parseInt(msg);
                        Ext.Ajax.request({
                            url: "gmEdit.do?method=editRoleExp",
                            params: {
                                serverId: user.serverId,
                                playerId: user.playerId,
                                roleId: roleId,
                                exp: exp
                            },
                            success: function (response, opts) {
                                Ext.Msg.alert('提示', '成功', function () {
                                    store.reload();
                                });
                            },
                            failure: function (response, opts) {
                                Ext.Msg.alert('提示', '失败');
                            }
                        });
                    }
                });
            };

            var skillLvEditFunc = function (name, roleId, index) {
                Ext.MessageBox.prompt("提示", "请输入" + name + "第" + index + "个技能的等级", function (id, msg) {
                    if (id == 'ok') {
                        if (isNaN(msg)) {
                            Ext.MessageBox.alert("提示", "请输入整数");
                            return;
                        }
                        var lv = parseInt(msg);
                        Ext.Ajax.request({
                            url: "gmEdit.do?method=editRoleSkillLevel",
                            params: {
                                serverId: user.serverId,
                                playerId: user.playerId,
                                roleId: roleId,
                                index: index,
                                level: lv
                            },
                            success: function (response, opts) {
                                Ext.Msg.alert('提示', '成功', function () {
                                    store.reload();
                                });
                            },
                            failure: function (response, opts) {
                                Ext.Msg.alert('提示', '失败');
                            }
                        });
                    }
                });
            };

            var roleEquipEditFunc = function (name, roleId, typeName, type) {
                Ext.MessageBox.prompt("提示", "请输入" + name + "的" + typeName + "等级", function (id, msg) {
                    if (id == 'ok') {
                        if (isNaN(msg)) {
                            Ext.MessageBox.alert("提示", "请输入整数");
                            return;
                        }
                        var lv = parseInt(msg);
                        Ext.Ajax.request({
                            url: "gmEdit.do?method=editRoleEquip",
                            params: {
                                serverId: user.serverId,
                                playerId: user.playerId,
                                roleId: roleId,
                                type: type,
                                level: lv
                            },
                            success: function (response, opts) {
                                Ext.Msg.alert('提示', '成功', function () {
                                    store.reload();
                                });
                            },
                            failure: function (response, opts) {
                                Ext.Msg.alert('提示', '失败');
                            }
                        });
                    }
                });
            };

            var shapeShiftingEditFunc = function (name, roleId, shapeShifting) {
                Ext.MessageBox.confirm("提示", "是否" + (shapeShifting ? "打开" : "关闭") + name + "的变身?",
                    function (id) {
                        if (id == 'yes') {
                            Ext.Ajax.request({
                                url: "gmEdit.do?method=changeShapeShifting",
                                params: {serverId: user.serverId, playerId: user.playerId, roleId: roleId, shapeShifting: shapeShifting},
                                success: function (response, opts) {
                                    Ext.Msg.alert('提示', '成功', function () {
                                        store.reload();
                                    });
                                },
                                failure: function (response, opts) {
                                    Ext.Msg.alert('提示', '失败');
                                }
                            });
                        }
                    });
            };

            var cellClickFunc = function (grid, rowIndex, columnIndex, e) {
            	if(window.canDo){
	                var record = grid.getStore().getAt(rowIndex).data;
	                var fieldName = grid.getColumnModel().getDataIndex(columnIndex);
	                var header = grid.getColumnModel().getColumnHeader(columnIndex);
	                var value = record[fieldName];
	                switch (fieldName) {
	                    case 'level':
	                        lvEditFunc(record.name, record.roleId);
	                        return;
	                    case 'exp':
	                        expEditFunc(record.name, record.roleId);
	                        return;
	                }
	                var ret = fieldName.match(/^roleGarment(\d+)$/);
	                if (ret) {
	                    if (value != '') {
	                        return;
	                    }
	
	                    rgEditFunc(record.name, record.roleId, parseInt(ret[1]) - 1);
	                    return;
	                }
	
	                ret = fieldName.match(/^skill(\d+)Level$/);
	                if (ret) {
	                    skillLvEditFunc(record.name, record.roleId, parseInt(ret[1]));
	                    return;
	                }
	
	                ret = fieldName.match(/^roleEquip(\d+)$/);
	                if (ret) {
	                    roleEquipEditFunc(record.name, record.roleId, header, parseInt(ret[1]));
	                    return;
	                }
	
	                ret = fieldName.match(/^shapeShifting$/);
	                if (ret) {
	                    shapeShiftingEditFunc(record.name, record.roleId, !record.shapeShifting);
	                    return;
	                }
            	}
            };

            var sm = new Ext.grid.CheckboxSelectionModel({
                singleSelect: true
            });

            var grid = new Ext.grid.GridPanel({
                frame: true,
                tbar: tbar,
                stripeRows: true,
                tortable: true,
                loadMask: {msg: '正在加载数据，请稍候...'},
                store: store,
                viewConfig: {columnsText: '显示列', sortAscText: '升序', sortDescText: '降序'},
                sm: sm,
                columns: [//对应的列
                    sm,
                    {header: '角色ID ', width: 50, dataIndex: 'roleId', sortable: true},
                    {header: '角色名 ', width: 70, dataIndex: 'name', sortable: true},
                    {header: '转生 ', width: 50, dataIndex: 'rebirth', sortable: true},
                    {
                        header: '等级 ', width: 50, dataIndex: 'level', sortable: true
                    },
                    {
                        header: '经验 ', width: 100, dataIndex: 'exp', sortable: true,
                        renderer: function (value, metadata, record) {
                            return "<p class='wo'><span><a onclick='expEditFunc()'>" + value + "</a></span></p>";
                        }
                    },
                    {
                        header: '变身 ', width: 50, dataIndex: 'shapeShifting', sortable: true,
                        renderer: function (value, metadata, record) {
                            return value ? "是" : "否";
                        }
                    },
                    {header: '战力 ', width: 80, dataIndex: 'attr.fighting', sortable: true},
                    {header: '星座 ', width: 50, dataIndex: 'starName', sortable: true},
                    {header: '着装', width: 40, dataIndex: 'suit', sortable: false},
                    {
                        header: '套装2', width: 70, dataIndex: 'roleGarment2', sortable: true,
                        renderer: function (value, metadata, record, ee) {
                            if (value != "") {
                                return value;
                            }
                            return "+";
                        }
                    },
                    {
                        header: '套装3',
                        width: 70,
                        dataIndex: 'roleGarment3',
                        sortable: true,
                        renderer: function (value, metadata, record) {
                            if (value != "") {
                                return value;
                            }
                            return "+";
                        }
                    },
                    {header: '武器', width: 50, dataIndex: 'roleEquip1', sortable: false},
                    {header: '衣服', width: 50, dataIndex: 'roleEquip2', sortable: false},
                    {header: '腰带', width: 50, dataIndex: 'roleEquip3', sortable: false},
                    {header: '护手', width: 50, dataIndex: 'roleEquip4', sortable: false},
                    {header: '项链', width: 50, dataIndex: 'roleEquip5', sortable: false},
                    {header: '鞋子', width: 50, dataIndex: 'roleEquip6', sortable: false},
                    {header: '技能1', width: 50, dataIndex: 'skill1Level', sortable: false},
                    {header: '技能2', width: 50, dataIndex: 'skill2Level', sortable: false},
                    {header: '技能3', width: 50, dataIndex: 'skill3Level', sortable: false},
                    {header: '技能4', width: 50, dataIndex: 'skill4Level', sortable: false},
                ],
                bbar: [new Ext.PagingToolbar({
                    pageSize: 15,
                    store: store,
                    beforePageText: "当前第",
                    afterPageText: "页",
                    lastText: "尾页",
                    nextText: "下一页",
                    prevText: "上一页",
                    firstText: "首页",
                    refreshText: "刷新页面",
                    displayInfo: true,
                    emptyMsg: '<span style="color:#414141;font-weight:bold;">当前没有任何数据</span>',
                    displayMsg: "当前显示 {0} - {1}条"
                }),
                ],
                listeners: {
                    'cellclick': cellClickFunc
                }
            });

            var xWindow = new Ext.Window({
                title: pageTitle,
                width: 1310 + extraWidth,
                height: 600,							//是否渲染表单
                layout: 'fit',
                plain: true,
                modal: true,
                draggable: true,
                resizable: false,
                bodyStyle: 'padding:5px;',
                buttonAlign: 'center',
                items: grid,
                closable: true
            });
            xWindow.show();
        }
        return xHistory;
    }
    window.extraButton.push({
        text: '角色列表',
        iconCls: 'editButton',
        func: buttonCreator("showPlayerRoleInfo", "角色列表")
    });
})
();