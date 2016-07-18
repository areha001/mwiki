package com.piggysnow.boss.core.domain;

import java.io.Serializable;
import java.util.Date;







import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.piggysnow.boss.core.web.admin.controller.StaticServiceController;
import com.wds.base.dao.BaseEntity;

@Entity
@Table(name="t_user")
public class User extends BaseEntity implements Serializable{

	/**
	 * 用户名
	 */
	@Column
	private String username;
	/**
	 * 姓名
	 */
	@Column
	private String name;
	/**
	 * 密码
	 */
	@Column
	private String password;
	/**
	 * 职称
	 */
	@Column
	private String job;
	/**
	 * 审核状态
	 */
	@Column
	private int status = 0;
	/**
	 * 上次登录时间
	 */
	@Column
	private Date lastLoginTime;
	/**
	 * 0-离线，1-在线
	 */
	@Column
	private Integer loginStatus = 0;

	@Column
	private String email;

	/**
	 * 超级管理员
	 * */
	@Column
	private int teamAdmin;
	@Column
	private Long departId;
	

	public Long getDepartId() {
		return departId;
	}

	public void setDepartId(Long departId) {
		this.departId = departId;
	}

	public int getTeamAdmin() {
		return teamAdmin;
	}

	public void setTeamAdmin(int teamAdmin) {
		this.teamAdmin = teamAdmin;
	}

	public static final int GRADE_STEP = 6;

    
	/**
	 * 姓名
	 */
	public String getName() {
		return name;
	}

	/**
	 * 姓名
	 */
	public String getLoginName() {
		return username;
	}
	/**
	 * 姓名
	 */
	public String getRealName() {
		return name;
	}
	//最后登录时间
	public Date getlastTime(){
		return lastLoginTime;
	}
	
	/**
	 * 姓名
	 */
	public void setName(String name) {
		this.name = name;
	}
	
	/**
	 * 职称
	 */
	public String getJob() {
		return job;
	}

	/**
	 * 职称
	 */
	public void setJob(String job) {
		this.job = job;
	}
	/**
	 * 状态
	 */
	public int getStatus() {
		return status;
	}

	/**
	 * 状态
	 */
	public void setStatus(int status) {
		this.status = status;
	}

	/**
	 * 上次登录时间
	 */
	public Date getLastLoginTime() {
		return lastLoginTime;
	}

	/**
	 * 上次登录时间
	 */
	public void setLastLoginTime(Date lastLoginTime) {
		this.lastLoginTime = lastLoginTime;
	}

	/**
	 * 密码
	 */
	public String getPassword() {
		return password;
	}

	/**
	 * 密码
	 */
	public void setPassword(String password) {
		this.password = password;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	/**
	 * 允许申请加入 未审核0 1不允许 审核通过3
	 */
	public String getUserStatus() {
		if (status == 0) {
			return "未审核";
		} else if (status == 1) {
			return "审核不通过";
		} else if (status == 3) {
			return "审核通过";
		}
		return "";
	}
	public Integer getLoginStatus() {
		return loginStatus;
	}

	public void setLoginStatus(Integer loginStatus) {
		this.loginStatus = loginStatus;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	
	public String getGroupName()
	{
		if( departId!=null)
		{
			Partner dept = StaticServiceController.getPartnerService().tryGet(departId);
			if(dept!=null)
				return dept.getName();
		}
		return "";
	}


}