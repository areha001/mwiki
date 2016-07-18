package com.piggysnow.boss.core.web.admin.controller;

import java.io.PrintWriter;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

import com.piggysnow.boss.core.domain.User;
import com.piggysnow.boss.core.services.UserService;
import com.piggysnow.boss.core.web.UserSession;

/**
 * 
 *@author fqzhang 后台管理--修改管理员密码
 * 
 */


public class UpdateAdminPasswordController extends MultiActionController {
	
	static Logger log = Logger.getLogger(UpdateAdminPasswordController.class);
	
	@Resource
	private UserService userService;


	/**
	 * 修改管理员密码
	 */
	public ModelAndView updateAdminPassword(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		response.setCharacterEncoding("utf-8");
		PrintWriter out = response.getWriter();
		String printRes = "{'success':false}";
		String oldpass=request.getParameter("oldpass");
		String newpass=request.getParameter("newpass");
		String confirmNewPassword=request.getParameter("confirmNewPassword");
		//ModelAndView mav=new ModelAndView("UpdateAdminPassword");
		//从session中取当前登录用户
		User user = userService.find(UserSession.get(request).getUser().getId());
			//判断旧密码和数据库中的密码是否一致
		try{
			if(!user.getPassword().equals(oldpass)) {
				
				printRes = "{'success':false,'info':'原密码输入有误！！'}";//信息
			}
		    else
		    {
					//修改密码
					user.setPassword(newpass);
					userService.UpdatePassword(user);
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


	public void setUserService(UserService userService) {
		this.userService = userService;
	}
}
