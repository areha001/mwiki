package com.piggysnow.boss.core.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.piggysnow.boss.core.domain.*;
import com.piggysnow.common.dao.HibernateEntityDao;
@Service
public class RoleService extends HibernateEntityDao<Role> {

	public List<Role> getRoles()
	{
		return this.find(" from Role where status >= 0 ");
	}

	public List<Role> getRolesAll()
	{
		return this.find(" from Role where status >= -1 ");
	}
	
	public void setUserRole(Long userId, Long roleId)
	{
		this.execute(" delete from UserTeamRole where userId = ? ", userId);
		UserTeamRole utr = new UserTeamRole();
		utr.setRoleId(roleId);
		utr.setTeamId(1l);
		utr.setUserId(userId);
		this.save(utr);
	}
}
