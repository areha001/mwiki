package com.piggysnow.boss.core.services;

import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.piggysnow.boss.core.domain.GmNotice;
import com.piggysnow.common.dao.HibernateEntityDao;

@Repository
@Service
public class GmNoticeService extends HibernateEntityDao<GmNotice> {
	/**
	 * 查询登陆公告
	 * 
	 * @param serverId
	 * @return
	 */
	public GmNotice queryLoginNotice(String channelId) {
		Date now = new Date();
		GmNotice gn = findOne(
				" from GmNotice where channelId like ? and start_time <= ? and end_time >= ? and xtype = ?",
				"%" + channelId + "%", now, now, 1);
		if(gn == null)
		{
			gn = this.get(100);
		}
		return gn;
	}

	public List<GmNotice> queryNoticeList() {
		Date now = new Date();
		return find(" from GmNotice where end_time >= ? and xtype = 1", now);
	}

	public GmNotice findOne(int id) {
		return findOne(" from GmNotice where noticeId = ?", id);
	}

	public void delete(int id) {
		execute("delete from GmNotice where noticeId = ?", id);
	}
}
