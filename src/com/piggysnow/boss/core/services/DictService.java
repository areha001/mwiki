
package com.piggysnow.boss.core.services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.piggysnow.boss.core.domain.Dict;
import com.piggysnow.boss.core.web.admin.controller.StaticServiceController;
import com.piggysnow.common.dao.HibernateEntityDao;
@Service
public class DictService extends HibernateEntityDao<Dict> {

	private HashMap<String, LinkedHashMap<Integer, Dict>> cache = new  HashMap<String, LinkedHashMap<Integer, Dict>>();
	
	public void resetCache(){
		this.cache.clear();
	}
	public List getDictByType(String type)
	{
		return this.find(" from Dict where type = ? order by subId ", type);
	}
	public List getDictNameByType(String type)
	{
		return this.find(" select name from Dict where type = ? order by subId ", type);
	}
	public LinkedHashMap<Integer, Dict> getDictMapByType(String type){
		LinkedHashMap<Integer, Dict> list = cache.get(type);
		if(list!=null){
			return list;
		}
		List<Dict> dictList = getDictByType(type);
		LinkedHashMap<Integer, Dict> goods = new LinkedHashMap<Integer, Dict>();
		for(Dict d: dictList){
			goods.put(d.getSubId(), d);
		}
		cache.put(type,goods);
		return goods;
	}
	
	public HashMap<String,String> getIdNameMap(String type){
		HashMap<Integer, Dict> itemMap = getDictMapByType(type);
		HashMap<String,String> itemInfoMap = new HashMap<String, String>();
		for(Map.Entry<Integer, Dict> entry : itemMap.entrySet()){
			int i = entry.getKey();
			String key = String.valueOf(i);
			String value = entry.getValue().getName();
			itemInfoMap.put(key, value);
		}
		return itemInfoMap;
	}

	public HashMap<String,String> getItemInfoMap(){
		return getIdNameMap(Dict.ITEM);
	}

	
	public HashMap<String,String> getMemberMap(){
		return getIdNameMap(Dict.ROLE);
	}

	public HashMap<String,String> getHouseMap(){
		return getIdNameMap(Dict.DOLLHOUSE);
	}

	public HashMap<String,String> getPetMap(){
		return getIdNameMap(Dict.PETMAP);
	}
	
	public HashMap<String,String> getFestivalMap(){
		return getIdNameMap(Dict.FESTIVAL);
	}

	public String getDictInfo(String type, int subId, String defaultValue) {

		LinkedHashMap<Integer, Dict> goods = getDictMapByType(type);
		if (goods == null) {
			return String.valueOf(subId);
		}
		Dict d = goods.get(subId);
		if (d == null) {
			return defaultValue;
		}

		return d.getName();
	}

	public String getDictInfo(String type, int subId) {
		return getDictInfo(type, subId, String.valueOf(subId));
	}

	public LinkedHashMap<Integer, String> getDictIdNameMapByType(String type){
		List<Dict> dictList = getDictByType(type);
		LinkedHashMap<Integer, String> goods = new LinkedHashMap<Integer, String>();
		for(Dict d: dictList){
			goods.put(d.getSubId(), d.getName());
		}
		return goods;
	}
	public void save(Dict d)
	{
		super.save(d);
	}
	/**
	 * 根据dictName返回Dict对象
	 * */
	public List<Dict> getDictByNames(List<String> dictNames, String type)
	{
		List<Dict> dList = this.find(" from Dict where type = ? order by subId ", type);
		List<Dict> dicts = new ArrayList<Dict>();
		for(String dname : dictNames)
		{
			for(Dict d : dList)
			{
				if(d.getName().equals(dname))
				{
					dicts.add(d);
					break;
				}
			}
		}
		return dicts;
	}
	/**
	 * 根据dictName返回DictId
	 * */
	public List<Long> getDictIdByNames(List<String> dictNames, String type)
	{
		List<Dict> dicts = getDictByNames(dictNames, type);
		List<Long> ids = new ArrayList<Long>();
		for(Dict d :dicts)
			ids.add(d.getId());
		return ids;
	}
	/**
	 * 根据dictName返回DictId
	 * */
	public List<Long> getDictIdByNames(String[] dictNameArr, String type)
	{
		List<String> dictNames = Arrays.asList(dictNameArr);
		List<Dict> dicts = getDictByNames(dictNames, type);
		List<Long> ids = new ArrayList<Long>();
		for(Dict d :dicts)
			ids.add(d.getId());
		return ids;
	}

}
