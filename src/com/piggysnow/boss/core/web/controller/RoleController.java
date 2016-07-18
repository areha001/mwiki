package com.piggysnow.boss.core.web.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

import com.piggysnow.boss.core.domain.Role;
import com.piggysnow.boss.core.domain.SubRole;
import com.piggysnow.boss.core.domain.UserTeamRole;
import com.piggysnow.boss.core.services.RoleService;
import com.piggysnow.boss.core.services.SubRoleService;
import com.piggysnow.boss.core.services.UserTeamRoleService;
import com.piggysnow.boss.utils.FlashMessage;

/**
 * 
 * 角色RoleController
 * 
 */
public class RoleController extends MultiActionController {
	/**
	 * 角色roleService
	 */
	@Resource
	private RoleService roleService;
	/**
	 * 写作组->角色->用户userTeamRoleService
	 */
	@Resource
	private UserTeamRoleService userTeamRoleService;

	public void setRoleService(RoleService roleService) {
		this.roleService = roleService;
	}

	public void setUserTeamRoleService(UserTeamRoleService userTeamRoleService) {
		this.userTeamRoleService = userTeamRoleService;
	}

	/**
	 * 查询出协作组所有的角色
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ModelAndView main(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		ModelAndView model = new ModelAndView("admin/manager/managerrole");
		Map map = new HashMap();
		String teamId = request.getParameter("teamId");
		if (teamId != null && !teamId.equals("")) {
			String HQL = "from Role r where r.teamId=?";
			List<Role> roleList = this.roleService.find(HQL, Long
					.parseLong(teamId));
			map.put("roleList", roleList);
		}
		model.addAllObjects(map);
		return model;
	}

	/**
	 * 增加协作组角色
	 */
	public ModelAndView subrole(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		ModelAndView model = new ModelAndView("admin/manager/roleEdit");
		Map map = new HashMap();
		// 查询出所有权限
		List<SubRole> subList = SubRole.assignable;
		map.put("subList", subList);
		map.put("subList", subList);
		model.addAllObjects(map);
		return model;
	}

	/**
	 * 删除角色
	 */
	public ModelAndView delete(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String[] roles = request.getParameterValues("roleId");
		if (roles != null) {
			for (String roleId : roles) {
				this.roleService.removeById(Long.valueOf(roleId));
			}
		}
		return this.main(request, response);
	}

	/**
	 * 验证是否可以删除角色
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ModelAndView validatorRole(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		response.setContentType("application/json");// 设置生产JSON各式的数据
		response.setCharacterEncoding("UTF-8");// 设置页面编码
		String roleId = request.getParameter("roleId");
		boolean validator = false;
		if (roleId != null) {
			String HQL = "from UserTeamRole ut where ut.roleId=?";
			List<UserTeamRole> list = this.userTeamRoleService.find(HQL, Long
					.parseLong(roleId));
			if (list.size() >= 1) {
				validator = true;
			}
		}
		if (validator) {
			FlashMessage.store(request, "对不起，此角色不能删除");// 返回消息
			return this.main(request, response);
		} else {
			// 删除角色
			return this.delete(request, response);
		}
	}
}
