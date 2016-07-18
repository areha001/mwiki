/**
 * @author Administrator
 */

Ext.onReady(function(){

	var tb = new Ext.Toolbar({ width:'100%'});
	tb.add(new Ext.Button(
		{
			text:"保存",
			iconCls:'editButton',
			handler:function(){
				dataform.form.submit({
					clientValidation:true,
					waitMsg:'正在修改信息,请稍后...',
					waitTitle:'提示',
					url: "reacherManager.do?method=updateTl",   
					success:function(form,action){
						window.Ext.Msg.alert("提示","操作成功！", reloadForm);
					},
					failure:function(form,action){
						window.Ext.Msg.alert("提示","操作失败！");
					}
				});  
			} 
		}
	))
	var show_edit_form = function(syid,syname){  
		//修改一个学生
		window.dataform = new Ext.form.FormPanel({
			labelSeparator:':',								//分隔符
			fileUpload: true,
			enctype : "multipart/form-data",
			labelWidth:70,                                 //标签宽度
			border:true,
			bodyStyle:'padding:8px',					//表单边距
			frame:true,										//是否渲染表单
			tbar:tb,
			items:[{
				autoHeight:true,
				layout:'column',
				border:false,
				items: [{
					columnWidth:1,
					layout:'form',
					defaults: {anchor: '95%'},
					items:[
							new Ext.form.TextField({
						    	hidden: true,
						    	readOnly:false,
						    	fieldLabel:'SYID',
						    	name:'syId',//  是否允许为空。数据库中可以为空的话 这二行可以去掉
  						    	value:syid
					       }),
					       //登录名不可修改，显示设置不可编辑，表单中多加一个登录名是为修改后设置成功
					       new Ext.form.TextField({
					    	   hidden: false,
					    	   readOnly:false,
					    	   fieldLabel:'标题',
					    	   name:'title',
  						    	   allowBlank:false,//  是否允许为空。数据库中可以为空的话 这二行可以去掉
  						    	   blankText:'标题'
					       }),
					       
					       new Ext.form.HtmlEditor({
					    	   height: 200,
					    	   hidden: false,
					    	   readOnly:false,
					    	   fieldLabel:'描述',
					    	   name:'descipe',
  						    	   allowBlank:false//  是否允许为空。数据库中可以为空的话 这二行可以去掉
					       }),
					       new Ext.form.TextField({
					    	   hidden: false,
					    	   readOnly:false,
					    	   id:'uploading',
					    	   fieldLabel:'文件',
					    	   inputType: 'file',
					    	   name:'deptName',
  						    	allowBlank:false//  是否允许为空。数据库中可以为空的话 这二行可以去掉
					       }),
					    	new Ext.form.Hidden({
					    		name:"articleType",
					    		value:17
					    	}), 
					    	new Ext.form.Label({
					    	   hidden: false,
					    	   id:'uploaded',
					    	   width:300,
					    	   readOnly:true,
					    	   fieldLabel:'文件',
					    	   name:'vvv'
					       })
					    	
					       ] 
				}]
			}]
		});
		return dataform;
	}
	window.change_show = function(){
		var hidden = Ext.getCmp("uploading").hidden;
		if(hidden)
		{
			Ext.getCmp("uploading").show();
			Ext.getCmp("uploading").enable();
			Ext.getCmp("uploaded").hide();
		}
		else
		{
			Ext.getCmp("uploaded").show();
			Ext.getCmp("uploading").disable();
			Ext.getCmp("uploading").hide();
		}
	}
	new Ext.Viewport({
		layout: 'border',
		frame:true,
		items:[
		       {    //剧中的容器
		    	   title: "指南文档管理（"+ STUDY_YEAR_NAME + "）",
		    	   region:"center",
		    	   border:false,
		    	   layout:"fit",
		    	   bodyBorder:false,
		    	   items:[show_edit_form(STUDY_YEAR_ID, STUDY_YEAR_NAME)]
		       }
		       ]
	}
	);
	
	window.reloadForm = function(){
		dataform.form.load({
			clientValidation:false,
			url:"reacherManager.do?method=loadTl&syId=" + STUDY_YEAR_ID,  
			params:{'id':id},//传参数 studentid
			waitMsg:'正在加载信息,请稍后...',
			waitTitle:'提示',
			success:function(form,action,vv){
				var obj = Ext.decode(action.response.responseText).data;
				var attachTitle = obj.attachTitle;
				var attachUrl = obj.attachUrl;
				window.x = obj;
				if(x.attachTitle)
				{
					Ext.getCmp("uploaded").show();
					Ext.getCmp("uploading").hide();
					Ext.getCmp("uploading").disable();
					var str = "<a target='_blank' href='" + attachUrl + "'>" + attachTitle + "</a> ";
					str = str + " &nbsp; &nbsp; <a href='javascript:change_show()'>重新上传</a>"
					Ext.getCmp("uploaded").setText( str , false);
					window.tlAttachUploadUrl = "reacherManager.do?method=uploadTl";
				}
				else
				{
					window.tlAttachUploadUrl = "reacherCreate.do";
					Ext.getCmp("uploaded").hide();
				}
			},
			failure:function(form,action){
				window.Ext.Msg.alert("提示","数据加载失败！"+action.result.data);
				windowpanel.destroy();
			}
		});
	}
	reloadForm();
}
);