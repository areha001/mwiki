package com.piggysnow.boss.core.web.admin.controller;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.TreeMap;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.web.servlet.ModelAndView;

import com.piggysnow.boss.core.domain.Partner;
import com.piggysnow.boss.core.services.NewAndActiveService;
import com.piggysnow.boss.core.services.ServerService;
import com.piggysnow.boss.core.services.NewAndActiveService.LoginResult;
import com.piggysnow.boss.core.services.NewAndActiveService.NewResult;
import com.piggysnow.boss.core.services.NewAndActiveService.Total;
import com.piggysnow.boss.core.services.PartnerService;
import com.piggysnow.boss.core.web.UserSession;
import com.piggysnow.boss.core.web.admin.controller.EasyController;

public class NewAndActiveController extends EasyController{
	@Resource
	private NewAndActiveService newAndActiveService;
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
	
	public void setPartnerService(PartnerService partnerService) {
		this.partnerService = partnerService;
	}


	public ModelAndView getInfo(HttpServletRequest request,
			HttpServletResponse response){
		ModelAndView mv = new ModelAndView("admin/newAndActive");
		return mv;
	}
	
	public ModelAndView p_getInfo(HttpServletRequest request,
			HttpServletResponse response){
		ModelAndView mv = new ModelAndView("admin/p_newAndActive");
		return mv;
	}
	
	public ModelAndView findNewAndActive(HttpServletRequest request,
			HttpServletResponse response) throws SQLException, Exception{
		String serverId = serverService.getServerIdString(request.getParameter("serverId"));
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
		List<NewResult> list1 = newAndActiveService.findNewResults(serverId, beginTime, endTime, pid);
		List<LoginResult> list2 = newAndActiveService.findLoginResults(serverId, beginTime, endTime, pid);
		List<Total> list3 = newAndActiveService.findTotal(serverId, beginTime, endTime, pid);
		List<TreeMap<String, String>> list = new ArrayList<TreeMap<String,String>>();
		int zongshu = 0;
		for(LoginResult lr:list2){
			TreeMap<String, String> map = new TreeMap<String, String>();
			map.put("date", lr.getDate());
			map.put("loginAccount", lr.getLoginaccount());
			map.put("newAccount", "0");
			for(NewResult nr:list1){
				if(nr.getDate().equals(lr.getDate())){
					zongshu = zongshu+Integer.parseInt(nr.getNewaccount()==null?"0":nr.getNewaccount());
					map.put("newAccount", nr.getNewaccount());
				}
			}
			list.add(map);
		}
		
		TreeMap<String, String> tm = new TreeMap<String, String>();
		tm.put("date", "总数");
		tm.put("newAccount", String.valueOf(zongshu));
		if(list3.size() > 0){
			tm.put("loginAccount", list3.get(0).getTotal());
		}else{
			tm.put("loginAccount", "0");
		}
		list.add(tm);
		if("excel".equals(target)){
			ModelAndView mv = new ModelAndView("admin/newAndActiveExcel");
			mv.addObject("list", list);
			return mv;
		}
		return sendJson(response, list.size(), list);
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
	
	private List<String> getTime(List<NewResult> list1,List<LoginResult> list2){
		List<String> newDate = new ArrayList<String>();
		List<String> loginDate = new ArrayList<String>();
		for(NewResult nr:list1){
			newDate.add(nr.getDate());
		}
		for(LoginResult lr:list2){
			loginDate.add(lr.getDate());
		}
		List<String> list = new ArrayList<String>();
		for(int i = 0 ; i < newDate.size();i++){
			if(loginDate.indexOf(newDate.get(i)) == -1){
				list.add(newDate.get(i));
			}
		}
		return list;
	}
	
	public ModelAndView p_findNewAndActive(HttpServletRequest request,
			HttpServletResponse response) throws SQLException, Exception{
		String serverId = request.getParameter("serverId");
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
		serverId = cutString(serverId);
		String pid = "";
		if(StringUtils.isNotEmpty(partner)){
			Partner p = partnerService.get(partner);
			pid = p.getDcode();
		}else {
			UserSession us = UserSession.get(request);
			String deptId = String.valueOf(us.getUser().getDepartId());
			Partner p = partnerService.get(deptId);
			pid = p.getDcode();
		}
		List<NewResult> list1 = newAndActiveService.findNewResults(serverId, beginTime, endTime, pid);
		List<LoginResult> list2 = newAndActiveService.findLoginResults(serverId, beginTime, endTime, pid);
		List<String> allTime = getTime(list1, list2);
		List<Total> list3 = newAndActiveService.findTotal(serverId, beginTime, endTime, pid);
		List<TreeMap<String, String>> list = new ArrayList<TreeMap<String,String>>();
		int zongshu = 0;
		for(LoginResult lr:list2){
			TreeMap<String, String> map = new TreeMap<String, String>();
			map.put("date", lr.getDate());
			map.put("loginAccount", lr.getLoginaccount());
			map.put("newAccount", "0");
			for(NewResult nr:list1){
				if(nr.getDate().equals(lr.getDate())){
					zongshu = zongshu+Integer.parseInt(nr.getNewaccount()==null?"0":nr.getNewaccount());
					map.put("newAccount", nr.getNewaccount());
				}
			}
			list.add(map);
		}
		
		
//		for(newResult nr:list1){
//			TreeMap<String,String> map =new TreeMap<String, String>();
//			zongshu = zongshu+Integer.parseInt(nr.getNewaccount()==null?"0":nr.getNewaccount());
//			map.put("date", nr.getDate());
//			map.put("newAccount", nr.getNewaccount());
//			for(loginResult lr:list2){
//				if(lr.getDate().equals(nr.getDate())){
//					map.put("loginAccount", lr.getLoginaccount());
//				}
//			}
//			list.add(map);
//		}
		TreeMap<String, String> tm = new TreeMap<String, String>();
		tm.put("date", "总数");
		tm.put("newAccount", String.valueOf(zongshu));
		if(list3.size() > 0){
			tm.put("loginAccount", list3.get(0).getTotal());
		}else{
			tm.put("loginAccount", "0");
		}
		list.add(tm);
		if("excel".equals(target)){
			ModelAndView mv = new ModelAndView("admin/newAndActiveExcel");
			mv.addObject("list", list);
			return mv;
		}
		return sendJson(response, list.size(), list);
	}
	
 }