Ext.onReady(function () {

    Ext.BLANK_IMAGE_URL = "../js/ext-3.3.1/resources/images/default/s.gif";
    Ext.QuickTips.init();    //初始化信息提示
    Ext.form.Field.prototype.msgTarget = "qtip";//统一指定错误信息提示方式

    Ext.Msg.buttonText.yes = "确定";
    Ext.Msg.buttonText.ok = "确定";
    Ext.Msg.buttonText.cancel = "取消";
    Ext.Msg.buttonText.no = "取消";

    var toolbar = new Ext.Toolbar({
        width: '100%'
    });

    toolbar.add('-',
        new Ext.Button({
            text: '推送',
            iconCls: 'editButton',
            handler: push
        })
    );
	
    var channelId = "";
    
	var partnerList = new Ext.data.Store({
		autoLoad:true,
		proxy:new Ext.data.HttpProxy({
			url:'partnerManager.do?method=findPartner'
		}),
		reader:new Ext.data.JsonReader({},['id','dcode','text'])
	});

    var dataForm = new Ext.form.FormPanel({
        title: "发送公告",
        labelSeparator: ':',
        labelWidth: 70,
        bodyStyle: "padding: 3px 20px;",
        frame: true,
        layout: 'column',
        height: 'auto',
        tbar: toolbar,
        items: [
            {
                columnWidth: '.5',
                layout: 'column',
                items: [
                    {
                        columnWidth: 2,
                        layout: 'form',
                        items: [
                            new Ext.form.TextField({
                                name: 'title',
                                width: 700,
                                fieldLabel: '标题',
                                allowBlank: false,
                                emptyText: '请填写标题',
                                blankText: '内标题不能为空'
                            }),
                            new Ext.form.TextArea({
                                name: 'content',
                                width: 700,
                                height:500,
                                fieldLabel: '内容',
                                allowBlank: false,
                                emptyText: '请填写内容',
                                blankText: '内容不能为空'
                            })]
                    },
                    {
                        columnWidth: 2,
                        layout: 'hbox',
                        items: [
                            {
                                width: 260,
                                layout: 'form',
                                items: [
                                    new Ext.form.DateField({
                                        name: 'startTime',
                                        width: 150,
                                        fieldLabel: '开始时间',
                                        allowBlank: false,
                                        editable: true,
                                        value: new Date(),
                                        emptyText: '请填写发送时间',
                                        format: 'Y-m-d H:i'
                                    })
                                ]
                            },
                            {
                                width: 260,
                                layout: 'form',
                                items: [
                                    new Ext.form.DateField({
                                        name: 'endTime',
                                        width: 150,
                                        fieldLabel: '结束时间',
                                        allowBlank: false,
                                        editable: true,
                                        value: new Date(),
                                        emptyText: '请填写发送时间',
                                        format: 'Y-m-d H:i'
                                    })
                                ]
                            }
                        ]
                    },
                    {
                        columnWidth: 2,
                        layout: 'hbox',
                        items: [
                            {
                                width: 250,
                                layout: 'form',
                                items: [
                                    new Ext.form.TextField({
                                        name: 'delaySecond',
                                        width: 150,
                                        fieldLabel: '周期秒数',
                                        allowBlank: false,
                                        editable: false,
                                        format: 'Y-m-d',
                                        regex: /^\d+$/,
                                        regexText: '请输入数字',
                                        value: 11,
                                        emptyText: '请填写周期秒数',
                                        blankText: '请填写数字'
                                    }),
                                ]
                            }
                        ]
                    },
                    {
                        columnWidth: 2,
                        layout: 'hbox',
                        items: [
                            {
                                width: 260,
                                layout: 'form',
                                items: [
                                    new Ext.form.ComboBox({
                                        id: 'xtype',
                                        hiddenName: 'xtype',
                                        width: 150,
                                        store: new Ext.data.SimpleStore({
                                            fields: ['id', 'name'],
                                            data: window.noticeIdMap.arr
                                        }),
                                        triggerAction: 'all',
                                        fieldLabel: '公告类型',
                                        valueField: 'id',
                                        displayField: 'name',
                                        editable: false,
                                        mode: 'local',
                                        forceSelection: true,
                                        value: '1',
                                        allowBlank: false,
                                        blankText: '请选择公告类型'
                                    })
                                ]
                            },
                            {
                            	width: 260,
                            	layout: 'form' ,
                            	items: [
	                     	       new Ext.form.MultiSelect({
	                     	       	   id:'sendChannel',
	                     	    	   name:'sendChannel',
	                     	    	   width:150,
	                     	    	   emptyText:'不限',
//	                     	    	   allowBlank:true,
	                     	    	   mode:'local',
	                     	    	   store:partnerList,  
	                     	    	   fieldLabel: '发送渠道',
	                     	    	   triggerAction:'all', 
	                     	    	   displayField:'text', 
	                     	    	   valueField:'id', 
	                     	    	   value: '',
	                     	    	   editable: false
	                       		     })
                     	       ]
                            }
                        ]
                    }
                ]
            }
        ]
    });

    function push() {
        var selectedCount = smServer.getCount();
        if (selectedCount <= 0) {
            Ext.Msg.alert("错误", "请至少选择一个服务器!");
            return;
        }
        channelId = Ext.getCmp('sendChannel').getValue();
        var servers = smServer.getSelections();
        var serverIds = "";
        for (var i = 0; i < servers.length; ++i) {
            serverIds += servers[i].data.id + ",";
        }


        dataForm.form.submit({
            clientValidation: true,
            waitMsg: '正在提交信息,请稍后...',
            waitTitle: '提示',
            params: {
                serverIds: serverIds, channelId: channelId,
            },
            submitEmptyText: false,
            url: "notice.do?method=push",
            success: function (form, action) {
                window.Ext.Msg.alert("提示", "发送成功！");
                return false;
            },
            failure: function (form, action) {
                window.Ext.Msg.alert("提示", "发送失败!" + action.result.info);
            }
        });

    }

    var gridServer = window.createServerGridByGroupName('LOGIN');
    var smServer = gridServer.getSelectionModel();

    new Ext.Viewport({
        layout: 'fit',
        items: [{
            layout: 'border',
            items: [{
                // xtype: 'panel' implied by default
                title: '服务器过滤',
                region: 'north',
                margins: '5 0 0 5',
                height: 150,
                collapsible: true,   // make collapsible
                split: true,         // enable resizing
                cmargins: '5 5 0 5', // adjust top margin when collapsed
                id: 'west-region-container',
                layout: 'fit',
                items: [gridServer]
            }, {
                title: 'Center Region',
                region: 'center',     // center region is required, no width/height specified
                xtype: 'container',
                layout: 'fit',
                height: 100,
                minSize: 75,         // defaults to 75
                margins: '5 5 0 0',
                items: [dataForm]
            }]
        }]
    });

});