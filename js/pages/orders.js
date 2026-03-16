// ===============================
// 訂單頁面 JS
// ===============================


// 訂單類型
let orderType = "group" // group / personal

// 訂單狀態
let orderStatus = "all"

// 分頁
let currentPage = 1



// ===============================
// DOM
// ===============================

const typeButtons = document.querySelectorAll(".order-type button")
const filterButtons = document.querySelectorAll(".order-filter button")
const orderGrid = document.querySelector(".order-grid")
const pagination = document.querySelector(".pagination")



// ===============================
// 初始化
// ===============================

document.addEventListener("DOMContentLoaded", () => {

loadOrders()

bindTypeSwitch()
bindFilterSwitch()
bindPagination()

})



// ===============================
// 訂單類型切換
// ===============================

function bindTypeSwitch(){

typeButtons.forEach(btn => {

btn.addEventListener("click", () => {

typeButtons.forEach(b => b.classList.remove("active"))
btn.classList.add("active")

orderType = btn.textContent.includes("揪團") ? "group" : "personal"

currentPage = 1

loadOrders()

})

})

}



// ===============================
// 訂單狀態篩選
// ===============================

function bindFilterSwitch(){

filterButtons.forEach(btn => {

btn.addEventListener("click", () => {

filterButtons.forEach(b => b.classList.remove("active"))
btn.classList.add("active")

const text = btn.textContent

if(text.includes("全部")) orderStatus = "all"
if(text.includes("進行")) orderStatus = "processing"
if(text.includes("完成")) orderStatus = "completed"
if(text.includes("取消")) orderStatus = "cancelled"

currentPage = 1

loadOrders()

})

})

}



// ===============================
// 載入訂單
// ===============================

async function loadOrders(){

// API example
// GET /orders?type=group&status=completed&page=1

try{

const response = await fetch(
`/api/orders?type=${orderType}&status=${orderStatus}&page=${currentPage}`
)

const data = await response.json()

renderOrders(data.orders)
renderPagination(data.totalPages)

}
catch(e){

console.log("API未接上，使用假資料")

const mock = mockOrders()

renderOrders(mock.orders)
renderPagination(mock.totalPages)

}

}



// ===============================
// 渲染訂單卡片
// ===============================

function renderOrders(orders){

orderGrid.innerHTML = ""

orders.forEach(order => {

const card = document.createElement("div")
card.className = "order-card"

card.innerHTML = `

<div class="order-image">

<img src="${order.image}">

<span class="status ${order.status}">
${statusText(order.status)}
</span>

</div>

<div class="order-body">

<div class="order-header">
<h3>${order.store}</h3>
<span class="price">$${order.price}</span>
</div>

<div class="order-time">
<i class="fa-regular fa-calendar"></i>
${order.time}
</div>

<div class="order-items">
${order.items.map(i =>
`<div>${i.name}<span>x${i.qty}</span></div>`
).join("")}
</div>

${order.status === "processing"
? `<button class="processing-btn">訂單處理中</button>`
: `<button class="reorder">再次訂購</button>`
}

</div>
`

// 點擊卡片
card.addEventListener("click", () => {

window.location.href = `/order-detail.html?id=${order.id}`

})

orderGrid.appendChild(card)

})

}



// ===============================
// 狀態文字
// ===============================

function statusText(status){

switch(status){

case "completed":
return "已完成"

case "processing":
return "進行中"

case "cancelled":
return "已取消"

}

}



// ===============================
// 分頁
// ===============================

function renderPagination(totalPages){

pagination.innerHTML = ""

for(let i=1;i<=totalPages;i++){

const btn = document.createElement("button")

btn.textContent = i

if(i === currentPage){
btn.classList.add("active")
}

btn.addEventListener("click", () => {

currentPage = i
loadOrders()

})

pagination.appendChild(btn)

}

}



function bindPagination(){}



// ===============================
// Mock資料 (API未完成時使用)
// ===============================

function mockOrders(){

return{

totalPages:3,

orders:[

{
id:1,
store:"迷客夏 Milksha",
price:150,
time:"2023/10/24 14:30",
status:"completed",
image:"../images/drink1.jpg",
items:[
{name:"珍珠鮮奶茶 (L)",qty:2},
{name:"芋頭鮮奶 (M)",qty:1}
]
},

{
id:2,
store:"可不可熟成紅茶",
price:240,
time:"2023/10/20 10:15",
status:"completed",
image:"../images/drink2.jpg",
items:[
{name:"熟成紅茶 (L)",qty:4},
{name:"白玉歐蕾 (L)",qty:1}
]
},

{
id:3,
store:"五十嵐 50 Lan",
price:95,
time:"今天 16:45",
status:"processing",
image:"../images/drink3.jpg",
items:[
{name:"四季春青茶 (L)",qty:1},
{name:"波霸奶茶 (M)",qty:1}
]
}

]

}

}