//购物车显示与隐藏
function shopCartShow() {
	if($("#login").height() == 374) {
		$("#login").css("height", "0");
		$(".login-btn").css({
			background: "#fff",
			color: "#999"
		});
		$(".shop-btn").css({
			background: "#222",
			color: "#fff"
		});
		$(".shopbtn-ico").css("background", "url(img/siteSprite-se41bd8659f.png) no-repeat 0 -3031px");
		$("#shop-cart").css("height", "374");
		$("#coverDiv").css("display", "block");
	} else if($("#shop-cart").height() == 0) {
		$(".shop-btn").css({
			background: "#222",
			color: "#fff"
		});
		$(".shopbtn-ico").css("background", "url(img/siteSprite-se41bd8659f.png) no-repeat 0 -3031px");
		$("#shop-cart").animate({
			height: 374
		}, 500, "linear");
		$("#coverDiv").css("display", "block");
	} else {
		$("#shop-cart").animate({
			height: 0
		}, 500, "linear");
		$(".shop-btn").css({
			background: "#fff",
			color: "#999"
		});
		$(".shopbtn-ico").css("background", "url(img/siteSprite-se41bd8659f.png) no-repeat 0 -3006px");
		$("#coverDiv").css("display", "none");
	}
}
//添加购物车
function sc_msg() {
	$.ajax({
		url: "json/newArrival.json",
		type: "get",
		success: function(data) {
			var sc_str = $.cookie("goods");
			if(sc_str) {
				var arr = eval(sc_str);
				for(var i in arr) {
					var pri = arr[i].price;
					pri = pri / 1000;
					pri = String(pri);
					if(pri.indexOf(".") == -1){
						pri = pri + "," + "000";
					}else{
						pri = pri.split(".");
						pri = pri[0] + "," + pri[1] + "00";
					}
					$('<div class="shop-item"><div class="item-img"><img src="' + data[arr[i].id].nfimg + '"/></div><div class="item-brand">GIORGIO ARMANI</div><div class="item-category">' + data[arr[i].id].title + '</div><div class="item-info">数量：' + arr[i].num + '</div><div class="item-price">￥' + pri + '</div><div class="item-delete" id="' + arr[i].id + '"><span></span></div></div>').appendTo($(".wrapper-item"));
				}
			}
			if(arr.length == 0){
				$(".shop-text").css("display", "block");
				$(".wrapper").css("display", "none");
				$(".settle").css("display", "none");
			}
			//删除购物车商品按键显示与隐藏
			$(".shop-item").hover(function(){
				$(this).find(".item-delete").css("display","block");
			},function(){
				$(this).find(".item-delete").css("display","none");
			});
			//删除购物车商品信息
			$(".item-delete").click(function(){
				var id = $(this).attr("id");
				var sc_str = $.cookie("goods");
				var sc_arr = eval(sc_str);
				for(var i in sc_arr){
					if(id == sc_arr[i].id){
						$(this).parents(".shop-item").remove();
						sc_arr.splice(i,1);
						var cookieStr = JSON.stringify(sc_arr);
						$.cookie("goods",cookieStr,{expires:7});
						sc_car();
						sc_price();
					}
				}
				if(sc_arr.length == 0){
					$(".shop-text").css("display", "block");
					$(".wrapper").css("display", "none");
					$(".settle").css("display", "none");
				}
			})
		}
	});
}
//添加购物车cookie
function addGoods() {
	$(".shop-btn").css({
		background: "#222",
		color: "#fff"
	});
	$(".shopbtn-ico").css("background", "url(img/siteSprite-se41bd8659f.png) no-repeat 0 -3031px");
	$("#shop-cart").animate({
		height: 374
	}, 500, "linear");
	$("#coverDiv").css("display", "block");
	$(".shop-text").css("display", "none");
	$(".wrapper").css("display", "block");
	$(".settle").css("display", "block");
	$(".wrapper-item").empty();
	sc_msg();
	var id = $(this).attr("title");
	var price = $(this).attr("price");
	var first = $.cookie("goods") == null ? true : false;
	var same = false;
	if(first) {
		$.cookie('goods', '[{id:"' + id + '",price:"' + price + '",num:"1"}]', {
			expires: 7
		});
	} else {
		var str = $.cookie("goods");
		var arr = eval(str);
		for(var i in arr) {
			if(arr[i].id == id) {
				arr[i].num++;
				arr[i].price = Number(arr[i].price) + Number(price);
				var cookieStr = JSON.stringify(arr);
				$.cookie("goods", cookieStr, {
					expires: 7
				});
				same = true;
			}
		}
		if(!same) {
			var obj = {
				id: id,
				price: price,
				num: "1"
			};
			arr.push(obj);
			var cookieStr = JSON.stringify(arr);
			$.cookie("goods", cookieStr, {
				expires: 7
			});
		}
	}
	sc_car();
	sc_price();
}
//购物车总数量
function sc_car(){
	var sc_str = $.cookie("goods");
	if(sc_str){
		var sc_arr = eval(sc_str);
		var sc_num = 0;
		for(var i in sc_arr){
			sc_num += Number(sc_arr[i].num);
		}
		$(".shopNum").html(sc_num);
	}
}
//购物车总金额
function sc_price(){
	var sc_str = $.cookie("goods");
	if(sc_str){
		var sc_arr = eval(sc_str);
		var sc_money = 0;
		for(var i in sc_arr){
			sc_money += Number(sc_arr[i].price);
		}
		var pri = sc_money;
		pri = pri / 1000;
		pri = String(pri);
		if(pri.indexOf(".") == -1){
			pri = pri + "," + "000";
		}else{
			pri = pri.split(".");
			pri = pri[0] + "," + pri[1] + "00";
		}
		$(".shopMoneyNum").html(pri);
	}
}
//登录窗口显示与隐藏
function loginShow() {
	if($("#shop-cart").height() == 374) {
		$("#shop-cart").css("height", "0");
		$(".shop-btn").css({
			background: "#fff",
			color: "#999"
		});
		$(".shopbtn-ico").css("background", "url(img/siteSprite-se41bd8659f.png) no-repeat 0 -3006px");
		$(".login-btn").css({
			background: "#222",
			color: "#fff"
		});
		$("#login").css("height", "374");
		$("#coverDiv").css("display", "block");
	} else if($("#login").height() == 0) {
		$(".login-btn").css({
			background: "#222",
			color: "#fff"
		});
		$("#login").animate({
			height: 374
		}, 500, "linear");
		$("#coverDiv").css("display", "block");
	} else {
		$("#login").animate({
			height: 0
		}, 500, "linear");
		$(".login-btn").css({
			background: "#fff",
			color: "#999"
		});
		$("#coverDiv").css("display", "none");
	}
	$(".login-bag a").hover(function() {
		$(this).css({
			"background-color": "#989898",
			"color": "#fff"
		});
	}, function() {
		$(this).css({
			"background-color": "#fff",
			"color": "#000"
		});
	});
	//判断用户名是否可用
	var login_index = null;
	var username = false;
	$(".username").blur(function() {
		var oValue = $(this).val().replace(/\s/g, "");
		$(this).val(oValue);
		var str = $.cookie("login");
		var arr = eval(str);
		for(var i in arr) {
			if($(this).val() == arr[i].username) {
				$(this).css("border", "1px solid #A9A9A9");
				$(".username-hint").html("&nbsp;");
				username = true;
				login_index = i;
			}
		}
		if(!username) {
			$(this).css("border", "1px solid red");
			$(".username-hint").html("无效的电子邮箱地址");
		}

	});
	//判断密码是否正确
	var pass = false;
	$(".password").blur(function() {
		var oValue = $(this).val().replace(/\s/g, "");
		$(this).val(oValue);
		var str = $.cookie("login");
		var arr = eval(str);
		for(var i in arr) {
			if(i == login_index && $(this).val() == arr[i].password) {
				$(this).css("border", "1px solid #A9A9A9");
				$(".password-hint").html("&nbsp;");
				pass = true;
			}
		}
		if(!pass) {
			$(this).css("border", "1px solid red");
			$(".password-hint").html("密码不符");
		}
	});
	//点击登录
	$("#login_in").click(function() {
		if(username && pass) {
			$(".login-btn").css("display", "none");
			$(".login-out").css("display", "block");
			$(".hello").css("display", "block");
			$(".collect-btn").css("display", "block");
			$("#login").animate({
				height: 0
			}, 500, "linear");
			$(".login-btn").css({
				background: "#fff",
				color: "#999"
			});
			$.cookie("login-in", "[{titlt:1}]", {
				expires: 7
			});
			$("#coverDiv").css("display", "none");
		} else {
			alert("请输入正确的信息");
		}
	});
	//选择是否记住信息
	var selectdown = true;
	$(".select").click(function() {
		if(selectdown) {
			$(this).css("background", "url(img/siteSprite-se41bd8659f.png) no-repeat 0 -740px");
			selectdown = false;
		} else {
			$(this).css("background", "url(img/siteSprite-se41bd8659f.png) no-repeat 0 -647px");
			selectdown = true;
		}
	});
	//登录按钮样式变化
	$("#login_in").hover(function() {
		$(this).css("background-color", "#989898");
	}, function() {
		$(this).css("background-color", "#000");
	});

}
//点击退出
function loginOut() {
	$(".login-btn").css("display", "block");
	$(".login-out").css("display", "none");
	$(".hello").css("display", "none");
	$(".collect-btn").css("display", "none");
	$.cookie("login-in", null);
}
//首页信息加载
function index(data) {
	var oDiv = $("#inner").find("div");
	for(var i in data) {
		$("<img />").attr("src", data[i].url).appendTo(oDiv[i]);
	}
	for(var i = 0; i < oDiv.length; i++) {
		oDiv[i].style.position = "relative";
	}
	for(var i in data) {
		if(data[i].ico) {
			$('<span class="inner-message"><div class="message-box" title="' + i + '"><img src="' + data[i].ico + '"></div></span>').appendTo(oDiv[i]);
		}
	}
	for(var i = 0; i < $(".message-box").length; i++) {
		$(".message-box").eq(i).css("top", 100 * ((($(".message-box").eq(1).parents().height() - $(".message-box").eq(i).height()) / 2) / $(".message-box").eq(1).parents().height()) + "%");
	}
	$("#coverDiv").css("height", $("#inner").height());
}
//首页下拉菜单加载
function indexNav(data) {
	for(var i in data) {
		$("<li></li>").html(data[i].title).appendTo($(".bottom-nav").find("ul"));
	}
	$(".bottom-nav").find("ul").children().last().addClass("world");
	$(".bottom-nav").find("ul").children().hover(function() {
		$(this).addClass("hover");
		$('<ul></ul>').appendTo($(this));
		for(var i = 0; i < data[$(this).index()].child.length; i++) {
			$('<li><a href="' + data[$(this).index()].child[i].url + '">' + data[$(this).index()].child[i].name + '</a></li>').appendTo($(this).find("ul"));
		}
	}, function() {
		$(this).removeClass("hover");
		$(this).find("ul").remove();
	})
	$("#animateDiv").css("height", $("#top").css("height"));
	if($.cookie("login-in")) {
		$(".login-btn").css("display", "none");
		$(".login-out").css("display", "block");
		$(".hello").css("display", "block");
		$(".collect-btn").css("display", "block");
	}
}
//搜索按钮的样式变化
function findShow() {
	if($(".find").width() < 200) {
		$(this).animate({
			width: 200
		}, 500, "linear");
		$(".find-text").css("display", "none");
		$('<input type="text" class="find-inp">').appendTo($(this));
		$(".find-inp").focus();
	} else {
		$(".find").animate({
			width: 150
		}, 500, "linear");
		$(".find-text").css("display", "inline-block");
		$(".find-inp").remove();
	}
}
//首页菜单加载
function nav(data) {
	for(var i = 0; i < data.length; i++) {
		$("<li></li>").html(data[i].title).appendTo($(".top-nav").find("ul"));
	}
}
//置顶按钮显示与隐藏
function goTopShow() {
	if($(document).scrollTop() > 0) {
		$(".gotop").css("display", "block");
	} else {
		$(".gotop").css("display", "none");
	}
}
//置顶按钮点击事件
function goTop() {
	clearInterval(this.timer);
	var _this = this;
	this.timer = setInterval(function() {
		if(document.body.scrollTop <= 0 && document.documentElement.scrollTop <= 0) {
			console.log(this)
			clearInterval(_this.timer);
		}
		document.body.scrollTop -= 10;
		document.documentElement.scrollTop -= 100;

	}, 8)
}
//页尾菜单加载
function footsite(data) {
	for(var i in data) {
		$('<li class="site-nav site-animate">' + data[i].title + '<ol></ol></li>').appendTo($(".site").find("ul"));
	}
	$(".site-nav:first").addClass("site-first").removeClass("site-animate");
	//页尾菜单点击显示与隐藏
	$(".open-site").click(function() {
		if($(".site").find("li").width() < 200) {
			$(this).find("span").css("background", "url(img/siteSprite-se41bd8659f.png) no-repeat 0 -262px");
			$(".site-nav").animate({
				width: "20%"
			}, 500, "linear");
			for(var i in data) {
				for(var j in data[i].child) {
					$('<li class="site-message">' + data[i].child[j].name + '</li>').appendTo($(".site-nav").eq(i).find("ol"));
				}
			}
			$(".site-nav").find("ol").animate({
				height: 450
			}, 500, "linear");
		} else {
			$(this).find("span").css("background", "url(img/siteSprite-se41bd8659f.png) no-repeat 0 -230px");
			$(".site-nav").find("ol").animate({
				height: 0
			}, 500, "linear");
			$(".site-message").remove();
			$(".site-first").animate({
				width: 165
			}, 500, "linear");
			$(".site-animate").animate({
				width: 73
			}, 500, "linear");
		}
	})
}
//giorgio菜单加载
function giorgioNav(data) {
	for(var i in data) {
		$('<li class="menu-title"><a class="menutitle-link" first="' + i + '">' + data[i].title + '</a></li>').appendTo($(".menu-first"));
	}
	//点击显示二级菜单
	$(".menutitle-link").click(function() {
		$(".menu-second").remove();
		$('<ul class="menu-second"></ul>').appendTo($(".menu-title").eq($(this).attr("first")));
		for(var i in data[$(this).attr("first")].child) {
			$('<li class="menu-name"><a href="' + data[$(this).attr("first")].child[i].href + '" class="menuname-link" first="' + $(this).attr("first") + '" name="' + i + '">' + data[$(this).attr("first")].child[i].name + '</a></li>').appendTo($(".menu-second"));
		}
		$(".menuname-link").mouseover(function() {
			$(this).css("background-color", "#B1AA9D");
		});
		$(".menuname-link").mouseout(function() {
			$(this).css("background-color", "#918c80");
		});
		//点击显示三级菜单
		$(".menuname-link").click(function() {
			$(this).unbind("mouseout");
			$(".menuname-link").css("background-color", "#918c80");
			$(this).css("background-color", "#B1AA9D");
			$(".menu-third").remove();
			$('<ul class="menu-third"></ul>').appendTo($(".menu-name").eq($(this).attr("name")));
			for(var i in data[$(this).attr("first")].child[$(this).attr("name")].children) {
				$('<li class="menu-message"><a href="' + data[$(this).attr("first")].child[$(this).attr("name")].children[i].url + '"class="menumessage-link">' + data[$(this).attr("first")].child[$(this).attr("name")].children[i].message + '</a></li>').appendTo($(".menu-third"));
			}
			$(".menumessage-link").mouseover(function() {
				$(this).css({
					"background-color": "#B1AA9D",
					"color": "#fff"
				});
			});
			$(".menumessage-link").mouseout(function() {
				$(this).css({
					"background-color": "#918c80",
					"color": "#c6c3bd"
				});
			});
			//点击显示详细页面
			$(".menumessage-link").click(function() {
				$(".menumessage-link").mouseout(function() {
					$(this).css({
						"background-color": "#918c80",
						"color": "#c6c3bd"
					});
				});
				$(this).unbind("mouseout");
				$(".menumessage-link").css({
					"background-color": "#918c80",
					"color": "#c6c3bd"
				});
				$(this).css({
					"background-color": "#B1AA9D",
					"color": "#fff"
				});
			})
		});
	});
}
//giorgio信息加载
function giorgio(data) {
	$(".content").css("height", 1.49 * $(".content").width());
	$("#coverDiv").css("height", $("#middle").height());
	for(var i in data) {
		if(data[i].child) {
			$('<ul class="slideme"></ul><ol class="numbers"></ol><button class="prev">‹</button><button class="next">›</button>').appendTo($(".pic").eq(i));
		} else {
			$('<img src="' + data[i].url + '">').appendTo($(".pic").eq(i));
			$('<h4>' + data[i].name + '</h4>').appendTo($(".pic").eq(i));
			$('<a href="' + data[i].href + '" class="choose-btn">立即选购</a>').appendTo($(".pic").eq(i));
		}
	}
	for(var i in data) {
		for(var j in data[i].child) {
			if(data[i].child[j].name) {
				$('<li><img src="' + data[i].child[j].url + '"><h4>' + data[i].child[j].name + '</h4><a href="' + data[i].child[j].href + '" class="choose-btn">立即选购</a></li>').appendTo($(".slideme").eq(i));
				$('<li>●</li>').appendTo($(".numbers").eq(i));
			} else {
				$('<li><img src="' + data[i].child[j].url + '"></li>').appendTo($(".slideme").eq(i));
				$('<li>●</li>').appendTo($(".numbers").eq(i));
			}
		}
		$(".slideme").eq(i).find("li:first").addClass("current");
		$(".numbers").eq(i).find("li:first").addClass("current");
	}
	$(".slideme").css("height", $(this).parents(".pic").height());
	for(var i = 0; i < $(".numbers").length; i++) {
		$(".numbers").eq(i).css("left", ($(".numbers").eq(i).parents(".pic").width() - $(".numbers").eq(i).width()) / 2);
	}
	//轮播图向前滑动
	$(".prev").click(function() {
		var _slideme = $(this).siblings(".slideme").find(".current");
		var _numbers = $(this).siblings(".numbers").find(".current");
		_slideme.animate({
			left: "100%"
		}, 500, "linear", function() {
			_slideme.removeClass("current").removeAttr("style");
		});
		_numbers.removeClass();
		if(_slideme.index() == 0) {
			$(this).siblings(".slideme").find("li:last").addClass("move-prev").animate({
				left: 0
			}, 500, "linear", function() {
				$(".move-prev").addClass("current").removeClass("move-prev");
			});
			$(this).siblings(".numbers").find("li:last").addClass("current");
		} else {
			_slideme.prev().addClass("move-prev").animate({
				left: 0
			}, 500, "linear", function() {
				$(".move-prev").addClass("current").removeClass("move-prev");
			});
			_numbers.prev().addClass("current");
		}
	});
	//轮播图向后滑动
	$(".next").click(function() {
		var _slideme = $(this).siblings(".slideme").find(".current");
		var _numbers = $(this).siblings(".numbers").find(".current");
		_slideme.animate({
			left: "-100%"
		}, 500, "linear", function() {
			_slideme.removeClass("current").removeAttr("style");
		});
		_numbers.removeClass();
		if(_slideme.index() == $(this).siblings(".slideme").find("li").length - 1) {
			$(this).siblings(".slideme").find("li:first").addClass("move-next").animate({
				left: 0
			}, 500, "linear", function() {
				$(".move-next").addClass("current").removeClass("move-next");
			});
			$(this).siblings(".numbers").find("li:first").addClass("current");
		} else {
			_slideme.next().addClass("move-next").animate({
				left: 0
			}, 500, "linear", function() {
				$(".move-next").addClass("current").removeClass("move-next");
			});
			_numbers.next().addClass("current");
		}
	});
	//轮播图选择滑动
	$(".numbers li").click(function() {
		var _slideme = $(this).parents(".numbers").siblings(".slideme").find(".current");
		var _numbers = $(this).siblings(".current");
		if($(this).index() < _numbers.index()) {
			_slideme.animate({
				left: "100%"
			}, 500, "linear", function() {
				_slideme.removeClass("current").removeAttr("style");
			});
			_numbers.removeClass();
			$(this).parents(".numbers").siblings(".slideme").find("li").eq($(this).index()).addClass("move-prev").animate({
				left: 0
			}, 500, "linear", function() {
				$(".move-prev").addClass("current").removeClass("move-prev");
			});
			$(this).addClass("current");
		} else if($(this).index() > _numbers.index()) {
			_slideme.animate({
				left: "-100%"
			}, 500, "linear", function() {
				_slideme.removeClass("current").removeAttr("style");
			});
			_numbers.removeClass();
			$(this).parents(".numbers").siblings(".slideme").find("li").eq($(this).index()).addClass("move-next").animate({
				left: 0
			}, 500, "linear", function() {
				$(".move-next").addClass("current").removeClass("move-next");
			});
			$(this).addClass("current");
		}
	});
	//选购按钮样式变化
	$(".choose-btn").hover(function() {
		$(this).css({
			"background-color": "#909090",
			"color": "#000"
		});
	}, function() {
		$(this).css({
			"background-color": "#000",
			"color": "#fff"
		});
	});
}
//新品上市菜单
function newArrivalnav(data) {
	for(var i in data) {
		$('<li class="filter-btn">' + data[i].title + '</li>').appendTo($(".filter ul"));
	}
	$(".filter-btn:first").addClass("filter-weight");
	$(".filter-btn:last").addClass("filter-weight");
	for(var i in data) {
		if(data[i].child) {
			$("<ol></ol>").appendTo($(".filter-btn").eq(i));
			for(var j in data[i].child) {
				$('<li class="filter-menu"><span class="square"></span>' + data[i].child[j].name + '</li>').appendTo($(".filter-btn").eq(i).find("ol"));
			}
			$(".filter-btn").eq(i).find(".square").first().addClass("square-down");
		}
	}
	//新品上市菜单选择
	$(".filter-menu").mouseover(function() {
		$(this).find(".square").addClass("square-down");
	});
	$(".filter-menu").mouseout(function() {
		$(this).find(".square").removeClass("square-down");
	});
	//新品上市菜单点击选择
	$(".filter-menu").click(function() {
		$(this).siblings().mouseout(function() {
			$(this).find(".square").removeClass("square-down");
		});
		$(this).unbind("mouseout");
		$(this).siblings().find(".square").removeClass("square-down");
		$(this).find(".square").addClass("square-down");
	});
	//新品上市菜单关闭按钮
	$(".filter-delete").hover(function() {
		$(this).css("background-color", "#A6A6A6");
	}, function() {
		$(this).css("background-color", "#000");
	});
	//点击展开新品上市菜单
	$(".filter-btn").click(function() {
		$(".filter").animate({
			height: 400
		}, 500, "linear");
	});
	//点击关闭新品上市菜单
	$(".filter-delete").click(function() {
		$(".filter").animate({
			height: 50
		}, 500, "linear");
	})
}
//新品上市页面加载
function newArrival(data) {
	for(var i in data) {
		var pri = data[i].price;
		pri = pri / 1000;
		pri = String(pri);
		if(pri.indexOf(".") == -1){
			pri = pri + "," + "000";
		}else{
			pri = pri.split(".");
			pri = pri[0] + "," + pri[1] + "00";
		}
		$('<div class="item"><a href="' + data[i].href + '" class="item-pic"><img class="photo current" src="' + data[i].nfimg + '"/><img class="photo" src="' + data[i].nrimg + '"/></a><div class="item-text"><p class="item-title">' + data[i].title + '</p><p class="item-prico">￥' + pri + '</p><p class="item-size">' + data[i].size_new + '</p></div></div>').appendTo($(".center-page"));
	}
	$(".item").hover(function() {
		$(this).find(".photo").removeClass("current");
		$(this).find(".photo").eq(1).addClass("current");
		$(this).find(".item-size").css("display", "block");
		$(this).find(".item-text").addClass("item-hover");
	}, function() {
		$(this).find(".photo").removeClass("current");
		$(this).find(".photo").eq(0).addClass("current");
		$(this).find(".item-size").css("display", "none");
		$(this).find(".item-text").removeClass("item-hover");
	});
	$("#coverDiv").css("height", $("#middle").height());
}
//详情页加载
function details(obj) {
	$('<div class="goods-box"><img src="' + obj.nfimg + '" /><div class="move"></div></div><div class="goods-box"><img src="' + obj.nrimg + '" /><div class="move"></div></div><div class="goods-box"><img src="' + obj.ndimg + '" /><div class="move"></div></div>').appendTo($(".master"));
	$(".goods-box").hover(function(){
		$('<div class="glass"><div class="glass-img"><img src="' + $(this).find("img").attr("src") + '" /></div></div>').appendTo($(".master"));
		$(".glass").css({"width":$(this).width(),"height":$(this).height(),"left":($(this).position().left + $(this).width()),"top":$(this).position().top});
	},function(){
		$(".glass").remove();
	});
	$(".title").html(obj.title);
	var pri = obj.price;
	pri = pri / 1000;
	pri = String(pri);
	if(pri.indexOf(".") == -1){
		pri = pri + "," + "000";
	}else{
		pri = pri.split(".");
		pri = pri[0] + "," + pri[1] + "00";
	}
	$(".price").html("￥" + pri);
	$(".color").html(obj.color);
	for(var i in obj.size_coat) {
		$('<option>' + obj.size_coat[i].num + '</option>').appendTo($(".size"));
	}
	$(".addshop").attr({
		"title": obj.id,
		"price": obj.price
	});
	$(".collect").attr({
		"title": obj.id,
		"price": obj.price
	});
	$(".coding").html(obj.coding);
	$(".tabs-text").eq(0).html(obj.texture);
	$('<ul class="tabs-list"></ul>').appendTo($(".tabs-text").eq(1));
	for(var i in obj.details) {
		$('<li>' + obj.details[i].txt + '</li>').appendTo($(".tabs-list"));
	}
	$(".tabs-text").eq(2).html(obj.model);
	$(".tabs-text").eq(3).html(obj.serve);
	$(".back-prev").hover(function() {
		$(this).css("background", "url(img/siteSprite-se41bd8659f.png) no-repeat 0 -2640px");
	}, function() {
		$(this).css("background", "url(img/siteSprite-se41bd8659f.png) no-repeat 0 -2614px");
	});
	$(".back-next").hover(function() {
		$(this).css("background", "url(img/siteSprite-se41bd8659f.png) no-repeat 0 -2588px");
	}, function() {
		$(this).css("background", "url(img/siteSprite-se41bd8659f.png) no-repeat 0 -2562px");
	});
	//加入购物车按钮样式变化
	$(".addshop").hover(function() {
		$(this).css("background-color", "#949494");
	}, function() {
		$(this).css("background-color", "#000");
	});
	//添加收藏夹按钮样式变化
	$(".collect").hover(function() {
		$(this).css("background-color", "#949494");
	}, function() {
		$(this).css("background-color", "#bababa");
	});
	//微博样式变化
	$(".weibo").hover(function() {
		$(this).css("background", "url(img/siteSprite-se41bd8659f.png) no-repeat 0 -3518px");
	}, function() {
		$(this).css("background", "url(img/siteSprite-se41bd8659f.png) no-repeat 0 -3458px");
	})
	//信息样式变化
	$(".description").hover(function() {
		$(this).css("border-left", "2px solid #000");
	}, function() {
		$(this).css("border-left", "2px solid #fff");
	});
	$(".tabs-text:first").css("display", "block");
	//信息点击收起与显示
	$(".tabs li").click(function() {
		$(".tabs li").removeClass("open");
		$(".tabs-text").slideUp(700);
		$(this).addClass("open");
		$(this).find(".tabs-text").slideDown(700);
	});
	$("#coverDiv").css("height", $("#middle").height());
}
//判断注册信息正确的全局变量
var is = false;
//判断名字是否合法
function isName() {
	var oValue = $(this).val().replace(/\s/g, "");
	$(this).val(oValue);
	var pattern = /^[\u4e00-\u9fa5]{2,4}$|^[a-zA-Z]{1,30}$/gi;
	if(pattern.test($(this).val())) {
		$(this).css("border", "1px solid #A9A9A9");
		$(".name-hint").html("&nbsp;");
		is = true;
	} else if($(this).val().length == 0) {
		$(this).css("border", "1px solid red");
		$(".name-hint").html("*必填");
		is = false;
	} else {
		$(this).css("border", "1px solid red");
		$(".name-hint").html("请您确认姓名");
		is = false;
	}
}
//判断姓氏是否合法
function isSurname() {
	var oValue = $(this).val().replace(/\s/g, "");
	$(this).val(oValue);
	var pattern = /^[\u4e00-\u9fa5]{1,4}$|^[a-zA-Z]{1,30}$/gi;
	if(pattern.test($(this).val())) {
		$(this).css("border", "1px solid #A9A9A9");
		$(".surname-hint").html("&nbsp;");
		is = true;
	} else if($(this).val().length == 0) {
		$(this).css("border", "1px solid red");
		$(".surname-hint").html("*必填");
		is = false;
	} else {
		$(this).css("border", "1px solid red");
		$(".surname-hint").html("请您确认姓名");
		is = false;
	}
}
//判断邮件是否合法
function isEmail() {
	var oValue = $(this).val().replace(/\s/g, "");
	$(this).val(oValue);
	var pattern = /^\w+@\w+(\.\w+)+$/;
	if(pattern.test($(this).val())) {
		$(this).css("border", "1px solid #A9A9A9");
		$(".email-hint").html("&nbsp;");
		is = true;
	} else if($(this).val().length == 0) {
		$(this).css("border", "1px solid red");
		$(".email-hint").html("*必填");
		is = false;
	} else {
		$(this).css("border", "1px solid red");
		$(".email-hint").html("请输入正确的电子邮箱地址");
		is = false;
	}
}
//判断确认邮件是否正确
function isAffirm() {
	var oValue = $(this).val().replace(/\s/g, "");
	$(this).val(oValue);
	if($(this).val().length == 0) {
		$(this).css("border", "1px solid red");
		$(".affirm-hint").html("*必填");
		is = false;
	} else if($(this).val() == $(".email-inp").val()) {
		$(this).css("border", "1px solid #A9A9A9");
		$(".affirm-hint").html("&nbsp;");
		is = true;
	} else {
		$(this).css("border", "1px solid red");
		$(".affirm-hint").html("电子邮箱地址不符");
		is = false;
	}
}
//判断密码是否合法
function isPass() {
	var oValue = $(this).val().replace(/\s/g, "");
	$(this).val(oValue);
	var pattern = /^.{8,20}$/;
	if(pattern.test($(this).val())) {
		$(this).css("border", "1px solid #A9A9A9");
		$(".pass-hint").html("&nbsp;");
		is = true;
	} else if($(this).val().length == 0) {
		$(this).css("border", "1px solid red");
		$(".pass-hint").html("*必填");
		is = false;
	} else {
		$(this).css("border", "1px solid red");
		$(".pass-hint").html("请核对您当前使用的密码");
		is = false;
	}
}
//判断确认密码是否正确
function isVerify() {
	var oValue = $(this).val().replace(/\s/g, "");
	$(this).val(oValue);
	if($(this).val().length == 0) {
		$(this).css("border", "1px solid red");
		$(".verify-hint").html("*必填");
		is = false;
	} else if($(this).val() == $(".pass-inp").val()) {
		$(this).css("border", "1px solid #A9A9A9");
		$(".verify-hint").html("&nbsp;");
		is = true;
	} else {
		$(this).css("border", "1px solid red");
		$(".verify-hint").html("两次所输入的密码不匹配");
		is = false;
	}
}
//注册页面喜好展开与收起
function contClose() {
	if($(".cont").height() <= 40) {
		$(this).css("background", "url(img/siteSprite-se41bd8659f.png) no-repeat 0 -262px");
		$(".cont").animate({
			height: 540
		}, 500, "linear");
	} else {
		$(this).css("background", "url(img/siteSprite-se41bd8659f.png) no-repeat 0 -230px");
		$(".cont").animate({
			height: 36
		}, 500, "linear");
	}
	//点击记录喜好
	$(".cont-item").click(function() {
		$(".cont-item:first").removeClass("default");
		var oTitle = $(this).attr("title");
		if($(this).attr("class") == "cont-item default") {
			$(this).removeClass("default");
			for(var i = 0; i < $(".recap-cont div").length; i++) {
				if($(".recap-cont div").eq(i).attr("title") == oTitle) {
					$(".recap-cont div").eq(i).remove();
					if($(".recap-cont div").length == 0) {
						$(".recap-cont").css("display", "none");
					}
				}
			}
		} else {
			$(this).addClass("default");
			$(this).clone().appendTo($(".recap-cont"));
			$(".recap-cont").css("display", "block");
		}

	});
}
//注册页面确认条例
function onOff() {
	if($(this).attr("class") == "off") {
		$(this).css("background", "url(img/siteSprite-se41bd8659f.png) no-repeat 0 -771px");
		$(this).addClass("on").removeClass("off");
		is = true;
	} else {
		$(this).css("background", "url(img/siteSprite-se41bd8659f.png) no-repeat 0 -709px");
		$(this).addClass("off").removeClass("on");
		is = false;
	}
}
//点击注册，上传cookie
function registe() {
	if(is) {
		var first = $.cookie("login") == null ? true : false;
		var same = false;
		if(first) {
			$.cookie("login", '[{username:"' + $(".email-inp").val() + '",password:"' + $(".pass-inp").val() + '",name:"' + $(".name-inp").val() + '"}]', {
				expires: 7
			});
			location.href = "index.html";
		} else {
			var str = $.cookie("login");
			var arr = eval(str);
			for(var i in arr) {
				if(arr[i].username == $(".email-inp").val()) {
					$(".email-inp").css("border", "1px solid red");
					$(".email-hint").html("此电子邮箱已被注册");
					is = false;
					same = true;
				}
			}
			if(!same) {
				var obj = {
					username: $(".email-inp").val(),
					password: $(".pass-inp").val(),
					name: $(".name-inp").val()
				};
				arr.push(obj);
				var cookie = JSON.stringify(arr);
				$.cookie("login", cookie, {
					expires: 7
				});
				location.href = "index.html";
			}
		}
	} else {
		alert("请检查输入的信息是否有误");
	}
}