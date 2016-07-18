package com.piggysnow.boss.core.services;

import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.List;

import org.slave4j.orm.hibernate.HibernateDao;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.piggysnow.boss.core.domain.Role;
import com.piggysnow.boss.core.domain.User;
import com.piggysnow.boss.core.domain.UserBean;
import com.piggysnow.boss.core.domain.UserTeamRole;
import com.piggysnow.common.dao.Page;
import com.piggysnow.common.utils.StringUtils;
@Repository
@Service
public class UserService extends HibernateDao<User> {

	public List getAllUsers(Page page){
		return findPage(page,"from User");
	}

	/**
	 * 根据协作取得有权限路径的用户
	 * */
	public List getRoleableUsers(Page page,Long teamId ,String rolePath)
	{
		return findPage(page," from User u , UserTeamRole utr, Role r where u.id = utr.userId and " +
				" utr.roleId = r.id and utr.teamId = ?  and exists " +
				" (select id from SubRole sr where sr.url = ? and sr.id = r.subRoles.id)"
				, teamId , rolePath);
	} 
	
	public List<User> getUsersByIds(List<Long> ids)
	{
		if(ids.size() > 0)
			return this.findList(" from User where id in "+StringUtils.createQuestionMarks(ids.toArray()), ids.toArray());
		else
			return new ArrayList<User>();
	}
	

	public void UpdatePassword(User user)
	{
		if(user != null)
		{
			this.batchExecute(" update User set password = ? where id = ? ", user.getPassword(), user.getId());
		}
	}
	//显示所有老师信息（后台 @author fqzhang）
	public List<User> findTeacherList(){
		return this.find("from User where isTeacher=1");
	}
	//显示所有用户信息
	public List<User> findDeptTeacherList(Page page, Long did , String name ) throws Exception{
		
		List args = new ArrayList();
		StringBuilder sb = new StringBuilder("select u from User u where status >= 0 "  );
		if(did!=0)
		{
			sb.append(" and u.departId = ? ");
			args.add(did);
		}
		if(name!= null && !"".equals(name))
		{
			name = URLDecoder.decode(name,"utf-8");
			sb.append(" and u.name like ? ");
			args.add("%" + name + "%");
		}
		return findPage(page, sb.toString(), args.toArray());

	}
	/**
	 * 根据userId找到对应的UserBean
	 * */
	private UserBean searchUserBean(List<UserBean> ubList, Long userId)
	{
		for(UserBean ub : ubList)
		{
			if(ub.getId().equals(userId))
				return ub;
		}
		return null;
	}
	/**
	 * 补充用户角色信息
	 * */
	public List<UserBean> addRoleInfo(List<UserBean> ubList)
	{
		if(ubList.size() == 0){
			return ubList;
		}
		List<Long> ids = new ArrayList<Long>();
		for(UserBean ub : ubList)
			ids.add(ub.getId());
		
		Long[] idsArr = ids.toArray(new Long[0]);
		
		List<Object[]> objList = this.findList(" from UserTeamRole utr, Role r where utr.roleId = r.id and " +
				" utr.status >=0 and utr.teamId = 1 and utr.userId in " +  
				StringUtils.createQuestionMarks(idsArr) , idsArr);
		for(Object[] objArr : objList)
		{
			UserTeamRole utr = (UserTeamRole)objArr[0];
			Role r = (Role)objArr[1];
			UserBean ub = searchUserBean(ubList, utr.getUserId());
			if(ub!=null)
			{
				ub.setRoleId(r.getId());
				ub.setRoleName(r.getName());
			}
		}
		
		return ubList;
	}
	
	
	//按老师名字查找老师信息（后台 @author fqzhang）
	public List<User> searchByTeacherNameList(String teacherName){
		return this.findList("from User where name like  '%" +teacherName+ "%'");
	}
	
	//后台登录---根据登录名查找用户信息(后台 @author fqzhang)
	public User findUserInfo(String loginName){
		return this.findOne(" from User where username = ?", loginName);
	}

	//判断修改的学生记录，表中是否已存在，登录名不能相同，如果存在则不能修改(后台 @author fqzhang)
	public List<User>  findStudentFindList(String loginName,Long studentid){
		return this.findList("from User  where  username=? and id <> ?",  loginName,studentid);
		
	}
	//判断修改的老师在表中是否已存在，如果存在， 则不能修改（后台 @author fqzhang）
	public List<User> findUpdateTeacherList( String loginName,Long teacherid){
		return this.findList("from User where username=? and id <> ?", loginName,teacherid);
	}
	
}