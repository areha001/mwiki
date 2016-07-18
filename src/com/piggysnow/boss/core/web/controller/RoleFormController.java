package com.piggysnow.boss.core.web.controller;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.validation.BindException;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.SimpleFormController;
import org.springframework.web.servlet.view.RedirectView;

import com.piggysnow.boss.core.domain.Role;
import com.piggysnow.boss.core.domain.SubRole;
import com.piggysnow.boss.core.services.RoleService;
import com.piggysnow.boss.core.services.SubRoleService;

/**
 * 
 * 协作组角色RoleFormController
 * 
 */
public class RoleFormController extends SimpleFormController {
	
	static Logger log = Logger.getLogger(RoleFormController.class);
	/**
	 * RoleService
	 */
	private RoleService roleService;

	public void setRoleService(RoleService roleService) {
		this.roleService = roleService;
	}

	public Map referenceData(HttpServletRequest request) throws Exception {
		Map map = new HashMap();
		// 查询出所有权限
		List<SubRole> subList = SubRole.assignable;
		map.put("subList", subList);
		String roleId = request.getParameter("roleId");// 权限id
		if (roleId != null) {
			Role role = this.roleService.get(Long.valueOf(roleId));
			map.put("role", role);
			// 已有权限subRoleSet
			Set<SubRole> subRoleSet = role.subRoles;
			map.put("subSet", subRoleSet);
		}
		return map;
	}

	/**
	 * 角色增加OR权限修改
	 */
	public ModelAndView onSubmit(HttpServletRequest request,
			HttpServletResponse response, Object command, BindException errors)
			throws Exception {
//		Role role = (Role) command;
//		ModelAndView model = new ModelAndView(new RedirectView(
//				"role.do?method=main&teamId=" + role.getTeamId()));
//		String[] subAttr = request.getParameterValues("subRole");
//		Set<SubRole> subs = new HashSet<SubRole>();
//		if (subAttr != null) {
//			for (String subId : subAttr) {
//				SubRole subRole = new SubRole();
//				subRole.setId(Long.valueOf(subId));
//				subs.add(subRole);
//			}
//		}
//		role.setSubRoles(subs);
//		this.roleService.save(role);
		return null;
	}

	@Override
	protected void onBindAndValidate(HttpServletRequest request,
			Object command, BindException errors) throws Exception {

		super.onBindAndValidate(request, command, errors);
		log.error(errors);
	}

}
