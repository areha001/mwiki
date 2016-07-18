package test.piggysnow.dao;

import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.mock.web.MockHttpSession;

/**
 * web环境的测试基类
 * 
 * 
 */
public class WebTestCase extends SpringTestCase {
	protected MockHttpServletRequest request = new MockHttpServletRequest();
	protected MockHttpServletResponse response = new MockHttpServletResponse();
	protected MockHttpSession session = new MockHttpSession();
}
