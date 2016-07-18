package com.piggysnow.boss.core.services;
import java.util.ArrayList;
import java.util.List;

import org.slave4j.orm.hibernate.HibernateDao;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.piggysnow.boss.core.domain.GMail;
import com.piggysnow.common.dao.Page;

@Repository
@Service
public class GMailService extends HibernateDao<GMail> {

	//获取列表
	public List<GMail> findList(Integer status, Page page){
		List<Object> args = new ArrayList<Object>();
		StringBuilder sb = new StringBuilder("from GMail  where 1=1 ");
		if(status!=null){
			sb.append(" and status = ? ");
			args.add(status);
		}
		sb.append(" order by   createTime desc ");
		return this.findPage(page, sb.toString(), args.toArray());
	}

}
