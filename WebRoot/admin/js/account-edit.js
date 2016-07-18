
(function(){
	var lockFormCreator = function(user){
		lockForm = new Ext.form.FormPanel({
			bodyStyle:'padding:25px 20px 0 30px',					//表单边距
			style:"margin: 0 0 0 0",
			labelWidth:60,
			frame:true,
			items: [
			new Ext.form.TextField({
				name:'xusername',
				value:user.username,
				fieldLabel:'账号名',
				width:200,
				labelSeparator:'：',
				style:'margin-bottom:8px;',
				allowBlank:true,
				readOnly:'true'
			}),
			new Ext.form.ComboBox({
				hiddenName:'xstatus',
			   fieldLabel:'账户类别',
	    	   width:200,
			   store:new Ext.data.SimpleStore({
	  		  		   fields:['id','text'],
	  		  		   data:[['2','普通账户'],['3','测试账户']]
	  		  	   }),
			   triggerAction:'all',
			   valueField:'id',
			   displayField:'text',
			   editable:false,
			   mode:'local',
			   forceSelection:true,
			   value:user.type,
			   allowBlank:false,
			   blankText:'请选择类型'
	       })

			]
		});
	}
	var lockForm = {};
	var lockPage = function(user){
		lockFormCreator(user);
		var lockWindow = new Ext.Window({
			title: "修改账户信息",
			width: 400,
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
					url:"account.do?method=editAccount",
					params:{accountid:user.id},
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
	window.extraButton.push({text:'修改账户',iconCls:'editButton', func:lockPage});
})();
