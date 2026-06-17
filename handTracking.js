// =======================================
// handTracking.js
// MediaPipe Hand Tracking
// =======================================

const videoElement = document.getElementById("camera");
const canvasElement = document.getElementById("output");
const canvasCtx = canvasElement.getContext("2d");

canvasElement.width = window.innerWidth;
canvasElement.height = window.innerHeight;

let handX = 0;
let handY = 0;
let handDetected = false;

// ============================
// สร้าง MediaPipe Hands
// ============================

const hands = new Hands({

    locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
    }

});

hands.setOptions({

    maxNumHands: 1,

    modelComplexity: 1,

    minDetectionConfidence: 0.7,

    minTrackingConfidence: 0.7

});

hands.onResults(onResults);

// ============================
// กล้อง
// ============================

const camera = new Camera(videoElement, {

    onFrame: async () => {

        await hands.send({

            image: videoElement

        });

    },

    width: 1280,

    height: 720

});

camera.start();

// ============================
// เมื่อ AI ตรวจพบมือ
// ============================

function onResults(results){

    canvasCtx.save();

    canvasCtx.clearRect(

        0,
        0,
        canvasElement.width,
        canvasElement.height

    );

    canvasCtx.drawImage(

        results.image,

        0,
        0,

        canvasElement.width,

        canvasElement.height

    );

    if(results.multiHandLandmarks.length){

        handDetected = true;

        const landmarks = results.multiHandLandmarks[0];

        drawConnectors(

            canvasCtx,

            landmarks,

            HAND_CONNECTIONS,

            {

                color:"#00FF00",

                lineWidth:4

            }

        );

        drawLandmarks(

            canvasCtx,

            landmarks,

            {

                color:"#FF0000",

                lineWidth:2

            }

        );

        // นิ้วชี้

        const indexFinger = landmarks[8];

        handX =

        indexFinger.x *

        canvasElement.width;

        handY =

        indexFinger.y *

        canvasElement.height;

        drawPointer();

        detectPart();

    }

    else{

        handDetected=false;

    }

    canvasCtx.restore();

}

// ============================
// วาดตัวชี้
// ============================

function drawPointer(){

    canvasCtx.beginPath();

    canvasCtx.arc(

        handX,

        handY,

        15,

        0,

        Math.PI*2

    );

    canvasCtx.fillStyle="yellow";

    canvasCtx.fill();

}

// ============================
// ตรวจว่านิ้วอยู่บนปุ่มไหน
// ============================

function detectPart(){

    const parts = document.querySelectorAll(".part");

    parts.forEach(part=>{

        const rect =

        part.getBoundingClientRect();

        if(

            handX>rect.left &&

            handX<rect.right &&

            handY>rect.top &&

            handY<rect.bottom

        ){

            part.style.background="#9CFF9C";

        }

        else{

            part.style.background="white";

        }

    });

}

// ============================
// Gesture
// ============================

function isPinching(landmarks){

    const thumb = landmarks[4];

    const index = landmarks[8];

    const dx = thumb.x-index.x;

    const dy = thumb.y-index.y;

    const distance =

    Math.sqrt(

        dx*dx+

        dy*dy

    );

    return distance<0.05;

}

// ============================
// ใช้ pinch แทนการคลิก
// ============================

hands.onResults(function(results){

    onResults(results);

    if(results.multiHandLandmarks.length){

        const landmarks=

        results.multiHandLandmarks[0];

        if(isPinching(landmarks)){

            clickObject();

        }

    }

});

// ============================
// คลิกวัตถุ
// ============================

function clickObject(){

    const parts=document.querySelectorAll(".part");

    parts.forEach(part=>{

        const rect=

        part.getBoundingClientRect();

        if(

            handX>rect.left&&

            handX<rect.right&&

            handY>rect.top&&

            handY<rect.bottom

        ){

            part.click();

        }

    });

}

// ============================
// Resize
// ============================

window.addEventListener("resize",()=>{

    canvasElement.width=window.innerWidth;

    canvasElement.height=window.innerHeight;

});

// ============================
// API ให้เกมเรียก
// ============================

function getHandPosition(){

    return{

        x:handX,

        y:handY,

        detected:handDetected

    };

}
