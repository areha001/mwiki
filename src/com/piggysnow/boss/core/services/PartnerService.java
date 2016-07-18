package com.piggysnow.boss.core.services;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.piggysnow.boss.core.domain.Partner;
import com.piggysnow.common.dao.HibernateEntityDao;
@Service
public class PartnerService extends HibernateEntityDao<Partner> {

//获取部门列表
	public List<Partner> findList(){
		return this.find("from Partner");
	}
	
	public HashMap<Long, Partner> findMap(){
		List<Partner> list = this.findList();
		HashMap<Long, Partner> hm = new HashMap<Long, Partner> ();
		for(Partner p : list){
			hm.put(p.getId(), p);
		}
		return hm;
	}

	public HashMap<String, Partner> findCodeMap(){
		List<Partner> list = this.findList();
		HashMap<String, Partner> hm = new HashMap<String, Partner> ();
		for(Partner p : list){
			hm.put(p.getDcode(), p);
		}
		return hm;
	}

	public HashMap<String, Partner> findNameMap(){
		List<Partner> list = this.findList();
		HashMap<String, Partner> hm = new HashMap<String, Partner> ();
		for(Partner p : list){
			hm.put(p.getName(), p);
		}
		return hm;
	}
	
	long time = 0;

	Map<String,Partner> pmap = null;
	public String showPartnerNameByCode(String code)
	{
		Partner p = showPartnerByCode(code);
		if(p == null)
			return code;
		return p.getName();
	}
	public Partner showPartnerByCode(String code)
	{
		if(System.currentTimeMillis() - time > 15000)
		{
			pmap = findCodeMap();
			time = System.currentTimeMillis();
		}
		Partner p = pmap.get(code);
		return p;
	}

//判断是否添加的是同名部门的信息
	
	public List<Partner> findAddPartnerList(String name,Long code){
		return this.find("from Partner where name=? and dcode=?", name,code);
	}
	public List<Partner> serchByName(String deptName){
		return this.find("from Partner where name like '%"+deptName+"%'");
	}
	/**
	 * 显示可用部门
	 * */
	public List<Partner> getShowDepts(){
		return this.find("from Partner where status = 0");
	}
}
