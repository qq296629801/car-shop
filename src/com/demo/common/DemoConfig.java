package com.demo.common;

import com.demo.common.model._MappingKit;
import com.jfinal.config.Constants;
import com.jfinal.config.Handlers;
import com.jfinal.config.Interceptors;
import com.jfinal.config.JFinalConfig;
import com.jfinal.config.Plugins;
import com.jfinal.config.Routes;
import com.jfinal.core.JFinal;
import com.jfinal.ext.interceptor.SessionInViewInterceptor;
import com.jfinal.kit.PropKit;
import com.jfinal.plugin.activerecord.ActiveRecordPlugin;
import com.jfinal.plugin.druid.DruidPlugin;
import com.jfinal.template.Engine;
import com.szcarshop.admin.controller.AdminBBSController;
import com.szcarshop.admin.controller.AdminBrandController;
import com.szcarshop.admin.controller.AdminCarController;
import com.szcarshop.admin.controller.AdminColumnController;
import com.szcarshop.admin.controller.AdminContractController;
import com.szcarshop.admin.controller.AdminController;
import com.szcarshop.admin.controller.AdminInsureController;
import com.szcarshop.admin.controller.AdminOrderController;
import com.szcarshop.admin.controller.AdminPostController;
import com.szcarshop.admin.controller.AdminShopBusinessController;
import com.szcarshop.admin.controller.AdminShopController;
import com.szcarshop.admin.controller.AdminTeamController;
import com.szcarshop.controller.BBsController;
import com.szcarshop.controller.ContractController;
import com.szcarshop.controller.HelpController;
import com.szcarshop.controller.IndexController;
import com.szcarshop.controller.InsureController;
import com.szcarshop.controller.OrderController;
import com.szcarshop.controller.ShopController;
import com.szcarshop.controller.TeamController;
import com.szcarshop.controller.UserController;
import com.szcarshop.moble.controller.MobleIndexController;

/**
 * 本 demo 仅表达最为粗浅的 jfinal 用法，更为有价值的实用的企业级用法 详见 JFinal 俱乐部:
 * http://jfinal.com/club
 * 
 * API引导式配置
 */
public class DemoConfig extends JFinalConfig {

	/**
	 * 运行此 main 方法可以启动项目，此main方法可以放置在任意的Class类定义中，不一定要放于此
	 * 
	 * 使用本方法启动过第一次以后，会在开发工具的 debug、run config 中自动生成
	 * 一条启动配置，可对该自动生成的配置再添加额外的配置项，例如 VM argument 可配置为： -XX:PermSize=64M
	 * -XX:MaxPermSize=256M
	 */
	public static void main(String[] args) {
		/**
		 * 特别注意：Eclipse 之下建议的启动方式
		 */
		JFinal.start("WebRoot", 80, "/", 5);

		/**
		 * 特别注意：IDEA 之下建议的启动方式，仅比 eclipse 之下少了最后一个参数
		 */
		// JFinal.start("WebRoot", 80, "/");
	}

	/**
	 * 配置常量
	 */
	public void configConstant(Constants me) {
		// 加载少量必要配置，随后可用PropKit.get(...)获取值
		me.setDevMode(true);
		PropKit.use("a_little_config.txt");
		me.setDevMode(PropKit.getBoolean("devMode", false));

	}

	/**
	 * 配置路由
	 */
	public void configRoute(Routes me) {
		// 前台部分
		me.add("/", IndexController.class, "/index"); // 默认选车
		me.add("/user", UserController.class, "/user"); // 用户
		me.add("/team", TeamController.class, "/team"); // 团购
		me.add("/shop", ShopController.class, "/shop");// 车载配件
		me.add("/insure", InsureController.class, "/insure");// 保险
		me.add("/contract", ContractController.class, "/contract");// 晒合同
		me.add("/order", OrderController.class, "/order");
		me.add("/help", HelpController.class, "/index");
		me.add("/bbs", BBsController.class, "/bbs");
		// 手机部分
		me.add("/moble", MobleIndexController.class, "/moble/car");
		// 后台部分
		me.add("/admin", AdminController.class, "/admin");// 管理员
		me.add("/brand", AdminBrandController.class, "/adminBrand");// 品牌
		me.add("/car", AdminCarController.class, "/adminCar");// 选车
		me.add("/findOrder", AdminOrderController.class, "/adminOrder");// 选车订单
		me.add("/active", AdminTeamController.class, "/adminActive");// 团购
		me.add("/adminShop", AdminShopController.class, "/adminShop");// 车载配件
		me.add("/adminShopBusiness", AdminShopBusinessController.class, "/adminShop/basiness");// 车载配件商家
		me.add("/column", AdminColumnController.class, "/adminColumn");// 帮助分类
		me.add("/post", AdminPostController.class, "/adminPost");
		me.add("/adminInsure", AdminInsureController.class, "/adminInsure");// 保险
		me.add("/adminBBS", AdminBBSController.class, "/adminBBS");// 论坛
		me.add("/adminContract", AdminContractController.class, "/adminContract");// 合同
	}

	public void configEngine(Engine me) {
		me.addSharedFunction("/common/_layout.html");
		me.addSharedFunction("/common/_head.html");
		me.addSharedFunction("/common/_paginate.html");
	}

	public static DruidPlugin createDruidPlugin() {
		return new DruidPlugin(PropKit.get("jdbcUrl"), PropKit.get("user"), PropKit.get("password").trim());
	}

	/**
	 * 配置插件
	 */
	public void configPlugin(Plugins me) {
		// 配置C3p0数据库连接池插件
		DruidPlugin druidPlugin = createDruidPlugin();
		me.add(druidPlugin);
		// 配置ActiveRecord插件
		ActiveRecordPlugin arp = new ActiveRecordPlugin(druidPlugin);
		// 所有映射在 MappingKit 中自动化搞定
		_MappingKit.mapping(arp);
		me.add(arp);
	}

	/**
	 * 配置全局拦截器
	 */
	public void configInterceptor(Interceptors me) {
		me.add(new SessionInViewInterceptor());

	}

	/**
	 * 配置处理器
	 */
	public void configHandler(Handlers me) {

	}
}
