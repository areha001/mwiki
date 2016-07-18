package com.piggysnow.boss.core.web.admin.controller;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
public class AccountHelper {

	public String username;
	public String publishChannel;
	public String imei;
	public String terminal;
	public String terminalDetail;
	public String bigVersion;
	public String resVersion;
	public String cip;
	public String password;
	public String loginType;
	
	public static AccountHelper create(HttpServletRequest request){
		AccountHelper ah = new AccountHelper();
		ah.username = request.getParameter("username");
		ah.publishChannel = request.getParameter("publishChannel");
		ah.imei = request.getParameter("imei");
		ah.terminal = request.getParameter("terminal");
		ah.terminalDetail = request.getParameter("terminalDetail");
		ah.bigVersion = request.getParameter("bigVersion");
		ah.resVersion = request.getParameter("resVersion");
		ah.password = request.getParameter("password");
		ah.loginType = request.getParameter("loginType");
		ah.cip = genCip(request);
		return ah;
	}
	
	public boolean check() {
		return !(StringUtils.isEmpty(username) || StringUtils.isEmpty(password)
				|| StringUtils.isEmpty(publishChannel)
				|| StringUtils.isEmpty(terminal)
				|| StringUtils.isEmpty(terminalDetail) || StringUtils
					.isEmpty(imei));
	}

	private static String genCip(HttpServletRequest request){
		String cip = request.getHeader("x-forwarded-for");
		if(cip == null || cip.length() == 0 || "unknown".equalsIgnoreCase(cip)) {
			cip = request.getRemoteAddr();
		}
		return cip;
	}
}
