package com.szcarshop.interceptor;

import java.util.List;

import com.demo.common.model.Column;
import com.demo.common.model.Location;
import com.demo.common.model.Order;
import com.demo.common.model.Users;
import com.jfinal.aop.Interceptor;
import com.jfinal.aop.Invocation;
import com.jfinal.core.Controller;

public class IndexInterceptor implements Interceptor {

	@Override
	public void intercept(Invocation inv) {
		// TODO Auto-generated method stub
		Controller con = inv.getController();
		List<Location> locationList = Location.dao.find();
		List<Column> column = Column.dao.findAll();
		Users u = con.getSessionAttr("user");
		if (u != null) {
			con.setAttr("unum", Order.dao.findNum(u.getId()));

		}
		con.setAttr("columnList", column);
		con.setAttr("locationList", locationList);
		inv.invoke();
	}

}
