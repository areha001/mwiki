package com.piggysnow.boss.core.services;

import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import com.piggysnow.boss.core.domain.Item;
import com.piggysnow.boss.core.domain.ItemTag;
import com.piggysnow.boss.core.domain.Tag;
import com.piggysnow.common.dao.HibernateEntityDao;
@Service
public class TagService extends HibernateEntityDao<Tag> {


	public List<Tag> showAllTag()
	{
		return this.getAll();
	}
	public Tag findTagByName(String name)
	{
		for(Tag t: showAllTag())
		{
			if(t.getName().equals(name))
				return t;
		}
		return null;
	}
	
	public void bindItemAndInit(Item i, String[] tags)
	{
		this.execute("delete from ItemTag where itemId = ? ", i.getId());
		for(String name: tags)
		{
			name = name.trim().toLowerCase();
			Tag t = findTagByName(name);
			if(t == null)
			{
				t = new Tag();
				t.setCreateTime(new Date());
				t.setName(name);
				t.setCreator(i.getCreator());
				t.setGroupName("");
				t.setPrio(0);
				t.setRefCount(0);
				t.setStatus(1);
				this.save(t);
			}
			else
			{
				t.setRefCount(t.getRefCount()+1);
				this.save(t);
			}
			ItemTag it = new ItemTag();
			it.setCreator(i.getCreator());
			it.setCreateTime(new Date());
			it.setItemId(i.getId());
			it.setTagId(t.getId());
			save(it);
		}
	}
	
}
