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
	DefaultLimitSize = 20;
	/******************************
	 *         定义表格组件         *
	 ******************************/

	store = new Ext.data.Store({
		reader:new Ext.data.JsonReader({
			root:"items",
			totalProperty:"results",
			fields:[
			        {name:"id"},
			        {name:"clazzName"},//流水id 不须更改
			        {name:"eduName"},
			        {name:"gradeName"},
			        {name:"countInfo"},
			        {name:"studyYearName"}
			        ]
		}),
		proxy:new Ext.data.HttpProxy({
			//.getElementById("clazzid").value表示获取的是managerStudent.jsp页面的<input type="text" id="clazzid" value="${clazzid}" />中的id的值			
			url:'analyze.do?method=analyzeClazz'  //访问路径
		})
	});
	
	studyYearWithBlank = new Ext.data.Store({
			autoLoad:true,
			proxy : new Ext.data.HttpProxy({url:'studyYear.do?method=studyYearList'}),
			reader:new Ext.data.JsonReader({root:"items",totalProperty:"results",
					fields:[{name:"id"}, {name:"name"}]})
		});
	var toolbar = new Ext.Toolbar({
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
	toolbar.add(
			new Ext.form.ComboBox({
		   		id:'sStudyYear',
		   		width:115,
		   		fieldLabel:'所属班级',
		   		hiddenName:'clazzid',
		   		name:'studyYear',
		   		triggerAction:'all', 
	    	    mode:'local',
		   		store:studyYearWithBlank,      //数据源
				valueField:'id',
		   		displayField:'name',     //显示字段
		   		handleHeight:10,
		   		emptyText:'请选择学年'
	       }),
			new Ext.form.ComboBox({
	       		id:'sedutype',
	    	   name:'edutype',
	    	   width:115,
	    	   fieldLabel:'所属学段',
	    	   allowBlank:true,
	    	   mode:'local',
	    	   emptyText:'请选择学段',
	    	   hiddenName:'edutype',
	    	   store:new Ext.data.SimpleStore({
	    		   fields:['value','text'],
	    		   data:[[1,'小学'],[2,'初中'],[3,'高中']]
	    	   }), triggerAction:'all', displayField:'text', valueField:'value', editable: false,
	    	   listeners:{select:function(combo,record,index){classData.clearData();classData.loadData(classes[index]);
	    	   Ext.getCmp('sgrade').reset();
	    	   }}
	       }),

	       new Ext.form.ComboBox({
	       		id:'sgrade',
	    	   name:'grade',
	    	   mode:'local',
	    	   width:115,
	    	   fieldLabel:'所属年级',
	    	   allowBlank:true,
	    	   emptyText:'请选择年级',
	    	   hiddenName:'grade',
	    	   store:classData, triggerAction:'all', displayField:'text', valueField:'value', editable: false
	       }),
			'-',
			new Ext.Button({
				text:'搜索',
				iconCls:'findButton',
			    handler:function(){
			    	var studyYearId = Ext.getCmp('sStudyYear').getValue();
			    	var grade = Ext.getCmp('sgrade').getValue();
			    	var edutype = Ext.getCmp('sedutype').getValue();
			    	store.proxy = new Ext.data.HttpProxy({
						url:'analyze.do?method=analyzeClazz&grade=' + grade +'&edutype=' +  edutype +
							'&studyYearId=' + studyYearId//访问路径
					});
					store.reload({params:{start:0,limit:25}});
			    }
			
			})
		)

	var grid = new Ext.grid.GridPanel({
		title: '按班级年级统计',
		frame:true,
		stripeRows:true,
		loadMask: {msg:'正在加载数据，请稍候...'},
		store:store,
		tbar:[toolbar],
		viewConfig: {columnsText:'显示列',sortAscText:'升序',sortDescText:'降序' },
		bbar:new Ext.PagingToolbar({
			pageSize:DefaultLimitSize,  
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
		         {header:'班级名',width:200,dataIndex:'clazzName',sortable:true, 
		         renderer:function(value, metadata,record){
		         	var str = '<a href="research.do?method=researches&lite=true&clazz=' +
		         	 record.data.id + '">' + record.data.clazzName + '</a>';
		         	 return str;
		         }},
		         {header:'数量',width:100,dataIndex:'countInfo',sortable:true},
		         {header:'学段',width:100,dataIndex:'eduName',sortable:true},
		         {header:'年级',width:100,dataIndex:'gradeName',sortable:true},
		         {header:'学年',width:150,dataIndex:'studyYearName',sortable:true}
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
	store.load({params:{start:0,limit:DefaultLimitSize}});
}
);