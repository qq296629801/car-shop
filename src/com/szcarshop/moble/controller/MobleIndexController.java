package com.szcarshop.moble.controller;

import com.jfinal.core.Controller;

/**
 * 
 * @author yemao
 *
 */
public class MobleIndexController extends Controller {
	public void index() {
		render("index.html");
	}

	public void login() {
		render("login.html");
	}

	public void city() {
		render("city.html");
	}

	public void search() {
		render("search.html");
	}

	public void category() {
		render("category.html");
	}

	public void single() {
		render("single.html");
	}

	public void set() {
		render("set.html");
	}
}
