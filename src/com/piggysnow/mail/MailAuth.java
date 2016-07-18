package com.piggysnow.mail;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.NoSuchProviderException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeUtility;

/**   
* 发送邮件需要使用的基本信息 
*/    
public class MailAuth {    
	public static void main(String[] args) throws Exception{   
        //这个类主要是设置邮件   
//		sendCodeMail("snow@wdsgame.com", "123456");
		sendMain("eee","fff","snow@wdsgame.com");
   }  
    static int _PORT = 465; // smtp端口 
//  static String _SERVER = "smtp.exmail.qq.com"; // smtp服务器地址 
    static String _SERVER = "14.17.57.217"; 
//  static String _FROM = "huangjing@yangchehome.com"; // 发送者 
    static String _FROM = "snow@wdsgame.com"; // 发送者 
    static String _USER = "snow@wdsgame.com"; // 发送者地址 
    static String _PASSWORD = "wds123"; // 密码 
      
    static String _PC_IP = "127.0.0.1"; 

    public static boolean sendMain(String subject, String content, String to) { 
        try { 
            Properties props = new Properties(); 
            props.put("mail.smtp.host", _SERVER); 
            props.put("mail.smtp.port", _PORT); 
            props.put("mail.smtp.auth", "true"); 
            props.put("mail.smtp.localhost", _PC_IP); 
            Transport transport = null; 
            Session session = Session.getDefaultInstance(props, null); 
            transport = session.getTransport("smtp"); 
            transport.connect(_SERVER, _USER, _PASSWORD); 
            MimeMessage msg = new MimeMessage(session); 
            msg.setSentDate(new Date()); 
//          InternetAddress fromAddress = new InternetAddress( 
//                  Mail._USER, MimeUtility.encodeText(new String( 
//                          Mail._FROM.getBytes("ISO-8859-1"), 
//                          "UTF-8"), "gb2312", "B")); 
            InternetAddress fromAddress = new InternetAddress( 
                    _USER, MimeUtility.encodeText(_FROM, "gb2312", "B")); 
            //编码方式有两种："B"代表Base64、"Q"代表QP（quoted-printable）方式。 
              
            msg.setFrom(fromAddress); 
            InternetAddress toAddress = new InternetAddress(to); 
            msg.setRecipient(Message.RecipientType.TO, toAddress); 
            msg.setSubject(subject, "UTF-8"); 
            msg.setText(content, "UTF-8"); 
            msg.saveChanges(); 
  
            transport.sendMessage(msg, msg.getAllRecipients()); 
            transport.close(); 
        } catch (NoSuchProviderException e) { 
            e.printStackTrace(); 
            return false; 
        } catch (Exception e) { 
            e.printStackTrace(); 
            return false; 
        } 
        return true; 
    } 

			
	public static void sendCodeMail(String toMailAddress, String code){

	     SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	     String time = sdf.format(new Date());
	     String content = "欢迎登录GM后台，您于" + time+  "请求登录GM后台，本次安全码为：" + code;
		sendMain("GM后台安全码：" + code, content, toMailAddress);
		/*
	     MailSenderInfo mailInfo = new MailSenderInfo();    
	     System.out.println("eeffff");
	     //mailInfo.setMailServerHost("113.108.16.119");   
	     mailInfo.setMailServerHost("113.108.16.44");  

//	     Properties props = System.getProperties();
//	     props.put("mail.smtp.localhost", "localhost");
	     
	     mailInfo.setMailServerPort("25");    
	     mailInfo.setValidate(true);    
//	     mailInfo.setUserName("snow@wdsgame.com");    
//	     mailInfo.setPassword("wds123");//您的邮箱密码    
//	     mailInfo.setFromAddress("snow@wdsgame.com");    

	     mailInfo.setUserName("373672785@qq.com");    
	     mailInfo.setPassword("xunuoareha001");//您的邮箱密码    
	     mailInfo.setFromAddress("373672785@qq.com");    
	     
	     mailInfo.setToAddress(toMailAddress);    
	     mailInfo.setSubject("GM后台安全码：" + code);
	     SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	     String time = sdf.format(new Date());
	     mailInfo.setContent("欢迎登录GM后台，您于" + time+  "请求登录GM后台，本次安全码为：" + code);    
	        //这个类主要来发送邮件   
	     SimpleMailSender sms = new SimpleMailSender();   
	         sms.sendTextMail(mailInfo);//发送文体格式    
//	         sms.sendHtmlMail(mailInfo);//发送html格式   */
	}
}   