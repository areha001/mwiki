
package com.piggysnow.boss.core.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.piggysnow.boss.core.domain.Happen;
import com.piggysnow.common.dao.HibernateEntityDao;
import com.piggysnow.common.dao.Page;
@Service
public class HappenService extends HibernateEntityDao<Happen> {

	public List<Happen> findList(Page page){
		return this.findPage(page, " from Happen order by id desc");	
	}
}
