package com.szcarshop.controller;

import com.demo.common.model.Active;
import com.demo.common.model.Brand;
import com.demo.common.model.TeamImg;
import com.jfinal.core.Controller;

/**
 * 
 * @author night owl
 * @category 团购
 * @serial 0.1
 */
public class TeamController extends Controller {
	public void index() {
		setAttr("imgList", TeamImg.dao.find());
		setAttr("activeList", Active.dao.find());
		setAttr("brandHotList", Brand.dao.findHot());
		render("index.html");
	}

	public void single() {
		int id = getParaToInt("id", 0);
		setAttr("active", Active.dao.findById(id));
		render("single.html");
	}

}
