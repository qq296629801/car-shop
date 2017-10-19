package com.szcarshop.admin.controller;

import com.demo.common.model.Order;
import com.jfinal.core.Controller;

/**
 * 
 * @author night owl
 * @category 后台订单管理
 */
public class AdminOrderController extends Controller {

	public void index() {
		setAttr("orderList", Order.dao.find());
		render("product-list.html");
	}
}
