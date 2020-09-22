// ==UserScript==
// @name         Bot for yandex
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @match        https://crushdrummers.ru/*
// @grant        none
// ==/UserScript==


let sites ={
    "xn----7sbab5aqcbiddtdj1e1g.xn--p1ai":["гобой", "как звучит флейта", "кларнет","саксофон","тромбон","валторна"],
    "crushdrummers.ru":["Барабанное шоу","заказать барабанное шоу","шоу барабанщиков в Москве"]
};
let site = Object.keys(sites)[getRandom(0,Object.keys(sites).length)];
let btn= document.getElementsByClassName("button_theme_websearch")[0];
let yandexInput = document.getElementById('text');
let keywords = sites[site];
let keyword = keywords [getRandom(0,keywords.length)];
let links= document.links;
let i=0;

 if (btn != undefined){
     document.cookie = 'site='+site;
 }else if (location.hostname=="yandex.ru"){
    site=getCookie('site');
}else{
    site = location.hostname;
}

 if (btn != undefined){
     document.cookie = 'site='+site;
     let timerId = setInterval(()=>{
     yandexInput.value += keyword[i];
     i++;
        if (i==keyword.length){
            clearInterval(timerId);
            btn.click();
        }
     },1000);
 }else if (location.hostname ==site){
    setInterval (()=>{
        let index= getRandom(0,links.length);
        if(getRandom(0,101)>=80){location.href="https://yandex.ru/";} /*с вероятностью 20% уйдет с целевого сайта обратно на главную страницу поисковика*/
        else if (links[index].href.indexOf(site)!= -1){
        links[index].click();}
    },
        getRandom(3000,7000));

}else{
    let nextYandexPage= true;
    for(let i=0; i<links.length; i++){
        if(links[i].href.indexOf(site) != -1){
           let link=links[i];
           link.removeAttribute("target");
           nextYandexPage=false;
           setTimeout (()=>{link.click();},getRandom(1000,5000));
           break;
        }
    }
    if (document.querySelector(".pager__item_kind_page").innerText =="10"){
        nextYandexPage=false;
        location.href="https://yandex.ru/";
        }
    if (nextYandexPage){
        setTimeout (()=>{document.querySelector(".pager__item_kind_next ").click();},getRandom(1000,5000));
        }
}
function getRandom(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
