package com.piggysnow.boss.core.interceptor;

import java.util.ArrayList;
import java.util.List;

import com.piggysnow.boss.core.web.UserSession;


/**
 * Admin URL 控制
 * 将某些相同的url的权限于同控制器化作一类处理
 * @author Snow
 *
 */
public class AdminPermission {

	List<String> permissions;
	boolean isAdmin = false;
	
	public AdminPermission(UserSession us)
	{
		permissions = us.getSubRoleNames();
		if(permissions ==null)
			permissions = new ArrayList<String>();
		isAdmin = us.isTeamAdmin(1l);
	}
	
	/**
	 * 是否可以基本信息
	 * */
	public boolean getInfo()
	{
		for(String url : permissions)
		{
			if(url.equals("INFO"))
				return true;
		}
		return isAdmin;
	}

	/**
	 * 是否可以玩家反馈
	 * */
	public boolean getFeedback()
	{
		for(String url : permissions)
		{
			if(url.equals("FEEDBACK"))
				return true;
		}
		return isAdmin;
	}

	
	
	/**
	 * 是否可以管理服务器信息
	 * */
	public boolean getServer()
	{
		for(String url : permissions)
		{
			if(url.equals("SERVER"))
				return true;
		}
		return isAdmin;
	}	

	
	/**
	 * 是否可以角色修改
	 * */
	public boolean getRole()
	{
		for(String url : permissions)
		{
			if(url.equals("ROLE"))
				return true;
		}
		return isAdmin;
	}
	

	/**
	 * 是否可以管理消息推送
	 * */
	public boolean getMsg()
	{
		for(String url : permissions)
		{
			if(url.equals("MSG"))
				return true;
		}
		return isAdmin;
	}	

	/**
	 * 是否可以审核邮件
	 * */
	public boolean getMailPass()
	{
		for(String url : permissions)
		{
			if(url.equals("MPASS"))
				return true;
		}
		return isAdmin;
	}

	/**
	 * 是否可以字典维护
	 * */
	public boolean getDict()
	{
		for(String url : permissions)
		{
			if(url.contains("DICT"))
				return true;
		}
		return isAdmin;
	}
	
	/**
	 * 是否可以邮件发送
	 * */
	public boolean getMail()
	{
		for(String url : permissions)
		{
			if(url.equals("MAIL"))
				return true;
		}
		return isAdmin;
	}

	/**
	 * 是否可以管理禁止用户
	 * */
	public boolean getLock()
	{
		for(String url : permissions)
		{
			if(url.equals("LOCK"))
				return true;
		}
		return isAdmin;
	}

	/**
	 * 是否可以管理礼包
	 * */
	public boolean getGift()
	{
		for(String url : permissions)
		{
			if(url.equals("GIFT"))
				return true;
		}
		return isAdmin;
	}

	/**
	 * 是否可以查看日志
	 * */
	public boolean getHistory()
	{
		for(String url : permissions)
		{
			if(url.equals("HISTORY"))
				return true;
		}
		return isAdmin;
	}
	
	/**
	 * 是否可以管理统计
	 * */
	public boolean getStatistics() {
		for(String url : permissions)
		{
			if(url.equals("STATISTICS"))
				return true;
		}
		return isAdmin;
	}
	
	/**
	 * 是否可以配置修改
	 * */
	public boolean getDeploy() {
		for(String url : permissions)
		{
			if(url.equals("DEPLOY"))
				return true;
		}
		return isAdmin;
	}
	
	/**
	 * 是否可以授权管理
	 * */
	public boolean getAccredit() {
		for(String url : permissions)
		{
			if(url.equals("ACCREDIT"))
				return true;
		}
		return isAdmin;
	}
	
	/**
	 * 是否可以合作方查询
	 * */
	public boolean getChannel() {
		for(String url : permissions)
		{
			if(url.equals("CHANNEL"))
				return true;
		}
		return isAdmin;
	}
	
	/**
	 * 是否可以公告管理
	 * */
	public boolean getNotice() {
		for(String url : permissions)
		{
			if(url.equals("NOTICE"))
				return true;
		}
		return isAdmin;
	}
	
	/**
	 * 是否可以经营分析
	 * */
	public boolean getOperate() {
		for(String url : permissions)
		{
			if(url.equals("OPERATE"))
				return true;
		}
		return isAdmin;
	}
	
	/**
	 * 是否可以查看日报
	 * */
	public boolean getPaper() {
		for(String url : permissions)
		{
			if(url.equals("PAPER"))
				return true;
		}
		return isAdmin;
	}
	
	/**
	 * 是否可以超级权限
	 * */
	public boolean getSuper() {
		for(String url : permissions)
		{
			if(url.equals("SUPER"))
				return true;
		}
		return isAdmin;
	}
}
