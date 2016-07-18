package test.piggysnow;

import java.sql.Connection;

import test.piggysnow.core.TestCore;


public class TestAddActionTypeToLog extends TestCore{

	protected String[] getConfig(){
		return new String[]{"jdbc:mysql://192.168.135.33/ddp_web", "app", "app"};
	}
	 public  void testAddAction() throws Exception{

		 TestAddActionTypeToLog tc = new TestAddActionTypeToLog();
		 Connection conn = tc.getConnection(); //同样先要获取连接，即连接到数据库 
    	String sql1 = "delete from t_action_type";
    	conn.createStatement().execute(sql1);
    	
        String sql = "insert into t_action_type (id,name ) values (?,?)";     // 查询数据的sql语句  
        for(EPlayerActions ea : EPlayerActions.values()){
            tc.execute(sql,ea.get(), ea.toString() );
        }
        
        conn.close();   
	 }
}
