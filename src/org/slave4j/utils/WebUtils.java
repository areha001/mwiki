package org.slave4j.utils;

import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.slave4j.orm.Filtration;
import org.slave4j.orm.Compositor;
import org.slave4j.orm.PageData;
import org.slave4j.orm.Compositor.CompositorType;

/**
 * web工具类
 * @author yangzhibin
 *
 */
public class WebUtils
{
	@SuppressWarnings("unchecked")
	public static Map getParametersStartingWith(HttpServletRequest request, String prefix)
	{
		Enumeration paramNames = request.getParameterNames();
		Map params = new TreeMap();
		if (prefix == null)
		{
			prefix = "";
		}
		while (paramNames != null && paramNames.hasMoreElements())
		{
			String paramName = (String) paramNames.nextElement();
			if ("".equals(prefix) || paramName.startsWith(prefix))
			{
				String unprefixed = paramName.substring(prefix.length());
				String[] values = request.getParameterValues(paramName);
				if (values == null || values.length == 0)
				{
					// Do nothing, no values found at all.
				} else if (values.length > 1)
				{
					params.put(unprefixed, values);
				} else
				{
					params.put(unprefixed, values[0]);
				}
			}
		}
		return params;
	}

	@SuppressWarnings("unchecked")
	public static List<Filtration> creatFiltrationList(HttpServletRequest request, String filterPrefix)
	{
		List<Filtration> filtrationList = new ArrayList<Filtration>();

		//从request中获取含属性前缀名的参数,构造去除前缀名后的参数Map.
		Map<String, String> filterParamMap = getParametersStartingWith(request, filterPrefix);

		//分析参数Map,构造PropertyFilter列表
		for (Map.Entry<String, String> entry : filterParamMap.entrySet())
		{
			String filterName = entry.getKey();
			String value = entry.getValue();//MyStringUtils.iso2utf(entry.getValue());
			//如果value值为空,则忽略此filter.
			if (StringUtils.isNotBlank(value))
			{
				Filtration filter = new Filtration(filterName, value);
				filtrationList.add(filter);
			}
		}
		return filtrationList;
	}
	
	public static void setPageDataParameter(HttpServletRequest request, PageData<?> pageData)
	{
		//第一步：设置过滤条件
		List<Filtration> filtrationList = creatFiltrationList(request,"filter_");
		pageData.setFiltrations(filtrationList);
		//第二不：设置排序条件
		String fieldName = request.getParameter("fieldName");
		String compositorType = request.getParameter("compositorType");
		if (StringUtils.isNotBlank(fieldName) && StringUtils.isNotBlank(compositorType))
		{
			Compositor compositor = new Compositor(fieldName, Enum.valueOf(CompositorType.class, compositorType));
			pageData.setCompositor(compositor);
		}else{
			Compositor compositor = new Compositor("id", Compositor.CompositorType.DESC);
			pageData.setCompositor(compositor);
		}
		//第三步：设置当前页
		String pageNoStr = request.getParameter("pageNo");
		if (StringUtils.isNotBlank(pageNoStr))
		{
			Integer pageNo = Integer.parseInt(pageNoStr);
			pageData.setPageNo(pageNo);
		}
	}
}
