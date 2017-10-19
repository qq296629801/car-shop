package com.szcarshop.util;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtil {

	public static String getTime() {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mms");
		return sdf.format(new Date());
	}
}
