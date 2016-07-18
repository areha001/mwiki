(function(){
	var lockFormCreator = function(feedback){
		lockForm = new Ext.form.FormPanel({
			bodyStyle:'padding:10px 0 0 30px',					//表单边距
			style:"margin: 0 0 0 0",
			labelWidth:50,
			frame:true,			
			items: [
			new Ext.form.TextField({
				name:'name', 
				value:feedback.title, 
				fieldLabel:'角色名',
				width:600,
				labelSeparator:'：',
				style:'margin-bottom:10px;',
				allowBlank:true,
				readOnly:'true'
			}),
			new Ext.form.TextArea({
				name:'info', 
				value:feedback.info, 
				fieldLabel:'反馈',
				width:600,
				height:250,
				labelSeparator:'：',
				style:'margin-bottom:10px;',
				allowBlank:true,
				readOnly:'true'
			}),
			new Ext.form.TextArea({
				name:'reply', 
				value:feedback.reply, 
				fieldLabel:'回复',
				width:600,
				height:250,
				labelSeparator:'：',
				style:'margin-bottom:10px;',
				allowBlank:false,
				emptyText:'请输入回复内容'
			})
			]
		});
	}
	var lockForm = {};
	var lockPage = function(feedback){
		lockFormCreator(feedback);
		var lockWindow = new Ext.Window({
			title: "编辑回复信息 ",
			width: 800,
			height:680,							//是否渲染表单
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
					submitEmptyText: false,
					clientValidation:true,
					waitMsg:'正在修改信息,请稍后...',
					waitTitle:'提示',
					url:"feedback.do?method=reply", 
					params:{replyid:feedback.id},
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
	window.extraButton.push({text:'玩家反馈回复',iconCls:'editButton', func:lockPage});
})();

	/**LOCK FORM END*/