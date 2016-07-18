package com.piggysnow.common.dao;

import java.io.Serializable;
import java.util.List;

import org.springframework.web.context.ContextLoaderListener;

/**
 * 实体DAO ,完成绝大多数CRUD操作
 * 
 * @author <a href="mailto:qhuang@chinaschool.net">黄桥</a><br>
 * @since 2007-11-20
 * 
 */
public interface EntityDao<T> {
	public T get(Serializable id);

	public List<T> getAll();

	public List<T> getAll(Page page, String... orderFields);

	public void save(Object obj);

	public void remove(Object obj);

	public void removeById(Serializable id);
	
	public List<T> findByExample(T exampleEntity);

	public T findOneByExample(T exampleEntity);
}
