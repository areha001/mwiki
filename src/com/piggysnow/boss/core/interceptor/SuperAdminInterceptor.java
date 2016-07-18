package com.piggysnow.boss.core.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.piggysnow.boss.core.domain.User;
import com.piggysnow.boss.core.web.UserSession;


/**
 * 权限拦截器
 * @author wangy
 *
 */
public class SuperAdminInterceptor extends HandlerInterceptorAdapter {


	public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
			Object controller) throws Exception {

		String uri = request.getRequestURI();
		User user = UserSession.get(request).getUser();
		if(user.getTeamAdmin()==1)
			return true;
		
		return false;
	}

}
