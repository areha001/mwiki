package com.piggysnow.exception;

import javax.servlet.http.HttpServletRequest;

public class ShowResourceDenyException extends RuntimeException{

	public String toString()
	{
		return "该资源尚未被发布或审核";
	}
}
