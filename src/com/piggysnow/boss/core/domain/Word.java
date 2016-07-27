package com.piggysnow.boss.core.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.wds.base.dao.BaseEntity;

/**
 * 词汇
 */
@Entity 
@Table(name="t_word")
public class Word extends BaseEntity{

	/**
	 * 角色名
	 */
	@Column
	private String name;
	/**
	 * 角色名
	 */
	@Column
	private String groupName;
	/**
	 * 角色名
	 */
	@Column
	private long creator;
	/**
	 * 时间
	 */
	@Column
	private Date createTime;
	/**
	 * 优先度
	 */
	@Column
	private int prio;
	/**
	 * 状态
	 */
	@Column
	private int status;
	/**
	 * 版本
	 */
	@Column
	private int version;
	/**
	 * 描述 
	 */
	@Column
	private String description;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getGroupName() {
		return groupName;
	}
	public void setGroupName(String groupName) {
		this.groupName = groupName;
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
	public int getVersion() {
		return version;
	}
	public void setVersion(int version) {
		this.version = version;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	
	public String getCreatorName()
	{
		return "Admin";
	}
}
