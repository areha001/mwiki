package com.piggysnow.boss.core.web;

/**
 * Miscellaneous utilities for web application.
 * 
 * @author <a href="mailto:qhuang@chinaschool.net">huangqiao</a>
 * 
 */
public class WebUtils {
	/**
	 * 獲取WEB-INF的絕對路徑
	 */
	public static String getWebInfPath() {
		return getWebRootPath() + "/WEB-INF";
	}

	/**
	 * 獲取web应用根目錄的絕對路徑
	 */
	public static String getWebRootPath() {
		String path = WebUtils.class.getClassLoader().getResource("").getPath();
		String osName = System.getProperty("os.name");
		if (osName.equalsIgnoreCase("linux")) {
			path = path.substring(0, path.length() - 16);
		} else {
			path = path.substring(1, path.length() - 16);
		}
		return path;
	}

	public static void main(String[] args) {
		System.out.println("web根目錄的路径:" + WebUtils.getWebRootPath());
		System.out.println("WEB-INF的路径:" + WebUtils.getWebInfPath());
	}
}