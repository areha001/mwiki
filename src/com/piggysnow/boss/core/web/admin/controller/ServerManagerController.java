package com.piggysnow.boss.core.web.admin.controller;
import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

import com.piggysnow.boss.core.domain.Server;
import com.piggysnow.boss.core.services.PartnerService;
import com.piggysnow.boss.core.services.ServerService;
import com.piggysnow.boss.utils.DataFormat;

/**
 * 
 *	查询用户信息
 * 
 */
public class ServerManagerController extends MultiActionController {
	
	static Logger log = Logger.getLogger(ServerManagerController.class);
	@Resource
	private ServerService serverService;
	@Resource
	private PartnerService partnerService;
	
	public void setPartnerService(PartnerService partnerService) {
		this.partnerService = partnerService;
	}
	public void setServerService(ServerService serverService) {
		this.serverService = serverService;
	}

	
	@Override
	protected ModelAndView handleRequestInternal(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		return super.handleRequestInternal(request, response);
	}

	/**
	 * 服务器显示
	 */
	//json 跳转
	public ModelAndView getShowInfo(HttpServletRequest request,
			HttpServletResponse response)throws Exception{ 
		ModelAndView mav = new ModelAndView("admin/managerServer");
		return mav;
	}
	
	/**
	 * group文件生成配置
	 */
	//json 跳转
	public ModelAndView groupSetting(HttpServletRequest request,
			HttpServletResponse response)throws Exception{ 
		ModelAndView mav = new ModelAndView("admin/groupGenerate");
		return mav;
	}
	/**
	 * group文件生成
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ModelAndView groupDownload(HttpServletRequest request,
			HttpServletResponse response)throws Exception{ 
//		String filePath = "D:/Documents/Downloads/xeye.log";
//		File f = new File(filePath); 
//		if (!f.exists()) { 
//			response.sendError(404, "File not found!"); 
//			return null; 
//		}
		String serverIdStr = request.getParameter("ids");//"107,108,100,102,103,119,113,116";
		String[] ids = serverIdStr.split(",");
		List<Server> servers = new ArrayList<Server>();
		for (String id : ids) {
			Server server = serverService.find(Long.valueOf(id));
			if(server == null){
				continue;
			}
			servers.add(server);
		}
		ByteArrayInputStream bais = new ByteArrayInputStream(groupGenerate(servers).getBytes());
		byte[] buf = new byte[1024]; 
		int len = 0; 
		response.reset(); 
		response.setContentType("application/x-msdownload"); 
		response.setHeader("Content-Disposition", "attachment; filename=group.js"); 
		OutputStream out = response.getOutputStream(); 
		while ((len = bais.read(buf)) > 0) out.write(buf, 0, len); 
		bais.close(); 
		out.close(); 
		return null;
	}
	private String groupGenerate(List<Server> servers){
		Map<String, List<Server>> map = new HashMap<String, List<Server>>();
		for (Server server : servers) {
			List<Server> list = map.get(server.groupName);
			if(list == null){
				list = new ArrayList<Server>();
				map.put(server.groupName, list);
			}
			list.add(server);
		}

		StringBuffer sb = new StringBuffer();
		String[] groupNames = new String[]{"GAME","DATA","LOGIN","MATCH"};
		for (String groupName : groupNames) {
			List<Server> list = map.get(groupName);
			for (int i = 0;i < list.size();i++) {
				sb.append("var " + groupName + (i + 1) + " = " + generateServerOne(list.get(i)) + "\n\r");
			}
			sb.append("var "+ groupName +" = " + groupArray("GAME",list.size()) + "\n\r");
			sb.append("var "+ groupName +"_DEFAULT" + " = \""+ list.get(0).subName +"\"\n\r\n\r");
		}
		sb.append("var MEMCACHED_DEFAULT =\""+ map.get("CACHE").get(0).outAddr +"\"\n\r");
		return sb.toString();
		
	}
	private String groupArray(String groupName, int size) {
		StringBuffer sb = new StringBuffer();
		sb.append("[");
		for (int i = 1; i <= size; i++) {
			if(i != 1){
				sb.append(",");
			}
			sb.append(groupName+i);
		}
		sb.append("]");
		return sb.toString();
	}
	private String generateServerOne(Server server) {
		String[] addr = server.outAddr.split(":");
		String ip = addr[0];
		String port = addr[1];
		
		return "[\""+ ip +"\",\""+ port +"\",\""+ server.subName +"\",\""+ server.clusterName +"\"]";
	}
	//显示服务器列表
	public ModelAndView showList(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		//显示所有的服务器信息
		String groupNameStr = request.getParameter("groupName");
		String groupTypeStr = request.getParameter("groupType");
		List<Server> serverList;
		serverList = serverService.findListByNameAndType(groupNameStr, groupTypeStr);
		//获取Json 并分页显示
		String deptRes=DataFormat.getJsonFormList(serverList.size(),serverList);
		PrintWriter out = response.getWriter();
		out.print(deptRes);
		log.info(deptRes);
		out.flush();
		out.close();
		return null;
	}
	


	
	//显示服务器列表
	public ModelAndView searchList(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		return null;
	}
	
	private void req2Bean(HttpServletRequest request, Server s){

		String name=request.getParameter("name");
		String innerAddr=request.getParameter("innerAddr");
		String outAddr=request.getParameter("outAddr");
		String subName=request.getParameter("subName");
		String groupType=request.getParameter("groupType");
		String groupName=request.getParameter("groupName");
		String clusterName=request.getParameter("clusterName");
		
		Integer status=Integer.valueOf(request.getParameter("status"));

		s.setInnerAddr(innerAddr);
		s.setOutAddr(outAddr);
		s.setName(name);
		s.setStatus(status);
		s.setSubName(subName);
		s.setGroupType(groupType);
		s.setGroupName(groupName);
		s.setServerId(subName);
		s.setClusterName(clusterName);
	}
	//添加服务器信息
	public ModelAndView add(HttpServletRequest request,
			HttpServletResponse response) throws Exception{
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html,charset=UTF-8");
		PrintWriter out = response.getWriter();
			//添加
		Server s = new Server();
		s.setCreateTime(new Date());
		req2Bean(request, s);
		serverService.save(s);
		//EasyCaller.getInstance(ConnectorContainer.DATA).createRemote(ServerHandler.class).addServer(s);
		String printRes = "{'success':true}";
		out.print(printRes);
		out.flush();
		out.close();
		return null;
	}

	/*
	 * 服务器信息修改
	 */

	//首先通过ID取出服务器实体信息
	public ModelAndView find(HttpServletRequest request,
			HttpServletResponse response)throws Exception{ 
		//从页面出取出要记录的ID
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html,charset=UTF-8");
		String printRes = "{'success':true,'data':'失败!'}";
		String idStr = request.getParameter("id");
		Server s = null;
		PrintWriter out = response.getWriter();
		if(idStr == null)
		{
			printRes = "{'success':true,'data':'无记录ID！'}";
		}
		else
		{
			Long id=Long.parseLong(idStr);
			//从数据库查出对应实体对象
			s = serverService.find(id);
			if(s == null)
			{
				printRes = "{'success':true,'data':'无对应记录！'}";
			}
			else
			{
				printRes = DataFormat.toJson(s);
			}
		}
		out.print(printRes);
		out.flush();
		out.close();
		return null;
	}	

	//修改合作方信息
	public ModelAndView update(HttpServletRequest request,
			HttpServletResponse response) throws Exception{
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html,charset=UTF-8");
		//从页面出取出要记录的ID
		String printRes = "{'success':true,'data':'失败!'}";
		String id = request.getParameter("id");//与js中的hiddenName:"id",名字一致
		Long deptId=Long.parseLong(id);
		//从数据库查出对应实体对象
		Server s = serverService.find(deptId);
		req2Bean(request, s);
		serverService.save(s);
	//	EasyCaller.getInstance(ConnectorContainer.DATA).createRemote(ServerHandler.class).updateServer(s);
		printRes = "{'success':true,'info':'修改成功！'}";							

		PrintWriter out = response.getWriter();
		out.print(printRes);
		out.flush();
		out.close();
		return null;	
	}	

	
	//删除选中服务器记录																			
	public ModelAndView delete(HttpServletRequest request,
			HttpServletResponse response)throws Exception{ 
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html,charset=UTF-8");
    	String []ids=request.getParameterValues("ids");
		String printRes = "{'success':true}";
		for(String id:ids){
			serverService.delete(Long.valueOf(id));
		}
		PrintWriter out = response.getWriter();
		out.print(printRes);
		out.flush();
		out.close();
		return null;
	}

	// 查询服务器分组
	public ModelAndView findGroupType(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		response.setContentType("text/html");
		String result = "";
		List<Server> groupList = null;
		try {
			groupList = serverService.findGroupList();
			StringBuilder sb = new StringBuilder();
			sb.append("[");
			sb.append("{'id':'','dcode':'不限' ,'text':'不限'},");
			for (Server ser : groupList) {
				if (ser.getId() > 0) {
					sb.append("{'id':'" + ser.getId() + "','dcode':'"
							+ ser.getGroupType() + "','text':'"
							+ ser.getGroupType() + "'},");
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

	public ModelAndView findallServer(HttpServletRequest request,
			HttpServletResponse response) throws Exception{
		response.setContentType("text/json");
		String groupIds = request.getParameter("serverId");
		String groupType = "";
		if(StringUtils.isNotEmpty(groupIds)){
			String[] sid = groupIds.split(",");
			for(int i = 0; i < sid.length;i++){
				if(!"不限".equals(sid[i])){
					groupType = groupType+"'"+sid[i]+"'"+",";
				}
			}
			if(!groupType.equals("")){
				groupType = groupType.substring(1, groupType.length()-2);
			}
		}
		List<Server> serverList = null;
		List<HashMap<String, String>> list = new ArrayList<HashMap<String,String>>();
		HashMap<String, String> map =new HashMap<String, String>();
		map.put("id", "");
		map.put("text", "不限");
		try {
			serverList = serverService.findServerList("game", groupType);
			list.add(map);
			for(Server ser:serverList){
				HashMap<String, String> hm = new HashMap<String, String>();
				hm.put("id", ser.getName());
				hm.put("text", ser.getName());
				hm.put("groupType", ser.getGroupType());
				list.add(hm);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return sendJsonString(response, list);
	}
	
	private ModelAndView sendJsonString(HttpServletResponse response,Object o) throws IOException{
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		String info = JSONArray.fromObject(o).toString();
		out.print(info);
		out.flush();
		out.close();
		return null;
	}


}
