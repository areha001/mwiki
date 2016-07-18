package com.piggysnow.common.utils;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Modifier;

/**
* 获取一个给定对象的副本。
* 该对象由session管理，返回其副本使之脱离session。
*/
public class CopyUtil {
    /**
     * 获取一个给定对象的副本。
     *
     * @param model  session管理的对象
     * @return 对象的副本（不受session管理）
     */
    public static Object getDuplicate(Object model) {
        Object duplication = null;
        try {
            duplication = model.getClass().newInstance();
            Class type = model.getClass();
            Field[] fields = type.getDeclaredFields();
            for (Field f : fields) {
                if ( ((f.getModifiers() & Modifier.FINAL) != 0) ||
                		((f.getModifiers() & Modifier.STATIC) != 0) )
                	// 若该字段的修饰符为static、final的任意组合则循环下一次
                    continue;
                setValueToField(model, f.getName(), duplication, type);
            }
            return duplication;
        } catch (InstantiationException ex) {
            ex.printStackTrace();
        } catch (IllegalAccessException ex) {
            ex.printStackTrace();
        } catch (SecurityException ex) {
            ex.printStackTrace();
        } catch (NoSuchMethodException ex) {
            ex.printStackTrace();
        } catch (IllegalArgumentException ex) {
            ex.printStackTrace();
        } catch (InvocationTargetException ex) {
            ex.printStackTrace();
        } catch (NoSuchFieldException ex) {
            ex.printStackTrace();
        }
        return null;
    }
    
    public static Object copyWithoutId(Object model) {
    	Object duplication = null;
        try {
            duplication = model.getClass().newInstance();
            Class type = model.getClass();
            Field[] fields = type.getDeclaredFields();
            for (Field f : fields) {
                if ( ((f.getModifiers() & Modifier.FINAL) != 0) ||
                		((f.getModifiers() & Modifier.STATIC) != 0) ||
                			f.getName().equals("id"))
                	// 若该字段的修饰符为static、final的任意组合则循环下一次
                    continue;
                setValueToField(model, f.getName(), duplication, type);
            }
            return duplication;
        } catch (InstantiationException ex) {
            ex.printStackTrace();
        } catch (IllegalAccessException ex) {
            ex.printStackTrace();
        } catch (SecurityException ex) {
            ex.printStackTrace();
        } catch (NoSuchMethodException ex) {
            ex.printStackTrace();
        } catch (IllegalArgumentException ex) {
            ex.printStackTrace();
        } catch (InvocationTargetException ex) {
            ex.printStackTrace();
        } catch (NoSuchFieldException ex) {
            ex.printStackTrace();
        }
        return null;
    }
    /**
     * 为给定字段赋值
     * @param model session管理的对象
     * @param fieldName 字段名
     * @param templete 要返回的副本
     * @param type 对象类型
     * @throws IllegalAccessException
     * @throws InvocationTargetException
     * @throws NoSuchMethodException
     * @throws IllegalArgumentException
     * @throws SecurityException
     * @throws NoSuchFieldException
     */
    @SuppressWarnings("unchecked")
    private static void setValueToField(Object model, String fieldName,
            Object templete, Class type) throws IllegalAccessException,
            InvocationTargetException, NoSuchMethodException,
            IllegalArgumentException, SecurityException, NoSuchFieldException {
        type.getMethod(setterName(fieldName),
                new Class[] { type.getDeclaredField(fieldName).getType() })
                .invoke(
                        templete,
                        type.getMethod(getterName(fieldName), null).invoke(
                                model, null));
    }

    /**
     * 创建字段的get方法名
     *
     * @param field
     * @return
     */
    private static String getterName(String field) {
        return "get" + field.substring(0, 1).toUpperCase()
                + field.substring(1, field.length());
    }

    /**
     * 创建字段的set方法名
     *
     * @param field
     * @return
     */
    private static String setterName(String field) {
        return "set" + field.substring(0, 1).toUpperCase()
                + field.substring(1, field.length());
    }
}
