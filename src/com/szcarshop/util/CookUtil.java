package com.szcarshop.util;

import java.util.Properties;

import javax.servlet.http.Cookie;

import com.jfinal.core.Controller;

public class CookUtil extends Controller {

	public void addCook(String lockStr, String cookName) throws Exception {
		// String bbsID = username + Const.BBS_ID_SEPARATOR + password;

	}

	/****
	 * 根据cookname 取得cooks中cook的值并解密出来 @param name @param cooks @return @throws
	 * Exception @throws
	 */
	public static String getValue(String cookName, Cookie[] cooks, String path) throws Exception {
		for (Cookie cookie : cooks) {
			if (cookName.equals(cookie.getName())) {
				Properties prop = new Properties();// 属性集合对象
				prop = ConfigUtil.readConfigFile(path + "lockKey.properties");
				String key = prop.getProperty("key");
				String value = cookie.getValue();
				return LockUtil.decrypt(value, key);
			}
		}
		return null;
	}
}
