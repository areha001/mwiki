package com.piggysnow.boss.core.interceptor;

import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.piggysnow.boss.core.web.UserSession;
import com.piggysnow.boss.utils.FlashMessage;
import com.piggysnow.common.utils.TimeUtil;


/**
 * URL 控制
 * 将某些相同的url的权限于同控制器化作一类处理
 * @author Snow
 *
 */
public class URLArray {

	private String[] urls = new String[]{};

	public URLArray(String[] methods)
	{
		urls = methods;
	}
	
	/**
	 * 是否是例外的URL method
	 * */
	public boolean isIn(String method)
	{
		for(String url : urls)
		{
			if(url.contains(method))
				return true;
		}
		return false;
	}

}
