package com.szcarshop.util;

public class JSONUtil {

	public static String json(String success, String... msg) {
		if (msg.length > 0) {
			return "{\"success\":\"" + success + "\",\"msg\":\"" + msg[0] + "\"}";
		} else {
			return "{\"success\":\"" + success + "\"}";
		}

	}

	public static String json(boolean success, String... msg) {
		if (msg.length == 1) {
			return "{\"success\":" + success + ",\"msg\":\"" + msg[0] + "\"}";
		} else {
			return "{\"success\":" + success + "}";
		}

	}

	public static String json(boolean success, String code, String url) {
		return "{\"success\":" + success + ",\"code\":\"" + code + "\",\"url\":\"" + url + "\"}";
	}

}
