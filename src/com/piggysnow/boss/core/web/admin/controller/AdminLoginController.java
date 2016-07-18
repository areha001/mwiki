package com.piggysnow.boss.core.web.admin.controller;
import java.io.PrintWriter;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map.Entry;
import java.util.Random;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

import com.piggysnow.boss.core.domain.User;
import com.piggysnow.boss.core.interceptor.AdminPermission;
import com.piggysnow.boss.core.services.ServerService;
import com.piggysnow.boss.core.services.UserService;
import com.piggysnow.boss.core.web.UserSession;
import com.piggysnow.mail.MailAuth;
import com.piggysnow.boss.core.domain.Server;
/**
 * 
 *@author fqzhang 后台登录
 *
 */


public class AdminLoginController extends MultiActionController {
	
	static Logger log = Logger.getLogger(AdminLoginController.class);
	@Resource
	private UserService userService;
	@Resource
	private ServerService serverService;
	public void setServerService(ServerService serverService) {
		this.serverService = serverService;
	}
	

	//实现登录后的跳转
	public ModelAndView admin(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		response.setCharacterEncoding("UTF-8");
		ModelAndView mav = new ModelAndView("admin/login");
		return mav;
	}
	/*
	 * 登录
	 */
	public ModelAndView adminLogin(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		ModelAndView mav = new ModelAndView("admin/main");
		//后台管理设置了二种登录方式，一种是通过前台登录跳到后台管理页面，另一种是通过单独的原来的后台登录istudy/admin/login.html方式进入后台
		//下面是断此管理员如果已从前台登录，直接跳入登录后的页面  如果不进行判断前台登录之后则会跳到后台登录的页面
		UserSession us = UserSession.get(request);
		if(us.getIsAdmin()){  //已经 登录的管理员
			String realName= us.getUser().getName();
			mav.addObject("realName",realName);
			mav.addObject("adminPermission", new AdminPermission(UserSession.get(request)));
			return mav;
		}
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		ModelAndView mav1= new ModelAndView("admin/login");
		ModelAndView mav2= new ModelAndView("admin/2ndlogin");
		String loginName=request.getParameter("loginName");
		String password=request.getParameter("password");

		//User user = userService.findOneByHql(" from User where loginName = ?", loginName);
		User user = userService.findUserInfo(loginName);
		
		if(user == null) {
			mav1.addObject("message","该用户不存在或密码错误！");
		} 
		else
		{
			UserSession.get(request).setLoginTemp(user);
			String code = "123";
			if(isVaildEmail(user)){
				code = String.valueOf(new Random().nextInt(500000)+1000000);
				MailAuth.sendCodeMail(user.getEmail(), code);
			}
			UserSession.get(request).setCode(code);
			
			if(!user.getPassword().equals(password)) {
				mav1.addObject("message","密码错误！请重新登录。。。");
				return mav1;
			}
			else
			{
				return mav2;
			}
		}
		return mav1;
	}
	private boolean isVaildEmail(User user){
		String email = user.getEmail();
		if( email ==null || "".equals(email)){
			return false;
		}
		if(!email.contains("@") || !email.contains("."))
		{
			return false;
		}
		return true;
	}
	public ModelAndView adminLogin2nd(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		ModelAndView mav1= new ModelAndView("admin/login");
		ModelAndView mav = new ModelAndView("admin/main");
		String code=request.getParameter("code");
		
		UserSession us = UserSession.get(request);
		User user = us.getLoginTemp();
		if(user == null) {
			mav1.addObject("message","该用户不存在或密码错误！");
			return mav1;
		} 
		String randomCode = us.getCode();
		if(!code.equals(randomCode)) {
			mav1.addObject("message","验证码不正确。。。");
			return mav1;
		}
		us.setUser(user);
		user.setLastLoginTime(new Date());
        userService.save(user);

		if(!us.getIsAdmin()) {
			mav1.addObject("message","您没有权限，请重新登录。。。");
			return mav1;
		}
		mav.addObject("realName",user.getName());
		mav.addObject("adminPermission", new AdminPermission(UserSession.get(request)));
		return mav;
	}

	
	public ModelAndView genJs2(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String groupType = request.getParameter("groupType");
		
		List<Server> listServer = serverService.findList();
		String[] groups = {"GAME","DATA","LOGIN"};
		//  Map<GAME1, ["192.168.50.159", "8651", "GAME100_RAX", "GAME100"]>
		HashMap<String, String> subretMap = new HashMap<String, String>();
		//  Map<LOGIN_DEFAULT, "LOGIN_RAX">
		HashMap<String, String> defSubName = new HashMap<String, String>();
		
		// Map<GAME, [GAME1,GAME2]>
		HashMap<String, String> xgroup = new HashMap<String, String>();
		
		String memcached = "";
		
		for(String group : groups){
			int i= 1;
			String xsubNameList = "";
			for(Server server : listServer){
				
				if(server.groupName.equals(group) && server.groupType.equals(groupType)){
					subretMap.put(group + i, "[\"" + server.innerAddr.split(":")[0] + "\", \""
							 + server.innerAddr.split(":")[1] + "\", \"" +  server.subName + "\", \"" 
							+ server.clusterName  +"\"]");
					if(!defSubName.keySet().contains(group + "_DEFAULT")){
						defSubName.put(group +"_DEFAULT", "\""+server.subName + "\"");
					}
					
					if(!xsubNameList.isEmpty()){
						xsubNameList = xsubNameList + ", " + group+i;
					}else{
						xsubNameList = group+i;
					}
					i++;
				}
			}
			xgroup.put(group, "[" + xsubNameList  + "]");
		}
		
		
		for(String group : groups){
			if(!defSubName.keySet().contains(group + "_DEFAULT")){
				Server defaultSevr = new Server();
				for(Server server : listServer){
					if(server.groupType.equals("DEFAULT") && server.groupName.equals(group)){
						defaultSevr = server;
						break;
					}
				}
				subretMap.put(group + "1", "[\"" + defaultSevr.innerAddr.split(":")[0] + "\", \""
						 + defaultSevr.innerAddr.split(":")[1] + "\", \"" +  defaultSevr.subName + "\", \"" 
						+ defaultSevr.clusterName  +"\"]");
				defSubName.put(group +"_DEFAULT", "\"" + defaultSevr.subName + "\"");
				xgroup.put(group, "[" +group+1 + "]");
			}
		}
		
		
		for(Server server : listServer){
			if("CACHE".equals(server.groupName) && server.groupType.equals(groupType)){
				memcached = "var MEMCACHED = " + "\"" + server.outAddr + "\"";
				break;
			}
		}
		
		if(memcached.isEmpty()){
			for(Server server : listServer){
				if("CACHE".equals(server.groupName) && server.groupType.equals("DEFAULT")){
					memcached = "var MEMCACHED = " + "\"" + server.outAddr + "\"";
					break;
				}
			}
		}
		
		StringBuffer result = new StringBuffer();
	    Iterator i = subretMap.entrySet().iterator();  
	    while(i.hasNext()){  
	        Entry entry=(Entry)i.next();  
	        String key=(String)entry.getKey();  
	        String value=(String)entry.getValue();
	        result.append("var " + key + " = " + value);
	        result.append("<BR>");
	    }  
	    result.append("<BR>");
	    result.append("<BR>");
	    
	    Iterator i2 = xgroup.entrySet().iterator();  
	    while(i2.hasNext()){  
	        Entry entry=(Entry)i2.next();  
	        String key=(String)entry.getKey();  
	        String value=(String)entry.getValue();
	        result.append("var " + key + " = " + value);
	        result.append("<BR>");
	    }  
	    result.append("<BR>");
	    result.append("<BR>");
	    
	    Iterator i3 = defSubName.entrySet().iterator();  
	    while(i3.hasNext()){  
	        Entry entry=(Entry)i3.next();  
	        String key=(String)entry.getKey();  
	        String value=(String)entry.getValue();
	        result.append("var " + key + " = " + value);
	        result.append("<BR>");
	    }  
	    
	    result.append("<BR>");
	    result.append("<BR>");
	    result.append(memcached);
	    
	    response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		out.print(result);
		out.flush();
		out.close();
		
		return null;
	}
	
	
	public ModelAndView genJs(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String groupType = request.getParameter("groupType");
		
		List<Server> listServer = serverService.findList();
		String[] groups = {"GAME","DATA","LOGIN"};
		//  Map<GAME1, ["192.168.50.159", "8651", "GAME100_RAX", "GAME100"]>
		HashMap<String, String> subretMap = new HashMap<String, String>();
		//  Map<LOGIN_DEFAULT, "LOGIN_RAX">
		HashMap<String, String> defSubName = new HashMap<String, String>();
		
		// Map<GAME, [GAME1,GAME2]>
		HashMap<String, String> xgroup = new HashMap<String, String>();
		
		String memcached = "";
		
		for(String group : groups){
			int i= 1;
			String xsubNameList = "";
			for(Server server : listServer){
				
				if(server.groupName.equals(group) && server.groupType.equals(groupType)){
					subretMap.put(group + i, "[\"" + server.innerAddr.split(":")[0] + "\", \""
							 + server.innerAddr.split(":")[1] + "\", \"" +  server.subName + "\", \"" 
							+ server.clusterName  +"\"]");
					if(!defSubName.keySet().contains(group + "_DEFAULT")){
						defSubName.put(group +"_DEFAULT", "\""+server.subName + "\"");
					}
					
					if(!xsubNameList.isEmpty()){
						xsubNameList = xsubNameList + ", " + group+i;
					}else{
						xsubNameList = group+i;
					}
					i++;
				}
			}
			xgroup.put(group, "[" + xsubNameList  + "]");
		}
		
		
		for(String group : groups){
			if(!defSubName.keySet().contains(group + "_DEFAULT")){
				Server defaultSevr = new Server();
				for(Server server : listServer){
					if(server.groupType.equals("DEFAULT") && server.groupName.equals(group)){
						defaultSevr = server;
						break;
					}
				}
				subretMap.put(group + "1", "[\"" + defaultSevr.innerAddr.split(":")[0] + "\", \""
						 + defaultSevr.innerAddr.split(":")[1] + "\", \"" +  defaultSevr.subName + "\", \"" 
						+ defaultSevr.clusterName  +"\"]");
				defSubName.put(group +"_DEFAULT", "\"" + defaultSevr.subName + "\"");
				xgroup.put(group, "[" +group+1 + "]");
			}
		}
		
		
		for(Server server : listServer){
			if("CACHE".equals(server.groupName) && server.groupType.equals(groupType)){
				memcached = "var MEMCACHED = " + "\"" + server.outAddr + "\"";
				break;
			}
		}
		
		if(memcached.isEmpty()){
			for(Server server : listServer){
				if("CACHE".equals(server.groupName) && server.groupType.equals("DEFAULT")){
					memcached = "var MEMCACHED = " + "\"" + server.outAddr + "\"";
					break;
				}
			}
		}
		
		StringBuffer result = new StringBuffer();
	    Iterator i = subretMap.entrySet().iterator();  
	    while(i.hasNext()){  
	        Entry entry=(Entry)i.next();  
	        String key=(String)entry.getKey();  
	        String value=(String)entry.getValue();
	        log.info("var " + key + " = " + value);
	    }  
	
	    
	    Iterator i2 = xgroup.entrySet().iterator();  
	    while(i2.hasNext()){  
	        Entry entry=(Entry)i2.next();  
	        String key=(String)entry.getKey();  
	        String value=(String)entry.getValue();
	        log.info("var " + key + " = " + value);
	    }  
	    
	    Iterator i3 = defSubName.entrySet().iterator();  
	    while(i3.hasNext()){  
	        Entry entry=(Entry)i3.next();  
	        String key=(String)entry.getKey();  
	        String value=(String)entry.getValue();
	        log.info("var " + key + " = " + value);
	    }  
	    
	 
	    log.info("memcached:" + memcached);
	    
	    
	    response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		out.print(result);
		out.flush();
		out.close();
		
		return null;
	}
	
	
	
	/*
	 * 注销
	 * 
	 */
	public ModelAndView exit(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		response.setCharacterEncoding("UTF-8");
		//退回到登录页面
		ModelAndView mav=new ModelAndView("admin/login");
		//清空session中的用户信息
		UserSession.get(request).setUser(null);
		return mav;
	}
	public void setUserService(UserService userService) {
		this.userService = userService;
	}


}
