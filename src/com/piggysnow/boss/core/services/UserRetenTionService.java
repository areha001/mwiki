package com.piggysnow.boss.core.services;

import java.sql.SQLException;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import com.piggysnow.boss.utils.LogUtils;
import com.piggysnow.common.dao.HibernateEntityDao;
@Service
public class UserRetenTionService extends HibernateEntityDao{
	
	public static class DateAndCount{
		public String date;
		public String total;
		public String getDate() {
			return date;
		}
		public void setDate(String date) {
			this.date = date;
		}
		public String getTotal() {
			return total;
		}
		public void setTotal(String total) {
			this.total = total;
		}
	}
	
	public static class DateAndUser{
		public String date;
		public String playerid;
		public String getDate() {
			return date;
		}
		public void setDate(String date) {
			this.date = date;
		}
		public String getPlayerid() {
			return playerid;
		}
		public void setPlayerid(String playerid) {
			this.playerid = playerid;
		}
	}
	
	public List<DateAndCount> getDateAndTotal(String serverId,String beginTime,String endTime,String pid) throws SQLException, Exception{
		StringBuilder sb = new StringBuilder("select DATE_FORMAT(create_time,'%Y-%m-%d') as date, COUNT(DISTINCT(concat(server_id,player_id))) as total from log_create_player where 1=1");
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
		return LogUtils.query(sb.toString(), DateAndCount.class);
	}
	
	public List<DateAndUser> findDateAndUsers(String serverId,String beginTime,String endTime, String pid) throws SQLException, Exception{
		StringBuilder sb = new StringBuilder("select DATE_FORMAT(create_time,'%Y-%m-%d') as date, player_id playerid from log_create_player where 1=1");
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
		return LogUtils.query(sb.toString(), DateAndUser.class);
	}
	
	public List<DateAndCount> findByTimeAndUid(String date,String serverId,int day,String pid) throws SQLException, Exception{
		StringBuilder sb = new StringBuilder("select '"+date+"' as date,count(distinct(concat(playerId,serverId))) as total from log_role_login l where 1=1");
		sb.append(" and DATE_FORMAT(create_time,'%Y-%m-%d') = '"+date+"' +interval "+day+" day");
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
		sb.append(" and exists (select 1 from log_create_player where l.playerId=player_id and l.serverId = server_id ");
		sb.append(" and DATE_FORMAT(create_time,'%Y-%m-%d') = '"+date+"')");
		return LogUtils.query(sb.toString(), DateAndCount.class);
	}
	
}
