package com.szcarshop.controller;

import com.demo.common.model.Column;
import com.demo.common.model.Post;
import com.jfinal.core.Controller;

/**
 * 
 * @author yeamo
 * @category 帮助中心模块
 *
 */
public class HelpController extends Controller {
	public void index() {
		int cid = getParaToInt("cid", 1);
		setAttr("cname", Column.dao.findById(cid).getName());
		setAttr("post", Post.dao.findByCid(cid));
		setAttr("columnList", Column.dao.findAll());
		render("help.html");
	}
}
