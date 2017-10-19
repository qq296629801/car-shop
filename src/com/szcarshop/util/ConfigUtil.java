package com.szcarshop.util;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class ConfigUtil {
	public static Properties readConfigFile(String path) throws IOException {
		Properties prop = new Properties();// 属性集合对象
		FileInputStream fis = new FileInputStream(path);// 属性文件流
		prop.load(fis);// 将属性文件流装载到Properties对象中
		fis.close();// 关闭文件流
		return prop;
	}
}
