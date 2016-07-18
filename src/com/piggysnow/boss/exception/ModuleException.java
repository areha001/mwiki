package com.piggysnow.boss.exception;

public class ModuleException extends RuntimeException{

	public String toString()
	{
		return "权限不足"+super.toString();
	}
}
