package com.piggysnow.boss.core.services;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import com.piggysnow.boss.core.domain.Order;
import com.piggysnow.common.dao.HibernateEntityDao;
import com.piggysnow.common.dao.Page;
@Service
public class PrepaidListService extends HibernateEntityDao<Order>{
	
	public List<Recharge> findList(String serverId,String beginTime,String endTime,String pid) throws SQLException, Exception{
		StringBuilder sb = new StringBuilder(" select player_id, server_id, name, sum(rmb) amount from t_order where 1=1");
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
			sb.append(" and pay_time >= '"+beginTime+"'");
		}
		if(StringUtils.isNotEmpty(beginTime) && StringUtils.isNotEmpty(endTime)){
			sb.append(" and pay_time between '"+beginTime+"' and '"+endTime+"'");
		}
		if(StringUtils.isEmpty(beginTime) && StringUtils.isNotEmpty(endTime)){
			sb.append(" and pay_time <= '"+endTime+"'");
		}
		sb.append(" group by player_id order by sum(rmb) desc");
		Page page = new Page(9999);
		List<Recharge> rechargeList = new ArrayList<Recharge>();
		List list = this.findSQLPage(page, sb.toString());
		for (Object object : list) {
			Object[] o = (Object[])object;
			if(o != null && o.length > 3){
				Recharge rh = new Recharge();
				rh.setPlayerId(String.valueOf(o[0]));
				rh.setName(String.valueOf(o[2]));
				rh.setAmount(Integer.valueOf(o[3].toString()));
				rh.setServerId(String.valueOf(o[1]));
				rechargeList.add(rh);
			}
		}
		return rechargeList;
	}
	
	public static class Recharge{
		public String playerId;
		public int amount; //金额
		public String serverId;
		public String name;
		
		public String getPlayerId() {
			return playerId;
		}
		public void setPlayerId(String playerId) {
			this.playerId = playerId;
		}
		public int getAmount() {
			return amount;
		}
		public void setAmount(int amount) {
			this.amount = amount;
		}
		public String getServerId() {
			return serverId;
		}
		public void setServerId(String serverId) {
			this.serverId = serverId;
		}
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
	}
}
