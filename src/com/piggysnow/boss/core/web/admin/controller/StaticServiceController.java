package com.piggysnow.boss.core.web.admin.controller;

import javax.annotation.Resource;

import org.slave4j.orm.hibernate.HibernateDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

import com.piggysnow.boss.core.services.DictService;
import com.piggysnow.boss.core.services.GMailService;
import com.piggysnow.boss.core.services.GmNoticeService;
import com.piggysnow.boss.core.services.HappenService;
import com.piggysnow.boss.core.services.PartnerService;
import com.piggysnow.boss.core.services.ServerService;
import com.piggysnow.boss.core.services.UserService;
import com.piggysnow.boss.core.services.UserTeamRoleService;
import com.piggysnow.boss.core.services.VersionService;
import com.piggysnow.boss.core.services.WordService;
import com.piggysnow.boss.utils.JobContainer;
import com.piggysnow.boss.utils.MailSender;

/**
 * Service静态仓库
 * */
@Controller
public class StaticServiceController extends MultiActionController {

	private static StaticServiceController con = null;
	public StaticServiceController()
	{
		super();
		if(con==null)
			con = this;
		JobContainer.addJob(new MailSender());
		JobContainer.init();
	}
	@Resource
	protected UserService userService;
	@Resource
	protected UserTeamRoleService userTeamRoleService;
	@Resource
	protected DictService dictService;
	@Resource
	protected ServerService serverService;
	@Resource
	protected GMailService gmailService;
	@Resource
	protected PartnerService partnerService ;
	@Resource
	protected HappenService happenService ;
	@Resource
	protected VersionService versionService ;
	@Resource
	protected GmNoticeService gmNoticeService ;
	@Resource
	protected WordService wordService ;
	
	public static HappenService getHappenService() {
		return con.happenService;
	}
	public void setHappenService(HappenService happenService) {
		this.happenService = happenService;
	}
	public static GMailService getgmailService() {
		return con.gmailService;
	}
	@Autowired
	public void setgMailService(GMailService gmailService) {
		this.gmailService = gmailService;
	}
	public static ServerService getServerService() {
		return con.serverService;
	}	
	@Autowired
	public void setServerService(ServerService serverService) {
		this.serverService = serverService;
	}
	public void setUserService(UserService userService) {
		this.userService = userService;
	}
	public static UserService getUserService() {
		return con.userService ;
	}
	public void setDictService(DictService dictService) 
	{	
		this.dictService = dictService;
	}
	public static HibernateDao getService()
	{
		return con.userService;
	}
	public static UserService getTeamService() {
		return con.userService;
	}
	public static UserTeamRoleService getUserTeamRoleService() {
		return con.userTeamRoleService;
	}
	public void setUserTeamRoleService(UserTeamRoleService userTeamRoleService) {
		this.userTeamRoleService = userTeamRoleService;
	}
	public static DictService getDictService() {
		return con.dictService;
	}
	public static PartnerService getPartnerService() {
		return con.partnerService;
	}
	public void setPartnerService(PartnerService partnerService) {
		this.partnerService = partnerService;
	}
	public GMailService getGmailService() {
		return gmailService;
	}
	public void setGmailService(GMailService gmailService) {
		this.gmailService = gmailService;
	}
	public static VersionService getVersionService() {
		return con.versionService;
	}
	public void setVersionService(VersionService versionService) {
		this.versionService = versionService;
	}
	public static GmNoticeService getGmNoticeService() {
		return con.gmNoticeService;
	}
	public void setGmNoticeService(GmNoticeService gmNoticeService) {
		this.gmNoticeService = gmNoticeService;
	}
	public static WordService getWordService() {
		return con.wordService;
	}
	
	
}
