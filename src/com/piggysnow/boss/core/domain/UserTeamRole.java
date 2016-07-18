package com.piggysnow.boss.core.domain;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.wds.base.dao.BaseEntity;


/**
 * 用户-协作组-角色关联
 */
@Entity 
@Table(name="t_user_team_role")
public class UserTeamRole extends BaseEntity{


	/**
	 * 用户外键
	 */
	private Long userId;
	/**
	 * 协作组外键
	 */
	private Long teamId;
	/**
	 * 角色外键
	 */
	private Long roleId;
	/**
	 * 加入时间
	 */
	private String joinTime;
	/**
	 * 状态
	 */
	private int status;
	/**
	 * 参与方式
	 */
	private int joinType;
	/**
	 * 加入方式：管理员
	 */
	public static int TYPE_ADMIN = 0;
	/**
	 * 加入方式：邀请加入
	 */
	public static int TYPE_INVITE = 1;
	/**
	 * 加入方式：申请加入
	 */
	public static int TYPE_JOIN = 2;
	/**
	 * 状态：未审核
	 */
	public static int STATUS_UNCHECKED = 0;
	/**
	 * 状态：拒绝
	 */
	public static int STATUS_DENY = 1;
	/**
	 * 状态：正常
	 */
	public static int STATUS_PASS = 3;

	public String getJoinTypeString() {
		if (joinType == 0)
			return "管理员";
		if (joinType == 1)
			return "邀请加入";
		if (joinType == 2)
			return "申请加入";

		return "";
	}

	public String getStatusString() {
		if (status == 0 && joinType == 1)
			return "未确认";
		if (status == 0 && joinType == 2)
			return "待批准";

		if (status == 1 && joinType == 1)
			return "已拒绝";
		if (status == 1 && joinType == 2)
			return "审核不通过";

		if (status == 3)
			return "正常";
		return "";
	}

	/**
	 * 允许申请加入 未审核0 1不允许 审核通过3
	 */
	public String getUserStatus() {
		if (status == 0) {
			return "未审核";
		} else if (status == 1) {
			return "审核不通过";
		} else if (status == 3) {
			return "审核通过";
		}
		return "";
	}

	/**
	 * 加入方式
	 * 
	 * @return
	 */
	public String getJoinTypes() {
		if (joinType == this.TYPE_INVITE) {
			return "邀请加入";
		} else if (joinType == this.TYPE_JOIN) {
			return "申请加入";
		}
		return "";
	}

	/**
	 * 用户-协作组-角色关联ID
	 */
	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * 协作组外键
	 */
	public Long getTeamId() {
		return teamId;
	}

	/**
	 * 协作组外键
	 */
	public void setTeamId(Long teamId) {
		this.teamId = teamId;
	}

	/**
	 * 用户外键
	 */
	public Long getUserId() {
		return userId;
	}

	/**
	 * 用户外键
	 */
	public void setUserId(Long userId) {
		this.userId = userId;
	}

	/**
	 * 角色外键
	 */
	public Long getRoleId() {
		return roleId;
	}

	/**
	 * 角色外键
	 */
	public void setRoleId(Long roleId) {
		this.roleId = roleId;
	}

	/**
	 * 状态 0 未审核 1 未确认 2 审核不通过 3 正常
	 */
	public int getStatus() {
		return status;
	}

	/**
	 * 状态 0 未审核 1 未确认 2 审核不通过 3 正常
	 */
	public void setStatus(int status) {
		this.status = status;
	}

	public String getJoinTime() {
		return joinTime;
	}

	public void setJoinTime(String joinTime) {
		this.joinTime = joinTime;
	}

	public int getJoinType() {
		return joinType;
	}

	public void setJoinType(int joinType) {
		this.joinType = joinType;
	}
}
