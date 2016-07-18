package com.piggysnow.boss.utils;

import java.io.Serializable;

import javax.servlet.http.HttpServletRequest;

/**
 * FlashMessage 用于错误信息的保存和显示，只能显示一次，取出信息时即清除。
 * 可以存放Map以保存多条信息。
 * @author Xunuo
 * */
public class PopUp implements Serializable{

	private Object msg;
	
	public static PopUp store(HttpServletRequest request,Object msg)
	{
		return new PopUp(request, msg);
	}
	
	public PopUp(HttpServletRequest request,Object msg)
	{
		this.msg = msg;
		request.getSession().setAttribute("popupMessage", this);
	}

	public Object getMsg() {
		Object temp = msg;
		msg = null;
		return temp;
	}
	
}
