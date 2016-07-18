package com.piggysnow.boss.utils;

import java.util.Date;
/**
 * 此类用来存放studentList页面要显示的学生记录值（后台用
 * @author fqzhang
 */




public class StudentClazz {
	private Long id;
	private String grade;                    //年级
	private String clazzName;                     //班级名称
	private String loginName;	                  //登录名
	private String realName;	                 //真实姓名
	private Integer sex;                         //性别。1：男；2：女
	private Date birthDate;						//出生年月
	private Date lastTime;						//最后登录时间
	private String studyYearName;				//班级所在学年
	private int status;
	private Long userId;
	private String strangeType;
	
	
	public String getStrangeType() {
		return strangeType;
	}
	public void setStrangeType(String strangeType) {
		this.strangeType = strangeType;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public Date getLastTime() {
		return lastTime;
	}
	public void setLastTime(Date lastTime) {
		this.lastTime = lastTime;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getGrade() {
		return grade;
	}
	public void setGrade(String grade) {
		this.grade = grade;
	}
	public String getClazzName() {
		return clazzName;
	}
	public void setClazzName(String clazzName) {
		this.clazzName = clazzName;
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
	public Integer getSex() {
		return sex;
	}
	public void setSex(Integer sex) {
		this.sex = sex;
	}
	public Date getBirthDate() {
		return birthDate;
	}
	public void setBirthDate(Date birthDate) {
		this.birthDate = birthDate;
	}
	public String getStudyYearName() {
		return studyYearName;
	}
	public void setStudyYearName(String studyYearName) {
		this.studyYearName = studyYearName;
	}
	
}
