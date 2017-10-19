package com.szcarshop.admin.controller;

import com.demo.common.model.Admin;
import com.jfinal.aop.Before;
import com.jfinal.aop.Clear;
import com.jfinal.captcha.CaptchaRender;
import com.jfinal.core.Controller;
import com.szcarshop.interceptor.AdminInterceptor;

/**
 * 
 * @author night owl @category
 */
@Before(AdminInterceptor.class)
public class AdminController extends Controller {

	public void index() {
		render("index.html");
	}

	public void welcome() {

		setAttr("adminList", Admin.dao.find());
		render("welcome.html");
	}

	/*
	 * 登录
	 */
	@Clear(AdminInterceptor.class)
	public void login() {
		Admin admin = Admin.dao.find(getModel(Admin.class));
		if (admin != null) {
			setSessionAttr("admin", admin);
			redirect("/admin");
		} else {
			render("login.html");
		}
	}

	/*
	 * 验证码
	 */
	@Clear(AdminInterceptor.class)
	public void img() {
		CaptchaRender img = new CaptchaRender();
		render(img);
	}

	/*
	 * 展示管理员
	 */
	public void list() {
		setAttr("adminList", Admin.dao.find());
		render("admin-role.html");
	}

	/*
	 * 删除管理员
	 */
	public void del() {
		int id = getParaToInt("id");
		renderJson(Admin.dao.deleteById(id));
	}

	/*
	 * 获取验证码
	 */
	@Clear(AdminInterceptor.class)
	public void getRandomCode() {
		String inputRandomCode = getPara("inputRandomCode");
		boolean loginSuccess = CaptchaRender.validate(this, inputRandomCode.toUpperCase());
		String json = "";
		if (loginSuccess) {
			json = "{\"name\":1}";
		} else {
			json = "{\"name\":0}";
		}
		renderJson(json);
	}
}
