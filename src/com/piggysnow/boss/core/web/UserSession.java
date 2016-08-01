package com.piggysnow.boss.core.web;

import java.io.Serializable;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.http.client.methods.HttpPost;

import com.piggysnow.boss.core.domain.User;
import com.piggysnow.boss.core.interceptor.AdminPermission;
import com.piggysnow.boss.core.interceptor.UserPermission;


/**
 * 用户会话
 * 
 */
public class UserSession implements Serializable {
	private static final long serialVersionUID = -1805474021582313531L;
	private User user;
	private User loginTemp;
	private String code = "111";
	private HashMap<Long,List<String>> allowUrls ;	


	public User getLoginTemp() {
		return loginTemp;
	}

	public void setLoginTemp(User loginTemp) {
		this.loginTemp = loginTemp;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	/**
	 * 获取UserSession
	 */
	public static UserSession get(HttpServletRequest request) {
		UserSession userSession = (UserSession)request.getSession().getAttribute("userSession");
		if(userSession==null)
		{
			userSession = new UserSession();
			request.getSession().setAttribute("userSession", userSession);
		}
		return  userSession;
	}
	
	/**
	 * 获取登陆账号的渠道id
	 * @param request
	 * @return
	 */
	public static Long getDepartId(HttpServletRequest request){
		UserSession us = UserSession.get(request);
		User user = us.getUser();
		Long departId = user.getDepartId();
		return departId;
	}
	
	/**
	 * 返回当前组内可以访问的SubRole
	 * */
	public List<String> getSubRoleNames()
	{
		Long defaultTeamId = 1l;
		if(allowUrls == null)
			return null;
		
		return allowUrls.get(defaultTeamId);
	}
	
	/**
	 * 是否是大管理员
	 * */
	public boolean isTeamAdmin(Long id)
	{
		if(user.getTeamAdmin() == 1)
			return true;
		else
			return false;
	}
	
	/**
	 * 获取是否有访问后台的权限
	 */
	public boolean visitTeamAdmin(Long teamId)
	{
		if(!this.isLogin())
			return false;
		//大管理员直接通行
		if(user.getTeamAdmin() == 1)
			return true;
		
		if(allowUrls == null)
			return false;
		//只要有一个权限就通行
		List<String> teamAllowUrls = allowUrls.get(teamId);
		if(teamAllowUrls == null || teamAllowUrls.size() == 0)
			return false;
		return true;
	}

	/**
	 * 获取管理员
	 */
	public boolean getIsAdmin()
	{
		return visitTeamAdmin(1l) ;
	}
	
	/**
	 * 用户是否已登录
	 */
	public boolean isLogin() {
		return (user == null) ? false : true;
	}


	public User getUser() {
		if(user==null)
		{
			user = new User();
			user.setId(1L);
		}
		return user;
	}

	public void logout()
	{
		this.setUser(null);
		this.allowUrls = new HashMap<Long, List<String>>();
	}
	
	public void setUser(User user) {
		this.user = user;
		//取得该用户所有权限
		this.allowUrls = UserPermission.getAllowUrlList(user);
	}

}
