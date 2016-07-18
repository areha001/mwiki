/**
 * @author Administrator
 */

Ext.onReady(function(){

	Ext.BLANK_IMAGE_URL = "../js/ext-3.3.1/resources/images/default/s.gif";
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget = "qtip";

	Ext.Msg.buttonText.yes = "确定";
	Ext.Msg.buttonText.ok = "确定";
	Ext.Msg.buttonText.cancel = "取消";
	Ext.Msg.buttonText.no = "取消";
	var DefaultLimitSize = 20;

	/******************************
	 *         定义表格组件         *
	 ******************************/


	//定义菜单选择项
	var toolbar = new Ext.Toolbar({
		width:'100%'
	});
	
	toolbar.add(
			new Ext.Button({
				text:'保存',
				iconCls:'editButton',
				handler:function(){
							dictForm.form.submit({
							clientValidation:true,
							waitMsg:'正在提交表单,请稍后...',
							waitTitle:'提示',
							url:"sysDict.do?method=manageDict",   
							success:function(form,action){
							var failed = Ext.decode(action.response.responseText).failed;
							if(failed == "")
								window.Ext.Msg.alert("提示","保存成功！");
							else
								window.Ext.Msg.alert("提示", failed);
								
							dictWindow.destroy();
							store.reload();
						},
						failure:function(form,action){
							window.Ext.Msg.alert("提示",titleName+"失败！"+action.result.info);
						}
						});   
					}
			})
	);
	
		var dictForm = new Ext.form.FormPanel({
			tbar:toolbar,
			labelSeparator:':',								//分隔符
			labelWidth:100,                                 //标签宽度
			bodyStyle:'padding:20px',					//表单边距
			labelAlign:"right",
			frame:true,					
			layout:'form',					//是否渲染表单
			height:500,
			items: [
			       new Ext.form.RadioGroup ({
			       style:'margin:5px;width:150px;',
			    	fieldLabel:'开放注册',
			    	width:150,
			    	labelSeparator :' ：',
			       items:[
				       new Ext.form.Radio({
				    	   name:'openReg',
				    	   boxLabel:'是',
				    	   checked: OPEN_REG != "2",
				    	   inputValue:'1'
				       }),
				       new Ext.form.Radio({
				    	   name:'openReg',
				    	   boxLabel:'否',
				    	   checked: OPEN_REG == "2",
				    	   inputValue:'2'
				       })]
				   }),
				    new Ext.form.RadioGroup ({
			       style:'margin:5px',
			    	fieldLabel:'游客查看附件',
			    	width:150,
			    	height:150,
			    	labelSeparator :' ：',
			       items:[
				       new Ext.form.Radio({
				    	   name:'allowGuestViewAttach',
				    	   checked:ALLOW_GUEST_VIEW_ATTACH != "1", 
				    	   boxLabel:'允许',
				    	   inputValue:'2'
				       }),
				       new Ext.form.Radio({
				    	   name:'allowGuestViewAttach',
				    	   boxLabel:'不允许',
				    	   checked:ALLOW_GUEST_VIEW_ATTACH == "1", 
				    	   inputValue:'1'
				       })]
				   })
			    ]
		});

	new Ext.Viewport({
		layout: 'border',
		items:[
		       {    //剧中的容器
		    	   title:"",
		    	   region:"center",
		    	   border:false,
		    	   layout:"fit",
		    	   bodyBorder:false,
		    	   items:[dictForm]
		       }
		       ]
	}
	);
}
);