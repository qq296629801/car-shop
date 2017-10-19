package com.szcarshop.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import com.demo.common.model.Car;
import com.demo.common.model.City;
import com.demo.common.model.Color;
import com.demo.common.model.Order;
import com.demo.common.model.Users;
import com.jfinal.core.Controller;
import com.jfinal.kit.Ret;

/**
 * 
 * @author yemao
 * @category 订单管理
 * @serial 0.1
 */
public class OrderController extends Controller {

	public void index() {
		Users u = getSessionAttr("user");
		if (u != null) {
			List<Order> listOrder = Order.dao.find(u.getId());
			setAttr("listOrder", listOrder);
			setAttr("newNum", Order.dao.findNumByTime(u.getId()));
		}
		render("order.html");
	}

	public void get() {
		render("get.html");
	}

	public void cancer() {
		renderJson("msg", "取消成功！");
	}

	// 提交订单
	public void orderSubmit() {
		int id = getParaToInt("id", 0);
		if (id != 0) {
			setAttr("citys", City.dao.find());
			setAttr("car", Car.dao.findCarById(id));
			setAttr("colors", Color.dao.find());
		}
		render("order-submit.html");
	}

	// 获取订单数据
	public void saveOrder() {
		Order o = new Order();
		o.setColorId(getParaToInt("k1"));
		o.setBuyStyle(getPara("k2"));
		o.setBuyTime(getPara("k3"));
		o.setGuidance(getPara("k4"));
		o.setName(getPara("k5"));
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		o.setSubmitTime(sdf.format(new Date()));
		Integer car_id = getParaToInt("k7");
		o.setCityId(getParaToInt("k6"));
		o.setCarId(car_id);
		int user_id = getParaToInt("k8", 0);
		o.setUserId(user_id);
		o.setDelId(0);
		Ret ret = null;
		if (user_id == 0) {
			ret = Ret.create("status", "FAIL");
			ret.set("msg", "请登陆以后下单！");
		}
		// 通过汽车id查询是否存在

		if (Order.dao.findById(car_id, user_id) == null && user_id != 0) {
			o.save();
			ret = Ret.create("status", "SUCCES");
		} else {
			ret = Ret.create("status", "REP");
			ret.set("msg", "请勿重复下单");
		}

		renderJson(ret);

	}

	/*
	 * 
	 * 订单管理
	 */
	public void buy() {
		render("buy.html");
	}
}
