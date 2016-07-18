package com.piggysnow.boss.utils;


/**
 * 提供给外围组件Tag的操作服务
 * */
public class TagUtil {
//
//	public static TagService tagService = null;
//	
//	public static List<Tag> savePrimaryTag(HttpServletRequest request)
//	{
//		String primaryTag = request.getParameter("primaryTag");
//		if(primaryTag!=null &&  !"".equals(primaryTag))
//		{
//			return tagService.fetchTagsByTagNames(new String[]{primaryTag}, UserSession.get(request).getUser().getId());
//		}
//		else
//			return new ArrayList<Tag>();
//	}
//	
//	public static List<Tag> saveTags(HttpServletRequest request)
//	{
//
//		String tags = request.getParameter("tag");
//		if(tags!=null &&  !"".equals(tags))
//		{
//			String[] tagArr = tags.split(" ");
//			return tagService.fetchTagsByTagNames(tagArr, UserSession.get(request).getUser().getId());
//		}
//		else
//			return new ArrayList<Tag>();
//	}
//	
//	public static String getTagNameString(List<Tag> tags)
//	{
//		StringBuilder sb = new StringBuilder();
//		if(tags == null || tags.size() == 0 )
//			return null;
//		for(int i=0; i<tags.size(); i++)
//		{
//			if(i!= tags.size()-1)
//			{
//				sb.append(tags.get(i).getName());
//				sb.append(" ");
//			}
//			else
//				sb.append(tags.get(i).getName());
//		}
//		
//		return sb.toString();
//	}	
//	public static List<Long> getTagIdString(List<Tag> tags)
//	{
//		List<Long> ids = new ArrayList<Long>();
//		if(tags == null)
//			return ids;
//		for(Tag tag : tags)
//		{
//			ids.add(tag.getId());
//		}
//		return ids;
//	}
//	
//	/**
//	 * 除重复及多空格，格式化tag Name
//	 * */
//	public static List<String> getTrimedTagNames(String inputTagNames)
//	{
//		List<String> tags = new ArrayList<String>();
//		String[] tagNames = inputTagNames.split(" ");
//		if(tagNames==null || tagNames.length == 0)
//			return tags;
//		//除重复
//		for(String s : tagNames)
//		{
//			if( (! s.matches("\\s*")) || tags.indexOf(s) == -1)
//			{
//				tags.add(s);
//			}
//		}
//		return tags;
//	}
	
	

}
