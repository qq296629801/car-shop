package com.szcarshop.util;

public class TextFormat {
	/***
	 * 首字母转大写
	 * 
	 * @param s
	 * @return
	 */
	public static String toUpperCaseFirstOne(String s) {
		if (Character.isUpperCase(s.charAt(0)))
			return s;
		else
			return (new StringBuilder()).append(Character.toUpperCase(s.charAt(0))).append(s.substring(1)).toString();
	}

	public static StringBuffer format(String intro) {
		String tag = "</p><p>";
		StringBuffer content = new StringBuffer("<p>");
		for (int i = 0; i < intro.length(); i++) {
			char c = intro.charAt(i);
			if (c == ' ' && i < intro.length() - 3) {
				char c1 = intro.charAt(i + 1);
				if (c1 == ' ') {
					char c2 = intro.charAt(i + 2);
					if (c2 == ' ') {
						i = i + 3;
						content.append(tag);
						while (intro.charAt(i) == ' ' && i < intro.length() - 1) {
							i++;
						}
						content.append(intro.charAt(i));
					} else {
						content.append(intro.charAt(i));
						continue;
					}
				} else {
					content.append(intro.charAt(i));
					continue;
				}
			} else {
				content.append(c);
			}
		}
		content.append("</p>");
		return content;
	}
}
