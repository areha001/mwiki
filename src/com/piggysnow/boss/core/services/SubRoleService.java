package com.piggysnow.boss.core.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.piggysnow.boss.core.domain.SubRole;
import com.piggysnow.common.dao.HibernateEntityDao;
@Service
public class SubRoleService extends HibernateEntityDao<SubRole> {

	public List getAll()
	{
		return this.find(" from SubRole where status >= 0 order by status desc ");
	}
}
