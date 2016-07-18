package test.piggysnow;

import java.sql.Connection;

import test.piggysnow.core.TestCore;


public class TestAddActionType extends TestCore{
	
	 public  void testAddAction() throws Exception{

		 TestAddActionType tc = new TestAddActionType();
		 Connection conn = tc.getConnection(); //同样先要获取连接，即连接到数据库 
    	String sql1 = "delete from t_dict where type= 'actionType'";
    	conn.createStatement().execute(sql1);
    	
        String sql = "insert into t_dict (name, type, sub_id ) values (?,?,?)";     // 查询数据的sql语句  
        for(EPlayerActions ea : EPlayerActions.values()){
            tc.execute(sql, ea.toString(), "actionType" ,ea.get());
        }
        
        conn.close();   
	 }
}
