package com.piggysnow.boss.core.services;

import org.springframework.stereotype.Service;

import com.piggysnow.boss.core.domain.Item;
import com.piggysnow.common.dao.HibernateEntityDao;

@Service
public class ItemService  extends HibernateEntityDao<Item> {
	
}

