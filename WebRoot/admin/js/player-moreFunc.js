	
(function(){
	
	var lockFormCreator = function(user){
		lockForm = new Ext.form.FormPanel({
			bodyStyle:'padding:10px 0 0 30px',					//表单边距
			style:"margin: 0 0 0 0",
			labelWidth:80,
			frame:true,			
			items: [
					{
						width: 370,
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
										labelWidth:80,
										items:[
												new Ext.form.ComboBox({
													hiddenName:'method',
												   fieldLabel:'请选择操作',
										    	   width:120,
										    	   value:'sendMonthCard',
												   store:new Ext.data.SimpleStore({
										  		  		   fields:['id','text'],
										  		  		   data:[['sendMonthCard','发送月卡'],['delAllMail','删除邮件'],
										  		  		         ['activeAllCard','激活卡牌库'],['openAllMatch','开启所有赛事']]
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
			title: "更多操作 ",
			width: 380,
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
					lockForm.form.submit({
					clientValidation:true,
					method:"post",
					waitMsg:'正在提交信息,请稍后...',
					waitTitle:'提示',
					url:"gmEdit.do?", 
					params:{serverId:window.serverId, playerId:user.playerId},
					
					success:function(form,action,vv){
						var count = action.result.successCount;
						var str = "操作成功";
						var fail = action.result.failed;
						if(fail && !"" == fail){
							str = fail + " 操作失败";
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
	window.extraButton.push({text:'更多操作',iconCls:'editButton', func:lockPage});
})();

	/**LOCK FORM END*/