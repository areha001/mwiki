package com.piggysnow.exception;

/**
 * 单选题多选的异常类
 * @author wangyu
 *
 */
public class MultiChoicedException extends java.lang.RuntimeException{
	/**
	 * 
	 */
	private static final long serialVersionUID = 4384175736529982292L;

	/**
	 * 
	 */
	public String toString()
	{
		return "不能多选";
	}
}