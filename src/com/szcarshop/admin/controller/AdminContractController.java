package com.szcarshop.admin.controller;

import java.util.List;

import com.demo.common.model.Contract;
import com.jfinal.core.Controller;

/**
 * 
 * @author sunshine
 * @category 后台合同管理
 */
public class AdminContractController extends Controller {

	public void index() {
		setAttr("contractList", Contract.dao.find());
		render("contract-list.html");
	}
	
	/*
	 * 删除
	 */
	public void review() {
		int id = getParaToInt("id", 0);
		int status = getParaToInt("status");
		if (id != 0) {
			Contract contract = Contract.dao.findById(id);
			contract.setReviewId(status);
			contract.update();
		}
		renderJson();
	}
	/**
	 * 跳转至详情页面
	 */
	public void detail() {
		int id = getParaToInt("id", 0);
		if (id != 0) {
			Contract contract = Contract.dao.findById(id);
			setAttr("contract", contract);
		}
		render("contract-detail.html");
	}
	/**
	 * 搜索
	 */
	public void search() {
		String title = getModel(Contract.class).getTitle();
		String startDate = getPara("startDate", "");
		String endDate = getPara("endDate", "");
		List<Contract> list = Contract.dao.findByThreePara(title,startDate,endDate);
		setAttr("contractList", list);
		render("contract-list.html");
	}

}
