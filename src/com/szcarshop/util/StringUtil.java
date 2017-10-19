package com.szcarshop.util;

import java.util.ArrayList;
import java.util.List;

import com.demo.common.model.Keymap;
import com.demo.common.model.Set;

/**
 * 
 * @author night owl
 * @category 字符串处理
 *
 */
public class StringUtil {
	/*
	 * 将逗号分隔出来
	 */
	public static List<Integer> getEnumtion(String str) {
		String[] strs = str.split(",");
		List<Integer> list = new ArrayList<Integer>();
		for (String s : strs) {
			list.add(Integer.parseInt(s));
		}
		return list;
	}

	/*
	 * 求差
	 */
	public static List<Set> compan(List<Set> list1, List<Set> list2) {
		List<Set> ls01 = new ArrayList<Set>();
		for (Set a : list1) {
			ls01.add(a);
		}
		List<Set> ls02 = new ArrayList<Set>();
		for (Set a : list2) {
			ls02.add(a);
		}
		ls02.removeAll(ls01);
		return ls02;
	}

	public static List<Keymap> compan2(List<Keymap> list1, Keymap key) {
		List<Keymap> ls01 = new ArrayList<Keymap>();
		for (Keymap a : list1) {
			ls01.add(a);
		}
		ls01.remove(key);
		return ls01;
	}

	public static List<Keymap> compan3(List<Keymap> list1, List<Keymap> list2) {
		List<Keymap> ls01 = list1;
		List<Keymap> ls02 = list2;
		ls02.removeAll(ls01);
		return ls02;
	}
	public static boolean isNotNull(Object obj) {
        return obj != null;
    }

    public static boolean isNotEmpty(Object obj) {
        return obj != null && !obj.toString().trim().equals("");
    }
}
