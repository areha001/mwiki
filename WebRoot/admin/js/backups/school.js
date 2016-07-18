/// <reference path="../../../Demo/vswd-ext_2.0.2.js" />

var Urls = { //地址定义
    GetList: '', //获取列表
    GetOne: 'schoolManager.do?method=show', //获取单个
    PostAdd: '', //新增
    PostModify: 'schoolManager.do?method=update', //修改
    Delete: '' //删除
};

Ext.onReady(function ()
{
    Ext.BLANK_IMAGE_URL = "js/ext-3.3.1/resources/images/default/s.gif";
    Ext.QuickTips.init();
    Ext.Msg.buttonText.yes = Ext.Msg.buttonText.ok = "确定";
    Ext.Msg.buttonText.cancel = Ext.Msg.buttonText.no = "取消";
    Ext.form.Field.prototype.msgTarget = "qtip";

    var pagesize = 2;

    var toolbar = new Ext.Toolbar({ width: '100%' }).add
    (
        new Ext.Button({ text: '保存', id: 'save', iconCls: 'addButton', listeners: { click: function () { doSave(); }} })
    ); //<-- toolbar:Ext.Toolbar.add

    var form = new Ext.form.FormPanel({
        tbar: [toolbar],
        title: '学校基本信息',
        labelSeparator: '：',
        labelWidth: 70,
        labelAlign: 'right',
        bodyStyle: 'padding:5px',
        frame: true,
        items: [{
            autoHeight: false,
            layout: 'column',
            border: true,
            items: [{
                columnWidth: .6,
                layout: 'form',
                defaults: { anchor: '95%' },
                items: [
                        new Ext.form.TextField({
                            name: 'title',
                            fieldLabel: '学校名称',
                            allowBlank: false,
                            emptyText: '请填写标题',
                            blankText: '标题不能为空'
                        }),
                        new Ext.form.Hidden({
                            name: 'id'
                        }),
                        new Ext.form.TextField({
                            name: 'code',
                            fieldLabel: '学校编码',
                            allowBlank: false,
                            emptyText: '请填写学校编码',
                            blankText: '学校编码不能为空'
                        }),
                        new Ext.form.ComboBox({
                            name: 'type',
                            fieldLabel: '学校类别',
                            triggerAction: 'all',
                            mode: 'local',
                            store: new Ext.data.SimpleStore({
                                fields: ['value', 'text'],
                                data: [['0', '幼儿园'], ['1', '小学'], ['2', '初中'], ['3', '普通高中'], ['4', '十二年一贯制'], ['5', '特殊教育'], ['6', '其他教育']]
                            }),
                            displayField: 'text',
                            valueField: 'text'
                        }),
                        new Ext.form.TextField({
                            name: 'address',
                            fieldLabel: '学校地址',
                            allowBlank: true,
                            emptyText: '请填写学校地址'
                        }),
                        new Ext.form.TextField({
                            name: 'phone',
                            fieldLabel: '联系电话'
                        }),
                        new Ext.form.TextField({
                            name: 'postcode',
                            fieldLabel: '邮政编码'
                        }),
                        new Ext.form.TextField({
                            name: 'url',
                            fieldLabel: '主页地址'
                        }),
                        new Ext.form.TextField({
                            name: 'ip',
                            fieldLabel: '学校对外IP'
                        }),
                        new Ext.form.TextArea({
                            name: 'description',
                            fieldLabel: '备注'
                        })
                    ]
            }]
        }]
    });
    new Ext.Viewport({
        layout: 'border',
        items: [{ region: "center", border: true, layout: "fit", bodyBorder: false, items: [form]}]
    });

    form.form.load({
        url: Urls.GetOne,
        waitMsg: '正在加载信息,请稍后...',
        success: function (form, action) { },
        failure: function (form, action) { Ext.Msg.alert("提示", "数据加载失败！"); }
    });

    function doSave()
    {
        form.form.submit({
            url: Urls.PostModify,
            waitMsg: '正在加载信息,请稍后...',
            success: function (form, action) { Ext.Msg.alert("提示", "保存信息成功"); },
            failure: function (form, action) { Ext.Msg.alert("提示", "保存信息失败"); }
        });
    }
});