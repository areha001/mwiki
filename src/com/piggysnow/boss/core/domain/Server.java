package com.piggysnow.boss.core.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.wds.base.dao.BaseEntity;
import com.wds.base.dao.ICachedData;
@Entity
@Table(name="t_server")
@Embeddable
public class Server extends BaseEntity implements ICachedData, Serializable {

	public static final long MAIN_SERVER = 1;
	public static final int STATUS_OK = 0;
	public static final int STATUS_CLOSE = 1;
	public static final int STATUS_MAINTAIN = 2;
	public static final int STATUS_TEST = 3;
	@Column
	public String name;

	@Column(name="subname")
	public String subName;

	@Column(name="clustername")
	public String clusterName;

	@Column(name="groupname")
	public String groupName;

	@Column(name="grouptype")
	public String groupType;

	@Column(name="serverid")
	public String serverId;

	@Column(name="inneraddr")
	public String innerAddr;

	@Column(name="outaddr")
	public String outAddr;

	@Column(name="createtime")
	public java.util.Date createTime;

	@Column(name="reporttime")
	public java.util.Date reportTime;

	@Column(name="conncount")
	public int connCount;

	@Column
	public int status;
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSubName() {
		return subName;
	}

	public void setSubName(String subName) {
		this.subName = subName;
	}

	public String getClusterName() {
		return clusterName;
	}

	public void setClusterName(String clusterName) {
		this.clusterName = clusterName;
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public String getGroupType() {
		return groupType;
	}

	public void setGroupType(String groupType) {
		this.groupType = groupType;
	}

	public String getServerId() {
		return serverId;
	}

	public void setServerId(String serverId) {
		this.serverId = serverId;
	}

	public String getInnerAddr() {
		return innerAddr;
	}

	public void setInnerAddr(String innerAddr) {
		this.innerAddr = innerAddr;
	}

	public String getOutAddr() {
		return outAddr;
	}

	public void setOutAddr(String outAddr) {
		this.outAddr = outAddr;
	}

	public java.util.Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(java.util.Date createTime) {
		this.createTime = createTime;
	}

	public java.util.Date getReportTime() {
		return reportTime;
	}

	public void setReportTime(java.util.Date reportTime) {
		this.reportTime = reportTime;
	}

	public int getConnCount() {
		return connCount;
	}

	public void setConnCount(int connCount) {
		this.connCount = connCount;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	@Override
	public String getCacheId() {
		return String.valueOf(id);
	}
	

}
