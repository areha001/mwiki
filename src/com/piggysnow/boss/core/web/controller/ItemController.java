package com.piggysnow.boss.core.web.controller;

import java.util.Date;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.piggysnow.boss.core.domain.Item;
import com.piggysnow.boss.core.services.ItemService;

@Controller
@RequestMapping()
public class ItemController{
	
	@Resource
	ItemService itemService;
	
	@RequestMapping(value="/item/new",method=RequestMethod.GET) 
	public ModelAndView main(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		ModelAndView mav = new ModelAndView("item/new");
		return mav;
	}

	@RequestMapping(value="/item/add",method=RequestMethod.POST) 
	public ModelAndView add(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		Item item = new Item();
		
		String name = request.getParameter("name");
		String content = request.getParameter("content");
		
		item.setName(name);
		item.setContent(content);
		item.setCreateTime(new Date());
		item.setCreator(1L);
		itemService.save(item);
		response.sendRedirect(request.getContextPath());
		return null;
	}

}
