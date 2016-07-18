package com.piggysnow.boss.core.services;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import com.piggysnow.boss.core.domain.Order;
import com.piggysnow.boss.core.domain.RechargeResult;
import com.piggysnow.common.dao.HibernateEntityDao;
import com.piggysnow.common.dao.Page;
@Service
public class RechargeQueryService extends HibernateEntityDao<Order>{


	public List<RechargeResult> findRechargeList(String serverId,String beginTime,String endTime,String partnerId) throws Exception{
		Page page = new Page(9999);
		StringBuilder sb = new StringBuilder(
				"select DATE_FORMAT(pay_time,'%Y-%m-%d') as date,sum(rmb) as xvalue,COUNT(DISTINCT(player_id)) as num from t_order where 1=1");
		if(StringUtils.isNotEmpty(serverId)){
			sb.append(" and server_id in ('"+serverId+"')");
		}
		if(StringUtils.isNotEmpty(partnerId)){
			if("0".equals(partnerId)){
				sb.append(" and publish_channel is null");
			}else{
				sb.append(" and publish_channel = '"+partnerId+"'");
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
		sb.append(" group by DATE_FORMAT(pay_time,'%Y-%m-%d')");
		List<RechargeResult> resultList = new ArrayList<RechargeResult>();
		List list = this.findSQLPage(page, sb.toString());
		for (Object object : list) {
			Object[] o = (Object[])object;
			if(o != null && o.length > 2){
				RechargeResult result = new RechargeResult();
				result.setDate(String.valueOf(o[0]));
				result.setXvalue(String.valueOf(o[1]));
				result.setNum(String.valueOf(o[2]));
				resultList.add(result);
			}
		}
		return resultList;
	}
	
	public List<BigInteger> findTotal(String serverId,String beginTime,String endTime,String partnerId) throws Exception{
		Page page = new Page(9999);
		StringBuilder sb = new StringBuilder("select count(DISTINCT(player_id)) as total from t_order where 1=1");
		if(StringUtils.isNotEmpty(serverId)){
			sb.append(" and server_id in ('"+serverId+"')");
		}
		if(StringUtils.isNotEmpty(partnerId)){
			if("0".equals(partnerId)){
				sb.append(" and publish_channel is null");
			}else{
				sb.append(" and publish_channel = '"+partnerId+"'");
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
		return this.findSQLPage(page, sb.toString());
	}
	
	public static class TotalNum{
		public String total;

		public String getTotal() {
			return total;
		}

		public void setTotal(String total) {
			this.total = total;
		}
		
	}
}
