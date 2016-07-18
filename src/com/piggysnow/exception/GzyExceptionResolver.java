package com.piggysnow.exception;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;


/**
 * 全局Exception处理
 * */
public class GzyExceptionResolver extends org.springframework.web.servlet.handler.SimpleMappingExceptionResolver{

	@Override
	public ModelAndView resolveException(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex) {
		// TODO Auto-generated method stub
		ex.printStackTrace(); //打出调用栈方便调试
		response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		return super.resolveException(request, response, handler, ex);
	}
}
