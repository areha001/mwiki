package com.piggysnow.boss.core.interceptor;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Set;

import com.piggysnow.boss.core.domain.Role;
import com.piggysnow.boss.core.domain.SubRole;
import com.piggysnow.boss.core.domain.User;
import com.piggysnow.boss.core.domain.UserTeamRole;
import com.piggysnow.boss.core.web.admin.controller.StaticServiceController;


/**
 * 权限拦截器
 * @author wangy
 *
 */
public class UserPermission {


	/**
	 * 获取用户所拥有的权限
	 * */
	public static HashMap<Long,List<String>> getAllowUrlList(User u){

		if(u != null)
		{
			HashMap<Long,List<String>> map = new HashMap<Long,List<String>>();
			List<Object[]> utrList = StaticServiceController.getService().findList(" from UserTeamRole utr" +
					" , Role r  where utr.roleId = r.id and utr.userId = ? 	", u.getId());
			for(Object[] utrInfo : utrList)
			{
				UserTeamRole utr = (UserTeamRole)utrInfo[0];
				Role r = (Role)utrInfo[1];
				List<String> permission = map.get(utr.getTeamId());
				if(permission==null)
				{
					permission = new ArrayList<String>();
					map.put(utr.getTeamId(), permission);
				}
				Set<SubRole> srList = r.subRoles;
				for(SubRole sr : srList)
				{
					permission.add(sr.getUrl());
				}
				
			}
			return map;
		}
		return null;
	}
	

}
