package com.piggysnow.boss.core.domain;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.wds.base.dao.BaseEntity;

@Entity 
@Table(name="t_mail")
public class GMail extends BaseEntity implements Serializable{

	@Column
	private String title;	//标题 
	@Column
	private String content;                     //内容 
	@Column
	private String serverIds;
	@Column
	private Date startTime;         //内容 
	@Column
	private Long partnerId;

	@Column
	private int gold;
	@Column
	private int diamond;
	@Column
	private int apple;
	@Column
	private String itemInfo;
	@Column
	private int status;   //0 未审  1已审  2已发  9发送失败
	@Column
	private Long creator;
	@Column
	private String creatorName;
	@Column
	private Date createTime;
	@Column
	private Date passTime;
	@Column
	private Date sendTime;

	@Column
	private String userName;
	@Column
	private String errMsg;
	@Column
	private int sendType;
	@Column
	private int faceNew;
	@Column
	public int exp;
	@Column
	public int leader;
	@Column
	public long playerId;
	@Column
	private int mailType;

	@Column
	public String cause;
	
	@Column
	public int energy;
	
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getServerIds() {
		return serverIds;
	}
	public void setServerIds(String serverIds) {
		this.serverIds = serverIds;
	}
	public Date getStartTime() {
		return startTime;
	}
	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
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
	public Date getSendTime() {
		return sendTime;
	}
	public void setSendTime(Date sendTime) {
		this.sendTime = sendTime;
	}

	private String partnerName;
	private String serverName;
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
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public Date getPassTime() {
		return passTime;
	}
	public void setPassTime(Date passTime) {
		this.passTime = passTime;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public int getSendType() {
		return sendType;
	}
	public void setSendType(int sendType) {
		this.sendType = sendType;
	}

	public Long getPartnerId() {
		return partnerId;
	}
	public void setPartnerId(Long partnerId) {
		this.partnerId = partnerId;
	}

	public static final int STATUS_未审核 = 0;
	public static final int STATUS_已审核 = 1;
	public static final int STATUS_已发送 = 2;
	public static final int STATUS_发送失败 = 9;
	

	public static final int TYPE_全服 = 1;
	public static final int TYPE_指定用户 = 0;
	//模拟字段，给JSON的用
	public String getStatusString(){
		if(status == STATUS_未审核){
			return "未审核";
		}
		if(status == STATUS_已审核){
			return "已审核";
		}
		if(status == STATUS_已发送){
			return "已发送";
		}
		return "发送失败";
	}
	
	public String itemInfoString;
	public String getItemInfoString(){
		return itemInfoString;
	}
	public void setItemInfoString(String itemInfoString){
		this.itemInfoString = itemInfoString;
	}
	public String getErrMsg() {
		return errMsg;
	}
	public void setErrMsg(String errMsg) {
		this.errMsg = errMsg;
	}
	public int getExp() {
		return exp;
	}
	public void setExp(int exp) {
		this.exp = exp;
	}
	public int getLeader() {
		return leader;
	}
	public void setLeader(int leader) {
		this.leader = leader;
	}
	public long getPlayerId() {
		return playerId;
	}
	public void setPlayerId(long playerId) {
		this.playerId = playerId;
	}
	public String getCause() {
		return cause;
	}
	public void setCause(String cause) {
		this.cause = cause;
	}
	public int getMailType() {
		return mailType;
	}
	public void setMailType(int mailType) {
		this.mailType = mailType;
	}
	public int getApple() {
		return apple;
	}
	public void setApple(int apple) {
		this.apple = apple;
	}
	public int getEnergy() {
		return energy;
	}
	public void setEnergy(int energy) {
		this.energy = energy;
	}
	public int getFaceNew() {
		return faceNew;
	}
	public void setFaceNew(int faceNew) {
		this.faceNew = faceNew;
	}
	
}
