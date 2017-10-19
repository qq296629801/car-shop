package com.szcarshop.admin.controller;

import com.demo.common.model.Admin;
import com.demo.common.model.Model;
import com.demo.common.model.Shop;
import com.jfinal.core.Controller;

public class AdminShopBusinessController extends Controller {

	public void index() {
		Admin admin = getSessionAttr("admin");
		int modelId = getParaToInt("model_id", 0);
		setAttr("models", Model.dao.find());
		setAttr("shopList", Shop.dao.findBusiness(modelId, admin.getUserName()));
		render("shop-business-list.html");
	}
}
