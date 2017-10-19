package com.szcarshop.admin.controller;

import java.io.File;
import java.util.List;

import com.demo.common.model.Active;
import com.demo.common.model.Brand;
import com.demo.common.model.TeamImg;
import com.jfinal.core.Controller;
import com.jfinal.kit.PathKit;
import com.jfinal.upload.UploadFile;
import com.szcarshop.util.DateUtil;
import com.szcarshop.util.FileUtil;

/**
 * 
 * @author night owl
 *
 */
public class AdminTeamController extends Controller {
	public void index() {
		setAttr("activeList", Active.dao.find());
		render("list.html");
	}

	public void imglist() {
		setAttr("imgList", TeamImg.dao.find());
		render("img.html");
	}

	public void apply() {
		render("apply.html");
	}

	public void show() {
		render("show.html");
	}

	public void add() {
		setAttr("brandList", Brand.dao.find());
		render("add.html");
	}

	public void edit() {
		render("edit.html");
	}

	public void update() {
		render("upadte.html");
	}

	public void save() {
		UploadFile file = getFile("file");
		String fileName = "";
		if (file.getFile().exists()) {
			fileName = FileUtil.move(file);
		}
		Active active = getModel(Active.class);
		String status = getPara("status", "");
		if (status.contains("on")) {
			active.setStatus(1);
		}
		active.setStartTime(DateUtil.getTime());
		active.setEndTime(DateUtil.getTime());
		active.setUrl(fileName);
		active.save();
		redirect("/active");
	}

	public void upload() {
		String fileName = "";
		UploadFile file = getFile();
		TeamImg img = new TeamImg();
		fileName = FileUtil.move(file, "team");
		img.setUrl(fileName);
		img.save();
		renderJson("fileName", fileName);
	}

	public void del() {
		int id = getParaToInt("id", 0);
		if (id != 0) {
			TeamImg img = TeamImg.dao.findById(id);
			File file2 = new File(PathKit.getWebRootPath() + "/img/team/" + img.getUrl());
			if (file2 != null) {
				if (file2.exists()) {
					file2.delete();
				}
			}
			TeamImg.dao.deleteById(id);
		}
		redirect("/active/imglist");
	}

	public void delete() {
		List<TeamImg> listAll = TeamImg.dao.find();
		for (TeamImg img : listAll) {
			img.delete();
			File file2 = new File(PathKit.getWebRootPath() + "/team/u/" + img.getUrl());
			if (file2.exists()) {
				file2.delete();
			}
		}
	}
}
