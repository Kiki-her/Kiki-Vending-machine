// const VendingMachine = require("../src/VendingMachine"); 
const title = document.querySelector("#titleH1");
const imgTag = document.createElement("img");
// accordionText.innerHTMLにsvgを仕込む
const accordionText = document.querySelector("accordion__text");
const langCodes = ["az", "bg", "bs", "cs", "da", "de", "dz", "en", "en-gb", "en-us", "es", "et", "fi", "fil", "fr", "hr", "hu","id", "kk", "lo", "lt", "lv", "ms", "my", "no", "ro", "sk", "sl", "sq", "sr", "sv", "sw", "tk"];
/*
getRandomHello();
getAnswer();
getRandomTrivia();
getRandomDog();
*/
console.log(VendingMachine);
const receiptline = require('receiptline');

const message = 'Hey';

const text = `Kiki Vending Machine
ナマケモノ都
登録番号　K1234555

2022年11月1日 12:00
{border:line; width:22}
^領 収 書
{border:space; width: 30}
-
{border:space; width:3,14,3,6}
198  | dog-lovers | 1個 | ¥200*
398 | cat-party | 2個 | ¥500*
{border:space; width: 30}
-
{border:space; width: 26}
your dog is good boy.
your cat is master.
cat is god.
${message}
{border:space; width: 30}
-
{width:5,5,16; text:wrap}
小計 | 3点 | ¥700
{border:space; width: 30}
-
{width:auto}
合計 | ^¥700
お預かり | ^¥1,000
お釣り | ^¥300
*印はかわいい免税対象商品です

010001000100100101000111`;

const svg = receiptline.transform(text, {cpl: 32, encoding: 'cp932', spacing: 'true'});
const svgDiv = document.createElement('div');
svgDiv.innerHTML = svg;
title.appendChild(svgDiv);

// 言語コードをランダムで取得
function getTargetLang() {
    const i = Math.floor(Math.random() * (langCodes.length - 1));
    return langCodes[i];
}

// 各国のHelloをランダムで取得
async function getRandomHello() {
    const getHello = await fetch(`https://stefanbohacek.com/hellosalut/?lang=${getTargetLang()}`)
    .then((res) => res.json());
    console.log("^^^", getHello.hello);
    
}

// yesかnoかを取得(10000回に1回maybe)
async function getAnswer() {
    const yesOrNo = await fetch(`https://yesno.wtf/api`)
    .then((res) => res.json());
    console.log("---", yesOrNo.answer);
}

// triviaをランダムで取得
async function getRandomTrivia() {
    const trivia = await fetch(`https://opentdb.com/api.php?amount=1`)
    .then((res) => res.json());
    console.log("Q: ", trivia.results[0].question, "--A: ", trivia.results[0].correct_answer);
}

// 犬の画像をランダムで取得
async function getRandomDog() {
    const dogImg = await fetch(`https://dog.ceo/api/breeds/image/random`)
    .then((res) => res.json());
    console.log("ImgSrc: ", dogImg.message);
    imgTag.src = dogImg.message;
    imgTag.className = "dogImg";
    title.appendChild(imgTag);
}

