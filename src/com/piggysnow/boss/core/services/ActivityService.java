package com.piggysnow.boss.core.services;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Service;
import org.springframework.web.servlet.ModelAndView;

import com.piggysnow.boss.core.domain.Activity;
import com.piggysnow.boss.core.domain.GMail;
import com.piggysnow.boss.core.domain.Partner;
import com.piggysnow.boss.core.interceptor.AdminPermission;
import com.piggysnow.boss.core.web.UserSession;
import com.piggysnow.common.dao.HibernateEntityDao;
import com.piggysnow.common.dao.Page;
@Service
public class ActivityService extends HibernateEntityDao<Activity> {


}
