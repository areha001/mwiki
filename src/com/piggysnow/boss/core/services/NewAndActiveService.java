package com.piggysnow.boss.core.services;

import java.sql.SQLException;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import com.piggysnow.boss.core.services.AverageService.Own;
import com.piggysnow.boss.core.services.UserRetenTionService.DateAndCount;
import com.piggysnow.boss.utils.LogUtils;
import com.piggysnow.common.dao.HibernateEntityDao;
@Service
public class NewAndActiveService extends HibernateEntityDao{
	
	public static class NewResult{
		public String date;
		public String newaccount="0";
		public String getDate() {
			return date;
		}
		public void setDate(String date) {
			this.date = date;
		}
		public String getNewaccount() {
			return newaccount;
		}
		public void setNewaccount(String newaccount) {
			this.newaccount = newaccount;
		}
	}
	public static class LoginResult{
		public String date;
		public String loginaccount="0";
		public String getDate() {
			return date;
		}
		public void setDate(String date) {
			this.date = date;
		}
		public String getLoginaccount() {
			return loginaccount;
		}
		public void setLoginaccount(String loginaccount) {
			this.loginaccount = loginaccount;
		}
		
	}
	
		public List<NewResult> findNewResults(String serverId,String beginTime,String endTime,String pid) throws SQLException, Exception{
			StringBuilder sb = new StringBuilder("select DATE_FORMAT(create_time,'%Y-%m-%d') as date, COUNT(DISTINCT(player_id)) as newaccount from log_create_player where 1=1");
			if(StringUtils.isNotEmpty(serverId)){
				sb.append(" and server_id in ('"+serverId+"')");
			}
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
			sb.append(" GROUP BY DATE_FORMAT(create_time,'%Y-%m-%d')");
			return LogUtils.query(sb.toString(), NewResult.class);
		}
		
		public List<LoginResult> findLoginResults(String serverId,String beginTime,String endTime,String pid) throws SQLException, Exception{
			StringBuilder sb = new StringBuilder("select DATE_FORMAT(create_time,'%Y-%m-%d') as date, COUNT(DISTINCT(playerId)) as loginaccount from log_role_login where 1=1");
			if(StringUtils.isNotEmpty(serverId)){
				sb.append(" and serverId in ('"+serverId+"')");
			}
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
			sb.append(" GROUP BY DATE_FORMAT(create_time,'%Y-%m-%d')");
			return LogUtils.query(sb.toString(), LoginResult.class);
		}
		
		public List<Total> findTotal(String serverId,String beginTime,String endTime,String pid) throws SQLException, Exception{
			StringBuilder sb = new StringBuilder("select count(DISTINCT(CONCAT(serverId,playerId))) as total from log_role_login where 1=1");
			if(StringUtils.isNotEmpty(serverId)){
				sb.append(" and serverId in ('"+serverId+"')");
			}
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
			return LogUtils.query(sb.toString(), Total.class);
		}
		
		
		public static class Total{
			public String total;

			public String getTotal() {
				return total;
			}

			public void setTotal(String total) {
				this.total = total;
			}
			
		}
}
