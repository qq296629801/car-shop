package com.demo.common.model;

import java.util.List;

import com.demo.common.model.base.BaseImg;

/**
 * Generated by JFinal.
 */
@SuppressWarnings("serial")
public class Img extends BaseImg<Img> {
	public static final Img dao = new Img().dao();

	public List<Img> find(Integer id) {
		String sql = "select * from img where car_id=" + id;
		return Img.dao.find(sql);
	}

}
