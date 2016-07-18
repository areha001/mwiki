package com.piggysnow.boss.core.services;
import java.util.List;

import org.springframework.stereotype.Service;

import com.piggysnow.boss.core.domain.GMail;
import com.piggysnow.boss.core.domain.LockInfo;
import com.piggysnow.common.dao.HibernateEntityDao;
import com.piggysnow.common.dao.Page;
@Service
public class LockInfoService extends HibernateEntityDao<LockInfo> {

	//获取列表
	public List<LockInfo> findList(String userId, Page page){
		StringBuilder sb = new StringBuilder("from LockInfo  where userId = ? ");
		sb.append(" order by   createTime desc ");
		return this.findPage(page, sb.toString(), userId);
	}

}
