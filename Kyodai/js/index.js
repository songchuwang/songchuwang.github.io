 // 定义节点的值，每个节点必须要有一个标识它的东西， 这可以是一个值，可以是一张图片或者其他，但需要更改数据结构为其添加一个id
 var list = [{
  img: './img/caocao2.jpg'
},
{
  img: './img/liyu.jpg'
},
{
  img: './img/liubang2.jpg'
},
{
  img: './img/murong.jpg'
},
{
  img: './img/yuanzhang.jpg'
}
]
// 获取根节点section
var section = document.getElementsByTagName('section')[0]
var arrNum = []
// 每个节点的元素值存进arr数组
var arr = []
// 获取点击的节点索引
var node_index = []
// 创建一个标识数组
var arr_exp = []
// 创建一个数组，当visibility:hidden时，将隐藏的div存到该数组中
let card_hide = []
// 定义计时器
let interval = null
let timedown = 30
// 创建一个存放计时器变量的标签div
let node_time = document.createElement('div')
node_time.setAttribute('class', 'time')
node_time.innerText = timedown
document.body.insertBefore(node_time, section);
// 定义计时器动画
var inner = document.querySelector('.inner')
inner.style.width = '100%';
// console.log(parseInt(inner.style.width) -= 1);
var width = parseInt(inner.style.width)
// console.log(width);
setInterval(() => {
if (width > 0) {
  width -= 0.1
  inner.style.width = width + '%'
}
}, 30)

// 匹配规则
var exp = /\b\w+\.(jpg|jpeg|svg|gif|png)$/gm
for (let i = 0; i < list.length; i++) {
// console.log(list[i].img.match(exp));
// 使用split拆分为两部分，然后取.前面部分
let id_card = list[i].img.match(exp)[0].split('.')[0];
list[i].id = id_card
arr_exp.push(id_card)
}
// console.log(arr_exp);
// console.log(list);

// 将数组元素复制一份再添加到原数组中，这里必须要设置长缓存变量len，否则导致重复添加浏览器崩溃
for (let i = 0, len = list.length; i < len; i++) {
list.push(list[i])
}
// console.log(list);

// 生成随机数组函数
Array.prototype.shuffle = function () {
// 设置this始终指向调用数组
_this = this;
// 创建一个空数组
this.re = [];
// 创建一个属性t ，用于保存该数组长度
this.t = this.length;
for (let i = 0; i < this.t; i++) {
  (function (i) {
    // 创建一个存储变量temp
    var temp = _this;
    // 生成一个0~temp.length的整随机数
    var m = Math.floor(Math.random() * temp.length);
    // 分别在空数组re中保存随机数，数组第i位存temp第m位值
    _this.re[i] = temp[m];
    // 删除temp第m位值
    _this.splice(m, 1);
  })(i)
}
return this.re
}

// 生成随机数组
for (let i = 0; i < list.length; i++) {
// let front = document.createElement('div');
(function (i) {
  var a = document.createElement('div')
  // var num = Math.random() * 5 + 1
  // num = parseInt(num, 10)
  a.setAttribute('class', 'card')
  // a.setAttribute('id', 'card' + i)
  section.appendChild(a)
  // a.appendChild(front)
  // console.log(front);//front代表的是10个div节点，而不是一个！
})(i)
};

// 创建class为front和back的div，并添加到父级div
var node_div = document.getElementsByClassName('card')
for (let i = 0; i < node_div.length; i++) {
let front = document.createElement('div')
let back = document.createElement('div')
front.setAttribute('class', 'front')
back.setAttribute('class', 'back')
node_div[i].appendChild(front)
node_div[i].appendChild(back)
}
// console.log(node_div[0]);

// 定义计时器函数
(function () {
if (interval != null) {
  clearInterval(interval)
  interval = null
}
interval = setInterval(countdown, 1000)
})();


function countdown() {
if (timedown == 1) {
  clearInterval(interval)
}
if (timedown > 0) {
  timedown--
  node_time.innerText = timedown
  console.log(timedown);
}
if (timedown == 0) {
  // 让它循环一遍，然后停止
  // for (let i = 0; i < card.length; i++) {
  //   if (getComputedStyle(card[i], null).getPropertyValue('visibility') === 'hidden') {
  //     card_hide.push(card[i].getAttribute('value'))
  //   }
  // }
  console.log(card_hide);
  if (card_hide.length != node_div.length) {
    node_time.innerHTML = '再接再厉！'
  } else {
    node_time.innerText = '成功过关!'
  }
}
}

// 定义点击事件
for (let i = 0; i < list.length; i++) {
(function (i) {
  // 不能再使用getElementsByTagName获取节点，因为存在子div
  var doc = document.getElementsByClassName('card')[i]
  // console.log(doc);
  doc.addEventListener('click', function (e) {
    doc.style.transform = "rotateY(180deg)"
    // 不能设置和使用innerHTML和innerText因为，因为会替换掉子节点
    var docValue = doc.getAttribute('value')
    // 插入一个新值，并返回被删除的值
    arr.splice(arr.length, 0, docValue)
    // console.log(node_div);
    // 将每个节点的索引添加进数组中
    node_index.splice(node_index.length, 0, i)
    // 打印节点索引数组
    console.log('打印点击的节点索引组成的数组');
    console.log(node_index);
    console.log('打印点击的节点索引组成的数组长度');
    console.log(node_index.length);
    console.log('打印点击的节点索引组成的数组最后一个索引');
    console.log(node_index[node_index.length - 1]);
    // 测试为偶数节点判定为true
    console.log('是否是第偶数次点击');
    console.log((node_index.length % 2) == 0);
    // 打印每个元素节点
    // console.log(node_div[node_index[node_index.length-1]])
    if (node_index.length > 1) {
      // 当点击奇数次时的值和偶数次时的值不相同，且在第偶数次时进行操作
      /*
        node_div 指section元素下所有子div数组
        node_index 指点击的节点索引组成的数组
        属性value用于标识section元素下成对div，用于判断两个张卡片是否相等，因为是通过js创建元素，所以不能使用innerHTML或innerText
      */
      // 如果数组最后一个值与它之前一个值不相等，且第偶数次点击进行判断
      var pre_div = node_div[node_index[node_index.length - 1]]
      var last_div = node_div[node_index[node_index.length - 2]]
      var pre_index = node_index[node_index.length - 2]
      var last_index = node_index[node_index.length - 1]

      if (((last_div.getAttribute('value')) != (pre_div.getAttribute('value'))) && (node_index.length % 2) ==
        0) {
        setTimeout(() => {
          last_div.style.transform = "rotateY(0deg)"
          pre_div.style.transform = "rotateY(0deg)"
        }, 600)
        // 当点击奇数次时的值和偶数次时的值相同，且在第偶数次时进行操作
      } else if ((last_index == pre_index)) {
        // if嵌套，当连续点击自身时，
        if ((node_index.length % 2) == 0) {
          last_div.style.transform = "rotateY(0deg)"
        } else {
          last_div.style.transform = "rotateY(180deg)"
        }
      } else if (((pre_div.getAttribute('value')) == (last_div.getAttribute('value'))) &&
        (node_index.length % 2) == 0 && (pre_index != last_index)) {
        pre_div.style.visibility = 'hidden';
        last_div.style.visibility = 'hidden';
        card_hide.push(pre_div.getAttribute('value'))
        card_hide.push(last_div.getAttribute('value'))          
        if (card_hide.length == node_div.length) {
          clearInterval(interval)
          node_time.innerHTML = '优秀！'        
        }
        console.log(card_hide);
      }
      // else if(getComputedStyle(document.querySelectorAll('.card')[i], null).getPropertyValue('visibility') === 'hidden'){

      // }
    }
  })
})(i)
}
// 把list随机排序，然后赋值给节点
const shuffle = list.shuffle()
// console.log(shuffle);
for (let j = 0; j < shuffle.length; j++) {
// 获取节点
// let doc = document.getElementsByTagName('div')[j]
let doc = document.getElementsByClassName('card')[j]
let back = document.getElementsByClassName('back')[j]
arrNum = shuffle[j].id;
doc.setAttribute('value', arrNum)
// 不能设置和使用innerHTML和innerText因为，因为会替换掉子节点
// doc.innerText = arrNum
back.classList.add(arrNum)
back.style.backgroundImage = `url(${shuffle[j].img})`
// doc.setAttribute('class', 'card' + ' ' + arrNum)
console.log(arrNum);
}
