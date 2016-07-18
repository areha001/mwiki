package test.piggysnow.core;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import junit.framework.TestCase;


public class TestCore extends TestCase {
	
	
	@Override
	protected void setUp() throws Exception {
		getConnection();
	}

	@Override
	protected void tearDown() throws Exception {
		// TODO Auto-generated method stub
		if(!conn.isClosed()){
			conn.close();
		}
	}

	protected String[] getConfig(){
		return new String[]{"jdbc:mysql://192.168.135.33/ddp_web?characterEncoding=UTF-8", "app", "app"};
	}
    protected Connection conn = null; 
    public Connection getConnection() throws Exception {  
    	if(conn!=null && !conn.isClosed()){
    		return conn;
    	}
        Class.forName("com.mysql.jdbc.Driver");
        String[] cfg = getConfig();
        conn = DriverManager.getConnection(cfg[0], cfg[1], cfg[2]);
        return conn;
    }  

	public List<Object[]> query(String sql)throws Exception{

		Connection conn = getConnection();
        Statement st = (Statement) conn.createStatement();  
        ResultSet rs = st.executeQuery(sql);    
        List<Object[]> list = new ArrayList<Object[]>();
        while (rs.next()) { 
        	
        	int colCount = rs.getMetaData().getColumnCount();
        	Object[] row = new Object[colCount];
        	for(int i=0; i< rs.getMetaData().getColumnCount(); i++){
        		Object o = rs.getObject(i+1);
        		if(o instanceof java.sql.Date){
        			o = new java.util.Date(((java.sql.Date) o).getTime());
        		}
        		
        		row[i] = o;
        	}
        	list.add(row);
        }
		return list;
	}
	
	public void execute(String sql, Object... params) throws SQLException{
		System.out.println(sql);
        PreparedStatement pStatement = conn.prepareStatement(sql);
        if(null !=params){
        	int index = 1;
        	for(int i=0; i<params.length; i++){
        		if(null != params[i]){
        			pStatement.setObject(index, params[i]);
        			index++;
        		}
        	}
        }
        pStatement.execute();
	}
	
	 public static void main(String[] args) throws Exception{

	 }
}
