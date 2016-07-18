package com.piggysnow.boss.exception;


public class SearchException extends RuntimeException{

	public SearchException(String s){super(s);}
	public String toString()
	{
		return this.getMessage();
	}
}
