package com.piggysnow.boss.core.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.piggysnow.boss.utils.FlashMessage;
import com.piggysnow.boss.utils.MyModelAndView;


/**
 * 权限拦截器
 * @author wangy
 *
 */
public class FrontInterceptor extends HandlerInterceptorAdapter {

	@Override
	public void postHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		// TODO Auto-generated method stub
		if(modelAndView!=null && modelAndView instanceof MyModelAndView)
		{
			String viewName = modelAndView.getViewName();
			modelAndView.setViewName("base/frontbase");
			MyModelAndView mmv = (MyModelAndView) modelAndView;
			mmv.setSubViewName(viewName);

			request.setAttribute("subViewName", viewName);
		}
		super.postHandle(request, response, handler, modelAndView);
	}



}
