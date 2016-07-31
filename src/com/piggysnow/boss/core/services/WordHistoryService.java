package com.piggysnow.boss.core.services;

import org.springframework.stereotype.Service;

import com.piggysnow.boss.core.domain.WordHistory;
import com.piggysnow.common.dao.HibernateEntityDao;
@Service
public class WordHistoryService extends HibernateEntityDao<WordHistory>{

	
	public WordHistory findWord(String name)
	{
		return findOne("from WordHistory where name = ? and status = ? ", name , WordHistory.ACTIVE_STATUS);
	}
}
