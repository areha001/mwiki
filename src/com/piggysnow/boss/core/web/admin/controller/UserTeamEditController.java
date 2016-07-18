package com.piggysnow.boss.core.web.admin.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.validation.BindException;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.SimpleFormController;
import org.springframework.web.servlet.view.RedirectView;

import com.piggysnow.boss.core.domain.Role;
import com.piggysnow.boss.core.domain.User;
import com.piggysnow.boss.core.domain.UserTeamRole;
import com.piggysnow.boss.core.services.RoleService;
import com.piggysnow.boss.core.services.UserTeamRoleService;
import com.piggysnow.boss.core.web.UserSession;

/**
 * 
 * 协作组成员修改
 * 
 */
public class UserTeamEditController extends SimpleFormController {
	/**
	 * 协作组用户角色Service
	 */
	@Resource
	private UserTeamRoleService userTeamRoleService;
	@Resource
	private RoleService roleService;

	public void setUserTeamRoleService(UserTeamRoleService userTeamRoleService) {
		this.userTeamRoleService = userTeamRoleService;
	}

	public void setRoleService(RoleService roleService) {
		this.roleService = roleService;
	}

	/**
	 * 协作组
	 */
	public ModelAndView onSubmit(HttpServletRequest request, HttpServletResponse response, Object command, BindException errors)
			throws Exception {
		String teamId = request.getParameter("teamId");
		ModelAndView model = new ModelAndView(new RedirectView("userRoleSetting.do?method=manager&teamId=" + teamId));
		UserTeamRole userTeamRole = (UserTeamRole) command;
		this.userTeamRoleService.save(userTeamRole);
		User user = UserSession.get(request).getUser();
		Role role = this.roleService.get(userTeamRole.getRoleId());
		return model;
	}


}
