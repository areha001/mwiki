	
(function(){
	var selectPlayer = 	new Ext.form.ComboBox({
		id:'itemSelector',
		   width:175,
		   fieldLabel:'<a style="color:red;">选择球员<a>',
		   store:new Ext.data.SimpleStore({
	  		   fields:['id','name'],
	  		   data:window.mmap
	  	   }),
	  	   triggerAction:'query',
			typeAhead : true,
	  	   fieldLabel:'选择球员',
	  	   valueField:'id',
	  	   displayField:'name',
	  	   editable:true,
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
	});
	var lockFormCreator = function(user){
		lockForm = new Ext.form.FormPanel({
			bodyStyle:'padding:10px 0 0 30px',					//表单边距
			style:"margin: 0 0 0 0",
			labelWidth:80,
			frame:true,			
			items: [
					{
						width: 580,
						layout:'form',
						labelWidth:70,
						items:[
						       
						       {
									columnWidth:1,
							       	layout:'hbox',
							       	items:[
									{
										width: 270,
										layout:'form',
										style:'padding-right:10px;',
										items:[selectPlayer]
									},
									{
										width: 230,
										layout:'form',
										labelWidth:50,
										items:[
												new Ext.form.ComboBox({
													hiddenName:'add',
												   fieldLabel:'操作',
										    	   width:120,
										    	   value:1,
												   store:new Ext.data.SimpleStore({
										  		  		   fields:['id','text'],
										  		  		   data:[['1','增加球员'],['2','删除球员']]
										  		  	   }),
												   triggerAction:'all',
												   valueField:'id',
												   displayField:'text',
												   editable:false,
												   mode:'local',
												   forceSelection:true,
												   allowBlank:false
										       })
										       ]
									}]}
						       ]
					}
			]
		});
	}
	var lockForm = {};
	var lockPage = function(user){
		lockFormCreator(user);
		var lockWindow = new Ext.Window({
			title: "发放球员 ",
			width: 600,
			height:150,							//是否渲染表单
			layout: 'fit',
			plain:true,
			modal:true,
			draggable:true,
			resizable:false,
			closable:false,
			bodyStyle:'padding:5px;',
			buttonAlign:'center',
			items:  lockForm,
			buttons: [{
				text: '确定',
				handler:function(){

					var memberId = Ext.getCmp("itemSelector").getValue();
					lockForm.form.submit({
					clientValidation:true,
					waitMsg:'正在提交信息,请稍后...',
					waitTitle:'提示',
					url:"gmEdit.do?method=sendUserMember", 
					params:{serverId:window.serverId, playerId:user.playerId, memberId: memberId},
					
					success:function(form,action,vv){
						var count = action.result.successCount;
						var str = "发放成功";
						var fail = action.result.failed;
						if(fail && !"" == fail){
							str = fail + " 发送失败";
						}
						window.Ext.Msg.alert("提示",str,function(){
							storeUser.reload();
							lockWindow.hide();
						});
					},
					failure:function(form,action,vv){
						window.Ext.Msg.alert("提示","操作失败！");
					}
				});   
			}
			},
			{
				text: '取消',
				handler:function(){
				//关闭面板
					lockWindow.hide();
				}
			}]
		});
		lockWindow.show();
	}
	window.extraButton.push({text:'发放球员',iconCls:'editButton', func:lockPage});
})();

	/**LOCK FORM END*/