package com.szcarshop.controller;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.demo.common.Const;
import com.demo.common.model.City;
import com.demo.common.model.Users;
import com.jfinal.aop.Before;
import com.jfinal.captcha.CaptchaRender;
import com.jfinal.core.Controller;
import com.szcarshop.interceptor.IndexInterceptor;
import com.szcarshop.util.MD5Util;
import com.szcarshop.util.SmsUtil;

/**
 * 
 * @author night owl
 * @category 用户
 */
@Before(IndexInterceptor.class)
public class UserController extends Controller {

	public void index() {
		render("login.html");
	}

	/*
	 * 个人资料修改
	 */

	public void my() {
		Users u = getSessionAttr("user");
		if (u != null) {
			List<City> list = City.dao.find();
			Users u2 = Users.dao.findById(u.getId());// id数字
			removeSessionAttr("user");
			setSessionAttr("user", u2);
			City c = City.dao.findById(u2.getCityId()); // 天河
			City c2 = City.dao.findById(c.getPid());// 广州
			City c3 = City.dao.findById(c2.getPid());// 广东
			setAttr("c3", c3);
			setAttr("c2", c2);
			setAttr("c", c);
			setAttr("citys", list);
			setAttr("user", u2);
		}
		render("my.html");
	}

	public void logout() {
		removeSessionAttr("user");
		renderJson(true);
	}

	public void img() {
		CaptchaRender img = new CaptchaRender();
		render(img);
	}

	public void login() {
		String inputRandomCode = getPara("inputRandomCode", "0000");
		boolean loginSuccess = CaptchaRender.validate(this, inputRandomCode.toUpperCase());
		String user_name = getPara("user_name");
		String pwd = getPara("pwd");
		Users user = new Users();
		user.setUserName(user_name);
		user.setUserPass(MD5Util.string2MD5(pwd));
		// 登录
		Users u = Users.dao.find(user);
		if ((u != null && inputRandomCode.equals("0000")) || (u != null && loginSuccess)) {
			setSessionAttr("user", u);
			renderJson(u);
		} else {
			renderJson(false);
		}
	}

	public void retrieve() {
		render("retrieve.html");
	}

	public void send() {
		String phone = getPara("phone", "1");
		String msg = "";
		String code = SmsUtil.getRandNum(4);
		if (!phone.equals("1")) {
			msg = SmsUtil.sendCode(phone, code);
			Const.code = code;
		}
		renderJson(msg);
	}

	public void findUserName() {
		String userName = getPara("userName");
		if (Users.dao.findUser_name(userName)) {
			renderJson(true);
		} else {
			renderJson(false);
		}
	}

	public void reg() {
		String phone = getPara("phone");
		String pwd = getPara("pwd");
		String nickName = getPara("nick_name");
		String user_name = getPara("user_name");
		String code = getPara("code");
		Users user = new Users();
		user.setPhone(phone);
		user.setUserName(user_name);
		user.setUserPass(MD5Util.string2MD5(pwd));
		user.setNickName(nickName);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:SS");
		user.setCreateTime(sdf.format(new Date()));
		user.setCityId(39);
		if (!Users.dao.findUser_name(user.getUserName()) && code.equals(Const.code)) {
			user.save();
			renderJson(true);
		} else {
			renderJson(false);
		}
	}

	public void GetAreaService() throws IOException {
		int pid = getParaToInt("aid", 0);
		int type = getParaToInt("type", 0);
		List<City> list = new ArrayList<City>();
		if (type == 1) {
			list = City.dao.find();
		} else if (type == 2) {
			list = City.dao.findByPid(pid);
		}
		renderJson(list);
	}

	public void ModifyUser() {
		String jsonString = "";
		String name = getPara("name");
		String phone = getPara("mobile");
		int aid = getParaToInt("aid", 0);
		int id = getParaToInt("id");
		if (!name.isEmpty() && !phone.isEmpty() && aid != 0) {
			Users u = new Users();
			u.setId(id);
			u.setNickName(name);
			u.setPhone(phone);
			u.setCityId(aid);
			if (u.update()) {
				jsonString = "{\"Status\":\"1\",\"Msg\":\"修改成功\"}";
			} else {
				jsonString = "{\"Status\":\"0\",\"Msg\":\"error\"}";
			}
		}
		renderJson(jsonString);
	}

	public void ModifyPwd() {
		String jsonString = "";
		String np = getPara("np");
		String op = getPara("op");
		Users u = getSessionAttr("user");
		if (u != null) {
			if (MD5Util.string2MD5(op).equals(u.getUserPass())) {
				u.setUserPass(MD5Util.string2MD5(np));
				u.update();
				jsonString = "{\"Status\":\"1\",\"Msg\":\"修改成功\"}";
			} else {
				jsonString = "{\"Status\":\"-33\",\"Msg\":\"密码错误\"}";
			}

		} else {
			jsonString = "{\"Status\":\"-44\",\"Msg\":\"其他原因\"}";
		}
		renderJson(jsonString);
	}
}
