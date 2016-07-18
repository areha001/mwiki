package com.piggysnow.boss.log.domain;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Table;


@Table(name="log_player_pet")
public class LogPets implements Serializable{
	@Column(name="playerID")
    private String playerId;
	private String name;    
	@Column(name="petID")
	private int goodsID;
	private String goodsName;
	@Column(name="org_growth")
	private int orgGrowth;
	@Column(name="new_growth")
	private int newGrowth;
	@Column(name="new_reverse")
	private int newReverse;
	@Column(name="summary")
	private int summary;
	@Column(name="sold_money")
	private int soldMoney;
	
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
	public int getOrgGrowth() {
		return orgGrowth;
	}
	public void setOrgGrowth(int orgGrowth) {
		this.orgGrowth = orgGrowth;
	}
	public int getNewGrowth() {
		return newGrowth;
	}
	public void setNewGrowth(int newGrowth) {
		this.newGrowth = newGrowth;
	}
	public int getNewReverse() {
		return newReverse;
	}
	public void setNewReverse(int newReverse) {
		this.newReverse = newReverse;
	}
	public int getSummary() {
		return summary;
	}
	public void setSummary(int summary) {
		this.summary = summary;
	}
	public int getSoldMoney() {
		return soldMoney;
	}
	public void setSoldMoney(int soldMoney) {
		this.soldMoney = soldMoney;
	}
	@Override
	public String toString() {
		return "LogPets [playerId=" + playerId + ", name=" + name
				+ ", goodsID=" + goodsID + ", goodsName=" + goodsName
				+ ", orgGrowth=" + orgGrowth + ", newGrowth=" + newGrowth
				+ ", newReverse=" + newReverse + ", summary=" + summary
				+ ", soldMoney=" + soldMoney + ", action=" + action
				+ ", actionID=" + actionID + ", modTime=" + modTime + "]";
	}
	
}
