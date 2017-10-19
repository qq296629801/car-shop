package com.szcarshop.interceptor;

import com.demo.common.model.Admin;
import com.jfinal.aop.Interceptor;
import com.jfinal.aop.Invocation;
import com.jfinal.core.Controller;

public class AdminInterceptor implements Interceptor {

	@Override
	public void intercept(Invocation inv) {
		// TODO Auto-generated method stub
		Controller con = inv.getController();
		Admin admin = con.getSessionAttr("admin");
		if (admin != null) {
			inv.invoke();
		} else {
			con.render("login.html");
		}
	}

}
