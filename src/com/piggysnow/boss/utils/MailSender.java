package com.piggysnow.boss.utils;

import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import com.piggysnow.boss.core.domain.GMail;
import com.piggysnow.boss.core.services.GMailService;
import com.piggysnow.boss.core.services.ServerService;
import com.piggysnow.boss.core.web.admin.controller.StaticServiceController;
import com.piggysnow.boss.utils.JobContainer.Job;
import com.piggysnow.boss.core.domain.Server;


public class MailSender implements Job{

	@Override
	public Runnable getRunnable() {
		// TODO Auto-generated method stub
		return new RealSender();
	}
	
	public static ExecutorService es = Executors.newFixedThreadPool(20);
	private class RealSender implements Runnable {
		public void run(){
			try{
//				ServerService serverService = StaticServiceController.getServerService();
//				GMailService gMailService = StaticServiceController.getgmailService();
//				List<GMail> list = gMailService.findList(" from GMail where status = ?",  GMail.STATUS_已审核);
//				for(final GMail m: list){
//					boolean result  = true;
//					String serverIds = m.getServerIds();
//					String[] servs = serverIds.split(",");
//					try{
//						for(String servId : servs){
//							Server server = serverService.find(Long.valueOf(servId));
//
//							StringBuilder sb = new StringBuilder();
//
//						}
//					}catch(Exception e){
//						result = false;
//						m.setStatus(GMail.STATUS_发送失败);
//						m.setErrMsg(e.toString());
//						e.printStackTrace();
//					}
//					
//					if(result == true){
//						m.setStatus(GMail.STATUS_已发送);
//					}
//					gMailService.save(m);
//				}
			}
			catch(Exception e){
				e.printStackTrace();
			}
		}
	}
}

