package com.piggysnow.boss.core.domain;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.wds.base.dao.BaseEntity;

@Entity 
@Table(name="t_dict")
public class Dict extends BaseEntity implements Serializable{
	
	public static final String ITEM = "item";	// 道具
	public static final String ROLE = "role";	// 角色
	public static final String STAR = "star";	// 星座
	public static final String ROLEGARMENT = "rolegarment";	// 时装
	public static final String DOLLHOUSEITEM = "houseItem";	// 娃娃屋物品
	public static final String DOLLHOUSE = "houseName";	// 娃娃屋
	public static final String ADDRESS = "addressName"; // 地皮
	public static final String ACTIONTYPE = "actionType"; // 玩家行为
	public static final String FESTIVAL = "festival"; // 节日
	public static final String PETMAP = "pet"; // 节日

	private String name;                   
	private String type;
	private Integer subId;
	/**
	 * 根据已缓存取出的dictList查找dict
	 * */
	public static Dict getDictByIdCached(Long id, String type, List<Dict>  dictList)
	{
		for(Dict d : dictList)
		{
			if(d.getType()!=null && d.getType().equals(type) && d.getSubId().equals(id))
				return d;
		}
		return new Dict();
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public Integer getSubId() {
		return subId;
	}
	public void setSubId(Integer subId) {
		this.subId = subId;
	}
	@Override
	public String toString() {
		return "Dict [name=" + name + ", type=" + type + ", subId=" + subId
				+ "]";
	}
	
	
}
