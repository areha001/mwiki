package com.piggysnow.boss.utils;

import java.util.Date;

import com.piggysnow.boss.core.domain.Happen;
import com.piggysnow.boss.core.domain.User;
import com.piggysnow.boss.core.web.admin.controller.StaticServiceController;

/**创建日志*/
public class HappenHelper{
/**创建操作日志记录*/
	public static void create(User u, String info){
		Happen h = new Happen();
		h.setCreateTime(new Date());
		h.setCreator(u.getId());
		h.setCreatorName(u.getName());
		h.setInfo(info);
		StaticServiceController.getHappenService().save(h);
	}
}
