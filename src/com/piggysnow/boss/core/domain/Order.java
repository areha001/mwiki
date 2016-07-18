package com.piggysnow.boss.core.domain;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.wds.base.dao.BaseEntity;

@Entity
@Table(name = "t_order")
public class Order extends BaseEntity implements Serializable {

	@Column
	public long playerId;
	@Column
	public Long accountId;
	@Column
	public String serverId;
	@Column
	public String username;
	@Column
	public String name;
	@Column(name="token")
	public String token;
	@Column
	public int payChannel;
	@Column
	public int diamond;
	@Column
	public int mallId;
	@Column
	public String items;
	@Column
	public int rmb;
	@Column
	public int status;
	@Column
	public long gameOrderId;
	@Column
	public Date createTime;
	@Column
	public Date payTime;
	@Column
	public Date chargeTime;
	@Column
	public String imei;
	@Column
	public String payServerIp;
	@Column
	public String cpOrderId;
	@Column
	public String cpOrderId2;
	@Column
	public String terminal;
	@Column
	public String publishChannel;

	public String getPublishChannel() {
		return publishChannel;
	}

	public void setPublishChannel(String publishChannel) {
		this.publishChannel = publishChannel;
	}

	public long getPlayerId() {
		return playerId;
	}

	public void setPlayerId(long playerId) {
		this.playerId = playerId;
	}

	public String getServerId() {
		return serverId;
	}

	public void setServerId(String serverId) {
		this.serverId = serverId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public int getPayChannel() {
		return payChannel;
	}

	public void setPayChannel(int payChannel) {
		this.payChannel = payChannel;
	}

	public int getDiamond() {
		return diamond;
	}

	public void setDiamond(int diamond) {
		this.diamond = diamond;
	}

	public String getItems() {
		return items;
	}

	public void setItems(String items) {
		this.items = items;
	}

	public int getRmb() {
		return rmb;
	}

	public void setRmb(int rmb) {
		this.rmb = rmb;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Date getPayTime() {
		return payTime;
	}

	public void setPayTime(Date payTime) {
		this.payTime = payTime;
	}

	public Date getChargeTime() {
		return chargeTime;
	}

	public void setChargeTime(Date chargeTime) {
		this.chargeTime = chargeTime;
	}

	public String getImei() {
		return imei;
	}

	public void setImei(String imei) {
		this.imei = imei;
	}

	public String getPayServerIp() {
		return payServerIp;
	}

	public void setPayServerIp(String payServerIp) {
		this.payServerIp = payServerIp;
	}

	public String getCpOrderId() {
		return cpOrderId;
	}

	public void setCpOrderId(String cpOrderId) {
		this.cpOrderId = cpOrderId;
	}

	public Long getAccountId() {
		return accountId;
	}

	public void setAccountId(Long accountId) {
		this.accountId = accountId;
	}

	public int getMallId() {
		return mallId;
	}

	public void setMallId(int mallId) {
		this.mallId = mallId;
	}

	public long getGameOrderId() {
		return gameOrderId;
	}

	public void setGameOrderId(long gameOrderId) {
		this.gameOrderId = gameOrderId;
	}

	public String getCpOrderId2() {
		return cpOrderId2;
	}

	public void setCpOrderId2(String cpOrderId2) {
		this.cpOrderId2 = cpOrderId2;
	}

	public String getTerminal() {
		return terminal;
	}

	public void setTerminal(String terminal) {
		this.terminal = terminal;
	}

	@Override
	public String toString() {
		return "Order [playerId=" + playerId + ", serverId=" + serverId
				+ ", username=" + username + ", name=" + name + ", token="
				+ token + ", payChannel=" + payChannel + ", diamond=" + diamond
				+ ", items=" + items + ", rmb=" + rmb + ", status=" + status
				+ ", createTime=" + createTime + ", payTime=" + payTime
				+ ", chargeTime=" + chargeTime + ", imei=" + imei
				+ ", payServerIp=" + payServerIp + ", cpOrderId=" + cpOrderId
				+ ", publishChannel=" + publishChannel + "]";
	}
	
	

}
