package test.piggysnow.service;

import javax.annotation.Resource;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import test.piggysnow.dao.SpringTestCase;

import com.piggysnow.boss.core.domain.Dict;
import com.piggysnow.boss.core.services.DictService;
/**
 * 
 * @author Xunuo
 * 讨论区测试用例
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"file:web/WEB-INF/*servlet.xml","classpath*:/com/piggysnow/boss/*/config/*-servlet.xml",
		"classpath*:/applicationContext-data.xml","classpath*:/applicationContext-service.xml",
		"classpath*:/applicationContext-tx.xml","classpath*:/com/piggysnow/boss/*/config/applicationContext-*.xml"})
public class DictServiceTest extends SpringTestCase {
	@Autowired
	private DictService dictService;
	/**
	 * 测试基本CURD
	 * */
	@Test
	public void testCRUD() throws Exception {
		Dict d = dictService.get(3440l);
		System.out.println(d);
	}


}
