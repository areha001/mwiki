package com.piggysnow.boss.core.web.admin.controller;

import java.io.PrintWriter;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

import com.piggysnow.boss.core.domain.Partner;
import com.piggysnow.boss.core.domain.Role;
import com.piggysnow.boss.core.domain.SubRole;
import com.piggysnow.boss.core.domain.User;
import com.piggysnow.boss.core.domain.UserTeamRole;
import com.piggysnow.boss.core.services.PartnerService;
import com.piggysnow.boss.core.services.RoleService;
import com.piggysnow.boss.core.services.SubRoleService;
import com.piggysnow.boss.core.services.UserService;
import com.piggysnow.boss.core.web.UserSession;
import com.piggysnow.boss.utils.DataFormat;
import com.piggysnow.boss.utils.HappenHelper;

/**
 * 
 *	权限角色管理
 * 
 */
public class RoleManagerController extends MultiActionController {
	
	static Logger log = Logger.getLogger(RoleManagerController.class);
	@Resource
	private UserService userService;
	@Resource
	private RoleService roleService;
	@Resource
	private SubRoleService subRoleService;

	
	public void setRoleService(RoleService roleService) {
		this.roleService = roleService;
	}
	public void setUserService(UserService userService) {
		this.userService = userService;
	}

	private PartnerService deptService;
	public void setDeptService(PartnerService deptService) {
		this.deptService = deptService;
	}
	/**
	 * 部门显示
	 */
	//json 跳转
	public ModelAndView getShowInfo(HttpServletRequest request,
			HttpServletResponse response)throws Exception{ 
		ModelAndView mav = new ModelAndView("admin/managerRole");
		return mav;
	}

	//显示部门列表
	public ModelAndView showRoleList(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html");
		//显示所有的部门信息
		List<Role> roleList = roleService.getRoles();
		
		if(request.getParameter("x")!=null)
			roleList = roleService.getRolesAll();
		//获取Json 并分页显示
		String deptRes=DataFormat.getJsonFormList(roleList.size(),roleList);
		PrintWriter out = response.getWriter();
		out.print(deptRes);
		log.info(deptRes);
		out.flush();
		out.close();
		return null;
	}

	//显示部门列表
	public ModelAndView showRoleAllList(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html");
		//显示所有的部门信息
		List<Role> roleList = roleService.getRolesAll();
		//获取Json 并分页显示
		String deptRes=DataFormat.getJsonFormList(roleList.size(),roleList);
		PrintWriter out = response.getWriter();
		out.print(deptRes);
		out.flush();
		out.close();
		return null;
	}
	/***
	 * 显示角色列表
	 */
	public ModelAndView showSubRoleList(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html");
		//显示所有的部门信息
		List<SubRole> roleList = subRoleService.getAll();
		//获取Json 并分页显示
		String deptRes=DataFormat.getJsonFormList(roleList.size(),roleList);
		PrintWriter out = response.getWriter();
		out.print(deptRes);
		log.info(deptRes);
		out.flush();
		out.close();
		return null;
	}
	/**
	 * 添加及修改角色
	 * */
	public ModelAndView roleSetting(HttpServletRequest request,
			HttpServletResponse response) throws Exception{
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html,charset=UTF-8");
		String roleId = request.getParameter("roleId");
		String roleName = request.getParameter("roleName");
		String[] subRoleIds = request.getParameterValues("subRoleIds");
		
		Role r = new Role();
		if(!"".equals(roleId))
			r = roleService.get(Long.valueOf(roleId));
		r.setName(roleName);
		r.setDescription(roleName);
		Set set = new HashSet();
		Set nameSet = new HashSet();
		if(subRoleIds!=null)
		for(String srid : subRoleIds){
			SubRole sr = subRoleService.get(Long.valueOf(srid));
			set.add(sr);
			nameSet.add(sr.getName());
		}
		
		r.setSubRoles(set);
		roleService.save(r);

		HappenHelper.create(UserSession.get(request).getUser(), "修改了权限配置" + roleName + "SUBROLE=" + nameSet);
		//判断是否输入的是重复部门名称
		PrintWriter out = response.getWriter();
		String printRes = "{'success':true}";
		
		out.print(printRes);
		out.flush();
		out.close();
		return null;

	}

	/*
	 * 部门信息修改
	 */

	/**
	 * 删除Role
	 * */
	public ModelAndView deleteRole(HttpServletRequest request,
			HttpServletResponse response)throws Exception{ 
		//从页面出取出要记录的ID
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html,charset=UTF-8");
		String printRes = "{'success':true,'data':'失败!'}";
		String[] ids = request.getParameterValues("ids");
		StringBuilder sb = new StringBuilder("");
		
		if(ids!=null)
		{
			for(String id :ids)
			{
				Role r = roleService.get(Long.valueOf(id));
				List<UserTeamRole> utr = userService.findList(" from UserTeamRole where roleId = ? ", r.getId());
				if(utr.size()>0)
				{
					sb.append(r.getName() + " ");
					continue;
				}
				r.setStatus(-2);
				roleService.save(r);
			}
		}
		if(!"".equals(sb.toString()))
		{
			sb.append(" 角色因被分配给用户，无法删除");
		}
		PrintWriter out = response.getWriter();
		printRes = "{'success':true ,'data' : '" + sb.toString() + "'}";
		out.print(printRes);
		out.flush();
		out.close();
		return null;
	}	
	
	public ModelAndView setUserRole(HttpServletRequest request, HttpServletResponse response) throws Exception {

		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html,charset=UTF-8");
		String[] userIds = request.getParameterValues("userIds");
		String roleName = request.getParameter("roleName");
		Role role = roleService.findOne(" from Role where name = ? ", roleName);
		String userNames = "";
		for(String userIdStr : userIds)
		{
			Long userId = Long.valueOf(userIdStr);
			User targetUser = userService.find(userId);
			userNames = userNames+ targetUser.getName() + ",";
			roleService.setUserRole(userId, role.getId());
		}

		HappenHelper.create(UserSession.get(request).getUser(), "修改了"+userNames+"的权限，设置为" + roleName );
		response.getWriter().write("{'success':true}");
		return null;
	}

	//修改部门信息
	public ModelAndView extUpdateDept(HttpServletRequest request,
			HttpServletResponse response) throws Exception{
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html,charset=UTF-8");
		//从页面出取出要记录的ID
		String printRes = "{'success':true,'data':'失败!'}";
		String id = request.getParameter("id");//与js中的hiddenName:"id",名字一致
		Long deptId=Long.parseLong(id);
		//从数据库查出对应实体对象
		Partner dept = deptService.get(deptId);
		String name=request.getParameter("name");
		String code=request.getParameter("dcode");
		//根据年度和学期查出此表是否有相同的记录
		List<Partner> deptFindList=deptService.findAddPartnerList(name,Long.valueOf(code));
		PrintWriter out = response.getWriter();
		if(dept == null)
		{
			printRes = "{'success':true,'data':'无记录ID！'}";
		}

		//如果有相同的一条重得记录，则修改部门信息失败
		if(deptFindList.size()>=1){
			//该学期信息已存在，提示重复信息，并停留在添加页面
			printRes = "{'success':false,'info':'该部门已重复设置.'}";//信息
		}
		else
		{
			//修改
			Integer status=Integer.valueOf(request.getParameter("status"));
			dept.setName(name);
			dept.setDcode(code);
			dept.setStatus(status);
			deptService.save(dept);	
			printRes = "{'success':true,'info':'修改成功！'}";							

		}

		out.print(printRes);
		out.flush();
		out.close();
		return null;	
	}	

	
	//删除选中部门记录																			
	public ModelAndView extDeleteDeptRows(HttpServletRequest request,
			HttpServletResponse response)throws Exception{ 
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html,charset=UTF-8");
    	String []CheckedDeptList=request.getParameterValues("CheckDeptList");
    	log.info(">>>>>>>>>>>>>>>>>>>>>>>>>>>"+CheckedDeptList);
		
		String printRes = "{'success':true}";
		try{
		for(String itemID:CheckedDeptList){
		Partner dept = deptService.get(Long.parseLong(itemID));
		deptService.remove(dept);
		}
		printRes = "{'success':true}";
		}catch(Exception ex){
			ex.printStackTrace();
		}
		PrintWriter out = response.getWriter();
		out.print(printRes);
		out.flush();
		out.close();
		return null;
	}

	/*
	 * 按关键字查找部门的记录
	 */
	public ModelAndView searchDeptByName(HttpServletRequest request,
			HttpServletResponse response)throws Exception{ 
		response.setCharacterEncoding("UTF-8");

		String name=request.getParameter("name");
		name= new String(name.getBytes("ISO-8859-1"),"UTF-8");
       //按名字查询部门记录
		List deptList = deptService.serchByName(name);
    	//获取Json并分页
		String deptRes = DataFormat.getJsonFormList(deptList.size(), deptList, Long.valueOf(request.getParameter("start")),Long.valueOf(request.getParameter("limit")));
		PrintWriter out = response.getWriter();
		out.print(deptRes);
		out.flush();
		out.close();
		return null;

	}
	public void setSubRoleService(SubRoleService subRoleService) {
		this.subRoleService = subRoleService;
	}



}
