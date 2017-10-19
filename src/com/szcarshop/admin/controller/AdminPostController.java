package com.szcarshop.admin.controller;

import java.text.SimpleDateFormat;
import java.util.Date;

import com.demo.common.model.Column;
import com.demo.common.model.Post;
import com.jfinal.core.Controller;
import com.jfinal.upload.UploadFile;

public class AdminPostController extends Controller {
	public void index() {
		setAttr("postList", Post.dao.findAll());
		render("product-list.html");
	}

	public void add() {
		setAttr("columnList", Column.dao.findAll());
		render("product-add.html");
	}

	public void save() {
		UploadFile file = this.getFile();
		String post_flag = getPara("post_flag", "");
		Post post = getModel(Post.class);
		if (Post.dao.findByCid(post.getCid()) == null) {
			if (post_flag.equals("on")) {
				post.setFlag(1);
			} else {
				post.setFlag(0);
			}
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			post.setTime(sdf.format(new Date()));
			post.save();
		}
		redirect("/post");
	}

}
