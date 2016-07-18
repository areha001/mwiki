package com.piggysnow.boss.core.web.admin.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.web.servlet.ModelAndView;

import com.piggysnow.boss.core.domain.Order;
import com.piggysnow.boss.core.domain.Partner;
import com.piggysnow.boss.core.services.PartnerService;
import com.piggysnow.boss.core.services.PrepaidListService;
import com.piggysnow.boss.core.services.PrepaidListService.Recharge;
import com.piggysnow.boss.core.services.ServerService;
import com.piggysnow.boss.core.web.UserSession;
import com.piggysnow.boss.core.web.admin.controller.EasyController;
import com.piggysnow.common.dao.Page;

public class PrepaidListController extends EasyController{

	@Resource
	private PrepaidListService prepaidListService;
	@Resource
	private PartnerService partnerService;
	@Resource
	private ServerService serverService;
	
	public void setServerService(ServerService serverService) {
		this.serverService = serverService;
	}
	
	public void setPrepaidListService(PrepaidListService prepaidListService) {
		this.prepaidListService = prepaidListService;
	}
	
	public void setPartnerService(PartnerService partnerService) {
		this.partnerService = partnerService;
	}


	public ModelAndView getPage(HttpServletRequest request,
			HttpServletResponse response){
		ModelAndView mv = new ModelAndView("admin/prepaidList");
		return mv;
		
	}
	public ModelAndView findprepaidList(HttpServletRequest request,
			HttpServletResponse response) throws Exception{
			String serId = serverService.getServerIdString(request.getParameter("serverId"));
			String beginTime = request.getParameter("beginTime");
			String endTime = request.getParameter("endTime");
			String partner = request.getParameter("parnter");
			String target = request.getParameter("target");
			Page page = new Page(request);
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
			List<Recharge> list = prepaidListService.findList(serId, beginTime, endTime, pid);  
			List<Map<String, String>> result = new ArrayList<Map<String,String>>();
			for(Recharge p:list){
				Map<String, String> map = new HashMap<String, String>();
				map.put("uid", p.getPlayerId());
				map.put("name", p.getName());
				map.put("amount", p.getAmount()/100+"");
				// 把服务器id转为名字显示
				String serverName = serverService.findServerNameBy("GAME"+p.getServerId());
				map.put("server", serverName);
				result.add(map);
			}
			if("excel".equals(target)){
				ModelAndView mv = new ModelAndView("admin/prepaidListExcel");
				mv.addObject("list", result);
				return mv;
			}
		return sendJson(response, page.getTotalResults(), result);
	}
}
