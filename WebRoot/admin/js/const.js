(function () {

    function TypeMapper() {
        this.arr = [];
        this.map = {};
        this.add = function (id, desc) {
            this.arr.push([id, desc]);
            this.map[id] = desc;
        };
        this.get = function (id) {
            return this.map[id];
        }
    }

    // 奖励类型
    var awardTypeMap = new TypeMapper();
    awardTypeMap.add("0", "物品");
    awardTypeMap.add("1", "苹果币");
    awardTypeMap.add("2", "钻石");
    awardTypeMap.add("3", "金币");
    awardTypeMap.add("4", "体力");
    awardTypeMap.add("5", "竞技场积分");
    window.awardTypeMap = awardTypeMap;

    // 商城标签类型
    var labelTypeMap = new TypeMapper();
    labelTypeMap.add(0, "无");
    labelTypeMap.add(1, "热卖");
    labelTypeMap.add(2, "新品");
    labelTypeMap.add(3, "折扣");
    window.labelTypeMap = labelTypeMap;

    // 商城限购类型
    var limitTypeMap = new TypeMapper();
    limitTypeMap.add(0, "无");
    limitTypeMap.add(1, "个人限购");
    limitTypeMap.add(2, "全服限购");
    window.limitTypeMap = limitTypeMap;

    // 商城展示类型
    var showTypeMap = new TypeMapper();
    showTypeMap.add(0, "其他");
    showTypeMap.add(1, "道具");
    showTypeMap.add(2, "材料");
    showTypeMap.add(3, "宝石");
    showTypeMap.add(4, "礼包");
    showTypeMap.add(5, "爱心");
    showTypeMap.add(6, "家私");
    showTypeMap.add(8, "钻石");
    window.showTypeMap = showTypeMap;

    // 商城消耗类型
    var mallCostTypeMap = new TypeMapper();
    mallCostTypeMap.add(1, "人民币");
    mallCostTypeMap.add(2, "钻石");
    mallCostTypeMap.add(3, "金币");
    mallCostTypeMap.add(4, "竞技场积分");
    mallCostTypeMap.add(5, "绑定宝石");
    window.mallCostTypeMap = mallCostTypeMap;

    // 好友体力赠送状态
    var giveStatusMap = new TypeMapper();
    giveStatusMap.add(10, "可赠送");
    giveStatusMap.add(11, "已赠送");
    window.giveStatusMap = giveStatusMap;

    // 好友体力接收状态
    var receiveStatusMap = new TypeMapper();
    receiveStatusMap.add(0, "未赠送");
    receiveStatusMap.add(1, "未领取");
    receiveStatusMap.add(2, "已领取");
    window.receiveStatusMap = receiveStatusMap;

    // 奖励领取状态
    var awardStatusMap = new TypeMapper();
    awardStatusMap.add(0, "不可领");
    awardStatusMap.add(1, "可领");
    awardStatusMap.add(2, "已领");
    window.awardStatusMap = awardStatusMap;

    // 挑战副本ID
    var challengeIdMap = new TypeMapper();
    challengeIdMap.add(10001, "金币副本");
    challengeIdMap.add(10002, "经验副本");
    window.challengeIdMap = challengeIdMap;

    // 星座副本特技
    var playerStarStuntMap = new TypeMapper();
    playerStarStuntMap.add(0, "未使用");
    playerStarStuntMap.add(1, "双倍积分");
    playerStarStuntMap.add(2, "清除");
    playerStarStuntMap.add(4, "求助");
    playerStarStuntMap.add(8, "重置");
    window.playerStarStuntMap = playerStarStuntMap;

    // 星座副本牌子类型
    var starCardTypeMap = new TypeMapper();
    starCardTypeMap.add(0, "直接通关");
    starCardTypeMap.add(1, "战斗");
    starCardTypeMap.add(2, "炸弹");
    window.starCardTypeMap = starCardTypeMap;

    // 星座副本牌子状态
    var starCardStatusMap = new TypeMapper();
    starCardStatusMap.add(0, "禁用");
    starCardStatusMap.add(10, "未翻开");
    starCardStatusMap.add(20, "已翻开");
    starCardStatusMap.add(30, "通关失败");
    starCardStatusMap.add(40, "通关成功");
    starCardStatusMap.add(50, "炸弹清除");
    window.starCardStatusMap = starCardStatusMap;

    // 邮件类型
    var mailTypeMap = new TypeMapper();
    mailTypeMap.add(0, "系统邮件");
    mailTypeMap.add(10, "PVP攻击记录");
    mailTypeMap.add(20, "PVP防守记录");
    mailTypeMap.add(30, "请求代购邮件");
    mailTypeMap.add(40, "拒绝代购邮件");
    mailTypeMap.add(50, "同意代购邮件");
    window.mailTypeMap = mailTypeMap;

    // 洗练效果
    var roleRingSkillMap = new TypeMapper();
    roleRingSkillMap.add(0, "未解锁");
    roleRingSkillMap.add(32000, "无技能");
    roleRingSkillMap.add(32001, "加攻击");
    roleRingSkillMap.add(32002, "加防御");
    roleRingSkillMap.add(32003, "加血");
    roleRingSkillMap.add(32004, "加速");
    roleRingSkillMap.add(32005, "加命中");
    roleRingSkillMap.add(32006, "加闪避");
    roleRingSkillMap.add(32007, "加暴击");
    roleRingSkillMap.add(32008, "加免爆");
    roleRingSkillMap.add(32010, "加机率冰冻");
    roleRingSkillMap.add(32011, "加机率中毒");
    roleRingSkillMap.add(32012, "加机率麻木");
    roleRingSkillMap.add(32013, "加机率混乱");
    roleRingSkillMap.add(32014, "燃烧");
    window.roleRingSkillMap = roleRingSkillMap;

    // 订单状态
    var payStatusMap = new TypeMapper();
    payStatusMap.add(-1, "全部");
    payStatusMap.add(0, "未充值");
    payStatusMap.add(1, "已充值");
    payStatusMap.add(2, "充值完成");
    window.payStatusMap = payStatusMap;

    // awardConfig类型
    var awardConfigTypeMap = new TypeMapper();
    awardConfigTypeMap.add(1, "宝箱奖励");
    awardConfigTypeMap.add(2, "七天登陆");
    awardConfigTypeMap.add(3, "CDKEY");
    awardConfigTypeMap.add(4, "等级奖励");
    awardConfigTypeMap.add(5, "冲榜奖励");
    awardConfigTypeMap.add(6, "节日礼包");
    awardConfigTypeMap.add(7, "世界掉落");
    awardConfigTypeMap.add(8, "首冲活动");
    window.awardConfigTypeMap = awardConfigTypeMap;

    // 排行榜id
    var rankIdMap = new TypeMapper();
    rankIdMap.add(1, "战力榜");
    rankIdMap.add(2, "竞技榜");
    rankIdMap.add(3, "队伍榜");
    rankIdMap.add(4, "颜值榜");
    rankIdMap.add(5, "角色榜");
    rankIdMap.add(6, "钻石榜");
    rankIdMap.add(7, "副本榜");
    window.rankIdMap = rankIdMap;

    window.getBoardType = function (subType) {
        return parseInt(subType / 10000);
    };

    window.getStartIndex = function (subType) {
        return parseInt(subType / 100) % 100;
    };

    window.getEndIndex = function (subType) {
        return subType % 100;
    };

    window.getHighRankAwardsName = function (subType) {
        var id = window.getBoardType(subType);
        var start = window.getStartIndex(subType);
        var end = window.getEndIndex(subType);
        return window.rankIdMap.get(id) + start + "-" + end + "名";
    };

    window.calSubType = function (boardType, startIndex, endIndex) {
        return boardType * 10000 + startIndex * 100 + endIndex * 1;
    };

    // 活动id
    var activityIdMap = new TypeMapper();
    activityIdMap.add(1, "每日签到");
    activityIdMap.add(2, "等级奖励");
    activityIdMap.add(3, "七天登录");
    activityIdMap.add(4, "冲榜奖励");
    activityIdMap.add(5, "节日礼包");
    activityIdMap.add(6, "世界掉落");
    activityIdMap.add(7, "VIP礼包");
    activityIdMap.add(8, "首冲活动");
    activityIdMap.add(9, "开服基金");
    activityIdMap.add(10, "全民福利");
    activityIdMap.add(11, "充值有礼");
    activityIdMap.add(12, "消费返利");
    activityIdMap.add(13, "充值福利");
    activityIdMap.add(14, "VIP福利");
    activityIdMap.add(15, "橙色角色");
    activityIdMap.add(16, "叶罗丽热度");
    activityIdMap.add(17, "掉落翻倍");
    activityIdMap.add(18, "节日活动");
    window.activityIdMap = activityIdMap;

    // 公告类型
    var noticeIdMap = new TypeMapper();
    noticeIdMap.add(1, "即时公告");
    noticeIdMap.add(2, "登陆公告");
    window.noticeIdMap = noticeIdMap;

    // 充值套餐
    var chargeIdMap = new TypeMapper();
    chargeIdMap.add(1,	"300钻石月卡");
    chargeIdMap.add(2,	"600钻石至尊卡");
    chargeIdMap.add(3,	"60钻石");
    chargeIdMap.add(4,	"300钻石");
    chargeIdMap.add(5,	"500钻石");
    chargeIdMap.add(6,	"980钻石");
    chargeIdMap.add(7,	"1980钻石");
    chargeIdMap.add(8,	"3280钻石");
    chargeIdMap.add(9,	"6480钻石");
    chargeIdMap.add(51,	"100钻石红钻卡");
    chargeIdMap.add(52,	"100钻石绿钻卡");
    chargeIdMap.add(53,	"100钻石蓝钻卡");
    
    window.chargeIdMap = chargeIdMap;

    // 物品id
    var itemIdMap = new TypeMapper();
    if (window.vmap && window.vmap.length > 0) {
        for (var i = 0; i < window.vmap.length; ++i) {
            var data = window.vmap[i];
            itemIdMap.add(data[0], data[1]);
        }
    }
    window.itemIdMap = itemIdMap;

})();