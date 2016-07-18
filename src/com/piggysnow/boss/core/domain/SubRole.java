package com.piggysnow.boss.core.domain;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.wds.base.dao.BaseEntity;

/**
 * 最小子权限
 * */
@Entity 
@Table(name="t_subrole")
public class SubRole extends BaseEntity{

	public static List<SubRole> all;
	
	public static List<SubRole> assignable;
	
	
	public static Long getIdByUrl(String url){
		for(SubRole sr : assignable)
		{
			if(url.contains(sr.getUrl()))
			{
				return sr.getId();
			}
		}
		return -1l;
	}
	
	
	
	/**
	 * 角色名
	 * */
	private String name;
	/**
	 * 子权限描述
	 * */
	private String description;

	/**
	 * 路由
	 * */
	private String url;

	/**
	 * 状态与排序
	 * */
	private int status;

	/**
	 * 角色名
	 * */
	public String getName() {
		return name;
	}
	/**
	 * 角色名
	 * */
	public void setName(String name) {
		this.name = name;
	}
	/**
	 * 子权限描述
	 * */
	public String getDescription() {
		return description;
	}
	/**
	 * 子权限描述
	 * */
	public void setDescription(String description) {
		this.description = description;
	}
	/**
	 * 路由
	 * */
	public String getUrl() {
		return url;
	}
	/**
	 * 路由
	 * */
	public void setUrl(String url) {
		this.url = url;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
}
