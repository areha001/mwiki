package com.piggysnow.boss.log.domain;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Table;


@Table(name="log_exp")
public class LogExp implements Serializable{
	@Column(name="playerID")
    private String playerId;
	private String name;    
	@Column(name="add_value")
	private int add;
	@Column(name="org_value")
	private int org;
	@Column(name="remain_value")
	private int remain;
	private String action;
	@Column(name="actionID")
	private int actionID;
	private Date modTime;
	private String summary;
	public String getPlayerId() {
		return playerId;
	}
	public void setPlayerId(String playerId) {
		this.playerId = playerId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getAdd() {
		return add;
	}
	public void setAdd(int add) {
		this.add = add;
	}
	public int getOrg() {
		return org;
	}
	public void setOrg(int org) {
		this.org = org;
	}
	public int getRemain() {
		return remain;
	}
	public void setRemain(int remain) {
		this.remain = remain;
	}
	public String getAction() {
		return action;
	}
	public void setAction(String action) {
		this.action = action;
	}
	public int getActionID() {
		return actionID;
	}
	public void setActionID(int actionID) {
		this.actionID = actionID;
	}
	public Date getModTime() {
		return modTime;
	}
	public void setModTime(Date modTime) {
		this.modTime = modTime;
	}
	public String getSummary() {
		return summary;
	}
	public void setSummary(String summary) {
		this.summary = summary;
	}
	@Override
	public String toString() {
		return "LogExp [playerId=" + playerId + ", name=" + name + ", add="
				+ add + ", org=" + org + ", remain=" + remain + ", action="
				+ action + ", actionID=" + actionID + ", modTime=" + modTime
				+ "]";
	}
	
	
}
