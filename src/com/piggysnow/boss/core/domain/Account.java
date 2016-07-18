package com.piggysnow.boss.core.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.wds.base.dao.BaseEntity;

@Entity 
@Table(name="t_account")
public class Account extends BaseEntity{

	@Column
	private String username;
	@Column
	private String password;
	@Column
	private int type;
	@Column
	private String token;
	@Column
	private long tokenBornTimeMs;
	@Column
	private String terminalType;
	@Column
	private String forceTerminal;
	@Column
	private String terminalDetail;
	@Column
	private String publishChannel;
	@Column
	private String publishChannelUsername;
	@Column
	private Date unlockedTime;
	@Column
	private String imei;
	@Column
	private Date createTime;
	
	
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public long getTokenBornTimeMs() {
		return tokenBornTimeMs;
	}
	public void setTokenBornTimeMs(long tokenBornTimeMs) {
		this.tokenBornTimeMs = tokenBornTimeMs;
	}
	public String getTerminalType() {
		return terminalType;
	}
	public void setTerminalType(String terminalType) {
		this.terminalType = terminalType;
	}
	public String getForceTerminal() {
		return forceTerminal;
	}
	public void setForceTerminal(String forceTerminal) {
		this.forceTerminal = forceTerminal;
	}
	public String getTerminalDetail() {
		return terminalDetail;
	}
	public void setTerminalDetail(String terminalDetail) {
		this.terminalDetail = terminalDetail;
	}
	public String getPublishChannel() {
		return publishChannel;
	}
	public void setPublishChannel(String publishChannel) {
		this.publishChannel = publishChannel;
	}
	public String getPublishChannelUsername() {
		return publishChannelUsername;
	}
	public void setPublishChannelUserName(String publishChannelUsername) {
		this.publishChannelUsername = publishChannelUsername;
	}
	public Date getUnlockedTime() {
		return unlockedTime;
	}
	public void setUnlockedTime(Date unlockedTime) {
		this.unlockedTime = unlockedTime;
	}
	public String getImei() {
		return imei;
	}
	public void setImei(String imei) {
		this.imei = imei;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	
	
	
	
}
