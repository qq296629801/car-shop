package com.szcarshop.controller;

import com.demo.common.model.Bbs;
import com.jfinal.core.Controller;

/**
 * @category 车交流平台
 * @author mjy
 *
 */
public class BBsController extends Controller {
	public void index() {
		int pageNumber = getParaToInt("page", 1);
		setAttr("bbsList", Bbs.dao.find(pageNumber));
		render("category.html");
	}

	public void single() {
		int id = getParaToInt("id", 0);
		setAttr("bbs", Bbs.dao.findById(id));
		render("single.html");
	}
}
