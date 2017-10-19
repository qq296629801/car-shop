package com.szcarshop.service;

import com.demo.common.model.Contract;
import com.jfinal.plugin.activerecord.Page;
/**
 * 
 * @author sunshine
 */
public class ContractService {
	/**
	 * 所有的 dao 对象也放在 Service 中
	 */
	private static final Contract dao = new Contract().dao();
	
	public Page<Contract> paginate(int pageNumber, int pageSize) {
		String select = "SELECT c.*,u.nick_name,b.name brand_name ";
		String sqlExceptSelect = " FROM contract c "+
					"LEFT JOIN users u ON u.id = c.user_id "+
					"LEFT JOIN brand b ON b.id = c.brand_id "+
					" where c.review_id = 1 ORDER BY c.share_date DESC";
		Page<Contract> cPage = (Page<Contract>) dao.paginate(pageNumber, pageSize, select,sqlExceptSelect);
		return cPage;
	}
	public Contract findById(int id){
		return dao.findById(id);
	}
	public Integer findIsPayGoldCoin(Integer contractId,Integer userId){
		return dao.findIsPayGoldCoin(contractId,userId);
	}
}
