package com.piggysnow.common.utils;

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;

/**
 * Generics的util类,通过反射获得Class声明的范型Class.
 * 
 * @author <a href="mailto:qhuang@chinaschool.net">huangqiao</a>
 */
public class GenericsUtils {
	/**
	 * get the first generic declaration on a class.
	 * 
	 * @param clazz
	 *            The class to introspect
	 * @return the first generic declaration, or <code>Object.class</code> if
	 *         cannot be determined
	 */
	public static Class getGenericClass(Class clazz) {
		Type genType = clazz.getGenericSuperclass();

		if (!(genType instanceof ParameterizedType)) {
			return Object.class;
		}

		Type[] params = ((ParameterizedType) genType).getActualTypeArguments();

		return (Class) params[0];
	}

	/**
	 * 判断对象是否为指定类的实例
	 * 
	 * @param obj
	 * @param str
	 * @return
	 */
	public static boolean isInstance(Object obj, String str) {
		try {
			
			Class clazz = Class.forName(str);
			boolean result = clazz.isInstance(obj);
			return result;
			
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			return false;
		}
	}

	public static boolean isInstance2(Object obj, String str) {
		String className = obj.toString();
		className = className.substring(0, className.indexOf('@'));
		boolean result = str.equals(className);
		return result;
	}

}
