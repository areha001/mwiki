package com.piggysnow.boss.utils;

import org.springframework.web.servlet.ModelAndView;


public class MyModelAndView extends ModelAndView{
	 
	public MyModelAndView()
	{
		super();
	}

	public MyModelAndView(String name)
	{
		super(name);
	}
	
	private String subViewName;

	public String getSubViewName() {
		return subViewName;
	}

	public void setSubViewName(String subViewName) {
		this.subViewName = subViewName;
	}
	
}