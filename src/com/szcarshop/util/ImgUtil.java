package com.szcarshop.util;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;

public class ImgUtil {

	/***
	 * 功能 :调整图片大小 生成缩略图
	 * 
	 * @param srcImgPath
	 *            原图片路径
	 * @param distImgPath
	 *            转换大小后图片路径
	 * @param width
	 *            转换后图片宽度
	 * @param height
	 *            转换后图片高度
	 */
	public static void resizeImage(String srcImgPath, String distImgPath, int width, int height) throws IOException {

		File srcFile = new File(srcImgPath);
		Image srcImg = ImageIO.read(srcFile);
		BufferedImage buffImg = null;
		buffImg = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
		buffImg.getGraphics().drawImage(srcImg.getScaledInstance(width, height, Image.SCALE_SMOOTH), 0, 0, null);
		ImageIO.write(buffImg, "JPEG", new File(distImgPath));

	}

	/**
	 * 图片按比例绘制并加入黑色背景
	 * 
	 * @param srcImagePath
	 *            源图像文件地址
	 * @param distImgPath
	 *            缩放后的图像地址
	 * @param width
	 *            整体图片宽度
	 * @param height
	 *            整体图片高度
	 */
	public final static void pressImage(String srcImageFile, String distImgPath, int width, int height, Color color) {
		try {
			BufferedImage src = ImageIO.read(new File(srcImageFile)); // 读入文件
			int width_src = src.getWidth(); // 得到源图宽
			int height_src = src.getHeight(); // 得到源图长
			// 判断是按照宽度缩放还是高度缩放
			if (width_src > height_src) {
				float f = (float) width / (float) width_src;
				width_src = width;
				height_src = (int) (f * height_src);
			} else {
				float f = (float) height / (float) height_src;
				width_src = (int) (f * width_src);
				height_src = height;
			}
			Image image = src.getScaledInstance(width_src, height_src, Image.SCALE_DEFAULT);
			BufferedImage tag = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
			Graphics g = tag.getGraphics();
			g.drawImage(image, (width - width_src) / 2, (height - height_src) / 2, width_src, height_src, color, null); // 绘制缩小后的图
			g.dispose();
			ImageIO.write(tag, "JPEG", new File(distImgPath));// 输出到文件流
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}