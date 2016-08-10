package com.piggysnow.boss.core.web.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.piggysnow.boss.core.domain.Item;
import com.piggysnow.boss.core.services.ItemService;
import com.piggysnow.boss.core.web.admin.controller.ControllerContainer;
import com.piggysnow.boss.utils.MyModelAndView;
import com.piggysnow.common.dao.Page;

@Controller
@RequestMapping("/")
public class MainController{
	
	@Resource
	ItemService itemService;
	
	@RequestMapping(value="/",method=RequestMethod.GET) 
	public ModelAndView main(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		return ControllerContainer.getInstance().getWordController().index(request, response);
//		return list(request, response);
	}
	

	@RequestMapping(value="/list",method={RequestMethod.GET,RequestMethod.POST}) 
	public ModelAndView list(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		ModelAndView mav = new MyModelAndView("main");
		Page page = new Page(request);
		List<Item> list = itemService.findPage(page, "from Item order by createTime desc ");
		mav.addObject("list", list);
		return mav;
	}

	@RequestMapping(value="/search",method=RequestMethod.GET) 
	public ModelAndView search(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		String word = request.getParameter("word");
		ModelAndView mav = new MyModelAndView("search");
		mav.addObject("word", word);
		return mav;
	}
	
}
