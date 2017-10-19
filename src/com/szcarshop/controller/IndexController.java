package com.szcarshop.controller;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.alipay.api.AlipayApiException;
import com.alipay.api.AlipayClient;
import com.alipay.api.DefaultAlipayClient;
import com.alipay.api.internal.util.AlipaySignature;
import com.alipay.api.request.AlipayTradeQueryRequest;
import com.demo.common.model.Active;
import com.demo.common.model.Bbs;
import com.demo.common.model.Brand;
import com.demo.common.model.Car;
import com.demo.common.model.Contentimg;
import com.demo.common.model.Country;
import com.demo.common.model.Displacement;
import com.demo.common.model.Drive;
import com.demo.common.model.Energy;
import com.demo.common.model.Gearbox;
import com.demo.common.model.Img;
import com.demo.common.model.Level;
import com.demo.common.model.Location;
import com.demo.common.model.Price;
import com.demo.common.model.Push;
import com.demo.common.model.Seats;
import com.demo.common.model.Set;
import com.jfinal.aop.Before;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Page;
import com.szcarshop.interceptor.IndexInterceptor;
import com.szcarshop.util.AlipayConfig;
import com.szcarshop.util.StringUtil;

/**
 * 
 * @author night owl
 * @version 1.0
 * @category 选车板块
 * 
 */
@Before(IndexInterceptor.class)
public class IndexController extends Controller {
	/*
	 * 首页
	 */
	public void index() {
		/*
		 * setAttr("shopList", Shop.dao.find()); setAttr("modelList",
		 * Model.dao.find()); setAttr("carList", Car.dao.findPrice());
		 * setAttr("leList", Level.dao.find()); setAttr("priceList",
		 * Price.dao.find()); setAttr("carHot", Carhot.dao.find());
		 * setAttr("hotList", Push.dao.find()); setAttr("brandList",
		 * Brand.dao.find()); setAttr("letterList", Brand.dao.findLetter());
		 */
		render("all.html");
	}

	public void authRedirect() {

	}

	/*
	 * 支付宝返回地址
	 */
	public void notify_url() throws UnsupportedEncodingException, AlipayApiException {
		HttpServletRequest request = getRequest();
		// 获取支付宝POST过来反馈信息
		Map<String, String> params = new HashMap<String, String>();
		Map<String, String[]> requestParams = request.getParameterMap();
		for (Iterator<String> iter = requestParams.keySet().iterator(); iter.hasNext();) {
			String name = (String) iter.next();
			String[] values = (String[]) requestParams.get(name);
			String valueStr = "";
			for (int i = 0; i < values.length; i++) {
				valueStr = (i == values.length - 1) ? valueStr + values[i] : valueStr + values[i] + ",";
			}
			// 乱码解决，这段代码在出现乱码时使用
			valueStr = new String(valueStr.getBytes("ISO-8859-1"), "utf-8");
			params.put(name, valueStr);
		}

		boolean signVerified = AlipaySignature.rsaCheckV1(params, AlipayConfig.alipay_public_key, AlipayConfig.charset,
				AlipayConfig.sign_type); // 调用SDK验证签名

		// ——请在这里编写您的程序（以下代码仅作参考）——

		/*
		 * 实际验证过程建议商户务必添加以下校验： 1、需要验证该通知数据中的out_trade_no是否为商户系统中创建的订单号，
		 * 2、判断total_amount是否确实为该订单的实际金额（即商户订单创建时的金额），
		 * 3、校验通知中的seller_id（或者seller_email)
		 * 是否为out_trade_no这笔单据的对应的操作方（有的时候，一个商户可能有多个seller_id/seller_email）
		 * 4、验证app_id是否为该商户本身。
		 */
		if (signVerified) {// 验证成功
			// 商户订单号
			String out_trade_no = new String(request.getParameter("out_trade_no").getBytes("ISO-8859-1"), "UTF-8");

			// 支付宝交易号
			String trade_no = new String(request.getParameter("trade_no").getBytes("ISO-8859-1"), "UTF-8");

			// 交易状态
			String trade_status = new String(request.getParameter("trade_status").getBytes("ISO-8859-1"), "UTF-8");

			if (trade_status.equals("TRADE_FINISHED")) {
				// 判断该笔订单是否在商户网站中已经做过处理
				// 如果没有做过处理，根据订单号（out_trade_no）在商户网站的订单系统中查到该笔订单的详细，并执行商户的业务程序
				// 如果有做过处理，不执行商户的业务程序

				// 注意：
				// 退款日期超过可退款期限后（如三个月可退款），支付宝系统发送该交易状态通知
			} else if (trade_status.equals("TRADE_SUCCESS")) {
				// 判断该笔订单是否在商户网站中已经做过处理
				// 如果没有做过处理，根据订单号（out_trade_no）在商户网站的订单系统中查到该笔订单的详细，并执行商户的业务程序
				// 如果有做过处理，不执行商户的业务程序

				// 注意：
				// 付款完成后，支付宝系统发送该交易状态通知
			}

			renderJson("success");

		} else {// 验证失败
			renderJson("fail");

			// 调试用，写文本函数记录程序运行情况是否正常
			// String sWord = AlipaySignature.getSignCheckContentV1(params);
			// AlipayConfig.logResult(sWord);
		}

		// ——请在这里编写您的程序（以上代码仅作参考）——
	}

	public void return_url() throws UnsupportedEncodingException, AlipayApiException {
		HttpServletRequest request = getRequest();
		// 获取支付宝GET过来反馈信息
		Map<String, String> params = new HashMap<String, String>();
		Map<String, String[]> requestParams = request.getParameterMap();
		for (Iterator<String> iter = requestParams.keySet().iterator(); iter.hasNext();) {
			String name = (String) iter.next();
			String[] values = (String[]) requestParams.get(name);
			String valueStr = "";
			for (int i = 0; i < values.length; i++) {
				valueStr = (i == values.length - 1) ? valueStr + values[i] : valueStr + values[i] + ",";
			}
			// 乱码解决，这段代码在出现乱码时使用
			valueStr = new String(valueStr.getBytes("ISO-8859-1"), "utf-8");
			params.put(name, valueStr);
		}

		boolean signVerified = AlipaySignature.rsaCheckV1(params, AlipayConfig.alipay_public_key, AlipayConfig.charset,
				AlipayConfig.sign_type); // 调用SDK验证签名

		// ——请在这里编写您的程序（以下代码仅作参考）——
		if (signVerified) {
			// 商户订单号
			String out_trade_no = new String(request.getParameter("out_trade_no").getBytes("ISO-8859-1"), "UTF-8");

			// 支付宝交易号
			String trade_no = new String(request.getParameter("trade_no").getBytes("ISO-8859-1"), "UTF-8");

			// 付款金额
			String total_amount = new String(request.getParameter("total_amount").getBytes("ISO-8859-1"), "UTF-8");

			renderJson(
					"trade_no:" + trade_no + "<br/>out_trade_no:" + out_trade_no + "<br/>total_amount:" + total_amount);
		} else {
			renderJson("验签失败");
		}
		// ——请在这里编写您的程序（以上代码仅作参考）——
	}

	/*
	 * 查询支付宝订单
	 */
	public void query() throws UnsupportedEncodingException, AlipayApiException {
		HttpServletRequest request = getRequest();
		// 获得初始化的AlipayClient
		AlipayClient alipayClient = new DefaultAlipayClient(AlipayConfig.gatewayUrl, AlipayConfig.app_id,
				AlipayConfig.merchant_private_key, "json", AlipayConfig.charset, AlipayConfig.alipay_public_key,
				AlipayConfig.sign_type);

		// 设置请求参数
		AlipayTradeQueryRequest alipayRequest = new AlipayTradeQueryRequest();

		// 商户订单号，商户网站订单系统中唯一订单号
		String out_trade_no = new String(request.getParameter("WIDTQout_trade_no").getBytes("ISO-8859-1"), "UTF-8");
		// 支付宝交易号
		String trade_no = new String(request.getParameter("WIDTQtrade_no").getBytes("ISO-8859-1"), "UTF-8");
		// 请二选一设置

		alipayRequest
				.setBizContent("{\"out_trade_no\":\"" + out_trade_no + "\"," + "\"trade_no\":\"" + trade_no + "\"}");

		// 请求
		String result = alipayClient.execute(alipayRequest).getBody();

		// 输出
		renderJson(result);
	}
	/*
	 * 初始化
	 */

	public void init() {
		setAttr("letterList", Brand.dao.findLetter());
		setAttr("countryList", Country.dao.find());
		setAttr("energyList", Energy.dao.find());
		setAttr("disList", Displacement.dao.find());
		setAttr("gearboxList", Gearbox.dao.find());
		setAttr("seatsList", Seats.dao.find());
		setAttr("driveList", Drive.dao.find());
		setAttr("setList", Set.dao.find());
		setAttr("brandList", Brand.dao.find());
		setAttr("priceList", Price.dao.find());
		setAttr("levelList", Level.dao.find());
		setAttr("pushList", Push.dao.find());
		setAttr("hotBrand", Brand.dao.findHotIndex());
	}

	// 分类页面
	public void list() {
		init();
		String init = "del_id=0 ";
		StringBuilder sql = new StringBuilder();
		sql.append(init);
		// 地区
		int location_id = getParaToInt("location_id", 0);
		if (location_id != 0) {
			sql.append("and location_id=" + location_id + " ");
		}

		// 品牌id
		int id = getParaToInt("id", 1);
		if (id != 1) {
			sql.append("and id=" + id + " ");
		}
		// 分页
		int pageNum = getParaToInt("page", 1);
		// 品牌条件
		int brand_id = getParaToInt("brand_id", 0);
		if (brand_id != 0) {
			sql.append("and brand_id=" + brand_id + " ");
		}
		// 价格
		int price = getParaToInt("price", 0);
		if (price != 0) {
			sql.append("and brand_id=" + brand_id + " ");
		}
		// 级别
		int level_id = getParaToInt("level_id", 0);
		if (level_id != 0) {
			sql.append("and level_id=" + level_id + " ");
		}
		int price_id = getParaToInt("price_id", 0);
		if (price_id != 0) {
			sql.append("and price_id=" + price_id + " ");
		}

		int cid = getParaToInt("cid", 0);
		if (cid != 0) {
			sql.append("and cid=" + cid + " ");
		}

		int energ_id = getParaToInt("energ_id", 0);
		if (energ_id != 0) {
			sql.append("and energ_id=" + energ_id + " ");
		}

		int dis_id = getParaToInt("dis_id", 0);
		if (dis_id != 0) {
			sql.append("and dis_id=" + dis_id + " ");
		}
		int gearbox_id = getParaToInt("gearbox_id", 0);
		if (gearbox_id != 0) {
			sql.append("and gearbox_id=" + gearbox_id + " ");
		}
		int drive_id = getParaToInt("drive_id", 0);
		if (drive_id != 0) {
			sql.append("and drive_id=" + drive_id + " ");
		}

		int seats_id = getParaToInt("seats_id", 0);
		if (seats_id != 0) {
			sql.append("and seats_id=" + seats_id + " ");
		}

		String set_id = getPara("set_id", "");
		if (!set_id.isEmpty()) {
			// 获取用户选择的配置
			List<Integer> setList = StringUtil.getEnumtion(set_id);
			if (setList.size() > 1) {
				sql.append("and (");
			}
			for (Integer s : setList) {
				if (setList.size() == 1) {
					sql.append("and INSTR(set_id, '" + s + "')>0 ");
				} else {
					sql.append("INSTR(set_id, '" + s + "')>0 or ");
				}
			}
			if (setList.size() > 1) {
				sql.append("1<>1 )");
			}
			setAttr("selectSetList", setList);

		}
		setAttr("set_id", set_id);
		setAttr("seats_id", seats_id);
		setAttr("drive_id", drive_id);
		setAttr("gearbox_id", gearbox_id);
		setAttr("energ_id", energ_id);
		setAttr("brand_id", brand_id);
		setAttr("price_id", price_id);
		setAttr("level_id", level_id);
		setAttr("brand_id", brand_id);
		setAttr("location_id", location_id);
		setAttr("cid", cid);
		setAttr("dis_id", dis_id);
		setAttr("page", pageNum);
		Page<Car> pageList = Car.dao.findBySeries(pageNum, sql.toString(), "c.series_id");
		setAttr("carList", pageList);
		render("ca.html");
	}

	// 详细页面
	public void single() {
		int id = getParaToInt("id", 0);
		if (id != 0) {
			Car car = Car.dao.findCarById(id);
			// 根据car.id 查找所有的年款
			setAttr("findYearBySeriesId", Car.dao.find(car.getBrandId(), car.getSeriesId(), "years_id"));
			setAttr("findYearByCarmodelId",
					Car.dao.find(car.getBrandId(), car.getSeriesId(), car.getYearsId(), "carmodel_id"));
			setAttr("car", car);
			setAttr("imgList", Img.dao.find(id));
			setAttr("contentimgList", Contentimg.dao.find(id));
			setAttr("serises", Car.dao.find(car.getBrandId(), car.getSeriesId(), car.getYearsId(), "carmodel_id"));
			setAttr("countryList", Location.dao.find());
			setAttr("pushList", Push.dao.find());
			setAttr("pricePush", Car.dao.findPrice(car.getGuidePrice()));
			setAttr("activeList", Active.dao.find(car.getBrandId()));
			// 查询此系列评交流感受
			setAttr("bbsList", Bbs.dao.findByCarId(car.getId()));
		}
		render("sigle.html");
	}

}
