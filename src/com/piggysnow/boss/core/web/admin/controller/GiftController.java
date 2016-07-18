package com.piggysnow.boss.core.web.admin.controller;

import java.util.Date;
import java.util.HashMap;
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
import com.piggysnow.boss.core.services.DictService;
import com.piggysnow.boss.core.services.GiftCodeService;
import com.piggysnow.boss.core.services.GiftService;
import com.piggysnow.boss.core.services.PartnerService;
import com.piggysnow.boss.core.services.ServerService;
import com.piggysnow.boss.core.web.UserSession;
import com.piggysnow.boss.utils.HappenHelper;
import com.piggysnow.common.dao.Page;
import com.piggysnow.boss.core.domain.Server;

/**
 * 
 * 后台管理--GM管理 
 */

public class GiftController extends EasyController {
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
	
	public void setGiftService(GiftService giftService) {
		this.giftService = giftService;
	}
	public void setDictService(DictService dictService) {
		this.dictService = dictService;
	}
	public void setGiftCodeService(GiftCodeService giftCodeService) {
		this.giftCodeService = giftCodeService;
	}
	/**
	 * 服务器显示
	 */
	public ModelAndView page(HttpServletRequest request,
			HttpServletResponse response)throws Exception{ 
		ModelAndView mav = new ModelAndView("admin/gift");
		HashMap<String,String> itemInfoMap  = StaticServiceController.getDictService().getItemInfoMap();
		mav.addObject("itemMap",itemInfoMap);
//		mav.addObject("itemMap", dictService.getDictIdNameMapByType("goods"));
		return mav;
	}
	/**
	 * 服务器显示
	 */
	public ModelAndView listPage(HttpServletRequest request,
			HttpServletResponse response)throws Exception{ 
		ModelAndView mav = new ModelAndView("admin/giftList");
		List<Object[]> analist = giftCodeService.analayze();
		HashMap<String,String> itemInfoMap  = StaticServiceController.getDictService().getItemInfoMap();
		mav.addObject("itemMap",itemInfoMap);
		mav.addObject("analist",analist);
		return mav;
	}

	/**
	 * 服务器显示
	 */
	//json 跳转
	public ModelAndView codeListPage(HttpServletRequest request,
			HttpServletResponse response)throws Exception{ 
		ModelAndView mav = new ModelAndView("admin/giftCodeList");
		mav.addObject("giftMap", giftService.findNameMap());
		return mav;
	}
	

	
	//json 跳转
	public ModelAndView codeList(HttpServletRequest request,
			HttpServletResponse response)throws Exception{ 
		String statusStr = request.getParameter("status");
		Integer status = null;
		if(statusStr!=null && !"".equals(statusStr)){
			status = Integer.valueOf(statusStr);
		}
		String giftIdStr = request.getParameter("giftId");
		Long giftId = null;
		if(giftIdStr!=null && !"".equals(giftIdStr)){
			giftId = Long.valueOf(giftIdStr);
		}
		String code = request.getParameter("code");
		Page page = new Page(request);
		List<GiftCode> list = giftCodeService.findList(page, giftId, status,code);

		if("excel".equals(request.getParameter("target"))){
			ModelAndView mav = new ModelAndView("admin/excel");
			mav.addObject("list", list);
			mav.addObject("giftMap", giftService.findNameMap());
			return mav;
		}
		return sendJson(response, page.getTotalResults(), list);
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
		Map<String,Server> smap = serverService.findStringMap();
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
		Map<String,Server> smap = serverService.findStringMap();
		Map<Integer,String>itemMap = dictService.getDictIdNameMapByType("goods");
		Map<String,Partner> pmap = partnerService.findCodeMap();
		addComplexInfo(m, itemMap, pmap, smap);
		return sendJson(response, m);
	}
	
	
	public ModelAndView genCode(HttpServletRequest request,
			HttpServletResponse response)throws Exception{ 
		long giftId = Long.valueOf(request.getParameter("giftId"));
		int num = Integer.valueOf(request.getParameter("count"));
		User u = UserSession.get(request).getUser();
		boolean success = giftCodeService.genCode(giftId, num , u	);
		if(success){
			return sendJson(response,  "{success:true, failed:''}");
		}
		return sendJson(response, "{success:false, failed:'剩余未初始化礼包码不足，"
				+ "请联系后台（程序猿）导入下一批闲置礼包码库'}");
		
	}
	
	private void addComplexInfo(Gift m, Map<Integer,String>itemMap,Map<String,Partner>pmap, Map<String,Server> smap){
		if(m.getPartnerCodeId()==null ||"".equals(m.getPartnerCodeId())){
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
				Server s = smap.get(sid);
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
		System.out.println("itemInfo :" + itemInfo);
		String partnerId= request.getParameter("partnerCodeId");
		String name=  request.getParameter("name");
		if(partnerId!=null){
			m.setPartnerCodeId(request.getParameter("partnerCodeId"));
		}
		m.setGold(gold);
		m.setDiamond(diamond);
		m.setServerIds(serverIds);
		m.setItemInfo(itemInfo);
		m.setName(name);
	}

	public ModelAndView delete(HttpServletRequest request, HttpServletResponse response)throws Exception{
		Long id = Long.valueOf(request.getParameter("id"));
		giftService.removeById(id);
		return sendJson(response,  "{success:true, failed:''}");
	}
	
	
}
