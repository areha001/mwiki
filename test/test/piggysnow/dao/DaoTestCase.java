package test.piggysnow.dao;

import org.springframework.test.AbstractTransactionalDataSourceSpringContextTests;

/**
 * Dao测试基类
 * 
 */
public abstract class DaoTestCase extends
		AbstractTransactionalDataSourceSpringContextTests {
	@Override
	protected String[] getConfigLocations() {
		return new String[] { "classpath:/applicationContext*.xml","classpath:/com/gzy/zjer/*/config/applicationContext-*.xml" };
		// return new String[]{"classpath*:applicationContext*.xml"};
	}
}
