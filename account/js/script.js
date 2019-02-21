Zepto(function($) {
	$("#menu-toggle").on("tap", function() {
		var $menu = $(".menu");
		$menu.slideToggle(300);
		$(this).toggleClass("fa-bars");
		$(this).toggleClass("fa-times");
	});
	var income = getAllMoneyByName("收入");
	var payment = getAllMoneyByName("支出");
	var balance = income - payment;
	$(".finance .income").text(income);
	$(".finance .payment").text(payment);
	$(".finance .balance").text(balance);
});