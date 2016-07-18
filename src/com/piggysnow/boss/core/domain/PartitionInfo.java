package com.piggysnow.boss.core.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "t_partition_info")
public class PartitionInfo {
	//状态-流畅
	public static final int STATUS_SMOOTH = 10;
	//状态-火爆
	public static final int STATUS_HOT = 20;
	//状态-新开
	public static final int STATUS_NEW = 30;
	//状态-维护中
	public static final int STATUS_MAINTAIN = 40;
	//状态-停服
	public static final int STATUS_STOP = 50;
	//状态-测试
	public static final int STATUS_TEST = 60;
	@Id
	private int id;
	@Column
	private String name;
	@Column
	private String channel;
	@Column
	private int loginServerId;
	@Column
	private String serverGroup;
	@Column
	private int status;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getChannel() {
		return channel;
	}
	public void setChannel(String channel) {
		this.channel = channel;
	}
	public int getLoginServerId() {
		return loginServerId;
	}
	public void setLoginServerId(int loginServerId) {
		this.loginServerId = loginServerId;
	}
	
	public String getServerGroup() {
		return serverGroup;
	}
	public void setServerGroup(String serverGroup) {
		this.serverGroup = serverGroup;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	
}
