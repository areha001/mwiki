package com.piggysnow.boss.core.services;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import com.piggysnow.common.dao.HibernateEntityDao;
import com.piggysnow.common.dao.Page;
@Service
public class InComeDailyService extends HibernateEntityDao{
	
	public List<Income> findIncomes(String beginTime,String endTime) throws SQLException, Exception{
		Page page = new Page(9999);
		StringBuilder sb = new StringBuilder("select  DATE_FORMAT(pay_time,'%Y-%m-%d') as datatime,sum(rmb) as money,publish_channel channel from t_order where 1=1");
		if(StringUtils.isNotEmpty(beginTime) && StringUtils.isEmpty(endTime)){
			sb.append(" and pay_time >= '"+beginTime+"'");
		}
		if(StringUtils.isNotEmpty(beginTime) && StringUtils.isNotEmpty(endTime)){
			sb.append(" and pay_time between '"+beginTime+"' and '"+endTime+"'");
		}
		if(StringUtils.isEmpty(beginTime) && StringUtils.isNotEmpty(endTime)){
			sb.append(" and pay_time <= '"+endTime+"'");
		}
		sb.append(" GROUP BY DATE_FORMAT(pay_time,'%Y-%m-%d'),publish_channel");
		List<Income> incomeList = new ArrayList<Income>();
		List list = this.findSQLPage(page, sb.toString());
		for (Object object : list) {
			Object[] o = (Object[])object;
			if(o != null && o.length > 2){
				Income in = new Income();
				in.setDatatime(String.valueOf(o[0]));
				in.setMoney(String.valueOf(o[1]));
				in.setChannel(String.valueOf(o[2]));
				incomeList.add(in);
			}			
		}
		return incomeList;
	}
	
	public static class Income{
		public String datatime;  //时间
		public String money;  //充值
		public String channel; //平台渠道
		public String getDatatime() {
			return datatime;
		}
		public void setDatatime(String datatime) {
			this.datatime = datatime;
		}
		public String getMoney() {
			return money;
		}
		public void setMoney(String money) {
			this.money = money;
		}
		public String getChannel() {
			return channel;
		}
		public void setChannel(String channel) {
			this.channel = channel;
		}
		
	}
}
