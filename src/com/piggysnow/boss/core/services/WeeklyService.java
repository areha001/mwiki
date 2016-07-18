package com.piggysnow.boss.core.services;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;
import com.piggysnow.boss.utils.LogUtils;
import com.piggysnow.common.dao.HibernateEntityDao;
import com.piggysnow.common.dao.Page;
@Service
public class WeeklyService extends HibernateEntityDao{
	
	public List<Activity> findActivities(String beginTime,String endTime,String pid) throws Exception{
		StringBuilder sb = new StringBuilder("select publish_channel as channel, COUNT(DISTINCT(playerId)) as activitynum from log_role_login where 1=1");
		if(StringUtils.isNotEmpty(pid)){
			if("0".equals(pid)){
				sb.append(" and publish_channel is null");
			}else{
				sb.append(" and publish_channel = '"+pid+"'");
			}
		}
		if(StringUtils.isNotEmpty(beginTime) && StringUtils.isEmpty(endTime)){
			sb.append(" and create_time >= '"+beginTime+"'");
		}
		if(StringUtils.isNotEmpty(beginTime) && StringUtils.isNotEmpty(endTime)){
			sb.append(" and create_time between '"+beginTime+"' and '"+endTime+"'");
		}
		if(StringUtils.isEmpty(beginTime) && StringUtils.isNotEmpty(endTime)){
			sb.append(" and create_time <= '"+endTime+"'");
		}
		sb.append(" group by publish_channel");
		return LogUtils.query(sb.toString(), Activity.class);
	}
	
	public List<NewUser> findUsers(String beginTime,String endTime,String pid) throws Exception{
		StringBuilder sb = new StringBuilder("select publish_channel as channel, COUNT(DISTINCT(player_id)) as addnum from log_create_player where 1=1");
		if(StringUtils.isNotEmpty(pid)){
			if ("0".equals(pid)) {
				sb.append(" and publish_channel is null");
			} else {
				sb.append(" and publish_channel = '"+pid+"'");
			}
		}
		if(StringUtils.isNotEmpty(beginTime) && StringUtils.isEmpty(endTime)){
			sb.append(" and create_time >= '"+beginTime+"'");
		}
		if(StringUtils.isNotEmpty(beginTime) && StringUtils.isNotEmpty(endTime)){
			sb.append(" and create_time between '"+beginTime+"' and '"+endTime+"'");
		}
		if(StringUtils.isEmpty(beginTime) && StringUtils.isNotEmpty(endTime)){
			sb.append(" and create_time <= '"+endTime+"'");
		}
		sb.append(" group by publish_channel");
		return LogUtils.query(sb.toString(), NewUser.class);
	}
	
	public List<PayUser> findPayUsers(String beginTime,String endTime,String pid) throws Exception{
		Page page = new Page(9999);
		StringBuilder sb = new StringBuilder("select publish_channel as channel, sum(rmb) as pay,COUNT(DISTINCT(player_id)) as payNum from t_order where 1=1");

		if (StringUtils.isNotEmpty(pid)) {
			if ("0".equals(pid)) {
				sb.append(" and publish_channel is null");
			} else {
				sb.append(" and publish_channel = '"+pid+"'");
			}
		}
		if(StringUtils.isNotEmpty(beginTime) && StringUtils.isEmpty(endTime)){
			sb.append(" and pay_time >= '"+beginTime+"'");
		}
		if(StringUtils.isNotEmpty(beginTime) && StringUtils.isNotEmpty(endTime)){
			sb.append(" and pay_time between '"+beginTime+"' and '"+endTime+"'");
		}
		if(StringUtils.isEmpty(beginTime) && StringUtils.isNotEmpty(endTime)){
			sb.append(" and pay_time <= '"+endTime+"'");
		}
		sb.append(" group by publish_channel");
		List<PayUser> payList = new ArrayList<PayUser>();
		List list = this.findSQLPage(page, sb.toString());
		for (Object object : list) {
			Object[] o = (Object[])object;
			if(o != null && o.length > 2){
				PayUser pay = new PayUser();
				pay.setChannel(String.valueOf(o[0]));
				pay.setPay(String.valueOf(o[1]));
				pay.setPayNum(String.valueOf(o[2]));
				payList.add(pay);
			}
		}
		return payList;
	}


	
	//活跃人数
	public static class Activity{
		public String channel;
		public String activitynum = "0";
		public String getChannel() {
			return channel;
		}
		public void setChannel(String channel) {
			this.channel = channel;
		}
		public String getActivitynum() {
			return activitynum;
		}
		public void setActivityNum(String activitynum) {
			this.activitynum = activitynum;
		}
	}
	
	//新增人数
	public static class NewUser{
		public String channel;
		public String addnum="0";
		public String getChannel() {
			return channel;
		}
		public void setChannel(String channel) {
			this.channel = channel;
		}
		public String getAddnum() {
			return addnum;
		}
		public void setAddnum(String addnum) {
			this.addnum = addnum;
		}
	}
	
	//付费日期和付费数以及人数
	public static class PayUser{
		public String channel;
		public String pay = "0";
		public String payNum = "0";
		public String getChannel() {
			return channel;
		}
		public void setChannel(String channel) {
			this.channel = channel;
		}
		public String getPay() {
			return pay;
		}
		public void setPay(String pay) {
			this.pay = pay;
		}
		public String getPayNum() {
			return payNum;
		}
		public void setPayNum(String payNum) {
			this.payNum = payNum;
		}
	}
}
