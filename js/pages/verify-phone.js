
// OTP自動跳格

const inputs = document.querySelectorAll(".otp");

inputs.forEach((input,index)=>{

input.addEventListener("input",(e)=>{

if(e.target.value.length === 1){

if(index < inputs.length -1){

inputs[index+1].focus();

}

}

});

input.addEventListener("keydown",(e)=>{

if(e.key === "Backspace" && input.value === ""){

if(index>0){

inputs[index-1].focus();

}

}

});

});



/* 倒數計時 */

let time = 120;

const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");


const timer = setInterval(()=>{

let m = Math.floor(time/60);
let s = time%60;

minutes.textContent = String(m).padStart(2,"0");
seconds.textContent = String(s).padStart(2,"0");

time--;

if(time < 0){

clearInterval(timer);

alert("驗證碼已過期，請重新發送");

}

},1000);



/* resend */

document.getElementById("resend-btn").addEventListener("click",(e)=>{

e.preventDefault();

alert("重新發送驗證碼");

time = 120;

});