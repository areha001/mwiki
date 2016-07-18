package com.piggysnow.common.dao;

import java.io.Serializable;
import java.util.List;

import com.piggysnow.common.utils.GenericsUtils;


/**
 * 
 * @author <a href="mailto:qhuang@chinaschool.net">黄桥</a><br>
 * @since 2007-11-08
 * 
 * @param <T>
 */
@SuppressWarnings("unchecked")
public class HibernateEntityDao<T> extends HibernateGenericDao implements
	EntityDao<T> {
	protected Class<T> entityClass; // DAO所管理的Entity类型

	public HibernateEntityDao() {
		this.entityClass = GenericsUtils.getGenericClass(getClass());
	}

	public T get(Serializable id) {
		return get(entityClass, id);
	}
	/**
	 * 把String的ID转成Long然后直接查
	 * */
	public T get(String id) {
		return get(entityClass, Long.valueOf(id));
	}

	public T tryGet(Serializable id)
	{
		return tryGet(entityClass, id);
	}
	public List<T> findListByIds(List<Long> idList)
	{
		return findListByIds(idList);
	}
	

	public List<T> getAll() {
		return getAll(entityClass);
	}

	public List<T> getAll(Page page, String... orderFields) {
		String className = entityClass.getName();
		className = className.substring(className.lastIndexOf(".") + 1);
		StringBuffer hql = new StringBuffer("from " + className + " c order by");
		for (String orderField : orderFields) {
			hql.append(" c.").append(orderField).append(" desc,");
		}
		hql.append(" c.id desc");
		return this.findPage(page, hql.toString());
	}

//	public List<T> getAllWithCondition(String condition,String... orderFields) {
//		String className = entityClass.getName();
//		className = className.substring(className.lastIndexOf(".") + 1);
//		StringBuffer hql = new StringBuffer("from " + className + " c where ");
//		hql.append(condition);hql.append(" order by");
//		for (String orderField : orderFields) {
//			hql.append(" c.").append(orderField).append(" desc,");
//		}
//		hql.append(" c.id desc");
//		return this.find(hql.toString());
//	}
//	
//	protected List<T> getAllWithConditionAndPage(Page page, String condition, String... orderFields) {
//		String className = entityClass.getName();
//		className = className.substring(className.lastIndexOf(".") + 1);
//		StringBuffer hql = new StringBuffer("from " + className + " c where ");
//		hql.append(condition);
//		hql.append(" order by");
//		for (String orderField : orderFields) {
//			hql.append(" c.").append(orderField).append(" desc,");
//		}
//		hql.append(" c.id desc");
//		return this.findPage(page, hql.toString());
//	}
	
	public void removeById(Serializable id) {
		removeById(entityClass, id);
	}
	

	/**
	 * 根据样本实体查找
	 * */

	public List<T> findByExample(T exampleEntity)
	{
		return (List)this.getHibernateTemplate().findByExample(exampleEntity);
	}
	
	/**
	 * 根据样本实体查找一个
	 * */

	public T findOneByExample(T exampleEntity)
	{
		List list = this.getHibernateTemplate().findByExample(exampleEntity);
		if(list.size() == 0)
			return null;
		else
			return (T)list.get(0);
	}
	


}
