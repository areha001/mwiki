	
(function(){
	/**LOCK FORM START*/
	var lockToDate = new Ext.form.DateField({
		   name:'lockToDate',
		   width:200,
			style:'margin-bottom:8px;',
		   fieldLabel:'日期',
		   allowBlank:false,
		   editable:false,
		   disabled:true,
		   format:'Y-m-d',
		   emptyText:'请填写日期',
		   blankText:'日期不能为空',
		   hiddenName:'lockToDate'
	});

	var lockToTime = new Ext.form.TimeField({
	   name:'lockToTime',
		style:'margin-bottom:8px;',
	   width:200,
	   fieldLabel:'时间',
	   format:'H:i',
	   allowBlank:false,
	   disabled:true,
	   emptyText:'时间',
	   blankText:'时间不能为空',
	   increment: 30
	})
	var lockFormCreator = function(sid, cname){
		lockForm = new Ext.form.FormPanel({
			bodyStyle:'padding:10px 0 0 30px',					//表单边距
			style:"margin: 0 0 0 0",
			labelWidth:50,
			frame:true,			
			items: [

			new Ext.form.TextField({
				name:'roleName', 
				value:cname, 
				fieldLabel:'角色名',
				width:200,
				labelSeparator:'：',
				style:'margin-bottom:8px;',
				allowBlank:false,
				readOnly:true,
				blankText:'请输入角色名'
			}), 
			new Ext.form.ComboBox({
		    	hiddenName:'lockType',
				style:'margin-bottom:8px;',
				width:200,
		  	   store:new Ext.data.SimpleStore({
		  		   fields:['id','name'],
		  		   data:[['-1','永久封号'],['1','封号至'],['0','解除封号'],['-2','踢出玩家']]
		  	   }),
		  	   triggerAction:'all',
		  	   fieldLabel:'方式',
		  	   valueField:'id',
		  	   displayField:'name',
		  	   editable:false,
		  	   value:'-1',
		  	   mode:'local',
		  	   forceSelection:true,
		  	   allowBlank:false,
		  	   listeners:{
		  	      'select': function(){
		  	    	  if(this.value!=1){
			  	    	lockToDate.disable();
			  	    	lockToTime.disable();
		  	      		}
		  	    	  else{
			  	    	lockToDate.enable();
			  	    	lockToTime.enable();
		  	    	  }
		  	      
		  	      }
		  	   },
		  	   blankText:'请选择方式'
		     }),
		     lockToDate,
		     lockToTime,
				new Ext.form.TextField({
					name:'reason', 
					style:'margin-bottom:8px;',
					width:200,
					fieldLabel:'原因',
					labelSeparator:'：',
					allowBlank:false,
					blankText:'请输入原因'
				}) 
			]
		});
	}
	var lockForm = {};
	var lockPage = function(user){
		lockFormCreator(user.sid, user.userName);
		var lockWindow = new Ext.Window({
			title: "封号与解封 ",
			width: 400,
			height:280,							//是否渲染表单
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
					url:"lock.do?method=lock", 
					params:{serverId:window.serverId,playerId:user.playerId},
					success:function(form,action){
					window.Ext.Msg.alert("提示","操作成功！",function(){
						storeUser.reload();
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
	window.extraButton.push({text:'封号与解封',iconCls:'editButton', func:lockPage});
})();


(function(){
	var lockPageHistory = function(user){
		var store = new Ext.data.Store({
			autoLoad:true,
			reader:new Ext.data.JsonReader({
				root:"items",
				totalProperty:"results",
				fields:[
				        {name:"id"},//流水id 不须更改
				        {name:"lockTo"},
				        {name:"reason"},
				        {name:"creatorName"},
				        {name:"createTime"}
				        ]
			}),
			proxy : new Ext.data.HttpProxy({
				url:'userManager.do?method=showLockInfo'
			}),
			baseParams:{userId:user.playerId}
		});
		var grid = new Ext.grid.GridPanel({
			frame:true,
			stripeRows:true,
			tortable:true,
			loadMask: {msg:'正在加载数据，请稍候...'},
			store:store,
			viewConfig: {columnsText:'显示列',sortAscText:'升序',sortDescText:'降序' },
			columns:[//对应的列
			         {header:'操作人 ',width:100,dataIndex:'creatorName',sortable:true},
			         {header:'原因 ',width:300,dataIndex:'reason',sortable:true},
			         {header:'封停至 ',width:150,dataIndex:'lockTo',sortable:true},
			         {header:'操作时间 ',width:150,dataIndex:'createTime',sortable:true,renderer:function(value, metadata,record)
		        		 {
		        		 	var tm = record.data.createTime.time;
		        			 return  Ext.util.Format.date(new Date(tm),'Y-m-d  H:i') 
	        		 }},
			],
			bbar:new Ext.PagingToolbar({
				pageSize:25,  
				store:store,
				beforePageText:"当前第",  
				afterPageText:"页，共{0}页",  
				lastText:"尾页",  
				nextText :"下一页",  
				prevText :"上一页",  
				firstText :"首页",  
				refreshText:"刷新页面",  
				displayInfo: true,  
				emptyMsg:'<span style="color:#414141;font-weight:bold;">当前没有任何数据</span>',
				displayMsg:"当前显示 {0} - {1}条, 共 {2}"
			})
		});
		var lockWindow = new Ext.Window({
			title: "封号记录 ",
			width: 800,
			height:380,							//是否渲染表单
			layout: 'fit',
			plain:true,
			modal:true,
			draggable:true,
			resizable:false,
			closable:false,
			bodyStyle:'padding:5px;',
			buttonAlign:'center',
			items:  grid,
			closable:true
		});
		lockWindow.show();
	}
	window.extraButton.push({text:'封号记录',iconCls:'editButton', func:lockPageHistory});
})();
	/**LOCK FORM END*/