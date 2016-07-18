package com.piggysnow.common.utils;

import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;
/**
 * @author Xunuo
 * 时间工具类
 * */
public class TimeUtil {
	private static StringBuilder appendInFormat(StringBuilder sb, int num, String separator)
	{
		if(num<10)
			sb.append("0");
		sb.append(num);
		sb.append(separator);
		return sb;
	}

	public static String getTimeDisplayString(Date date)
	{
		Date newDate = getNowDate();
		long time = newDate.getTime() - date.getTime() ;
		long minutes = time/60000;
		if(minutes < 2)
			return "刚刚";
		if(minutes < 60)
			return minutes+"分钟前";
		long hours = minutes / 60;
		if(hours < 24)
			return hours+"小时前";
		long days = hours/24;

		Calendar oc = Calendar.getInstance();
		oc.setTime(date);
		
		Calendar nc = Calendar.getInstance();
		nc.setTime(newDate);
		
		oc.add(Calendar.DAY_OF_MONTH, 1);
		if(oc.get(Calendar.DAY_OF_MONTH) == nc.get(Calendar.DAY_OF_MONTH))
		{
			return "昨天";
		}
		oc.add(Calendar.DAY_OF_MONTH, 1);
		if(oc.get(Calendar.DAY_OF_MONTH) == nc.get(Calendar.DAY_OF_MONTH))
		{
			return "前天";
		}
		
		if(days < 30)
			return days + "天前";
		
		long months = days/30;
		if(months < 12)
			return months + "个月前";
		
		long years = months/12;
		return years + "年前";
	}
	/**
	 * 获取当前系统时间的String形式
	 * */
	public static String getCurrentTime() {
		// TODO Auto-generated method stub


		Calendar c = Calendar.getInstance();
		c.setTimeInMillis(System.currentTimeMillis() + 8*3600*1000L);
		
		int year = c.get(Calendar.YEAR);
		int month = c.get(Calendar.MONTH)+1;
		int day = c.get(Calendar.DAY_OF_MONTH);
		int hour = c.get(Calendar.HOUR_OF_DAY);
		int minute = c.get(Calendar.MINUTE);
		int second = c.get(Calendar.SECOND);
		
		
		String dSeparator = "-";
		String midSeparator = " ";
		String tSeparator = ":";
		StringBuilder sb = new StringBuilder();
		sb = appendInFormat(sb,year,dSeparator);
		sb = appendInFormat(sb,month,dSeparator);
		sb = appendInFormat(sb,day,midSeparator);
		sb = appendInFormat(sb,hour,tSeparator);
		sb = appendInFormat(sb,minute,tSeparator);
		sb = appendInFormat(sb,second,"");
		
		return sb.toString();
	}
	
	/**
	 * 指定时区，获取当前时间
	 * @return
	 */
	public static Date getNowDate(){
		TimeZone tz = TimeZone.getDefault(); 
		TimeZone.setDefault(TimeZone.getTimeZone("GMT")); 
		Calendar cl = Calendar.getInstance(tz); 
		int time = (int)(cl.getTimeInMillis()/1000);
		time = time + (int)(3600 * 8.0);
		Date date = new Date(time*1000l);
		return date;
	}
	
	/**
	 * 将时间字符串转化为java.util.Date
	 * */
	public static Date formatToDate(String s )
	{
		if(s==null)
			return null;
		String[] dateTimeInfo = s.trim().split(" ");
		String dateInfo = dateTimeInfo[0];
		String[] dateString = dateInfo.split("-");
		TimeZone tz = TimeZone.getDefault(); 
		Calendar cl = Calendar.getInstance(tz); 
		cl.set(Calendar.YEAR, Integer.valueOf(dateString[0]));
		cl.set(Calendar.MONTH, 0 );
		cl.set(Calendar.DATE, 1 );
		cl.set(Calendar.HOUR_OF_DAY, 0);
		cl.set(Calendar.MINUTE, 0);
		cl.set(Calendar.SECOND, 0);
		cl.set(Calendar.MILLISECOND, 0);
		if(dateString.length>1)
			cl.set(Calendar.MONTH, Integer.valueOf(dateString[1])-1);
		if(dateString.length>2)
			cl.set(Calendar.DATE, Integer.valueOf(dateString[2]));
		
		
		if(dateTimeInfo.length >= 2)
		{
			String timeInfo = dateTimeInfo[1];
			String[] timeString = timeInfo.split(":");
			if(timeString.length >= 1)
				cl.set(Calendar.HOUR_OF_DAY, Integer.parseInt(timeString[0]));
			if(timeString.length >= 2)
				cl.set(Calendar.MINUTE,Integer.parseInt(timeString[1]));
			if(timeString.length >= 3)
			{
				String[] secondsString = timeString[2].split("\\.");
				if(secondsString.length>=1)
					cl.set(Calendar.SECOND, Integer.parseInt(secondsString[0]));
				else
					cl.set(Calendar.SECOND, Integer.parseInt(timeString[2]));
			}
		}
		
		Date date = new Date(cl.getTimeInMillis() );
		return date;
	}
	
	/**
	 * 将long型转换为date数据类型
	 * @param dateNumber
	 * @return
	 */
	public static Date longToDate(long dateNumber){
		return new Date(dateNumber);
	}
	/**
	 * 向页面输出Date对象，格式可以转化为JS的Date对象
	 * */
	public static String toJsDate(Date dt)
	{
		if(dt==null)
			return "";
		StringBuilder sb = new StringBuilder();
		Calendar c = Calendar.getInstance();
		c.setTime(dt);
		sb.append(c.get(Calendar.YEAR));
		sb.append("," + c.get(Calendar.MONTH));
		sb.append("," + c.get(Calendar.DATE));
		sb.append("," + c.get(Calendar.HOUR_OF_DAY));
		sb.append("," + c.get(Calendar.MINUTE));
		sb.append("," + c.get(Calendar.SECOND));
		
		return sb.toString();
	}
	
	/**
	 * 返回从当天0时开始时经过的毫秒数
	 * */
	public static long timeOfDay(Date date)
	{
		Calendar dateCalendar = Calendar.getInstance();
		dateCalendar.setTime(date);
		long dayBeginTime = getDayBeginTime(date);
		return dateCalendar.getTimeInMillis() - dayBeginTime;
	}
	public static void main(String[] args)
	{
		System.out.print(getDateByOffestAndTime(TimeUtil.getNowDate() , 22 , 10000));
	}
	public static Date getDateByOffestAndTime(Date sourceDate, int offset , long milliInDay)
	{
		long sourceDateBegin = getDayBeginTime(sourceDate);
		long day = sourceDateBegin + offset * 3600000L * 24;
		long realTime = day + milliInDay;
		Calendar dateCalendar = Calendar.getInstance();
		dateCalendar.setTimeInMillis(realTime);
		return dateCalendar.getTime();
	}
	/**
	 * 返回两个日期间的日期差， max - min
	 * */
	public static int minusDate(Date datemin , Date datemax)
	{
		long timemin = getDayBeginTime(datemin);
		long timemax = getDayBeginTime(datemax);
		Long days = ((timemax - timemin)/( 3600000 * 24 ));
		return days.intValue();
	}
	/**
	 * 返回当天零点的系统时间（毫秒）
	 * */
	public static long getDayBeginTime(Date date)
	{
		Calendar dateCalendar = Calendar.getInstance();
		dateCalendar.setTime(date);
		dateCalendar.set(Calendar.HOUR_OF_DAY, 0);
		dateCalendar.set(Calendar.MINUTE, 0);
		dateCalendar.set(Calendar.SECOND, 0);
		dateCalendar.set(Calendar.MILLISECOND, 0);
		return dateCalendar.getTimeInMillis();
	}
}
