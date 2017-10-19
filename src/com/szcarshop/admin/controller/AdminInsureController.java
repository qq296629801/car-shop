package com.szcarshop.admin.controller;

import java.io.File;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

import com.demo.common.model.Img;
import com.demo.common.model.Insure;
import com.jfinal.core.Controller;
import com.jfinal.kit.PathKit;
import com.jfinal.upload.UploadFile;
import com.szcarshop.util.FileUtil;

/**
 * 
 * @author sunshine
 * @category 后台保险管理
 */
public class AdminInsureController extends Controller {

	public void index() {
		setAttr("insureList", Insure.dao.find());
		render("insure-list.html");
	}
	public void init(){
		
	}
	public void add() {
		init();
		render("insure-add.html");
	}
	public void upload() {
		int id = getSessionAttr("id");
		String fileName = "";
		if (id != 0) {
			UploadFile file = getFile();
			Img img = new Img();
			img.setCarId(id);
			fileName = FileUtil.move(file);
			img.setUrl(fileName);
			img.save();
		}
		renderJson("fileName", fileName);
	}
	/*
	 * 删除全部
	 */
	public void delall() {
		String[] names = getParaValues("arrayObj[]");
		for (String id : names) {
			Insure insure = Insure.dao.findById(id);
			insure.setDelId(2);
			insure.update();
		}
		renderJson();
	}
	/*
	 * 删除
	 */
	public void del() {
		int id = getParaToInt("id", 0);
		if (id != 0) {
			Insure insure = Insure.dao.findById(id);
			insure.setDelId(2);
			insure.update();
		}
		renderJson();
	}
	/**
	 * 保存
	 */
	public void save() {
		String fileName = "";
		UploadFile file = getFile("picture");
		Insure insure = getModel(Insure.class);
		if (file != null) {
			fileName = FileUtil.move(file);
			insure.setPictureUrl(fileName);
		}
		insure.save();
		removeSessionAttr("id");
		setSessionAttr("id", insure.getId());
		redirect("/adminInsure/index");
	}
	/**
	 * 跳转至编辑页面
	 */
	public void edit() {
		int id = getParaToInt("id", 0);
		if (id != 0) {
			Insure insure = Insure.dao.findById(id);
			setAttr("insure", insure);
		}
		render("insure-update.html");
	}
	/**
	 * 编辑
	 */
	public void update() {
		String fileName = "";
		UploadFile file = getFile("picture");
		Insure insure = getModel(Insure.class);
		insure.setLastUpdateTime(new Timestamp(new Date().getTime()));
		if (file != null) {
			fileName = FileUtil.move(file);
			insure.setPictureUrl(fileName);
		}
		insure.update();
		Integer id = insure.getId();
		List<Img> list = Img.dao.find(id);
		if (list != null) {
			for (Img i : list) {
				Img.dao.deleteById(i.getId());
				File file2 = new File(PathKit.getWebRootPath() + "/img/u/" + i.getUrl());
				if (file2.exists()) {
					file2.delete();
				}
			}
		}
		setSessionAttr("id", id);
		redirect("/adminInsure/index");
	}
	/**
	 * 搜索
	 */
	public void search() {
		String name = getModel(Insure.class).getName();
		String startDate = getPara("startDate", "");
		String endDate = getPara("endDate", "");
		List<Insure> list = Insure.dao.findByThreePara(name,startDate,endDate);
		setAttr("insureList", list);
		render("insure-list.html");
	}
    /*public static void main(String[] args) {
    	System.out.println(AdminInsureController.test(3));
		
	}
    public static long test(int n){
    	long a = 10;
    	if(n==1){
    		return a - 1;
    	}
    	for (int i = 1; i < n; i++) {
			a*=10;
		}
    	return a - 1;
    }*/
}
