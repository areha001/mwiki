package com.piggysnow.boss.core.domain;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.wds.base.dao.BaseEntity;

@Entity 
@Table(name="t_gift")
public class Gift extends BaseEntity implements Serializable{

	private String name;
	private String serverIds;
	private String partnerCodeId;
	private Long creator;
	private String creatorName;
	private int gold;
	private int diamond;
	private String itemInfo;
	private Date createTime;
	
	public int getGold() {
		return gold;
	}
	public void setGold(int gold) {
		this.gold = gold;
	}
	public int getDiamond() {
		return diamond;
	}
	public void setDiamond(int diamond) {
		this.diamond = diamond;
	}
	public String getItemInfo() {
		return itemInfo;
	}
	public void setItemInfo(String itemInfo) {
		this.itemInfo = itemInfo;
	}
	public String getServerIds() {
		return serverIds;
	}
	public void setServerIds(String serverIds) {
		this.serverIds = serverIds;
	}
	public String getPartnerCodeId() {
		return partnerCodeId;
	}
	public void setPartnerCodeId(String partnerCodeId) {
		this.partnerCodeId = partnerCodeId;
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
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}


	@Transient
	private String partnerName;
	@Transient
	private String serverName;
	@Transient
	private String itemInfoString;
	public String getPartnerName() {
		return partnerName;
	}
	public void setPartnerName(String partnerName) {
		this.partnerName = partnerName;
	}
	public String getServerName() {
		return serverName;
	}
	public void setServerName(String serverName) {
		this.serverName = serverName;
	}
	public String getItemInfoString() {
		return itemInfoString;
	}
	public void setItemInfoString(String itemInfoString) {
		this.itemInfoString = itemInfoString;
	}
	
}
