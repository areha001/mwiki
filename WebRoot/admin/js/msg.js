Ext.onReady(function(){

	Ext.BLANK_IMAGE_URL = "../js/ext-3.3.1/resources/images/default/s.gif";
	Ext.QuickTips.init();    //初始化信息提示
	Ext.form.Field.prototype.msgTarget = "qtip";//统一指定错误信息提示方式
	
	Ext.Msg.buttonText.yes = "确定";
	Ext.Msg.buttonText.ok = "确定";
	Ext.Msg.buttonText.cancel = "取消";
	Ext.Msg.buttonText.no = "取消";
	var DefaultLimitSize = 20;
	//定义菜单选择项
	var toolbarForm = new Ext.Toolbar({
		width:'100%'
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
				dataForm.form.submit({
					clientValidation:true,
					waitMsg:'正在提交信息,请稍后...',
					waitTitle:'提示',
					url:"logtest.do?method=createData",
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
	
	var dataForm = new Ext.form.FormPanel({
		title:"生成中间缓存（正式服务器上将会在凌晨自动生成，此处为测试用）",
		labelSeparator:':',
		labelWidth:90,
		bodyStyle:"padding: 8px 20px;",
		frame:true,
		layout:'column',
		height:'auto',
		tbar:toolbarForm,
		items:[
				{
					columnWidth:.35,
					layout:'form',
					items:[
							new Ext.form.DateField({
								   name:'startDate',
								   width:200,
								   fieldLabel:'开始时间',
								   allowBlank:false,
								   editable:false,
								   format:'Y-m-d',
								   value:'2014-08-15',
								   emptyText:'请填写开始时间',
								   blankText:'开始时间不能为空',
								   hiddenName:'startTime'
							})
							
					]},
				{
					columnWidth:.35,
					layout:'form',
					items:[
							new Ext.form.DateField({
								   name:'endDate',
								   width:200,
								   fieldLabel:'结束时间',
								   allowBlank:false,
								   editable:false,
								   format:'Y-m-d',
								   value:'2014-08-15',
								   emptyText:'请填写结束时间',
								   blankText:'结束时间不能为空'
							})]
				}
		       ]
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
		        minSize: 75,         // defaults to 50
		        margins: '5 5 0 0',
		        items:[dataForm]
		    }]
		}]
	});

});