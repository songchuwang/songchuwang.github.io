import '../index.scss';

let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;

let htmlDom = document.getElementsByTagName('html')[0];

htmlDom.style.fontSize = htmlWidth / 10 + 'px';

//动态修改fontsize
window.addEventListener('resize',(e)=>{
    let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
    htmlDom.style.fontSize = htmlWidth /10 + 'px';
})