package com.szcarshop.util;

import java.util.HashMap;
import java.util.Map;

import org.apache.http.HttpResponse;
import org.apache.http.util.EntityUtils;

public class SmsUtil {
	private static SmsUtil instance = new SmsUtil();

	public SmsUtil() {

	}

	public static SmsUtil getInstance() {
		return instance;
	}

	public static String send(Map<String, String> querys) {
		String host = "http://sms.market.alicloudapi.com";
		String path = "/singleSendSms";
		String method = "GET";
		String appcode = "5b7278ddd8604e9197ac5f3e642b45a7";
		Map<String, String> headers = new HashMap<String, String>();
		headers.put("Authorization", "APPCODE " + appcode);
		try {
			HttpResponse response = HttpUtils.doGet(host, path, method, headers, querys);
			System.out.println(response.toString());
			return EntityUtils.toString(response.getEntity());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public static String getRandNum(int num) {
		int min = 1;
		int max = (int) (Math.pow(10, num) - 1);
		int randNum = min + (int) (Math.random() * ((max - min) + 1));
		return randNum + "";
	}

	public static String sendCode(String phone, String code) {
		Map<String, String> querys = new HashMap<String, String>();
		String json = "{\"code\":\"" + code + "\"}";
		querys.put("ParamString", json);
		querys.put("RecNum", phone);
		querys.put("SignName", "车集市");
		querys.put("TemplateCode", "SMS_96460046");
		return SmsUtil.send(querys);
	}
}
