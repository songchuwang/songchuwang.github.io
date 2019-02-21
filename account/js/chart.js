/**
 * @file 图表数据展示
 */
function loadChart(){
	'use strict';
	var billList = getBillList();
	var income = getAllMoneyByName("收入");
	var payment = getAllMoneyByName("支出");
	var balance = income - payment;
	$(".finance .income").text(income);
	$(".finance .payment").text(payment);
	$(".finance .balance").text(balance);
	var childCate = getChildCateByPID(1);
	//饼图数据
	var data = [];
	for (var i = 0; i < childCate.length; i++) {
		var sum = 0;
		for (var j = 0; j < billList.length; j++) {
			if (childCate[i].id === billList[j].childCateID) {
				sum += parseInt(billList[j].money);
			}
		}
		if (sum !== 0) {
			data.push(new Array(childCate[i].name, sum / payment));
		}
	}
	// Build pie chart
	var pieChart;
	pieChart = new Highcharts.Chart({
		chart: {
			renderTo: 'pie',
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false
		},
		title: {
			text: '支出占比饼图'
		},
		tooltip: {
			pointFormat: '{point.name}: <b>{point.percentage:.2f}%</b>'
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: false,
				},
				showInLegend: true
			}
		},
		series: [{
			type: 'pie',
			name: '支出占比',
			data: data
		}]
	});
	//Build line chart
	//获取本月底的日期
	var date=new Date(new Date().getFullYear(),new Date().getMonth()+1,0);
	//当前年份的账单
	var yearBill=getBillByYear(billList,date.getFullYear());
	//当月的账单
	var monthBill=getBillByMonth(yearBill,date.getMonth()+1);
	//账单的开始日期和结束日期
	var start=1;
	var end=date.getDate();
	//从月初到月底的账单
	var daysBill=getDaysBill(monthBill,1,end);
	var days=[];
	for(var i=1;i<=end;i++){
		days.push(i);
	}
	var lineChart;
	lineChart = new Highcharts.Chart({
		chart: {
			animation: true,
			renderTo: 'line',
			defaultSeriesType: 'line',
			marginRight: 130,
			marginBottom: 25
		},
		plotOptions: {
			series: {
				animation: true,
				states: {
					hover: {
						enabled: false
					}
				}
			}
		},
		title: {
			text: '当月收入/支出折线图',
			x: -20 //center
		},
		xAxis: {
			categories: days
		},
		yAxis: {
			plotLines: [{
				value: 0,
				width: 1,
				color: '#808080'
			}]
		},
		tooltip: {

		},
		legend: {
			layout: 'vertical',
			align: 'right',
			verticalAlign: 'top',
			x: -10,
			y: 100,
			borderWidth: 0
		},
		series: [{
			name: '收入',
			data: daysBill.income
		}, {
			name: '支出',
			data: daysBill.payment
		}]
	});
}
Zepto(function($){
	loadChart();
});
