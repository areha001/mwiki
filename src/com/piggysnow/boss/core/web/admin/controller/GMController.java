package com.piggysnow.boss.core.web.admin.controller;

import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

import com.piggysnow.boss.core.domain.Partner;
import com.piggysnow.boss.core.domain.User;
import com.piggysnow.boss.core.domain.UserBean;
import com.piggysnow.boss.core.services.PartnerService;
import com.piggysnow.boss.core.services.UserService;
import com.piggysnow.boss.utils.DataFormat;
import com.piggysnow.common.dao.Page;

/**
 * 
 * 后台管理--GM管理 
 */

public class GMController extends MultiActionController {

	
	static Logger log = Logger.getLogger(GMController.class);
	@Resource
	private UserService userService;
	@Resource
	private PartnerService partnerService;
	/*
	 * GM信息记录显示
	 */

	//json 跳转
	public ModelAndView getShowTeacherInfoJson(HttpServletRequest request,
			HttpServletResponse response)throws Exception{ 
		ModelAndView mav = new ModelAndView("admin/managerTeacher");
		Long did=Long.valueOf(request.getParameter("deptid")==null?"0":request.getParameter("deptid"));
		mav.addObject("deptid", did);
		return mav;
	}

	
	public void setPartnerService(PartnerService partnerService) {
		this.partnerService = partnerService;
	}


	//显示所有GM信息
	public ModelAndView showTeacherInfo(HttpServletRequest request,
			HttpServletResponse response)throws Exception{ 
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html");
		//查找用户表中GM信息
		Long did= 0l;
		String deptid = request.getParameter("deptid");
		if(deptid!=null && !"".equals(deptid))
			did = Long.valueOf(deptid);

		Page page = new Page(request);

		String name=request.getParameter("teacherName");
		List<User> teacherList=userService.findDeptTeacherList(page, did, name);

		List<UserBean> beanList = copyUserToUserBean(teacherList);
		userService.addRoleInfo(beanList);
		String teacherRes=DataFormat.getJsonFormList(page.getTotalResults(),beanList, 0, 25);
		PrintWriter out = response.getWriter();
		out.print(teacherRes);
		out.flush();
		out.close();
		return null;
	}

	//添加GM记录
	public ModelAndView addTeacher(HttpServletRequest request,
			HttpServletResponse response)throws Exception{ 
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html,charset=UTF-8");
		PrintWriter out = response.getWriter();
		String printRes = "{'success':false}";
		String loginName=request.getParameter("loginName");//用户名
		String realName=request.getParameter("realName");//姓名
		String password=request.getParameter("password");//登录密码 
		String email=request.getParameter("email");
		String departId=request.getParameter("departId");
		//判断是否输入 重得的登录名信息
		List<User> teacherFindList=userService.findList(" from User where userName = ? ",loginName);
		try{
			if(teacherFindList.size() >= 1)
			{	
				//该用户已存在，提示重复信息，并停留在添加页面
				printRes = "{'success':false,'info':'该用户已存在.'}";//信息
			}
			else
			{
				//添加
				User user=new User();//用户表
				user.setUsername(loginName);
				user.setName(realName);
				user.setPassword(password);
				user.setEmail(email);
				if(departId!=null && !"".equals(departId)){
					user.setDepartId(Long.valueOf(departId));
				}
				userService.save(user);
				printRes = "{'success':true}";//信息
			}
		}catch(Exception ex){
			ex.printStackTrace();
		}
		out.print(printRes);
		out.flush();
		out.close();
		return null;
	}

	/**
	 * 把User属性转移到UserBean上
	 * */
	private List<UserBean> copyUserToUserBean(List<User> teacherList)
	{
		List<UserBean> ubList = new ArrayList<UserBean>();
		for(int i=0;i<teacherList.size();i++){
			User user=teacherList.get(i);
			UserBean userbean=new UserBean();
			if(user.getDepartId()!=null&&user.getDepartId()>0){
				Partner dept=partnerService.tryGet(user.getDepartId());
				if(dept!=null)
					userbean.setDepartName(dept.getName());
			}
		
			userbean.setDepartId(user.getDepartId());
			userbean.setEmail(user.getEmail());
			userbean.setId(user.getId());
			userbean.setJobTime(user.getJob());
			userbean.setPassword(user.getPassword());
			userbean.setLoginName(user.getLoginName());
			userbean.setRealName(user.getRealName());
			userbean.setTeamAdmin(user.getTeamAdmin());
			userbean.setLastLogin(user.getLastLoginTime());
			ubList.add(userbean);
		}
		return ubList;
	}
	/**
	 * 	
	 *GM信息修改
	 */
	//首先获取要修改的GM信息
	public ModelAndView getTeacherInfoById(HttpServletRequest request,
			HttpServletResponse response)throws Exception{ 
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html,charset=UTF-8");
		String printRes = "{'success':false}";
		Long teacherid=Long.parseLong(request.getParameter("teacherid"));//从managerTeacher.js中load时传过来的
		User user=userService.find(teacherid);
		PrintWriter out = response.getWriter();
		if(user == null)
		{
         //如果为空，不作任何操作
		}
		else
		{
			String email=user.getEmail()==null?"":user.getEmail();
			//printRes将在managerTeacher.js中success:function(form,action)加载成功的处理函数中设值(修改的数据值)
			printRes = "{'success':true,'data':{" +
			"'id':'" + user.getId()+ "'," +
			"'loginName':'" + user.getUsername()+ "'," +
			"'realName':'" + user.getName()+ "'," +
			"'password':'" + user.getPassword()+ "'," +
			"'email':'" +email+ "'," +
			" }}";
		}
        log.info(printRes);
		out.print(printRes);
		out.flush();
		out.close();
		return null;
	}	
	
	//修改 GM信息
	public ModelAndView updateTeacherInfo(HttpServletRequest request,
			HttpServletResponse response) throws Exception{
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html,charset=UTF-8");
		PrintWriter out = response.getWriter();
		String printRes = "{'success':false}";
		Long teacherid=Long.parseLong(request.getParameter("id"));
		User user=userService.find(teacherid);
		//判断修改的GM在表中已存在
		String a = request.getParameter("loginName");
		List<User> findTeacherList = userService.findUpdateTeacherList(request.getParameter("loginName"), teacherid);
		try{
		if(user == null)
		{
			printRes = "{'success':false,'info':'修改的用户不存在！'}";
		}
		if(findTeacherList.size() >= 1)
		{	
			//该GM已存在，提示重复信息，并停留在修改页面
			printRes = "{'success':false,'info':'该用户已存在.'}";//信息
		}
		else
		{
			String loginName=request.getParameter("loginName");//用户名
			String realName=request.getParameter("realName");//真实姓名
			String password=request.getParameter("password");//登录密码 
			String email=request.getParameter("email"); //电子邮件
			//修改
			user.setUsername(loginName);
			user.setName(realName);
			user.setPassword(password);
			user.setEmail(email);
			String departIdStr =  request.getParameter("departId");
			if(!"".equals(departIdStr)){
				user.setDepartId(Long.valueOf(request.getParameter("departId")));
			}
			else{
				user.setDepartId(null);
			}
			userService.save(user);
			printRes = "{'success':true,'info':'修改成功！'}";
		}
		}catch(Exception ex){
			ex.printStackTrace();
		}
		out.print(printRes);
		log.info(printRes);
		out.flush();
		out.close();
		return null;		
	}	

	
    //删除选中的GM记录													
	public ModelAndView deleteTeacherRows(HttpServletRequest request,
			HttpServletResponse response) throws Exception{
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html,charset=UTF-8");
		//获取页面传来选择中的ID列表
		String CheckTeacherList = request.getParameter("teacherList");
		//	System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>"+CheckTeacherList);
		String[] CheckTeacherList1 = CheckTeacherList.split(",");
		//循环取出对应的ID并做处理
		String res = "{success:false}";
		try{
			for(String itemID:CheckTeacherList1){
				User user=userService.find(Long.parseLong(itemID));
				user.setPassword(user.getUsername());
				user.setUsername("该用户已删除@deprecated@");
				user.setStatus(-3);
				userService.save(user);
			}
			res = "{success:true}";
		}catch(Exception ex){
			ex.printStackTrace();
		}
		PrintWriter out = response.getWriter();
		out.print(res);
		out.flush();
		out.close();
		return null;	

	}
	
	
	 //设为大管理员												
	public ModelAndView setAdmin(HttpServletRequest request,
			HttpServletResponse response) throws Exception{
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html,charset=UTF-8");
		//获取页面传来选择中的ID列表
		String CheckTeacherList = request.getParameter("teacherList");
		//	System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>"+CheckTeacherList);
		String[] CheckTeacherList1 = CheckTeacherList.split(",");
		//循环取出对应的ID并做处理
		String res = "{success:false}";
		try{
			for(String itemID:CheckTeacherList1){
				User user=userService.find(Long.parseLong(itemID));
				if(user.getTeamAdmin()==1){
					user.setTeamAdmin(0);
				}else{
					user.setTeamAdmin(1);
				}
				userService.save(user);
			}
			res = "{success:true}";
		}catch(Exception ex){
			res = "{success:false}";
	  	//	ex.printStackTrace();
		}
		PrintWriter out = response.getWriter();
		out.print(res);
		out.flush();
		out.close();
		return null;	

	}
	
	
	/**
	 *
	 * 按姓名查找GM信息
	*/
	public ModelAndView searchTeacherByName(HttpServletRequest request,
			HttpServletResponse response)throws Exception{ 
		
	String teacherName=request.getParameter("teacherName");
	teacherName=new String(teacherName.getBytes("ISO-8859-1"),"UTF-8");

	List<User> teacherList=userService.searchByTeacherNameList(teacherName);
	//获取Json 并分页显示GM信息
	List<UserBean> beanList = copyUserToUserBean(teacherList);
	String teacherRes=DataFormat.getJsonFormList(beanList.size(),beanList, 0, 25);
	PrintWriter out = response.getWriter();
	out.print(teacherRes);
	out.flush();
	out.close();
	return null;
	}
	

	//点击某个GM的【授课信息--查看 】链接 ，显示GM授课相关信息
	//json跳转
	public ModelAndView getTeacherClazzCourseJson(HttpServletRequest request,
			HttpServletResponse response)throws Exception{ 
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html,charset=UTF-8");
		//从页面取出teacherId
		Long teacherId=Long.parseLong(request.getParameter("teacherId"));
		User user=userService.find(teacherId);
		String teacherName=user.getName();
		ModelAndView mav = new ModelAndView("admin/findTeacherClazzCourse");
		mav.addObject("teacherId", teacherId);//传入findTeacherClazzCourse.jsp   
		mav.addObject("teacherName",teacherName);
		return mav;
	}

	public ModelAndView departJosn(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
 		 
		response.setContentType("text/html");
		String resulte = "";
		List<Partner> list = null;
		try {
			list = partnerService.findList();
			StringBuilder sb = new StringBuilder();
			sb.append("[");
			if(request.getParameter("withBlank")!=null)
				sb.append("{'id':'0', 'text':'不限'},");
			for (Partner sub : list) {
				if(sub.getId()>0){
					sb.append("{'id':'" + sub.getId()  + "','dcode':'" + sub.getDcode()+ 
							"','text':'" + sub.getName() + "'},");
				}
			}
			sb.append("]");
			resulte= sb.toString().replace(",]", "]");
		} catch (Exception e) {
			e.printStackTrace();
		}
		response.setContentType("text/plain;charset=UTF-8");
		response.getWriter().print(resulte);
		response.getWriter().flush();
		response.getWriter().close();
		return null;
	}
	public void setUserService(UserService userService) {
		this.userService = userService;
	}

	
}
