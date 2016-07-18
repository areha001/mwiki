Ext.onReady(function(){

	Ext.BLANK_IMAGE_URL = "../js/ext-3.3.1/resources/images/default/s.gif";
	Ext.QuickTips.init();    //初始化信息提示
	Ext.form.Field.prototype.msgTarget = "qtip";//统一指定错误信息提示方式
	
	Ext.Msg.buttonText.yes = "确定";
	Ext.Msg.buttonText.ok = "确定";
	Ext.Msg.buttonText.cancel = "取消";
	Ext.Msg.buttonText.no = "取消";

	var xUploadUrl = "";
    var doUpload = function(){
        if(fpFileUpload.form.isValid()){
            fpFileUpload.form.submit({
                method:'post',
                url:xUploadUrl,
                params:{serverIds:sids.join(",")},
                waitMsg:'文件上传中...',
                success: function(resp,data) {   
					if(!data.result.failed){
						Ext.MessageBox.alert("提示","操作成功!");
					}
					else{
						Ext.MessageBox.alert("提示",failed);
					}
                	window.fileUploadWindow.hide();
                },
                failure: function() {
                    Ext.Msg.alert("系统提示", "文件上传失败！");
                }
            });
        }else{
            Ext.Msg.alert("系统提示","请选择文件后再上传！");
        }
    };
    var sids = [];
    
	var fpFileUpload=new Ext.FormPanel({
        id:'fpFileUpload',
        fileUpload:true,
        frame:true,
        items:[
            {
                xtype:'textfield',
                allowBlank:false,
                fieldLabel:'选择文件',
                inputType:'file',
                name:'fileName'
            },
			{
            		id:'serverCounts',
				   style:'padding:5px;',
				   xtype:'label',
				    fieldLabel:'服务器个数',
				    html:"<p>已选择： [0] 个服务器</p>"
				},
            {
				id:'serverNames',
         	   xtype:'label',
         	   height:50,
               fieldLabel:'服务器',
               html:"<p>服务器</p>"
            }
        ],
        buttonAlign:'center',
        buttons:[
            {
                text:'上传',
                handler:doUpload
            },
            {
                text:'取消',
                handler:function(){
                	window.fileUploadWindow.hide();
                }
            }
        ]
    });
    
    window.showFileUpload=function(serverIds,label,uploadUrl){
    	xUploadUrl = uploadUrl;
    	sids = serverIds;
    	Ext.getCmp('serverCounts').setText(serverIds.length);
    	Ext.getCmp('serverNames').setText(label);
    	if( window.fileUploadWindow){
    		 window.fileUploadWindow.show();
    		 return;
    	}
	    var winFileUpload=new Ext.Window({
	        id:'win',
	        title:'文件上传',
	        //****renderTo:'divWindow',//对于window不要使用renderTo属性，只需要调用show方法就可以显示，添加此属性会难以控制其位置
	        width:350,
	        height:250,
	        layout:'fit',
	        autoDestory:true,
	        modal:true,
	        closeAction:'hide',
	        items:[
		            fpFileUpload
	        ]
	    });
	    
	    window.fileUploadWindow = winFileUpload;
	    window.fileUploadWindow.show();
    };

});