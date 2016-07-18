package com.piggysnow.boss.utils;

import java.lang.reflect.Field;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Table;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import com.piggysnow.boss.exception.SearchException;
import com.piggysnow.common.dao.Page;


public class LogUtils {
	
	static Logger log = Logger.getLogger(LogUtils.class);
	
	private static LogUtils instance;
	public LogUtils(){
		if(instance == null){
			instance = this;
		}
	}
	
	public static Connection getConnection() throws SQLException{
		return instance.ds.getConnection();
	}
	private ComboPooledDataSource ds;
	public void setDs(ComboPooledDataSource ds) {
		this.ds = ds;
	}
	
	private static String sqlField(Field f){
		Column c = f.getAnnotation(Column.class);
		if(c!=null){
			return c.name();
		}
		return CamelCaseUtils.toUnderlineName(f.getName());
	}
	


	public static <T> List<T> q(Class<T> clz , Long userId, Date start, Date end, String actionId, String resName,
			Page page, String... moreCon) throws Exception{

		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date xEnd = new Date(end.getTime() + 24*3600*1000L);
		StringBuilder sb = new StringBuilder();
		sb.append( " playerID = "+userId);
		sb.append(" and mod_time >= '" + sdf.format(start) + "'");
		sb.append(" and mod_time < '" + sdf.format(xEnd) + "'");
		if(actionId!=null && !"".equals(actionId)){
			sb.append(" and actionId = " + Integer.valueOf(actionId));
		}
		if(StringUtils.isNotEmpty(resName)){
			sb.append(" and goodsID = '"+resName+"'");
		}
		int[] mon = getBetweenMonth(start, end);
		if(mon.length>5){
			throw new SearchException("月份跨度不要超过4个月");
		}
		for(String con : moreCon){
			sb.append(" "+ con+ " ");
		}
		String orderBy = " mod_time desc limit " + page.getPageStart() + " , " + page.getPageSize();
		
		return q(clz, sb.toString() ,orderBy, mon);
	}

	public static <T> List<T> q(Class<T> clz ,  String condition, String orderBy,int... mon) throws Exception{
		String sql = "select * from " + getMonthTable(clz, mon) + " where " + condition +  " order by " + orderBy;
		return query(sql, clz);
	}
	

	private static int[] getBetweenMonth(Date start, Date end){
		int monthStart = start.getMonth();
		int monthEnd = end.getMonth();
		List<Integer> list = new ArrayList<Integer>();
		if(monthStart>monthEnd){
			while(monthStart<=11){
				monthStart++;
				list.add(monthStart);
			}
			monthStart = 0;
		}
		while(monthStart<=monthEnd){
			monthStart++;
			list.add(monthStart);
		}
		int[] months = new int[list.size()];
		for(int i=0;i<list.size();i++){
			months[i] = list.get(i);
		}
		return months;
	}
	
	public static <T> String getMonthTable(Class<T> clz , int... mon){
//		if(mon.length==0){
//			Calendar c = Calendar.getInstance();
//			int monNow = c.get(Calendar.MONTH)+1;
//			c.add(Calendar.MONTH, -1);
//			int monBefore = c.get(Calendar.MONTH)+1;
//			mon = new int[]{monBefore, monNow};
//		}
		Table t = clz.getAnnotation(Table.class);
		if(t==null){
			throw new RuntimeException("class " +  clz.getSimpleName() + "没写 @Table");
		}
		String tableName = t.name();
		return tableName;
//		StringBuilder sb = new StringBuilder(" (");
//		boolean first = true;
//		for(int m: mon){
//			if(!first){
//				sb.append(" UNION ");
//			}
//			first = false;
//			sb.append(" select * from " + tableName+"_" + m + " ");
//		}
//		sb.append(" ) t "); 
//		return sb.toString();
	}
	
	public static <T> List<T> query(String sql, Class<T> c)throws Exception{
		log.info(sql);
		Connection conn = getConnection();
        Statement st = (Statement) conn.createStatement();    //创建用于执行静态sql语句的Statement对象，st属局部变量  
        ResultSet rs = st.executeQuery(sql);    //执行sql查询语句，返回查询数据的结果集  
        List<T> list = new ArrayList<T>();
        Field[] fs = c.getDeclaredFields();
        while (rs.next()) { // 判断是否还有下一个数据  
            // 根据字段名获取相应的值  
        	T obj = c.newInstance();
        	for(Field d :fs){
        		if(!d.isAccessible()){
        			d.setAccessible(true);
        		}
        		if(d.getType() == int.class || d.getType()== Integer.class){
        			d.set(obj, rs.getInt(sqlField(d)));
        		}
        		if(d.getType() == long.class || d.getType()== Long.class){
        			d.set(obj, rs.getLong(sqlField(d)));
        		}
        		if(d.getType() == String.class){
        			d.set(obj, rs.getString(sqlField(d)));
        		}
        		if(d.getType() == float.class || d.getType() == Float.class){
        			d.set(obj, rs.getFloat(sqlField(d)));
        		}
        		if(d.getType() == double.class || d.getType() == Double.class){
        			d.set(obj, rs.getFloat(sqlField(d)));
        		}
        		if(d.getType() == Date.class){
        			d.set(obj, rs.getTimestamp(sqlField(d)));
        		}
        	}
            list.add(obj);
            //输出查到的记录的各个字段的值  
        }  
        rs.close();
        st.close();
        conn.close();
        return list;
	}
	
	public void dd() throws Exception{
		Connection conn = ds.getConnection();
		 try {  
	            String sql = "select * from log_exp";     // 查询数据的sql语句  
	            Statement st = (Statement) conn.createStatement();    //创建用于执行静态sql语句的Statement对象，st属局部变量  
	            ResultSet rs = st.executeQuery(sql);    //执行sql查询语句，返回查询数据的结果集  
	            System.out.println("最后的查询结果为：");  
	            while (rs.next()) { // 判断是否还有下一个数据  
	                // 根据字段名获取相应的值  
	                String playerID = rs.getString("playerID");  
	                String name = rs.getString("name");  
	                String addExp = rs.getString("add_exp");  
	                String orgExp = rs.getString("org_exp");  
	                String remainExp = rs.getString("remain_exp");  
	                String action = rs.getString("action");  
	                String actionID = rs.getString("actionID");  
	                Date modTime = rs.getDate("mod_time");  
	                  
	                //输出查到的记录的各个字段的值  
	                System.out.println(name + " " + playerID + " " + addExp + " " + orgExp  
	                        + " " + remainExp + " " + action + " " + actionID + " " +  modTime);  
	            }  
	              
	        } catch (SQLException e) {  
	            System.out.println("查询数据失败");  
	        }  
	}

	 public static void main(String[] args) throws Exception{
		 Connection conn = getConnection(); //同样先要获取连接，即连接到数据库  
	        try {  
	            String sql = "select * from log_exp";     // 查询数据的sql语句  
	            Statement st = (Statement) conn.createStatement();    //创建用于执行静态sql语句的Statement对象，st属局部变量  
	            ResultSet rs = st.executeQuery(sql);    //执行sql查询语句，返回查询数据的结果集  
	            System.out.println("最后的查询结果为：");  
	            while (rs.next()) { // 判断是否还有下一个数据  
	                  
	                // 根据字段名获取相应的值  
	                String playerID = rs.getString("playerID");  
	                String name = rs.getString("name");  
	                String addExp = rs.getString("add_exp");  
	                String orgExp = rs.getString("org_exp");  
	                String remainExp = rs.getString("remain_exp");  
	                String action = rs.getString("action");  
	                String actionID = rs.getString("actionID");  
	                Date modTime = rs.getDate("mod_time");  
	                  
	                //输出查到的记录的各个字段的值  
	                System.out.println(name + " " + playerID + " " + addExp + " " + orgExp  
	                        + " " + remainExp + " " + action + " " + actionID + " " +  modTime);  
	              
	            }  
	            conn.close();   //关闭数据库连接  
	              
	        } catch (SQLException e) {  
	            System.out.println("查询数据失败");  
	        }  
	 }
}
