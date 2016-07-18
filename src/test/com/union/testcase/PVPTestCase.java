//package test.com.union.testcase;
//
//import java.util.List;
//
//import test.com.union.testbase.BaseTestCase;
//
//import com.wds.game.data.OppPlayer;
//import com.wds.game.data.PvpAevent;
//import com.wds.game.data.PvpAievent;
//import com.wds.game.data.PvpBevent;
//import com.wds.game.data.PvpInfo;
//import com.wds.game.data.PvpOppbuff;
//import com.wds.game.data.extra.PvpConfig;
//import com.wds.game.data.extra.pvp.OppFighter;
//import com.wds.game.data.extra.pvp.PVPBattleAward;
//import com.wds.gameserver.handler.PVPHandler;
//import com.wds.kernel.message.entity.BaseRes;
//import com.wds.kernel.util.MD5Util;
//import com.wds.share.annotation.Comment;
//
//public class PVPTestCase extends BaseTestCase {
//	public void testG() throws Exception{
//		BaseRes res = call(PVPHandler.class, 1000000001852L).showPlayer();
//		System.out.println(res.parse(Integer.class));
//		System.out.println(res.parseList(OppPlayer.class));
//		System.out.println(res.parse(Integer.class));
//		
//	}	
//	
//	public void testE() throws Exception{
//		BaseRes res = call(PVPHandler.class, 1000000001852L).lockFighter(1000000010725L, 8809, 1);
//		OppFighter of = res.parse(OppFighter.class);
//		System.out.println(of);
//	}	
//	
//	
//	
//	
//	public void testX() throws Exception{
//		BaseRes res = call(PVPHandler.class, 1000000001852L).start(1000000010725L,0,0,"");
//
//		System.out.println(res.parse(Long.class));
//		
//	}	
//	
//	public void testF() throws Exception{
//		int second = 30;
//		boolean win = true;
//		int star = 1;
//		int score = 1000;
//		String s = String.valueOf(569L) + second + win +star +score;
//
////		String serverCheck = MD5Util.getMD5(s);
////		BaseRes res = call(PVPHandler.class, 1000000001852L).finish(569L, second, win, star, score, serverCheck);
////		PVPBattleAward award = res.parse(PVPBattleAward.class);
////		System.out.println(award);
//	}	
//
//	
//	public void testY() throws Exception{
//		BaseRes res = call(PVPHandler.class, 1000000001843L).queryPvpConfig();
//		PvpConfig pc = res.parse(PvpConfig.class);
//		List<PvpAevent> listA = pc.aEventConfig;
//		List<PvpBevent> listB = pc.bEventConfig;
//		List<PvpAievent> listAI = pc.aiEventConfig;
//		List<PvpOppbuff> listBuff = pc.oppBuffConfig;
//		
//		System.out.println(listA);
//		System.out.println("********************************");
//		System.out.println(listB);
//		System.out.println("********************************");
//		System.out.println(listAI);
//		System.out.println("********************************");
//		System.out.println(listBuff);
//		System.out.println("********************************");
//		
//	}	
//	
//	
//
//}
