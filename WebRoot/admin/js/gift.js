Ext.onReady(function(){

	Ext.BLANK_IMAGE_URL = "../js/ext-3.3.1/resources/images/default/s.gif";
	Ext.QuickTips.init();    //初始化信息提示
	Ext.form.Field.prototype.msgTarget = "qtip";//统一指定错误信息提示方式
	
	Ext.Msg.buttonText.yes = "确定";
	Ext.Msg.buttonText.ok = "确定";
	Ext.Msg.buttonText.cancel = "取消";
	Ext.Msg.buttonText.no = "取消";
	var DefaultLimitSize = 20;
    var getMySelect = function(){
		var records = grid.getSelectionModel().getSelections();
		if(records == ""){
			Ext.MessageBox.alert("提示","请选择记录后再进行操作!");
			return ;
		}
		var arrId = new Array();
		for(var i=0;i<records.length;i++){
			arrId.push(records[i].id);
		}
		return arrId;
	}
	//定义菜单选择项
	var toolbarServer = new Ext.Toolbar({
		width:'100%'
	});

	var toolbarForm = new Ext.Toolbar({
		width:'100%'
	});
	
	var departNameStoreWithBlank = new Ext.data.Store({
		proxy:new Ext.data.HttpProxy({
			url:'gm.do?method=departJosn&withBlank=true'
		}),
		reader:new Ext.data.JsonReader({},['dcode','text'])
	});
	departNameStoreWithBlank.load({
		callback: function (store) {
			Ext.getCmp("partnerCodeId").setValue(store[0].store.getAt(0).get('dcode'));
		}
	})
	var departNameStore = new Ext.data.Store({
		autoLoad:true,
		proxy:new Ext.data.HttpProxy({
			url:'gm.do?method=departJosn'
		}),
		reader:new Ext.data.JsonReader({},['dcode','text'])
	});
	function DataHelper(attr) {
		this.id = attr.id;
		this.dom = attr.dom;
		this.labelIndex = 0;
		this.data = {};
		this.addItem = function (desc, data) {
			var index = ++this.labelIndex;
			var id = this.id + "_" + index;
			var domId = this.dom.id;
			this.data[id] = data;
			new Ext.form.Label({
				id: id,
				renderTo: domId,
				html: "<p class='vo'><span><a onclick='clearSelectedItem(\"" + id + "\")'>X</a> " + desc + " </span></p>"
			});
            dataForm.doLayout();
		};
		this.initItem = function (desc, data) {
			var index = ++this.labelIndex;
			var id = this.id + "_" + index;
			this.data[id] = data;
			this.dom.items.add(new Ext.form.Label({
				id: id,
				html: "<p class='vo'><span><a onclick='clearSelectedItem(\"" + id + "\")'>X</a> " + desc + " </span></p>"
			}));
            dataForm.doLayout();
		};
		this.removeItem = function (index) {
			var id = this.id + "_" + index;
			Ext.getCmp(id).destroy();
			delete(this.data[id]);
            dataForm.doLayout();
		};
		this.getInfo = function () {
			var arr = [];
			var cnt = 0;
			for (var i in this.data) {
				console.log("key " + i + " value " + this.data[i]);
				arr.push(this.data[i]);
				++cnt;
			}
			console.log("size is " + cnt);
			return arr.join(";");
		};

	}

	var itemInfoFieldSet = new Ext.form.FieldSet({
		id: 'itemInfoFieldSet',
		labelAlign: 'left',
		defaultType: 'label',
		name: 'itemInfofs',
		width: 220,
		autoHeight: true,
		fieldLabel: '固定奖励',
		items: []
	});
	var itemInfoDataHelper = new DataHelper({id: "itemInfoDataHelper", dom: itemInfoFieldSet})

	toolbarForm.add('-',
			new Ext.Button({
				iconCls:'editButton',
				text: window.editType,
				handler:function(){

				if(!dataForm.form.isValid()){
					top.Ext.Msg.alert('提示','提交失败，请确定表单填写已正确。');
					return false;
				}
				document.getElementById("itemInfoHi").value = itemInfoDataHelper.getInfo();
				var mparams = {};
				if(window.editId!=""){
					mparams.id = window.editId;
				}
				var itemInfo = [];
				for(var i in selectedItems){
					itemInfo.push(selectedItems[i]);
				}
				//mparams.itemInfo = itemInfo.join("#");
					console.log("mparams")
				console.log(mparams)
				dataForm.form.submit({
					clientValidation:true,
					waitMsg:'正在提交信息,请稍后...',
					waitTitle:'提示',
					params:mparams,
					url:"gift.do?method=add",
					success:function(form,action){
					window.Ext.Msg.alert("提示",window.editType + "成功！");
					window.setTimeout('window.location.href="gift.do?method=listPage"',1000);
					return false;
				},
				failure:function(form,action){
					window.Ext.Msg.alert("提示","添加失败!"+action.result.info);
				}
				});   
			}
	       }));

	var fieldSet = new Ext.form.FieldSet({
			id:'itemFieldSet',
			defaultType: 'label',
		   name:'itemNames',
		   width:450,
		   autoHeight:true,
		   fieldLabel:'附带物品',
		   items :[]
	})
	window.dymanicLabel = 0;
	var dataForm = new Ext.form.FormPanel({
		title:"管理",
		labelSeparator:':',
		labelWidth:70,
		bodyStyle:"padding: 3px 20px;",
		frame:true,
		layout:'column',
		height:'auto',
		tbar:toolbarForm,
		items:[

		       {
				columnWidth:.50,
				layout:'column',
				items:[
					{
						columnWidth:1,
						layout:'form',
						items:[

								new Ext.form.TextField({
									   name:'name',
									   width:120,
									   fieldLabel:'礼包名',
									   allowBlank:false,
									   editable:false,
									   emptyText:'请填写礼包名',
									   blankText:'礼包名不能为空'
								}),
								new Ext.form.ComboBox({
								   fieldLabel:'所属渠道',
						    	   width:120,
						    	   id:'partnerCodeId',
						    	   hiddenName:'partnerCodeId',
								   store:departNameStoreWithBlank,
								   triggerAction:'all',
								   valueField:'dcode',
								   displayField:'text',
								   editable:false,
								   mode:'remote',
								   forceSelection:true,
								   allowBlank:false,
								   blankText:'请填写渠道'
						       }),
								new Ext.form.TextField({
									   name:'gold',
									   width:120,
									   fieldLabel:'附送金币',
									   allowBlank:false,
									   editable:false,
									   format:'Y-m-d',
									   regex:/^\d+$/,
									   regexText:'请输入数字',
									   value:0,
									   emptyText:'请填写附送金币',
									   blankText:'附送金币不能为空'
								}),
								new Ext.form.TextField({
									   name:'diamond',
									   width:120,
									   fieldLabel:'<a style="color:red;">附送钻石<a>',
									   allowBlank:false,
									   editable:false,
									   format:'Y-m-d',
									   value:0,
									   regex:/^\d+$/,
									   regexText:'请输入数字',
									   emptyText:'请填写数字',
									   blankText:'间隔时间不能为空'
								}),
							new Ext.form.Hidden({
								id:"itemInfoHi",
								name:'itemInfo',
								width:120,
								fieldLabel:'wupin',
								allowBlank:false,
								editable:false,
								value:"1212",
							}),

							{
								columnWidth: 4,
								layout: 'hbox',
								items: [
									{
										layout: 'form',
										style: 'padding-right:10px;',
										items: [
											new Ext.form.ComboBox({
												id: 'typeSelector',
												width: 90,
												store: new Ext.data.SimpleStore({
													fields: ['id', 'name'],
													data: window.awardTypeMap.arr
												}),
												triggerAction: 'all',
												fieldLabel: '物品类型',
												valueField: 'id',
												displayField: 'name',
												editable: false,
												mode: 'local',
												forceSelection: true,
												value: '0',
												allowBlank: false,
												blankText: '请选择物品类型',
												listeners: {
													'select': function (combo, record, index) {
														if (index == 0) {
															Ext.getCmp("itemSelector").show();
														} else {
															Ext.getCmp("itemSelector").hide();
														}
													}
												}
											})

										]
									},
									{
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
													'beforequery': function (e) {
														var combo = e.combo;
														if (!e.forceAll) {
															var input = e.query;
															// 执行检索
															combo.store.filterBy(function (record, id) {
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
									},
									{
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
											})]
									},
									{
										width: 100,
										layout: 'form',
										items: [
											new Ext.Button({
												text: "添加固定奖励",
												handler: function () {
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

													if (type == 0) {
														var itemStr = "0," + itemSelector.getValue() + "," + count;
													} else {
														var itemStr = type + "," + "0," + count;
													}
													var desc = parseItemDesc(itemStr);
													itemInfoDataHelper.addItem(desc, itemStr);
												}
											})
										]
									}
								]
							}
							,{
								columnWidth: 1,
								layout: 'form',
								items: [
									{
										columnWidth: 1,
										layout: 'hbox',
										items: [
											{
												layout: 'form',
												style: 'padding-right:20px;',
												items: [itemInfoFieldSet]
											}
										]
									}

								]
							}
								
						]
					}

		       ]
		      },

		       {
		    	hidden:true,
				columnWidth:.5,
				layout:'column',
				items:[
				       {
						columnWidth:1,
				       	layout:'hbox',
				       	items:[
						{
							width: 150,
							layout:'form',
							labelWidth:50,
							items:[
								new Ext.Button({
										text:"添加物品",
										handler:function(){
											var selector = Ext.getCmp("itemSelector");
											var count =  Ext.getCmp("itemNum").getValue();
											if(count<=0){
												Ext.Msg.alert("错误","请输入正数")
												return;
											}
											var str = count + "  个 " + selector.getValue();
											window.dymanicLabel++;
											var keyName = "s_" + window.dymanicLabel;
											selectedItems[keyName] = selector.getValue() + "," + count;
											new Ext.form.Label({
												id:'dymanicLabel'+ window.dymanicLabel,
												renderTo:'itemFieldSet',
												html:"<p class='vo'><span><a onclick='clearSelectedItem(" + window.dymanicLabel+ ")'>X</a> "+ str+" </span></p>"}) 
										}
								})]
						}]},
						
						{
							columnWidth:1,
							layout:'form',
							items:[fieldSet]
						}
				       ]
		       }]
	});
	var selectedItems = {};
	window.clearSelectedItem = function (id) {
		var data = id.split("_");
		if (data[0] == "itemInfoDataHelper") {
			itemInfoDataHelper.removeItem(data[1]);
		} else {
			alert("unknown id " + id);
		}
	};
	if(window.editId!=""){
		dataForm.form.load({
			clientValidation:false,
			url:"gift.do?method=showOne",  
			params:{'id':window.editId},
			waitMsg:'正在加载信息,请稍后...',
			waitTitle:'提示',
			success:function(form,action){
				var dt = action.result.data;
				autoSelected = dt.serverIds;
				var dom = document.getElementById("itemInfoHi");
				var val = dom.value;
				initLootInfo(itemInfoDataHelper,val , parseItemDesc);
//				autoSelect();
			},
			failure:function(form,action){
				window.Ext.Msg.alert("提示","数据加载失败！"+action.result.data);
			}
		})
	}
	function initLootInfo(dataHelper, info, func) {
		if (!info) {
			return;
		}
		var datas = info.split(";");
		if (datas.length > 0) {
			for (var i = 0; i < datas.length; ++i) {
				var desc = func(datas[i]);
				dataHelper.initItem(desc, datas[i]);
			}
		}
	}
	function parseItemDesc(info) {
		var datas = info.split(",");
		if (datas[0] == '0') {
			return datas[2] + "  个  " + window.itemIdMap.get(datas[1]) + "  [" + datas[1] + "]";
		} else {
			return datas[2] + "  个  " + window.awardTypeMap.get(datas[0]) + "  [" + datas[1] + "]";
		}
	}
	storeServer = new Ext.data.Store({
		proxy: new Ext.data.HttpProxy({
			url:'serverManager.do?method=showList'
		}),
		reader:new Ext.data.JsonReader({
			root:"items",
			totalProperty:"results",
			fields:[
			        {name:"id"},//流水id 不须更改
			        {name:"name"},
			        {name:"innerAddr"},
			        {name:"outAddr"},
			        {name:"serverId"},
			        {name:"status"},
			        {name:"partnerId"},
			        {name:"partnerName"},
			        {name:"groupType"}
			        ]
		})
	});
	storeServer.load({
		callback:function(){
//			autoSelect();
		}
		
	});
	
	new Ext.Viewport({
		layout: 'fit',
		items:[{
			layout: 'border',
			items: [{
		        title: 'Center Region',
		        region: 'center',     // center region is required, no width/height specified
		        xtype: 'container',
		        layout: 'fit',
		        height: 100,
				width:1100,
		        minSize: 75,         // defaults to 50
		        margins: '5 5 0 0',
		        items:[dataForm]
		    }]
		}]
	});
	var tbar = new Ext.Toolbar({
        width: '100%',
        style: 'padding:5px;text-align:center;'
    });
//    tbar.add(
//        new Ext.form.Label({html: "<b> 服务器</b>： " + server.data.name, style: 'padding:8px 20px 8px 20px;'}),
//        new Ext.form.Label({html: "<b> ID </b>：" + awardConfig.data.id, style: 'padding:8px 10px 8px 10px;'}),
//        new Ext.form.Label({html: "<b> 礼包名</b>：" + awardConfig.data.name, style: 'padding:8px 10px 8px 10px;'})
//    );
    var bbar = new Ext.Toolbar({
        width: '100%',
        style: 'padding:5px;text-align:center;'
    });

});