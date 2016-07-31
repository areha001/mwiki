package com.piggysnow.boss.utils;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

/**
 * Service静态仓库
 * */
public class JobContainer extends MultiActionController {

	public static interface Job { public Runnable getRunnable();}
	static Thread jobThread;
	static List<Job> list = new ArrayList<Job>();
	
	public static void init(){
		/*
		jobThread = new Thread(){
			public void run(){
				try{
					while(true){
						Thread.sleep(15*1000L);
						for(Job j: list){
							new Thread(j.getRunnable()).start();
						}
					}
				}
				catch(Exception e){
					e.printStackTrace();
				}
			}
		};
		jobThread.start();*/
	}
	public static void addJob(Job j){
		list.add(j);
	}
}
