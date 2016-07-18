    //必填项数,动态的表示当前必填项数目
	var errorCounts = 0;
	//顶部的提示是否已经出现
	var showTopHint = false;
	//需要校验的数组
	var validateFields = [];
	
	/**
	 *todo:简化document.getElementById()，仿dwr,prototype框架
	 *elementId:元素id
	 */
	function $(elementId){
		return document.getElementById(elementId);
	}
	
	/**
	 *todo: 初始化必填项数
	 *
	 */
	function initRequiredItem(isInit){
		errorCounts = 0;
		var field = document.all;
		for(var i=0; i<field.length; i++){
			//required为自定义属性
			var condition = field[i].required && field[i].value == '';
			if(condition){
				validateFields[errorCounts] = field.name; 
				errorCounts ++;
			}
		}
		//alert(errorCounts);
		//for(var i=0; i<validateFields.length; i++){
		//	alert(i + ":" + validateFields[i].name);
		//}
	}
	
	/**
	 *todo: 当某项失去焦点时，检查其是否是空值
	 *
	 */
	function validate(field){
		var parent = field.parentNode;
		//如果某项是必填项，且为空时，如果则将其边框设置为红色，且后面追加一个红色的*标志
		//alert("field.name" + field.name);
		if(field.required){
			reCountValidateFields(field);
			if(field.value == ''){
				setBorderColor(field,setStyle(field));
				//setBorderColor(field,"erroBorder");
				//如果之前有红色的*标志就显示其
				if(parent.innerHTML.indexOf("*") != -1){
					hideRedSpan(field.name + "span",'');
				//否则就创建一个
				}else{
					var hintId = field.name + "span";
					var hint = createElement("<span>",field.name + "span","<font color='red'>&nbsp;*</font>");
					parent.appendChild(hint);
				}
			//如果不为空则将其边框颜色恢复，且隐藏其后面的红色*标志
			}else{
				errorCounts -= 1;
				setBorderColor(field,'');
				hideRedSpan(field.name + "span",'none');
			}
			if(showTopHint){
				//重新计算当前未填项
				initRequiredItem();
				checkSubmit();
			}
		}
		initRequiredItem();
	}
	
	/**
	 *todo: 在用select 来改变input的值时触发
	 *source: select控件
	 *changeObj: input
	 *dest: 当这个input为某个值又会触发其他某个input的状态
	 ×evt: 事件
	 */
	function changeStatus(source,changeObj,dest,evt){
		var sourceValue = source.value;
		var toggle = sourceValue != '' ? true : false;
		$(changeObj).value = source.value;
		if(dest == null)
			return;
		if(sourceValue != ''){
			$(dest).setAttribute(evt,'validate(this)');
			$(dest).setAttribute('required',toggle);
			validate($(dest));
		}else{
			$(dest).value = '';
			$(dest).removeAttribute(evt);
			$(dest).removeAttribute('required');
			alert($($(dest).name + "span"));
			hideRedSpan($(dest).name + "span",'none');
			setBorderColor($(dest),'');
			if(showTopHint){
				//重新计算当前未填项
				initRequiredItem();
				checkSubmit();
			}
		}
		//alert($(dest).required);
	}
				
	function setAttribute(obj,attri,value){
		$(obj).setAttribute(attri,value);
	}	
	
	/**
	 *todo:当一个需要校验的域的内容修改时，是否要重新计算errorCounts
	 *
	 *
	 */
	function reCountValidateFields(field){
		contain(field) ? errorCounts ++ : errorCounts;
	}
	
	/**
	 *todo:判断某域是否在需要校验的数组中
	 *
	 */
	function contain(field){
		var contain = false;
		for(var i=0; i<validateFields.length; i++){
			if(field.name == validateFields[i]){
				contain = true;
				break;
			}
		}
		return contain;
	}
	
	/**
	 *todo: 设置提示的边框样式
	 *field：域
	 *style: 样式名
	 */
	function setBorderColor(field,style){
		if(field.type.indexOf('text') != -1){
			field.className = style;
			return;
		}
		if(field.type.indexOf('select') != -1){
			//field.style.cssText = 'color:red';
			//$(field.name + "Div").style.display = 'none';
			//$(field.name + "Div").style.cssText = style;
			$(field.name + "Div").className = style;
			return;
		}
	}
	
	/**
	 *todo:根据display来显示或隐藏红色的*标志
	 *elementId:元素id
	 *display:显示属性
	 */
	function hideRedSpan(elementId,display){
		var element = $(elementId);
		if(! element)
			return;
		element.style.display = display;
	}
	
	/**
	 *todo: 在某项未被填写时，创建一个包含红色×的标志
	 *className: css的class样式名
	 *elementId: 元素id
	 *text: 内容
	 */
	function createElement(className,elementId,text) {
	    var hint = document.createElement(className);
	    hint.className = className;
	    hint.id = elementId;
	    hint.innerHTML = text;
	    return hint;
	}
	
	/**
	 *todo: 提交表单时，检查是否有必填项未填写
	 *formId: 当前提交的表单的id
	 */
	function checkSubmit(formId){
		var form = document.getElementById(formId);
		//alert(errorCounts);
		//alert(formId + "," + errorCounts);
		if(form && errorCounts == 0)
			form.submit();
		//将必填项未填写完整时
		var hint = $("hint");
		if(errorCounts > 0){
			hint.innerHTML = "<font color='red'>&nbsp;把请带红色*项填写完整! 共有" + errorCounts + "项</font>";
			showBlankItem();
		}else{
			hint.innerHTML = '';
		}
		return false;
	}
	
	/**
	*todo:根据域的类型也判断提示的样式
	*field：域
	*/
	function setStyle(field){
		var style = '';
		if(field.type.indexOf('text') != -1){
			style = "erroBorder";
		}else{
			style = "hintDivShow";
		}	
		return style;
	}
	
	/**
	 *todo: 提交表单时，检查到有必填项未填写，如果则将其边框设置为红色，且后面追加一个红色的*标志
	 *
	 */
	function showBlankItem(){
		showTopHint = true;
		var fields = document.all;
		for(var i=0; i<fields.length; i++){
			var field = fields[i];
			var parent = field.parentNode;
			if(field.required && field.value == ''){
				setBorderColor(field,setStyle(field));
				if(parent.innerHTML.indexOf("*") == -1){
					var hint = createElement("<span>",field.name + "span","<font color='red'>&nbsp;*</font>");
					parent.appendChild(hint);
				}
			}
		}
	}