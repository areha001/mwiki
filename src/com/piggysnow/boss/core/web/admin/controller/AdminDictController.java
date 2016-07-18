package com.piggysnow.boss.core.web.admin.controller;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;

import com.piggysnow.boss.core.domain.Dict;
import com.piggysnow.boss.core.services.DictService;
import com.piggysnow.boss.core.services.ServerService;
import com.piggysnow.boss.utils.DataFormat;

/**
 * 
 * 系统管理
 * 
 */
public class AdminDictController extends EasyController {
	@Resource
	private DictService dictService;
	@Resource
	private ServerService serverService;
	
	public void setDictService(DictService dictService) {
		this.dictService = dictService;
	}
	public void setServerService(ServerService serverService) {
		this.serverService = serverService;
	}

	/**
	 *  字典集
	 */
	public ModelAndView dict(HttpServletRequest request,
			HttpServletResponse response)throws Exception{ 
		ModelAndView mav = new ModelAndView("admin/managerDicts");
		String type = request.getParameter("type");
		if("actionType".equals(type))
			mav.addObject("typeName","操作类型" );
		if("missionType".equals(type))
			mav.addObject("typeName","任务完成形式" );
		return mav;
	}
	/**
	 *  字典集
	 */
	public ModelAndView showDicts(HttpServletRequest request,
			HttpServletResponse response)throws Exception{ 
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html");
		String type = request.getParameter("type");
		List dicts;
		if(request.getParameter("showHead")!=null)
		{
			dicts =  dictService.getDictByType(type);
			HashMap hm = new HashMap();
			hm.put("id", "");
			hm.put("name", "--不限--");
			dicts.add(0, hm);
		}
		else
		{
			dicts = dictService.getDictByType(type);
		}
		String str=DataFormat.getJsonFormList(dicts.size(),dicts);
		response.getWriter().print(str);
		return null;
	}
	/**
	 *  字典集
	 */
	public ModelAndView statusDict(HttpServletRequest request,
			HttpServletResponse response)throws Exception{ 
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html");
		try{
			String[] ids = request.getParameterValues("id");
			for(String id: ids){
				dictService.removeById(Long.valueOf(id));
			}
			response.getWriter().print("{success:true, failed:''}");
				
		}
		catch(Exception e)
		{
			response.getWriter().print("{success:false}");
		}
		return null;
	}

	/**
	 *  字典集
	 */
	public ModelAndView manageDict(HttpServletRequest request,
			HttpServletResponse response)throws Exception{ 
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html");
		try{
			String id = request.getParameter("id");
			Dict dict = new Dict();
			if(!"".equals(id))
			{
				dict = dictService.get(Long.valueOf(id));
			}
			dict.setType(request.getParameter("type"));
			dict.setName(request.getParameter("name"));
			dict.setSubId(Integer.valueOf(request.getParameter("subId")));
			response.getWriter().print("{success:true, failed:''}");
			dictService.save(dict);
				
		}
		catch(Exception e)
		{
			response.getWriter().print("{success:false}");
		}
		return null;
	}

	private void autoSave(int subId, String name, String type, HashMap<Integer, Dict> goods){
		Dict d = goods.get(subId);
		if(d!=null){
			d.setName(name);
			dictService.save(d);
			return;
		}
		d = new Dict();
		d.setName(name);
		d.setType(type);
		d.setSubId(subId);
		dictService.save(d);
	}
	
	
}
