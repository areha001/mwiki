package com.piggysnow.boss.core.web.admin.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;

import com.piggysnow.boss.core.domain.Gift;
import com.piggysnow.boss.core.domain.GiftCode;
import com.piggysnow.boss.core.domain.Partner;
import com.piggysnow.boss.core.domain.User;
import com.piggysnow.boss.core.interceptor.AdminPermission;
import com.piggysnow.boss.core.services.DictService;
import com.piggysnow.boss.core.services.GiftCodeService;
import com.piggysnow.boss.core.services.GiftService;
import com.piggysnow.boss.core.services.PartnerService;
import com.piggysnow.boss.core.services.ServerService;
import com.piggysnow.boss.core.web.UserSession;
import com.piggysnow.boss.utils.GiftCodeGenerator;
import com.piggysnow.boss.utils.HappenHelper;
import com.piggysnow.common.dao.Page;
import com.piggysnow.boss.core.domain.Server;

/**
 * 
 * 后台管理--GM管理 
 */

public class GiftCodeController extends EasyController {
	@Resource
	private PartnerService partnerService;
	@Resource
	private ServerService serverService;
	@Resource
	protected GiftService giftService;
	@Resource
	protected GiftCodeService giftCodeService;
	@Resource
	private DictService dictService;
	
	public void setPartnerService(PartnerService partnerService) {
		this.partnerService = partnerService;
	}
	public void setServerService(ServerService serverService) {
		this.serverService = serverService;
	}
	public void setGiftCodeService(GiftCodeService giftCodeService) {
		this.giftCodeService = giftCodeService;
	}
	public void setGiftService(GiftService giftService) {
		this.giftService = giftService;
	}
	public void setDictService(DictService dictService) {
		this.dictService = dictService;
	}
	/*
	 * 老师信息记录显示
	 */
	/**
	 * 服务器显示
	 */
	//json 跳转
	public ModelAndView page(HttpServletRequest request,
			HttpServletResponse response)throws Exception{ 
		ModelAndView mav = new ModelAndView("admin/giftCode");
		mav.addObject("itemMap", dictService.getDictIdNameMapByType("goods"));
		return mav;
	}
	/**
	 * 服务器显示
	 */
	//json 跳转
	public ModelAndView gg(HttpServletRequest request,
			HttpServletResponse response)throws Exception{ 
		ModelAndView mav = new ModelAndView("admin/giftCode");
		giftCodeService.notDo();
		return mav;
	}
	/**
	 * 服务器显示
	 */
	//json 跳转
	public ModelAndView listPage(HttpServletRequest request,
			HttpServletResponse response)throws Exception{ 
		ModelAndView mav = new ModelAndView("admin/giftList");
		AdminPermission ap = new AdminPermission(UserSession.get(request));
		mav.addObject("canPass", ap.getMailPass());
		return mav;
	}
	
	
	//json 跳转
	public ModelAndView dataList(HttpServletRequest request,
			HttpServletResponse response)throws Exception{ 
		String statusStr = request.getParameter("status");
		Integer status = null;
		if(statusStr!=null && !"".equals(statusStr)){
			status = Integer.valueOf(statusStr);
		}
		Page page = new Page(request);
		List<Gift> list = giftService.findList(page);
		Map<Long,Server> smap = serverService.findMap();
		Map<String,Partner> pmap = partnerService.findCodeMap();
		Map<Integer,String>itemMap = dictService.getDictIdNameMapByType("goods");
		for(Gift m: list){
			addComplexInfo(m, itemMap,pmap, smap);
		}
		return sendJson(response, page.getTotalResults(), list);
	}
	
	public ModelAndView showOne(HttpServletRequest request,
			HttpServletResponse response)throws Exception{ 
		long id = Integer.valueOf(request.getParameter("id"));
		Gift m = giftService.get(id);
		Map<Long,Server> smap = serverService.findMap();
		Map<Integer,String>itemMap = dictService.getDictIdNameMapByType("goods");
		Map<String,Partner> pmap = partnerService.findCodeMap();
		addComplexInfo(m, itemMap, pmap, smap);
		return sendJson(response, m);
	}
	
	
	private void addComplexInfo(Gift m, Map<Integer,String>itemMap,Map<String,Partner>pmap, Map<Long,Server> smap){
		if(m.getPartnerCodeId()==null || "".equals(m.getPartnerCodeId())){
			m.setPartnerName("全部");
		}
		else{
			Partner p = pmap.get(m.getPartnerCodeId());
			if(p!=null){
				m.setPartnerName(p.getName());
			}
		}
		
		String sids = m.getServerIds();
		if(sids==null || "".equals(sids)){
			m.setServerName("全部");
		}
		else{
			String[] sidArr = sids.split(",");
			String sName = "";
			for(String sid: sidArr){
				Server s = smap.get(Long.valueOf(sid));
				if(s!=null){
					sName = sName+ s.getName()+",";
				}
				m.setServerName(sName);
			}
		}
		
		//1#1#1,21#1#5
		String itemInfo = m.getItemInfo();
		//21#1#5
		String[] sArr = itemInfo.split("#");
		StringBuilder sb = new StringBuilder();
		for(String s: sArr){
			if("".equals(s)){
				continue;
			}
			//#21#1#5
			String oneItem = "," + s;
			for(Entry<Integer, String> e: itemMap.entrySet()){
								//#21#1#            某物品 X
				oneItem = oneItem.replace(","+e.getKey()+",", e.getValue()+" X");
			}
			sb.append(oneItem + ",");
		}
		m.setItemInfoString(sb.toString());
		
	}
	public ModelAndView add(HttpServletRequest request, HttpServletResponse response)throws Exception{
		Gift m = new Gift();
		String idStr = request.getParameter("id");
		if(idStr!=null && !"".equals(idStr)){
			m = giftService.get(idStr);
		}
		req2Bean(request, m);
		User loginUser = UserSession.get(request).getUser();
		m.setCreator(loginUser.getId());
		m.setCreatorName(loginUser.getName());
		m.setCreateTime(new Date());
		giftService.save(m);
		HappenHelper.create(loginUser, "配置了礼包ID="+ m.getId() );
		return sendJson(response,  "{success:true, failed:''}");
	}

	private void req2Bean(HttpServletRequest request, Gift m) throws Exception{

		int gold= Integer.valueOf(request.getParameter("gold"));
		int diamond= Integer.valueOf(request.getParameter("diamond"));
		String serverIds= request.getParameter("serverIds");
		String itemInfo= request.getParameter("itemInfo");
		String partnerId= request.getParameter("partnerId");
		
		if(partnerId!=null){
			m.setPartnerCodeId(request.getParameter("partnerId"));
		}
		m.setGold(gold);
		m.setDiamond(diamond);
		m.setServerIds(serverIds);
		m.setItemInfo(itemInfo);
	}

	public ModelAndView delete(HttpServletRequest request, HttpServletResponse response)throws Exception{
		Long id = Long.valueOf(request.getParameter("id"));
		giftService.removeById(id);
		return sendJson(response,  "{success:true, failed:''}");
	}
	
	public ModelAndView generator(HttpServletRequest request, HttpServletResponse response)throws Exception{
		int key1 = Integer.valueOf(request.getParameter("key1"));
		int key2 = Integer.valueOf(request.getParameter("key2"));
		Integer num = Integer.valueOf(request.getParameter("num"));
		List<String> giftList = GiftCodeGenerator.notDo(key1, key2);
		if(num == null){
			num = 10000;
		}
		giftList = giftList.subList(0, Math.min(num, giftList.size()));
		Date nowDate = new Date();
		for (String g : giftList) {
			GiftCode gc = new GiftCode();
			gc.setCode(g);
			gc.setStatus(GiftCode.STATUS_UNSET);
			gc.setImportTime(nowDate);
			giftCodeService.save(gc);
		}
		
		return sendJson(response, true);
	}
	
}
