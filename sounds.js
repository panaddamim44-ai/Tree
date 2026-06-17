// =====================================
// sounds.js
// AR Plant Explorer
// ระบบเสียง
// =====================================

// -------------------------
// โหลดไฟล์เสียง
// -------------------------

const sounds = {

    correct: new Audio("assets/sounds/correct.mp3"),

    wrong: new Audio("assets/sounds/wrong.mp3"),

    click: new Audio("assets/sounds/click.mp3"),

    win: new Audio("assets/sounds/win.mp3"),

    water: new Audio("assets/sounds/water.mp3"),

    grow: new Audio("assets/sounds/grow.mp3"),

    sun: new Audio("assets/sounds/sun.mp3"),

    bgm: new Audio("assets/sounds/bgm.mp3")

};

// -------------------------
// ตั้งค่าเสียง
// -------------------------

sounds.bgm.loop = true;
sounds.bgm.volume = 0.3;

Object.keys(sounds).forEach(key=>{

    if(key!=="bgm"){

        sounds[key].volume = 0.8;

    }

});

// -------------------------
// เล่นเสียง
// -------------------------

function play(name){

    if(!sounds[name]) return;

    sounds[name].currentTime = 0;

    sounds[name].play();

}

// -------------------------
// API
// -------------------------

function playCorrectSound(){

    play("correct");

}

function playWrongSound(){

    play("wrong");

}

function playClickSound(){

    play("click");

}

function playWinSound(){

    play("win");

}

function playWaterSound(){

    play("water");

}

function playGrowSound(){

    play("grow");

}

function playSunSound(){

    play("sun");

}

// -------------------------
// เพลงพื้นหลัง
// -------------------------

function startBGM(){

    sounds.bgm.play().catch(()=>{

        console.log("รอผู้ใช้แตะหน้าจอก่อนเล่นเพลง");

    });

}

function stopBGM(){

    sounds.bgm.pause();

}

function toggleBGM(){

    if(sounds.bgm.paused){

        sounds.bgm.play();

    }else{

        sounds.bgm.pause();

    }

}

// -------------------------
// ปรับระดับเสียง
// -------------------------

function setVolume(value){

    value = Math.max(0, Math.min(1, value));

    Object.keys(sounds).forEach(key=>{

        sounds[key].volume = value;

    });

}

// -------------------------
// เปิด/ปิดเสียง
// -------------------------

let muted = false;

function toggleMute(){

    muted = !muted;

    Object.keys(sounds).forEach(key=>{

        sounds[key].muted = muted;

    });

}

// -------------------------
// เริ่มเมื่อกดปุ่มเริ่มเกม
// -------------------------

window.addEventListener("load",()=>{

    const startBtn = document.getElementById("startBtn");

    if(startBtn){

        startBtn.addEventListener("click",()=>{

            startBGM();

            playClickSound();

        });

    }

});
