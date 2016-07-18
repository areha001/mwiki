package com.piggysnow.boss.core.web.admin.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;

import com.piggysnow.boss.core.domain.Order;
import com.piggysnow.boss.core.services.DictService;
import com.piggysnow.boss.core.services.OrderService;
import com.piggysnow.boss.core.services.PartnerService;
import com.piggysnow.boss.core.services.ServerService;

/**
 * 
 * 后台管理--统计数据
 */

public class StatisticsController extends EasyController {

	@Resource
	private PartnerService partnerService;
	@Resource
	private ServerService serverService;
	@Resource
	private DictService dictService;
	@Resource
	private OrderService orderService;
	
	public void setPartnerService(PartnerService partnerService) {
		this.partnerService = partnerService;
	}

	public void setServerService(ServerService serverService) {
		this.serverService = serverService;
	}

	public void setDictService(DictService dictService) {
		this.dictService = dictService;
	}

	public ModelAndView pageIncome(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		ModelAndView mav = new ModelAndView("admin/order");
		return mav;
	}

	public ModelAndView showIncome(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		List<Order> list = orderService.query(request);
		if (list == null) {
			list = new ArrayList<Order>();
		}
		List<Map<String, String>> result = new ArrayList<Map<String,String>>(); 
		for (Order order : list) {
			Map<String, String> map = new HashMap<String, String>();
			String server = serverService.findServerNameBy("GAME"+order.getServerId());
            map.put("id", order.getId()+"");
            map.put("playerId", order.getPlayerId()+"");
            map.put("serverId", server);
            map.put("name", order.getName());
            String channel = partnerService.showPartnerNameByCode(order.getPublishChannel());
            map.put("channel", channel);
            map.put("diamond", order.getDiamond()+"");
            map.put("rmb", order.getRmb()/100+"");
            map.put("status", getStatus(order.getStatus()));
            map.put("createTime", dateString(order.getCreateTime()));
            map.put("payTime", dateString(order.getPayTime()));
            map.put("chargeTime", dateString(order.getChargeTime()));
            map.put("payServerIp", order.getPayServerIp());
            map.put("orderId", order.gameOrderId+"");
            map.put("mallId", order.getMallId()+"");
//            map.put("orderId", order.getCpOrderId());
            result.add(map);
		}
		String target = request.getParameter("target");
		if("excel".equals(target)){
			ModelAndView mv = new ModelAndView("admin/orderExcel");
			mv.addObject("list",result);
			return mv;
		}
		return sendJson(response, result.size(), result);
	}
	
	private String dateString(Date date){
		if(date == null){
			return "";
		}
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String dateString = sdf.format(date);
		return dateString;
	}
	
	private String getStatus(int status){
		String payStatus = "未充值";
		if(status == 1){
			payStatus = "已充值";
		}else if(status == 2){
			payStatus = "充值完成";
		}
		return payStatus;
	}
}
