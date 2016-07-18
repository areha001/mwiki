package com.piggysnow.boss.core.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.piggysnow.boss.core.domain.PartitionInfo;
import com.piggysnow.common.dao.HibernateEntityDao;
@Repository
@Service
public class PartitionInfoService extends HibernateEntityDao<PartitionInfo> {
	public List<PartitionInfo> queryList(String channel){
		return find(" from PartitionInfo where channel=? and status != ? and status != ?", channel,PartitionInfo.STATUS_STOP,PartitionInfo.STATUS_TEST);
	}
	public List<PartitionInfo> queryListWithTest(String channel){
		return find(" from PartitionInfo where channel=? and status != ?", channel,PartitionInfo.STATUS_STOP);
	}
	
	
	/**
	 * 缓存相关
	 */
	private final static Map<String, List<PartitionInfo>> map = new HashMap<String, List<PartitionInfo>>();
	private static long refreshTime;
	private final  static long expireTime = 60000; //单位 毫秒
	private final static byte[] lock = new byte[]{};
	/**
	 * 查询列表
	 * @param channel
	 * @return
	 */
	public List<PartitionInfo> queryListByCache(String channel){
		if(isExpire()){
			synchronized (lock) {
				if(isExpire()){
					refreshData();
				}
			}
		}
		List<PartitionInfo> list = map.get(channel);
		if(list == null){
			list = new ArrayList<PartitionInfo>();
		}
		return list;
	}
	
	private static String getKey(PartitionInfo pi){
		String key;
		if(pi.getStatus() == PartitionInfo.STATUS_STOP || pi.getStatus() == PartitionInfo.STATUS_TEST){
			key = pi.getChannel() + "_" + "white";
		}else{
			key = pi.getChannel() + "_" + "normal";
		}
		return key;
	}
	/**
	 * 刷新数据
	 */
	private void refreshData() {
		map.clear();
		List<PartitionInfo> list = this.getAll();
		for (PartitionInfo pi : list) {
			
			String key = getKey(pi);
			List<PartitionInfo> value = map.get(key);
			if(value == null){
				value = new ArrayList<PartitionInfo>();
				map.put(pi.getChannel(), value);
			}
			value.add(pi);
		}
		refreshTime = System.currentTimeMillis();
	}
	/**
	 * 判断是否过期
	 * @return
	 */
	private boolean isExpire(){
		return map.isEmpty() || refreshTime + expireTime < System.currentTimeMillis();
	}
}
