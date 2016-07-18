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
	
	//获得所有的老师列表，存在一个stroe中。
	var stone_teacher = new Ext.data.Store({
		reader:new Ext.data.JsonReader({ //创建JSon数据解析器
			fields:['id','text']
		}),
		proxy:new Ext.data.HttpProxy({		//创建HttpProxy代理
			url:'gradeCourseManager.do?method=getAllTeacher'		//设置代请求的URl该地址返回包含老师列表信息的JSON文件
		}),
		autoLoad:true
	});

	//获得所有的课程列表，存在一个stroe中。创建数据集 用于添加课程用
	var stone_code = new Ext.data.Store({
		reader:new Ext.data.JsonReader({//创建JSon数据解析器
			fields:['code','text']
		}),
		proxy:new Ext.data.HttpProxy({//创建HttpProxy代理
			url:'gradeCourseManager.do?method=getAllCode'
		}),
		autoLoad:true
	});

	//获得所有的课程列表，存在一个stroe中。用于按学期，按年级，按学期过滤查询
	var stone_code1 = new Ext.data.Store({
		reader:new Ext.data.JsonReader({//创建JSon数据解析器
			fields:['code','text']
		}),
		proxy:new Ext.data.HttpProxy({//创建HttpProxy代理
			url:'gradeCourseManager.do?method=getAllCode'
		}),
		autoLoad:true
	})	;
	
	//获得所有学期列表，存在一个stroe中。创建数据集
	var terminfo_id = new Ext.data.Store({//创建JSon数据解析器
		reader:new Ext.data.JsonReader({//创建HttpProxy代理
			fields:['id','text']
		}),
		proxy:new Ext.data.HttpProxy({
			url:'gradeCourseManager.do?method=getAllTermInfo'
		}),
		autoLoad:true
	})	;
	//获得所有学期列表的起止时间，存在一个stroe中。创建数据集
	var stone_startAndEndDate = new Ext.data.Store({//创建JSon数据解析器
		reader:new Ext.data.JsonReader({//创建HttpProxy代理
			fields:['id','text']
		}),
		proxy:new Ext.data.HttpProxy({
			url:'gradeCourseManager.do?method=getStartAndendDate'
		}),
		autoLoad:true
	})	;
	
	//获得所有的年级列表，存在一个stroe中----用于本页面的按年级过滤用。
	var stone_findGrade = new Ext.data.Store({
		reader:new Ext.data.JsonReader({ //创建JSon数据解析器
			fields:['id','text']
		}),
		proxy:new Ext.data.HttpProxy({		//创建HttpProxy代理
			url:'gradeCourseManager.do?method=getAllGrade'		//设置代请求的URl该地址返回包含老师列表信息的JSON文件
		}),
		autoLoad:true
	});
	
	//获得所有的年级列表，存在一个stroe中----用于添加课程信息用。
	var stone_grade = new Ext.data.Store({
		reader:new Ext.data.JsonReader({ //创建JSon数据解析器
			fields:['id','text']
		}),
		proxy:new Ext.data.HttpProxy({		//创建HttpProxy代理
			url:'gradeCourseManager.do?method=getAllGrade'		//设置代请求的URl该地址返回包含老师列表信息的JSON文件
		}),
		autoLoad:true
	});
	
	//获得所有的班级列表，存在一个stroe中----用于修改课程中  年级/班级拼起来的字段。
	var stone_findGradeClazz = new Ext.data.Store({
		reader:new Ext.data.JsonReader({ //创建JSon数据解析器
			fields:['id','text']
		}),
		proxy:new Ext.data.HttpProxy({		//创建HttpProxy代理
			url:'gradeCourseManager.do?method=getAllGradeClazz'		//设置代请求的URl该地址返回包含老师列表信息的JSON文件
		}),
		autoLoad:true
	});
	
	


	/*-----------------------------------------------------------------------------------
	 *                           这里是通过年级选择班级的控件代码
	 *----------------------------------------------------------------------------------*/
	
	//通过选择年级，动态查询下面的班级
	function getClass(obj){

		clzzStore.proxy = new Ext.data.HttpProxy({
			url:'gradeCourseManager.do?method=getAllClazzByGrade&grade='+encodeURI(this.value)   //重新设置 grid 组件的数据代理地址
	    });
		clzzStore.load({params:{start:0,limit:100}});
	}
	
	/*-----------------------------------------------------------------------------------
	 *                           通过年级选择班级的控件代码结束
	 *----------------------------------------------------------------------------------*/
	
	//定义菜单选项   即工具栏组件	
	var toolbar = new Ext.Toolbar({
		width:'100%'
	});
	toolbar.add(
			new Ext.Button({
				text:'添加',
				iconCls:'addButton',
				handler:function(){
				//创建一个 Store 对象。
				clzzStore = new Ext.data.Store({
					reader:new Ext.data.JsonReader({
						root:"items",
						fields:[
						        {name:"id"},
						        {name:"clazzName"},
						        {name:"grade"},
						        {name:"state"}
						]
					}),
					proxy:new Ext.data.HttpProxy({
						url:'clazzManager.do?method=showClazzList' //访问路径
					})
				});
				//选择模式
				var clzzsm = new Ext.grid.CheckboxSelectionModel();         //定义选择模式
				//定义表格
				var clzzgrid = new Ext.grid.GridPanel({
					title:'',
					frame:true,
					width:280,
					height:120,
					bodyBorder:false,
					border:false,
					stripeRows:true,
					tortable:true,
					loadMask: {msg:'正在加载数据，请稍候...'},
					sm:clzzsm,
					store:clzzStore,
					//viewConfig: {columnsText:'显示列',sortAscText:'升序',sortDescText:'降序' },
					columns:[//对应的列
					         clzzsm,//对应ID
					         {header:'班级名称',width:80,dataIdex:'clazzName'},
					         {header:'所属年级', width:80, dataIndex :'grade'},
					         {header:'状态',width:80,dataIdex:'state',sortabel:true,
				        		 renderer:function(value)
				        		 {
				        		 if(value == 0)
				        		 {
				        			 return "关闭";
				        		 }
				        		 else
				        		 {
				        			 return "正常";
				        		 }
				        		 }
				        	 }
				    ]
				});
				clzzStore.load({params:{start:0,limit:100}});
			//	alert('执行到这个地方来了');
								
				
				//课程添加
				var dataform = new Ext.form.FormPanel({     //这是一个表单   
					labelSeparator:':',
					labelWidth:70,
					bodyStyle:'padding:0 0 0 0',
					frame:true,
					height:270,
					width:300,
					items:[
					       new Ext.form.ComboBox({
					    	   width:200,
					    	   fieldLabel:'学期',
					    	   allowBlank:false,
					    	   blankText:'学期不能为空',
					    	   emptyText:'请选择学期',
					    	   id:'terminfo',
					    	   hiddenName: 'terminfo',
					    	   store:terminfo_id,//数据源
					    	   triggerAction:'all',
					    	   editable:false,
					    	   loadingtext:'正在加载...',
					    	   mode:'remote',
					    	   resizable:true,
					    	   typeAhead:true,
					    	   valueField:'id',
					    	   displayField:'text'
					       }),
					       new Ext.form.ComboBox({
					    	   width:200,
					    	   fieldLabel:'课程版本',
					    	   allowBlank:false,
					    	   blankText:'课程版本不能为空',
					    	   emptyText:'请选择课程版本',
					    	   id:'code',
					    	   hiddenName: 'code',
					    	   store:stone_code,//数据源
					    	   triggerAction:'all',
					    	   editable:false,
					    	   loadingtext:'正在加载...',
					    	   mode:'remote',
					    	   resizable:true,
					    	   typeAhead:true,
					    	   valueField:'code',
					    	   displayField:'text'
					       }),
					       //terminfo_id
					       new Ext.form.ComboBox({//下拉菜单
					    	   width:200,
					    	   fieldLabel:'辅导老师',
					    	   allowBlank:false,
					    	   blankText:'辅导老师不能为空',
					    	   emptyText:'请选择辅导老师',
					    	   id:'teacherName',
					    	   hiddenName: 'teacherName',
					    	   store:stone_teacher,//数据源
					    	   triggerAction:'all',
					    	   editable:false,
					    	   loadingtext:'正在加载...',
					    	   mode:'remote',
					    	   resizable:true,
					    	   typeAhead:true,
					    	   valueField:'id',
					    	   displayField:'text'
					       }),
					      
					       new Ext.form.ComboBox({
					    	   id:'active',
					    	   hiddenName:'active',
					    	   store:new Ext.data.SimpleStore({
					    		   fields:['active', 'name'],
					    		   data:[[true,'正常'],[false,'关闭']]
					    	   }),
					    	   triggerAction:'all',
					    	   width:200,
					    	   fieldLabel:'状态',
					    	   valueField:'active',
					    	   displayField:'name',
					    	   editable:false,
					    	   mode:'local',
					    	   forceSelection:'true',
					    	   value:true,
					    	   allowBlank:false,
					    	   blankText:'请选择状态'
					       }),
					       new Ext.form.ComboBox({//下拉菜单
					    	   width:200,
					    	   fieldLabel:'年级',
					    	   allowBlank:false,
					    	   blankText:'年级不能为空',
					    	   emptyText:'请选择年级',
					    	   id:'new_grade',
					    	   hiddenName: 'grade',
					    	   store:stone_grade,//数据源
					    	   triggerAction:'all',
					    	   editable:false,
					    	   loadingtext:'正在加载...',
					    	   mode:'remote',
					    	   resizable:true,
					    	   typeAhead:true,
					    	   valueField:'id',
					    	   displayField:'text',
					    	   listeners:{
					    	   	  'select':getClass
					    	   }
					       }),
					       clzzgrid
					   ]
				});
					       
  
					
				
				var windowpanel = new Ext.Window({
					title: '添加课程--课程分配',
					width: 350,//窗口的宽度
					height:'auto',//高度
					minHeight:200,
					layout: 'fit',
					plain:true,
					modal:true,
					draggable:true,
					resizable:false,
					closable:false,
					bodyStyle:'padding:5px;',
					buttonAlign:'center',
					items: dataform,//将上面的表单添加进来
					buttons: [{
						text: '确定',
						handler:function(){
						
						if(!dataform.form.isValid()){
							top.Ext.Msg.alert('提示','提交失败，请确定表单填写已正确。');
							return false;
						}	
						var courseId = document.getElementById("courseId").value;
						var records = clzzgrid.getSelectionModel().getSelections();
							if(records == ""){
								Ext.MessageBox.alert("提示","请选择记录后再进行添加操作!");
								return ;
							}
							var arrId = new Array();
							for(var i=0;i<records.length;i++){
								arrId.push(records[i].id);
							}

			
						dataform.form.submit({
							clientValidation:true,  //进行客户端验证
							waitMsg:'正在添加信息,请稍后...',
							waitTitle:'提示',    //&teacherId="+teacherId+"
							//url:'gradeCourseManager.do?method=addClazzCourseByGrade&clazzid=' + clazzid,//<-这里输入添加课程信息的servlet地址。   代码中return null out.print({"success":false});
							url:'gradeCourseManager.do?method=addClazzCourseByGrade&courseId='+courseId,
							params:{'CheckList':arrId},            
							method: 'post',
							success:function(form,action){		//加载成功的处理函数
							windowpanel.destroy();
							store.reload();
							//window.Ext.Msg.alert("提示","添加新课程成功！"+action.result.info);
							window.Ext.Msg.alert("提示",action.result.info);
							return false;
						},
						failure:function(form,action){
							window.Ext.Msg.alert("提示","添加新课程失败！" +action.result.info);
						}
						}
						)  ; 
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
			

			//课程修改
			new Ext.Button({
				text:'修改',
				iconCls:'editButton',
				handler:function(){  
				//课程修改
				var dataform = new Ext.form.FormPanel({     //这是一个表单   
					labelSeparator:':',
					labelWidth:70,
					bodyStyle:'padding:0 0 0 0',
					frame:true,
					height:'auto',
					width:300,
					items:[
					       new Ext.form.TextField({
					    	   id:'clazzCourseid',
					    	   hiddenName: 'clazzCourseid',
					    	   hidden: true,
					    	   width:200,
					    	   fieldLabel:'',
					    	   allowBlank:false,
					    	   blankText:''
					       }),
					       
					       new Ext.form.ComboBox({//下拉列数据从数据库中获得
					    	   width:200,
					    	   fieldLabel:'学期',
					    	   allowBlank:false,
					    	   id:'terminfo',
					    	   hiddenName: 'terminfo',
					    	   store:terminfo_id,//数据源
					    	   triggerAction:'all',
					    	   editable:false,
					    	   loadingtext:'正在加载...',
					    	   mode:'remote',
					    	   resizable:true,
					    	   typeAhead:true,
					    	   valueField:'id',
					    	   displayField:'text'
					       }),

					       
					       new Ext.form.TextField({
					    	   width:200,
							   readOnly:true,
							   fieldLabel:'起止时间',
							   id:'startAndendDate',
					    	   hiddenName: 'startAndendDate',
					    	   store:stone_startAndEndDate,//数据源
					    	   triggerAction:'all',
				    	       editable:false,
					    	   loadingtext:'正在加载...',
					    	   mode:'remote',
					    	   resizable:true,
				    	       typeAhead:true,
				    	       disabled:true,//不可编辑
					    	   valueField:'id',
				    	       displayField:'text'
		   
					       }),

					       
					       
					       
					       new Ext.form.ComboBox({//下拉列数据从数据库中获得
					    	   width:200,
					    	   fieldLabel:'课程版本',
					    	   allowBlank:false,
					    	   blankText:'请选择课程版本',
					    	   emptyText:'请选择课程版本',
					    	   id:'cnpath',
					    	   hiddenName: 'cnpath',
					    	   store:stone_code,//数据源
					    	   triggerAction:'all',
					    	   editable:false,
					    	   loadingtext:'正在加载...',
					    	   mode:'remote',
					    	   resizable:true,
					    	   typeAhead:true,
					    	   valueField:'code',
					    	   displayField:'text'
					       }),
					       //terminfo_id
					       new Ext.form.ComboBox({
					    	   width:200,
					    	   fieldLabel:'辅导老师',
					    	   allowBlank:false,
					    	   blankText:'辅导老师修改',
					    	   emptyText:'辅导老师修改',
					    	   id:'teacherName',
					    	   hiddenName: 'teacherName',
					    	   store:stone_teacher,
					    	   triggerAction:'all',
					    	   editable:false,
					    	   loadingtext:'正在加载...',
					    	   mode:'remote',
					    	   resizable:true,
					    	   typeAhead:true,
					    	   valueField:'id',
					    	   displayField:'text'
					       }),
					     
					       
					       //stateStore
					       new Ext.form.ComboBox({
					    	   id:'active',
					    	   hiddenName:'active',
					    	   store:new Ext.data.SimpleStore({
					    		   fields:['active', 'name'],
					    		   data:[[true,'正常'],[false,'关闭']]
					    	   }),
					    	   triggerAction:'all',
					    	   width:200,
					    	   fieldLabel:'状态',
					    	   valueField:'active',
					    	   displayField:'name',
					    	   editable:false,
					    	   mode:'local',
					    	   forceSelection:'true',
					    	   value:true,
					    	   allowBlank:false,
					    	   blankText:'请选择状态'
					       }
					       ),
					       new Ext.form.ComboBox({
					    	   width:200,
					    	   fieldLabel:'年级/班级',
					    	   allowBlank:false,
					    	   blankText:'年级/班级修改',
					    	   emptyText:'年级/班级修改',
					    	   id:'clazzNameBygrade',
					    	   hiddenName: 'clazzNameBygrade',
					    	   store:stone_findGradeClazz,
					    	   triggerAction:'all',
					    	   editable:false,
					    	   loadingtext:'正在加载...',
					    	   mode:'remote',
					    	   resizable:true,
					    	   typeAhead:true,
					    	   valueField:'id',
					    	   displayField:'text'
					       })
					      
					       ]
				});
				var windowpanel = new Ext.Window({
					title: '修改课程 ',
					width: 350,//窗口的宽度
					height:300,//高度
					layout: 'fit',
					plain:true,
					modal:true,
					draggable:true,
					resizable:false,
					closable:false,
					bodyStyle:'padding:5px;',
					buttonAlign:'center',
					items: dataform,//将表单添加到此窗口中
					buttons: [{
						text: '确定',
						handler:function(){
//						var studentName = document.getElementById("teacherId").value;
//							alert(getElmentById("teacherName").getValue);
						dataform.form.submit({
							clientValidation:true,
							waitMsg:'正在修改信息,请稍后...',
							waitTitle:'提示',
							url:'gradeCourseManager.do?method=updateClazzCourseInfo',
							success:function(form,action){
							windowpanel.destroy();
							store.reload();
							window.Ext.Msg.alert("提示","修改课程成功！");

						},
						failure:function(form,action){
							window.Ext.Msg.alert("提示","修改课程失败！"+action.result.info);
						}
						}
						);   
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

				//Ext.MessageBox.alert("提示","编辑操作!");
				var records = grid.getSelectionModel().getSelections();
				if(records == ""){
					Ext.MessageBox.alert("提示","请选择记录后再进行编辑操作!");
					return ;
				}
				if(records.length > 1)
				{
					Ext.MessageBox.alert("提示","一次只能对一条记录后再进行编辑操作!");
					return ;
				}
				var clazzCourseid = records[0].id;//在页面上选择的要修改的（课程）记录的ID 
				windowpanel.show();
				//load,查出当前选择的记录的值 
				dataform.form.load({  //调用表单加载的方法
					clientValidation:false,
					url:"gradeCourseManager.do?method=getClazzCourseInfoById", 
					params:{'clazzCourseid':clazzCourseid},//传参数  选择的记录的ID
					waitMsg:'正在加载信息,请稍后...',
					waitTitle:'提示',
					success:function(form,action){//数据加载成功的处理函数 
						//将当前选中要修改的数据 CourseManagerController中的printRes信息放入文本框中
						////form.findField("clazzCourseid")对应上面表单中的id，action.result.id对应的是courseManagerController中method=getClazzCourseInfoById方法中的printRes 中的"'id':'" 
						form.findField("clazzCourseid").setValue( action.result.clazzCourseid);
						form.findField("terminfo").setValue( action.result.terminfo);
						form.findField("startAndendDate").setValue( action.result.startAndendDate);
						form.findField("cnpath").setValue( action.result.cnpath);
						form.findField("teacherName").setValue( action.result.tercherName);
						form.findField("clazzNameBygrade").setValue( action.result.clazzNameBygrade);
						if(action.result.active == "true")
						{
							form.findField("active").setValue( true);
						}
						else
						{
							form.findField("active").setValue( false);
						}
						//var myBoolean=new Boolean("false");
						//alert(myBoolean);
						//alert(action.result.active + "|" + Boolean(action.result.active) + "|" + form.findField("active").getValue());
					},
					failure:function(form,action){
						window.Ext.Msg.alert("提示","数据加载失败！"+action.result.data);
						windowpanel.destroy();
					}
				}
				);
			}
			}
			),


			//删除课程 
			new Ext.Button({
				text:'删除',
				iconCls:'deleteButton',
				handler:function(){
				var records = grid.getSelectionModel().getSelections();
				if(records == ""){
					Ext.MessageBox.alert("提示","请选择记录后再进行删除操作!");
					return ;
				}
				var arrId = new Array();
				for(var i=0;i<records.length;i++){
					arrId.push(records[i].id);
				}

				Ext.Msg.show({
					title:'删除?',
					msg: '确定要删除选中记录吗,删除之后无法恢复?',
					buttons: Ext.Msg.YESNO,
					modal:true,
					fn:callback,
					icon: Ext.MessageBox.WARNING
				});

				function callback(id,msg){
					if(id=="yes"){
						Ext.Ajax.request({
							url: 'gradeCourseManager.do?method=extDeleteClazzCourseRows', //根据id删除节点
							params:{'CheckList':arrId},            
							method: 'post', 
							success: function(request) {
								store.reload();
								Ext.MessageBox.alert("提示","删除记录成功!");
								return false;
							},
							failure: function() {
								throw new Error("删除记录失败");
							}
						});
					}
				}
			}
			}),

			new Ext.Button({
				text:'启/禁',
				iconCls:'runButton',
				handler:function(){
				var records = grid.getSelectionModel().getSelections();
				if(records == ""){
					Ext.MessageBox.alert("提示","请选择记录后再进行启/禁操作!");
					return ;
				}
				var arrId = new Array();
				for(var i=0;i<records.length;i++){
					arrId.push(records[i].id);
				}
				Ext.Ajax.request({
					url: 'gradeCourseManager.do?method=extEnableDisableClazzCourseRows', //根据id删除节点
					//
					params:{'CheckList':arrId},            
					method: 'post', 
					//
					success: function(request) {
						store.reload();
						Ext.MessageBox.alert("提示","修改启禁状态成功!");
					},
					failure: function() {
						Ext.MessageBox.alert("提示","修改启禁状态失败!");
					}
				});
			}
	 }),			
	
	//按学期，按年级，按学期过滤查询		
	 new Ext.form.ComboBox({
  	   width:120,
  	   fieldLabel:'按学期过滤',
  	   allowBlank:false,
  	   blankText:'按学期查询',
  	   emptyText:'按学期查询',
  	   id:'termId',
  	   bodyStyle:'margin:0 15 0 0',
  	   hiddenName: 'termId',
  	   store:terminfo_id,
  	   triggerAction:'all',
  	   editable:false,
  	   loadingtext:'正在加载...',
  	   mode:'remote',
  	   resizable:true,
  	   typeAhead:true,
  	   valueField:'id',
  	   displayField:'text'
     }),
     
     new Ext.form.ComboBox({
    	   width:100,
    	   fieldLabel:'按年级过滤',
    	   allowBlank:false,
    	   blankText:'按年级查询',
    	   emptyText:'按年级查询',
    	   id:'gradeId',
    	   bodyStyle:'margin:0 15 0 0',
    	   hiddenName: 'gradeId',
    	   store:stone_findGrade ,
    	   triggerAction:'all',
    	   editable:false,
    	   loadingtext:'正在加载...',
    	   mode:'remote',
    	   resizable:true,
    	   typeAhead:true,
    	   valueField:'id',
    	   displayField:'text'
       }),
  	
       new Ext.form.ComboBox({
    	   width:120,
    	   listWidth:300,
    	   fieldLabel:'按学科过滤',
    	   allowBlank:false,
    	   blankText:'按学科查询',
    	   emptyText:'按学科查询',
    	   id:'cnPathId',
    	   bodyStyle:'margin:0 15 0 0',
    	   hiddenName: 'cnPathId',
    	   store:stone_code1,
    	   triggerAction:'all',
    	   editable:false,
    	   loadingtext:'正在加载...',
    	   mode:'remote',
    	   resizable:true,
    	   typeAhead:true,
    	   valueField:'code',
    	   displayField:'text'
       }),
      
		new Ext.Button({
			text:'查询',
			iconCls:'searchButton',
			handler:function(){
			search();
		}
		})
	);
	
	function search(){
		var sel1,sel2,sel3;
		sel1 = Ext.getCmp("termId").getValue();
		sel2=Ext.getCmp("gradeId").getValue();
		sel2=encodeURI(sel2);//解决了乱码。。
		sel3=Ext.getCmp("cnPathId").getValue();
		//window.Ext.Msg.alert("提示","1111！"+sel3);
		store.proxy = new Ext.data.HttpProxy({
			url:'gradeCourseManager.do?method=searchTermAndGradeAndCodeByName&year='+sel1+'&grade='+sel2+'&cnPath='+sel3   //重新设置 grid 组件的数据代理地址
	    });
	    store.load({params:{start:0,limit:25}});
	}

	
	/******************************
	 *         定义表格组件         *
	 ******************************/
	store = new Ext.data.Store({
		reader:new Ext.data.JsonReader({
			root:"items",
			totalProperty:"results",
			fields:[
			        {name:"id"},//流水Id 不须更改
			        {name:"terminfo"},
			        {name:"startAndendDate"},
			        {name:"cnPath"},
			        {name:"teacherName"},
			        {name:"active"},
			        {name:"grade"},
			        {name:"clazzName"}
			]
		}),
		proxy:new Ext.data.HttpProxy({
			url:'gradeCourseManager.do?method=showCourseInfoList' //访问路径
		})
	});
	var sm = new Ext.grid.CheckboxSelectionModel();         //定义选择模式
	var grid = new Ext.grid.GridPanel({
		title:'课程信息管理 ',
		frame:true,
		stripeRows:true,
		tortable:true,
		loadMask: {msg:'正在加载数据，请稍候...'},
		tbar:[toolbar],
		sm:sm,
		store:store,
		viewConfig: {columnsText:'显示列',sortAscText:'升序',sortDescText:'降序' },
		bbar:new Ext.PagingToolbar({
			pageSize:10,  
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
		}),
		
		
		

		columns:[//对应的列
		         sm,//对应ID
		         {header:'学期',width:120,dataIdex:'terminfo',sortabel:true},
		         {header:'起止时间', width:240, dataIndex : 'startAndendDate', sortable : true},//因为在FindCourseInfoController中将时间转成了字符串，所以这里不再作处理
                
		         {header:'课程/版本',width:220,dataIdex:'cnPath',sortabel:true},
		         {header:'辅导老师',width:100,dataIdex:'teacherName',sortabel:true},
		         {header:'状态',width:80,dataIdex:'active',sortabel:true,
		        	 renderer:function(value)
		        	 {
		        	 if(value == 0)
		        	 {
		        		 return "关闭";
		        	 }
		        	 else
		        	 {
		        		 return "正常";
		        	 }
		        	 }
		         },
		         {header:'年级',width:100,dataIdex:'grade',sortabel:true},
		         {header:'班级',width:100,dataIdex:'clazzName',sortabel:true}
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
		    	   items:[grid]
		       }
		       ]
	});
	store.load({params:{start:0,limit:25}});
});