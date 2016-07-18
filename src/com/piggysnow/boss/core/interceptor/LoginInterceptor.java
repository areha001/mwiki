package com.piggysnow.boss.core.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.piggysnow.boss.utils.FlashMessage;


/**
 * 权限拦截器
 * @author wangy
 *
 */
public class LoginInterceptor extends HandlerInterceptorAdapter {


	public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
			Object controller) throws Exception {

		return true;
	}
	
	public static void redirectHomePage(HttpServletRequest request, HttpServletResponse response) throws Exception
	{
		FlashMessage.store(request,"请登录");
		String redirectPath = request.getContextPath()+"/admin/adminLogin.do?method=adminLogin";
		sendRedirect(redirectPath, response);
	}
	
	public static void sendRedirect(String redirectPath ,HttpServletResponse response )throws Exception
	{
		response.setHeader( "Pragma", "No-cache");
		response.setHeader( "Cache-Control", "no-cache");
		response.setDateHeader( "Expires ",   -1); 
		response.getWriter().write("<html><head><META HTTP-EQUIV=\"Pragma\" CONTENT=\"no-cache\"/>"+
				"<META HTTP-EQUIV=\"Expires\" CONTENT=\"-1\"/> <META HTTP-EQUIV=\"Expires\" CONTENT=\"-1\"/></head>"+
				"<body><script>window.parent.parent.location.href='"+redirectPath +"&dt="+System.currentTimeMillis()+"'</script><body></html>");
		response.getWriter().flush();
	}

}
