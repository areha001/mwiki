package com.piggysnow.boss.core.web.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

import com.piggysnow.boss.core.domain.Tag;
import com.piggysnow.boss.core.services.TagService;
import com.piggysnow.boss.utils.MyModelAndView;

@Controller
@RequestMapping("/tag") 
public class TagController extends MultiActionController {
	
	@Resource
	private TagService tagService;
	
	@RequestMapping(method=RequestMethod.GET) 
	public ModelAndView index(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		System.out.println("werewrwerwerwrwer");
		ModelAndView mav = new MyModelAndView("tag/list");
		List<Tag> tags = tagService.getAll();
		mav.addObject("list", tags);
		return mav;
	}
	
}
