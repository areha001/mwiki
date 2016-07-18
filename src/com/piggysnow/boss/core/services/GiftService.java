package com.piggysnow.boss.core.services;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Service;

import com.piggysnow.boss.core.domain.Gift;
import com.piggysnow.common.dao.HibernateEntityDao;
import com.piggysnow.common.dao.Page;
@Service
public class GiftService extends HibernateEntityDao<Gift> {

	//获取列表
	public List<Gift> findList(Page page){
		List<Object> args = new ArrayList<Object>();
		StringBuilder sb = new StringBuilder("from Gift  where 1=1 ");
		sb.append(" order by   id desc ");
		return this.findPage(page, sb.toString(), args.toArray());
	}
	//获取礼包名Map
	public HashMap<Long, String> findNameMap(){
		List<Gift> list = this.find("from Gift");
		HashMap<Long, String> hm = new HashMap<Long, String>();
		for(Gift g: list){
			hm.put(g.getId(), g.getName());
		}
		return hm;
	}
}
