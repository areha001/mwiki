package com.piggysnow.boss.core.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.piggysnow.boss.core.domain.Word;
import com.piggysnow.common.dao.HibernateEntityDao;
@Service
public class WordService extends HibernateEntityDao<Word>{
	
	public List<Word> findTopWord()
	{
		return find("from Word where parentName = ? " , "顶级词汇");
	}
	
	public Word findWord(String name)
	{
		return findOne("from Word where name = ? ", name);
	}
}