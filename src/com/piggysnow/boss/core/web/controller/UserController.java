package com.piggysnow.boss.core.web.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

import com.piggysnow.boss.core.domain.User;
import com.piggysnow.boss.core.services.UserService;
import com.piggysnow.boss.core.services.UserTeamRoleService;
import com.piggysnow.boss.core.web.UserSession;

/**
 * 用户UserController
 * 
 */
public class UserController extends MultiActionController {
	/**
	 * 协作组用户
	 */
	@Resource
	private UserTeamRoleService userTeamRoleService;
	public void setUserTeamRoleService(UserTeamRoleService userTeamRoleService) {
		this.userTeamRoleService = userTeamRoleService;
	}

	/**
	 * 用户userService
	 */
	@Resource
	public UserService userService;

	public void setUserService(UserService userService) {
		this.userService = userService;
	}

	/**
	 * 协作组查看用户用户信息
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ModelAndView info(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ModelAndView model = new ModelAndView("/admin/manager/userview");
		Map map = new HashMap();
		String userId = request.getParameter("userId");
		if (userId != null) {
			User user = this.userService.find(Long.parseLong(userId));
			map.put("user", user);
		}
		model.addAllObjects(map);
		return model;
	}

	/**
	 * 个人管理
	 */
	public ModelAndView manager(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ModelAndView model = new ModelAndView("/persionmanager/info_index");
		Map map = new HashMap();
		String userId = request.getParameter("userId");
		if (userId != null) {
			User user = this.userService.find(Long.parseLong(userId));
			map.put("user", user);
		}
		model.addAllObjects(map);
		return model;
	}

	/**
	 * 个人图片信息修改
	 */
	public ModelAndView update(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String userId = request.getParameter("userId");
		if (userId != null) {
			User user = this.userService.find(Long.valueOf(userId));
		}
		return this.manager(request, response);
	}
}
