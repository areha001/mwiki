package com.piggysnow.boss.utils;

import java.util.HashMap;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class TotalJson {
	private HashMap<String, Object> moreInfo;
	private long results;
	private List items;
	private long star,limit;  //分页
	
	public List getItems() {
		return items;
	}
	public void setItems(List items) {
		this.items = items;
	}
	public long getStar() {
		return star;
	}
	public void setStar(long star) {
		this.star = star;
	}
	public long getLimit() {
		return limit;
	}
	public void setLimit(long limit) {
		this.limit = limit;
	}
	public long getResults() {
		return results;
	}
	public void setResults(long results) {
		this.results = results;
	}
	public HashMap<String, Object> getMoreInfo() {
		return moreInfo;
	}
	public void setMoreInfo(HashMap<String, Object> moreInfo) {
		this.moreInfo = moreInfo;
	}
	
}
