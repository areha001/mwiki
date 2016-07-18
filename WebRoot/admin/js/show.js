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
		callback: function () {
			Ext.getCmp("partnerId").reset();
		}
	})
	var departNameStore = new Ext.data.Store({
		autoLoad:true,
		proxy:new Ext.data.HttpProxy({
			url:'gm.do?method=departJosn'
		}),
		reader:new Ext.data.JsonReader({},['dcode','text'])
	});
	toolbarServer.add('-',
		     new Ext.form.ComboBox({
		    	 id:'groupType',
		    	 name:'groupType',
		  	   store:new Ext.data.SimpleStore({
		  		   fields:['id','name'],
		  		   data:[['','不限'],['安卓','安卓'],['IOS正版','IOS正版'],['IOS越狱','IOS越狱']]
		  	   }),
		  	   triggerAction:'all',
		  	   fieldLabel:'分组',
		  	   valueField:'id',
		  	   displayField:'name',
		  	   editable:false,
		  	   mode:'local',
		  	   forceSelection:true,
		  	   value:'',
		  	   allowBlank:true,
		  	   blankText:'请选择分组'
		     }),
			new Ext.Button({
				text:'过滤服务器',
				iconCls:'findButton',
				handler:searchServer
			}))

	function searchServer(){
		var groupType = Ext.getCmp('groupType').getValue();
		var params = {};
		if(groupType!=""){
			params.groupType = groupType;
		}
		storeServer.load({params:params, callback:autoSelect});
	};
	toolbarForm.add('-',
			new Ext.Button({
				iconCls:'editButton',
				text: window.editType,
				handler:function(){
				if(!dataForm.form.isValid()){
					top.Ext.Msg.alert('提示','提交失败，请确定表单填写已正确。');
					return false;
				}	
				var records = smServer.getSelections();
				var arrId = [];
				for(var i=0;i<records.length;i++){
					arrId.push(records[i].data.serverId);
				}
				var mparams = {serverIds:arrId.join(",")};
				if(window.editId!=""){
					mparams.id = window.editId;
				}
				var itemInfo = [];
				for(var i in selectedItems){
					itemInfo.push(selectedItems[i]);
				}
				mparams.itemInfo = itemInfo.join("#");
				dataForm.form.submit({
					clientValidation:true,
					waitMsg:'正在提交信息,请稍后...',
					waitTitle:'提示',
					params:mparams,
					url:"gift.do?method=add",
					success:function(form,action){
					window.Ext.Msg.alert("提示",window.editType + "成功！");
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
				columnWidth:.25,
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
						    	   hiddenName:'partnerCodeId',
								   store:departNameStoreWithBlank,
								   triggerAction:'all',
								   valueField:'dcode',
								   displayField:'text',
								   editable:false,lazyRender:true,
								   mode:'remote',
								   forceSelection:true,
								   value:'0',
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
								})
								
						]}
		       ]
		      },

		       {
				columnWidth:.5,
				layout:'column',
				items:[
				       {
						columnWidth:1,
				       	layout:'hbox',
				       	items:[
						{
							width: 200,
							layout:'form',
							items:[
								new Ext.form.ComboBox({
										id:'itemSelector',
									   width:120,
									   fieldLabel:'<a style="color:red;">选择物品<a>',
									   store:new Ext.data.SimpleStore({
								  		   fields:['id','name'],
								  		   data:window.vmap
								  	   }),
								  	   triggerAction:'all',
								  	   fieldLabel:'选择物品',
								  	   valueField:'id',
								  	   displayField:'name',
								  	   editable:true,
								  	   mode:'local',
								  	   forceSelection:true,
								  	   value:'1',
								  	   allowBlank:true,
								  	   blankText:'请选择发送方式'
								})]
						},
						{
							width: 150,
							layout:'form',
							labelWidth:50,
							items:[
								new Ext.form.TextField({
										id:'itemNum',
									   width:80,
									   fieldLabel:'数量',
									   allowBlank:false,
									   editable:false,
									   format:'Y-m-d',
									   value:0,
									   regex:/^\d+$/,
									   regexText:'请输入数字',
									   emptyText:'请填写数字',
									   blankText:'间隔时间不能为空'
								})]
						},
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
											var str = count + "  个 " + selector.getRawValue();
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
	window.clearSelectedItem = function(id){
		Ext.getCmp("dymanicLabel" + id).destroy();
		delete(selectedItems["s_" + id]);
	}
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
				autoSelect();
			},
			failure:function(form,action){
				window.Ext.Msg.alert("提示","数据加载失败！"+action.result.data);
			}
		})
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
			autoSelect();
		}
		
	});
	var smServer = new Ext.grid.CheckboxSelectionModel({width:50});         //定义选择模式

	var autoSelected = "";
	var autoSelect = function(){
		var ids = autoSelected.split(',');
		var items = gridServer.store.data.items;
		var autos = [];
		Ext.each(items, function(i){
			if(ids.indexOf(i.serverId+"")>=0){
				autos.push(i);
			}
		});
		smServer.selectRecords(autos);
	}


	
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
		        minSize: 75,         // defaults to 50
		        margins: '5 5 0 0',
		        items:[dataForm]
		    }]
		}]
	});

});