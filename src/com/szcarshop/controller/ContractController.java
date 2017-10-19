package com.szcarshop.controller;

import com.demo.common.model.Brand;
import com.demo.common.model.Contract;
import com.demo.common.model.ContractAuthority;
import com.demo.common.model.Users;
import com.jfinal.core.Controller;
import com.jfinal.upload.UploadFile;
import com.szcarshop.service.ContractService;
import com.szcarshop.util.FileUtil;

/**
 * 
 * @author night owl
 * @category 晒合同
 */
public class ContractController extends Controller {
	
	static ContractService contractService = new ContractService();
		
	public void index() {
		setAttr("contractPage", contractService.paginate(getParaToInt(0, 1), 3));
		//setAttr("isPay", contractService.findById());
		render("contract_index.html");
	}
	/**
	 * 查看详情
	 */
	public void detail(){
		//Users u = getSessionAttr("user");
		int contractId = getParaToInt("id",0);
		Integer isPay = contractService.findIsPayGoldCoin(contractId, 1);
		if(isPay==0){
			setAttr("contract", contractService.findById(contractId));
			render("contract_pay.html");
		}else{
			setAttr("contract", contractService.findById(contractId));
			render("contract_detail.html");
		}
	}
	/**
	 * 保存
	 */
	public void save() {
		//Users u = getSessionAttr("user");
		String fileName = "";
		UploadFile file = getFile("picture");
		Contract contract = getModel(Contract.class);
		if (file != null) {
			fileName = FileUtil.move(file);
			contract.setPictureUrl(fileName);
		}
		//contract.setUserId(u.getId());
		contract.setUserId(1);
		contract.save();
		removeSessionAttr("id");
		setSessionAttr("id", contract.getId());
		redirect("/contract");
	}
	/*
	 * 跳转至合同发布页面
	 */
	public void release(){
		setAttr("brandList", Brand.dao.find());
		render("contract_release.html");
	}
	
	public void pay(){
		//Users u = getSessionAttr("user");
		int contractId = getParaToInt("id",0);
		long unlockCoin = getParaToLong("unlockCoin");
		System.out.println(unlockCoin);
		ContractAuthority contractAuthority = getModel(ContractAuthority.class);
		contractAuthority.setUserId(1);
		contractAuthority.setContractId(contractId);
		contractAuthority.setPayId(1);
		contractAuthority.save();
		//将支付的金币存入对应合同发布者
		
		removeSessionAttr("id");
		setSessionAttr("id", contractAuthority.getId());
		redirect("/contract");
	}
	
}
