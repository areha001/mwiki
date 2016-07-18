    //��������,��̬�ı�ʾ��ǰ��������Ŀ
	var errorCounts = 0;
	//��������ʾ�Ƿ��Ѿ�����
	var showTopHint = false;
	//��ҪУ�������
	var validateFields = [];
	
	/**
	 *todo:��document.getElementById()����dwr,prototype���
	 *elementId:Ԫ��id
	 */
	function $(elementId){
		return document.getElementById(elementId);
	}
	
	/**
	 *todo: ��ʼ����������
	 *
	 */
	function initRequiredItem(isInit){
		errorCounts = 0;
		var field = document.all;
		for(var i=0; i<field.length; i++){
			//requiredΪ�Զ�������
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
	 *todo: ��ĳ��ʧȥ����ʱ��������Ƿ��ǿ�ֵ
	 *
	 */
	function validate(field){
		var parent = field.parentNode;
		//���ĳ���Ǳ������Ϊ��ʱ���������߿�����Ϊ��ɫ���Һ���׷��һ����ɫ��*��־
		//alert("field.name" + field.name);
		if(field.required){
			reCountValidateFields(field);
			if(field.value == ''){
				setBorderColor(field,setStyle(field));
				//setBorderColor(field,"erroBorder");
				//���֮ǰ�к�ɫ��*��־����ʾ��
				if(parent.innerHTML.indexOf("*") != -1){
					hideRedSpan(field.name + "span",'');
				//����ʹ���һ��
				}else{
					var hintId = field.name + "span";
					var hint = createElement("<span>",field.name + "span","<font color='red'>&nbsp;*</font>");
					parent.appendChild(hint);
				}
			//�����Ϊ������߿���ɫ�ָ��������������ĺ�ɫ*��־
			}else{
				errorCounts -= 1;
				setBorderColor(field,'');
				hideRedSpan(field.name + "span",'none');
			}
			if(showTopHint){
				//���¼��㵱ǰδ����
				initRequiredItem();
				checkSubmit();
			}
		}
		initRequiredItem();
	}
	
	/**
	 *todo: ����select ���ı�input��ֵʱ����
	 *source: select�ؼ�
	 *changeObj: input
	 *dest: �����inputΪĳ��ֵ�ֻᴥ������ĳ��input��״̬
	 ��evt: �¼�
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
				//���¼��㵱ǰδ����
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
	 *todo:��һ����ҪУ�����������޸�ʱ���Ƿ�Ҫ���¼���errorCounts
	 *
	 *
	 */
	function reCountValidateFields(field){
		contain(field) ? errorCounts ++ : errorCounts;
	}
	
	/**
	 *todo:�ж�ĳ���Ƿ�����ҪУ���������
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
	 *todo: ������ʾ�ı߿���ʽ
	 *field����
	 *style: ��ʽ��
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
	 *todo:����display����ʾ�����غ�ɫ��*��־
	 *elementId:Ԫ��id
	 *display:��ʾ����
	 */
	function hideRedSpan(elementId,display){
		var element = $(elementId);
		if(! element)
			return;
		element.style.display = display;
	}
	
	/**
	 *todo: ��ĳ��δ����дʱ������һ��������ɫ���ı�־
	 *className: css��class��ʽ��
	 *elementId: Ԫ��id
	 *text: ����
	 */
	function createElement(className,elementId,text) {
	    var hint = document.createElement(className);
	    hint.className = className;
	    hint.id = elementId;
	    hint.innerHTML = text;
	    return hint;
	}
	
	/**
	 *todo: �ύ��ʱ������Ƿ��б�����δ��д
	 *formId: ��ǰ�ύ�ı���id
	 */
	function checkSubmit(formId){
		var form = document.getElementById(formId);
		//alert(errorCounts);
		//alert(formId + "," + errorCounts);
		if(form && errorCounts == 0)
			form.submit();
		//��������δ��д����ʱ
		var hint = $("hint");
		if(errorCounts > 0){
			hint.innerHTML = "<font color='red'>&nbsp;�������ɫ*����д����! ����" + errorCounts + "��</font>";
			showBlankItem();
		}else{
			hint.innerHTML = '';
		}
		return false;
	}
	
	/**
	*todo:�����������Ҳ�ж���ʾ����ʽ
	*field����
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
	 *todo: �ύ��ʱ����鵽�б�����δ��д���������߿�����Ϊ��ɫ���Һ���׷��һ����ɫ��*��־
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