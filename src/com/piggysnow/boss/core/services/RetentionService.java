package com.piggysnow.boss.core.services;

import org.slave4j.orm.hibernate.HibernateDao;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.piggysnow.boss.core.domain.VisitCount;

@Repository
@Service
public class RetentionService extends HibernateDao<VisitCount> {

	public VisitCount findRetention(String time, String channel, String serverId){
		VisitCount retention = findOne(" from Retention where time = ? and publishChannel = ? and serverId = ?", 
				time, channel, serverId);
		return retention;
	}
}
