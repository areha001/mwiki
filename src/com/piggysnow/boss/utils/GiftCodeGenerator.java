package com.piggysnow.boss.utils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class GiftCodeGenerator {

	public static void main(String[] args)
	{
		List<String> l = notDo();
		for(String s: l)
		{
			System.out.println(s);
		}
	}
	
	public static List<String> notDo(){
		return notDo(31, 7);
	}
	public static List<String> notDo(int key1,int key2){
		String[] w = new String[]{"a","b","c","d","e","f","g","h","i","j","k","m","n","p","q","r","s","t","u","v","w","x","y","z"};
		String[] n = new String[]{"0","1","2","3","4","5","6","7","8","9"};
		String s = "";
		
		//发散因子  i[0,2], j[0,22]    已使用 i=[1], j=[0,1,2]
		int length = w.length;
		
		List<String> slist = new ArrayList<String>();
		for(int i=0;i<length*length; i++){
			if(i%key2!=1){
				continue;
			}
			int x = i/length;
			int y = i%length;
			for(int j=0;j<100000;j++){
				if(j%key1==0){
					int z1 = j/1000;
					int z2 = (j%1000) / 100;
					int z3 = (j%100) / 10;
					int z4 = (j%10);
					s =w[x]+ w[y] + z1+z2+z3+z4;
					
					slist.add(s);
				}
			}
			System.out.println(i);
		}
		Collections.shuffle(slist);
		return slist;
	}
}
