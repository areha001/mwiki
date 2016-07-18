package com.piggysnow.boss.core.web.admin.controller;

import java.sql.SQLException;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.web.servlet.ModelAndView;

import com.piggysnow.boss.core.domain.Dict;
import com.piggysnow.boss.core.domain.Partner;
import com.piggysnow.boss.core.domain.Retention;
import com.piggysnow.boss.core.services.PartnerService;
import com.piggysnow.boss.core.services.RetentionService;
import com.piggysnow.boss.core.services.ServerService;
import com.piggysnow.boss.core.services.UserRetenTionService;
import com.piggysnow.boss.core.services.UserService;
import com.piggysnow.boss.core.services.UserRetenTionService.DateAndCount;
import com.piggysnow.boss.core.services.UserRetenTionService.DateAndUser;
import com.piggysnow.boss.core.web.UserSession;

public class UserRetentionController extends EasyController{
	@Resource
	private UserRetenTionService userRetenTionService;
	@Resource
	private PartnerService partnerService;
	@Resource
	private ServerService serverService;
	@Resource
	private RetentionService retentionService;
	
	public void setRetentionService(RetentionService retentionService){
		this.retentionService = retentionService;
	}
	
	public void setServerService(ServerService serverService) {
		this.serverService = serverService;
	}
	
	public void setUserRetenTionService(UserRetenTionService userRetenTionService) {
		this.userRetenTionService = userRetenTionService;
	}
	
	public void setPartnerService(PartnerService partnerService) {
		this.partnerService = partnerService;
	}


	public ModelAndView getRetention(HttpServletRequest request,HttpServletResponse response){
		ModelAndView mv = new ModelAndView("admin/userRetention");
		return mv;
	}

	private int water = 100;
	public ModelAndView findRetenTion(HttpServletRequest request,
			HttpServletResponse response) throws SQLException, Exception{
		String serId = serverService.getServerIdString(request.getParameter("serverId"));
		String beginTime = request.getParameter("beginTime");
		String endTime = request.getParameter("endTime");
		String partner = request.getParameter("parnter");
		String target = request.getParameter("target");
		if(StringUtils.isNotEmpty(beginTime)){
			beginTime = beginTime.split("T")[0];
		}
		if(StringUtils.isNotEmpty(endTime)){
			endTime = endTime.split("T")[0]+" 23:59:59";
		}
		String pid = "";
		Long departId = UserSession.getDepartId(request);
		// 渠道id不为空，只能获取该渠道信息
		if (departId != null && partnerService.findMap().get(departId) != null) {
			Partner pt = partnerService.findMap().get(departId);
			pid = pt.getDcode();
		}else if(StringUtils.isNotEmpty(partner)){
			Partner p = partnerService.get(partner);
			pid = p.getDcode();
		}
		Dict dict = StaticServiceController.getDictService().get(1L);
		if(dict != null)
		{
			water = dict.getSubId();
		}

		System.out.println("Water is : " + water);
		
		//根据条件查时间和新注册用户的总数
		List<DateAndCount> list1 = userRetenTionService.getDateAndTotal(serId, beginTime, endTime, pid);
		List<TreeMap<String, String>> list = new ArrayList<TreeMap<String,String>>();
		String serverId = "";
		if(StringUtils.isNotEmpty(request.getParameter("serverId"))){
			serverId = serverService.findServerIdBy(request.getParameter("serverId"));
		}
		for(DateAndCount dac : list1){
			TreeMap<String, String> map1 = new TreeMap<String, String>();
			map1.put("date", dac.getDate());
			map1.put("total", dac.getTotal());
			Retention retention = retentionService.findRetention(dac.getDate(), pid, serverId);
			if(retention == null){
				retention = new Retention();
				retention.setTime(dac.getDate());
				retention.setPublishChannel(pid);
				retention.setServerId(serverId);
			}
			
			String two = retention.getTwo();
			String three = retention.getThree();
			String four = retention.getFour();
			String five = retention.getFive();
			String six = retention.getSix();
			String seven = retention.getSeven();
			String eight = retention.getEight();
			
			if(null == two && dateBefore(dac.getDate(), 0)){
				List<DateAndCount> list3 = userRetenTionService.findByTimeAndUid(dac.getDate(), serId, 1,pid);
				two = getPercent(list3.get(0).getTotal(), dac.getTotal());
				if(dateBefore(dac.getDate(), 1)){
					retention.setTwo(two);
				}
			}
			if(null == three && dateBefore(dac.getDate(), 1)){
				List<DateAndCount> list3 = userRetenTionService.findByTimeAndUid(dac.getDate(), serId, 2,pid);
				three = getPercent(list3.get(0).getTotal(), dac.getTotal());
				if(dateBefore(dac.getDate(), 2)){
					retention.setThree(three);
				}
			}
			if(null == four && dateBefore(dac.getDate(), 2)){
				List<DateAndCount> list3 = userRetenTionService.findByTimeAndUid(dac.getDate(), serId, 3,pid);
				four = getPercent(list3.get(0).getTotal(), dac.getTotal());
				if(dateBefore(dac.getDate(), 3)){
					retention.setFour(four);
				}
			}
			if(null == five && dateBefore(dac.getDate(), 3)){
				List<DateAndCount> list3 = userRetenTionService.findByTimeAndUid(dac.getDate(), serId, 4,pid);
				five = getPercent(list3.get(0).getTotal(), dac.getTotal());
				if(dateBefore(dac.getDate(), 4)){
					retention.setFive(five);
				}
			}
			if(null == six && dateBefore(dac.getDate(), 4)){
				List<DateAndCount> list3 = userRetenTionService.findByTimeAndUid(dac.getDate(), serId, 5,pid);
				six = getPercent(list3.get(0).getTotal(), dac.getTotal());
				if(dateBefore(dac.getDate(), 5)){
					retention.setSix(six);
				}
			}
			if(null == seven && dateBefore(dac.getDate(), 5)){
				List<DateAndCount> list3 = userRetenTionService.findByTimeAndUid(dac.getDate(), serId, 6,pid);
				seven = getPercent(list3.get(0).getTotal(), dac.getTotal());
				if(dateBefore(dac.getDate(), 6)){
					retention.setSeven(seven);
				}
			}
			if(null == eight && dateBefore(dac.getDate(), 6)){
				List<DateAndCount> list3 = userRetenTionService.findByTimeAndUid(dac.getDate(), serId, 7,pid);
				eight = getPercent(list3.get(0).getTotal(), dac.getTotal());
				if(dateBefore(dac.getDate(), 7)){
					retention.setEight(eight);
				}
			}
		
			retentionService.save(retention);
			map1.put("two", two);
			map1.put("three", three);
			map1.put("four", four);
			map1.put("five", five);
			map1.put("six", six);
			map1.put("seven", seven);
			map1.put("eight", eight);
			list.add(map1);
		}
		if("excel".equals(target)){
			ModelAndView mv = new ModelAndView("admin/userRetentionExcel");
			mv.addObject("list", list);
			return mv;
		}
		
		return sendJson(response, list.size(), list);
	}
	
	private Map<String, List<String>> getMap(List<DateAndUser> list){
		Map<String, List<String>> map2 = new HashMap<String, List<String>>();
		List<String> userList = null;
		
		for (DateAndUser dau:list) {
			String date = dau.getDate();
			userList = map2.get(date);
			if(userList == null){
				userList = new ArrayList<String>();
				userList.add(dau.getPlayerid());
			}else{
				userList.add(dau.getPlayerid());
			}	
			map2.put(date, userList);
		}
		return map2;
	}
	
	private String getPercent(String retention,String total){
		if ("0".equals(retention) || "0".equals(total)) {
			return "";
		}else{
			double a = Double.parseDouble(retention);
			double b = Double.parseDouble(total);
			double c = a/b*water;
			if(c>100)
				c=100;
			DecimalFormat df = new DecimalFormat("0.00");
			String d = df.format(c)+"%";
			return d;
		}
	}
	
	// 判断时间是否在今天之前
	private boolean dateBefore(String date, int day) throws ParseException{
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date dt=sdf.parse(date);
	    Calendar newTime = Calendar.getInstance();
	    newTime.setTime(dt);
	    newTime.add(Calendar.DAY_OF_YEAR, day);
	    Date now = sdf.parse(sdf.format(new Date()));
		return newTime.getTime().before(now);
	}
	
	public static void main(String[] args) {
		double a = 70.0;
		double b = 90.0;
		double c = a/b*100;
		DecimalFormat df = new DecimalFormat("0.00");
		String d = df.format(c)+"%";
		System.err.println(d);
	}

}
