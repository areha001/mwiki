package com.piggysnow.boss.core.services;

import java.sql.SQLException;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import com.piggysnow.boss.utils.LogUtils;
import com.piggysnow.common.dao.HibernateEntityDao;
import com.piggysnow.common.dao.Page;
@Service
public class PlayerRoleService extends HibernateEntityDao{

	public List<Player> findPlayers(String serverId,String beginTime,String endTime,String pid) throws SQLException, Exception{
		StringBuilder sb = new StringBuilder();
		sb.append("select player_id, name, server_id, role_name, action, mod_time date from log_player_role where ");
		sb.append(" mod_time >= '" + beginTime + "'");
		sb.append(" and mod_time < '" + endTime + "'");
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
		sb.append(" group by player_id, role_id");
		List<Player> list = LogUtils.query(sb.toString(), Player.class);
		return list;
	}
	
	public List<Player> findPlayers(String serverId,String beginTime,String endTime,Page page,String pid) throws SQLException, Exception{
		StringBuilder sb = new StringBuilder();
		sb.append("select player_id, name, server_id, role_name, action, mod_time date from log_player_role where ");
		sb.append(" mod_time >= '" + beginTime + "'");
		sb.append(" and mod_time < '" + endTime + "'");
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
		sb.append(" group by player_id, role_id");
		sb.append(" limit "+page.getPageStart()+","+page.getPageSize());
		List<Player> list = LogUtils.query(sb.toString(), Player.class);
		return list;
	}
	
	public static class Player{
		public String date; // 时间
		public String playerId;
		public String name;
		public String serverId;//服务器
		public String roleName;
		public String action;
		
		public String getDate() {
			return date;
		}
		public void setDate(String date) {
			this.date = date;
		}
		public String getPlayerId() {
			return playerId;
		}
		public void setPlayerId(String playerId) {
			this.playerId = playerId;
		}
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public String getServerId() {
			return serverId;
		}
		public void setServerId(String serverId) {
			this.serverId = serverId;
		}
		public String getRoleName() {
			return roleName;
		}
		public void setRoleName(String roleName) {
			this.roleName = roleName;
		}
		public String getAction() {
			return action;
		}
		public void setAction(String action) {
			this.action = action;
		}
	}
}
