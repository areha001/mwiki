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

	researchTypestore = new Ext.data.Store({
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
			url:'dict.do?method=showDicts&type=researchType&showHead=true' //访问路径
		})
	});
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
			        {name:"researchType"},
			        {name:"inLib"},
			        {name:"typeName"}
			        ]
		}),
		proxy:new Ext.data.HttpProxy({
			//.getElementById("clazzid").value表示获取的是managerStudent.jsp页面的<input type="text" id="clazzid" value="${clazzid}" />中的id的值			
			url:'researchLib.do?method=researchList'  //访问路径
		})
	});
	var toolbar = new Ext.Toolbar({
		width:'100%'
	});
	var uppanel = function(xid)
	{ 
		window.top.pWindow = new window.top.Ext.Window({
			title: "入库",
			width: 740,
			height:530,
			layout: 'fit',
			plain:true,
			modal:true,
			draggable:true,
			resizable:false,
			closable:false,
			bodyStyle:'padding:5px;',
			buttonAlign:'center',
			html:'<iframe src="topicLib.do?method=manageForm&researchId=' + xid + '" width="720" height="490"></iframe>',
			myAfterSubmit:function(){
				window.top.pWindow.destroy();
				store.reload();
			},
			buttons: [{
				text: '确定',
				handler:function(){
					window.top.submitWindow();
				}
			},
			{
				text: '取消',
				handler:function(){
					window.top.pWindow.destroy();
				}
			}]
		});
		window.top.pWindow.show();
		return window.top.pWindow;
	}
	toolbar.add(
	
			new Ext.Button({
				text:'入库',
				id:'addResearchLib',
				iconCls:'addButton',
				disabled:true,
			    handler:function(){
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
					var id = records[0].data.id;//在页面上选择的要修改的学生记录的ID,即request.get...("studentid") [0]表示第一条，即选中的该条记录
				    uppanel(id);
				    }
			
			}),
			"-",
		new Ext.form.ComboBox({
	       		id:'sResearchTypeId',
	    	   name:'rtid',
	    	   width:120,
	    	   fieldLabel:'所属分类',
	    	   allowBlank:true,
	    	   mode:'local',
	    	   emptyText:'所属分类',
	    	   hiddenName:'subject',
	    	   store:researchTypestore,
	    	   triggerAction:'all', displayField:'name', valueField:'id', editable: false
	       }),'&nbsp;',
	       new Ext.Button({
				text:'搜索',
				iconCls:'findButton',
			    handler:function(){
			    	var researchTypeId = Ext.getCmp('sResearchTypeId').getValue();
					store.baseParams = {'researchTypeId':researchTypeId}
					store.reload({params:{start:0,limit:25}});
			    }
			
			})
	)

	var sm = new Ext.grid.CheckboxSelectionModel();  
	var grid = new Ext.grid.GridPanel({
		title: "学生自定义课题"  ,
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
		columns:[//对应的列
				sm,
		         {header:'课题名',width:200,dataIndex:'name',sortable:true,
		         	renderer : function(value, metadata,record){  
			            var id = record.data.id;
			            var showPro = "<a target='_blank' href='../research.do?method=infos&researchId=" + id + "'>" + 
			            record.data.name + '</a>';
			            if(record.data.inLib)
			            	showPro = "<span style='color:red;'>（已入库）</span>" + showPro;
			            return showPro;
		            }},
		         {header:'申报时间',width:90,dataIndex:'createTime',sortable:true},
		         {header:'结题时间',width:90,dataIndex:'endTime',sortable:true},
		         {header:'发起人',width:100,dataIndex:'creatorName',sortable:true},
		         {header:'指导老师',width:100,dataIndex:'teacherName',sortable:true},
		         {header:'所属分类',width:100,dataIndex:'typeName',sortable:true}
		        ],
		listeners:
		{
			"rowclick": function(grid, rowIndex, e)
			{
				var btn = Ext.getCmp('addResearchLib'); 
				if(sm.getCount() == 1)
					btn.enable();
				else
					btn.disable();
			}
		}
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