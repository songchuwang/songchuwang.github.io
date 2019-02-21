/**
 * @file 统计数据展示
 */
function loadData(){
	var billList = getBillList();
	var now=new Date();
	var yearBill=getBillByYear(billList,now.getFullYear());
	var html='';
	for(var i = now.getMonth() + 1;i > 0;i--){
		var monthBill=getBillByMonth(yearBill,i);
		var total=new Object();
		total.payment=0;
		total.income=0;
		for(var j=0;j<monthBill.length;j++){
			if(monthBill[j].childCateID===0){
				total.income+=parseInt(monthBill[j].money);
			}
			else{
				total.payment+=parseInt(monthBill[j].money);
			}
		}
		html+='<dl class="list">'
			 +	'<dt>'+i+'月账单合计</dt>'
			 +  '<dd>收入总计<span class="income">'+total.income+'</span></dd>'
			 +	'<dd>支出总计<span class="payment">'+total.payment+'</span></dd>'
			 +'</dl>';
	}
	$('#statistics-view .main').html(html);
}
Zepto(function($){
	loadData();
})