package com.piggysnow.boss.core.domain;

import java.io.Serializable;
import java.util.Date;

import com.wds.base.dao.BaseEntity;


public class LockInfo extends BaseEntity implements Serializable{

	private String userId;	
	private Long creator;
	private String creatorName;
	private Date createTime;
	private String reason;
	private String lockTo;
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public Long getCreator() {
		return creator;
	}
	public void setCreator(Long creator) {
		this.creator = creator;
	}
	public String getCreatorName() {
		return creatorName;
	}
	public void setCreatorName(String creatorName) {
		this.creatorName = creatorName;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public String getReason() {
		return reason;
	}
	public void setReason(String reason) {
		this.reason = reason;
	}
	public String getLockTo() {
		return lockTo;
	}
	public void setLockTo(String lockTo) {
		this.lockTo = lockTo;
	}
	
}
