package com.piggysnow.boss.core.web.admin.controller;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.TreeMap;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.web.servlet.ModelAndView;

import com.piggysnow.boss.core.domain.Partner;
import com.piggysnow.boss.core.domain.RechargeResult;
import com.piggysnow.boss.core.services.PartnerService;
import com.piggysnow.boss.core.services.RechargeQueryService;
import com.piggysnow.boss.core.services.ServerService;
import com.piggysnow.boss.core.web.UserSession;

public class RechargeQueryController extends EasyController {

	@Resource
	private RechargeQueryService rechargeQueryService;
	@Resource
	private PartnerService partnerService;
	@Resource
	private ServerService serverService;
	
	public void setServerService(ServerService serverService) {
		this.serverService = serverService;
	}
	
	public void setRechargeQueryService(RechargeQueryService rechargeQueryService) {
		this.rechargeQueryService = rechargeQueryService;
	}
	
	public void setPartnerService(PartnerService partnerService) {
		this.partnerService = partnerService;
	}


	/**
	 * 充值查询
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception 
	 */
	public ModelAndView rechargequery(HttpServletRequest request,
			HttpServletResponse response) throws Exception{
		ModelAndView mv = new ModelAndView("admin/rechargeQuery");
		return mv;
	}
	

	public ModelAndView doQuery(HttpServletRequest request,
			HttpServletResponse response) throws Exception{
			String serId = serverService.getServerIdString(request.getParameter("serverId"));
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
			List<RechargeResult> list = rechargeQueryService.findRechargeList(serId, beginTime, endTime, pid);
			
			List<TreeMap<String, String>> result = new ArrayList<TreeMap<String,String>>();
			List<BigInteger> totalNums = rechargeQueryService.findTotal(serId, beginTime, endTime, pid);
			int zongshu = 0;
			for(RechargeResult rr:list){
				TreeMap<String, String> map = new TreeMap<String, String>();
				int rmb = Integer.parseInt(rr.getXvalue()==null?"0":rr.getXvalue())/100;
				zongshu = zongshu + rmb;
				map.put("date", rr.getDate());
				map.put("income", rmb+"");
				map.put("personNum", rr.getNum()==null?"0":rr.getNum());
				result.add(map);
			}
			TreeMap<String, String> map = new TreeMap<String, String>();
			map.put("date", "总数");
			map.put("income", String.valueOf(zongshu));
			if(totalNums.size() > 0){
				map.put("personNum", totalNums.get(0).toString());
			}else {
				map.put("personNum", "0");
			}
			result.add(map);
			if("excel".equals(target)){
				ModelAndView mv = new ModelAndView("admin/rechargeExcel");
				mv.addObject("list", result);
				return mv;
			}
			
		return sendJson(response, result.size(),result);
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
}
