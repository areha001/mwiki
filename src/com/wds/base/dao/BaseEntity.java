package com.wds.base.dao;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

/**
 * entity基类.
 * @author yangzhibin
 *
 */
@MappedSuperclass
public abstract class BaseEntity
{

	@Id
	@Column(name="id")
	//主键自动生成策略：数据库自动增长
	@GeneratedValue
	//主键
	protected long id;

	public Long getId()
	{
		return id;
	}

	public void setId(Long id)
	{
		this.id = id;
	}

	/**
	 * 是否是新对象
	 * @return
	 */
	public boolean isNew()
	{
		return (this.id == 0L);
	}
	
}
