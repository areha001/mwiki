package com.piggysnow.boss.exception;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;

import com.piggysnow.boss.utils.FlashMessage;

public class GzyExceptionResolver extends org.springframework.web.servlet.handler.SimpleMappingExceptionResolver{

	@Override
	public ModelAndView resolveException(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex) {
		// TODO Auto-generated method stub
		ex.printStackTrace(); //打出调用栈方便调试
		return super.resolveException(request, response, handler, ex);
	}
}
