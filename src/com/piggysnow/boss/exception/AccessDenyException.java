package com.piggysnow.boss.exception;

import javax.servlet.http.HttpServletRequest;

import com.piggysnow.boss.utils.FlashMessage;

public class AccessDenyException extends ModuleException{

	public AccessDenyException(HttpServletRequest request)
	{
		FlashMessage.store(request, "该实例不是由你创建的");
	}
	public String toString()
	{
		return "权限不足";
	}
}
