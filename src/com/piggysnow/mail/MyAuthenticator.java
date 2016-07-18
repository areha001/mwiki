package com.piggysnow.mail;

import javax.mail.Authenticator;
import javax.mail.PasswordAuthentication;
     
public class MyAuthenticator extends Authenticator{   
    String userName="nova_xu@staff.easou.com";   
    String password="easou8888";   
        
    public MyAuthenticator(){   
    }   
    public MyAuthenticator(String username, String password) {    
        this.userName = username;    
        this.password = password;    
    }    
    protected PasswordAuthentication getPasswordAuthentication(){   
        return new PasswordAuthentication(userName, password);   
    }   
}   