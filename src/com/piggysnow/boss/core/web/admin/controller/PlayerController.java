package com.piggysnow.boss.core.web.admin.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

import com.piggysnow.boss.core.domain.Dict;
import com.piggysnow.boss.core.interceptor.AdminPermission;
import com.piggysnow.boss.core.services.PartnerService;
import com.piggysnow.boss.core.services.UserService;
import com.piggysnow.boss.core.web.UserSession;

/**
 * 
 * 后台管理--教师管理 
 */

public class PlayerController extends MultiActionController {

	
	private static Logger log = Logger.getLogger(PlayerController.class);
	@Resource
	private UserService userService;
	@Resource
	private PartnerService partnerService;
	public void setPartnerService(PartnerService partnerService) {
		this.partnerService = partnerService;
	}
	/**
	 * 服务器显示
	 */
	//json 跳转
	public ModelAndView page(HttpServletRequest request,
			HttpServletResponse response)throws Exception{ 
		log.error("tanglv=============================================page");
		ModelAndView mav = new ModelAndView("admin/player");
		HashMap actionMap = StaticServiceController.getDictService().getDictIdNameMapByType("actionType");
		mav.addObject("actionMap",actionMap);
		HashMap<String,String> itemInfoMap  = StaticServiceController.getDictService().getItemInfoMap();
		mav.addObject("itemMap",itemInfoMap);
		HashMap<String,String> memberMap  = StaticServiceController.getDictService().getMemberMap();
		mav.addObject("memberMap",memberMap);
		HashMap<String,String> houseMap  = StaticServiceController.getDictService().getHouseMap();
		mav.addObject("houseMap", houseMap);
		HashMap<String,String> petMap  = StaticServiceController.getDictService().getPetMap();
		mav.addObject("petMap", petMap);
		AdminPermission ap = new AdminPermission(UserSession.get(request));
		mav.addObject("canDo", ap.getRole());
		
		
		return mav;
	}
	//json 跳转
	public ModelAndView getShowTeacherInfoJson(HttpServletRequest request,
			HttpServletResponse response)throws Exception{ 
		ModelAndView mav = new ModelAndView("admin/managerPlayer");
		Long did=Long.valueOf(request.getParameter("deptid")==null?"0":request.getParameter("deptid"));
		mav.addObject("deptid", did);
		return mav;
	}

	
//
//
//	//显示所有老师信息
//	public ModelAndView show(HttpServletRequest request,
//			HttpServletResponse response)throws Exception{ 
//		response.setCharacterEncoding("UTF-8");
//		response.setContentType("text/html");
//		//查找用户表中老师信息
//		Long did= 0l;
//		String deptid = request.getParameter("deptid");
//		if(deptid!=null && !"".equals(deptid))
//			did = Long.valueOf(deptid);
//
//		Page page = new Page(request);
//
//		String name=request.getParameter("teacherName");
//		List<User> teacherList=userService.findDeptTeacherList(page, did, name);
//
//		List<UserBean> beanList = copyUserToUserBean(teacherList);
//		userService.addRoleInfo(beanList);
//		String teacherRes=DataFormat.getJsonFormList(page.getTotalResults(),beanList, 0, 25);
//		PrintWriter out = response.getWriter();
//		out.print(teacherRes);
//		out.flush();
//		out.close();
//		return null;
//	}

	
}
