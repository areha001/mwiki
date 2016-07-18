package com.piggysnow.boss.core.web;

import java.io.File;
import java.io.FileWriter;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.SAXReader;
import org.dom4j.io.XMLWriter;
import org.springframework.format.datetime.DateFormatter;

/**
 * xml和javabean之间转换的工具类
 * @author HuangYinglu
 *
 * @param <T>
 */
public class BeanXmlUtils<T> {
 /**
  * 
  * @param obj     泛型对象  
  * @param entityPropertys  泛型对象的List集合 
  * @param Encode    XML自定义编码类型(推荐使用GBK)  
  * @param XMLPathAndName  XML文件的路径及文件名  
  */
 public void writeXmlDocument(T obj, List<T> entityPropertys, String Encode,   
            String XMLPathAndName) {   
        long lasting = System.currentTimeMillis();//效率检测   
        try {   
            XMLWriter writer = null;// 声明写XML的对象    
            OutputFormat format = OutputFormat.createPrettyPrint();   
            format.setEncoding(Encode);// 设置XML文件的编码格式   
  
            String filePath = XMLPathAndName;//获得文件地址   
            File file = new File(filePath);//获得文件     
  
            if (file.exists()) {   
                file.delete();   
  
            }   
            // 新建student.xml文件并新增内容   
            Document document = DocumentHelper.createDocument();   
            String rootname = obj.getClass().getSimpleName();//获得类名   
            Element root = document.addElement(rootname + "s");//添加根节点   
            Field[] properties = obj.getClass().getDeclaredFields();//获得实体类的所有属性   
            
            for (T t : entityPropertys) {                                //递归实体   
                Element secondRoot = root.addElement(rootname);            //二级节点   
                
                for (int i = 0; i < properties.length; i++) {                      
                    //反射get方法       
                    Method meth = t.getClass().getMethod(                      
                            "get"  
                                    + properties[i].getName().substring(0, 1)   
                                            .toUpperCase()   
                                    + properties[i].getName().substring(1));   
                    //为二级节点添加属性，属性值为对应属性的值   
                    secondRoot.addElement(properties[i].getName()).setText(   
                            meth.invoke(t).toString());   
  
                }   
            }   
            //生成XML文件   
            writer = new XMLWriter(new FileWriter(file), format);   
            writer.write(document);   
            writer.close();   
            long lasting2 = System.currentTimeMillis();   
            System.out.println("写入XML文件结束,用时"+(lasting2 - lasting)+"ms");   
        } catch (Exception e) {   
            System.out.println("XML文件写入失败");   
        }   
  
    }  
 
 /**
  * 
  * @param XMLPathAndName   XMLPathAndName XML文件的路径和地址  
  * @param t        泛型对象
  * @return
  */
  public List<T> readXML(String tr1,String tr2 ,String XMLPathAndName, T t) {   
         long lasting = System.currentTimeMillis();//效率检测   
         List<T> list = new ArrayList<T>();//创建list集合   
         try {   
           //  File f = new File(XMLPathAndName);//读取文件   
           //  SAXReader reader = new SAXReader();   
          //   Document doc = reader.read(f);//dom4j读取   
           /*  
             Document doc = null;
       // 下面的是通过解析xml字符串的
       doc = DocumentHelper.parseText(XMLPathAndName); // 将字符串转为XML
*/             File f = new File(XMLPathAndName);//读取文件   
 SAXReader reader = new SAXReader();   
  Document doc = reader.read(f);//dom4j读取   
             Element root = doc.getRootElement();//获得根节点   
             Element dataEle = root.element("Data"); // 获取根节点下的子节点Data
       Element yhjzpbEle = dataEle.element(tr1); // 获取Data节点下的子节点yhjzpb
             Element foo;//二级节点   
             Field[] properties = t.getClass().getDeclaredFields();//获得实例的属性   
             //实例的get方法   
             Method getmeth;   
             //实例的set方法   
             Method setmeth;   
                System.out.println(t.getClass().getSimpleName());
               // String text = yhjzpbEle.getText();
                //System.err.println(text);
             for (Iterator i = yhjzpbEle.elementIterator(tr2); i.hasNext();) {//遍历t.getClass().getSimpleName()节点   
                 foo = (Element) i.next();//下一个二级节点   
                    
                t=(T)t.getClass().newInstance();//获得对象的新的实例   
   
                for (int j = 0; j < properties.length; j++) {//遍历所有孙子节点   
                        
   
                     //实例的set方法   
                       setmeth = t.getClass().getMethod(   
                             "set"  
                                     + properties[j].getName().substring(0, 1)   
                                             .toUpperCase()   
                                     + properties[j].getName().substring(1),properties[j].getType());   
                   //properties[j].getType()为set方法入口参数的参数类型(Class类型)  
                       System.err.println(properties[j].getType());
                       Object setStr=foo.elementText(properties[j].getName());
                       if(properties[j].getType()==java.util.Date.class){
                        setStr = new SimpleDateFormat("yyyy-MM-dd").format(foo.elementText(properties[j].getName()));
                       }
                     setmeth.invoke(t, setStr);//将对应节点的值存入   
                 }   
                 list.add(t);   
             }   
         } catch (Exception e) {   
             e.printStackTrace();   
         }   
         long lasting2 = System.currentTimeMillis();   
         System.out.println("读取XML文件结束,用时"+(lasting2 - lasting)+"ms");   
         return list;   
     }  
 
 
}