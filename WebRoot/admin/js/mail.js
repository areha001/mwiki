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
	var toolbarForm = new Ext.Toolbar({
		width:'100%'
	});
	
	var departNameStoreWithBlank = new Ext.data.Store({
		proxy:new Ext.data.HttpProxy({
			url:'gm.do?method=departJosn&withBlank=true'
		}),
		reader:new Ext.data.JsonReader({},['id','text'])
	});
	var departNameStore = new Ext.data.Store({
		autoLoad:true,
		proxy:new Ext.data.HttpProxy({
			url:'gm.do?method=departJosn'
		}),
		reader:new Ext.data.JsonReader({},['id','text'])
	});
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
					arrId.push(records[i].id);
				}
				if(arrId.length==0){
					top.Ext.Msg.alert('提示','提交失败，请先选择一个服务器。');
					return false;
				}
				var mparams = {serverIds:arrId.join(",")};
				if(window.editId!=""){
					mparams.id = window.editId;
				}
				var itemInfo = [];
				for(var i in selectedItems){
					itemInfo.push(selectedItems[i]);
				}
				mparams.itemInfo = itemInfo.join(";");
				dataForm.form.submit({
					clientValidation:true,
					waitMsg:'正在提交信息,请稍后...',
					waitTitle:'提示',
					params:mparams,
					submitEmptyText: false,
					url:"mail.do?method=add",
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
				columnWidth:'.5',
				layout:'column',
				items:[
					{
					layout:'form',
					items:[
					       new Ext.form.ComboBox({
						    	 id:'sendType',
						    	 hiddenName:'sendType',
								 width:120,
						  	   store:new Ext.data.SimpleStore({
						  		   fields:['id','name'],
						  		   data:[['1','全服发送'],['0','指定用户']]
						  	   //,['1','指定渠道'],['4','自定义条件']
						  	   }),
						  	   triggerAction:'all',
						  	   fieldLabel:'发送方式',
						  	   valueField:'id',
						  	   displayField:'name',
						  	   editable:false,
						  	   mode:'local',
						  	   forceSelection:true,
						  	   value:'0',
						  	   allowBlank:false,
						  	   blankText:'请选择发送方式',
						  	    listeners:{
						  		   'select':function(combo,record, index){
						  		   	   if(index == 0){
						  		   	   		Ext.getCmp("userNames").hide();
						  		   	   		Ext.getCmp("faceNew").show();
						  		   	   }else if(index == 1){
						  		   	   		Ext.getCmp("userNames").show();
						  		   	   		Ext.getCmp("faceNew").hide();
						  		   	   }
						  		   }
						  	   }
						     })

					]},
					{
						layout:'form',
						style:'padding-left:15px;',
						items:[
								new Ext.form.TextField({
									   name:'userNames',
									   id:'userNames',
									   width:310,
									   value:esparams.playerId,
									   fieldLabel:'指定用户ID',
									   allowBlank:true,
									   emptyText:'请填写指定用户ID',
								}),
								new Ext.form.ComboBox({
							    	 id:'faceNew',
							    	 hiddenName:'faceNew',
							    	 hidden:true,
									 width:260,
							  	   store:new Ext.data.SimpleStore({
							  		   fields:['id','name'],
							  		   data:[['1','新玩家不会接收'],['0','新玩家会接收']]
							  	   }),
							  	   triggerAction:'all',
							  	   //fieldLabel:'是否允许新玩家接收',
							  	   valueField:'id',
							  	   displayField:'name',
							  	   editable:false,
							  	   mode:'local',
							  	   forceSelection:true,
							  	   value:'1',
							  	   allowBlank:false,
							  	   blankText:'请选择接收方式',
							     })
						]},
					{
						columnWidth:1,
				       	layout:'hbox',
				       	items:[
						       {
						    	   width:200,
							       	layout:'form',
									items:[
										new Ext.form.ComboBox({
											 id:'mailType',
											 hiddenName:'mailType',
											 width:120,
											   store:new Ext.data.SimpleStore({
												   fields:['id','name'],
												   data:[['1','普通邮件'],['2','公告邮件']]
											   }),
											   triggerAction:'all',
											   fieldLabel:'邮件类型',
											   valueField:'id',
											   displayField:'name',
											   editable:false,
											   mode:'local',
											   forceSelection:true,
											   value:'1',
											   allowBlank:false,
											   blankText:'请选择邮件类型'
										})
								]
						       },{
						    	   width:260,
							       	layout:'form',
									style:'padding-left:10px;',
									items:[
									new Ext.form.DateField({
														   name:'sendTime',
														   width:150,
														   fieldLabel:'发送时间',
														   allowBlank:false,
														   editable:true,
														   value:new Date(),
														   emptyText:'请填写发送时间',
														   format:'Y-m-d H:i'
														})
									]
						       }
						]
					},
					
			       {
					columnWidth:1,
					layout:'form',
					items:[
						new Ext.form.TextField({
							   name:'title',
							   width:550,
							   fieldLabel:'标题',
							   allowBlank:false,//数据库中可以为空的话 这二行可以去掉
							   emptyText:'请填写标题',
							   blankText:'内标题不能为空'
						}),
						new Ext.form.TextArea({
							   name:'content',
							   width:550,
							   height:300,
							   fieldLabel:'内容',
							   allowBlank:false,//数据库中可以为空的话 这二行可以去掉
							   emptyText:'请填写内容',
							   blankText:'内容不能为空'
						})]
					},
					{
						columnWidth:1,
				       	layout:'hbox',
				       	items:[
						       {
						    	   width:200,
							       	layout:'form',
									items:[
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
											   blankText:'请填写数字'
										}),

										new Ext.form.TextField({
											   name:'exp',
											   width:120,
											   fieldLabel:'附送经验',
											   allowBlank:false,
											   editable:false,
											   format:'Y-m-d',
											   regex:/^\d+$/,
											   regexText:'请输入数字',
											   value:0,
											   emptyText:'请填写附送金币',
											   blankText:'请填写数字'
										})
								]
						       },{
						    	   width:200,
							       	layout:'form',
									//style:'padding-left:10px;',
									items:[
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
											   blankText:'请填写数字'
										}),
										new Ext.form.TextField({
											   name:'apple',
											   width:120,
											   fieldLabel:'<a style="color:red;">附送苹果币<a>',
											   allowBlank:false,
											   editable:false,
											   format:'Y-m-d',
											   value:0,
											   regex:/^\d+$/,
											   regexText:'请输入数字',
											   emptyText:'请填写数字',
											   blankText:'请填写数字'
										})
									]
						       },{
						    	   width:200,
							       	layout:'form',
									//style:'padding-left:10px;',
									items:[
											new Ext.form.TextField({
											   name:'energy',
											   width:120,
											   fieldLabel:'附送体力',
											   allowBlank:false,
											   editable:false,
											   format:'Y-m-d',
											   value:0,
											   regex:/^\d+$/,
											   regexText:'请输入数字',
											   emptyText:'请填写数字',
											   blankText:'请填写数字'
										})
									]
						       }
						]
					}
		       ]
		      },

		       {
				columnWidth:".5",
				layout:'column',
				items:[
				       {
						columnWidth:1,
				       	layout:'hbox',
				       	items:[
						{
							width: 250,
							layout:'form',
							style:'padding-right:10px;',
							items:[
								new Ext.form.ComboBox({
										id:'itemSelector',
									   width:160,
									   fieldLabel:'<a style="color:red;">选择物品<a>',
									   store:new Ext.data.SimpleStore({
								  		   fields:['id','name'],
								  		   data:window.vmap
								  	   }),
								  	   triggerAction:'query',
								  	   fieldLabel:'选择物品',
								  	   valueField:'id',
										typeAhead : true,
								  	   displayField:'name',
								  	   editable:true,
								  	   queryMode: "local",
								  	   mode:'local',
								  	   forceSelection:true,
								  	   value:'',
								  	   allowBlank:true,
								  	   blankText:'请选择发送方式',
									  	 listeners : {
												'beforequery':function(e){
													var combo = e.combo;  
													if(!e.forceAll){  
														var input = e.query; 
														// 执行检索
														combo.store.filterBy(function(record,id){  
															// 得到每个record的项目名称值
															var text = record.get(combo.displayField);  
															return text.indexOf(input)!= -1; 
														});
														combo.expand();  
														return true;
													}
												}
											}
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
									   value:1,
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
											if(selector.getRawValue()==""){
												Ext.Msg.alert("错误","请选择物品")
												return;
											}
											var count =  Ext.getCmp("itemNum").getValue() - 0;
											if(count<=0 || count+"" == "NaN"){
												Ext.Msg.alert("错误","请输入正整数")
												return;
											}
											var str = count + "  个 " + selector.getRawValue();
											
											window.dymanicLabel++;
											var keyName = "s_" + window.dymanicLabel;
											selectedItems[keyName] = "0," + selector.getValue() + "," + count;
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
			url:"mail.do?method=showOne",  
			params:{'id':window.editId},
			waitMsg:'正在加载信息,请稍后...',
			waitTitle:'提示',
			success:function(form,action){
				var dt = action.result.data;
				form.findField("startTime").setValue(Ext.util.Format.date(new Date(dt.startTime.time),'Y-m-d'));
				form.findField("endTime").setValue(Ext.util.Format.date(new Date(dt.endTime.time),'Y-m-d'));
				autoSelected = dt.serverIds;
				autoSelect();
			},
			failure:function(form,action){
				window.Ext.Msg.alert("提示","数据加载失败！"+action.result.data);
			}
		})
	}
	var gridServer = window.createServerGrid();

	
	new Ext.Viewport({
		layout: 'fit',
		items:[{
			layout: 'border',
			items: [{
		        // xtype: 'panel' implied by default
		        title: '服务器过滤',
		        region:'north',
		        margins: '5 0 0 5',
		        height: 150,
		        collapsible: true,   // make collapsible
		        split: true,         // enable resizing
		        cmargins: '5 5 0 5', // adjust top margin when collapsed
		        id: 'west-region-container',
		        layout: 'fit',
		        items:[gridServer]
		    },{
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