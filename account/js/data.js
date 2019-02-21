/**
 * @file 处理账目的增删改查
 */
//----------------------------------------我是分隔线-------------------------
/*
 * 总分类结构
 * id:分类ID
 * name:分类名称
 */
var categories = [{
	id: 0,
	name: "收入"
}, {
	id: 1,
	name: "支出"
}];
/*
 * 子分类结构
 * id:子分类ID
 * name:子分类名称
 * className:子分类对应的类名
 * pid:父分类ID
 */
var childCate = [{
	id: 0,
	name: "收入",
	className: "fa fa-usd",
	pid: 0
}, {
	id: 1,
	name: "住宿",
	className: "fa fa-home",
	pid: 1
}, {
	id: 2,
	name: "衣服",
	className: "fa fa-female",
	pid: 1
}, {
	id: 3,
	name: "饮食",
	className: "fa fa-coffee",
	pid: 1
}, {
	id: 4,
	name: "交通",
	className: "fa fa-plane",
	pid: 1
}, {
	id: 5,
	name: "购物",
	className: "fa fa-shopping-cart",
	pid: 1
}, {
	id: 6,
	name: "其它",
	className: "fa fa-heart",
	pid: 1
}];
/*
 * 账单结构
 * id:账单id
 * childID:子分类ID
 * money:金额
 * date:账单建立日期
 * isDeleted:标识是否已经删除
 */
var billList = [];
function getCategories(){
	return categories;
}
function getChildCates(){
	return childCate;
}
/**
 * 返回未删除的账目列表
 * @return {Array} bill
 */
function getBillList() {
	var bill = [];
	for (var i = 0; i < billList.length; i++) {
		if (billList[i].hasOwnProperty('isDeleted')&&!billList[i].isDeleted) {
			bill.push(billList[i]);
		}
	}
	return bill;
}
//----------------------------------------我是分隔线-------------------------
/**
 * 使用函数构造新的账目对象
 * @param {int} id
 * @param {int} childCateID
 * @param {float} money
 * @param {Date} date
 */
function item(id, childCateID, money, date) {
	this.id = id;
	this.childCateID = childCateID;
	this.money = money;
	this.date = date;
	this.isDeleted = false;
}
/**
 * 根据id从查询对应的子分类
 * @param {int} id
 * @return {Object} category
 */
function getChildCateByID(id) {
	for (var i = 0; i < childCate.length; i++) {
		if (childCate[i].id === id) {
			return childCate[i];
		}
	}
}
/**
 * 根据名字查询对应的子分类
 * @param {String} name
 * @return {Object} category
 */
function getChildCateByName(name) {
	var arr = [];
	for (var i = 0; i < childCate.length; i++) {
		if (childCate[i].name === name) {
			return childCate[i];
		}
	}
}
/**
 * 根据父分类ID返回子分类集合
 * @param {int} pid
 * @return {Array<Object>} arr<category>
 */
function getChildCateByPID(pid) {
	var arr = [];
	for (var i = 0; i < childCate.length; i++) {
		if (childCate[i].pid === pid) {
			arr.push(childCate[i]);
		}
	}
	return arr;
}
/**
 * 根据类型名获取对应的父分类
 * @param {String} name
 * @return {Object} categories
 */
function getCateByName(name) {
	for (var i = 0; i < categories.length; i++) {
		if (categories[i].name === name) {
			return categories[i];
		}
	}
}
/**
 * 根据子分类ID获取账目
 * @param {int} id
 * @return {Array} bill
 */
function getBillByChildCateID(id) {
	var bill = [];
	for (var i = 0; i < billList.length; i++) {
		if (billList[i].childCateID === id) {
			bill.push(billList[i]);
		}
	}
	return bill;
}
/**
 * 根据id获取对应账目
 * @param {int} id
 * @return {Object} item
 */
function getItemByID(id) {
	for (var i = 0; i < billList.length; i++) {
		if (billList[i].id === id) {
			return billList[i];
		}
	}
}
/**
 * 添加新的账单项目
 */
function addItem() {
	var id = billList.length<=0?0:billList[billList.length - 1].id + 1;
	var childCate = getChildCateByName($(".input-area").children("span").text());
	var money = $(".txt-amount").val();
	var today = new Date();
	var date = (today.getFullYear()) + "/" + (today.getMonth() + 1) + "/" + today.getDate();
	var newItem = new item(id, childCate.id, money, date);
	billList.push(newItem);
	save();
}

/**
 * 软删除一个收支条目
 * @param {int} id
 * @return {Boolean} bool
 */
function deleteItem(id) {
	if (id < 0 || id >= billList.length) {
		return false;
	}
	var item = getItemByID(id);
	if (item && !item.isDeleted) {
		item.isDeleted = true;
		save();
		alert("删除成功");
		return true;
	}

	return false;
}

/**
 * 修改一个收支条目的金额
 * @param {int} id
 * @param {String} money
 * @return {Boolean} bool
 */
function editItem(id, money) {
	if (id < 0 || id >= billList.length) {
		return false;
	}
	var item = billList[id];
	if (item && item.money !== money) {
		item.money = money;
		save();
		alert("修改成功");
		return true;
	}
	return false;
}
/**
 * 根据类型(收入/支出)获取对应分类的所有金额
 * @param {String} name
 * @return {int} sum
 */
function getAllMoneyByName(name) {
	var cate = getCateByName(name);
	var childCates = getChildCateByPID(cate.id);
	var arr = [];
	var sum = 0;
	for (var i = 0; i < childCates.length; i++) {
		var bill = getBillByChildCateID(childCates[i].id);
		for (var j = 0; j < bill.length; j++) {
			if (!bill[j].isDeleted) {
				sum += parseInt(bill[j].money);
			}
		}
	}
	return sum;
}
/**
 * 根据年份获取这一年的账单
 * @param {Array} billList
 * @param {int} year
 * @return {Array} arr
 */
function getBillByYear(billList, year) {
	var arr = [];
	for (var i = 0; i < billList.length; i++) {
		if (billList[i].date.split("/")[0] == year) {
			arr.push(billList[i]);
		}
	}
	return arr;
}
/**
  * 根据月份获取当月的数据
  * @param {Array} billList
  * @param {int} month
  * @return {Array} arr
  */
function getBillByMonth(billList, month) {
	var arr = [];
	for (var i = 0; i < billList.length; i++) {
		if (billList[i].date.split("/")[1] == month) {
			arr.push(billList[i]);
		}
	}
	return arr;
}
/**
 * 获取这个月从start到end天数的账单
 * @param {Array} monthBill
 * @param {int} start
 * @param {int} end
 * @return {Object} bill
 */
function getDaysBill(monthBill, start, end) {
	var inList = [];
	var payList = [];
	var bill = {};
	for (var i = start; i <= end; i++) {
		var incomeSum = 0;
		var paymentSum = 0;
		for (var j = 0; j < monthBill.length; j++) {
			if (monthBill[j].date.split("/")[2] == i) {
				var childCate = getChildCateByID(monthBill[j].childCateID);
				if (childCate.pid === 0) {
					incomeSum += parseInt(monthBill[j].money);
				} else if (childCate.pid === 1) {
					paymentSum += parseInt(monthBill[j].money);
				}
			}
		}
		inList.push(incomeSum);
		payList.push(paymentSum);
	}
	bill.income = inList;
	bill.payment = payList;
	return bill;
}
/*
 * 使用localStorage保存数据
 */
function save() {
	localStorage.setItem("categories", JSON.stringify(categories));
	localStorage.setItem("childCate", JSON.stringify(childCate));
	localStorage.setItem("billList", JSON.stringify(billList));
}
Zepto(function($) {
	if (!localStorage.getItem("billList")) {
		save();
	}
	billList = JSON.parse(localStorage.getItem("billList"));
	categories = JSON.parse(localStorage.getItem("categories"));
	childCate = JSON.parse(localStorage.getItem("childCate"));
});
