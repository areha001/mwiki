package com.piggysnow.boss.core.web.admin.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

import com.piggysnow.boss.core.domain.Partner;
import com.piggysnow.boss.core.services.PartnerService;
import com.piggysnow.boss.core.services.UserService;
import com.piggysnow.boss.core.web.UserSession;
import com.piggysnow.boss.utils.DataFormat;
import com.piggysnow.common.tags.MyFunction;
import com.piggysnow.common.utils.StringUtils;

/**
 * 后台管理--合作方管理
 */
public class PartnerManagerController extends MultiActionController {
	@Resource
	private UserService userService;
	static Logger log = Logger.getLogger(PartnerManagerController.class);
	public void setUserService(UserService userService) {
		this.userService = userService;
	}
	@Resource
	private PartnerService partnerService;
	
	public void setPartnerService(PartnerService partnerService) {
		this.partnerService = partnerService;
	}

	/**
	 * 合作方显示
	 */
	//json 跳转
	public ModelAndView getShowDeptListJson(HttpServletRequest request,
			HttpServletResponse response)throws Exception{ 
		ModelAndView mav = new ModelAndView("admin/managerDept");
		return mav;
	}

	//显示合作方列表
	public ModelAndView showDeptList(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html");
//		ConnectCache.doInitiallize();
//		ConnectCache.checkUser(new MsgCallback(new Object()));
		//显示所有的合作方信息
		List<Partner> deptList=partnerService.findList();
		Partner dept=null;List count;
		for(int i=0;i<deptList.size();i++){
			dept=deptList.get(i);
			count=userService.findList("select count(*) from User where departId = ? and status >= 0 ",
					dept.getId());
			if(count != null && count.size() == 1)
			{
				dept.setTotal(Integer.parseInt(count.get(0).toString()));
			}
			else
			{//如果本合作方无人，人数为0
				dept.setTotal(0);
			}
		}
		
		//获取Json 并分页显示
		String deptRes=DataFormat.getJsonFormList(deptList.size(),deptList, Long.valueOf(request.getParameter("start")),Long.valueOf(request.getParameter("limit")));
		PrintWriter out = response.getWriter();
		out.print(deptRes);
		log.info(deptRes);
		out.flush();
		out.close();
		return null;
	}

	//添加部门信息
	public ModelAndView AddDept(HttpServletRequest request,
			HttpServletResponse response) throws Exception{
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html,charset=UTF-8");
		String name=request.getParameter("name");
		String code=request.getParameter("dcode");
		Integer status=Integer.valueOf(request.getParameter("status"));
		//判断是否输入的是重复合作方名称
		List<Partner> deptFindList=partnerService.findAddPartnerList(name,Long.valueOf(code));
		PrintWriter out = response.getWriter();
		String printRes = "{'success':false}";
		try{
			if(deptFindList.size() >= 1)
			{	
				//该条记录存在，提示重复信息，并停留在添加页面
				printRes = "{'success':false,'info':'该合作方已重复设置.'}";//信息
			}
			else
			{
				//添加
				Partner dept=new Partner();
				dept.setName(name);
				dept.setDcode(code);
				dept.setCreateDate(new Date());
				dept.setStatus(status);
				partnerService.save(dept);
				printRes = "{'success':true}";
			}	
		}catch(Exception ex){
			ex.printStackTrace();
		}
		out.print(printRes);
		out.flush();
		out.close();
		return null;

	}

	/*
	 * 部门信息修改
	 */

	//首先通过ID取出部门实体信息
	public ModelAndView getDeptById(HttpServletRequest request,
			HttpServletResponse response)throws Exception{ 
		//从页面出取出要记录的ID
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html,charset=UTF-8");
		String printRes = "{'success':true,'data':'失败!'}";
		String id = request.getParameter("id");
		Partner dept = null;
		PrintWriter out = response.getWriter();
		if(id == null)
		{
			printRes = "{'success':true,'data':'无记录ID！'}";
		}
		else
		{
			Long deptId=Long.parseLong(id);
			//从数据库查出对应实体对象
			dept = partnerService.get(deptId);
			if(dept == null)
			{
				printRes = "{'success':true,'data':'无对应记录！'}";
			}
			else
			{
				printRes = "{'success':true,'data':{" +
				"'id':'" + dept.getId() + "'," +
				"'name':'" + dept.getName() + "'," +
				"'dcode':'" + dept.getDcode() + "'," +
				"'status':'" + dept.getStatus() + "'" +
				" }}";
			}
		}
		out.print(printRes);
		out.flush();
		out.close();
		return null;
	}	

	//修改合作方信息
	public ModelAndView extUpdateDept(HttpServletRequest request,
			HttpServletResponse response) throws Exception{
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html,charset=UTF-8");
		//从页面出取出要记录的ID
		String printRes = "{'success':true,'data':'失败!'}";
		String id = request.getParameter("id");//与js中的hiddenName:"id",名字一致
		Long deptId=Long.parseLong(id);
		//从数据库查出对应实体对象
		Partner dept = partnerService.get(deptId);
		String name=request.getParameter("name");
		String code=request.getParameter("dcode");

		List<Partner> deptFindList=partnerService.findAddPartnerList(name,Long.valueOf(code));
		PrintWriter out = response.getWriter();
		if(dept == null)
		{
			printRes = "{'success':true,'data':'无记录ID！'}";
		}

		//如果有相同的一条重得记录，则修改合作方信息失败
		if(deptFindList.size()>=1){
			printRes = "{'success':false,'info':'该合作方已重复设置.'}";//信息
		}
		else
		{
			//修改
			Integer status=Integer.valueOf(request.getParameter("status"));
			dept.setName(name);
			dept.setDcode(code);
			dept.setStatus(status);
			partnerService.save(dept);	
			printRes = "{'success':true,'info':'修改成功！'}";							

		}

		out.print(printRes);
		out.flush();
		out.close();
		return null;	
	}	

	
	//删除选中部门记录																			
	public ModelAndView extDeleteDeptRows(HttpServletRequest request,
			HttpServletResponse response)throws Exception{ 
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html,charset=UTF-8");
    	String []CheckedDeptList=request.getParameterValues("CheckDeptList");
		String printRes = "{'success':true}";
		List<String> failedList = new ArrayList<String>();
		try{
		for(String itemID:CheckedDeptList){
			Partner dept = partnerService.get(Long.parseLong(itemID));
			Long teacherCount = partnerService.findOne(" select count(*) from User where departId = ? and status >= 0",
					dept.getId());
			if(teacherCount == 0)
				partnerService.remove(dept);
			else
				failedList.add(dept.getName());
		}
		printRes = "{'success':true, 'faileds':'" + MyFunction.escape(StringUtils.join(failedList.toArray(), ","))+ "'}";
		}catch(Exception ex){
			ex.printStackTrace();
		}
		PrintWriter out = response.getWriter();
		out.print(printRes);
		out.flush();
		out.close();
		return null;
	}

	/*
	 * 按关键字查找合作方的记录
	 */
	public ModelAndView searchDeptByName(HttpServletRequest request,
			HttpServletResponse response)throws Exception{ 
		response.setCharacterEncoding("UTF-8");

		String name=request.getParameter("name");
       //按名字查询合作方记录
		List deptList = partnerService.serchByName(name);
    	//获取Json并分页
		String deptRes = DataFormat.getJsonFormList(deptList.size(), deptList, Long.valueOf(request.getParameter("start")),Long.valueOf(request.getParameter("limit")));
		PrintWriter out = response.getWriter();
		out.print(deptRes);
		out.flush();
		out.close();
		return null;

	}
	
	public ModelAndView findPartner(HttpServletRequest request,
			HttpServletResponse response) throws IOException{
		response.setContentType("text/html");
		String result = "";
		List<Partner> partners = null;
		try {
			partners = partnerService.findList();
			StringBuilder sb = new StringBuilder();
			sb.append("[");
			Long departId = UserSession.getDepartId(request);
			// 渠道id不为空，只能获取该渠道信息
			if (departId != null && partnerService.findMap().get(departId) != null) {
				Partner pt = partnerService.findMap().get(departId);
				sb.append("{'id':'" + pt.getId() + "','dcode':'"
						+ pt.getDcode() + "','text':'" + pt.getName() + "'},");
				// Partner pt = partnerService.get(String.valueOf(departId));
				// String dcode = pt.getDcode();
			} else {
				sb.append("{'id':'','dcode':'','text':'不限'},");
				// sb.append("{'id':'','dcode':'','text':'历史'},");
				for (Partner partner : partners) {
					sb.append("{'id':'" + partner.getId() + "','dcode':'"
							+ partner.getDcode() + "','text':'"
							+ partner.getName() + "'},");
				}
			}
			sb.append("]");
			result = sb.toString().replace(",]", "]");
		} catch (Exception e) {
			e.printStackTrace();
		}
		response.setContentType("text/plain;charset=UTF-8");
		response.getWriter().print(result);
		response.getWriter().flush();
		response.getWriter().close();
		return null;
	}

}
