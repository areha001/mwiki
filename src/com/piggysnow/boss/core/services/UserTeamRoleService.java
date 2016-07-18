package com.piggysnow.boss.core.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.piggysnow.boss.core.domain.*;
import com.piggysnow.common.dao.HibernateEntityDao;
import com.piggysnow.common.dao.Page;
import com.piggysnow.common.utils.TimeUtil;
@Service
public class UserTeamRoleService extends HibernateEntityDao<UserTeamRole> {
	
	
	
	//以下部分均为过期代码
	/**
	 * 查询协作组审核用户
	 * 
	 * 
	 */
	@Deprecated
	public List<Object[]> userTeamManager(Long teamId, Integer status) {
		String HQL = "from UserTeamRole ut,User u,Team t,Role r where ut.teamId=? and ut.status=?  and ut.userId=u.id and ut.teamId=t.id and ut.roleId=r.id"
				+ " order by ut.joinTime desc";
		List<Object[]> list = this.find(HQL, teamId, status);
		return list;
	}

	/**
	 * 查询协作组成员
	 * 
	 * @return
	 */
	public List<Object[]> userTeamManagers(Page page, Long teamId,
			Integer status){
		return userTeamManagers(page, teamId, status, null);
	}
	public List<Object[]> userTeamManagers(Page page, Long teamId,
			Integer status, String name) {
		List<Object[]> list = null;
		List values = new ArrayList();
		StringBuffer HQL = new StringBuffer(
				"from UserTeamRole ut,User u,Team t,Role r ");
		HQL.append(" where 1=1  ");
		if (teamId != null) {
			HQL.append(" and ut.teamId=? ");
			values.add(teamId);
		}
		if (status != null) {
			HQL.append(" and ut.status=? ");
			values.add(status);
		}
		if (name != null){
			HQL.append(" and u.name like ? ");
			values.add("%"+name+"%");
		}
		HQL.append(" and ut.teamId=t.id ");
		HQL.append("  and ut.userId=u.id and ut.roleId=r.id ");
		list = this.findPage(page, HQL.toString(), values.toArray());
		return list;
	}

	/**
	 * 判定用户是组成员
	 */
	public boolean isTeamUser(Long teamId, Long userId) {
		String hql = " from UserTeamRole where teamId = ? and userId = ? and status >= ? ";
		List list = this.find(hql, teamId, userId, UserTeamRole.STATUS_PASS);
		if (list.size() > 0)
			return true;
		else
			return false;
	}
	
	public void setTeamAdmin(Long teamId, Long userId)
	{
		UserTeamRole utr = (UserTeamRole) findOne("from UserTeamRole where teamId = ? and userId = ? ", 
				teamId, userId);
		if(utr!=null)
		{
			if(Role.TEAM_ADMIN.equals(utr.getRoleId()))
				return;
			this.execute("update UserTeamRole set roleId = ? where teamId = ? and roleId = ?", 
					Role.NORMAL, teamId, Role.TEAM_ADMIN);
			utr.setRoleId(Role.TEAM_ADMIN);
			utr.setStatus(UserTeamRole.STATUS_PASS);
			utr.setJoinType(UserTeamRole.TYPE_ADMIN);
			this.save(utr);
			
		}
		else
		{
			this.execute("update UserTeamRole set roleId = ? where teamId = ? and roleId = ?", 
					Role.NORMAL, teamId, Role.TEAM_ADMIN);
			UserTeamRole newutr = new UserTeamRole();
			newutr.setUserId(userId);
			newutr.setTeamId(teamId);
			newutr.setRoleId(Role.TEAM_ADMIN);
			newutr.setStatus(UserTeamRole.STATUS_PASS);
			newutr.setJoinType(UserTeamRole.TYPE_ADMIN);
			newutr.setJoinTime(TimeUtil.getCurrentTime());
			this.save(newutr);
		}
	}

}
