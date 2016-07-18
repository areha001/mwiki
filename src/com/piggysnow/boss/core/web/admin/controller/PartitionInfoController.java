package com.piggysnow.boss.core.web.admin.controller;

import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.web.servlet.ModelAndView;

import com.piggysnow.boss.core.domain.PartitionInfo;
import com.piggysnow.boss.core.domain.Partner;
import com.piggysnow.boss.core.services.PartitionInfoService;
import com.piggysnow.boss.core.services.PartnerService;
import com.piggysnow.boss.core.web.UserSession;
import com.piggysnow.common.dao.Page;

public class PartitionInfoController extends EasyController {

	@Resource
	private PartitionInfoService partitionInfoService;
	@Resource
	private PartnerService partnerService;
	
	public void setPartnerService(PartnerService partnerService) {
		this.partnerService = partnerService;
	}

	public void setPartitionInfoService(PartitionInfoService partitionInfoService) {
		this.partitionInfoService = partitionInfoService;
	}
	

	
	public ModelAndView getPartitionInfo(HttpServletRequest request,
			HttpServletResponse response)throws Exception{ 
		ModelAndView mav = new ModelAndView("admin/partitionInfo");
		return mav;
	}
	
	public ModelAndView dataList(HttpServletRequest request,
			HttpServletResponse response)throws Exception{ 
		
		List<Object> args = new ArrayList<Object>();
		StringBuffer sb = new StringBuffer();
		sb.append("from PartitionInfo where 1=1 ");
		String name = request.getParameter("name");
		String parnter = request.getParameter("parnter");
		String statusStr = request.getParameter("status");
		String pid = "";
		Long departId = UserSession.getDepartId(request);
		// 渠道id不为空，只能获取该渠道信息
		if (departId != null && partnerService.findMap().get(departId) != null) {
			Partner pt = partnerService.findMap().get(departId);
			pid = pt.getDcode();
			sb.append(" and channel = ? ");
			args.add(pid);
		}else if (StringUtils.isNotEmpty(parnter)) {
			Partner p = partnerService.get(parnter);
			pid = p.getDcode();
			sb.append(" and channel = ? ");
			args.add(pid);
		}
		Integer status = null;
		if(statusStr!=null && !"".equals(statusStr)){
			status = Integer.valueOf(statusStr);
			sb.append(" and status = ? ");
			args.add(status);
		}
		
		if(name!= null && !name.isEmpty()){
			sb.append(" and name like '%"+name+"%' ");
		}
		
		Page page = new Page(request);
		List<PartitionInfo> list = partitionInfoService.findPage(page, sb.toString(), args.toArray());
		return sendJson(response, page.getTotalResults(), list);
	}
	
	
	public ModelAndView updateStatus(HttpServletRequest request,
			HttpServletResponse response)throws Exception{ 
		String result = "false";
		String id = request.getParameter("id");
		String strtype = request.getParameter("status");
		if(id != null && !id.isEmpty() && strtype != null && !strtype.isEmpty()){
			partitionInfoService.execute("update PartitionInfo set status = "+ Integer.parseInt(strtype) + 
					" where id = " + Long.parseLong(id), new Object[]{});
			result = "true";
		}
		
		PrintWriter out = response.getWriter();
		out.print(result);
		out.flush();
		out.close();
		return null;
	}
	

	public ModelAndView updateStatusMulti(HttpServletRequest request,
			HttpServletResponse response)throws Exception{ 
		String[] ids = request.getParameterValues("ids");
		String strtype = request.getParameter("status");

		if(ids == null || ids.length == 0)
		{
			String str = "false";
			writeData(response, str);
			return null;
		}
		List<Integer> li = new ArrayList<Integer>();
		for(String s : ids)
		{
			Integer i  = Integer.valueOf(s);
			li.add(i);
		}
		String k = "(" + com.piggysnow.common.utils.StringUtils.join(li.toArray(), ",") + ")";

		partitionInfoService.execute("update PartitionInfo set status = "+ Integer.parseInt(strtype) +  " where id in " + k );
		writeData(response, "true");
		return null;
	}
}
