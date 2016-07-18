package com.piggysnow.boss.core.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.wds.base.dao.BaseEntity;

@Entity
@Table(name = "t_retention")
public class Retention extends BaseEntity implements Serializable{

	@Column
	public String time;
	@Column
	public String publishChannel;
	@Column
	public String serverId;
	@Column
	public String two;
	@Column
	public String three;
	@Column
	public String four;
	@Column
	public String five;
	@Column
	public String six;
	@Column
	public String seven;
	@Column
	public String eight;
	
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	public String getPublishChannel() {
		return publishChannel;
	}
	public void setPublishChannel(String publishChannel) {
		this.publishChannel = publishChannel;
	}
	public String getServerId() {
		return serverId;
	}
	public void setServerId(String serverId) {
		this.serverId = serverId;
	}
	public String getTwo() {
		return two;
	}
	public void setTwo(String two) {
		this.two = two;
	}
	public String getThree() {
		return three;
	}
	public void setThree(String three) {
		this.three = three;
	}
	public String getFour() {
		return four;
	}
	public void setFour(String four) {
		this.four = four;
	}
	public String getFive() {
		return five;
	}
	public void setFive(String five) {
		this.five = five;
	}
	public String getSix() {
		return six;
	}
	public void setSix(String six) {
		this.six = six;
	}
	public String getSeven() {
		return seven;
	}
	public void setSeven(String seven) {
		this.seven = seven;
	}
	public String getEight() {
		return eight;
	}
	public void setEight(String eight) {
		this.eight = eight;
	}
	
	@Override
	public String toString() {
		return "Retention [time=" + time + ", publishChannel=" + publishChannel
				+ ", serverId=" + serverId + ", two=" + two + ", three="
				+ three + ", four=" + four + ", five=" + five + ", six=" + six
				+ ", seven=" + seven + ", eight=" + eight + "]";
	}
	
}
