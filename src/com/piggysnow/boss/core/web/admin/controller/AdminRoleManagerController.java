package com.piggysnow.boss.core.web.admin.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

import com.piggysnow.boss.core.domain.Role;
import com.piggysnow.boss.core.services.RoleService;

/**
 * 
 * 用户角色权限AdminRoleManagerController
 * 
 */
public class AdminRoleManagerController extends MultiActionController {
	@Resource
	private RoleService roleService;

	public void setRoleService(RoleService roleService) {
		this.roleService = roleService;
	}

	/**
	 * 角色管理
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ModelAndView roleManage(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		ModelAndView model = new ModelAndView("role/RoleManager");
		Map map = new HashMap();
		String teamId = request.getParameter("teamId");// 协作组ID
		if (teamId != null && !teamId.equals("")) {
			String HQL = "from Role r where r.teamId=?";
			List<Role> roleList = this.roleService.find(HQL, Long
					.parseLong(teamId));
			map.put("roleList", roleList);
			model.addAllObjects(map);
		}
		return model;
	}

	/**
	 * 删除用户角色
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ModelAndView roleDelete(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String roleId = request.getParameter("id");// 角色ID
		if (roleId != null && !roleId.equals("")) {
			this.roleService.removeById(Long.parseLong(roleId));
		}
		return this.roleManage(request, response);
	}

	/**
	 * 用户权限管理
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ModelAndView roleSubRoleManage(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		ModelAndView model = new ModelAndView();

		return model;
	}
}
