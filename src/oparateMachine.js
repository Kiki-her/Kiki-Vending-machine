// const VendingMachine = require("../src/VendingMachine");
const title = document.querySelector("#titleH1");
const imgTag = document.createElement("img");
// accordionText.innerHTMLにsvgを仕込む
const accordionText = document.querySelector(".content");
// buttonにonClickつけたい
// trivia button
const button1 = document.querySelector(".button--1");
// answer button
const button2 = document.querySelector(".button--2");
// hello? button
const button3 = document.querySelector(".button--3");
// dog button
const button4 = document.querySelector(".button--4");

const coin10 = document.querySelector(".coin10");
const coin50 = document.querySelector(".coin50");
const coin100 = document.querySelector(".coin100");
const coin500 = document.querySelector(".coin500");
const titleH1 = document.querySelector("h1");
let coinAmount = 0;
coin10.addEventListener("click", () => {
    coinAmount += 10;
    titleH1.innerText = coinAmount;
});
coin50.addEventListener("click", () => {
    coinAmount += 50;
    titleH1.innerText = coinAmount;
});
coin100.addEventListener("click", () => {
    coinAmount += 100;
    titleH1.innerText = coinAmount;
});
coin500.addEventListener("click", () => {
    coinAmount += 500;
    titleH1.innerText = coinAmount;
})

const resultButton = document.querySelector("#result-button");

let sumObj = {
  trivia: {
    count: 0,
    resultVal: []
},
  answer: {
    count: 0,
    resultVal: []
},
  hello: {
    count: 0,
    resultVal: []
},
  dog: {
    count: 0,
    resultVal: []
},
};

console.log(button1);
button1.addEventListener("click", () => {
  getRandomTrivia();
  sumObj["trivia"].count++;
  coinAmount -= 150;
  titleH1.innerText = coinAmount;
});

button2.addEventListener("click", () => {
  getAnswer();
  sumObj["answer"].count++;
  coinAmount -= 210;
  titleH1.innerText = coinAmount;
});

button3.addEventListener("click", () => {
  getRandomHello();
  sumObj["hello"].count++;
  coinAmount -= 50;
  titleH1.innerText = coinAmount;
});

button4.addEventListener("click", () => {
  getRandomDog();
  sumObj["dog"].count++;
  coinAmount -= 500;
  titleH1.innerText = coinAmount;
});

function setReceiptDetail() {
  let detialText = "";
  // key: nameSum, value: 文字
  let valueText = ""
  const detialObj = {
    triviaSum: "",
    answerSum: "",
    helloSum: "",
    dogSum: ""
  };
  let sum = 0;
  let totalAmount = 0;
  for (let key in sumObj) {
    if (sumObj[key].count !== 0 && key === "trivia") {
        detialObj["triviaSum"] = `106 | trivia | ${sumObj[key].count}個 | ${sumObj[key].count * 150}*`;
        for(let val of sumObj[key].resultVal) {
            valueText += "\n" + val;
        }
        sum += sumObj[key].count;
        totalAmount += sumObj[key].count * 150;
    } else if (sumObj[key].count !== 0 && key === "answer") {
        detialObj["answerSum"] = `424 | answer | ${sumObj[key].count}個 | ${sumObj[key].count * 210}*`;
        for(let val of sumObj[key].resultVal) {
            valueText += "\n" + val;
        }
        sum += sumObj[key].count;
        totalAmount += sumObj[key].count * 210;
    } else if (sumObj[key].count !== 0 && key === "hello") {
        detialObj["helloSum"] = `860 | hello | ${sumObj[key].count}個 | ${sumObj[key].count * 50}*`;
        for(let val of sumObj[key].resultVal) {
            valueText += "\n" + val;
        }
        sum += sumObj[key].count;
        totalAmount += sumObj[key].count * 50;
    } else if (sumObj[key].count !== 0 && key === "dog") {
        detialObj["dogSum"] = `109 | dogImg | ${sumObj[key].count}個 | ${sumObj[key].count * 500}*`;
        // for(let val of sumObj[key].resultVal) {
        //     valueText += "\n" + val;
        // }
        sum += sumObj[key].count;
        totalAmount += sumObj[key].count * 500;
    } 
  }
  for(let key in detialObj) {
    if(detialObj[key] !== "" && detialText == "") {
        detialText += detialObj[key];
    } else if(detialObj[key] !== "") {
        detialText += "\n" + detialObj[key];
    }
  }

  return {detialText, valueText, sum, totalAmount, };
}

resultButton.addEventListener("click", () => {
    const detialObj = setReceiptDetail();

    createReceipt(detialObj, coinAmount)
});

const resetButton = document.querySelector("#reset-button");
resetButton.addEventListener("click", () => {
    titleH1.innerText = "Insert Coin";
    coinAmount = 0;
    sumObj = {
      trivia: {
        count: 0,
        resultVal: []
    },
      answer: {
        count: 0,
        resultVal: []
    },
      hello: {
        count: 0,
        resultVal: []
    },
      dog: {
        count: 0,
        resultVal: []
    },
    };
    const isHere = document.querySelector(".originReceipt");
    const isDogs = document.querySelectorAll(".dogImg")
    if(isHere) {
      isHere.remove();
    }
    if(isDogs) {
      isDogs.forEach((elem) => elem.remove());
    }

})


const langCodes = [
  "az",
  "bg",
  "bs",
  "cs",
  "da",
  "de",
  "dz",
  "en",
  "en-gb",
  "en-us",
  "es",
  "et",
  "fi",
  "fil",
  "fr",
  "hr",
  "hu",
  "id",
  "kk",
  "lo",
  "lt",
  "lv",
  "ms",
  "my",
  "no",
  "ro",
  "sk",
  "sl",
  "sq",
  "sr",
  "sv",
  "sw",
  "tk",
];


const receiptline = require("receiptline");

function createReceipt(obj, money) {

    const text = `Kiki Vending Machine
    ナマケモノ都
    登録番号　K1234555
    
    2022年11月1日 12:00
    {border:line; width:22}
    ^領 収 書
    {border:space; width: 30}
    -
    {border:space; width:3,14,3,6}
    ${obj.detialText}
    {border:space; width: 30}
    -
    {border:space; width: 26}
    ${obj.valueText}
    {border:space; width: 30}
    -
    {width:5,5,16; text:wrap}
    小計 | ${obj.sum}点 | ¥${obj.totalAmount}
    {border:space; width: 30}
    -
    {width:auto}
    合計 | ^¥${obj.totalAmount}
    お預かり | ^¥${money}
    お釣り | ^¥${money - obj.totalAmount}
    *印はナマケモノ免税対象商品です
    
    010001000100100101000111`;

    const svg = receiptline.transform(text, {
      cpl: 24,
      encoding: "cp932",
      spacing: "true",
    });

    const style = 'background: pink;';
    accordionText.innerHTML = `<div class="originReceipt" style=${style}>${svg}</div>`;
    const imgAmount = sumObj["dog"].resultVal.length;
    console.log(imgAmount, "DOGLE");
    for(let i = 0; i < imgAmount; i++) {
        const img = document.createElement("img");
        img.className = `dogImg`;
        img.src = sumObj["dog"].resultVal[i];
        img.style = "width: 200px; height: auto;";
        accordionText.appendChild(img);
        console.log("DOG")
    }
    console.log(obj, "RESULTOBJ");
    const returnMoney = money - obj.totalAmount;
    titleH1.innerText = "Thank you! Back: " + returnMoney;
}



// 言語コードをランダムで取得
function getTargetLang() {
  const i = Math.floor(Math.random() * (langCodes.length - 1));
  return langCodes[i];
}

// 各国のHelloをランダムで取得
async function getRandomHello() {
  const getHello = await fetch(
    `https://stefanbohacek.com/hellosalut/?lang=${getTargetLang()}`
  ).then((res) => res.json());
    sumObj["hello"]["resultVal"].push(getHello.hello)
}

// yesかnoかを取得(10000回に1回maybe)
async function getAnswer() {
  const yesOrNo = await fetch(`https://yesno.wtf/api`).then((res) =>
    res.json()
  );
  console.log(yesOrNo)
  sumObj["answer"]["resultVal"].push(yesOrNo.answer)

}

// triviaをランダムで取得
async function getRandomTrivia() {
  const trivia = await fetch(`https://opentdb.com/api.php?amount=1`).then(
    (res) => res.json()
  );
  sumObj["trivia"]["resultVal"].push("Q: " + trivia.results[0].question + "\n----A: " + trivia.results[0].correct_answer)

}

// 犬の画像をランダムで取得
async function getRandomDog() {
  const dogImg = await fetch(`https://dog.ceo/api/breeds/image/random`).then(
    (res) => res.json()
  );
  sumObj["dog"]["resultVal"].push(dogImg.message);

}
