package com.piggysnow.boss.core.web.admin.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;

import com.piggysnow.boss.core.domain.Msg;
import com.piggysnow.boss.core.domain.Partner;
import com.piggysnow.boss.core.domain.User;
import com.piggysnow.boss.core.services.MsgService;
import com.piggysnow.boss.core.services.PartnerService;
import com.piggysnow.boss.core.services.ServerService;
import com.piggysnow.boss.core.services.UserService;
import com.piggysnow.boss.core.web.UserSession;
import com.piggysnow.boss.utils.HappenHelper;
import com.piggysnow.common.dao.Page;
import com.piggysnow.boss.core.domain.Server;

/**
 * 
 * 后台管理--教师管理 
 */

public class MsgController extends EasyController {
	@Resource
	private UserService userService;
	@Resource
	private MsgService msgService;
	@Resource
	private ServerService serverService;
	@Resource
	private PartnerService partnerService;
	
	public void setPartnerService(PartnerService partnerService) {
		this.partnerService = partnerService;
	}
	public void setUserService(UserService userService) {
		this.userService = userService;
	}
	public void setMsgService(MsgService msgService) {
		this.msgService = msgService;
	}
	public void setServerService(ServerService serverService) {
		this.serverService = serverService;
	}
	/**
	 * 服务器显示
	 */
	//json 跳转
	public ModelAndView page(HttpServletRequest request,
			HttpServletResponse response)throws Exception{ 
		ModelAndView mav = new ModelAndView("admin/msg");
		mav.addObject("type", request.getParameter("type"));
		return mav;
	}
	/**
	 * 服务器显示
	 */
	//json 跳转
	public ModelAndView listPage(HttpServletRequest request,
			HttpServletResponse response)throws Exception{ 
		ModelAndView mav = new ModelAndView("admin/msgList");
		mav.addObject("type", request.getParameter("type"));
		return mav;
	}
	
	
	//json 跳转
	public ModelAndView dataList(HttpServletRequest request,
			HttpServletResponse response)throws Exception{ 
		int type = Integer.valueOf(request.getParameter("type"));
		String partnerIdStr = request.getParameter("partnerId");
		Long partnerId = null;
		if(partnerIdStr!=null && !"0".equals(partnerIdStr)){
			partnerId = Long.valueOf(partnerIdStr);
		}
		Page page = new Page(request);
		List<Msg> list = msgService.findList(type,partnerId, page);
		Map<Long,Server> smap = serverService.findMap();
		Map<Long,Partner> pmap = partnerService.findMap();
		for(Msg m: list){
			addComplexInfo(m, smap, pmap);
		}
		
		if("excel".equals(request.getParameter("target"))){
			ModelAndView mav = new ModelAndView("admin/excelMsg");
			mav.addObject("list", list);
			return mav;
		}
		return sendJson(response, page.getTotalResults(), list);
	}
	
	public ModelAndView showOne(HttpServletRequest request,
			HttpServletResponse response)throws Exception{ 
		long id = Integer.valueOf(request.getParameter("id"));
		Msg m = msgService.get(id);
		Map<Long,Server> smap = serverService.findMap();
		Map<Long,Partner> pmap = partnerService.findMap();
		addComplexInfo(m, smap, pmap);
		return sendJson(response, m);
	}
	
	
	private void addComplexInfo(Msg m, Map<Long,Server> smap, Map<Long, Partner> pmap){
		if(m.getPartnerId()==null || m.getPartnerId()==0){
			m.setPartnerName("全部");
		}
		else{
			Partner p = pmap.get(m.getPartnerId());
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
		
	}
	public ModelAndView add(HttpServletRequest request, HttpServletResponse response)throws Exception{
		Msg m = new Msg();
		String idStr = request.getParameter("id");
		if(idStr!=null && !"".equals(idStr)){
			m = msgService.get(idStr);
		}
		req2Bean(request, m);
		User loginUser = UserSession.get(request).getUser();
		m.setCreator(loginUser.getId());
		m.setCreatorName(loginUser.getName());
		m.setCreateTime(new Date());
		


		String typeName = "公告";
		String delay = "0";
		String type = "1";//国兵接口里公告是1
		if(m.getType() == Msg.PAO_MA_DEN){
			delay = m.getMinutes()+"";
			type = "0"; //国兵接口里跑马灯是0
			typeName = "跑马灯";
		}
		/*
		final GmReq gmReq = new GmReq();
		//TODO: modified 接口
//		sendNotice -dtrue#type#bossNoticeId#content#startDate#endDate#interval
		CommandBuilder.createCommand(gmReq, "sendNotice", "" , type ,m.getContent(), m.getStartTime().toGMTString(),delay);
		String[] serverIds = m.getServerIds().split(",");
		List<Server> sList = new ArrayList<Server>();
		if(serverIds.length==0 || serverIds.length==1 && serverIds[0].equals("")){
			sList.addAll(serverService.getShowServers());
		}
		else{
			for(String sid: serverIds){
				Long serverId = Long.valueOf(sid);
				sList.add(serverService.get(serverId));
			}
		}
		GameServerSender.doSend(gmReq, sList);*/
		
		msgService.save(m);
		HappenHelper.create(UserSession.get(request).getUser(), "发布了" + typeName + ", ID=" + m.getId());
		
		return sendJson(response,  "{success:true, failed:''}");
	}
	
	

	private void req2Bean(HttpServletRequest request, Msg m) throws Exception{

		String content=request.getParameter("content");
		String startTime=request.getParameter("startTime");
		String endTime=request.getParameter("endTime");
		Integer minutes= Integer.valueOf(request.getParameter("minutes"));
		if(minutes==null){
			minutes = 10;
		}
		Integer status=Integer.valueOf(request.getParameter("status"));
		long partnerId = Integer.valueOf(request.getParameter("partnerId"));
		int type = Integer.valueOf(request.getParameter("type"));
		String serverIds= request.getParameter("serverIds");

		m.setContent(content);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		m.setStartTime(sdf.parse(startTime));
		m.setEndTime(sdf.parse(endTime));
		m.setMinutes(minutes);
		m.setStatus(status);
		m.setPartnerId(partnerId);
		m.setType(type);
		m.setServerIds(serverIds);
	}
	
	
	


}
