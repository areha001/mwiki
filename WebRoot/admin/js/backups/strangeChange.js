/**
 * @author Administrator
 */
Ext.onReady(function(){
window.strangeChange = function(store)
{
		var createRadios = function(arr){
		var radioArr = [];
		for(var i=0; i< arr.length; i++)
		radioArr.push(
			new Ext.form.Radio({
		    	   name:'strangeType',
		    	   checked:i==0, 
		    	   boxLabel:arr[i],
		    	   inputValue :arr[i]
		       })
		)
		return radioArr;
	}
	var radioForm = new Ext.form.FormPanel({
		bodyStyle:'padding:0 0 0 0',					//表单边距
		style:"margin: 0 0 0 0 ",
		labelWidth:1,
		frame:true,			
		items: createRadios(["正常","毕业","开除","退学","离校","复学","肄业","其它异动"])
	});
	var wdl = new Ext.Window({
	title: "学生异动 ",
	width: 200,
	height:280,							//是否渲染表单
	layout: 'fit',
	plain:true,
	modal:true,
	draggable:true,
	resizable:false,
	closable:false,
	bodyStyle:'padding:5px;',
	buttonAlign:'center',
	items:  radioForm,
	buttons: [{
		text: '确定',
		handler:function(){
			radioForm.form.submit({
				clientValidation:true,
				waitMsg:'正在修改信息,请稍后...',
				waitTitle:'提示',
				url:"studentManager.do?method=strangeStudent", 
				params:{'ids':arrId} ,
				success:function(form,action){
					window.Ext.Msg.alert("提示","操作成功！");
					store.reload();
					wdl.destroy();
				}
			})
		},
		failure:function(form,action){
			window.Ext.Msg.alert("提示","操作失败！");
		}
	},
	{
		text: '取消',
		handler:function(){
		//关闭面板
			wdl.destroy();
		}
	}]
	
	})
	wdl.show();
}
}
);