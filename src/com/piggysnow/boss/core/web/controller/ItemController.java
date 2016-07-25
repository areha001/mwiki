package com.piggysnow.boss.core.web.controller;

import java.util.Date;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.piggysnow.boss.core.domain.Item;
import com.piggysnow.boss.core.services.ItemService;
import com.piggysnow.boss.core.services.TagService;
import com.piggysnow.boss.utils.MyModelAndView;

@Controller
@RequestMapping()
public class ItemController{

	@Resource
	ItemService itemService;
	@Resource
	TagService tagService;
	
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
		String tagsStr = request.getParameter("tags");
		
		item.setName(name);
		item.setContent(content);
		item.setCreateTime(new Date());
		item.setTags(tagsStr);
		
		item.setCreator(1L);
		
		itemService.save(item);

		String[] tags = tagsStr.trim().split(",");
		if(tags.length > 0)
		{
			tagService.bindItemAndInit(item, tags);
		}
		
		response.sendRedirect(request.getContextPath());
		return null;
	}



	@RequestMapping(value="/item/{id}",method=RequestMethod.GET) 
	public ModelAndView view(HttpServletRequest request,
			HttpServletResponse response, @PathVariable Long id) throws Exception {

		
		ModelAndView mav = new MyModelAndView("item/show");
		Item item = itemService.get(id);
		mav.addObject("item", item);
		return mav;
	}
}
