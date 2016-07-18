package com.piggysnow.boss.core.services;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.piggysnow.boss.core.domain.Msg;
import com.piggysnow.common.dao.HibernateEntityDao;
import com.piggysnow.common.dao.Page;
import com.piggysnow.boss.core.domain.Server;
@Service
public class MsgService extends HibernateEntityDao<Msg> {

	//获取列表
	public List<Msg> findList(int type, Long partnerId, Page page){
		List<Object> args = new ArrayList<Object>();
		args.add(type);
		StringBuilder sb = new StringBuilder("from Msg  where type = ? ");
		if(partnerId!=null){
			sb.append(" and partnerId = ? ");
			args.add(partnerId);
		}
		sb.append(" order by createTime desc ");
		return this.findPage(page, sb.toString(), args.toArray());
	}

	
	//获取列表
	public List<Server> findList(Integer partnerId, String groupType){
		StringBuilder sb = new StringBuilder("from Server where 1=1 ");
		List args = new ArrayList();
		if(partnerId!=null){
			sb.append(" and partnerId = ? ");
			args.add(partnerId);
		}
		if(groupType!=null){
			sb.append(" and groupType = ? ");
			args.add(groupType);
		}
		sb.append(" order by partnerId, createTime ");
		return this.find(sb.toString(), args.toArray());
	}
	/**
	 * 显示可用Server
	 * */
	public List<Server> getShowServers(){
		return this.find("from Server where status >= 0");
	}
}
