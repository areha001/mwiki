package com.piggysnow.boss.core.services;

import org.slave4j.orm.hibernate.HibernateDao;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.piggysnow.boss.core.domain.Retention;

@Repository
@Service
public class RetentionService extends HibernateDao<Retention> {

	public Retention findRetention(String time, String channel, String serverId){
		Retention retention = findOne(" from Retention where time = ? and publishChannel = ? and serverId = ?", 
				time, channel, serverId);
		return retention;
	}
}
