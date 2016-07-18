package com.piggysnow.boss.core.services;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.piggysnow.boss.core.domain.GiftCode;
import com.piggysnow.boss.core.domain.User;
import com.piggysnow.common.dao.HibernateEntityDao;
import com.piggysnow.common.dao.Page;
@Service
public class GiftCodeService extends HibernateEntityDao<GiftCode> {

	
	static Logger log = Logger.getLogger(GiftCodeService.class);
	
	//获取列表
	public List<GiftCode> findList(Page page, Long giftId, Integer status, String code){
		List<Object> args = new ArrayList<Object>();
		StringBuilder sb = new StringBuilder("from GiftCode  where status >= 0 ");
		if(giftId!=null){
			sb.append(" and giftId = ? ");
			args.add(giftId);
		}
		if(status!=null){
			sb.append(" and status = ? ");
			args.add(status);
		}
		if(code!=null && !"".equals(code)){
			sb.append(" and code = ? ");
			args.add(code);
		}
		sb.append(" order by id desc ");
		return this.findPage(page, sb.toString(), args.toArray());
	}
	
	
	//获取列表
	public List<Object[]> analayze(){
		List<Object[]> args = this.find(" select count(*) , giftId,status from GiftCode  where status >= 0 group by giftId, status ");
		return args;
	}
		
	
	public boolean genCode(long giftId, int num, User u){
		List<GiftCode> list = this.find(0, num, " from GiftCode where status < 0 and giftId is null order by id");
		if(list.size()!= num){
			return false;
		}
		Date now = new Date();
		for(GiftCode c: list){
			c.setCreator(u.getId());
			c.setCreatorName(u.getName());
			c.setGiftId(giftId);
			c.setStatus(GiftCode.STATUS_SET);
			c.setCreateTime(now);
			save(c);
		}
		return true;
	}
	
	public void notDo(){
		String[] w = new String[]{"a","b","c","d","e","f","g","h","i","j","k","m","n","p","q","r","s","t","u","v","w","x","y","z"};
		String[] n = new String[]{"0","1","2","3","4","5","6","7","8","9"};
		String s = "";
		
		//发散因子  i[0,2], j[0,22]    已使用 i=[1], j=[0,1,2,3]
		int length = w.length;
		
		int key1 = 31;
		int key2 = 7;
		List<String> slist = new ArrayList<String>();
		for(int i=0;i<length*length; i++){
			if(i%key2!=1){
				continue;
			}
			int x = i/length;
			int y = i%length;
			for(int j=0;j<100000;j++){
				if(j%key1==10){
					int z0 = j/10000;
					int z1 = (j%10000)/1000;
					int z2 = (j%1000) / 100;
					int z3 = (j%100) / 10;
					int z4 = (j%10);
					s =w[x]+ w[y] + z0 +z1+z2+z3+z4;
					
					slist.add(s);
				}
			}
		}
		Collections.shuffle(slist);

		Date dt = new Date();
		for(String c: slist){
			GiftCode gc = new GiftCode();
			gc.setCode(c);
			gc.setGiftId(null);
			gc.setImportTime(dt);
			gc.setStatus(GiftCode.STATUS_UNSET);
			if(this.findOne(" from GiftCode where code = ?" , gc.getCode())== null)
				save(gc);
		}
		logger.info("Count:" + slist.size());
	}

}
