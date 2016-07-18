package com.piggysnow.boss.core.web.admin.controller;

import java.sql.SQLException;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.web.servlet.ModelAndView;

import com.piggysnow.boss.core.domain.Partner;
import com.piggysnow.boss.core.services.AverageService;
import com.piggysnow.boss.core.services.ServerService;
import com.piggysnow.boss.core.services.AverageService.Consume;
import com.piggysnow.boss.core.services.AverageService.Own;
import com.piggysnow.boss.core.services.NewAndActiveService;
import com.piggysnow.boss.core.services.NewAndActiveService.LoginResult;
import com.piggysnow.boss.core.services.PartnerService;
import com.piggysnow.boss.core.web.UserSession;
import com.piggysnow.boss.core.web.admin.controller.EasyController;

public class AverageController extends EasyController{
	@Resource
	private NewAndActiveService newAndActiveService;
	@Resource
	private AverageService averageService;
	@Resource
	private PartnerService partnerService;
	@Resource
	private ServerService serverService;
	
	public void setServerService(ServerService serverService) {
		this.serverService = serverService;
	}
	
	public void setNewAndActiveService(NewAndActiveService newAndActiveService) {
		this.newAndActiveService = newAndActiveService;
	}

	public void setAverageService(AverageService averageService) {
		this.averageService = averageService;
	}

	public void setPartnerService(PartnerService partnerService) {
		this.partnerService = partnerService;
	}

	public ModelAndView getPage(HttpServletRequest rewHttpServletRequest,HttpServletResponse response){
		ModelAndView mv = new ModelAndView("admin/averageList");
		return mv;
	}

	public ModelAndView findAverage(HttpServletRequest request,HttpServletResponse response) throws SQLException, Exception{
		String serId = serverService.getServerIdString(request.getParameter("serverId"));
		String beginTime = request.getParameter("beginTime");
		String endTime = request.getParameter("endTime");
		String parnter = request.getParameter("parnter");
		String target = request.getParameter("target");
		String pid = "";
		if(StringUtils.isNotEmpty(beginTime)){
			beginTime = beginTime.split("T")[0];
		}
		if(StringUtils.isNotEmpty(endTime)){
			endTime = endTime.split("T")[0]+" 23:59:59";
		}
		Long departId = UserSession.getDepartId(request);
		// 渠道id不为空，只能获取该渠道信息
		if (departId != null && partnerService.findMap().get(departId) != null) {
			Partner pt = partnerService.findMap().get(departId);
			pid = pt.getDcode();
		}else if(StringUtils.isNotEmpty(parnter)){
			Partner p = partnerService.get(parnter);
			pid = p.getDcode();
		}
		List<LoginResult> list1 = newAndActiveService.findLoginResults(serId, beginTime, endTime, pid);
		List<Own> list2 = averageService.findOwns(serId, beginTime, endTime, pid);
		List<Consume> list3 = averageService.findConsumes(serId, beginTime, endTime, pid);
		List<Map<String, String>> result = new ArrayList<Map<String,String>>();
		DecimalFormat df = new DecimalFormat("0.0");
		for(LoginResult lr:list1){
			Map<String, String> map = new HashMap<String, String>();
			String date = lr.getDate();
			String num = lr.getLoginaccount();
			map.put("date", date);
			map.put("amount", num);
			map.put("own", "0.0");
			for(Own own:list2){
				if(own.getDatatime().equals(date)){
					String doller = own.getOwn();
					map.put("own", df.format(percent(doller, num)));
				}
			}
			map.put("consume", "0.0");
			for(Consume c:list3){
				if(c.getDatatime().equals(date)){
					String con = c.getConsume();
					map.put("consume", df.format(percent(con, num)));
				}
			}
			result.add(map);
		}
		if("excel".equals(target)){
			ModelAndView mv = new ModelAndView("admin/averageExcel");
			mv.addObject("list",result);
			return mv;
		}
		return sendJson(response, result.size(), result);
	}
	
	private double percent(String amount,String num){
		if(StringUtils.isEmpty(num)){
			return 0.0;
		}else if("0".equals(num)){
			return 0.0;
		}else{
			return Double.parseDouble(amount)/Double.parseDouble(num);
		}
	}
	
}
