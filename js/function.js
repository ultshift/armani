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
	var login_index = null;
	var username = false;
	$(".username").blur(function() {
		var oValue = $(this).val().replace(/\s/g, "");
		$(this).val(oValue);
		var str = $.cookie("login");
		var arr = eval(str);
		for(var i in arr){
			if($(this).val() == arr[i].username){
				$(this).css("border", "1px solid #A9A9A9");
				$(".username-hint").html("&nbsp;");
				username = true;
				login_index = i;
			}	
		}
		if(!username){
			$(this).css("border", "1px solid red");
			$(".username-hint").html("无效的电子邮箱地址");
		}
		
	});
	var pass = false;
	$(".password").blur(function() {
		var oValue = $(this).val().replace(/\s/g, "");
		$(this).val(oValue);
		var str = $.cookie("login");
		var arr = eval(str);
		for(var i in arr){
			if(i == login_index && $(this).val() == arr[i].password){
				$(this).css("border", "1px solid #A9A9A9");
				$(".password-hint").html("&nbsp;");
				pass = true;
			}	
		}
		if(!pass){
			$(this).css("border", "1px solid red");
			$(".password-hint").html("密码不符");
		}	
	});
	$("#login_in").click(function(){
		if(username && pass){
			$(".login-btn").css("display","none");
			$(".login-out").css("display","block");
			$(".hello").css("display","block");
			$(".collect-btn").css("display","block");
			$("#login").animate({
				height: 0
			}, 500, "linear");
			$(".login-btn").css({
				background: "#fff",
				color: "#999"
			});
			$.cookie("login-in","[{titlt:1}]",{expires:7});
			$("#coverDiv").css("display", "none");
		}else{
			alert("请输入正确的信息");
		}
	});
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
	$("#login_in").hover(function() {
		$(this).css("background-color", "#989898");
	}, function() {
		$(this).css("background-color", "#000");
	});
	
}
function loginOut(){
	$(".login-btn").css("display","block");
	$(".login-out").css("display","none");
	$(".hello").css("display","none");
	$(".collect-btn").css("display","none");
	$.cookie("login-in",null);
}
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
	if($.cookie("login-in")){
		$(".login-btn").css("display","none");
		$(".login-out").css("display","block");
		$(".hello").css("display","block");
		$(".collect-btn").css("display","block");
	}
}

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

function nav(data) {
	for(var i = 0; i < data.length; i++) {
		$("<li></li>").html(data[i].title).appendTo($(".top-nav").find("ul"));
	}
}

function goTopShow() {
	if($(document).scrollTop() > 0) {
		$(".gotop").css("display", "block");
	} else {
		$(".gotop").css("display", "none");
	}
}

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

function footsite(data) {
	for(var i in data) {
		$('<li class="site-nav site-animate">' + data[i].title + '<ol></ol></li>').appendTo($(".site").find("ul"));
	}
	$(".site-nav:first").addClass("site-first").removeClass("site-animate");
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

function giorgioNav(data) {
	for(var i in data) {
		$('<li class="menu-title"><a class="menutitle-link" first="' + i + '">' + data[i].title + '</a></li>').appendTo($(".menu-first"));
	}
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

function giorgio(data) {
	$(".content").css("height", 1.49 * $(".content").width());
	$("#coverDiv").css("height", $("#middle").height());
	for(var i in data) {
		if(data[i].child) {
			$('<ul class="slideme"></ul><ol class="numbers"></ol><button class="prev">‹</button><button class="next">›</button>').appendTo($(".pic").eq(i));
		} else {
			$('<img src="' + data[i].url + '">').appendTo($(".pic").eq(i));
			$('<h4>' + data[i].name + '</h4>').appendTo($(".pic").eq(i));
			$('<p class="choose-btn">立即选购</p>').appendTo($(".pic").eq(i));
		}
	}
	for(var i in data) {
		for(var j in data[i].child) {
			if(data[i].child[j].name) {
				$('<li><img src="' + data[i].child[j].url + '"><h4>' + data[i].child[j].name + '</h4><p class="choose-btn">立即选购</p></li>').appendTo($(".slideme").eq(i));
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
	$(".filter-menu").mouseover(function() {
		$(this).find(".square").addClass("square-down");
	});
	$(".filter-menu").mouseout(function() {
		$(this).find(".square").removeClass("square-down");
	});
	$(".filter-menu").click(function() {
		$(this).siblings().mouseout(function() {
			$(this).find(".square").removeClass("square-down");
		});
		$(this).unbind("mouseout");
		$(this).siblings().find(".square").removeClass("square-down");
		$(this).find(".square").addClass("square-down");
	});
	$(".filter-delete").hover(function() {
		$(this).css("background-color", "#A6A6A6");
	}, function() {
		$(this).css("background-color", "#000");
	});
	$(".filter-btn").click(function() {
		$(".filter").animate({
			height: 400
		}, 500, "linear");
	});
	$(".filter-delete").click(function() {
		$(".filter").animate({
			height: 50
		}, 500, "linear");
	})
}

function newArrival(data) {
	for(var i in data) {
		$('<div class="item"><a href="' + data[i].href + '" class="item-pic"><img class="photo current" src="' + data[i].nfimg + '"/><img class="photo" src="' + data[i].nrimg + '"/></a><div class="item-text"><p class="item-title">' + data[i].title + '</p><p class="item-prico">' + data[i].prico + '</p><p class="item-size">' + data[i].size + '</p></div></div>').appendTo($(".center-page"));
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

function Cabancoat(data) {
	$('<img src="' + data[0].nfimg + '" /><img src="' + data[0].nrimg + '" /><img src="' + data[0].ndimg + '" />').appendTo($(".master"));
	$(".title").html(data[0].title);
	$(".price").html(data[0].price);
	$(".color").html(data[0].color);
	for(var i in data[0].size) {
		$('<option>' + data[0].size[i].num + '</option>').appendTo($(".size"));
	}
	$(".coding").html(data[0].coding);
	$(".tabs-text").eq(0).html(data[0].texture);
	$('<ul class="tabs-list"></ul>').appendTo($(".tabs-text").eq(1));
	for(var i in data[0].details) {
		$('<li>' + data[0].details[i].txt + '</li>').appendTo($(".tabs-list"));
	}
	$(".tabs-text").eq(2).html(data[0].model);
	$(".tabs-text").eq(3).html(data[0].serve);
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
	$(".addshop").hover(function() {
		$(this).css("background-color", "#949494");
	}, function() {
		$(this).css("background-color", "#000");
	});
	$(".collect").hover(function() {
		$(this).css("background-color", "#949494");
	}, function() {
		$(this).css("background-color", "#bababa");
	});
	$(".weibo").hover(function() {
		$(this).css("background", "url(img/siteSprite-se41bd8659f.png) no-repeat 0 -3518px");
	}, function() {
		$(this).css("background", "url(img/siteSprite-se41bd8659f.png) no-repeat 0 -3458px");
	})
	$(".description").hover(function() {
		$(this).css("border-left", "2px solid #000");
	}, function() {
		$(this).css("border-left", "2px solid #fff");
	});
	$(".tabs-text:first").css("display", "block");
	$(".tabs li").click(function() {
		$(".tabs li").removeClass("open");
		$(".tabs-text").slideUp(700);
		$(this).addClass("open");
		$(this).find(".tabs-text").slideDown(700);
	});
	$("#coverDiv").css("height", $("#middle").height());
}
var is = false;

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