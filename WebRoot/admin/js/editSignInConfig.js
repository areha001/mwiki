(function() {

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
			new Ext.form.Label({
				html: "<b> 服务器</b>： " + server.data.name,
				style: 'padding:8px 20px 8px 20px;'
			}),
			new Ext.form.Label({
				html: "<b> ID </b>：" + awardConfig.data.monthId,
				style: 'padding:8px 10px 8px 10px;'
			}),
			new Ext.form.Label({
				html: "<b> 名字 </b>：" + awardConfig.data.name,
				style: 'padding:8px 10px 8px 10px;'
			})
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
                        var info = getAwardInfo();
						console.log("send info is: [" + info + "]");
						Ext.Ajax.request({
							url: "signInConfig.do?method=edit",
							params: {
								serverId: server.data.id,
								id: awardConfig.data.monthId,
								awardInfo: info
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
				})
		);

        function parseItemDesc(info) {
            var datas = info.split(",");
            if (datas[0] == '0') {
                return datas[2] + "  个  " + window.itemIdMap.get(datas[1]) + "  [" + datas[3] + "]";
            } else {
                return datas[2] + "  个  " + window.awardTypeMap.get(datas[0]) + "  [" + datas[3] + "]";
            }
        }

		var awards = {};

		function initAwardInfo(info) {
			if (!info) {
				return;
			}
			var datas = info.split(";");
			var len = datas.length > 31 ? 31 : datas.length;
			if (datas.length > 0) {
				for (var i = 0; i < len; ++i) {
					var id = "day_" + (i + 1);
					Ext.getCmp(id).changeText(datas[i]);
				}
			}
		}

		function getAwardInfo() {
			var str = "";
			for (var i = 1; i <= 31; ++i) {
				str += awards["day_" + i] + ";";
			}
			return str;
		}

		function initButton() {
			var cnt = 1;
			var row = 1;
			while (cnt <= 31) {
				var id = "col" + row;
				for (var i = 0; i < 7 && cnt <= 31; ++i, ++cnt) {
					Ext.getCmp(id).items.add(new Ext.Button({
						id: "day_" + cnt,
						index: cnt,
						text: "<b>" + cnt + "</b>",
						width: 140,
						height: 80,
						handler: function() {
							edit(this.id);
						},
						changeText: function(str) {
							var desc = parseItemDesc(str);
							this.setText("<b>" + this.index + "</b><br/>" + desc);
							awards[this.id] = str;
						}
					}));
				}
				++row;
			}
		}

		function edit(id) {
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
			var vip = Ext.getCmp("itemVip").getValue() - 0;
			if (count <= 0 || count + "" == "NaN") {
				Ext.Msg.alert("错误", "请输入正整数")
				return;
			}

            if (type == 0) {
                var itemStr = "0," + itemSelector.getValue() + "," + count + "," + vip;
            } else {
                var itemStr = type + "," + "0," + count + "," + vip;
            }

			Ext.getCmp(id).changeText(itemStr);
		}

		var childGrid = new Ext.form.FormPanel({
			frame: true,
			tbar: tbar,
			bbar: bbar,
			loadMask: {
				msg: '正在加载数据，请稍候...'
			},
			items: [{
				columnWidth: ".5",
				labelAlign: 'left',
				layout: 'column',
				items: [{
						columnWidth: 1,
						layout: 'hbox',
						items: [{
							layout: 'form',
							style: 'padding-right:10px;',
							items: [
								new Ext.form.ComboBox({
									id: 'typeSelector',
									width: 90,
									store: new Ext.data.SimpleStore({
										fields: ['type', 'name'],
										data: window.awardTypeMap.arr
									}),
									triggerAction: 'all',
									fieldLabel: '物品类型',
									valueField: 'type',
									displayField: 'name',
									editable: false,
									mode: 'local',
									forceSelection: true,
									value: '0',
									allowBlank: false,
									blankText: '请选择物品类型',
									listeners: {
										'select': function(combo, record, index) {
											if (index == 0) {
												Ext.getCmp("itemSelector").show();
											} else {
												Ext.getCmp("itemSelector").hide();
											}
										}
									}
								})

							]
						}, {
							layout: 'form',
							style: 'padding-right:10px;',
							items: [
								new Ext.form.ComboBox({
									id: 'itemSelector',
									width: 140,
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
										'beforequery': function(e) {
											var combo = e.combo;
											if (!e.forceAll) {
												var input = e.query;
												// 执行检索
												combo.store.filterBy(function(record, id) {
													// 得到每个record的项目名称值
													var text = record.get(combo.displayField);
													return text.indexOf(input) != -1;
												});
												combo.expand();
												return true;
											}
										}
									}
								})
							]
						}, {
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
								})
							]
						}, {
							width: 200,
							layout: 'form',
							labelWidth: 80,
							items: [
								new Ext.form.TextField({
									id: 'itemVip',
									width: 80,
									fieldLabel: '双倍vip等级',
									allowBlank: false,
									editable: false,
									format: 'Y-m-d',
									value: 0,
									regex: /^\d+$/,
									regexText: '请输入数字',
									emptyText: '请填写数字',
									blankText: '不能为空'
								})
							]
						}]
					}, {
						id: "col1",
						columnWidth: 1,
						layout: 'hbox',
						items: []
					}, {
						id: "col2",
						columnWidth: 1,
						layout: 'hbox',
						items: []
					}, {
						id: "col3",
						columnWidth: 1,
						layout: 'hbox',
						items: []
					}, {
						id: "col4",
						columnWidth: 1,
						layout: 'hbox',
						items: []
					}, {
						id: "col5",
						columnWidth: 1,
						layout: 'hbox',
						items: []
					}

				]
			}]
		});

		initButton();
		initAwardInfo(awardConfig.data.awardInfo);

		var xWindow = new Ext.Window({
			title: "签到奖励编辑",
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

	window.extraButton.push({
		text: '编辑',
		iconCls: 'editButton',
		func: buttonCreator
	});
})
();