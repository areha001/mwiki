package com.piggysnow.exception;

/**
 * 参数没有找到异常类
 * @author wangyu
 *
 */
public class ParameterNotFoundException extends java.lang.Exception{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public ParameterNotFoundException(){ 
		super();
	}
	public ParameterNotFoundException(String ms){
		super(ms);
	}
}