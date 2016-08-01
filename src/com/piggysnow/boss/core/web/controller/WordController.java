package com.piggysnow.boss.core.web.controller;

import java.net.URLEncoder;
import java.util.Date;
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

import com.piggysnow.boss.core.domain.Word;
import com.piggysnow.boss.core.domain.WordHistory;
import com.piggysnow.boss.core.services.WordHistoryService;
import com.piggysnow.boss.core.services.WordService;
import com.piggysnow.boss.utils.FlashMessage;
import com.piggysnow.boss.utils.MyModelAndView;

@Controller
@RequestMapping("/word") 
public class WordController extends MultiActionController {

	@Resource
	private WordService wordService;
	@Resource
	private WordHistoryService wordHistoryService;

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
		List<Word> list = wordService.findTopWord();
		mav.addObject("parentList", list);
		return mav;
	}

	@RequestMapping(value="/add",method=RequestMethod.POST) 
	public ModelAndView add(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		String name = request.getParameter("name");
		Word w = wordService.findWord(name);
		if(w!=null)
		{
			FlashMessage.store(request, "已有相同的词条");
			return main(request, response);
		}
		Word word = new Word();
		word.setCreateTime(new Date());
		word.setCreator(1L);
		word.setGroupName(request.getParameter("group_name"));
		word.setParentName(request.getParameter("parent_name"));
		word.setVersion(0);
		word.setName(name);
		wordService.save(word);
		response.sendRedirect(request.getContextPath() + "/word/edit/" + URLEncoder.encode(name, "utf-8"));
		return null;
	}


	@RequestMapping(value="/edit/{name:.*}",method=RequestMethod.GET ) 
	public ModelAndView edit(HttpServletRequest request,
			HttpServletResponse response, @PathVariable String name) throws Exception {

		MyModelAndView mav = new MyModelAndView("word/edit");
		mav.addObject("name", name);
		WordHistory w = wordHistoryService.findWord(name);
		mav.addObject("wordHistory", w);
		return mav;
	}
	@RequestMapping(value="/edit/{name:.*}",method=RequestMethod.POST ) 
	public ModelAndView editSave(HttpServletRequest request,
			HttpServletResponse response, @PathVariable String name) throws Exception {

		MyModelAndView mav = new MyModelAndView("word/edit");
		mav.addObject("name", name);
		WordHistory w = wordHistoryService.findWord(name);
		mav.addObject("wordHistory", w);
		FlashMessage.store(request, "保存成功，请等待管理人员审核");
		return mav;
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
