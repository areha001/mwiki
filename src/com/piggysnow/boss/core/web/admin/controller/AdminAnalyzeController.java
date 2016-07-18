package com.piggysnow.boss.core.web.admin.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

import com.piggysnow.boss.core.services.PartnerService;
import com.piggysnow.boss.core.services.UserService;

/**
 * 
 *@author  fqzhang 后台管理--部门管理
 * 
 */
public class AdminAnalyzeController extends MultiActionController {
	@Resource
	private UserService userService;

	public void setUserService(UserService userService) {
		this.userService = userService;
	}
	@Resource
	private PartnerService deptService;
	public void setDeptService(PartnerService deptService) {
		this.deptService = deptService;
	}
	/**
	 * 部门显示
	 */
	//json 跳转
	public ModelAndView subject(HttpServletRequest request,
			HttpServletResponse response)throws Exception{ 
		ModelAndView mav = new ModelAndView("admin/analyzeSubject");
		return mav;
	}
	public ModelAndView grade(HttpServletRequest request,
			HttpServletResponse response)throws Exception{ 
		ModelAndView mav = new ModelAndView("admin/analyzeGrade");
		return mav;
	}
	public ModelAndView clazz(HttpServletRequest request,
			HttpServletResponse response)throws Exception{ 
		ModelAndView mav = new ModelAndView("admin/analyzeClazz");
		return mav;
	}

}
