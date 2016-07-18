package com.piggysnow.boss.core.web.login;

import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class DefaultLogin{

	public void doLogin(HttpServletRequest request, HttpServletResponse response)throws Exception {
		
	}
	

	protected static void writeData(HttpServletResponse response, String str)throws Exception{
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		out.print(str);
		out.flush();
		out.close();
	}
}
