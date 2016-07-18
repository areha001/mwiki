package com.piggysnow.boss.log.domain;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Table;


@Table(name="log_goods")
public class LogGoods implements Serializable{
	@Column(name="playerID")
    private String playerId;
	private String name;    
	@Column(name="goodsID")
	private int goodsID;
	private String goodsName;
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
	public int getGoodsID() {
		return goodsID;
	}
	public void setGoodsID(int goodsID) {
		this.goodsID = goodsID;
	}
	public String getGoodsName() {
		return goodsName;
	}
	public void setGoodsName(String goodsName) {
		this.goodsName = goodsName;
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
	@Override
	public String toString() {
		return "LogGoods [playerId=" + playerId + ", name=" + name
				+ ", goodsID=" + goodsID + ", goodsName=" + goodsName
				+ ", add=" + add + ", org=" + org + ", remain=" + remain
				+ ", action=" + action + ", actionID=" + actionID
				+ ", modTime=" + modTime + "]";
	}
	
}
