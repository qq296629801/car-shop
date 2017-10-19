package com.szcarshop.admin.controller;

import java.util.List;

import com.demo.common.model.Bbs;
import com.jfinal.core.Controller;

/**
 * 
 * 论坛管理
 * 
 * @author Hugo
 *
 */
public class AdminBBSController extends Controller {

	public void index() {
		// setAttr("bbsList",Bbs.dao.find());
		render("bbs-list.html");

	}

	/*
	 * 搜索
	 */
	public void search() {

		String tile = getModel(Bbs.class).getTitle();
		String time1 = getPara("time1", "");
		String time2 = getPara("time2", "");
		List<Bbs> list = Bbs.dao.find(tile, time1, time2);
		setAttr("bbsList", list);
		render("bbs-list.html");

	}

	/*
	 * 编辑
	 */
	public void edit() {

		int id = getParaToInt("id", 0);
		if (id != 0) {
			setAttr("bbs", Bbs.dao.findById(id));
		}
		render("bbs-edit.html");

	}

	/*
	 * 审核通过
	 */
	public void pass() {
		int id = getParaToInt("id", 0);
		if (id != 0) {
			Bbs bbs = Bbs.dao.findById(id);
			bbs.setIsPass(0);
			// bbs.setDelId(0);
			bbs.update();
			renderJson(true);
		}
		renderJson(false);
	}

	/*
	 * 审核未通过
	 */
	public void unPass() {
		int id = getParaToInt("id", 0);
		if (id != 0) {
			Bbs bbs = Bbs.dao.findById(id);
			if (bbs.getIsPass() != 1) {
				bbs.setIsPass(1);
				bbs.update();
				renderJson(true);
			}
		}
		renderJson(false);
	}

	/*
	 * 删除
	 */
	public void del() {
		int id = getParaToInt("id", 0);
		if (id != 0) {
			Bbs bbs = Bbs.dao.findById(id);
			// bbs.setIsDel(1);
			bbs.update();
		}
		renderJson();
	}

	/*
	 * 删除全部
	 */
	public void delall() {
		String[] names = getParaValues("arrayObj[]");
		for (String id : names) {
			Bbs bbs = Bbs.dao.findById(id);
			// bbs.setIsDel(1);
			bbs.update();
		}
		renderJson();
	}

}
