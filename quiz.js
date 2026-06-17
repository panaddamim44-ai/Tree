// =====================================
// quiz.js
// แบบทดสอบ AR Plant Explorer
// =====================================

const quizData = [

{
question:"รากของพืชมีหน้าที่อะไร?",

choices:[
"ดูดน้ำและแร่ธาตุ",
"สร้างอาหาร",
"สร้างดอก",
"สร้างผล"
],

answer:0
},

{
question:"ใบของพืชมีหน้าที่อะไร?",

choices:[
"สร้างเมล็ด",
"สร้างอาหาร",
"ดูดน้ำ",
"ยึดลำต้น"
],

answer:1
},

{
question:"ส่วนใดของพืชช่วยพยุงต้น?",

choices:[
"ราก",
"ผล",
"ลำต้น",
"ดอก"
],

answer:2
},

{
question:"ดอกมีหน้าที่สำคัญคืออะไร?",

choices:[
"ดูดน้ำ",
"สืบพันธุ์",
"สร้างราก",
"สร้างลำต้น"
],

answer:1
},

{
question:"วงจรชีวิตของพืชเริ่มจากอะไร?",

choices:[
"ดอก",
"ผล",
"เมล็ด",
"ใบ"
],

answer:2
},

{
question:"พืชต้องการสิ่งใดในการสังเคราะห์แสง?",

choices:[
"แสงแดด",
"ลม",
"หิน",
"ทราย"
],

answer:0
}

];

let currentQuiz = 0;
let quizScore = 0;

// ==========================
// เริ่ม Quiz
// ==========================

function startQuiz(){

currentQuiz = 0;
quizScore = 0;

showQuestion();

}

// ==========================
// แสดงคำถาม
// ==========================

function showQuestion(){

removeQuiz();

const q = quizData[currentQuiz];

const box = document.createElement("div");

box.className = "quiz";

box.id = "quizBox";

let html = "";

html += `<h2>📝 แบบทดสอบ</h2>`;

html += `<h3>${q.question}</h3>`;

q.choices.forEach((choice,index)=>{

html +=

`

<div class="answer"

onclick="checkQuiz(${index})">

${choice}

</div>

`;

});

box.innerHTML = html;

document.body.appendChild(box);

}

// ==========================
// ตรวจคำตอบ
// ==========================

function checkQuiz(index){

const correct =

quizData[currentQuiz].answer;

if(index===correct){

quizScore++;

if(typeof addScore==="function"){

addScore(20);

}

popup("✅ ถูกต้อง +20");

playCorrectSound();

}

else{

popup("❌ ลองใหม่");

playWrongSound();

}

currentQuiz++;

setTimeout(()=>{

if(currentQuiz<quizData.length){

showQuestion();

}

else{

finishQuiz();

}

},800);

}

// ==========================
// จบ Quiz
// ==========================

function finishQuiz(){

removeQuiz();

const percent =

Math.round(

quizScore/

quizData.length*100

);

const box = document.createElement("div");

box.className="popup";

box.id="resultQuiz";

box.innerHTML=

`

<h2>🎉 จบแบบทดสอบ</h2>

<p>

ตอบถูก

<b>

${quizScore}

</b>

ข้อ

</p>

<p>

คิดเป็น

<b>

${percent}%

</b>

</p>

<button onclick="closeQuiz()">

เสร็จสิ้น

</button>

`;

document.body.appendChild(box);

if(percent===100){

popup("🏆 เก่งมาก!");

}

}

// ==========================
// ปิด Quiz
// ==========================

function closeQuiz(){

const box=document.getElementById("resultQuiz");

if(box){

box.remove();

}

if(typeof finishGame==="function"){

finishGame();

}

}

// ==========================
// ลบ Quiz
// ==========================

function removeQuiz(){

const old=document.getElementById("quizBox");

if(old){

old.remove();

}

}

// ==========================
// Popup
// ==========================

function popup(text){

const div=document.createElement("div");

div.className="popup";

div.innerHTML=text;

document.body.appendChild(div);

setTimeout(()=>{

div.remove();

},900);

}

// ==========================
// รีเซต Quiz
// ==========================

function resetQuiz(){

currentQuiz=0;

quizScore=0;

removeQuiz();

}
