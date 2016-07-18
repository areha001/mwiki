/**
 * @author Administrator
 */

 Ext.onReady(function(){
	
	Ext.BLANK_IMAGE_URL = "../js/ext-3.3.1/resources/images/default/s.gif";
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget = "side";
	
	Ext.Msg.buttonText.yes = "确定";
	Ext.Msg.buttonText.ok = "确定";
	Ext.Msg.buttonText.cancel = "取消";
	Ext.Msg.buttonText.no = "取消";
	
	
	//定义菜单选择项
	var toolbar = new Ext.Toolbar({
		width:'100%'
	});

	var addKCHandler = function(){
				if(selectedTreeNode==null){
					window.Ext.Msg.alert("提示","请选择节点！");
				    return false;
				}
				//添加一个班级
				var dataform = new Ext.form.FormPanel({
					labelSeparator:':',
					labelWidth:70,
					bodyStyle:'padding:0 0 0 0',
					frame:true,
					height:'auto',
					width:300,
					items:[
						new Ext.form.Label({
							name:'xer',
							width:200,
							readOnly:true,
							fieldLabel:'父节点名',
							text:selectedTreeNode.attributes.text
						}),
						new Ext.form.TextField({
							name:'title',
							width:200,
							fieldLabel:'节点名',
							allowBlank:false,//数据库中可以为空的话 这二行可以去掉
							blankText:'请填写节点名'
						}),
						new Ext.form.TextField({
							name:'code',
							width:200,
							hidden:true,
							value:selectedTreeNode.attributes.id,
							fieldLabel:'节点名',
							allowBlank:false,//数据库中可以为空的话 这二行可以去掉
							blankText:'请填写节点名'
						})
						
	
					]
				});
				var windowpanel = new Ext.Window({
			        title: '添加学科节点',
			        width: 350,
			        height:150,
			        layout: 'fit',
			        plain:true,
			        draggable:false,
			        resizable:false,
			        closable:false,
			        bodyStyle:'padding:5px;',
			        buttonAlign:'center',
			        items: dataform,
			        buttons: [{
			            text: '确定',
			            handler:function(){
				        	dataform.form.submit({
				    			clientValidation:true,
				    			waitMsg:'正在添加信息,请稍后...',
				    			waitTitle:'提示',
				    			url:"main.do?method=addcu",   // <-这里输入添加教师信息的servlet地址。   return null out.print({"success":false});
				    			success:function(form,action){
				    				windowpanel.destroy();
				    				//store.reload();
				    				window.Ext.Msg.alert("提示","添加成功！");
				    				selectedTreeNode.reload();
				    				return false;
				    			},
				    			failure:function(form,action){
				    				//window.Ext.Msg.alert("提示","添加新班级失败！");
				    				window.Ext.Msg.alert("提示","添加失败!"+action.result.info);
				    			}
				    		})   
			        	}
			        },
			        {
			            text: '取消',
			            handler:function(){
			        		//关闭面板
			        		windowpanel.destroy();
			            }
			        }]
			    });
				windowpanel.show();
			}

	toolbar.add(
		
		new Ext.Button({
			text:'添加学科节点',
			iconCls:'addButton',
			handler:addKCHandler
		}),
		
		//修改班级信息...........................................
		new Ext.Button({
			text:'修改',
			iconCls:'editButton',
			id:'edit',
			handler:function(){  
				if(selectedTreeNode==null){
					window.Ext.Msg.alert("提示","请选择节点！");
				    return false;
				}
				//添加一个班级
				var dataform = new Ext.form.FormPanel({
					labelSeparator:':',
					labelWidth:70,
					bodyStyle:'padding:0 0 0 0',
					frame:true,
					height:'auto',
					width:300,
					items:[
						new Ext.form.Label({
							name:'xer',
							width:200,
							readOnly:true,
							fieldLabel:'原名称',
							text:selectedTreeNode.attributes.text
						}),
						new Ext.form.TextField({
							name:'title',
							width:200,
							fieldLabel:'新名称',
							allowBlank:false,//数据库中可以为空的话 这二行可以去掉
							value:selectedTreeNode.attributes.text
						}),
						new Ext.form.TextField({
							name:'code',
							width:200,
							hidden:true,
							value:selectedTreeNode.attributes.id,
							fieldLabel:'知识点名',
							allowBlank:false,//数据库中可以为空的话 这二行可以去掉
							blankText:'请填写知识点名'
						})
						
	
					]
				});
				
				var windowpanel = new Ext.Window({
			        title: '修改',
			        width: 350,
			        height:150,
			        layout: 'fit',
			        plain:true,
			        draggable:false,
			        resizable:false,
			        closable:false,
			        bodyStyle:'padding:5px;',
			        buttonAlign:'center',
			        items: dataform,
			        buttons: [{
			            text: '确定',
			            handler:function(){
				        	dataform.form.submit({
				    			clientValidation:true,
				    			waitMsg:'正在添加信息,请稍后...',
				    			waitTitle:'提示',
				    			url:"main.do?method=editcu",   // <-这里输入添加教师信息的servlet地址。   return null out.print({"success":false});
				    			success:function(form,action){
				    				windowpanel.destroy();
				    				//store.reload();
				    				window.Ext.Msg.alert("提示","修改成功！");
				    				selectedTreeNode.parentNode.reload();
				    				return false;
				    			},
				    			failure:function(form,action){
				    				//window.Ext.Msg.alert("提示","添加新班级失败！");
				    				window.Ext.Msg.alert("提示","添加失败!"+action.result.info);
				    			}
				    		})   
			        	}
			        },
			        {
			            text: '取消',
			            handler:function(){
			        		//关闭面板
			        		windowpanel.destroy();
			            }
			        }]
			    });
				windowpanel.show();
			}
		}),
		
		new Ext.Button({
			text:'删除',
			iconCls:'runButton',
			handler:function(){
				if(selectedTreeNode==null){
					window.Ext.Msg.alert("提示","请选择节点！");
				    return false;
				}
				
				window.Ext.Msg.confirm("提示","确认删除？删除将连下面的子结点一起删除", function(btn){
					if(btn=="yes")
					{
						Ext.Ajax.request({
		                    url: 'main.do?method=deleteCu', //根据id删除节点
		                    //
		                    params:{'code':selectedTreeNode.attributes.id},            
		                    method: 'post', 
		                    //
		                    success: function(request) {
		                    	selectedTreeNode.parentNode.reload();
		                    	Ext.MessageBox.alert("提示","删除成功!");
		                    	selectedTreeNode = null;
		                    },
		                    failure: function() {
		                        Ext.MessageBox.alert("提示","删除失败!");
		                    }
		                });
					}
				})
				    
				
			}
		})	
	)

	/******************************
	 *         定义表格组件         *
	 ******************************/
	var selectedTreeNode  = null;
	
	var root = new Ext.tree.AsyncTreeNode( {
		 text : "知识点树",
         draggable : false,
         id : "-100"//默认的node值：?node=-100
    });
	var tree = new Ext.tree.TreePanel({
		tbar:[toolbar],
		autoScroll : true,
		rootVisible:true,
        animate : true,
        enableDD : true,
        containerScroll : true,
		border: false,
		width:"100%",
		listeners: {
            click: function(n) {
            	//得到点击节点的ID和TEXT
            	//var __nodeId__ = n.attributes.id;
            	selectedTreeNode = n;
            	updateBottom(n);
            },
            nodedrop:function(e){
            	if(false && e.point == "append")
            	{
	            	var msk =  new Ext.LoadMask(Ext.getBody(), {
					     msg : '正在加载...'
					     });
					msk.show();
	            	Ext.Ajax.request({
	            		url: "main.do?method=movecu",
	            		method : "post",
	            		params : {code:e.dropNode.id, descode:e.target.id},
	            		success: function(){
	            			msk.hide();
	            			e.target.reload();
	            			Ext.MessageBox.alert("提示","移动成功!");
	            		},
	            		failed: function(){
	            			msk.hide();
	            			Ext.MessageBox.alert("提示","移动失败!");
	            		}
	            		
	            	})
            	}
            }
        },
		root:root ,
		loader : new Ext.tree.TreeLoader( {
         dataUrl : "main.do?method=cutreedata"// OrgTreeJsonData.action就是要动态载入数据的请求地址，这里请求时会提交一个参数为node的值，值为root即new Tree.AsyncTreeNode()对象的id值
	   })
	});
	var updateBottom = function(node){
		xdata[0] = [node.attributes.id, node.attributes.text, node.attributes.info1]
		listView.store.reload();
	}
	var xdata = [["123","123","123"]]
	var listView = new Ext.list.ListView({
	store:new Ext.data.Store({
		proxy:new Ext.data.MemoryProxy(xdata),
		reader:new Ext.data.ArrayReader({}, 
		Ext.data.Record.create([
		    {name: 't1'},
		    {name: 't2'},
		    {name: 't3'}
		]) )
	}),
    multiSelect: true,
    emptyText: 'No images to display',
    reserveScrollOffset: true,
    columns: [{
        header: '节点CODE',
        width: .2,
        dataIndex: 't1'
    },{
        header: '节点名',
        width: .3,
        dataIndex: 't2',
    },{
        header: '全路径',
        dataIndex: 't3',
    }]
});

listView.store.load();
	var bottombar = new Ext.Panel({
		width:'100%',
		items:[listView]
	});
	new Ext.Viewport({
		layout: 'border',
		items:[
				{    //剧中的容器
					title:"知识点管理",
					region:"center",
					border:false,
					layout:"fit",
					bodyBorder:false,
					items:[tree]
				},{
					title:"详细信息",
					region: 'south',
					border:false,
					height: 100,
					bodyBorder:false,
					items:[bottombar]
				
				}
			]
	})
 });