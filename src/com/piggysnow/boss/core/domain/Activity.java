package com.piggysnow.boss.core.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.wds.base.dao.BaseEntity;
@Entity 
@Table(name="t_activity")
public class Activity extends BaseEntity{
	private int activityId;
	private int pos;
	private Date startTime;
	private Date endTime;
	private String name;
	@Column(name = "dec_1")
	private String dec1;
	@Column(name = "dec_2")
	private String dec2;
	@Column(name = "dec_3")
	private String dec3;
	@Column(name = "dec_4")
	private String dec4;
	private int active;
	
	public int getActivityId() {
		return activityId;
	}
	public void setActivityId(int activityId) {
		this.activityId = activityId;
	}
	public int getPos() {
		return pos;
	}
	public void setPos(int pos) {
		this.pos = pos;
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
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDec1() {
		return dec1;
	}
	public void setDec1(String dec1) {
		this.dec1 = dec1;
	}
	public String getDec2() {
		return dec2;
	}
	public void setDec2(String dec2) {
		this.dec2 = dec2;
	}
	public String getDec3() {
		return dec3;
	}
	public void setDec3(String dec3) {
		this.dec3 = dec3;
	}
	public String getDec4() {
		return dec4;
	}
	public void setDec4(String dec4) {
		this.dec4 = dec4;
	}
	public int getActive() {
		return active;
	}
	public void setActive(int active) {
		this.active = active;
	}
	
	
	
	
}
