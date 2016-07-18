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

import com.piggysnow.boss.core.domain.Partner;
import com.piggysnow.boss.core.services.PartnerService;
import com.piggysnow.boss.core.services.PlayerRoleService;
import com.piggysnow.boss.core.services.PlayerRoleService.Player;
import com.piggysnow.boss.core.services.ServerService;
import com.piggysnow.boss.core.web.UserSession;
import com.piggysnow.common.dao.Page;

public class PlayerRoleController extends EasyController {


	@Resource
	private PartnerService partnerService;
	@Resource
	private PlayerRoleService playerRoleService;
	@Resource
	private ServerService serverService;
	
	public void setServerService(ServerService serverService) {
		this.serverService = serverService;
	}

	public void setPlayerRoleService(PlayerRoleService playerRoleService) {
		this.playerRoleService = playerRoleService;
	}
	
	public void setPartnerService(PartnerService partnerService) {
		this.partnerService = partnerService;
	}

	public ModelAndView findPlayer(HttpServletRequest request,
			HttpServletResponse response){
		ModelAndView mv = new ModelAndView("admin/playerRole");
		return mv;
	}
	
	public ModelAndView findPlayerRole(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String serverId = serverService.getServerIdString(request.getParameter("serverId"));
		String beginTime = request.getParameter("beginTime");
		String endTime = request.getParameter("endTime");
		String target = request.getParameter("target");
		String parnter = request.getParameter("parnter");
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
		Page page = new Page(request);
		List<Player> list2 = playerRoleService.findPlayers(serverId, beginTime, endTime, pid);
		int totalResults = list2.size();
		page.updateInfo(totalResults, page.getPageIndex());
		
		List<Player> list = playerRoleService.findPlayers(serverId, beginTime, endTime,  page, pid);
		List<Map<String, String>> result = new ArrayList<Map<String,String>>();
		
		if("excel".equals(target)){	// 导出excel
			for(Player p:list2){
				Map<String, String> map = new HashMap<String, String>();
				map.put("date", p.getDate().substring(0, 19));
				map.put("playerId", p.getPlayerId());
				// 把服务器id转为名字显示
				String serverName = serverService.findServerNameBy("GAME"+p.getServerId());
				map.put("serverId", serverName);
				map.put("name", p.getName());
				map.put("roleName", p.getRoleName());
				map.put("action", getAction(p.getAction()));
				result.add(map);
			}
			ModelAndView mv = new ModelAndView("admin/playerRoleExcel");
			mv.addObject("list", result);
			return mv;
		}else{	// 查询
			for(Player p:list){
				Map<String, String> map = new HashMap<String, String>();
				map.put("date", p.getDate().substring(0, 19));
				map.put("playerId", p.getPlayerId());
				// 把服务器id转为名字显示
				String serverName = serverService.findServerNameBy("GAME"+p.getServerId());
				map.put("serverId", serverName);
				map.put("name", p.getName());
				map.put("roleName", p.getRoleName());
				map.put("action", getAction(p.getAction()));
				result.add(map);
			}
		}
		return sendJson(response, page.getTotalResults(), result);
	}
	
	// 角色来源用中文显示
	private String getAction(String action){
		if(action.equals("PlayerRoleHandle.unlockRole")){
			return "解锁";
		}else if(action.equals("MagicShopHandler.buy")){
			return "契约";
		}else if(action.equals("OrderHandler.receiveFirstCharge")){
			return "首充礼包";
		}else if(action.equals("PackHandler.use")){
			return "使用道具";
		}else if(action.equals("SevenDaysHandler.receiveAward")){
			return "七天登录";
		}else if(action.equals("GMHandler.addPlayerRole")){
			return "GM发放";
		}else{
			return action;
		}
	}
}
