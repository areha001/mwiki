package test.com.union.testbase;


import junit.framework.TestCase;

public class BaseTestCase extends TestCase{
	/*
	protected EasyCaller ec = EasyCaller.getInstance(ConnectorContainer.GAME);
	protected <T> T call(Class<T> clz){
		return (T)ec.createRemote(clz);
	}
	
	protected <T> T call(Class<T> clz, long playerId){
		return (T)ec.createCrossRemote(clz, playerId);
		
	}
	public void setUp()throws Exception{
		doConnect();
		
		Robot r = new Robot("22");
		String username = r.username;
	}

	public void tearDown() throws Exception{

	}
	static Config c;
	private static void initConfig(){
		c = new Config();
		c.setIp("192.168.50.159");
		c.setListenPort(9851);
//		c.setIp("192.168.50.161");
//		c.setListenPort(8651);
		c.setIoHandlerClass(DefaultIoHandler.class);
		c.setSubName("GAME_1");
		c.setClusterName(ConnectorContainer.GAME);
		

		SimpleMessageFactory.getInstance().init();
		DefaultMessageQueueManager mqm = DefaultMessageQueueManager.getInstance();
		mqm.start();
		Io.setQueueManager(mqm);
	}

	public static void doConnect() {
		
		initConfig();
		
		System.out.println("***********************登录服连接************************");
		try{
			c.doConn();
		}catch(Exception e){
			e.printStackTrace();
			System.out.println("***********************参数错误************************");
			System.exit(1);
		}
		
		System.out.println("***********************校验账户开始************************");
	}
	
	
	*/
}
