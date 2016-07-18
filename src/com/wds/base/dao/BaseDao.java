package com.wds.base.dao;

import java.util.List;

public abstract class BaseDao<T>{

	public abstract void getd();

	public abstract T find(long l);
	
	public abstract List<T> findList();

	public abstract void insert();
	
	public abstract T save();

	public abstract void update();
	
}
