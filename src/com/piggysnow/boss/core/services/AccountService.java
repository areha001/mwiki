package com.piggysnow.boss.core.services;

import org.slave4j.orm.hibernate.HibernateDao;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.piggysnow.boss.core.domain.Account;
import com.wds.base.dao.BaseDao;

@Repository
@Service
public class AccountService extends HibernateDao<Account> {

}
