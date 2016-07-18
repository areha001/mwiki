package com.piggysnow.boss.core.web.admin.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

import com.piggysnow.common.dao.Page;

/**
 * 
 * 系统公告管理
 * 
 */
public class AdminAnnounceController extends MultiActionController {

	public ModelAndView showAnnounce(HttpServletRequest request, HttpServletResponse arg1)
			throws Exception {
		ModelAndView mav = new ModelAndView("admin/manager/manageAnnounce");

		Long teamId = Long.valueOf(request.getParameter("teamId"));
		Page page = new Page(request);
		mav.addObject("page", page);
		
		return mav;
	}
	
	
	public ModelAndView addAnnounce(HttpServletRequest request, HttpServletResponse arg1)
			throws Exception {

		Long teamId = Long.valueOf(request.getParameter("teamId"));
		return showAnnounce(request, arg1);
	}


	public ModelAndView hideAnnounce(HttpServletRequest request, HttpServletResponse arg1)
			throws Exception {

		return showAnnounce(request, arg1);
	}

}
