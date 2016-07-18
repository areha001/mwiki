package com.piggysnow.boss.core.web.admin.controller;

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
import com.piggysnow.boss.core.domain.RechargeResult;
import com.piggysnow.boss.core.services.NewAndActiveService.LoginResult;
import com.piggysnow.boss.core.services.NewAndActiveService.NewResult;
import com.piggysnow.boss.core.services.NewAndActiveService;
import com.piggysnow.boss.core.services.PartnerService;
import com.piggysnow.boss.core.services.RechargeQueryService;
import com.piggysnow.boss.core.services.ServerService;
import com.piggysnow.boss.core.web.UserSession;
import com.piggysnow.boss.core.web.admin.controller.EasyController;

public class DailyController extends EasyController{

	@Resource
	private PartnerService partnerService;
	@Resource
	private NewAndActiveService newAndActiveService;
	@Resource
	private RechargeQueryService rechargeQueryService;
	@Resource
	private ServerService serverService;
	
	public void setServerService(ServerService serverService) {
		this.serverService = serverService;
	}

	public void setNewAndActiveService(NewAndActiveService newAndActiveService) {
		this.newAndActiveService = newAndActiveService;
	}
	
	public void setPartnerService(PartnerService partnerService) {
		this.partnerService = partnerService;
	}
	
	public void setRechargeQueryService(RechargeQueryService rechargeQueryService){
		this.rechargeQueryService = rechargeQueryService;
	}

	public ModelAndView findPage(HttpServletRequest request,
			HttpServletResponse response){
		ModelAndView mv = new ModelAndView("admin/dailyPaper");
		return mv;
	}
	
	public ModelAndView findDailyPaper(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String serverId = serverService.getServerIdString(request.getParameter("serverId"));
		String beginTime = request.getParameter("beginTime");
		String endTime = request.getParameter("endTime");
		String parnter = request.getParameter("parnter");
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
		}else if(StringUtils.isNotEmpty(parnter)){
			Partner p = partnerService.get(parnter);
			pid = p.getDcode();
		}
		DecimalFormat df = new DecimalFormat("0.00");
		List<NewResult> newUsers = newAndActiveService.findNewResults(serverId, beginTime, endTime, pid);
		List<LoginResult> activities = newAndActiveService.findLoginResults(serverId, beginTime, endTime, pid);
		List<RechargeResult> payUsers = rechargeQueryService.findRechargeList(serverId, beginTime, endTime, pid);
		List<Map<String, String>> result = new ArrayList<Map<String,String>>();
		for(LoginResult login : activities){
			Map<String, String> map = new HashMap<String, String>();
			map.put("datatime", login.getDate());
			map.put("activity", login.getLoginaccount());
			map.put("newAdd", "0");
			for(NewResult n:newUsers){
				if(login.getDate().equals(n.getDate())){
					map.put("newAdd", n.getNewaccount());
				}
			}
			map.put("pay", "0");
			map.put("payNum", "0");
			map.put("ARPU", "0.00");
			map.put("rate", "0.00%");
			for(RechargeResult rr : payUsers){
				if(login.getDate().equals(rr.getDate())){
					int rmb = Integer.valueOf(rr.getXvalue())/100;
					double arpu = ARPU(rmb+"", rr.getNum());
					map.put("pay", rmb+"");
					map.put("payNum", rr.getNum());
					map.put("ARPU", df.format(arpu));
					double rate = ARPU(rr.getNum(), login.getLoginaccount());
					map.put("rate", df.format(rate*100)+"%");
				}
			}
			result.add(map);
		}
		if("excel".equals(target)){
			ModelAndView mv = new ModelAndView("admin/dailyExcel");
			mv.addObject("list", result);
			return mv;
		}
		return sendJson(response, result.size(), result);
	}
	
	private String cutString(String s){
		String b = "";
		if(StringUtils.isNotEmpty(s)){
			String[] a = s.split(",");
			for(int i = 0; i < a.length;i++){
				if(!"不限".equals(a[i])){
					b = b+"'"+a[i]+"'"+",";
				}
			}
			b = b.substring(1, b.length()-2);
		}
		return b;
	}
	
	public double ARPU(String pay,String num){
		double p = Double.parseDouble(pay);
		double n = Double.parseDouble(num);
		double arpu = p/n;
		return arpu;
	}
	
}
