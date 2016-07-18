package com.piggysnow.boss.core.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.piggysnow.boss.core.web.UserSession;
import com.piggysnow.boss.utils.FlashMessage;


/**
 * 权限拦截器
 * @author wangy
 *
 */
public class ResourceInterceptor extends HandlerInterceptorAdapter {


	public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
			Object controller) throws Exception {

		if(request.getParameter("method").equals("download"))
		{
			if(! UserSession.get(request).isLogin())
			{
				FlashMessage.store(request,"请登录");
				response.sendRedirect(request.getContextPath()+"/main.do?method=forwardMain");
				return false;
			}
		}
		return true;
	}

}
