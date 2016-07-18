package com.piggysnow.boss.core.web.admin.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;

import com.piggysnow.boss.core.domain.Happen;
import com.piggysnow.boss.core.services.HappenService;
import com.piggysnow.common.dao.Page;

/**
 * 
 * 后台管理--GM操作日志 
 */

public class HappenController extends EasyController {
	@Resource
	private HappenService happenService;
	/*
	 * 老师信息记录显示
	 */

	public void setHappenService(HappenService happenService) {
		this.happenService = happenService;
	}

	//json 跳转
	public ModelAndView listPage(HttpServletRequest request,
			HttpServletResponse response)throws Exception{ 
		ModelAndView mav = new ModelAndView("admin/happen");
		return mav;
	}

	//显示所有老师信息
	public ModelAndView dataList(HttpServletRequest request,
			HttpServletResponse response)throws Exception{ 
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html");
		Page page = new Page(request);
		List<Happen> list = happenService.findList(page);
		return sendJson(response, page.getTotalPage(), list);
	}

	
}
