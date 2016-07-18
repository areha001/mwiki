package com.piggysnow.boss.core.web.admin.controller;

import org.springframework.web.servlet.mvc.multiaction.MultiActionController;
@Deprecated
public class AdminUserTeamRoleController extends MultiActionController {
//	/**
//	 * 协作组用户角色Service
//	 */
//	private UserTeamRoleService userTeamRoleService;
//	/**
//	 * 角色Service
//	 */
//	private RoleService roleService;
//	
//	public void setUserTeamRoleService(UserTeamRoleService userTeamRoleService) {
//		this.userTeamRoleService = userTeamRoleService;
//	}
//
//
//	public void setRoleService(RoleService roleService) {
//		this.roleService = roleService;
//	}
//
//	/**
//	 * 协作组用户管理
//	 */
//	public ModelAndView manager(HttpServletRequest request, HttpServletResponse response) throws Exception {
//		ModelAndView model = new ModelAndView("/admin/manager/manageruser");
//		Map map = new HashMap();
//		String teamId = request.getParameter("teamId");
//		AdminPermission adminPermission = new AdminPermission(UserSession.get(request),Long.valueOf(teamId));
//		
//		Page page = new Page(request);
//		page.setPageSize(10);
//		List<Object[]> uList = null;
//		if (teamId != null && !teamId.equals("")) {
//			uList = this.userTeamRoleService.userTeamManagers(page, Long.parseLong(teamId), UserTeamRole.STATUS_PASS);
//			map.put("uList", uList);
//		}
//		map.put("page", page);
//		map.put("adminPermission", adminPermission);
//		model.addAllObjects(map);
//		return model;
//	}
//	/**
//	 * 查出协作组所有角色
//	 * 
//	 * @param request
//	 * @param response
//	 * @return
//	 * @throws Exception
//	 */
//	public ModelAndView role(HttpServletRequest request, HttpServletResponse response) throws Exception {
//		String teamId = request.getParameter("teamId");
//		String id = request.getParameter("id");
//		AdminPermission ap = new AdminPermission(UserSession.get(request),Long.valueOf(teamId));
//		if(! ap.getUserRoleSetting())
//			return null;
//		ModelAndView model = new ModelAndView("/admin/manager/updaterole");
//		Map map = new HashMap();
//		if (teamId != null && id != null) {
//			String HQL = "from Role r where r.teamId = ? or r.id = 0";
//			List<Role> roleList = this.roleService.find(HQL, Long.parseLong(teamId));
//			UserTeamRole userTeamRole = this.userTeamRoleService.get(Long.valueOf(id));// 查出协作组成员信息
//			map.put("roleList", roleList);
//			map.put("userTeamRole", userTeamRole);
//		}
//		model.addAllObjects(map);
//		return model;
//	}


}
