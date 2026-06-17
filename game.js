// =============================
// AR Plant Explorer - game.js
// =============================

let score = 0;
let level = 1;
let plantStage = 0;

const correctOrder = [
    "root",
    "stem",
    "leaf",
    "flower",
    "fruit",
    "water",
    "sun"
];

let currentIndex = 0;

const scoreText = document.getElementById("score");
const messageText = document.getElementById("message");
const startBtn = document.getElementById("startBtn");

const parts = document.querySelectorAll(".part");

// เริ่มเกม
startBtn.addEventListener("click", startGame);

function startGame(){

    score = 0;
    level = 1;
    plantStage = 0;
    currentIndex = 0;

    updateScore();

    messageText.innerHTML =
    "เริ่มเกมแล้ว 🌱<br>หยิบ 'ราก' ก่อน";

    startBtn.style.display = "none";

    enableParts();

}

// เปิดให้กดชิ้นส่วน

function enableParts(){

    parts.forEach(part=>{

        part.addEventListener("click",selectPart);

    });

}

function disableParts(){

    parts.forEach(part=>{

        part.removeEventListener("click",selectPart);

    });

}

// เลือกชิ้นส่วน

function selectPart(e){

    const name = e.target.dataset.name;

    checkAnswer(name);

}

// ตรวจคำตอบ

function checkAnswer(name){

    if(name===correctOrder[currentIndex]){

        score +=10;

        currentIndex++;

        updateScore();

        showCorrect(name);

        growPlant();

        if(currentIndex===correctOrder.length){

            finishLevel();

        }

    }

    else{

        score -=5;

        if(score<0){

            score=0;

        }

        updateScore();

        showWrong(name);

    }

}

// อัปเดตคะแนน

function updateScore(){

    scoreText.innerHTML=
    "คะแนน : "+score;

}

// ตอบถูก

function showCorrect(name){

    let text="";

    switch(name){

        case "root":
        text="ถูกต้อง 🌱 รากดูดน้ำ";
        break;

        case "stem":
        text="ถูกต้อง 🌳 ลำต้นลำเลียงอาหาร";
        break;

        case "leaf":
        text="ถูกต้อง 🍃 ใบสร้างอาหาร";
        break;

        case "flower":
        text="ถูกต้อง 🌸 ดอกสร้างเมล็ด";
        break;

        case "fruit":
        text="ถูกต้อง 🍎 ผลห่อหุ้มเมล็ด";
        break;

        case "water":
        text="ดีมาก 💧 ต้นไม้ต้องการน้ำ";
        break;

        case "sun":
        text="ยอดเยี่ยม ☀️ ต้องมีแสงแดด";
        break;

    }

    messageText.innerHTML=text;

    playCorrectSound();

}

// ตอบผิด

function showWrong(){

    messageText.innerHTML=
    "❌ ลองใหม่อีกครั้ง";

    playWrongSound();

}

// ต้นไม้โต

function growPlant(){

    plantStage++;

    if(typeof updatePlant==="function"){

        updatePlant(plantStage);

    }

}

// ผ่านด่าน

function finishLevel(){

    disableParts();

    playWinSound();

    messageText.innerHTML=

    `
    🎉 ผ่านด่านแล้ว

    คะแนน ${score}

    ⭐⭐⭐
    `;

    setTimeout(()=>{

        level++;

        nextQuiz();

    },3000);

}

// เรียกแบบทดสอบ

function nextQuiz(){

    if(typeof startQuiz==="function"){

        startQuiz();

    }

}

// เพิ่มคะแนนจาก Quiz

function addScore(point){

    score+=point;

    updateScore();

}

// รีเซตเกม

function resetGame(){

    score=0;

    level=1;

    currentIndex=0;

    plantStage=0;

    updateScore();

    messageText.innerHTML="เริ่มใหม่";

    startBtn.style.display="block";

}

// แสดงข้อความชั่วคราว

function popup(text){

    const div=document.createElement("div");

    div.innerHTML=text;

    div.style.position="absolute";
    div.style.top="50%";
    div.style.left="50%";
    div.style.transform="translate(-50%,-50%)";
    div.style.background="#ffffff";
    div.style.padding="20px";
    div.style.borderRadius="15px";
    div.style.fontSize="28px";
    div.style.zIndex="999";

    document.body.appendChild(div);

    setTimeout(()=>{

        div.remove();

    },1500);

}

// โบนัส

function bonus(){

    score+=20;

    popup("โบนัส +20");

    updateScore();

}

// ดาว

function getStars(){

    if(score>=90){

        return 3;

    }

    if(score>=70){

        return 2;

    }

    return 1;

}

// จบเกม

function finishGame(){

    let stars=getStars();

    popup("🏆 จบเกม");

    messageText.innerHTML=

    `
    คะแนนรวม : ${score}<br>

    ดาว : ${stars} ⭐
    `;

}
