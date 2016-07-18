package com.piggysnow.boss.core.services;

import java.sql.SQLException;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import com.piggysnow.boss.utils.LogUtils;
import com.piggysnow.common.dao.HibernateEntityDao;
@Service
public class AverageService extends HibernateEntityDao{
	
	public List<Own> findOwns(String serverId,String beginTime,String endTime, String pid) throws Exception{
		
		StringBuilder sb = new StringBuilder("select sum(A.remain_value) as own,DATE_FORMAT(A.mod_time,'%Y-%m-%d') as datatime from log_diamond A,(SELECT playerID, max(mod_time) max_day FROM log_diamond GROUP BY DATE_FORMAT(mod_time,'%Y-%m-%d'),playerID) B where A.playerID=B.playerID");
		sb.append(" and A.mod_time=B.max_day");
		if(StringUtils.isNotEmpty(serverId)){
			sb.append(" and A.serverID in ('"+serverId+"')");
		}
		if(StringUtils.isNotEmpty(pid)){
			if("0".equals(pid)){
				sb.append(" and publish_channel is null");
			}else{
				sb.append(" and publish_channel = '"+pid+"'");
			}
		}
		if(StringUtils.isNotEmpty(beginTime) && StringUtils.isEmpty(endTime)){
			sb.append(" and A.mod_time >= '"+beginTime+"'");
		}
		if(StringUtils.isNotEmpty(beginTime) && StringUtils.isNotEmpty(endTime)){
			sb.append(" and A.mod_time between '"+beginTime+"' and '"+endTime+"'");
		}
		if(StringUtils.isEmpty(beginTime) && StringUtils.isNotEmpty(endTime)){
			sb.append(" and A.mod_time <= '"+endTime+"'");
		}
		sb.append(" group by DATE_FORMAT(A.mod_time,'%Y-%m-%d')");
		return LogUtils.query(sb.toString(), Own.class);
	}
	
	public List<Consume> findConsumes(String serverId,String beginTime,String endTime, String pid) throws SQLException, Exception{
		StringBuilder sb = new StringBuilder("select sum(add_value) as consume,DATE_FORMAT(mod_time,'%Y-%m-%d') as datatime from log_diamond where 1=1");
		sb.append(" and add_value < 0");
		if(StringUtils.isNotEmpty(serverId)){
			sb.append(" and serverID in ('"+serverId+"')");
		}
		if(StringUtils.isNotEmpty(pid)){
			if("0".equals(pid)){
				sb.append(" and publish_channel is null");
			}else{
				sb.append(" and publish_channel = '"+pid+"'");
			}
		}
		if(StringUtils.isNotEmpty(beginTime) && StringUtils.isEmpty(endTime)){
			sb.append(" and mod_time >= '"+beginTime+"'");
		}
		if(StringUtils.isNotEmpty(beginTime) && StringUtils.isNotEmpty(endTime)){
			sb.append(" and mod_time between '"+beginTime+"' and '"+endTime+"'");
		}
		if(StringUtils.isEmpty(beginTime) && StringUtils.isNotEmpty(endTime)){
			sb.append(" and mod_time <= '"+endTime+"'");
		}
		sb.append(" group by DATE_FORMAT(mod_time,'%Y-%m-%d')");
		return LogUtils.query(sb.toString(), Consume.class);
	}
	
	/**
	 * 拥有
	 */
	public static class Own{
		public String datatime;
		public String own;
		public String getDatatime() {
			return datatime;
		}
		public void setDatatime(String datatime) {
			this.datatime = datatime;
		}
		public String getOwn() {
			return own;
		}
		public void setOwn(String own) {
			this.own = own;
		}
		
	}

	/**
	 * 消耗
	 */
	public static class Consume{
		public String datatime;
		public String consume;
		public String getDatatime() {
			return datatime;
		}
		public void setDatatime(String datatime) {
			this.datatime = datatime;
		}
		public String getConsume() {
			return consume;
		}
		public void setConsume(String consume) {
			this.consume = consume;
		}
	}
}
