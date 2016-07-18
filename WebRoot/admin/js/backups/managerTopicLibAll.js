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
    var getMySelect = function(){
		var records = grid.getSelectionModel().getSelections();
		if(records == ""){
			Ext.MessageBox.alert("提示","请选择记录后再进行操作!");
			return ;
		}
		var arrId = new Array();
		for(var i=0;i<records.length;i++){
			arrId.push(records[i].id);
		}
		return arrId;
	}
	studyYearData = new Ext.data.Store({
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
				url:'studyYear.do?method=studyYearList'  //访问路径
			}),
			listeners:{load:function(){ 
					var sycombox = Ext.getCmp("sStudyYear");
					if(sycombox)
					sycombox.setValue(STUDY_YEAR_ID);
				}}
		});

	/******************************
	 *         定义表格组件         *
	 ******************************/

	var tabjson = function(id)
	{
		return [{
			id:"v1",
	        title: "指南文档管理",
			layout:"fit",
	        html:'<iframe id="main" name="main" width="100%" height="100%" frameborder="0" src="topicLib.do?method=topicLibDoc&studyYearId=' + id + '"></iframe>'
	    	},
	    	{
			id:"v2",
	        title: "指南课题管理",
			layout:"fit",
	        html:'<iframe id="main" name="main" width="100%" height="100%" frameborder="0" src="topicLib.do?method=show&studyYearId=' + id + '"></iframe>'
	    	},
		    {
			id:"v3",
	        title: "申报选题管理",
			layout:"fit",
	        html:'<iframe id="main" name="main" width="100%" height="100%" frameborder="0" src="researchLib.do?method=show&studyYearId=' + id + '"></iframe>'
	    	}]
	}
	window.tabs = new Ext.TabPanel({
	    renderTo: Ext.getBody(),
	    activeTab: 1,
	    items: tabjson(STUDY_YEAR_ID)
	});
	var pn = new Ext.Panel(
	{
		items:[
			new Ext.form.ComboBox({
				id:'sStudyYear',
	    	   name:'studyYearId',
	    	   mode:'local',
	    	   width:150,
	    	   fieldLabel:'所属学年',
	    	   allowBlank:false,
	    	   emptyText:'请选择学年',
	    	   hiddenName:'studyYear',
	    	   store:studyYearData, triggerAction:'all', displayField:'name', valueField:'id', 
	    	   editable: false,
	    	   listeners:{
	    	   	"select": function(){
	    	   		var csid = tabs.activeTab.id;
	    	   		tabs.removeAll();
	    	   		tabs.add(tabjson(this.value))
	    	   		tabs.setActiveTab(csid);
	    	   	}
	    	   }
	    	   
	       })
		],
		x:300,
		y:2
	}
	)
	new Ext.Viewport({
		layout: 'border',
		items:[
		       {    //剧中的容器
		    	   title:"",
		    	   region:"center",
		    	   border:false,
		    	   layout:"fit",
		    	   bodyBorder:false,
		    	   items:[tabs]
		       }, pn
		       ]
	}
	);
}
);