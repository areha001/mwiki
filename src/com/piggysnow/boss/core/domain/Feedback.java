package com.piggysnow.boss.core.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.wds.base.dao.BaseEntity;
@Entity 
@Table(name="t_player_feedback")
public class Feedback extends BaseEntity implements Serializable{

	@Column(name="serverid")
	private String serverId;
	@Column(name="playerid")
	private String playerId;
	@Column
	private String title;
	@Column
	private String info;
	@Column
	private String reply;
	@Column
	private int status;  // 0:未回复
	@Column
	private String createTime;
	@Column
	private String replyTime;  // 回复时间
	@Column
	private String name;
	@Column
	private String publishChannel;		// '发布渠道'
	@Column
	private String type; // '反馈类型(1 建议 2 bug)'
	
	
	
	public String getServerId() {
		return serverId;
	}
	public void setServerId(String serverId) {
		this.serverId = serverId;
	}
	public String getPlayerId() {
		return playerId;
	}
	public void setPlayerId(String playerId) {
		this.playerId = playerId;
	}
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	public String getReplyTime() {
		return replyTime;
	}
	public void setReplyTime(String replyTime) {
		this.replyTime = replyTime;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getInfo() {
		return info;
	}
	public void setInfo(String info) {
		this.info = info;
	}
	public String getReply() {
		return reply;
	}
	public void setReply(String reply) {
		this.reply = reply;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPublishChannel() {
		return publishChannel;
	}
	public void setPublishChannel(String publishChannel) {
		this.publishChannel = publishChannel;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	
}
