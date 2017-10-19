package com.szcarshop.interceptor;

import com.demo.common.model.Users;
import com.jfinal.aop.Interceptor;
import com.jfinal.aop.Invocation;
import com.jfinal.core.Controller;

public class UserInterceptor implements Interceptor {

	@Override
	public void intercept(Invocation inv) {
		// TODO Auto-generated method stub
		Controller con = inv.getController();
		Users u = con.getSessionAttr("user");
		if (u != null) {
			inv.invoke();
		} else {
			con.redirect("/user");
		}
	}

}
