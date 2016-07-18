package com.piggysnow.boss.exception;

import javax.servlet.http.HttpServletRequest;

import com.piggysnow.boss.utils.FlashMessage;

public class ShowDenyException extends ModuleException{

	public ShowDenyException(HttpServletRequest request)
	{
		FlashMessage.store(request, "访问权限不足");
	}
	public String toString()
	{
		return "权限不足";
	}
}
