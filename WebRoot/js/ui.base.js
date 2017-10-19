/******
 @author : zongze.ma
 @update	: 2013/10/14
 @param showDiv :	绝对定位，相对于当前对象的偏移值
 @param mouseDiv:	绝对定位，当前鼠标的位置
 @param openDialog	:	带遮罩的弹出层
 @param closeDialog	:	关闭遮罩弹出层
 @param tab	:	页签切换
 @param autoTextarea	:	输入框自适应高度
 @param LoadImage	:	自动把大图按比例压缩，用法：$(window).load(function(){ $('#pics img').LoadImage(true, 200,100,'img/loading.gif'); });
 @param curPosition		:	输入框内光标的位置。可以获取，也可以定义。
 ******/

//自定义插件
jQuery.fn.extend({
	openDialog: function(options) {
		var defaults = {
			opacity : 0.3
		}
		$.extend(defaults,options);
		return this.each(function() {
			var m = "mask";
			if(document.getElementById(m)) document.body.removeChild(document.getElementById(m));
			var newMask = document.createElement("div");
			newMask.id = m;
			newMask.style.position = "absolute";
			newMask.style.zIndex = "9999";
			_scrollWidth = Math.max(document.body.scrollWidth,document.documentElement.scrollWidth);
			_scrollHeight = Math.max(document.body.scrollHeight,document.documentElement.clientHeight,$(document).height());
			newMask.style.width = _scrollWidth + "px";
			newMask.style.height = _scrollHeight + "px";
			newMask.style.top = "0";
			newMask.style.left = "0px";
			newMask.style.background = "#000000";
			newMask.style.filter = "alpha(opacity="+defaults.opacity*100+")";
			newMask.style.opacity = defaults.opacity;
			document.body.appendChild(newMask);
			this.style.display = "block";
			this.style.position = "absolute";
			this.style.zIndex = "99999";
			showDivWidth = this.offsetWidth;
			showDivHeight = this.offsetHeight;
			var sTop=document.body.scrollTop+document.documentElement.scrollTop;
			if (showDivHeight>document.documentElement.clientHeight)
			{
				this.style.top = sTop +  "px";
			}else{
				this.style.top = (sTop + document.documentElement.clientHeight/2 - showDivHeight/2) + "px";
			}
			this.style.left = (document.documentElement.scrollLeft + document.documentElement.clientWidth/2 -  showDivWidth/2) + "px";

		});
	},
	closeDialog: function() {
		return this.each(function() {
			var m = "mask";
			if(document.getElementById(m)) document.body.removeChild(document.getElementById(m));
			this.style.display = "none";
		});
	},
	tab:function(options){
		var defaults = {
			eventType	:	"click",
			isMore		:	false,
			fn			:	""
		}
		$.extend(defaults,options);
		if (defaults.eventType=="mouse")
		{
			return this.find("span").on("mouseover",function(){
				var divId = $(this).parent().attr("id");
				for (var i=0;i<$(this).parent().find("span").length;i++ )
				{
					$(this).parent().find("span").eq(i).removeClass("on");
					$("#"+divId+i).hide();
				}
				$(this).addClass("on");
				$("#"+divId+$(this).parent().find("span").index($(this))).fadeIn();
				if (defaults.isMore)
				{
					$("#"+divId+"more").attr("href",$(this).attr("rel"));
				}
				eval(defaults.fn);
			});
		}else{
			return this.find("span").on("click",function(){
				var divId = $(this).parent().attr("id");
				for (var i=0;i<$(this).parent().find("span").length;i++ )
				{
					$(this).parent().find("span").eq(i).removeClass("on");
					$("#"+divId+i).hide();
				}
				$(this).addClass("on");
				$("#"+divId+$(this).parent().find("span").index($(this))).fadeIn();
				if (defaults.isMore)
				{
					$("#"+divId+"more").attr("href",$(this).attr("rel"));
				}
				eval(defaults.fn);
			});
		}
	},

	autoTextarea:function(){
		return this.keyup(function(){
			if($("#_hidetextarea").length<=0){
				$("body").append("<textarea id='_hidetextarea'></textarea>");
			}
			$("#_hidetextarea").css({"height":"0px","width":$(this).width(),"border-width":"0px","overflow":"hidden","color":"#fff","visibility":"hidden"})
			$("#_hidetextarea").val($(this).val());
			var HideTextarea = document.getElementById("_hidetextarea");
			//$(this).css("height",Math.max($(this).height(),HideTextarea.scrollHeight));
			$(this).css("height",HideTextarea.scrollHeight);

		})
	},
	mouseDiv:function(options){
		var defaults = {content:"内容"};
		$.extend(defaults,options);
		return this.hover(function(e){
			$("<div id='mouseDiv'>"+defaults.content+"</div>").appendTo("body");
			$("#mouseDiv").css({position:"absolute",top:e.pageY,left:e.pageX});
		},function(){
			var h = setTimeout(function(){$("#mouseDiv").remove()},1000);
			$("#mouseDiv").mouseenter(function(){
				clearTimeout(h);
			});
			$("#mouseDiv").mouseleave(function(){
				$("#mouseDiv").remove();
			});
		});
	},
	showDiv:function(options,targetElement){
		var defaults = {
			leftNum	:	0,
			topNum	:	0,
			eventType : "mouse",
			content :	"内容",
			align	:	false,
			isClose	:	true,
			fn		:	function(){},
			beforeFn:  function(){},
			staytime:	200,
			leavetime:  100
		};
		var	targetElement = targetElement || 'body';
		$.extend(defaults,options);
		if (defaults.eventType=="mouse"){
			var stay = false;
			var m;
			return this.on({
				"mouseenter" : function(){
					eval(defaults.beforeFn);
					$("#mouseDiv").remove();
					var a = $(this).offset();
					var _top = a.top+$(this).height()+defaults.topNum;
					var _width = (defaults.align)?($(this).width())/2:0;
					m = setTimeout(function(){
						$("<div id='mouseDiv'>"+defaults.content+"</div>").appendTo(targetElement);
						$("#mouseDiv").css({position:"absolute",top:_top,left:(a.left + defaults.leftNum - _width)});
						stay = true;
					},defaults.staytime);

				},
				"mouseleave" : function(){
					if(stay){
						var h = setTimeout(function(){$("#mouseDiv").remove()},defaults.leavetime);
						$("#mouseDiv").mouseenter(function(){
							clearTimeout(h);
						});
						$("#mouseDiv").mouseleave(function(){
							$("#mouseDiv").remove();
						});
						stay = false;

					}else{
						clearTimeout(m);
					}
				}

			});

		}else{
			return this.on("click",function(event){
				eval(defaults.beforeFn);
				$("#mouseDiv").remove();
				var a = $(this).offset();
				$("<div id='mouseDiv'>"+defaults.content+"</div>").appendTo(targetElement);
				var _width = (defaults.align)?($(this).width())/2:0;
				$("#mouseDiv").css({position:"absolute",top:(a.top+$(this).height()+defaults.topNum),left:(a.left+defaults.leftNum-_width)});
				eval(defaults.fn);
				event.stopPropagation();
				if(defaults.isClose){
					$(document).on("click",function(){$("#mouseDiv").remove();})
				}
			});
		}
	},
	scroll : function(options){
		var defaults = {topsite:0,times:500};
		$.extend(defaults,options);
		return this.on('click',function(){
			$('body,html').animate({scrollTop:defaults.topsite},defaults.times);
			return false;
		});
	},
	placeholder	:	function(options){
		var i = document.createElement("input");
		var defaults = {
			beforeColor	:	"#999",
			afterColor	:	"#000"
		}
		$.extend(defaults,options);
		if (!("placeholder" in i)) {
			$("input[placeholder],textarea[placeholder]").each(function () {
				var self = $(this);
				if(self.val()===""||self.val() === self.attr("placeholder")){
					self.val(self.attr("placeholder"));
					self.css("color",defaults.beforeColor);
				}else{
					self.css("color",defaults.afterColor);
				}
				self.bind({
					focus: function () {
						if (self.val() === self.attr("placeholder")) {
							self.val("");
						}
						self.css("color",defaults.afterColor);
					},
					blur: function () {
						var label = self.attr("placeholder");
						if (label && (self.val() === "" || self.val() === label)) {
							self.val(label);
							self.css("color",defaults.beforeColor);
						}
					}
				});
			});
		}
	},
	LoadImage : function(scaling,width,height,loadpic){
		if(loadpic==null)loadpic="../images_app/loading_big.gif";
		return this.each(function(){
			var t=$(this);
			var src=$(this).attr("src")
			var img=new Image();
			img.src=src;
			//自动缩放图片
			var autoScaling=function(){
				if(scaling){
					if(img.width>0 && img.height>0){
						if(img.width/img.height>=width/height){
							if(img.width>width){
								t.width(width);
								t.height((img.height*width)/img.width);
							}else{
								t.width(img.width);
								t.height(img.height);
							}
						}
						else{
							if(img.height>height){
								t.height(height);
								t.width((img.width*height)/img.height);
							}else{
								t.width(img.width);
								t.height(img.height);
							}
						}
					}
				}
			}
			//处理ff下会自动读取缓存图片
			if(img.complete){
				autoScaling();
				return;
			}
			$(this).attr("src","");
			var loading=$("<img alt=\"加载中...\" title=\"图片加载中...\" src=\""+loadpic+"\" />");
			t.hide();
			t.after(loading);
			$(img).load(function(){
				autoScaling();
				loading.remove();
				t.attr("src",this.src);
				t.show();
			});
		} );
	},
	curPosition:function( value ){
		var elem = this[0];
		if (elem&&(elem.tagName=="TEXTAREA"||elem.type.toLowerCase()=="text")) {
			if($.browser.msie){
				var rng;
				if(elem.tagName == "TEXTAREA"){
					rng = event.srcElement.createTextRange();
					rng.moveToPoint(event.x,event.y);
				}else{
					rng = document.selection.createRange();
				}
				if( value === undefined ){
					rng.moveStart("character",-event.srcElement.value.length);
					return  rng.text.length;
				}else if(typeof value === "number" ){
					var index=this.position();
					index>value?( rng.moveEnd("character",value-index)):(rng.moveStart("character",value-index))
					rng.select();
				}
			}else{
				if( value === undefined ){
					return elem.selectionStart;
				}else if(typeof value === "number" ){
					elem.selectionEnd = value;
					elem.selectionStart = value;
				}
			}
		}else{
			if( value === undefined )
				return undefined;
		}
	}

}); 
