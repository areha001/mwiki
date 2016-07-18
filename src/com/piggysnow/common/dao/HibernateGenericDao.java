package com.piggysnow.common.dao;

import java.io.Serializable;
import java.sql.SQLException;
import java.util.List;

import org.apache.commons.lang.ArrayUtils;
import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.ScrollableResults;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.ObjectRetrievalFailureException;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import org.springframework.util.Assert;

/**
 */
@SuppressWarnings("unchecked")
public abstract class HibernateGenericDao extends HibernateDaoSupport {

    @Autowired    
    public void setSessionFactoryOverride(SessionFactory sessionFactory)    
    {    
       super.setSessionFactory(sessionFactory);    
    }    
    
	public <T> T get(Class<T> entityClass, Serializable id)
			throws ObjectRetrievalFailureException {
		T obj = (T) getHibernateTemplate().get(entityClass, id);
		if (obj == null)
			throw new ObjectRetrievalFailureException(entityClass, id);
		return obj;
	}

	public <T> T tryGet(Class<T> entityClass, Serializable id)
			throws ObjectRetrievalFailureException {
		T obj = (T) getHibernateTemplate().get(entityClass, id);
		return obj;
	}
	public <T> List<T> getAll(Class<T> entityClass) {
		return getHibernateTemplate().loadAll(entityClass);
	}

	public void save(Object obj) {
		getHibernateTemplate().saveOrUpdate(obj);
	}
	
	public void merge(Object obj)
	{
		getHibernateTemplate().merge(obj);
	}
	
	public void remove(Object obj) {
		getHibernateTemplate().delete(obj);

	}

	public <T> void removeById(Class<T> entityClass, Serializable id) {
		remove(get(entityClass, id));
	}

	/**
	 * 根据属性名和属性值查询对象.
	 * 
	 * @return 符合条件的唯一对象
	 */
	public <T> T findUniqueByCriteria(Class<T> entityClass, String[] names,
			Object[] values) {
		Criteria criteria = getEntityCriteria(entityClass, names, values,
				"equal");
		return (T) criteria.uniqueResult();
	}

	/**
	 * 根据条件查询
	 */
	public <T> List<T> findByCriteria(Class<T> entityClass, String[] names,
			Object[] values) {
		Criteria criteria = getEntityCriteria(entityClass, names, values,
				"equal");
		return criteria.list();
	}

	/**
	 * 根据条件模糊查询
	 */
	public <T> List<T> findLikeByCriteria(Class<T> entityClass, String[] names,
			Object[] values) {

		Criteria criteria = getEntityCriteria(entityClass, names, values,
				"like");
		return criteria.list();
	}

	/**
	 * 根据实体查询
	 */
	private <T> Criteria getEntityCriteria(Class<T> entityClass,
			String[] names, Object[] values, String mode) {
		Criteria criteria = getSession().createCriteria(entityClass);
		for (int i = 0; i < names.length; i++) {
			String name = names[i];
			Object value = values[i];
			Assert.hasText(name);
			if (mode.equalsIgnoreCase("equal")) {
				criteria.add(Restrictions.eq(name, value));
			} else if (mode.equalsIgnoreCase("like")) {
				criteria.add(Restrictions.like(name, "%" + value + "%"));
			}
		}
		return criteria;
	}

	/**
	 * hql查询.
	 * 
	 * @param hql
	 *            HQL查询语句，包含带？的参数
	 * @param values
	 *            可变参数<br>
	 *            用户可以通过如下四种方式使用
	 *            <li>dao.find(hql)</li>
	 *            <li>dao.find(hql,arg0);</li>
	 *            <li>dao.find(hql,arg0,arg1);</li>
	 *            <li>dao.find(hql,new Object[arg0,arg1,arg2])</li>
	 * @return 符合条件的对象集合
	 */
	public List find(String hql, Object... values) {
		if (values.length == 0)
			return getHibernateTemplate().find(hql);
		else
			return getHibernateTemplate().find(hql, values);
	}
	/**
	 * hql查询.
	 * @author XuNuo
	 * @param hql
	 *            HQL查询语句，包含带？的参数
	 * @param values
	 *            可变参数<br>
	 *            用户可以通过如下四种方式使用
	 *            <li>dao.findOne(hql)</li>
	 *            <li>dao.findOne(hql,arg0);</li>
	 *            <li>dao.findOne(hql,arg0,arg1);</li>
	 *            <li>dao.findONe(hql,new Object[arg0,arg1,arg2])</li>
	 * @return 符合条件的一个对象，无则返回null
	 */
	public <X> X findOne(String hql, Object... values) {

		List objList = find(hql, values);
		if(objList.size() == 0)
			return null;
		else
			return (X)objList.get(0);
	}

	/**
	 * 分页查询
	 * 
	 * @param firstResult
	 *            起始记录数位置，从0开始
	 * @param maxResults
	 *            最大获取记录数
	 * @param hql
	 * @param values
	 * @return
	 */
	public List find(final int firstResult, final int maxResults,
			final String hql, final Object... values) {
		return (List) getHibernateTemplate().execute(new HibernateCallback() {
			public Object doInHibernate(Session session)
					throws HibernateException, SQLException {
				Query query = session.createQuery(hql);
				for (int i = 0; i < values.length; i++) {
					query.setParameter(i, values[i]);
				}
				query.setFirstResult(firstResult);
				query.setMaxResults(maxResults);
				return query.list();
			}
		});
	}

	/**
	 * 分页查询
	 * 
	 * @param page
	 *            分页对象
	 * @param hql
	 * @param values
	 * @return
	 */
	public List findPage(final Page page, final String hql,
			final Object... values) {
		return (List) getHibernateTemplate().executeFind(
				new HibernateCallback() {
					public Object doInHibernate(Session session)
							throws HibernateException, SQLException {
						Query query = session.createQuery(hql);
						for (int i = 0; i < values.length; i++) {
							query.setParameter(i, values[i]);
						}
						ScrollableResults sr = query.scroll();
						sr.last();
						int totalResults = sr.getRowNumber() + 1;
						page.setTotalResults(totalResults);
						page
								.setTotalPage((totalResults
										% page.getPageSize() == 0) ? (totalResults / page
										.getPageSize())
										: (totalResults / page.getPageSize() + 1));
						if (page.getPageIndex() - 1 > 0) {
							page.setPrePage(page.getPageIndex() - 1);
						}
						if (page.getPageIndex() + 1 <= page.getTotalPage()) {
							page.setNextPage(page.getPageIndex() + 1);
						}
						query.setFirstResult((page.getPageIndex() - 1)
								* page.getPageSize());
						query.setMaxResults(page.getPageSize());
						return query.list();
					}
				});
	}

	/**
	 * 执行hql语句
	 * 
	 * @param hql
	 *            HQL语句，包含带？的参数
	 * @param values
	 *            可变参数<br>
	 *            用户可以通过如下四种方式使用
	 *            <li>dao.execute(hql)</li>
	 *            <li>dao.execute(hql,arg0);</li>
	 *            <li>dao.execute(hql,arg0,arg1);</li>
	 *            <li>dao.execute(hql,new Object[arg0,arg1,arg2])</li>
	 * @return 修改数据记录的条数
	 */
	public int execute(final String hql, final Object... values) {
		if (values.length == 0) {
			return (Integer) getHibernateTemplate().execute(
					new HibernateCallback() {
						public Object doInHibernate(Session session)
								throws HibernateException, SQLException {
							return session.createQuery(hql).executeUpdate();
						}
					});
		} else {
			final int size = values.length;
			final Object[] parameters = ArrayUtils.clone(values);
			return (Integer) getHibernateTemplate().execute(
					new HibernateCallback() {
						public Object doInHibernate(Session session)
								throws HibernateException, SQLException {
							Query query = session.createQuery(hql);
							for (int i = 0; i < size; i++) {
								query.setParameter(i, parameters[i]);
							}
							return query.executeUpdate();
						}
					});
		}
	}
	

	/**
	 * 根据Query与Page取数据(findSQLPage 和  findPage 共用)
	 * */
	private final List getResultByQuery(Query query, Page page)
	{
		ScrollableResults sr = query.scroll();
		sr.last();
		int totalResults = sr.getRowNumber() + 1;
		page.setTotalResults(totalResults);
		page
				.setTotalPage((totalResults
						% page.getPageSize() == 0) ? (totalResults / page
						.getPageSize())
						: (totalResults / page.getPageSize() + 1));
		if (page.getPageIndex() - 1 > 0) {
			page.setPrePage(page.getPageIndex() - 1);
		}
		if (page.getPageIndex() + 1 <= page.getTotalPage()) {
			page.setNextPage(page.getPageIndex() + 1);
		}
		query.setFirstResult((page.getPageIndex() - 1)
				* page.getPageSize());
		query.setMaxResults(page.getPageSize());
		return query.list();
	}
	
	/**
	 * 分页查询
	 * 
	 * @param page
	 *            分页对象
	 * @param sql
	 * @param values
	 * @return
	 */
	public List findSQLPage(final Page page, final String sql,
			final Object... values) {
		return (List) getHibernateTemplate().executeFind(
				new HibernateCallback() {
					public Object doInHibernate(Session session)
							throws HibernateException, SQLException {
						Query query = session.createSQLQuery(sql);
						for (int i = 0; i < values.length; i++) {
							query.setParameter(i, values[i]);
						}
						return getResultByQuery(query, page);
					}
				});
	}

}
