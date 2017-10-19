package com.szcarshop.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

import com.jfinal.kit.PathKit;
import com.jfinal.upload.UploadFile;

public class FileUtil {

	public static String move(UploadFile file) {
		String path = new SimpleDateFormat("yyyy/MM/dd").format(new Date());
		File source = file.getFile();
		String fileName = file.getFileName();
		String extension = fileName.substring(fileName.lastIndexOf("."));
		String prefix;
		if (".png".equals(extension) || ".jpg".equals(extension) || ".gif".equals(extension)) {
			prefix = "img";
			fileName = FileUtil.genCodes(20) + extension;
		} else {
			prefix = "file";
		}
		try {
			FileInputStream fis = new FileInputStream(source);
			File targetDir = new File(PathKit.getWebRootPath() + "/" + prefix + "/u/" + path);
			if (!targetDir.exists()) {
				targetDir.mkdirs();
			}
			File target = new File(targetDir, fileName);
			if (!target.exists()) {
				target.createNewFile();
			}
			FileOutputStream fos = new FileOutputStream(target);
			byte[] bts = new byte[300];
			while (fis.read(bts, 0, 300) != -1) {
				fos.write(bts, 0, 300);
			}
			fos.close();
			fis.close();
			source.delete();
		} catch (FileNotFoundException e) {
		} catch (IOException e) {
		}
		fileName = path + "/" + fileName;
		return fileName;
	}

	public static String move(UploadFile file, String Folder) {
		String path = new SimpleDateFormat("yyyy/MM/dd").format(new Date());
		File source = file.getFile();
		String fileName = file.getFileName();
		String extension = fileName.substring(fileName.lastIndexOf("."));
		String prefix;
		if (".png".equals(extension) || ".jpg".equals(extension) || ".gif".equals(extension)) {
			prefix = "img";
			fileName = FileUtil.genCodes(20) + extension;
		} else {
			prefix = "file";
		}
		try {
			FileInputStream fis = new FileInputStream(source);
			File targetDir = new File(PathKit.getWebRootPath() + "/" + prefix + "/" + Folder + "/" + path);
			if (!targetDir.exists()) {
				targetDir.mkdirs();
			}
			File target = new File(targetDir, fileName);
			if (!target.exists()) {
				target.createNewFile();
			}
			FileOutputStream fos = new FileOutputStream(target);
			byte[] bts = new byte[300];
			while (fis.read(bts, 0, 300) != -1) {
				fos.write(bts, 0, 300);
			}
			fos.close();
			fis.close();
			source.delete();
		} catch (FileNotFoundException e) {
		} catch (IOException e) {
		}
		fileName = path + "/" + fileName;
		return fileName;
	}

	public static String genCodes(int length) {
		String val = "";
		Random random = new Random();
		for (int i = 0; i < length; i++) {
			String charOrNum = random.nextInt(2) % 2 == 0 ? "char" : "num"; // 输出字母还是数字
			if ("char".equalsIgnoreCase(charOrNum)) // 字符串
			{
				int choice = random.nextInt(2) % 2 == 0 ? 65 : 97; // 取得大写字母还是小写字母
				val += (char) (choice + random.nextInt(26));
			} else if ("num".equalsIgnoreCase(charOrNum)) // 数字
			{
				val += String.valueOf(random.nextInt(10));
			}
		}
		val = val.toLowerCase();
		return val;

	}

}
