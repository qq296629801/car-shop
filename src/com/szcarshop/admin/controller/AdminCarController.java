package com.szcarshop.admin.controller;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.demo.common.model.Active;
import com.demo.common.model.Admin;
import com.demo.common.model.Brand;
import com.demo.common.model.Car;
import com.demo.common.model.Carmodels;
import com.demo.common.model.Color;
import com.demo.common.model.Contentimg;
import com.demo.common.model.Country;
import com.demo.common.model.Displacement;
import com.demo.common.model.Drive;
import com.demo.common.model.Energy;
import com.demo.common.model.Gearbox;
import com.demo.common.model.Img;
import com.demo.common.model.Level;
import com.demo.common.model.Location;
import com.demo.common.model.Seats;
import com.demo.common.model.Serie;
import com.demo.common.model.Set;
import com.demo.common.model.Years;
import com.jfinal.aop.Before;
import com.jfinal.core.Controller;
import com.jfinal.kit.PathKit;
import com.jfinal.kit.Ret;
import com.jfinal.upload.UploadFile;
import com.szcarshop.interceptor.AdminInterceptor;
import com.szcarshop.util.FileUtil;
import com.szcarshop.util.StringUtil;

/**
 * 
 * @author night owl
 *
 */
@Before(AdminInterceptor.class)
public class AdminCarController extends Controller {

	public void index() {
		Admin admin = getSessionAttr("admin");
		int location_id = getParaToInt("location_id", 0);
		int brand_id = getParaToInt("brand_id", 0);

		List<Car> list = new ArrayList<Car>();
		if (location_id != 0 && brand_id != 0) {
			list = Car.dao.find(location_id, brand_id, admin);
		} else if (location_id != 0 && brand_id == 0) {
			list = Car.dao.find(location_id, admin);
		} else {
			list = Car.dao.find(admin);
		}
		setAttr("carList", list);
		setAttr("brandList", Brand.dao.find());
		setAttr("locationList", Location.dao.find());
		render("product-list.html");
	}

	/*
	 * 跳转到类别页面
	 */
	public void cloumnAdd() {
		init();
		render("model-add.html");
	}

	public void search() {
		Admin admin = getSessionAttr("admin");
		String name = getModel(Car.class).getName();
		String time1 = getPara("time1", "");
		String time2 = getPara("time2", "");
		List<Car> list = Car.dao.find(name, time1, time2, admin);
		setAttr("carList", list);
		setAttr("brandList", Brand.dao.find());
		setAttr("locationList", Location.dao.find());
		render("product-list.html");
	}

	/*
	 * 删除
	 */
	public void del() {
		int id = getParaToInt("id", 0);
		if (id != 0) {
			Car car = Car.dao.findById(id);
			car.setDelId(2);
			car.update();
		}
		renderJson();
	}

	/*
	 * 删除全部
	 */
	public void delall() {
		String[] names = getParaValues("arrayObj[]");
		for (String id : names) {
			Car car = Car.dao.findById(id);
			car.setDelId(2);
			car.update();
		}
		renderJson();
	}

	public void down() {
		int id = getParaToInt("id", 0);
		if (id != 0) {
			Car car = Car.dao.findById(id);
			if (car.getDelId() != 1) {
				car.setDelId(1);
				car.update();
				renderJson(true);
			}
		}
		renderJson(false);
	}

	public void up() {
		int id = getParaToInt("id", 0);
		if (id != 0) {
			Car car = Car.dao.findById(id);
			car.setDelId(0);
			car.update();
			renderJson(true);
		}
		renderJson(false);
	}

	public void edit() {
		int id = getParaToInt("id", 0);
		if (id != 0) {
			init();
			Car car = Car.dao.findById(id);
			if (car.getGuidePrice() != null && car.getRealPrice() != null) {
				car.setSelPrice(car.getGuidePrice().subtract(car.getRealPrice()));
			}
			if (car.getSetId() != null) {
				// 取car里面的set_ID
				List<Integer> list = StringUtil.getEnumtion(car.getSetId());
				// 将id转成set值
				List<Set> list1 = new ArrayList<Set>();
				// 将set值放进list1 z这样就拿到了选中的值
				for (Integer a : list) {
					list1.add(Set.dao.findById(a));
				}
				List<Set> list2 = Set.dao.find();
				System.out.println(StringUtil.compan(list1, list2));
				// 这里是求差把所有的值和选中的值求差
				setAttr("set1", StringUtil.compan(list1, list2));
				setAttr("set2", list1);
			}
			setAttr("car", car);
		}
		render("product-update.html");
	}

	public void init() {
		setAttr("setList", Set.dao.find());
		setAttr("driveList", Drive.dao.find());
		setAttr("seatsList", Seats.dao.find());
		setAttr("gearboxList", Gearbox.dao.find());
		setAttr("displacementList", Displacement.dao.find());
		setAttr("energyList", Energy.dao.find());
		setAttr("locationList", Location.dao.find());
		setAttr("brandList", Brand.dao.find());
		setAttr("yearsList", Years.dao.find());
		setAttr("carmodelList", Carmodels.dao.find(1));
		setAttr("countryList", Country.dao.find());
		setAttr("activeList", Active.dao.find());
		setAttr("colorList", Color.dao.find());
		setAttr("levelList", Level.dao.find());
	}

	public void findSeriesByBrandId() {
		int brand_id = getParaToInt("id");
		renderJson(Serie.dao.find(brand_id));
	}

	public void add() {
		init();
		render("product-add.html");
	}

	public void save() {
		Admin admin = getSessionAttr("admin");
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String fileName = "";
		UploadFile file = getFile("fengmiantu");
		Car car = getModel(Car.class);
		car.setSelPrice(car.getGuidePrice().subtract(car.getRealPrice()));
		if (file != null) {
			fileName = FileUtil.move(file);
			car.setUrl(fileName);
		}
		car.setCreateTime(sdf.format(new Date()));
		// 多选按钮 配置
		String[] sets = getParaValues("set_id");
		if (sets != null) {
			StringBuilder str = new StringBuilder();
			for (String s : sets) {
				str.append(s);
				str.append(",");
			}
			car.setSetId(str.toString());
		}
		if (getPara("team_flag", "").equals("on")) {
			car.setTeamId(1);
		} else {
			car.setTeamId(0);
		}
		car.setDelId(0);
		car.setUserId(admin.getId());
		car.save();
		removeSessionAttr("id");
		setSessionAttr("id", car.getId());
		render("product-img-Carousel.html");
	}

	public void official() {
		render("product-img-Official.html");
	}

	@SuppressWarnings("unchecked")
	public void ueupload() {
		if ("config".equals(getPara("action"))) {
			// 这里千万注意 "config.json" 文件前方的目录一定要正确
			render("/lib/ueditor/1.4.3/jsp/config.json");
			return;
		}
		// "upfile" 来自 config.json 中的 imageFieldName 配置项
		if (!getPara("action").equals("listimage")) {
			UploadFile uf = getFile("upfile");
			String fileName = FileUtil.move(uf);
			String[] typeArr = fileName.split("\\.");
			Ret ret = Ret.create("state", "SUCCESS");
			ret.put("url", "/img/u/" + fileName);
			ret.put("title", fileName);
			ret.put("original", uf.getOriginalFileName());
			ret.put("type", "." + typeArr[1]);
			ret.put("size", uf.getFile().length());
			renderJson(ret);
		} else if ("uploadvideo".equals(getPara("action"))) {
			System.out.println("video");
		} else {
			List<Contentimg> list = Contentimg.dao.find();
			Ret ret = Ret.create("state", "SUCCESS");
			ret.put("start", "0");
			ret.put("total", "20");
			List<Ret> l = new ArrayList<Ret>();
			for (Contentimg i : list) {
				Ret a = Ret.create("url", "/img/u/" + i.getUrl());
				a.put("length", list.size());
				l.add(a);
			}
			ret.put("list", l);
			renderJson(ret);
		}
	}

	public void upload() {
		int id = getSessionAttr("id");
		String fileName = "";
		if (id != 0) {
			UploadFile file = getFile();
			Img img = new Img();
			img.setCarId(id);
			fileName = FileUtil.move(file);
			img.setUrl(fileName);
			img.save();
		}
		renderJson("fileName", fileName);
	}

	public void upcontimg() {
		render("product-img-add2.html");
	}

	public void upload2() {
		int id = getSessionAttr("id");
		String fileName = "";
		if (id != 0) {
			UploadFile file = getFile();
			Contentimg img = new Contentimg();
			img.setCarId(id);
			fileName = FileUtil.move(file);
			img.setUrl(fileName);
			img.save();
		}
		renderJson("fileName", fileName);
	}

	public void carmodel() {
		int series_id = getParaToInt("id", 0);
		List<Carmodels> list = new ArrayList<Carmodels>();
		if (series_id != 0) {
			list = Carmodels.dao.find(series_id);
		}
		renderJson(list);
	}

	public void update() {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String fileName = "";
		UploadFile file = getFile("fengmiantu");
		Car car = getModel(Car.class);
		// 多选按钮 配置
		String[] sets = getParaValues("set_id");
		if (sets != null) {
			StringBuilder str = new StringBuilder();
			for (String s : sets) {
				str.append(s);
				str.append(",");
			}
			car.setSetId(str.toString());
		}

		String team_id = getPara("team_id", "no");
		car.setUpdateTime(sdf.format(new Date()));
		if (team_id.equals("on")) {
			car.setTeamId(1);
		} else {
			car.setTeamId(0);
		}
		if (file != null) {
			fileName = FileUtil.move(file);
			car.setUrl(fileName);
		}
		car.update();
		Integer id = car.getId();
		List<Img> list = Img.dao.find(id);
		if (list != null) {
			for (Img i : list) {
				Img.dao.deleteById(i.getId());
				File file2 = new File(PathKit.getWebRootPath() + "/img/u/" + i.getUrl());
				if (file2 != null) {
					if (file2.exists()) {
						file2.delete();
					}
				}

			}
		}
		setSessionAttr("id", id);
		render("product-img-Carousel.html");
	}

	/*
	 * 地区添加
	 */

	public void valueSave0() {
		String value = getPara("value");
		Location l = new Location();
		l.setName(value);
		l.save();
		renderJson("value", 1);
	}

	/*
	 * xxxx删除
	 */
	public void valueDel0() {
		int id = getParaToInt("id");
		Location.dao.deleteById(id);
		renderJson("value", 1);
	}

	/*
	 * 地区更改
	 */
	public void valueUpdate0() {
		int id = getParaToInt("id");
		String value = getPara("value");
		Location l = new Location();
		l.setName(value);
		l.setId(id);
		l.update();
		renderJson("value", 1);
	}

	/*
	 * 颜色添加
	 */
	public void valueSave1() {
		String value = getPara("value");
		Color l = new Color();
		l.setName(value);
		l.save();
		renderJson("value", 1);
	}

	/*
	 * xxxx删除
	 */
	public void valueDel1() {
		int id = getParaToInt("id");
		Color.dao.deleteById(id);
		renderJson("value", 1);
	}

	/*
	 * 颜色修改
	 */
	public void valueUpdate1() {
		int id = getParaToInt("id");
		String value = getPara("value");
		Color l = new Color();
		l.setId(id);
		l.setName(value);
		l.update();
		renderJson("value", 1);
	}

	/*
	 * 类型添加
	 */
	public void valueSave2() {
		String value = getPara("value");
		Level l = new Level();
		l.setName(value);
		l.save();
		renderJson("value", 1);
	}

	/*
	 * xxxx删除
	 */
	public void valueDel2() {
		int id = getParaToInt("id");
		Level.dao.deleteById(id);
		renderJson("value", 1);
	}

	/*
	 * 类型修改
	 */
	public void valueUpdate2() {
		int id = getParaToInt("id");
		String value = getPara("value");
		Level l = new Level();
		l.setId(id);
		l.setName(value);
		l.update();
		renderJson("value", 1);
	}

	/*
	 * 品牌添加
	 */
	public void valueSave3() {
		String value = getPara("value");
		Brand l = new Brand();
		l.setName(value);
		l.save();
		renderJson("value", 1);
	}

	/*
	 * xxxx删除
	 */
	public void valueDel3() {
		int id = getParaToInt("id");
		Brand.dao.deleteById(id);
		renderJson("value", 1);
	}

	/*
	 * 品牌修改
	 */
	public void valueUpdate3() {
		int id = getParaToInt("id");
		String value = getPara("value");
		Brand l = new Brand();
		l.setId(id);
		l.setName(value);
		l.update();
		renderJson("value", 1);
	}

	/*
	 * xxxx删除
	 */
	public void valueDel4() {
		int id = getParaToInt("id");
		Serie.dao.deleteById(id);
		renderJson("value", 1);
	}

	/*
	 * 系列添加
	 */
	public void valueSave4() {
		String value = getPara("value");
		Serie l = new Serie();
		int cid = getParaToInt("cid");
		l.setName(value);
		l.setBrandId(cid);
		l.save();
		renderJson("value", 1);
	}

	/*
	 * 系列修改
	 */
	public void valueUpdate4() {
		int id = getParaToInt("id");
		String value = getPara("value");
		Serie l = new Serie();
		l.setId(id);
		l.setName(value);
		l.update();
		renderJson("value", 1);
	}

	/*
	 * xxxx删除
	 */
	public void valueDel5() {
		int id = getParaToInt("id");
		Carmodels.dao.deleteById(id);
		renderJson("value", 1);
	}

	/*
	 * 车款添加
	 */
	public void valueSave5() {
		String value = getPara("value");
		int cid = getParaToInt("cid");
		Carmodels l = new Carmodels();
		l.setName(value);
		l.setSeriesId(cid);
		l.save();
		renderJson("value", 1);
	}

	/*
	 * 车款修改
	 */
	public void valueUpdate5() {
		int id = getParaToInt("id");
		String value = getPara("value");
		Carmodels l = new Carmodels();
		l.setId(id);
		l.setName(value);
		l.update();
		renderJson("value", 1);
	}

	/*
	 * xxxx删除
	 */
	public void valueDel6() {
		int id = getParaToInt("id");
		Years.dao.deleteById(id);
		renderJson("value", 1);
	}

	/*
	 * 年款添加
	 */
	public void valueSave6() {
		String value = getPara("value");
		Years l = new Years();
		l.setName(value);
		l.save();
		renderJson("value", 1);
	}

	/*
	 * 年款修改
	 */
	public void valueUpdate6() {
		int id = getParaToInt("id");
		String value = getPara("value");
		Years l = new Years();
		l.setId(id);
		l.setName(value);
		l.update();
		renderJson("value", 1);
	}

	/*
	 * xxxx删除
	 */
	public void valueDel7() {
		int id = getParaToInt("id");
		Country.dao.deleteById(id);
		renderJson("value", 1);
	}

	/*
	 * 国别添加
	 */
	public void valueSave7() {
		String value = getPara("value");
		Country l = new Country();
		l.setName(value);
		l.save();
		renderJson("value", 1);
	}

	/*
	 * 国别修改
	 */
	public void valueUpdate7() {
		int id = getParaToInt("id");
		String value = getPara("value");
		Country l = new Country();
		l.setId(id);
		l.setName(value);
		l.update();
		renderJson("value", 1);
	}

	/*
	 * xxxx删除
	 */
	public void valueDel8() {
		int id = getParaToInt("id");
		Energy.dao.deleteById(id);
		renderJson("value", 1);
	}

	/*
	 * 能源添加
	 */
	public void valueSave8() {
		String value = getPara("value");
		Energy l = new Energy();
		l.setName(value);
		l.save();
		renderJson("value", 1);
	}

	/*
	 * 能源修改
	 */
	public void valueUpdate8() {
		int id = getParaToInt("id");
		String value = getPara("value");
		Energy l = new Energy();
		l.setId(id);
		l.setName(value);
		l.update();
		renderJson("value", 1);
	}

	/*
	 * xxxx删除
	 */
	public void valueDel9() {
		int id = getParaToInt("id");
		Displacement.dao.deleteById(id);
		renderJson("value", 1);
	}

	/*
	 * 排量添加
	 */
	public void valueSave9() {
		String value = getPara("value");
		Displacement l = new Displacement();
		l.setName(value);
		l.save();
		renderJson("value", 1);
	}

	/*
	 * 排量修改
	 */
	public void valueUpdate9() {
		int id = getParaToInt("id");
		String value = getPara("value");
		Displacement l = new Displacement();
		l.setId(id);
		l.setName(value);
		l.update();
		renderJson("value", 1);
	}

	/*
	 * xxxx删除
	 */
	public void valueDel10() {
		int id = getParaToInt("id");
		Gearbox.dao.deleteById(id);
		renderJson("value", 1);
	}

	/*
	 * 变速箱添加
	 */
	public void valueSave10() {
		String value = getPara("value");
		Gearbox l = new Gearbox();
		l.setName(value);
		l.save();
		renderJson("value", 1);
	}

	/*
	 * 变速箱修改
	 */
	public void valueUpdate10() {
		int id = getParaToInt("id");
		String value = getPara("value");
		Gearbox l = new Gearbox();
		l.setId(id);
		l.setName(value);
		l.update();
		renderJson("value", 1);
	}

	/*
	 * xxxx删除
	 */
	public void valueDel11() {
		int id = getParaToInt("id");
		Seats.dao.deleteById(id);
		renderJson("value", 1);
	}

	/*
	 * 座位数添加
	 */
	public void valueSave11() {
		String value = getPara("value");
		Seats l = new Seats();
		l.setName(value);
		l.save();
		renderJson("value", 1);
	}

	/*
	 * 座位数修改
	 */
	public void valueUpdate11() {
		int id = getParaToInt("id");
		String value = getPara("value");
		Seats l = new Seats();
		l.setId(id);
		l.setName(value);
		l.update();
		renderJson("value", 1);
	}

	/*
	 * xxxx删除
	 */
	public void valueDel12() {
		int id = getParaToInt("id");
		Drive.dao.deleteById(id);
		renderJson("value", 1);
	}

	/*
	 * 驱动添加
	 */
	public void valueSave12() {
		String value = getPara("value");
		Drive l = new Drive();
		l.setName(value);
		l.save();
		renderJson("value", 1);
	}

	/*
	 * 驱动修改
	 */
	public void valueUpdate12() {
		int id = getParaToInt("id");
		String value = getPara("value");
		Drive l = new Drive();
		l.setId(id);
		l.setName(value);
		l.update();
		renderJson("value", 1);
	}

	/*
	 * xxxx删除
	 */
	public void valueDel13() {
		int id = getParaToInt("id");
		Set.dao.deleteById(id);
		renderJson("value", 1);
	}

	/*
	 * 配置添加
	 */
	public void valueSave13() {
		String value = getPara("value");
		Set l = new Set();
		l.setName(value);
		l.save();
		renderJson("value", 1);
	}

	/*
	 * 配置修改
	 */
	public void valueUpdate13() {
		int id = getParaToInt("id");
		String value = getPara("value");
		Set l = new Set();
		l.setId(id);
		l.setName(value);
		l.update();
		renderJson("value", 1);
	}

}
