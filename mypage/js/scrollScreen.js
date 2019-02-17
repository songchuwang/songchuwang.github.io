var wrap = document.querySelector('#wrap')
var main = document.querySelector('#main')
var page = document.querySelectorAll('.page')
var nav = document.querySelectorAll('.link')

var startTime = 0,
  endTime = 0,
  now = 0;
// 定义一个数组，把每次点击的时间戳存起来
var arr_time = [];
// 定义所有点击索引的数组
var arr_click = []

var clientHeight = document.body.clientHeight

wrap.style.height = clientHeight + 'px';
for (let i = 0; i < page.length; i++) {
  page[i].style.height = clientHeight + 'px'
  console.log(page[i].style.height);

}
// console.log(main.offsetTop);
if (navigator.userAgent.toLowerCase().indexOf('firefox') != -1) {
  document.addEventListener('DOMMouseScroll', scrollFun, false)
  // 非IE现代浏览器
} else if (document.addEventListener) {
  document.addEventListener('mousewheel', scrollFun, false)
} else if (document.attachEvent) {
  document.attachEvent('onmousewheel', scrollFun, false)
} else {
  document.onmousewheel = scrollFun;
}

function scrollFun(e) {
  startTime = new Date().getTime()
  var delta = e.detail || (-e.wheelDelta)
  var nav_index = 0;

  if ((endTime - startTime) < -800) {
    if (delta > 0 && parseInt(main.offsetTop) > -(clientHeight * (page.length - 1))) {
      // 向下滚动
      // 第二屏时，main.offsetTop是0，第三屏时，main.offsetTop是-840
      console.log(main.offsetTop);
      now = now - clientHeight;
      nav_index = -now / clientHeight;
      console.log(nav_index);

      toPage(now, nav_index)

    }
    if (delta < 0 && parseInt(main.offsetTop) < 0) {
      // 向上滚动
      now = now + clientHeight;
      nav_index = -now / clientHeight;
      console.log(nav_index);
      toPage(now, nav_index)
    }
    endTime = new Date().getTime()
  } else {
    e.preventDefault()
  }
}

// 网页加载时，让第一个链接突出显示
window.onload = function () {
  nav[0].style.color = '#fff';
}
// 定义点击链接时改变链接样式的事件，必须进行事件节流
for (let i = 0; i < page.length; i++) {
  (function (i) {
    nav[i].addEventListener('click', (e) => {
      // 再遍历所有链接，让颜色重置为黑
      var time = new Date().getTime();
      arr_click.push(i)
      console.log(arr_click);

      console.log(time);
      arr_time.push(time)
      console.log(arr_time);
      for (let j = 0; j < nav.length; j++) {
        nav[j].style.color = '#2b2b2b';
      };
      console.log(-(clientHeight * i) + 'px');
      now = -(clientHeight * i);
      console.log(`now:${now}`);


      if (arr_time.length > 1) {
        // console.log(arr_time[arr_time.length - 1] - arr_time[arr_time.length - 2]);
        if (arr_time[arr_time.length - 1] - arr_time[arr_time.length - 2] > 500) {
          $('#main').animate({
            top: (now + 'px')
            // 点击时调用一个事件节流函数
          }, 400);
          nav[i].style.color = '#fff'
        } else {

          nav[arr_click[arr_click.length - 2]].style.color = 'red';
          arr_click.pop(arr_click.length - 1);

        }
      } else {
        $('#main').animate({
          top: (now + 'px')
          // 点击时调用一个事件节流函数
        }, 400);
        nav[i].style.color = '#fff'
      }
    });
  })(i)
}


function toPage(now, nav_index) {
  console.log(`now: ${now}`);
  console.log(`nav_index: ${nav_index}`);
  $('#main').animate({
    top: (now + 'px')
  }, 600);
  // 滚屏时改变链接样式
  for (let i = 0; i < page.length; i++) {
    nav[i].style.color = '#2b2b2b';
  }
  nav[nav_index].style.color = '#fff';

}

