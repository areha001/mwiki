package com.piggysnow.boss.core.web.admin.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

import com.piggysnow.boss.core.domain.Dict;
import com.piggysnow.boss.core.services.DictService;

/**
 * 
 * 系统管理
 * 
 */
public class AdminSysDictController extends MultiActionController {
	@Resource
	private DictService dictService;
	
	public void setDictService(DictService dictService) {
		this.dictService = dictService;
	}

	/**
	 *  字典集
	 */
	public ModelAndView show(HttpServletRequest request,
			HttpServletResponse response)throws Exception{ 
		ModelAndView mav = new ModelAndView("admin/managerSysDicts");
		return mav;
	}
	/**
	 *  字典集
	 */
	public ModelAndView manageDict(HttpServletRequest request,
			HttpServletResponse response)throws Exception{ 
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html");
		try{
			Dict dict = new Dict();
			dict.setName(request.getParameter("openReg"));
			dict.setSubId(Integer.valueOf(request.getParameter("subId")));
			dictService.save(dict);
			
			response.getWriter().print("{success:true, failed:''}");
				
		}
		catch(Exception e)
		{
			e.printStackTrace();
			response.getWriter().print("{success:false}");
		}
		return null;
	}
	
}
