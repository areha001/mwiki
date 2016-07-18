package com.piggysnow.boss.core.services;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.slave4j.orm.hibernate.HibernateDao;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.piggysnow.boss.core.domain.Server;


@Repository
@Service
public class ServerService extends HibernateDao<Server> {

	long time = 0;
	
	List<Server> serverList = null;
	//获取列表
	public List<Server> findList(){
		if(System.currentTimeMillis() - time > 15000)
		{
			serverList = this.findList("from Server order by createTime");
			time = System.currentTimeMillis();
		}
		return serverList;
	}

	public HashMap<Long, Server> findMap(){
		List<Server> list = findList();
		HashMap<Long, Server> hm = new HashMap<Long, Server>();
		for(Server s : list){
			hm.put(s.getId(), s);
		}
		return hm;
	}

	public HashMap<String, Server> findStringMap(){
		List<Server> list = findList();
		HashMap<String, Server> hm = new HashMap<String, Server>();
		for(Server s : list){
			hm.put(s.getServerId(), s);
		}
		return hm;
	}

	// 由服务器名获取服务器id
	public String findServerIdBy(String name){
		List<Server> list = findList();
		String serverId = "";
		for(Server s : list){
			if(s.getName().equals(name)){
				// 服务器的id为clusterName后面的数字
				serverId = s.getClusterName().substring(4);
				break;
			}
		}
		return serverId;
	}

	// 由服务器id获取服务器名
	public String findServerNameBy(String id){
		List<Server> list = findList();
		String serverName = "";
		for(Server s : list){
			if(s.getClusterName().equals(id)){
				// 服务器的id为clusterName后面的数字
				serverName = s.getName();
				break;
			}
		}
		return serverName;
	}

	// 由服务器id获取服务器
	public Server findServerBy(String id){
		List<Server> list = findList();
		Server server = new Server();
		for(Server s : list){
			if(s.getClusterName().equals(id)){
				// 服务器的id为clusterName后面的数字
				server = s;
				break;
			}
		}
		return server;
	}
	
	// 获取服务器id组
	public String getServerIdString(String serverNames){
		String serverId = "";
		String serId = "";
		if(StringUtils.isNotEmpty(serverNames)){
			String [] a = serverNames.split(",");
			for(int i = 0; i < a.length;i++){
				if(!"不限".equals(a[i]) && !"".equals(a[i])){
					serverId = findServerIdBy(a[i]);
					serId = serId+"'"+serverId+"'"+",";
				}
			}
			if(StringUtils.isNotEmpty(serId)){
				serId = serId.substring(1, serId.length()-2);
			}
		}
		return serId;
	}
	
	//获取列表
	public List<Server> findListByNameAndType(String groupName , String groupType){
		StringBuilder sb = new StringBuilder("from Server where 1=1 ");
		List args = new ArrayList();
		if(groupName!=null && !"".equals(groupName)){
			sb.append(" and groupName like ? ");
			args.add(groupName+"%");
		}
		if(groupType!=null && !"".equals(groupType)){
			sb.append(" and groupType like ? ");
			args.add(groupType+"%");
		}
		sb.append(" order by createTime ");
		List<Server> list = this.findList(sb.toString(), args.toArray());
		return list;
	}
	public Server findServerByServerId(String serverId){
		StringBuilder sb = new StringBuilder("from Server where 1=1 ");
		List args = new ArrayList();
		if(serverId != null && !serverId.isEmpty()){
			sb.append(" and serverId = ? ");
			args.add(serverId);
		}
		return this.findOne(sb.toString(), args.toArray());
	}
	
	/**
	 * 显示可用Server
	 * */
	public List<Server> getShowServers(){
		return this.find("from Server where status >= 0");
	}


	//查询分组列表
	public List<Server> findGroupList(){
		return this.findList("from Server where groupName = 'GAME' group by groupType ");
	}
	//获取列表
	public List<Server> findServerList(String groupName, String groupType){
		StringBuilder sb = new StringBuilder("from Server where 1=1 ");
		if(groupName!=null && !"".equals(groupName)){
			sb.append(" and groupName like '"+groupName+"%'");
		}
		if(StringUtils.isNotEmpty(groupType)){
			sb.append(" and groupType in ('"+groupType+"')");
		}
		sb.append(" order by createTime ");
		List<Server> list = this.findList(sb.toString());
		return list;
	}
	
	
}
