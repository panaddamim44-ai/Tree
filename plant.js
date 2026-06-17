// =====================================
// plant.js
// AR Plant Explorer
// =====================================

let plant;
let stage = 0;

// ช่วงการเติบโตของต้นไม้
const stages = [
    {
        emoji: "🌰",
        name: "เมล็ด",
        info: "เริ่มต้นชีวิตของพืช"
    },
    {
        emoji: "🌱",
        name: "ต้นอ่อน",
        info: "รากเริ่มงอกและดูดน้ำ"
    },
    {
        emoji: "🌿",
        name: "แตกใบ",
        info: "ใบเริ่มสร้างอาหาร"
    },
    {
        emoji: "🌳",
        name: "ต้นโต",
        info: "ลำต้นแข็งแรง"
    },
    {
        emoji: "🌸",
        name: "ออกดอก",
        info: "ดอกใช้ในการสืบพันธุ์"
    },
    {
        emoji: "🍎",
        name: "ออกผล",
        info: "ผลมีเมล็ดสำหรับขยายพันธุ์"
    }
];

// ===========================
// สร้างต้นไม้
// ===========================

function createPlant() {

    plant = document.createElement("div");

    plant.id = "plant";

    plant.innerHTML = stages[0].emoji;

    plant.style.position = "absolute";
    plant.style.left = "50%";
    plant.style.bottom = "10%";
    plant.style.transform = "translateX(-50%)";
    plant.style.fontSize = "120px";
    plant.style.transition = "0.5s";

    document.body.appendChild(plant);

    showPlantInfo();

}

// ===========================
// อัปเดตต้นไม้
// ===========================

function updatePlant(newStage) {

    stage = newStage;

    if(stage >= stages.length){

        stage = stages.length - 1;

    }

    plant.innerHTML = stages[stage].emoji;

    animatePlant();

    showPlantInfo();

}

// ===========================
// ข้อมูลต้นไม้
// ===========================

function showPlantInfo(){

    const message = document.getElementById("message");

    if(message){

        message.innerHTML =

        `
        <b>${stages[stage].name}</b><br>
        ${stages[stage].info}
        `;

    }

}

// ===========================
// Animation
// ===========================

function animatePlant(){

    plant.animate([

        {
            transform:"translateX(-50%) scale(.6)"
        },

        {
            transform:"translateX(-50%) scale(1.2)"
        },

        {
            transform:"translateX(-50%) scale(1)"
        }

    ],{

        duration:500

    });

}

// ===========================
// รีเซต
// ===========================

function resetPlant(){

    stage = 0;

    plant.innerHTML = stages[0].emoji;

    showPlantInfo();

}

// ===========================
// รดน้ำ
// ===========================

function waterPlant(){

    if(stage < stages.length-1){

        stage++;

        updatePlant(stage);

    }

}

// ===========================
// ใส่ปุ๋ย
// ===========================

function fertilizePlant(){

    animatePlant();

    popup("🌿 โตเร็วขึ้น!");

}

// ===========================
// แสงแดด
// ===========================

function sunlight(){

    animatePlant();

    popup("☀️ ได้รับแสงแดด");

}

// ===========================
// แสดงข้อความลอย
// ===========================

function popup(text){

    const div = document.createElement("div");

    div.innerHTML = text;

    div.style.position = "absolute";
    div.style.left = "50%";
    div.style.top = "20%";
    div.style.transform = "translateX(-50%)";
    div.style.background = "#ffffff";
    div.style.padding = "12px 20px";
    div.style.borderRadius = "12px";
    div.style.fontSize = "24px";
    div.style.boxShadow = "0 6px 12px rgba(0,0,0,.2)";
    div.style.zIndex = "999";

    document.body.appendChild(div);

    setTimeout(()=>{

        div.remove();

    },1500);

}

// ===========================
// วงจรชีวิต
// ===========================

function showLifeCycle(){

    alert(

`วงจรชีวิตของพืช

🌰 เมล็ด

↓

🌱 งอก

↓

🌿 แตกใบ

↓

🌳 โตเต็มวัย

↓

🌸 ออกดอก

↓

🍎 ออกผล`

    );

}

// ===========================
// เริ่มต้น
// ===========================

window.addEventListener("load",()=>{

    createPlant();

});
