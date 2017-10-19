package com.szcarshop.admin.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.beetl.ext.fn.StringUtil;

import com.alibaba.druid.util.StringUtils;
import com.demo.common.model.Keymap;
import com.demo.common.model.Model;
import com.demo.common.model.Shop;
import com.jfinal.core.Controller;
import com.jfinal.upload.UploadFile;
import com.szcarshop.util.FileUtil;

/**
 * 
 * @author night owl
 * @category 车载用品
 * @version v0.1
 */
public class AdminShopController extends Controller {
	
	private SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
	
	public void index() {
		int modelId = getParaToInt("model_id" , 0);
		setAttr("models", Model.dao.find());
		setAttr("shopList", Shop.dao.find(modelId));
		render("shop-list.html");
	}

	public void add() {
		setAttr("kes", Keymap.dao.findByModel_idDintct(1));
		setAttr("models", Model.dao.find());
		render("shop-add.html");
	}

	public void find() {
		int id = getParaToInt("id", 0);
		renderJson(Keymap.dao.findByModel_idDintct(id));
	}

	public void save() {
		UploadFile file = getFile("file");
		String FileName = "";
		if (file != null) {
			FileName = FileUtil.move(file);
		}
		Shop shop = getModel(Shop.class);
		shop.setUrl(FileName);
		String[] keys = getParaValues("key_id");
		if (keys != null) {
			StringBuilder str = new StringBuilder();
			for (String k : keys) {
				str.append("(" + k + ")");
				str.append(",");
			}
			shop.setKeyId(str.toString());
		}
		shop.setDelId(0);
		shop.save();
		redirect("/adminShop/");
	}

	public void addImg() {
		render("shop-img-add.html");
	}

	public void edit(){
		int id = getParaToInt("id" , 0);
		setAttr("models", Model.dao.find());
		setAttr("kes", Keymap.dao.findByModel_idDintct(1));
		setAttr("shop", Shop.dao.findById(id));
		render("shop-edit.html");
	}
	
	public void editSave() {
		UploadFile file = getFile("file");
		String FileName = "";
		if (file != null) {
			FileName = FileUtil.move(file);
		}
		Shop shop = getModel(Shop.class);
		shop.setUrl(FileName);
		String[] keys = getParaValues("key_id");
		if (keys != null) {
			StringBuilder str = new StringBuilder();
			for (String k : keys) {
				str.append("(" + k + ")");
				str.append(",");
			}
			shop.setKeyId(str.toString());
		}
		shop.setDelId(0);
		if(shop.getUrl() == null || shop.getUrl() == ""){
			shop.remove("url");
		}
		if(shop.getKeyId() == null){
			shop.remove("key_id");
		}
		if(shop.getContext() == null || shop.getContext() == ""){
			shop.remove("context");
		}
		if(shop.getRemark() == null || shop.getRemark() == ""){
			shop.remove("remark");
		}
		shop.update();
		redirect("/adminShop/");
	}
	
	public void search() {
		String name = getModel(Shop.class).getTitle();
		String time1 = getPara("time1", "");
		String time2 = getPara("time2", "");
		List<Shop> list = Shop.dao.find(name, time1, time2);
		setAttr("models", Model.dao.find());
		setAttr("shopList", list);
		render("shop-list.html");
	}

	/*
	 * 删除
	 */
	public void del() {
		int id = getParaToInt("id", 0);
		if (id != 0) {
			Shop shop = Shop.dao.findById(id);
			shop.setDelId(2);
			shop.update();
		}
		renderJson();
	}

	/*
	 * 删除全部
	 */
	public void delall() {
		String[] names = getParaValues("arrayObj[]");
		for (String id : names) {
			Shop shop = Shop.dao.findById(id);
			shop.setDelId(2);
			shop.update();
		}
		renderJson();
	}

	public void down() {
		int id = getParaToInt("id", 0);
		if (id != 0) {
			Shop shop = Shop.dao.findById(id);
			if (shop.getDelId() != 1) {
				shop.setDelId(1);
				shop.update();
				renderJson(true);
			}
		}
		renderJson(false);
	}

	public void up() {
		int id = getParaToInt("id", 0);
		if (id != 0) {
			Shop shop = Shop.dao.findById(id);
			shop.setDelId(0);
			shop.update();
			renderJson(true);
		}
		renderJson(false);
	}
	
	public void type(){
		int modelId = getParaToInt("model_id" , 1);
		setAttr("models", Model.dao.find());
		setAttr("subModelList", Model.dao.findSubModel(modelId));
		render("type-list.html");
	}
	
	public void typeUp() {
		int id = getParaToInt("id", 0);
		if (id != 0) {
			Keymap keymap = Keymap.dao.findById(id);
			keymap.setDisplay(1);
			keymap.update();
			renderJson(true);
		}
		renderJson(false);
	}
	
	public void typeDel() {
		int id = getParaToInt("id", 0);
		if (id != 0) {
			Keymap keymap = Keymap.dao.findById(id);
			keymap.setDisplay(2);
			keymap.update();
		}
		renderJson();
	}
	
	public void typeDelAll() {
		String[] names = getParaValues("arrayObj[]");
		for (String id : names) {
			Keymap keymap = Keymap.dao.findById(id);
			keymap.setDisplay(2);
			keymap.update();
		}
		renderJson();
	}

	public void typeDown() {
		int id = getParaToInt("id", 0);
		if (id != 0) {
			Keymap keymap = Keymap.dao.findById(id);
			if (keymap.getDisplay() != 1) {
				keymap.setDisplay(1);
				keymap.update();
				renderJson(true);
			}
		}
		renderJson(false);
	}
	
	public void typeAdd() {
		setAttr("models", Model.dao.find());
		render("type-add.html");
	}
	
	public void typeAddSave(){
		Keymap keyMap = getModel(Keymap.class);
		keyMap.setTime(df.format(new Date()));
		keyMap.save();
		redirect("/adminShop/type");
	}
	
	public void typeEdit(){
		int keymapId = getParaToInt("keymap_id" , 0);
		setAttr("models", Model.dao.find());
		setAttr("keyMap", Keymap.dao.findById(keymapId));
		render("type-edit.html");
	}
	
	public void typeEditSave(){
		Keymap keyMap = getModel(Keymap.class);
		keyMap.setTime(df.format(new Date()));
		keyMap.update();
		redirect("/adminShop/type");
	}
}
