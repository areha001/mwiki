package com.piggysnow.boss.core.domain;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.wds.base.dao.BaseEntity;

@Entity
@Table(name = "t_visit_count")
public class VisitCount extends BaseEntity implements Serializable{

	@Column
	public String route;
	@Column
	public String subId;
	@Column
	public int visitCount;
	@Column
	public int editCount;
	@Column
	public Date lastVisit;
	
	public String getRoute() {
		return route;
	}
	public void setRoute(String route) {
		this.route = route;
	}
	public String getSubId() {
		return subId;
	}
	public void setSubId(String subId) {
		this.subId = subId;
	}
	public int getVisitCount() {
		return visitCount;
	}
	public void setVisitCount(int visitCount) {
		this.visitCount = visitCount;
	}
	public Date getLastVisit() {
		return lastVisit;
	}
	public void setLastVisit(Date lastVisit) {
		this.lastVisit = lastVisit;
	}
	public int getEditCount() {
		return editCount;
	}
	public void setEditCount(int editCount) {
		this.editCount = editCount;
	}
	
	
}
