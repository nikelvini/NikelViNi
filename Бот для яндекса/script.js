// ==UserScript==
// @name         Bot for yandex
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @match        xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @grant        none
// ==/UserScript==



let btn= document.getElementsByClassName("button_theme_websearch")[0];
let yandexInput = document.getElementById('text');
let keywords = ["гобой", "как звучит флейта", "кларнет","саксофон"];
let keyword = keywords [getRandom(0,keywords.length)];
let links= document.links;
let i=0;

 if (btn != undefined){
      let timerId = setInterval(()=>{
        yandexInput.value += keyword[i];
        i++;
        if (i==keyword.length){
            clearInterval(timerId);
            btn.click(); /*document.getElementsByTagName('button')[0].click();*/
        }
    },1000);
 }else if (location.hostname =="xn----7sbab5aqcbiddtdj1e1g.xn--p1ai"){
    setInterval (()=>{
        let index= getRandom(0,links.length);
        if(getRandom(0,101)>=80){location.href="https://yandex.ru/";} /*с вероятностью 20% уйдет с целевого сайта обратно на главную страницу поисковика*/
        else if (links[index].href.indexOf("xn----7sbab5aqcbiddtdj1e1g.xn--p1ai")!= -1){
        links[index].click();}
    },
        getRandom(3000,7000));

}else{
    let nextYandexPage= true;
    for(let i=0; i<links.length; i++){
        if(links[i].href.indexOf("xn----7sbab5aqcbiddtdj1e1g.xn--p1ai") != -1){
           let link=links[i];
           link.removeAttribute("target");
            nextYandexPage=false;
            setTimeout (()=>{link.click();},getRandom(1000,5000));
            break;}
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

