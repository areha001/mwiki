package com.piggysnow.boss.core.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "t_notice")
public class GmNotice {

	@Id
	@Column(name = "notice_id")
	// 主键自动生成策略：数据库自动增长
	@GeneratedValue
	public Integer noticeId;
	@Column
	public String title;
	@Column
	public String body;
	@Column
	public Date createTime;
	@Column
	public Date startTime;
	@Column
	public Date endTime;
	@Column
	public int priority;
	@Column
	public String serverId;
	@Column
	public String channelId;
	@Column
	public Integer delaySecond;
	@Column
	public Integer xtype;


	public static final int ID_自动回复 = 1;
	public static final int ID_全局公告 = 100;
	
	public Integer getNoticeId() {
		return noticeId;
	}

	public void setNoticeId(Integer noticeId) {
		this.noticeId = noticeId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getBody() {
		return body;
	}

	public void setBody(String body) {
		this.body = body;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Date getStartTime() {
		return startTime;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	public Date getEndTime() {
		return endTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

	public String getServerId() {
		return serverId;
	}

	public void setServerId(String serverId) {
		this.serverId = serverId;
	}

	public String getChannelId() {
		return channelId;
	}

	public void setChannelId(String channelId) {
		this.channelId = channelId;
	}

	public Integer getDelaySecond() {
		return delaySecond;
	}

	public void setDelaySecond(Integer delaySecond) {
		this.delaySecond = delaySecond;
	}

	public Integer getXtype() {
		return xtype;
	}

	public void setXtype(Integer xtype) {
		this.xtype = xtype;
	}


	public boolean isExpire() {
		return endTime == null || endTime.getTime() < System.currentTimeMillis();
	}

	public void setExpire() {
		this.endTime = new Date(0);
	}
}
