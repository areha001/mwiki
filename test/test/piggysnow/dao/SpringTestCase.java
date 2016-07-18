package test.piggysnow.dao;

import java.io.File;
import java.lang.reflect.Method;
import java.net.URL;
import java.net.URLClassLoader;

/**
 * Spring环境下的测试基类
 *
 */

public abstract class SpringTestCase{
	
	static {
		try{
		    File programRootDir = new File("./test/test/piggysnow/dao");
		    URLClassLoader classLoader = (URLClassLoader) ClassLoader.getSystemClassLoader();
		    Method add = URLClassLoader.class.getDeclaredMethod("addURL", new Class[]{URL.class});
		    add.setAccessible(true);
		    add.invoke(classLoader, programRootDir.toURI().toURL());

		}catch(Exception e){
			e.printStackTrace();
		}
	}
}
