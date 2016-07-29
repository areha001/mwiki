package com.piggysnow.boss.core.web.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

import com.piggysnow.boss.core.domain.Item;
import com.piggysnow.boss.core.domain.Word;
import com.piggysnow.boss.core.services.WordService;
import com.piggysnow.boss.utils.MyModelAndView;

@Controller
@RequestMapping("/word") 
public class WordController extends MultiActionController {
	
	@Resource
	private WordService wordService;

	@RequestMapping(value="/list",method=RequestMethod.GET) 
	public ModelAndView index(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		System.out.println("werewrwerwerwrwer");
		ModelAndView mav = new MyModelAndView("word/list");
		List<Word> tags = wordService.getAll();
		mav.addObject("list", tags);
		return mav;
	}
	

	@RequestMapping(value="/new",method=RequestMethod.GET) 
	public ModelAndView main(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		MyModelAndView mav = new MyModelAndView("word/new");
		return mav;
	}

	@RequestMapping(value="/add",method=RequestMethod.POST) 
	public ModelAndView add(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		Item item = new Item();
		response.sendRedirect(request.getContextPath());
		return null;
	}



	@RequestMapping(value="/{name}",method=RequestMethod.GET) 
	public ModelAndView view(HttpServletRequest request,
			HttpServletResponse response, @PathVariable String name) throws Exception {

		MyModelAndView mav = new MyModelAndView("word/show");
		Word word = wordService.findOne("from Word where name = ? ", name);
		mav.addObject("word", word);
		return mav;
	}
}
