package com.szcarshop.admin.controller;

import java.util.List;

import com.demo.common.model.Column;
import com.jfinal.core.Controller;
import com.jfinal.upload.UploadFile;

public class AdminColumnController extends Controller {

	public void index() {
		List<Column> listColumn = Column.dao.findAll();
		for (Column c : listColumn) {
			if (c.getAgreement() != null) {
				setAttr("flag", 1);
			}
		}
		setAttr("columnList", listColumn);
		render("column-list.html");
	}

	public void save() {
		UploadFile file = getFile();
		Column column = getModel(Column.class);
		column.save();
		redirect("/column");
	}

	public void findColumn() {
		int id = getParaToInt("id");
		renderJson(Column.dao.findById(id));
	}

	public void edit() {
		List<Column> listColumn = Column.dao.findAll();
		setAttr("columnList", listColumn);
		setAttr("column", Column.dao.findById(listColumn.get(0).getId()));
		render("edit.html");
	}

	public void update() {
		UploadFile file = getFile();
		getModel(Column.class).update();
		redirect("/column");
	}

}
