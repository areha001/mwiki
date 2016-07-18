package com.piggysnow.exception;

import javax.servlet.http.HttpServletRequest;

/**
 * 输入参数错误
 * */
public class ParameterInvalidException extends RuntimeException{

	public String toString()
	{
		return "输入参数错误";
	}
}
