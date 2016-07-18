
(function(){
	var lockFormCreator = function(user){
		lockForm = new Ext.form.FormPanel({
			bodyStyle:'padding:25px 20px 0 30px',					//表单边距
			style:"margin: 0 0 0 0",
			labelWidth:60,
			frame:true,
			items: [
				       new Ext.form.TextField({
				    	   name:'name',
				    	   fieldLabel:'分区名',
				    	   value:user.name,
							width:100,
							labelSeparator:'：',
							style:'margin-bottom:8px;',
							allowBlank:true,
							readOnly:'true'							    		   
				       }),
				       new Ext.form.ComboBox({
				    	   hiddenName:'status',
							width:100,
				    	   store:new Ext.data.SimpleStore({
				    		   fields:['id', 'name'],
				    		   data:[[10,'流畅'],[20,'火爆'],[30,'新开'],[40,'维护中'],[50,'停服'],[60,'测试']]
				    	   }),
				    	   triggerAction:'all',
				    	   fieldLabel:'状态',
				    	   valueField:'id',
				    	   displayField:'name',
						   editable:false,
						   mode:'local',
						   forceSelection:true,
						   value:user.status,
						   allowBlank:false,
				    	   blankText:'请选择状态'
				       })

			]
		});
	}
	var lockForm = {};
	var lockPage = function(user){
		lockFormCreator(user);
		var lockWindow = new Ext.Window({
			title: "修改分区服务器状态",
			width: 300,
			height:200,							//是否渲染表单
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
					waitMsg:'正在修改信息,请稍后...',
					waitTitle:'提示',
					url:"partitionInfo.do?method=updateStatus",
					params:{id:user.id},
					success:function(form,action){
					window.Ext.Msg.alert("提示","操作成功！",function(){
						store.reload();
						lockWindow.hide();
					});
				},
				failure:function(form,action){
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
	window.extraButton.push({text:'修改状态',iconCls:'editButton', func:lockPage});
})();
