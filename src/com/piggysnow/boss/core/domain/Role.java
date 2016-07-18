package com.piggysnow.boss.core.domain;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.wds.base.dao.BaseEntity;

/**
 * 角色
 */
@Entity 
@Table(name="t_role")
public class Role extends BaseEntity{
	
	public static final Long NORMAL = 0L;
	public static final Long SUPER_ADMIN = 1L;
	public static final Long TEAM_ADMIN = 2L;


	/**
	 * 角色名
	 */
	private String name;
	/**
	 * 注释
	 */
	private String description;
	/**
	 * 所属协作组
	 */
	private int status;

	/**
	 * 包含权限
	 */
	@ManyToMany
	@JoinTable(name="role_subrole",
	joinColumns={@JoinColumn(name="role_id",referencedColumnName="id")    },  
	inverseJoinColumns={@JoinColumn(name="subrole_id",referencedColumnName="id")    })
	public Set<SubRole> subRoles;

	/**
	 * 角色名
	 */
	public String getName() {
		return name;
	}

	/**
	 * 角色名
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * 注释
	 */
	public String getDescription() {
		return description;
	}

	/**
	 * 注释
	 */
	public void setDescription(String description) {
		this.description = description;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	/**
	 * 包含权限
	 */
//	public Set getSubRoles() {
//		return subRoles;
//	}

	/**
	 * 包含权限
	 */
	public void setSubRoles(Set subRoles) {
		this.subRoles = subRoles;
	}
	/**
	 * 取SubRoleId
	 * */
	public Long[] getSubRoleIds()
	{
		List<Long> list = new ArrayList();
		if(subRoles != null){
			for(SubRole sr : subRoles)
				list.add(sr.getId());
		}
		return list.toArray(new Long[0]);
		
	}
}
