package org.slave4j.orm.hibernate;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.ScrollableResults;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;
import org.slave4j.orm.Compositor;
import org.slave4j.orm.Filtration;
import org.slave4j.orm.PageData;
import org.slave4j.utils.HibernateUtils;
import org.slave4j.utils.ReflectionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import com.piggysnow.common.dao.Page;
import com.wds.base.dao.BaseEntity;


/**
 * dao基类.
 * 		1：该类封装了最常见数据库操作的方法，你可以继承该类，添加自己喜欢的方法
 * 		2：当你有多个sessionFactory时，你也可以在你的子类中重写setSessionFactory()方法
 * @author yangzhibin
 *
 * @param <T> 实体类类型
 */
@SuppressWarnings("unchecked")
@Transactional
public class HibernateDao<T extends BaseEntity>
{
	protected Logger logger = LoggerFactory.getLogger(getClass());

	protected SessionFactory sessionFactory;

	protected Class<T> entityClass;

	/**
	 * 构造方法
	 */
	public HibernateDao()
	{
		this.entityClass = ReflectionUtils.getSuperClassGenricType(getClass());
	}

	/**
	 * 采用@Resource(name="xxx")按名称注入SessionFactory, 当有多个SesionFactory的时候Override本函数.
	 */
	@Resource
	public void setSessionFactory(SessionFactory sessionFactory)
	{
		this.sessionFactory = sessionFactory;
	}

	/**
	 * 取得Session.
	 */
	public Session getSession()
	{
		return sessionFactory.getCurrentSession();
	}

	//--------------------------------------------------------------------------------------------------

	/**
	 * 新增对象.
	 */
	public void save(BaseEntity entity)
	{
		if(entity.isNew())
//			save(entity);
			saveOld(entity);
		else
			update(entity);
	}
	/**
	 * 新增对象.
	 */
	public void saveOld(BaseEntity entity)
	{
		Assert.notNull(entity, "entity不能为空");
		getSession().save(entity);
		logger.debug("save entity: {}", entity);
	}

	/**
	 * 修改对象.
	 */
	public void update(BaseEntity entity)
	{
		Assert.notNull(entity, "entity不能为空");
		getSession().update(entity);
		logger.debug("update entity: {}", entity);
	}

	/**
	 * 删除对象.
	 */
	public void delete(BaseEntity entity)
	{
		Assert.notNull(entity, "entity不能为空");
		getSession().delete(entity);
		logger.debug("delete entity: {}", entity);
	}

	/**
	 * 删除对象.
	 */
	public void delete(Long id)
	{
		T entity = find(id);
		if(entity != null) {
			delete(entity);
		}
		logger.debug("delete entity {},id is {}", entityClass.getSimpleName(), id);
	}

	/**
	 * 按id获取对象.
	 */
	public T find(Long id)
	{
		Assert.notNull(id, "id不能为空");
		return (T) getSession().get(entityClass, id);
	}

	/**
	 * 按属性查找唯一对象,匹配方式为相等.
	 */
	public T findByField(String fieldName, Object fieldValue)
	{
		Assert.hasText(fieldName, "fieldName不能为空");
		Criterion criterion = Restrictions.eq(fieldName, fieldValue);
		return (T) HibernateUtils.createCriteria(getSession(), entityClass, criterion).uniqueResult();
	}

	/**
	 * 按属性查找对象列表,匹配方式为相等.
	 */
	public List<T> findListByField(String fieldName, Object fieldValue)
	{
		Assert.hasText(fieldName, "fieldName不能为空");
		Criterion criterion = Restrictions.eq(fieldName, fieldValue);
		return HibernateUtils.createCriteria(getSession(), entityClass, criterion).list();
	}

	/**
	 * 按照过滤条件对象查找对象列表.
	 */
	public List<T> findListByField(Filtration... filtrations)
	{
		Criteria criteria = HibernateUtils.createCriteria(getSession(), entityClass);
		//设置过滤条件
		criteria = HibernateUtils.setFiltrationParameter(criteria, filtrations);
		return criteria.list();
	}

	/**
	 * 按照过滤条件对象查找对象列表.
	 */
	public List<T> findListByField(List<Filtration> filtrationList)
	{
		Criteria criteria = HibernateUtils.createCriteria(getSession(), entityClass);
		//设置过滤条件
		criteria = HibernateUtils.setFiltrationParameter(criteria, filtrationList);
		return criteria.list();
	}

	/**
	 * 按照过滤条件对象查找对象列表，支持排序.
	 */
	public List<T> findListByField(Compositor compositor, Filtration... filtrations)
	{
		Criteria criteria = HibernateUtils.createCriteria(getSession(), entityClass);
		//设置过滤条件
		criteria = HibernateUtils.setFiltrationParameter(criteria, filtrations);
		//设置排序
		criteria = HibernateUtils.setCompositorParameter(criteria, compositor);
		return criteria.list();
	}

	/**
	 * 按照过滤条件对象查找对象列表，支持排序.
	 */
	public List<T> findListByField(Compositor compositor, List<Filtration> filtrationList)
	{
		Criteria criteria = HibernateUtils.createCriteria(getSession(), entityClass);
		//设置过滤条件
		criteria = HibernateUtils.setFiltrationParameter(criteria, filtrationList);
		//设置排序
		criteria = HibernateUtils.setCompositorParameter(criteria, compositor);
		return criteria.list();
	}

	/**
	 * 获取全部对象.
	 */
	public List<T> findAll()
	{
		return findListByField();
	}

	/**
	 * 获取全部对象,支持排序.
	 */
	public List<T> findAll(Compositor compositor)
	{
		return findListByField(compositor);
	}

	/**
	 * 分页查询.
	 */
	public PageData<T> find(PageData<T> pageData)
	{
		Assert.notNull(pageData, "pageData不能为空");
		Criteria criteria = HibernateUtils.createCriteria(getSession(), entityClass);
		HibernateUtils.setParameter(criteria, pageData);
		pageData.setResult(criteria.list());
		return pageData;
	}

	/**
	 * 按id列表获取对象.
	 */
	public List<T> findListByIds(List<Long> idList)
	{
		if (idList != null && idList.size() >= 1)
		{
			Criterion criterion = Restrictions.in("id", idList);
			return HibernateUtils.createCriteria(getSession(), entityClass, criterion).list();
		} else
		{
			return null;
		}
	}

	//--------------------------------------------------------------------------------------------------

	/**
	 * 按HQL查询唯一对象.
	 * @param hql "from Users where name=? and password=?"
	 * @param values 数量可变的参数,按顺序绑定.
	 * @return
	 */
	public <X> X findOne(String hql, Object... values)
	{
		List<X> list = HibernateUtils.createQuery(getSession(), hql, values).list();
		if(list.size()>0){
			return list.get(0);
		}
		return null;
	}

	/**
	 * 按HQL查询唯一对象.
	 * @param hql "from Users where name=:name and password=:password"
	 * @param values 命名参数,按名称绑定.
	 * @return
	 */
	public <X> X findOne(String hql, Map<String, ?> values)
	{
		List<X> list = HibernateUtils.createQuery(getSession(), hql, values).list();
		if(list.size()>0){
			return list.get(0);
		}
		return null;
	}

	/**
	 * 按HQL查询对象列表.
	 * @param hql "from Users where name=? and password=?"
	 * @param values 数量可变的参数,按顺序绑定.
	 * @return
	 */
	public <X> List<X> findList(String hql, Object... values)
	{
		return HibernateUtils.createQuery(getSession(), hql, values).list();
	}

	/**
	 * 按HQL查询对象列表.
	 * @param hql "from Users where name=:name and password=:password"
	 * @param values 命名参数,按名称绑定.
	 * @return 
	 */
	public <X> List<X> findList(String hql, Map<String, ?> values)
	{
		return HibernateUtils.createQuery(getSession(), hql, values).list();
	}

	/**
	 * 执行HQL进行批量修改/删除操作.
	 * @return 更新记录数.
	 */
	public int batchExecute(String hql, Object... values)
	{
		return HibernateUtils.createQuery(getSession(), hql, values).executeUpdate();
	}

	/**
	 * 执行HQL进行批量修改/删除操作.
	 * @return 更新记录数.
	 */
	public int batchExecute(String hql, Map<String, ?> values)
	{
		return HibernateUtils.createQuery(getSession(), hql, values).executeUpdate();
	}
	//--------------------------------------------------------------------------------------------------

	/**
	 * 本地SQL进行修改/删除操作.
	 * @return 更新记录数.
	 */
	public List find(String sql)
	{
		Assert.hasText(sql, "sql不能为空");
		return getSession().createSQLQuery(sql).list();
	}

	
	//===============================
	

	/**
	 * 分页查询
	 * 
	 * @param page
	 *            分页对象
	 * @param hql
	 * @param values
	 * @return
	 */
	public List findPage( Page page, String hql, Object... values) {
		
		
		Assert.hasText(hql, "hql不能为空");
		Query query = this.getSession().createQuery(hql);
		for (int i = 0; i < values.length; i++) {
			query.setParameter(i, values[i]);
		}
//		ScrollableResults sr = query.scroll();
//		sr.last();
//		int totalResults = sr.getRowNumber() + 1;
		
		if(page.isDoCount())
		{
			int totalResults = -1;
			try
			{
				String countSql = getCountHql(hql);
				Query countQuery = this.getSession().createQuery(countSql);
				for (int i = 0; i < values.length; i++) {
					countQuery.setParameter(i, values[i]);
				}
				List<Long> l = countQuery.list() ;
				totalResults = l.get(0).intValue();
			}
			catch (Exception e) {e.printStackTrace();}
			Assert.isTrue(totalResults >= 0);
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
		}
		query.setFirstResult((page.getPageIndex() - 1)
				* page.getPageSize());
		query.setMaxResults(page.getPageSize());
		return query.list();
	}
	
	public static void main(String args[])
	{
		String str = "select id,name from sdf where id = 1 and name = (select name from s where name = '张三' )";
		System.out.println(getCountHql(str));
	}
	private static String getCountHql(String str)
	{
		String s = str + "";
		StringBuilder sb = new StringBuilder();
		sb.append("select count(");
		if(s.matches("^\\s*from"))
		{
			s = " select count (*) " + s;
		}
		else
		{
			s = " select count (*) " + s.substring(s.indexOf("from"), s.length());
		}
		return s;
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
	public List findPage(final Page page, String hql, Map<String, ?> values) {
		
		Assert.hasText(hql, "hql不能为空");
		Query query = this.getSession().createQuery(hql);
		if (values != null)
		{
			query.setProperties(values);
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


	//======================

}
