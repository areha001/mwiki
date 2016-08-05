package com.piggysnow.boss.core.services;

import java.util.Date;

import org.slave4j.orm.hibernate.HibernateDao;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.piggysnow.boss.core.domain.VisitCount;

@Repository
@Service
public class VisitCountService extends HibernateDao<VisitCount> {

	public VisitCount findAndVisit(String route, String subId)
	{
		VisitCount vc = find(route, subId);
		vc.setVisitCount(vc.getVisitCount()+1);
		vc.setLastVisit(new Date());
		save(vc);
		return vc;
	}
	

	public VisitCount findAndEdit(String route, String subId)
	{
		VisitCount vc = find(route, subId);
		vc.setEditCount(vc.getEditCount()+1);
		save(vc);
		return vc;
	}
	
	public VisitCount find(String route, String subId)
	{
		VisitCount vc = this.findOne(" from VisitCount where route = ? and subId = ? ", route, subId);
		if(vc == null)
		{
			vc = new VisitCount();
			vc.setLastVisit(new Date());
			vc.setRoute(route);
			vc.setSubId(subId);
			vc.setEditCount(0);
			vc.setVisitCount(0);
			save(vc);
		}
		return vc;
	}
}
