package com.piggysnow.boss.core.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.piggysnow.boss.core.domain.Word;
import com.piggysnow.common.dao.HibernateEntityDao;
import com.piggysnow.common.dao.Page;
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

	public List<Word> findLikedWord(String name)
	{
		Page p = new Page(8, false);
		return findPage(p, "from Word where name like ? ", "%"+name+"%");
	}

	public List<Word> doSearch(Page p, String name)
	{
		return findPage(p, "from Word where name like ? ", "%"+name+"%");
	}

	public List<Word> findLastedWord(Page page)
	{
		return findPage(page, "from Word order by editTime desc");
	}
	
	public List<Word> findSubWard(Page page, String name)
	{
		return findPage(page, "from Word where parentName = ? " , name);
	}
}
