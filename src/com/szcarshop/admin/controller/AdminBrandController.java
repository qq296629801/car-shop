package com.szcarshop.admin.controller;

import com.demo.common.model.Brand;
import com.demo.common.model.Location;
import com.jfinal.core.Controller;
import com.jfinal.upload.UploadFile;
import com.szcarshop.util.FileUtil;

/**
 * 
 * @author night owl
 * @category 品牌
 */
public class AdminBrandController extends Controller {

	public void index() {
		setAttr("locationList", Location.dao.find());
		setAttr("brandList", Brand.dao.find());
		render("product-brand.html");
	}

	/*
	 * 文件上传
	 *
	 */
	public void upload() {
		UploadFile file = this.getFile("brand_img");
		Brand brand = getModel(Brand.class);
		String fileName = "";
		if (file != null) {
			fileName = FileUtil.move(file);
			brand.setImg(fileName);
		}
		Brand b2 = Brand.dao.findFirst();
		if (b2 == null) {
			brand.setPid(1);
		} else {
			brand.setPid(b2.getPid() + 1);
		}
		brand.save();
		redirect("/brand");
	}

	public void edit() {
		int id = getParaToInt("id", 0);
		if (id != 0) {
			setAttr("locationList", Location.dao.find());
			setAttr("brand", Brand.dao.findById(id));
		}
		render("product-edit.html");
	}

	public void update() {
		UploadFile file = this.getFile("brand_img");
		Brand brand = getModel(Brand.class);// 18的数据
		if (file != null) {
			brand.setImg(FileUtil.move(file));
		}
		Brand b1 = Brand.dao.findByPid(brand.getPid());// 传过来的pid为17
		Brand b2 = Brand.dao.findById(brand.getId());// 拿到原来18的数据
		System.out.println("老的数据：" + b2.getPid());
		if (b1 != null) {// 修改18的数据
			b1.setPid(b2.getPid());// 17修改成18
			b1.update();
		}
		System.out.println("新的数据：" + brand.getPid());
		brand.update();// 这里将原本18修改成17
		redirect("/brand");
	}

	public void del() {
		int id = getParaToInt("id", 0);
		if (id != 0) {
			Brand brand = Brand.dao.findById(id);
			brand.setDisplay(0);
			brand.update();
		}
		renderJson();
	}

	/*
	 * 删除全部
	 */
	public void delall() {
		String[] names = getParaValues("arrayObj[]");
		for (String id : names) {
			Brand brand = Brand.dao.findById(id);
			brand.setDisplay(0);
			brand.update();
		}
		renderJson();
	}
}
