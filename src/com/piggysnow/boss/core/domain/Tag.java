package com.piggysnow.boss.core.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.wds.base.dao.BaseEntity;

/**
 * 角色
 */
@Entity 
@Table(name="t_tag")
public class Tag extends BaseEntity{

	/**
	 * 角色名
	 */
	@Column
	private String name;
	/**
	 * 角色名
	 */
	@Column
	private String group;
	/**
	 * 角色名
	 */
	@Column
	private long creator;
	/**
	 * 注释
	 */
	@Column
	private Date createTime;
	/**
	 * 
	 */
	@Column
	private int prio;
	/**
	 * 所属协作组
	 */
	@Column
	private int status;
	/**
	 * 所属协作组
	 */
	@Column
	private int refCount;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getGroup() {
		return group;
	}
	public void setGroup(String group) {
		this.group = group;
	}
	public long getCreator() {
		return creator;
	}
	public void setCreator(long creator) {
		this.creator = creator;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public int getPrio() {
		return prio;
	}
	public void setPrio(int prio) {
		this.prio = prio;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public int getRefCount() {
		return refCount;
	}
	public void setRefCount(int refCount) {
		this.refCount = refCount;
	}

	
	
}
