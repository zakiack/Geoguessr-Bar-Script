// ==UserScript==
// @name         Geoguessr Score Bar
// @version      1.0
// @description  Re-adds the score bar to Geoguessr
// @author       zakiack
// @match        *://*.geoguessr.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==
var ranRes = false;
var ranEnd = false;
function generateBar(score,barPercent,id){
    const barBackground = document.createElement("div");
    const barFill = document.createElement("div");
    const scorePara = document.createElement("p");
    barBackground.id = id;
    barBackground.style.width = "90%";
    barBackground.style.backgroundColor = "grey";
    barBackground.style.textAlign = "center";
    barBackground.style.height = "20px";
    barBackground.style.margin = "auto";
    barFill.style.width = barPercent+"%";
    barFill.style.backgroundColor = "orange";
    barFill.class = "filled bar";
    scorePara.innerHTML = score;
    scorePara.class = "score label";
    barBackground.appendChild(barFill);
    barFill.appendChild(scorePara);
    return barBackground;
}
function addBarDuring(resultElement){
    const score = parseFloat(document.querySelector('div[class^="round-result_pointsIndicatorWrapper"]').firstElementChild.firstElementChild.firstElementChild.innerHTML.replace(/,/g, ''));
    const barPercent = (score/5000)*100;
    let e = document.getElementById("the bar");
    if (e && score){
        const barFill = e.firstElementChild;
        const scorePara = barFill.firstElementChild;
        barFill.style.width = barPercent+"%";
        console.log(barPercent);
        scorePara.innerHTML = score;

    } else if(!e) {
        const bar = generateBar(score,barPercent,"the bar");
        resultElement.insertBefore(bar,resultElement.firstChild);
    }

}
function addBarEnd(resultElement){
    const score = parseFloat(document.querySelector('div[class^="result-overlay_overlayTotalScore"]').firstElementChild.firstElementChild.firstElementChild.firstElementChild.innerHTML.replace(/,/g, ''));
    const barPercent = (score/25000)*100;
    let e = document.getElementById("the bar end");
    if (e && score){
        const barFill = e.firstElementChild;
        const scorePara = barFill.firstElementChild;
        barFill.style.width = barPercent+"%";
        console.log(barPercent);
        scorePara.innerHTML = score;

    } else if(!e) {
        const bar = generateBar(score,barPercent,"the bar end");
        resultElement.appendChild(bar);
    }
}
function checkGameEnd(){
    const gameLayout = document.querySelector('.game-layout');
	const resultElement = document.querySelector('div[class^="result-layout_contentNew"]');
	const endElement = document.querySelector('div[class^="result-overlay_overlayContent"]');
	if(gameLayout && resultElement && ranRes == false) {
        ranRes = true;
        ranEnd = false;
        addBarDuring(resultElement);
	}else if(gameLayout && endElement && ranEnd == false) {
        addBarEnd(endElement);
        ranRes = false;
        ranEnd = true;
	}else if(gameLayout) {
        ranRes = false;
        ranEnd = false;
	}
}
function init(){
    const observer = new MutationObserver(checkGameEnd);
	observer.observe(document.querySelector('#__next'), { subtree: true, childList: true });
}
init();