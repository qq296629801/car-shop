package com.demo.common.model;

import java.util.List;

import com.demo.common.model.base.BaseYears;

/**
 * Generated by JFinal.
 */
@SuppressWarnings("serial")
public class Years extends BaseYears<Years> {
	public static final Years dao = new Years().dao();

	public List<Years> find() {
		String sql = "select * from years";
		return Years.dao.find(sql);
	}
}
