/**
 * @file 页面之间的切换动画以及元素的展示和隐藏。
 */
/**
 * 显示金额计算器
 * @param {String} icon 账目图标
 * @param {String} childCate 账目分类
 * @param {String} amount 金额
 * @param {int} id 账目id
 */
function showCalculator(icon, childCate, amount, id) {
	var $input = $(".input-area");
	$input.children("i").attr("class", icon);
	$input.children("span").text(childCate);
	$(".txt-amount").val(amount || '');
	$(".calc").attr('id', 'calc-item-' + (id || ""));
	$(".calc").show();
	$(".txt-amount").triggerHandler("focus");
	$(document.body).one('click touchmove', function (e) {
		if ($(e.target).parents('table').length <= 0) {
			$('.calc').hide();
		}
	});
}
$('.keyboard').on('touchstart','td',function(){
	$(this).addClass('on');
});
$('.keyboard').on('touchend','td',function(){
	$(this).removeClass('on');
});
/**
 * 计算器键盘点击事件处理
 */
//计算结果
var result = '';
$('.keyboard').on('click', 'td', function (e) {
	var $this=$(this);
	var $amount = $('.txt-amount');
	var $toggle = $('#toggle-save');
	//数字0-9
	if (RegExp('[0-9]').test($this.text())) {
		if ($this.text() === '0' && $amount.val().length < 1) {
			return;
		}
		$amount.val($amount.val() + $this.text());
		//字母C 清除所有输入
	} else if ($this.text().toLowerCase() === 'c') {
		$amount.val('');
		result = '';
		//加号
	} else if ($this.text() === '+' && $amount.val().length > 0) {
		result += $amount.val();
		result += '+';
		$toggle.text('=');
		$toggle.css('color', '#000');
		$amount.val('');
		//减号
	} else if ($this.text() === '-' && $amount.val().length > 0) {
		result += $amount.val();
		result += '-';
		$toggle.text('=');
		$toggle.css('color', '#000');
		$amount.val('');
		//等号
	} else if ($this.text() === '=') {
		result += $amount.val();
		$amount.val(eval(result));
		$toggle.text('OK');
		$toggle.css('color', '#e66b14');
		result = '';
		//ok 保存输入项
	} else if ($this.text() === 'OK') {
		var amount = eval($amount.val());
		if (amount && (amount * 100 === Math.floor(amount * 100))) {
			if (location.hash === '#/index/edit') {
				addItem();
				var isContinue = confirm('成功添加一条账单记录，是否继续添加');
				if (!isContinue) {
					location.hash = '#/index/bill';
				}
				else {
					$amount.val('');
				}
			} else {
				var itemId = ($(this).parents('.calc').attr("id") || '').split('-')[2] || 0;
				if (editItem(itemId, amount)) {
					$(".calc").hide();
					var $item = $("#" + itemId).children(".item");
					if ($item.children(".payment").length > 0) {
						$item.children(".payment").text(amount);
					} else {
						$item.children(".income").text(amount);
					}
					$item.css("marginLeft", "0");
					$("#cancel").hide();
					$("#menu-toggle").show();
					$(".header-right").show();
				}
			}
		} else {
			alert("您输入的金额好像不对 >_<");
		}
		loadChart();
		loadData();
	} else if ($this.text() === "." && $amount.val().indexOf(".") < 0) {
		$amount.val($amount.val() + $this.text());
	} else if (($this.children("i").length > 0 && $this.children("i").hasClass("fa-long-arrow-left")) || $target.hasClass("fa-long-arrow-left")) {
		$amount.val($amount.val().substr(0, $amount.val().length - 1));
	}
});
/**
 * 显示子分类图标
 */
function showChildCate() {
	var html = '';
	var categories = getCategories();
	for (var i = 0; i < categories.length; i++) {
		var childs = getChildCateByPID(categories[i].id);
		html += '<ul class="row clearfix">';
		for (var j = 0; j < childs.length; j++) {
			if (j !== 0 && j % 4 === 0) {
				html += '</ul><ul class="row clearfix">';
			}
			html += '' + '<li>' + '<i class="' + childs[j].className + '"></i>' + '<span>' + childs[j].name + '</span>' + '</li>';
		}
		html += '</ul>';
	}
	$("#edit-wrapper").html(html);
}
/**
 * 显示账单列表
 */

function showBillList() {
	var html = '';
	var billList = getBillList();
	for (var i = billList.length - 1; i >= 0; i--) {
		if (!billList[i].isDeleted) {
			var child = getChildCateByID(billList[i].childCateID);
			var fontColor = child.pid === 0 ? "income" : "payment";
			html += '' + '<li id=' + billList[i].id + '>' + '<div class="item">' + '<i class="' + child.className + '"></i>' + '<span class="cate">' + child.name + '</span>' + '<span class=' + fontColor + '>' + billList[i].money + '</span>' + '<span class="date">' + billList[i].date + '</span>' + '</div>' + '<div class="edit"></div>' + '</li>';
		}
	}
	html = html.length > 1 ? html : '<div class="nobill-msg"><p>您目前还没有账单哦，快来记一笔吧~~<p><a href="#/index/edit">开始记账</a></div>';
	$("#bill-wrapper .bill").html(html);
	addEditPanelToBillItems();
}
/**
 * 切换视图
 * @param {Element} $next 需要切换的视图
 */
function switchView($next) {
	var $current = $(".current-view");
	$current.removeClass('current-view');
	$next.addClass("current-view");
}
var _editPanelWidth; // protected variable indicating the width of editPanel of bill item
/**
 * 添加收支条目编辑界面(修改金额/删除)
 */
function addEditPanelToBillItems() {
	function getEditPanelWidth(el) {
		var income, payment;
		income = $(el).find(".income");
		if (income.length === 0) {
			payment = $(el).find(".payment");
		}

		return (payment || income).position().left;
	}

	var editPanelHtml = "<i class=\"fa fa-pencil modify\"></i><i class=\"fa fa-trash-o delete\"></i>";
	$(".bill .edit").each(function () {
		$(this).html(editPanelHtml);
		_editPanelWidth = _editPanelWidth || getEditPanelWidth($(this).prev()[0]);
		$(this).css("width", _editPanelWidth);
	});

	//编辑事件
	$(".edit .delete").on("click", function () {
		deleteItem(parseInt($(this).parent().parent().attr('id'), 10));
		showBillList();
	});

	$(".edit .modify").on("click", function (e) {
		var $item = $(this).parent().prev(), amount;
		if ($item.length > 0) {
			amount = ($item.children(".payment").length > 0) ? $item.children(".payment").text() : $item.children(".income").text();
			showCalculator($item.children("i").attr("class"), $item.children(".cate").text(), amount, $item.parent().attr('id'));
			e.stopPropagation();
		}
	});

	//滑动
	var startX, currX, startY, currY;
	$(".bill .item").on("touchmove", function (e) {
		currX = e.changedTouches[0].pageX;
		currY = e.changedTouches[0].pageY;
		if (currY - startY >= -10 && currY - startY <= 10) {
			e.preventDefault();
			e.stopPropagation();
			if (currX < startX) {
				$(this).addClass("displayEdit");
				// towards left
				$(this).animate({
					"margin-left": -getEditPanelWidth(this)
				}, "slow");
			} else {
				$(this).removeClass("displayEdit");
				//towards right
				$(this).animate({
					"margin-left": 0
				}, "slow");
			}
		}
	});
	$(".bill .item").on("touchstart", function (e) {
		startX = e.changedTouches[0].pageX;
		startY = e.changedTouches[0].pageY;
	});
}
//点击菜单切换页面
$('.menu').on('click', 'a', function (e) {
	$('.menu').slideToggle(200);
	$('#menu-toggle').toggleClass('fa-bars fa-times');
});
//根据hash值切换页面
function hashChange() {
	var hash = location.hash;
	var split = hash.split('/');
	$('.menu .on').removeClass('on');
	if (split.length <= 1 || split[1] === 'index') {
		$('.menu li').eq(0).addClass('on');
		if (split[2]) {
			if (split[2] === 'bill') {
				$('#bill-wrapper,#menu-toggle,#enterEditPage').show();
				$('#edit-wrapper,#enterBillPage').hide();
				$('.header').removeClass('edit-style');
				$(".header span").text("记账本");
				showBillList();
			}
			else if (split[2] === 'edit') {
				$('.fa-times,#edit-wrapper').show();
				$('#bill-wrapper,.menu,#menu-toggle,#enterEditPage').hide();
				$('.header').addClass('edit-style');
				$(".header span").text("记一笔");
			}

		}
		else {
			switchView($('#index-view'));
			$('#enterEditPage').show();
		}
		$('.calc').hide();
	}
	else if (split[1] === 'statistics') {
		$('.menu li').eq(1).addClass('on');
		switchView($('#statistics-view'));
		$('#enterEditPage').hide();
	}
	else if (split[1] === 'chart') {
		$('.menu li').eq(2).addClass('on');
		switchView($('#chart-view'));
		$('#enterEditPage').hide();
	}
}
Zepto(function ($) {
	FastClick.attach(document.body);
	//页面切换
	window.onhashchange = hashChange;
	showChildCate();
	showBillList();
	//显示项目金额输入区域
	$('#edit-wrapper .row').on('click', 'li', function (e) {
		e.stopPropagation();
		showCalculator($(this).children('i').attr('class'), $(this).children('span').text(), '');
	});
	//展开菜单
	$("#menu-toggle").on("click", function () {
		var $menu = $(".menu");
		var that = this;
		if ($("#bill-wrapper").css("display") !== "none") {
			$menu.slideToggle(300);
			$(that).toggleClass("fa-bars");
			$(that).toggleClass("fa-times");
		}
	});
});
