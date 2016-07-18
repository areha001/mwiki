package com.piggysnow.boss.core.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

/**
 * 处理已登录用户共同的请求
 * 
 * @author Snow
 * 
 */
public class UserInterceptor extends HandlerInterceptorAdapter {

	@Override
	@SuppressWarnings("unchecked")
	public void postHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
	}
}
