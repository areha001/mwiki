package com.piggysnow.boss.core.domain;

import java.io.Serializable;
import java.util.Date;

public class UserBean{
	private Long id;
	
	private String loginName;
	
	private String realName;
	
	private String  password;
	
	private Integer sex;
	
	private String birthday;
	
	private String email;
	
	private String jobTime;
	
	private String qq;
	
	private String resume;
	
	private Long departId;
	
	private String departName;
	
	private Date lastLogin;
	
	private Integer teamAdmin;
	
	private Long roleId;
	
	private String roleName;

	public Long getRoleId() {
		return roleId;
	}

	public void setRoleId(Long roleId) {
		this.roleId = roleId;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public Integer getTeamAdmin() {
		return teamAdmin;
	}

	public void setTeamAdmin(Integer teamAdmin) {
		this.teamAdmin = teamAdmin;
	}

	public  Date getLastLogin() {
		return lastLogin;
	}

	public void setLastLogin( Date lastLogin) {
		this.lastLogin = lastLogin;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getLoginName() {
		return loginName;
	}

	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}

	public String getRealName() {
		return realName;
	}

	public void setRealName(String realName) {
		this.realName = realName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Integer getSex() {
		return sex;
	}

	public void setSex(Integer sex) {
		this.sex = sex;
	}

	public String getBirthday() {
		return birthday;
	}

	public void setBirthday(String birthday) {
		this.birthday = birthday;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getJobTime() {
		return jobTime;
	}

	public void setJobTime(String jobTime) {
		this.jobTime = jobTime;
	}

	public String getQq() {
		return qq;
	}

	public void setQq(String qq) {
		this.qq = qq;
	}

	public String getResume() {
		return resume;
	}

	public void setResume(String resume) {
		this.resume = resume;
	}

	public Long getDepartId() {
		return departId;
	}

	public void setDepartId(Long departId) {
		this.departId = departId;
	}

	public String getDepartName() {
		return departName;
	}

	public void setDepartName(String departName) {
		this.departName = departName;
	}

}
