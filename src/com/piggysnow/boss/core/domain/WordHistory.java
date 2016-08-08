package com.piggysnow.boss.core.domain;

import java.util.Date;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.piggysnow.boss.core.web.admin.controller.StaticServiceController;
import com.wds.base.dao.BaseEntity;

/**
 * 词汇历史 
 */
@Entity 
@Table(name="t_word_history")
public class WordHistory extends BaseEntity{

	public static final int ACTIVE_OLD = 1;
	public static final int ACTIVE_STATUS = 2;
	/**
	 * 角色名
	 */
	@Column
	private String name;
	/**
	 * 角色名
	 */
	@Column
	private String groupName;
	/**
	 * 角色名
	 */
	@Column
	private long creator;
	/**
	 * 时间
	 */
	@Column
	private Date createTime;
	/**
	 * 状态
	 */
	@Column
	private int status;
	/**
	 * 版本
	 */
	@Column
	private int version;
	/**
	 * 描述 
	 */
	@Column
	private String description;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getGroupName() {
		return groupName;
	}
	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
	public long getCreator() {
		return creator;
	}
	public void setCreator(long creator) {
		this.creator = creator;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public int getVersion() {
		return version;
	}
	public void setVersion(int version) {
		this.version = version;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	
	
	public String getDescriptionExtra()
	{
		Pattern pattern = Pattern.compile("<a href=\"innerlink (.*?) (.*?)\"");
		Matcher m = pattern.matcher(description);
		StringBuffer sb = new StringBuffer();
		while(m.find())
		{
			String wordData= m.group(2);
			String dataType= m.group(1);
//			System.out.println(wordData);
//			System.out.println(dataType);
			Word w = StaticServiceController.getWordService().findWord(wordData);
			String classInfo = " class=\"wordlink hasref\" ";
			if(w == null)
			{
				classInfo = " class=\"wordlink noref\" ";
			}
			String uri = StaticServiceController.getDictService().getDictInfo(SITE_PATH, 1) + "/" + dataType+ "/" + wordData;
//			System.out.println("<a href=\"" + uri + "\"");
			m.appendReplacement(sb, "<a " + classInfo + " href=\"" + uri + "\"");
		}
		m.appendTail(sb);
		return sb.toString();
//		Pattern pattern = Pattern.compile("\\[link(word|item) (.*?)\\]");
//		
//		String k = description.replaceAll("\\[link(word|item) (.*?)\\]", "<a class=\"innerlink\" href=\"" + StaticServiceController.getDictService().getDictInfo(SITE_PATH, 1) + "/$1/$2" +  "\">$2</a>");;
//		return k;
	}
	
	public static String SITE_PATH = "SITE_PATH";
	
	public static void main(String...strings)
	{
//		String description= "<sdfsdf>[linkword sdfsdfsdf]awgawegaweg</sdfsdf>[linkitem sfsadfsfsdf]wagwegwagwagweg[linkewrtwe awgaw]";
//		String k = description.replaceAll("\\[link(word|item) (.*?)\\]", "<a class=\"innerlink\" href=\"" + "dd"+ "/$1/$2" +  "\">$2</a>");
//		System.out.println(k);
//		
		 Pattern p = Pattern.compile("cat(a)");
		 Matcher m = p.matcher("one cata two pigs in the yard");
		 StringBuffer sb = new StringBuffer();
		 while (m.find()) {
		     m.appendReplacement(sb, "dogeee");
		 }
		 m.appendTail(sb);
		 System.out.println(sb.toString());
	}
}
