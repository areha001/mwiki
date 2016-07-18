/**
 * @author Administrator
 */
Ext.form.DateField.prototype.onTriggerClickOld = Ext.form.DateField.prototype.onTriggerClick
Ext.form.DateField.prototype.onTriggerClick=function(){
	this.onTriggerClickOld();
    if (!this.menu.picker.resetBtn) {
        this.menu.picker.resetBtn = new Ext.Button({renderTo: this.menu.picker.el.child("td.x-date-bottom-reset", true), text: "清空", tooltip: "清空", handler: function () {this.reset();this.menu.hide();}, scope: this});
    }
}

Ext.DatePicker.prototype.onRender = function(e,b){
var a=['<table cellspacing="0">','<tr><td class="x-date-left"><a href="#" title="',this.prevText,'">&#160;</a></td><td class="x-date-middle" align="center"></td><td class="x-date-right"><a href="#" title="',this.nextText,'">&#160;</a></td></tr>','<tr><td colspan="3"><table class="x-date-inner" cellspacing="0"><thead><tr>'],c=this.dayNames,h;for(h=0;h<7;h++){var l=this.startDay+h;if(l>6){l=l-7}a.push("<th><span>",c[l].substr(0,1),"</span></th>")}a[a.length]="</tr></thead><tbody><tr>";for(h=0;h<42;h++){if(h%7===0&&h!==0){a[a.length]="</tr><tr>"}a[a.length]='<td><a href="#" hidefocus="on" class="x-date-date" tabIndex="1"><em><span></span></em></a></td>'}a.push("</tr></tbody></table></td></tr>",this.showToday?'<tr><td class="x-date-bottom" colspan="3"><table width="100%"><tr><td>&nbsp;</td><td class="x-date-bottom-today" align="center"></td><td class="x-date-bottom-reset" align="center"></td><td>&nbsp;</td></tr></table></td></tr>':"",'</table><div class="x-date-mp"></div>');var k=document.createElement("div");k.className="x-date-picker";k.innerHTML=a.join("");e.dom.insertBefore(k,b);this.el=Ext.get(k);this.eventEl=Ext.get(k.firstChild);this.prevRepeater=new Ext.util.ClickRepeater(this.el.child("td.x-date-left a"),{handler:this.showPrevMonth,scope:this,preventDefault:true,stopDefault:true});this.nextRepeater=new Ext.util.ClickRepeater(this.el.child("td.x-date-right a"),{handler:this.showNextMonth,scope:this,preventDefault:true,stopDefault:true});this.monthPicker=this.el.down("div.x-date-mp");this.monthPicker.enableDisplayMode("block");this.keyNav=new Ext.KeyNav(this.eventEl,{left:function(d){if(d.ctrlKey){this.showPrevMonth()}else{this.update(this.activeDate.add("d",-1))}},right:function(d){if(d.ctrlKey){this.showNextMonth()}else{this.update(this.activeDate.add("d",1))}},up:function(d){if(d.ctrlKey){this.showNextYear()}else{this.update(this.activeDate.add("d",-7))}},down:function(d){if(d.ctrlKey){this.showPrevYear()}else{this.update(this.activeDate.add("d",7))}},pageUp:function(d){this.showNextMonth()},pageDown:function(d){this.showPrevMonth()},enter:function(d){d.stopPropagation();return true},scope:this});this.el.unselectable();this.cells=this.el.select("table.x-date-inner tbody td");this.textNodes=this.el.query("table.x-date-inner tbody span");this.mbtn=new Ext.Button({text:"&#160;",tooltip:this.monthYearText,renderTo:this.el.child("td.x-date-middle",true)});this.mbtn.el.child("em").addClass("x-btn-arrow");if(this.showToday){this.todayKeyListener=this.eventEl.addKeyListener(Ext.EventObject.SPACE,this.selectToday,this);var g=(new Date()).dateFormat(this.format);this.todayBtn=new Ext.Button({renderTo:this.el.child("td.x-date-bottom-today",true),text:String.format(this.todayText,g),tooltip:String.format(this.todayTip,g),handler:this.selectToday,scope:this})}this.mon(this.eventEl,"mousewheel",this.handleMouseWheel,this);this.mon(this.eventEl,"click",this.handleDateClick,this,{delegate:"a.x-date-date"});this.mon(this.mbtn,"click",this.showMonthPicker,this);this.onEnable(true)}


Ext.onReady(function(){

	Ext.BLANK_IMAGE_URL = "../js/ext-3.3.1/resources/images/default/s.gif";
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget = "qtip";

	Ext.Msg.buttonText.yes = "确定";
	Ext.Msg.buttonText.ok = "确定";
	Ext.Msg.buttonText.cancel = "取消";
	Ext.Msg.buttonText.no = "取消";

	/******************************
	 *         定义表格组件         *
	 ******************************/

	store = new Ext.data.Store({
		reader:new Ext.data.JsonReader({
			root:"items",
			totalProperty:"results",
			fields:[
			        {name:"id"},//流水id 不须更改
			        {name:"name"},
			        {name:"statusString"},
			        {name:"createTime"},
			        {name:"endTime"},
			        {name:"creatorName"},
			        {name:"teacherName"},
			        {name:"good"},
			        {name:"topicLibName"}
			        ]
		}),
		proxy:new Ext.data.HttpProxy({
			//.getElementById("clazzid").value表示获取的是managerStudent.jsp页面的<input type="text" id="clazzid" value="${clazzid}" />中的id的值			
			url:'research.do?method=researchList'  //访问路径
		})
	});
	//**subjectstore*//
		subjectstore = new Ext.data.Store({
		autoLoad:true,
		reader:new Ext.data.JsonReader({
			root:"items",
			totalProperty:"results",
			fields:[
			        {name:"id"},//流水id 不须更改
			        {name:"name"}
			        ]
		}),
		proxy:new Ext.data.HttpProxy({
			//.getElementById("clazzid").value表示获取的是managerStudent.jsp页面的<input type="text" id="clazzid" value="${clazzid}" />中的id的值			
			url:'dict.do?method=showDicts&type=subject&showHead=true' //访问路径
		})
	});
	//**gradestore*//
		gradestore = new Ext.data.Store({
		autoLoad:true,
		reader:new Ext.data.JsonReader({
			root:"items",
			totalProperty:"results",
			fields:[
			        {name:"id"},//流水id 不须更改
			        {name:"name"}
			        ]
		}),
		proxy:new Ext.data.HttpProxy({
			//.getElementById("clazzid").value表示获取的是managerStudent.jsp页面的<input type="text" id="clazzid" value="${clazzid}" />中的id的值			
			url:'reacherManager.do?method=showDicts&type=grade&showHead=true'  //访问路径
		})
	});
	
	var toolbar = new Ext.Toolbar({
		width:'100%'
	});
	var toolbar2 = new Ext.Toolbar({
		width:'100%'
	});
	var classes = [];
		classes[0] = [[1,'1年级'],[2,'2年级'],[3,'3年级'],[4,'4年级'],[5,'5年级'],[6,'6年级']];
		classes[1] = [[7,'1年级'],[8,'2年级'],[9,'3年级']];
		classes[2] = [[10,'1年级'],[11,'2年级'],[12,'3年级']];

	var classData = new Ext.data.SimpleStore({
	   fields:['value','text'],
	   data:[]
    });
    var setgood = function(good)
    {
		var ids = [];
		var elements = sm.getSelections();
		for(var i=0; i<elements.length; i++)
			ids.push(elements[i].data.id)
		Ext.Ajax.request({
		url: 'research.do?method=setGood', //根据id删除节点
		params:{'ids':ids,"good":good},            
		method: 'post', 
			success: function(request) {
				store.reload();
				Ext.MessageBox.alert("提示","修改推荐状态成功!");
			},
			failure: function() {
				Ext.MessageBox.alert("提示","修改推荐状态失败!");
			}
			}
		);
    }
	toolbar.add(
			new Ext.Button({
				id:'setgood',
				text:'推荐',
				iconCls:'editButton',
				handler:function(){setgood(1)},
				disabled:true
				}),
				
			new Ext.Button({
				id:'setgoodno',
				text:'不推荐',
				iconCls:'runButton',
				handler:function(){setgood(0)},
				disabled:true
				}),
				new Ext.Button({
				id:'setLost',
				text:'流失',
				disabled:true,
				iconCls:'deleteButton',
				handler:function(){
					var ids = [];
					var elements = sm.getSelections();
					for(var i=0; i<elements.length; i++)
						ids.push(elements[i].data.id)
					Ext.MessageBox.confirm('确认流失', '你真的要流失这些课题吗?', function(btn) { 
					if(btn == 'yes'){
						Ext.Ajax.request({
						url: 'research.do?method=setLost', //根据id删除节点
						params:{'ids':ids},            
						method: 'post', 
							success: function(request) {
								store.reload();
								Ext.MessageBox.alert("提示","操作成功!");
							},
							failure: function() {
								Ext.MessageBox.alert("提示","操作失败!");
							}
							})
						}
					})
				}}),
	       '-',
	       new Ext.form.ComboBox({
	       		id:'sgood',
	    	   name:'good',
	    	   width:85,
	    	   fieldLabel:'状态',
	    	   allowBlank:true,
	    	   mode:'local',
	    	   emptyText:'推荐状态',
	    	   hiddenName:'edutype',
	    	   store:new Ext.data.SimpleStore({
	    		   fields:['value','text'],
	    		   data:[['','--不限--'],[1,'已推荐'],[2,'未推荐']]
	    	   }), triggerAction:'all', displayField:'text', valueField:'value', editable: false
	       }),
	       '&nbsp;',
			
			new Ext.form.ComboBox({
	       		id:'ssubject',
	    	   name:'subject',
	    	   width:100,
	    	   fieldLabel:'学科领域',
	    	   allowBlank:true,
	    	   mode:'local',
	    	   emptyText:'学科领域',
	    	   hiddenName:'subject',
	    	   store:subjectstore,
	    	   triggerAction:'all', displayField:'name', valueField:'id', editable: false
	       }),
	       '&nbsp;',
			new Ext.form.ComboBox({
	       		id:'sgrade',
	    	   name:'grade',
	    	   width:100,
	    	   fieldLabel:'适用年级',
	    	   allowBlank:true,
	    	   mode:'local',
	    	   emptyText:'适用年级',
	    	   hiddenName:'forgrade',
	    	   store:gradestore,
	    	   triggerAction:'all', displayField:'name', valueField:'id', editable: false
	       }))
	   toolbar2.add(
	   	"&nbsp;",
	       	new Ext.form.ComboBox({
	       		id:'sstatus',
	    	   name:'status',
	    	   width:85,
	    	   fieldLabel:'状态',
	    	   allowBlank:true,
	    	   mode:'local',
	    	   emptyText:'当前进度',
	    	   hiddenName:'edutype',
	    	   store:new Ext.data.SimpleStore({
	    		   fields:['value','text'],
	    		   data:[['','--不限--'],[1,'申报中'],[2,'进行中'],[3,'已结题']]
	    	   }), triggerAction:'all', displayField:'text', valueField:'value', editable: false
	       }),
	       '&nbsp;',
			new Ext.form.DateField({
	    	   id:'dateAfter',emptyText:'最早申报时间',format :'Y-m-d', editable: false
	   	   	}),
	    	   '&nbsp;至&nbsp;',
			new Ext.form.DateField({
	    	   id:'dateBefore',emptyText:'最晚申报时间',format :'Y-m-d', editable: false
	    	   }),
	    	   
			'-',
	       new Ext.form.TextField({
	       		id:'sname',
	    	   name:'name',
	    	   width:150,
	    	   fieldLabel:'活动名',
	    	   allowBlank:true,
	    	   emptyText:'请填写活动名',
	        	hidden: false
	       }),
			'-',
			new Ext.Button({
				text:'搜索',
				iconCls:'findButton',
			    handler:function(){
			    	var good = Ext.getCmp('sgood').getValue();
			    	var status = Ext.getCmp('sstatus').getValue();
			    	var name = Ext.getCmp('sname').getValue();
			    	var dateAfter = document.getElementById('dateAfter').value;
			    	var dateBefore = document.getElementById('dateBefore').value;
			    	
			    	if(dateAfter.length != 10)
			    		dateAfter = "";
			    	if(dateBefore.length != 10)
			    		dateBefore = "";
			    		
			    	var subject = Ext.getCmp('ssubject').getValue();
			    	var grade = Ext.getCmp('sgrade').getValue();
			    	store.proxy = new Ext.data.HttpProxy({
						url:'research.do?method=researchList'//访问路径
					});
					store.baseParams = {'name':name, 'status':status,'subject':subject,'grade':grade,
						 'good':good, 'dateBefore':dateBefore, 'dateAfter':dateAfter}
					store.reload({params:{start:0,limit:25}});
			    }
			
			})
		)

	var sm = new Ext.grid.CheckboxSelectionModel();  
	var grid = new Ext.grid.GridPanel({
		title: '研究课题管理',
		frame:true,
		sm:sm,
		stripeRows:true,
		loadMask: {msg:'正在加载数据，请稍候...'},
		store:store,
		tbar:[toolbar],
		viewConfig: {columnsText:'显示列',sortAscText:'升序',sortDescText:'降序' },
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
		}),
		listeners:
		{
			"render":function(){
				toolbar2.render(this.tbar);
			},
			"rowclick": function(grid, rowIndex, e)
			{
				var data = grid.store.getAt(rowIndex).data;
				window.selected_id = data.id;
				if(sm.getCount()>0)
				{
					Ext.getCmp('setLost').enable();
					Ext.getCmp('setgoodno').enable();
					Ext.getCmp('setgood').enable();
				}
				else
				{
					Ext.getCmp('setLost').disable();
					Ext.getCmp('setgoodno').disable();
					Ext.getCmp('setgood').disable();
				}
			}
		},
		columns:[//对应的列
				sm,
		         {header:'课题名',width:200,dataIndex:'name',sortable:true,
		         	renderer : function(value, metadata,record){  
			            var id = record.data.id;
			            var showPro = "<a target='_blank' href='../research.do?method=infos&researchId=" + id + "'>" + 
			            record.data.name + '</a>';
			            if(record.data.good!=0)
			            	showPro = "<span style='color:red;'>（荐）</span>" + showPro;
			            return showPro;
		            }},
		         {header:'成员',width:150,dataIndex:'creatorName',sortable:true},
		         {header:'指导老师',width:100,dataIndex:'teacherName',sortable:true},
		         {header:'所属指南课题',width:100,dataIndex:'topicLibName',sortable:true},
		         {header:'当前详细状态',width:100,dataIndex:'statusString',sortable:true},
		         {header:'申报时间',width:90,dataIndex:'createTime',sortable:true},
		         {header:'结题时间',width:90,dataIndex:'endTime',sortable:true}
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
	}
	);
	store.load({params:{start:0,limit:25}});
}
);