/** ext extends*/
	Ext.override(Ext.grid.CheckboxSelectionModel, {   
	    handleMouseDown : function(g, rowIndex, e){     
	      if(e.button !== 0 || this.isLocked()){     
	        return;     
	      }     
	      var view = this.grid.getView();     
	      if(e.shiftKey && !this.singleSelect && this.last !== false){     
	        var last = this.last;     
	        this.selectRange(last, rowIndex, e.ctrlKey);     
	        this.last = last; // reset the last     
	        view.focusRow(rowIndex);     
	      }else{     
	        var isSelected = this.isSelected(rowIndex);     
	        if(isSelected){     
	          this.deselectRow(rowIndex);     
	        }else if(!isSelected || this.getCount() > 1){     
	          this.selectRow(rowIndex, true);     
	          view.focusRow(rowIndex);     
	        }     
	      }     
	    }   
	});  
	Ext.form.MultiSelect = Ext.extend(Ext.form.ComboBox, {  
	    // 使用积极的初始化模式  
	    lazyInit : false,  
	    headerText : "EMPTY",  
	    resetText : "EMPTY",  
	    sureText : "EMPTY",  
	    textValue : "",  
	    maxHeight : 310,  
	    beforeSelect : null,  
	    /** 
	     * 初始化下拉列表 原来的下拉列表使用DataView类来实现,现在改为使用GridPanel来实现,这样更方便于多选操作 
	     */  
	    initList : function()  
	    {  
	        if (!this.list)  
	        {  
	            var cls = 'x-combo-list';  
	            this.list = new Ext.Layer( {  
	                shadow : this.shadow,  
	                cls : [ cls, this.listClass ].join(' '),  
	                constrain : false  
	            });  
	  
	            var lw = this.listWidth  
	                    || Math.max(this.wrap.getWidth(), this.minListWidth);  
	            this.list.setWidth(lw);  
	            this.assetHeight = 0;  
	  
	            if (this.title)  
	            {  
	                this.header = this.list.createChild( {  
	                    cls : cls + '-hd',  
	                    html : this.title  
	                });  
	                this.assetHeight += this.header.getHeight();  
	            }  
	  
	            this.innerList = this.list.createChild( {  
	                cls : cls + '-inner'  
	            });  
	            this.innerList.setWidth(lw - this.list.getFrameWidth('lr'));  
	  
	            var sm = new Ext.grid.CheckboxSelectionModel({singleSelect:false});  
	            var all = this;  
	            var ht = this.headerText == "EMPTY" ? "选择项目" : this.headerText;  
	            var rt = this.resetText == "EMPTY" ? "全(不)选" : this.resetText;  
	            var st = this.sureText == "EMPTY" ? "确定" : this.sureText;  
	            this.view = new Ext.grid.GridPanel( {  
	                store : this.store,  
	                hideHeaders : true,  
	                applyTo : this.innerList,  
	                columns : [ sm, {  
	                    header : ht,  
	                    sortable : false,  
	                    dataIndex : this.displayField  
	                } ],  
	                height:500,
	                viewConfig : {  
	                    forceFit : true  
	                },  
	                autoScroll : true,  
	                width : this.list.getWidth(),  
	                sm : sm,  
	                //tbar : new Ext.PagingToolbar({ pageSize: this.pageSize, store:this.store}),  
	                bbar : [ {  
	                    xtype : "button",  
	                    text : rt,  
	                    handler : function()  
	                    {  
	                        all.onReset();  
	                    }  
	                }, "-", {  
	                    xtype : "button",  
	                    text : st,  
	                    handler : function()  
	                    {  
	                        all.onSure();  
	                    }  
	                } ],  
	                iconCls : 'icon-grid'  
	            });  
	  
	            // 设置下拉列表的高度,如果超过了最大高度则使用最大高度  
	            if (this.view.getSize().height > this.maxHeight)  
	            {  
	                this.view.setHeight(this.maxHeight);  
	            }  
	  
	            // 如果设置了默认值,则在下拉列表中回显  
	            if (this.value)  
	            {  
	            	this.setValue(this.value);
	            }  
	  
	            if (this.pageSize)  
	            {  
	                /* 
	                 * var pageBar = new Ext.PagingToolbar({ pageSize: 15, store: 
	                 * this.view.getStore(), displayInfo: true }); 
	                 * this.view.add(pageBar); this.view.doLayout(); 
	                 */  
	            }  
	  
	            if (this.resizable)  
	            {  
	                this.resizer = new Ext.Resizable(this.list, {  
	                    pinned : true,  
	                    handles : 'se'  
	                });  
	                this.resizer.on('resize', function(r, w, h)  
	                {  
	                    this.maxHeight = h - this.handleHeight  
	                            - this.list.getFrameWidth('tb') - this.assetHeight;  
	                    this.listWidth = w;  
	                    this.innerList.setWidth(w - this.list.getFrameWidth('lr'));  
	                    this.restrictHeight();  
	                }, this);  
	                this[this.pageSize ? 'footer' : 'innerList'].setStyle(  
	                        'margin-bottom', this.handleHeight + 'px');  
	            }  
	        }  
	    },  
	    /** 
	     * 确定选择事件 
	     */  
	    onSure : function()  
	    {  
	        var selecteds = this.view.getSelectionModel().getSelections();  
	        var value = [];  
	        var all = this;  
	        var tv = [];  
	        Ext.each(selecteds, function(rc)  
	        {  
	            value.push(rc.data[all.valueField]);  
	            tv.push(rc.data[all.displayField]);  
	        });  
	        var valueStr = value.join();  
	        beforeSelect = this.beforeSelect;  
	        if(typeof beforeSelect == 'function')  
	        {  
	            if(!beforeSelect(valueStr))  
	            {  
	                this.collapse();  
	                return;  
	            }  
	        }  
	        this.textValue = tv.join(); 
	        this.setValue(valueStr);  
	        this.value = value.join();  
	        this.collapse();   
	        if(this.afterSure){
	        	this.afterSure(value);
	        }
	    },  
	      
	    getTextValue : function(){  
	        return this.textValue;  
	    },  
	    /** 
	     * 重置事件 
	     */  
	    onReset : function()  
	    {  
	    	var total = this.view.store.data.length;
	    	var count = this.view.getSelectionModel().getCount();
	    	if(count==total){
	        	this.view.getSelectionModel().clearSelections();  
	    	}
	    	else{
		        this.view.getSelectionModel().selectAll(); 
	    	}
	    },  
	    /** 
	     * 给ComboBox设置值  
	     * 设置完全局的值后,再在下拉列表中回显这些值 
	     */  
	    setValue : function(v)  
	    {  
	        var text = v;  
	        var ta = [];  
	        window.top.ff = v;
	        // 根据值查找出名称,并组装显示  
	        if (this.valueField && v!=null)  
	        {  
	            var sv = ("" + v).split(",");  
	            for ( var i = 0; i < sv.length; i++)  
	            {  
	                var r = this.findRecord(this.valueField, sv[i]);  
	                if (r)  
	                {  
	                    ta.push(r.data[this.displayField]);  
	                }  
	                else if (this.valueNotFoundText !== undefined)  
	                {  
	                    ta.push(this.valueNotFoundText);  
	                }  
	            }  
	            text = ta.join();  
	        }  
	        this.lastSelectionText = ta.join();  
	        if (this.hiddenField)  
	        {  
	            this.hiddenField.value = v;  
	        }  
	        this.textValue = text;  
	        Ext.form.ComboBox.superclass.setValue.call(this, text);  
	        this.value = v;  
	        // 在下拉列表中回显设置的值  
	        if (this.view &&  v!=null )  
	        {  
	            var sv = ("" + v).split(",");  
	            var mv = this.view;  
	            var sr = [];  
	            var all = this;  
	            this.store.each(function(item)  
	            {  
	                for ( var i = 0; i < sv.length; i++)  
	                {  
	                    if (sv[i] == item.data[all.valueField])  
	                    {  
	                        sr.push(item);  
	                        break;  
	                    }  
	                }  
	            });  
	            this.view.getSelectionModel().selectRecords(sr);  
	        }  
	    },  
	    /** 
	     * 触发下拉列表展现 这里不使用ComboBox的查询功能,直接展现 
	     */  
	    onTriggerClick : function()  
	    {  
	        if (this.disabled)  
	        {  
	            return;  
	        }  
	        this.setValue(this.value);
	        if (this.isExpanded())  
	        {  
	            this.collapse();  
	        }  
	        else  
	        {  
	            this.onFocus( {});  
	            this.expand();  
	            this.el.focus();  
	        }  
	    }  
	});  
	/**
	 * Plugin for the Ext.Panel class to support a collapsed header title
	 * Also implements vertical rotation for east and west border panels
	 *
	 * @author  Joeri Sebrechts <joeri at sebrechts.net>
	 * @version 1.1
	 * @date    January 11th, 2010
	 * @license http://www.gnu.org/licenses/lgpl-3.0.txt
	 */
	Ext.ns('Ext.ux');
	Ext.ux.PanelCollapsedTitle = (function() {
	  var rotatedCls = 'x-panel-header-rotated';
	  var supportsSVG = 
	    !!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1");
	  var patchCollapsedElem = function() {
	    var verticalText = ((this.region == 'east') || (this.region == 'west'));    
	    var containerStyle = 'overflow: visible; padding: 0; border: none; background: none;';
	    // For vertical text, and for browsers that support SVG
	    // (Firefox, Chrome, Safari 3+, Opera 8+)
	    if (verticalText && supportsSVG) {
	      this.collapsedHeader = this.ownerCt.layout[this.region].getCollapsedEl().createChild({
	        tag: 'div',
	        style: 'height: 100%; overflow: hidden;'
	      });
	      // embed svg code inside this container div
	      var SVGNS = 'http://www.w3.org/2000/svg';
	      var svg = document.createElementNS(SVGNS, 'svg');
	      this.collapsedHeader.dom.appendChild(svg);
	      svg.setAttribute('width', '100%');
	      svg.setAttribute('height', '100%');
	      var textContainer = document.createElementNS(SVGNS, 'text');
	      textContainer.setAttribute('x', 6);
	      textContainer.setAttribute('y', 1);
	      textContainer.setAttribute('transform', 'rotate(90 6 1)');
	      textContainer.setAttribute('class', 'x-panel-header ' + rotatedCls);
	      svg.appendChild(textContainer);
	      this.collapsedHeaderText = document.createTextNode(this.title);
	      textContainer.appendChild(this.collapsedHeaderText);
	      // set the style to override the unwanted aspects of the x-panel-header class
	      // also copy the x-panel-header "color" to "fill", to color the SVG text node
	      var color = Ext.fly(textContainer).getStyle('color');
	      textContainer.setAttribute('style', containerStyle + ';fill: ' + color + ';');            
	    // For horizontal text or IE
	    } else {
	      var titleElemStyle = 'position: relative;';
	      if (verticalText) {
	        // use writing-mode for vertical text
	        titleElemStyle += 
	          'white-space: nowrap; writing-mode: tb-rl; top: 1px; left: 3px;';
	      } else {
	        titleElemStyle += 'top: 2px;';
	        // margin-right to ensure no overlap with uncollapse button
	        containerStyle += 'padding-left: 4px; margin-right: 18px;';
	      };
	      this.collapsedHeader = this.ownerCt.layout[this.region].getCollapsedEl().createChild({
	        tag: 'div',
	        // overrides x-panel-header to remove unwanted aspects
	        style: containerStyle,
	        cls: 'x-panel-header ' + rotatedCls,
	        html: '<span style="'+ titleElemStyle + '">'+this.title+'</span>'
	      });
	      this.collapsedHeaderText = this.collapsedHeader.first();
	    };
	    if (this.collapsedIconCls) this.setCollapsedIconClass(this.collapsedIconCls);
	  };
	  this.init = function(p) {
	    if (p.collapsible) {
	      var verticalText = ((p.region == 'east') || (p.region == 'west'));
	      // update the collapsed header title also
	      p.setTitle = Ext.Panel.prototype.setTitle.createSequence(function(t) {
	        if (this.rendered && this.collapsedHeaderText) {
	          // if the collapsed title element is regular html dom
	          if (this.collapsedHeaderText.dom) {
	            this.collapsedHeaderText.dom.innerHTML = t;
	          // or if this is an SVG text node
	          } else if (this.collapsedHeaderText.replaceData) {
	            this.collapsedHeaderText.nodeValue = t;
	          };
	        };
	      });
	      // update the collapsed icon class also
	      p.setCollapsedIconClass = function(cls) {
	        var old = this.collapsedIconCls;
	        this.collapsedIconCls = cls;
	        if(this.rendered && this.collapsedHeader){
	          var hd = this.collapsedHeader,
	          img = hd.child('img.x-panel-inline-icon');
	          // if an icon image is already shown, modify it or remove it
	          if(img) {
	            if (this.collapsedIconCls) {
	              Ext.fly(img).replaceClass(old, this.collapsedIconCls);
	            } else {
	              // remove img node if the icon class is removed
	              Ext.fly(img).remove();
	            };
	          // otherwise create the img for the icon
	          } else if (this.collapsedIconCls) {
	            Ext.DomHelper.insertBefore(hd.dom.firstChild, {
	              tag:'img', src: Ext.BLANK_IMAGE_URL, 
	              cls:'x-panel-inline-icon '+this.collapsedIconCls,
	              style: verticalText 
	                ? 'display: block; margin: 1px 2px;' 
	                : 'margin-top: 2px; margin-right: 4px'
	            });
	          };
	        };
	      };
	      p.on('render', function() {
	        if (this.ownerCt.rendered && this.ownerCt.layout.hasLayout) {
	          patchCollapsedElem.call(p);
	        } else {
	          // the panel's container first needs to render/layout its collapsed title bars
	          this.ownerCt.on('afterlayout', patchCollapsedElem, p, {single:true});
	        };
	      }, p);
	    }
	  };
	  return this;
	})();
	
	window.editionStoreData = [['','不限'],['a','安卓'],['i','IOS正版'],['o','IOS越狱']];
	window.currStoreData = [['money','金币'],['gold','钻石'],['renow','声望']];
	window.wayTypeStoreData = [['putout','产出途径'],['consume','消耗途径']];
	window.propsStoreData = [['equip','装备'],['meta','材料'],['item','功能道具']];

	Ext.piggy = {};
	Ext.piggy.percentRender = function(value){if(value=="" || value=="-") return value; return value+"%"}
	
	
	if(!Ext.grid.GridView.prototype.templates) {        
	    Ext.grid.GridView.prototype.templates = {};        
	}        
	Ext.grid.GridView.prototype.templates.cell =  new  Ext.Template(        
	     '<td class="x-grid3-col x-grid3-cell x-grid3-td-{id} x-selectable {css}" style="{style}" tabIndex="0" {cellAttr}>' ,        
	     '<div class="x-grid3-cell-inner x-grid3-col-{id}" {attr}>{value}</div>' ,        
	     '</td>'        
	);     
	  
	Ext.grid.GridView.prototype.cellTpl = new Ext.Template(Ext.grid.GridView.prototype.cellTpl.html    
	        .replace('unselectable="on"', '').replace('class="','class="x-selectable '))  