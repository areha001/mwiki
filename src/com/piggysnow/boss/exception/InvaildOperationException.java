package com.piggysnow.boss.exception;

import javax.servlet.http.HttpServletRequest;

import com.piggysnow.boss.utils.FlashMessage;

public class InvaildOperationException extends ModuleException{
	
	public InvaildOperationException(HttpServletRequest request)
	{
		FlashMessage.store(request, "你输入的路径有误");
	}

	public String toString()
	{
		return "你输入的路径有误"+super.toString();
	}
}
