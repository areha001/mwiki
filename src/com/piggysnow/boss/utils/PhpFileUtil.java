package com.piggysnow.boss.utils;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.text.SimpleDateFormat;
import java.util.List;

import com.piggysnow.boss.core.domain.Activity;
import com.piggysnow.boss.core.web.WebUtils;


/**创建日志*/
public class PhpFileUtil{

	public static void main(String[] arg){
		StringBuilder sb = new StringBuilder();
		append(sb, "<?php");
		append(sb, "$Activity_Release = array(");
		append(sb, "3=>array('id'=>'3','type'=>'1','name'=>'充值活动','star_time'=>'2015/01/14 01:00:00','end_time'=>'2015/01/18 23:59:02','dec_1'=>'2015年1月16日零点时-2015年1月18日23时59分','dec_2'=>'活动期间，充值金额达到条件后，即可在活动页面领取奖励，活动只计算RMB充值，只在活动时间内有效'),");
		append(sb, "7=>array('id'=>'7','type'=>'3','name'=>'每月巨星','star_time'=>'2015/01/01 00:00:00','end_time'=>'2015/1/31 23:59:59','dec_1'=>'2003年，贾马尔·马什本被FOX体育网著名专栏作家麦克·卡恩评选为自己心目中“全联盟十大小前锋”之首。','dec_2'=>'球员升级100级即可突破X级球员，神一般的超越！','dec_3'=>'10%%4倍得分','dec_4'=>'15%%必获得助攻，15%%对方必失误，15%%防守SF、SG、PG降低对方命中率100%%'),");
		append(sb, "2=>array('id'=>'2','type'=>'4','name'=>'火花小店','star_time'=>'2014/09/03 00:00:00','end_time'=>'2020/09/20 00:00:00','dec_1'=>'本店可购买S级球员碎片，技能卡，经验卡'),");
		append(sb, "4=>array('id'=>'4','type'=>'5','name'=>'VIP福利','star_time'=>'2014/09/03 00:00:00','end_time'=>'2020/09/20 00:00:00','dec_1'=>''),");
		append(sb, "5=>array('id'=>'5','type'=>'6','name'=>'VIP礼包','star_time'=>'2014/09/03 00:00:00','end_time'=>'2020/09/20 00:00:00'),");
		append(sb, "1=>array('id'=>'1','type'=>'7','name'=>'詹皇精品','star_time'=>'2014/09/03 00:00:00','end_time'=>'2020/09/20 00:00:00','dec_1'=>'本店可购买X级球员碎片，高级技能卡，高级经验卡，VI8永久开启'),");
		append(sb, "8=>array('id'=>'8','type'=>'8','name'=>'天天小礼','star_time'=>'2015/01/14 01:00:00','end_time'=>'2015/01/18 23:59:02','dec_1'=>'2015年1月16日零点时-2015年1月18日23时59分','dec_2'=>'活动期间保持每日充值60美金，即可获得对应天数奖励！充值天数越多，奖励越多！（不计算赠送的美金）'),");
		append(sb, "9=>array('id'=>'9','type'=>'9','name'=>'日日大礼','star_time'=>'2015/01/14 01:00:00','end_time'=>'2015/01/18 23:59:02','dec_1'=>'2015年1月16日零点时-2015年1月18日23时59分','dec_2'=>'活动期间保持每日充值300美金，即可获得对应天数奖励！充值天数越多，奖励越多！（不计算赠送的美金）'),");
		append(sb, "10=>array('id'=>'10','type'=>'10','name'=>'土豪礼包','star_time'=>'2015/01/14 01:00:00','end_time'=>'2015/01/18 23:59:02','dec_1'=>'2015年1月16日零点时-2015年1月18日23时59分','dec_2'=>'活动期间玩家单日充值达到对应额度即可领取对应奖励，每日限领一次，每日数据在零点都会刷新，隔天重新累计','dec_3'=>'','dec_4'=>''),");
		append(sb, "11=>array('id'=>'11','type'=>'11','name'=>'消费有礼','star_time'=>'2015/01/13 01:00:00','end_time'=>'2015/08/18 23:59:02','dec_1'=>'2015年1月13日零点时-2017年8月18日23时59分','dec_2'=>'活动期间玩家单日消费达到对应额度即可领取对应奖励，每日限领一次，每日数据在零点都会刷新，隔天重新累计'),");
		append(sb, "12=>array('id'=>'12','type'=>'12','name'=>'全民有礼','star_time'=>'2015/01/14 01:00:00','end_time'=>'2015/08/18 23:59:02','dec_1'=>'2015年1月16日零点时-2018年8月18日23时59分','dec_2'=>'活动期间在剧情赛事中比赛胜利，有概率获得小咔咔照片，收集对应数量即可兑换对应奖励，爽的不得了！'),");
		append(sb, ");"); 	 
		append(sb, " ?>"); 	 
		
		System.out.println(sb.toString());
	}
	
	
	public static File activityReleaseFile(List<Activity> list) throws Exception{
		String content = createActivityRelease(list);
		File f = saveFile("Activity_Release.php", content);
		return f;
	}
	
	public static File saveFile(String fileName, String content) throws Exception{
		String path = WebUtils.getWebRootPath()+"/files";
		File folder = new File(path);
		if(!folder.exists()){
			folder.mkdir();
		}
		File f = new File(path+"/" + fileName);
		System.out.println(f.getAbsolutePath());
		FileOutputStream fos = new FileOutputStream(f);
		BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(fos, "utf-8"));
		bw.write(content);
		bw.close();
		return f;
	}
	
	private static String createActivityRelease(List<Activity> list){

		SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
		StringBuilder sb = new StringBuilder();

		append(sb, "<?php");
		append(sb, "$Activity_Release = array(");
		
		for(Activity a: list){
			StringBuilder ssb = new StringBuilder();
			if(a.getActive()==0){
				ssb.append(a.getPos() + "=>array('id'=>'" + a.getPos()+"','type'=>'");
				ssb.append(a.getActivityId() + "','name'=>'");
				String start = sdf.format(a.getStartTime());
				String end = sdf.format(a.getEndTime());
				ssb.append(a.getName() + "','star_time'=>'");
				ssb.append(start + "','end_time'=>'");
				ssb.append(end + "'");
				if(a.getDec1()!=null && !a.getDec1().isEmpty()){
					ssb.append(",'dec_1'=>'" + a.getDec1().replaceAll("%", "%%") + "'");
				}
				if(a.getDec2()!=null && !a.getDec2().isEmpty()){
					ssb.append(",'dec_2'=>'" + a.getDec2().replaceAll("%", "%%") + "'");
				}
				if(a.getDec3()!=null && !a.getDec3().isEmpty()){
					ssb.append(",'dec_3'=>'" + a.getDec3().replaceAll("%", "%%") + "'");
				}
				if(a.getDec4()!=null && !a.getDec4().isEmpty()){
					ssb.append(",'dec_4'=>'" + a.getDec4().replaceAll("%", "%%") + "'");
				}
				ssb.append("),");
				append(sb, ssb.toString());
			}
		}
		append(sb, ");"); 	 
		append(sb, " ?>"); 	 
		String str = sb.toString();
		System.out.println(str);
		return str;
	}
/*
	<?php 
			 $Activity_Release = array(
			3=>array('id'=>'3','type'=>'1','name'=>'充值活动','star_time'=>'2015/01/14 01:00:00','end_time'=>'2015/01/18 23:59:02','dec_1'=>'2015年1月16日零点时-2015年1月18日23时59分','dec_2'=>'活动期间，充值金额达到条件后，即可在活动页面领取奖励，活动只计算RMB充值，只在活动时间内有效'),
			append(sb, "6=>array('id'=>'6','type'=>'2','name'=>'限时巨星','star_time'=>'2015/01/09 01:00:00','end_time'=>'2015/01/11 23:59:00','dec_1'=>'限时巨星活动已结束，请期待下一期','dec_2'=>'活动期间指定球星概率增加，在市场获得巨星S“甜瓜”即可获得对应奖励','dec_3'=>'{{17585,9165,1695589,890344}}'),
			append(sb, "7=>array('id'=>'7','type'=>'3','name'=>'每月巨星','star_time'=>'2015/01/01 00:00:00','end_time'=>'2015/1/31 23:59:59','dec_1'=>'2003年，贾马尔·马什本被FOX体育网著名专栏作家麦克·卡恩评选为自己心目中“全联盟十大小前锋”之首。','dec_2'=>'球员升级100级即可突破X级球员，神一般的超越！','dec_3'=>'10%%4倍得分','dec_4'=>'15%%必获得助攻，15%%对方必失误，15%%防守SF、SG、PG降低对方命中率100%%'),");
			append(sb, "2=>array('id'=>'2','type'=>'4','name'=>'火花小店','star_time'=>'2014/09/03 00:00:00','end_time'=>'2020/09/20 00:00:00','dec_1'=>'本店可购买S级球员碎片，技能卡，经验卡'),");
			append(sb, "4=>array('id'=>'4','type'=>'5','name'=>'VIP福利','star_time'=>'2014/09/03 00:00:00','end_time'=>'2020/09/20 00:00:00','dec_1'=>''),");
			append(sb, "5=>array('id'=>'5','type'=>'6','name'=>'VIP礼包','star_time'=>'2014/09/03 00:00:00','end_time'=>'2020/09/20 00:00:00'),");
			append(sb, "1=>array('id'=>'1','type'=>'7','name'=>'詹皇精品','star_time'=>'2014/09/03 00:00:00','end_time'=>'2020/09/20 00:00:00','dec_1'=>'本店可购买X级球员碎片，高级技能卡，高级经验卡，VI8永久开启'),");
			append(sb, "8=>array('id'=>'8','type'=>'8','name'=>'天天小礼','star_time'=>'2015/01/14 01:00:00','end_time'=>'2015/01/18 23:59:02','dec_1'=>'2015年1月16日零点时-2015年1月18日23时59分','dec_2'=>'活动期间保持每日充值60美金，即可获得对应天数奖励！充值天数越多，奖励越多！（不计算赠送的美金）'),");
			append(sb, "9=>array('id'=>'9','type'=>'9','name'=>'日日大礼','star_time'=>'2015/01/14 01:00:00','end_time'=>'2015/01/18 23:59:02','dec_1'=>'2015年1月16日零点时-2015年1月18日23时59分','dec_2'=>'活动期间保持每日充值300美金，即可获得对应天数奖励！充值天数越多，奖励越多！（不计算赠送的美金）'),");
			append(sb, "10=>array('id'=>'10','type'=>'10','name'=>'土豪礼包','star_time'=>'2015/01/14 01:00:00','end_time'=>'2015/01/18 23:59:02','dec_1'=>'2015年1月16日零点时-2015年1月18日23时59分','dec_2'=>'活动期间玩家单日充值达到对应额度即可领取对应奖励，每日限领一次，每日数据在零点都会刷新，隔天重新累计','dec_3'=>'','dec_4'=>''),");
			append(sb, "11=>array('id'=>'11','type'=>'11','name'=>'消费有礼','star_time'=>'2015/01/13 01:00:00','end_time'=>'2015/08/18 23:59:02','dec_1'=>'2015年1月13日零点时-2017年8月18日23时59分','dec_2'=>'活动期间玩家单日消费达到对应额度即可领取对应奖励，每日限领一次，每日数据在零点都会刷新，隔天重新累计'),");
			append(sb, "12=>array('id'=>'12','type'=>'12','name'=>'全民有礼','star_time'=>'2015/01/14 01:00:00','end_time'=>'2015/08/18 23:59:02','dec_1'=>'2015年1月16日零点时-2018年8月18日23时59分','dec_2'=>'活动期间在剧情赛事中比赛胜利，有概率获得小咔咔照片，收集对应数量即可兑换对应奖励，爽的不得了！'),");
			 ); 
			 ?>*/
	
	public static void append(StringBuilder sb, String d){
		sb.append(d);
		sb.append("\n");
	} 
}
