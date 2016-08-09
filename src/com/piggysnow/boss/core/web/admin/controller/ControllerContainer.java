package com.piggysnow.boss.core.web.admin.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

import com.piggysnow.boss.core.web.controller.WordController;

/**
 * Controller静态仓库
 * */
@Controller
public class ControllerContainer extends MultiActionController {

	private static ControllerContainer con = null;
	public ControllerContainer()
	{
		super();
		if(con==null)
			con = this;
	}
	
	public static ControllerContainer getInstance() {
		return con;
	}

	@Resource
	protected WordController wordController;
	public WordController getWordController() {
		return wordController;
	}
}
