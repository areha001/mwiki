package com.piggysnow.boss.core.services;

import org.apache.commons.lang.StringUtils;
import org.slave4j.orm.hibernate.HibernateDao;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.piggysnow.boss.core.domain.Version;

@Repository
@Service
public class VersionService extends HibernateDao<Version> {

	private String showBaseVersion(String resVersion){
		if(StringUtils.isEmpty(resVersion)){
			return "";
		}
		String[] strs = resVersion.split("\\(");
		if(strs.length<2)
			return "";
		
		return strs[1].split("\\)")[0];
	}
	public Version checkVersion(String publishChannel, String terminalType, String version, String tinyVersion){
		Version v = this.findOne(" from Version where terminal = ? and version = ?", terminalType,version);
		//无此版本时，找以对应的最新的大版本提供下载
		if(v==null || (v.getStatus() != Version.STATUS_最新 && v.getStatus() != Version.STATUS_待发布)){
			v = showNewVersion(publishChannel, terminalType);
			return v;
		}

		if(!v.getTinyVersion().equals(tinyVersion))
		{
			Version newVer = showNewVersion(v);
			newVer.setStatus(Version.STATUS_可用);
			String baseVersion = showBaseVersion(tinyVersion);
			if(!v.getResBaseVersion().equals(baseVersion))
			{
				newVer.tinyVersionStatus = Version.STATUS_需要重新下载资源包;
				newVer.setTinyUpdateUrl(v.getEmptyTinyUpdateUrl());
				newVer.setResSize(v.getEmptyResSize());
			}
			else
			{
				newVer.tinyVersionStatus = Version.STATUS_有资源包需要更新;
				newVer.setTinyUpdateUrl(v.getTinyUpdateUrl());
				newVer.setResSize(v.getResSize());
			}
			return newVer;
		}
		Version newVer = new Version();
		newVer.setStatus(Version.STATUS_最新);
		newVer.setPublishChannel(publishChannel);
		newVer.setPreTinyUpdateUrl(v.getPreTinyUpdateUrl());
		newVer.setPreResSize(v.getPreResSize());
		return newVer;
	}
	/*
	 * 
		if(v.getStatus() != Version.STATUS_最新 && v.getStatus() != Version.STATUS_待发布)
		{
			Version newVer = showNewVersion(publishChannel, terminalType);
			newVer.setStatus(Version.STATUS_可用);
			//大版本是兼容版本，小版本需要更新
			if(!v.getTinyVersion().equals(tinyVersion))
			{
				newVer.tinyVersionStatus = Version.STATUS_过期;
				newVer.setTinyUpdateUrl(v.getTinyUpdateUrl());
			}
			return newVer;
		}
	 * */

	private Version showNewVersion(String publishChannel, String terminalType)
	{
		//找到当前最新的版本的更新信息放入
		Version v = this.findOne(" from Version where terminal = ? and status = ? ", terminalType, Version.STATUS_最新);
		if(v==null)
		{
			v = this.findOne(" from Version where terminal = ? and status = ? ", "DEFAULT", Version.STATUS_最新);
		}
		return showNewVersion(v);
	}
	private Version showNewVersion(Version v)
	{
		Version vv = new Version();
		vv.setStatus(Version.STATUS_过期);
		vv.setPublishChannel(v.getPublishChannel());
		vv.setUpdateUrl(v.getUpdateUrl());
		vv.setTinyUpdateUrl(v.getTinyUpdateUrl());
		vv.setResBaseVersion(v.getResBaseVersion());
		vv.setEmptyResSize(v.getEmptyResSize());
		vv.setEmptyTinyUpdateUrl(v.getEmptyTinyUpdateUrl());
		vv.setResSize(v.getResSize());
		vv.setPreResSize(v.getPreResSize());
		return vv;
	}
	public Version checkVersion(String publishChannel, String terminalType, int status){
		Version v = this.findOne(" from Version where publishChannel = ? and terminal = ? and status = ? ", publishChannel, terminalType,  status);
		return v;
	}
}
