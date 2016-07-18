package com.piggysnow.boss.core.services;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import com.piggysnow.boss.core.domain.Order;
import com.piggysnow.boss.core.domain.Partner;
import com.piggysnow.boss.core.web.UserSession;
import com.piggysnow.common.dao.HibernateEntityDao;

@Service
public class OrderService extends HibernateEntityDao<Order> {
	@Resource
	private ServerService serverService;
	@Resource
	private PartnerService partnerService;
	
	public void setServerService(ServerService serverService) {
		this.serverService = serverService;
	}
	
	public void setPartnerService(PartnerService partnerService) {
		this.partnerService = partnerService;
	}

	public List<Order> query(HttpServletRequest request) throws Exception {
		String beginTime = request.getParameter("beginTime");
		String endTime = request.getParameter("endTime");
		if(StringUtils.isNotEmpty(beginTime)){
			beginTime = beginTime.split("T")[0];
		}
		if(StringUtils.isNotEmpty(endTime)){
			endTime = endTime.split("T")[0]+" 23:59:59";
		}
		
		String payStatus = request.getParameter("status");
		String serverId = serverService.getServerIdString(request.getParameter("serverId"));
		String partner = request.getParameter("parnter");
		String playerName = request.getParameter("playerName");

		StringBuilder sb = new StringBuilder();
		sb.append(" createTime >= '" + beginTime + "'");
		sb.append(" and createTime <= '" + endTime + "'");
		if (!StringUtils.isEmpty(playerName)) {
			sb.append(" and name = '" + playerName + "'");
		}
		if (!StringUtils.isEmpty(payStatus) && !payStatus.equals("-1")) {
			sb.append(" and status = " + payStatus);
		}
		Long departId = UserSession.getDepartId(request);
		// 渠道id不为空，只能获取该渠道信息
		if (departId != null && partnerService.findMap().get(departId) != null) {
			Partner p = partnerService.findMap().get(departId);
			if("0".equals(p.getDcode())){
				sb.append(" and publish_channel is null");
			}else{
				sb.append(" and publish_channel = '"+p.getDcode()+"'");
			}
		}else if(StringUtils.isNotEmpty(partner)){
			Partner p = partnerService.get(partner);
			if("0".equals(p.getDcode())){
				sb.append(" and publish_channel is null");
			}else{
				sb.append(" and publish_channel = '"+p.getDcode()+"'");
			}
		}
		if (!StringUtils.isEmpty(serverId)) {
			sb.append(" and serverId in ('"+serverId+"')");
		}

		return find("from Order where " + sb.toString() + " order by createTime desc");
	}
}
