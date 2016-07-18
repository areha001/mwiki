package com.piggysnow.boss.core.domain;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.wds.base.dao.BaseEntity;

@Entity
@Table(name="t_version")
public class Version extends BaseEntity implements Serializable{

	public static final int STATUS_有资源包需要更新 = -3;
	public static final int STATUS_需要重新下载资源包 = -2;
	public static final int STATUS_过期 = -1;
	public static final int STATUS_可用 = 0;
	public static final int STATUS_最新 = 1;
	public static final int STATUS_待发布 = 2;
	@Column
    private String publishChannel; //发布渠道
	@Column
    private String terminal; //终端类型
	@Column
    private String version; //大版本号
	@Column
    private String tinyVersion; //小版本号
	@Column
    private String updateUrl;//大版本更新地址
	@Column
    private String tinyUpdateUrl; //小版本更新地址
	@Column
    private String preTinyUpdateUrl; //预更新小版本更新地址
	@Column
    private String emptyTinyUpdateUrl; //空包资源版本更新地址
	@Column
    private String resBaseVersion; //基础版本号
	@Column
    private String preResSize; //预更新小版本更新文件总大小
	@Column
	private String resSize; //小版本文件总大小
	@Column
	private String emptyResSize; //空包资源版本总大小
	@Column
    private Date publishTime; //发布时间
	@Column
	private int status; //状态
	@Transient
	public int tinyVersionStatus;
//	@Column
//	private boolean keepOld; //可以保持旧版本
    
	public String getPublishChannel() {
		return publishChannel;
	}
	public void setPublishChannel(String publishChannel) {
		this.publishChannel = publishChannel;
	}
	public String getTerminal() {
		return terminal;
	}
	public void setTerminal(String terminal) {
		this.terminal = terminal;
	}
	public String getVersion() {
		return version;
	}
	public void setVersion(String version) {
		this.version = version;
	}
	public String getTinyVersion() {
		return tinyVersion;
	}
	public void setTinyVersion(String tinyVersion) {
		this.tinyVersion = tinyVersion;
	}
	public String getUpdateUrl() {
		return updateUrl;
	}
	public void setUpdateUrl(String updateUrl) {
		this.updateUrl = updateUrl;
	}
	public String getTinyUpdateUrl() {
		return tinyUpdateUrl;
	}
	public void setTinyUpdateUrl(String tinyUpdateUrl) {
		this.tinyUpdateUrl = tinyUpdateUrl;
	}
	public Date getPublishTime() {
		return publishTime;
	}
	public void setPublishTime(Date publishTime) {
		this.publishTime = publishTime;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public String getResSize() {
		return resSize;
	}
	public void setResSize(String resSize) {
		this.resSize = resSize;
	}
	public String getPreTinyUpdateUrl() {
		return preTinyUpdateUrl;
	}
	public void setPreTinyUpdateUrl(String preTinyUpdateUrl) {
		this.preTinyUpdateUrl = preTinyUpdateUrl;
	}
	public String getPreResSize() {
		return preResSize;
	}
	public void setPreResSize(String preResSize) {
		this.preResSize = preResSize;
	}
	public String getEmptyTinyUpdateUrl() {
		return emptyTinyUpdateUrl;
	}
	public void setEmptyTinyUpdateUrl(String emptyTinyUpdateUrl) {
		this.emptyTinyUpdateUrl = emptyTinyUpdateUrl;
	}
	public String getResBaseVersion() {
		return resBaseVersion;
	}
	public void setResBaseVersion(String resBaseVersion) {
		this.resBaseVersion = resBaseVersion;
	}
	public String getEmptyResSize() {
		return emptyResSize;
	}
	public void setEmptyResSize(String emptyResSize) {
		this.emptyResSize = emptyResSize;
	}
    
    
	
}
