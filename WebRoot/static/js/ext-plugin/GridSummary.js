Ext.ns('Ext.ux.grid');
var debug = !false;
Ext.ux.grid.GridSummary = function(config) {
    Ext.apply(this, config);
};
Ext.extend(Ext.ux.grid.GridSummary, Ext.util.Observable, {
    init: function(grid) {
        this.grid = grid;
        this.cm = grid.getColumnModel();
        this.view = grid.getView();

        var v = this.view;
         
        // override GridView's onLayout() method
        v.onLayout = this.onLayout;
        v.afterMethod('render', this.refreshSummary, this);
        v.afterMethod('refresh', this.refreshSummary, this);
         //v.afterMethod('syncScroll', this.syncSummaryScroll, this);
        v.afterMethod('onColumnWidthUpdated', this.doWidth, this);
        v.afterMethod('onAllColumnWidthsUpdated', this.doAllWidths, this);
        v.afterMethod('onColumnHiddenUpdated', this.doHidden, this);
        // update summary row on store's add/remove/clear/update events
        grid.store.on({
            add: this.refreshSummary,
            remove: this.refreshSummary,
            clear: this.refreshSummary,
            update: this.refreshSummary,
            scope: this
        });

        if (!this.rowTpl) {
            this.rowTpl = new Ext.Template('<div           style="overflow-x:hidden;"      class="x-grid3-summary-row ,x-grid3-gridsummary-row-offset" >', '<table class="x-grid3-summary-table" border="0" cellspacing="0" cellpadding="0" style="{tstyle};background:#e0e0e0;padding:3px;border:1px solid #777;">', '<tbody><tr>{cells}</tr></tbody>', '</table>', '</div>');
            this.rowTpl.disableFormats = true;
        }
        this.rowTpl.compile();
        if (!this.cellTpl) {
            this.cellTpl = new Ext.Template(
		'<td class="x-grid3-col x-grid3-cell x-grid3-td-{id} x-selectable {css}" style="{style}" tabIndex="0" {cellAttr}>',
		'<div class="x-grid3-cell-inner x-grid3-col-{id}" {attr}>{value}</div>',
		'</td>');
            this.cellTpl.disableFormats = true;
        }
        this.cellTpl.compile();
        
    },

    calculate: function(rs, cm) {
    	var dcount = 0;
        var data = {},
        cfg = cm.config;
        // loop through all columns in ColumnModel
        for (var i = 0,
        len = cfg.length; i < len; i++) {
            var cf = cfg[i],
            // get column's configuration
            cname = cf.dataIndex; // get column dataIndex
            // initialise grid summary row data for the current column being
            // worked on
            data[cname] = 0;
            if (cf.summaryType) {
            	dcount = 0;
                for (var j = 0,
                jlen = rs.length; j < jlen; j++) {
                    var r = rs[j]; // get a single Record
                    
                
                
                    if('average' == cf.summaryType){
                    	 
                        if(!isNaN(r.get(cname))){
                        	dcount = dcount + 1;
                        }
                        data[cname] =toDecimal(Ext.ux.grid.GridSummary.Calculations[cf.summaryType](r.get(cname), r, cname, data, j,dcount));
                    }else{
                    	data[cname] =toDecimal(Ext.ux.grid.GridSummary.Calculations[cf.summaryType](r.get(cname), r, cname, data, j));
                    }
                    
                }
                
            }
        }
        return data;
    },

    onLayout: function(vw, vh) {
        if (Ext.type(vh) != 'number') { // handles grid's height:'auto' config
            return;
        }
        // note: this method is scoped to the GridView
        if (!this.grid.getGridEl().hasClass('x-grid-hide-gridsummary')) {
            // readjust gridview's height only if grid summary row is visible
            this.scroller.setHeight(vh - this.summary.getHeight());
        }
    },

    syncSummaryScroll: function() {

        var mb = this.view.scroller.dom;
        this.view.summaryWrap.dom.scrollLeft = mb.scrollLeft;
        // second time for IE (1/2 time first fails, other browsers ignore)
        this.view.summaryWrap.dom.scrollLeft = mb.scrollLeft;

       // alert(this.view.summaryWrap.dom.scrollLeft);

    },

    doWidth: function(col, w, tw) {
        var s = this.view.summary.dom;
        s.firstChild.style.width = tw;
        s.firstChild.rows[0].childNodes[col].style.width = w;
    },

    doAllWidths: function(ws, tw) {
        var s = this.view.summary.dom,
        wlen = ws.length;
        s.firstChild.style.width = tw;
        var cells = s.firstChild.rows[0].childNodes;
        for (var j = 0; j < wlen; j++) {
            cells[j].style.width = ws[j];
        }
    },

    doHidden: function(col, hidden, tw) {
        var s = this.view.summary.dom,
        display = hidden ? 'none': '';
        s.firstChild.style.width = tw;
        s.firstChild.rows[0].childNodes[col].style.display = display;
    },

    renderSummary: function(o, cs, cm) {
        cs = cs || this.view.getColumnData();
        var cfg = cm.config,
        buf = [],
        last = cs.length - 1;

        for (var i = 0,
        len = cs.length; i < len; i++) {
            var c = cs[i],
            cf = cfg[i],
            p = {};
            p.id = c.id;
            p.style = c.style;
            p.css = i == 0 ? 'x-grid3-cell-first ': (i == last ? 'x-grid3-cell-last ': '');
            var ds = this.grid.store;
            if ((cf.summaryType || cf.summaryRenderer) && ds.getTotalCount() > 0) {
                p.value = (cf.summaryRenderer || c.renderer)(o.gridData[c.name], p, o);
            } else {
                p.value = '';
            }
            if (p.value == undefined || p.value === "") p.value = "&nbsp;";
            buf[buf.length] = this.cellTpl.apply(p);
        }
        return this.rowTpl.apply({
            tstyle: 'width:' + this.view.getTotalWidth() + ';',
            cells: buf.join('')
        });
    },

    refreshSummary: function() {
        var g = this.grid,
        ds = g.store,
        cs = this.view.getColumnData(),
        cm = this.cm,
        rs = ds.getRange(),
        data = this.calculate(rs, cm),
        buf = this.renderSummary({
            gridData: data
        },
        cs, cm);
        if (!this.view.summaryWrap) {
            this.view.summaryWrap = Ext.DomHelper.insertAfter(this.view.scroller, {
                tag: 'div',
                cls: 'x-grid3-gridsummary-row-inner'
            },
            true);
        } else {
          this.view.summary.remove();
        }
        this.view.summary = this.view.summaryWrap.update(buf).first();
        this.view.scroller.setStyle('overflow-x', 'hidden');
        var view2 = this.view;
      this.view.summary.setStyle('overflow', 'auto');//解决滚动条滚动问题和页面刷新滚动条回到初始位置问题。
        this.view.summary.dom.scrollLeft = this.view.scroller.dom.scrollLeft;
       
        this.view.summary.on("scroll",
        function() {
            view2.scroller.dom.scrollLeft = view2.summary.dom.scrollLeft
        });
    },

    toggleSummary: function(visible) { // true to display summary row
        var el = this.grid.getGridEl();

        if (el) {
            if (visible === undefined) {
                visible = el.hasClass('x-grid-hide-gridsummary');
            }
            el[visible ? 'removeClass': 'addClass']('x-grid-hide-gridsummary');

            this.view.layout(); // readjust gridview height
        }
    },

    getSummaryNode: function() {
        return this.view.summary
    }
});
Ext.reg('gridsummary', Ext.ux.grid.GridSummary);
Ext.ux.grid.GridSummary.Calculations = {
    sum: function(v, record, colName, data, rowIdx) {
        return data[colName] + toDecimal(Ext.num(v, 0));
    },
    count: function(v, record, colName, data, rowIdx) {
        return rowIdx + 1;
    },

    max: function(v, record, colName, data, rowIdx) {
        return Math.max(Ext.num(v, 0), data[colName]);
    },

    min: function(v, record, colName, data, rowIdx) {
        return Math.min(Ext.num(v, 0), data[colName]);
    },

    average: function(v, record, colName, data, rowIdx, dcount) {
        var t = data[colName] + Ext.num(v, 0),
        count = record.store.getCount();
        return rowIdx == count - 1 ? (t / dcount) : t;
    },
    total:function(){
         return "\u5408\u8ba1";
    }
}
//保留两位小数   
        //功能：将浮点数四舍五入，取小数点后2位  
function toDecimal(x) {  
    var f = parseFloat(x);  
    if (isNaN(f)) {  
        return;  
    }  
    f = Math.floor(x*100)/100;  
    return f;  
}