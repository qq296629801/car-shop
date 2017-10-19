package com.szcarshop.util;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Date;
import java.util.Scanner;

/*
 *18禁 未满18岁请自行离去
 */
public class Test {
	private static ArrayList<String> filelist = new ArrayList<String>();

	public static void main(String[] args) throws IOException {

		String strs[] = { "p01/index.html", "p02/index.html", "p03/index.html", "p04/index.html", "p05/index.html",
				"p06/index.html", "p07/index.html", "p08/index.html" };
		for (String str : strs) {
			open(str);
		}
		// File file = new File("D:\\img\\img");
		/*
		 * File[] files = file.listFiles(); for (File f : files) {
		 * System.out.println("<img src='./img/" + f.getName() + "' />"); }
		 */
		// String filePath =
		// "C:\\Users\\Administrator\\Desktop\\carshop-html\\order-submit_files\\";
		// getFiles(filePath, ".下载");
		// saveFile("http://127.0.0.1/");
	}

	public static void open(String string) throws IOException {
		String url = "http://a55v.com/";
		String str = openUrl(url + string);
		String s = str.substring(str.indexOf("typelist"));
		String xx = s.substring(s.indexOf("page"));
		String vvv = xx.substring(xx.indexOf("共") + 5, xx.indexOf("条") - 5);
		int pageNum = Integer.parseInt(vvv);
		str = str.substring(str.indexOf("typelist"), s.indexOf("page"));
		String[] arr = str.split("<li>");
		for (String a : arr) {
			if (a.indexOf("<a") != -1) {
				String t = a.substring(a.indexOf("<a") + 10);
				t = t.substring(0, t.indexOf("target") - 2);
				// System.out.println(url + t);
				String ssss = openUrl(url + t);
				String[] arrr = ssss.split("<img");
				for (String img : arrr) {
					if (img.indexOf("src=\"http:") != -1) {
						img = img.substring(img.indexOf("src") + 5, img.indexOf("border") - 2);
						// System.out.println(img);
						getImg(img);
					}
				}

			}
		}
		// String temp = str.substring(str.indexOf(name) - 16, str.indexOf(name)
		// - 2);
		// str = openUrl(path + temp);
		// String img = bb[i].substring(7, bb[i].indexOf("alt") - 2);
		// getImg(img);
		// System.out.println(bb[i].substring(7, bb[i].indexOf("alt") - 2));

	}

	public static void getImg(String path) throws IOException {
		FileOutputStream fos = null;
		BufferedInputStream bis = null;
		HttpURLConnection httpUrl = null;
		URL url = null;
		int size = 0;
		int buf_isze = 1024;
		byte[] buf = new byte[buf_isze];
		url = new URL(path);
		httpUrl = (HttpURLConnection) url.openConnection();
		httpUrl.setRequestProperty("User-Agent", "Mozilla/4.0 (compatible; MSIE 5.0; Windows NT; DigExt)");
		bis = new BufferedInputStream(httpUrl.getInputStream());

		fos = new FileOutputStream("D:\\img\\" + new Date().getTime() + ".jpg");
		while ((size = bis.read(buf)) != -1) {
			fos.write(buf, 0, size);
		}
		fos.close();
		bis.close();
	}

	public static void saveFile(String path, String src) throws IOException {
		FileOutputStream fos = null;
		BufferedInputStream bis = null;
		HttpURLConnection httpUrl = null;
		URL url = null;
		int size = 0;
		int buf_isze = 1024;
		byte[] buf = new byte[buf_isze];
		url = new URL(path);
		httpUrl = (HttpURLConnection) url.openConnection();
		httpUrl.setRequestProperty("User-Agent", "Mozilla/4.0 (compatible; MSIE 5.0; Windows NT; DigExt)");
		bis = new BufferedInputStream(httpUrl.getInputStream());
		fos = new FileOutputStream(src);
		while ((size = bis.read(buf)) != -1) {
			fos.write(buf, 0, size);
		}
		fos.close();
		bis.close();
	}

	public static String openUrl(String urlStr) throws IOException {
		HttpURLConnection httpUrl = null;
		URL url = new URL(urlStr);
		url.openConnection();
		httpUrl = (HttpURLConnection) url.openConnection();
		httpUrl.setDoInput(true);
		httpUrl.setRequestMethod("GET");
		httpUrl.setRequestProperty("User-Agent", "Mozilla/4.0 (compatible; MSIE 5.0; Windows NT; DigExt)");
		InputStream io = url.openStream();
		Scanner sc = new Scanner(io);
		StringBuilder str = new StringBuilder();
		while (sc.hasNext()) {
			str.append(sc.nextLine());
		}
		return str.toString();
	}

	public static void getFiles(String filePath, String replace) {
		File root = new File(filePath);
		File[] files = root.listFiles();
		for (File file : files) {
			if (file.isDirectory()) {
				getFiles(file.getAbsolutePath(), replace);
				filelist.add(file.getAbsolutePath());
			} else {
				String name = file.getName();
				if (name.contains(replace)) {
					File ole = new File(filePath + name.replace(replace, ""));
					file.renameTo(ole);
				}
			}
		}
	}
}
