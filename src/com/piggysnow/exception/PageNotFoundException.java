package com.piggysnow.exception;

import javax.servlet.http.HttpServletRequest;
/**
 * 你所访问的页面不存在
 * */
public class PageNotFoundException extends RuntimeException{

	/**
	 * 
	 */
	private static final long serialVersionUID = 6905707013138744436L;

	public String toString()
	{
		return "你所访问的页面不存在";
	}
}
