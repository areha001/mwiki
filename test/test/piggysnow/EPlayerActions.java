package test.piggysnow;


import java.util.HashMap;
import java.util.Map;
import java.util.Random;

/**
 * 玩家行为
 * @Description:TODO
 * @author:ligb2006
 * @email liguobing2008@126.com
 * @time:2014年7月14日 上午11:01:09
 */
public enum EPlayerActions {
	
	TEST_TOOL(0, "测试工具"),
	REGIST(1, "注册"),
	LOGIN(2, "登陆"),
	ENTER_GAME(3, "进入游戏"),
	J_角色进阶(5, "角色进阶"),
	T_通关星星宝箱(7, "通关星星宝箱"),
	K_开始闯关(8,"闯关"),
	T_通关(9,"通关"),
	K_开礼包(10, "开礼包"),
	SALE_SOLDIER(11, "出售卡牌"),
	BUY_SOLDIER(12, "购买卡牌"),
	GUANKA_FINISH_RANDOM_ITEMS(13, "完成关卡三选一抽奖"),
	BUY_PAI_WEI_SAI(14,"排位赛购买"),
	Y邮件提取(15,"邮件提取"),
	MONEY_CARD(18,"金币抽卡"),
	GOLD_CARD(19,"钻石抽卡"),
	UNLIMITED(20,"无限挑战"),
	EQUIP_STRENGTH(50,"装备强化"),
	S使用经验瓶(51, "使用经验瓶"),
	Q契约书技能学习(54,"契约书技能学习"),
	Q契约书升级(54,"契约书升级"),
	G改名(55,"改名"),
	G改头像(56,"改头像"),
	T体力值自动恢复(57, "体力值自动恢复"),
	USE_GOODS(62, "使用物品"),
	DROP_GOODS(63, "丢弃物品"),
	
	LOG_OUT(68, "退出游戏"),
	REMOVE_GOODS_FROM_BAG(72, "删除物品"),
	UN_LOCK_BAG(73, "解锁背包"),
	SALE_GOODS(74, "出售物品"),
	SHOP_BUY(76,"商城购买"),

	G_购买金币(77,"购买金币"),
	G_购买体力(78,"购买体力"),
	VITALITY_GET(79,"活跃度领奖"),
	ATTAINMENT(80,"成就奖励"),
	CD_KEY(81,"CDKey兑换"),
	EXP_INHER(96, "经验传承"),
	R任务奖励(97,"任务奖励"),
	JIN_JIE_EQUIP(98, "装备进阶"),
	SIGN_REWARD(100,"签到奖励"),
	VIP_SIGN_REWARD(101,"VIP签到奖励"),
	ONLINE_GET(102,"在线领奖"),
	
	C充值(111,"充值"),
	
	/*********埋点自定义******/
	MD_QI_DONG(10001,"应用启动成功"),
	MD_FU_ZHI_RES(10010,"复制资源包"),
	MD_JIE_YA_RES(10011,"解压资源包"),
	MD_ZENG_LIANG(10050,"增量更新"),
	MD_JING_TAI_DATA(204,"更新静态数据"),
	MD_SDK_ZHUCE(10101,"sdk成功注册"),
	MD_SDK_LOGIN(10102,"sdk登陆"),
	MD_FU_WU_LIST(10201,"获取服务器列表"),
	MD_BEGIN_GAME(10501,"点开始游戏"),
	MD_GAME_OK(10510,"游戏启动成功"),
	MD_NAME_OK(10601,"起名成功"),
	
	MD_HUO_YUE(11100,"活跃度"),
	MD_TASK(11150,"任务成就"),
	MD_WU_XIAN(11200,"无限闯关"),
	MD_DARLY_COPY(11250,"日常副本"),
	MD_MAIL_KA(11300,"商城抽卡"),
	S_扫荡(11350,"扫荡"),
	J_竞技场(11400,"竞技场"),
	
	GOODS_EXCHANGE(11450,"物品兑换"),
	SKILL_LEVEL_UPDATE(11500,"技能升级"),
	PlAYER_ROLE_ADD_EXP(11600,"添加角色经验"),
	J_角色装备升级(11700,"角色装备升级"),
	ROLE_EQUIP_INDAY(11800,"角色装备镶嵌"),
	ROLE_REFRESH_POINT(11900,"刷新角色属性加点"),
	ROLE_RING_REFRESH(12000,"洗练刷新"),
	ROLE_RING_UPDATE(12001,"洗练确定"),
	ROLE_RING_UNLOCK(1300,"洗练属性解锁"),
	PLAYER_CHANGE_NAME(1400,"更换昵称"),
	PVP_SEARCHA(1500,"PVP搜索"),
	PVP_WAIT_TIME_CLEAR(1600,"清除PVP等待时间"),
	PVP_ROB(1610,"PVP抢夺"),
	ITEM_COMBINE(1700,"道具合成"),
	RESET_FIGHT(1800,"PVE重打"),
	LEAGUE_CREATE(1900,"创建联盟"),
	PVE_REVIVE(2000,"PVE复活"),
	SHAPE_SHIFTING(2001,"变身"),
	GM(2002,"GM"),
	REBIRTH(2003,"转生"),
	SAMSARA(2004,"重生"),
	ARENA(2005,"竞技场"),
	ARENA_MALL(2006,"竞技场商店"),
	ARENA_MALL_REF(2007,"竞技场商店刷新"),
	ARENA_RANK_AWARD(2008,"竞技场排名奖励"),
	FACE_LEVEL_AWARD(2009,"颜值等级奖励"),
	PLAYER_STAR(2010,"星座副本"),
	MAGIC_SHOP(2011, "魔法屋"),
	PLAYER_FRIEND(2012, "好友系统"),
	DOLL_HOUSE(2013, "娃娃屋"),
	DREAM_PAGODA(2014, "梦境之塔"),
	SERVEN_DAYS(2015, "七天登陆"),
	SIGN_IN(2016, "签到"),
	;

	
	
	
	private int value;
	private String string;
	
	private EPlayerActions(int value, String string){
		this.value = value;
		this.string = string;
	}
	
	private static final Map<Integer, String> map = new HashMap<Integer, String>();
	static {
		for (EPlayerActions e : EPlayerActions.values()) {
			map.put(e.get(), e.toString());
		}
	}
	
	public String toString(){return this.string;}
	public int get(){return value;}
	
	public static String getString(int value) {
		return map.get(value);
	}
	
	
	public static void main(String...args){
		for(int i=0;i<10;i++){
			System.out.println(Math.abs(new Random().nextLong()));
		}
	}
}
