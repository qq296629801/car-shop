package com.szcarshop.controller;

import java.util.ArrayList;

import com.demo.common.Const;
import com.demo.common.model.Img;
import com.demo.common.model.Keymap;
import com.demo.common.model.Model;
import com.demo.common.model.Shop;
import com.jfinal.core.Controller;
import com.szcarshop.util.StringUtil;

/**
 * 
 * @author night owl
 * @category 车载配件
 * @serial v0.1
 *
 */
public class ShopController extends Controller {
	public void index() {
		setAttr("models", Model.dao.find());
		setAttr("keyValues", Keymap.dao.find());
		render("index_shop.html");
	}

	public void list() {
		int id = getParaToInt("id", 0);
		if (id != 0) {
			setAttr("id", id);
			setAttr("model", Model.dao.findById(id));
		}
		if (Const.keys.isEmpty()) {
			Const.keys = Keymap.dao.findByModel_id(id);
		}
		Integer key = getParaToInt("key", 0); // 分类
		if (key != 0) {
			Keymap newKey = Keymap.dao.findById(key);
			if (!Const.keyCurr.contains(newKey)) {
				Const.keyCurr.add(newKey);
				for (Keymap k : Const.keys) {
					if (k.getName().equals(newKey.getName())) {
						Const.keys = StringUtil.compan2(Const.keys, k);
					}
				}
			}
		} else {
			Const.keyCurr = new ArrayList<Keymap>();
			Const.keys = Keymap.dao.findByModel_id(id);
		}
		setAttr("keyAll", Keymap.dao.findByModel_id(id));
		setAttr("keys", Const.keyCurr);
		setAttr("models", Model.dao.find());// 显示所有的部分
		setAttr("keyMapNameBottom", Keymap.dao.findNameNum(id, 5, 100));// 只显示5个
		setAttr("keyMapNameTop", Keymap.dao.findNameNum(id, 0, 5));// 剩下的部分
		setAttr("keyMaps", Const.keys);
		StringBuilder sql = new StringBuilder();
		sql.append("s.model_id=" + id + " ");
		if (Const.keyCurr.size() > 1) {
			sql.append("and (");
		}
		for (Keymap k : Const.keyCurr) {
			if (Const.keyCurr.size() == 1) {
				sql.append("and INSTR(s.key_id, '(" + k.getId() + ")')>0 ");
			} else {
				sql.append("INSTR(s.key_id, '(" + k.getId() + ")')>0 or ");
			}
		}
		if (Const.keyCurr.size() > 1) {
			sql.append("1<>1 )");
		}
		// 排序
		int page = getParaToInt("page", 1);
		setAttr("shopList", Shop.dao.find(sql.toString(), page));
		render("category.html");
	}

	public void single() {
		int id = getParaToInt("id", 1);
		setAttr("imgList", Img.dao.find(id));
		render("single.html");
	}
}
