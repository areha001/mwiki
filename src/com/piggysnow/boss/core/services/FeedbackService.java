package com.piggysnow.boss.core.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.piggysnow.boss.core.domain.Feedback;
import com.piggysnow.common.dao.HibernateEntityDao;
@Service
public class FeedbackService extends HibernateEntityDao<Feedback> {
	
	
	
	public List<Feedback> queryAll(){
		return this.find("from Feedback order by createTime desc, status ", new Object[]{});
	}
	
	
	public List<Feedback> queryByName(String name){
		return this.find("from Feedback where name = ? order by createTime desc, status ", new Object[]{name});
	}
	
	
	
	
	
	public List<Feedback> queryByPlayer(String serverId, String playerId,String title){
		return this.find("from Feedback where serverId = ? and playerId = ? and title = ? order by createTime desc, status ", new Object[]{serverId, playerId,title});
	}
}
