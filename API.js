const BASE_URL =
    "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
/*for(code in countryList){
  console.log(code, countryList[code]);*/
 const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (select of dropdowns) {
    for (currCode in countryList) {
        // console.log(code, countryList[code]);
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "To" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    
    select.addEventListener("change",(evt) => { 
        updateFlag(evt.target);
    })
}
const updateFlag =(element)=>{
    let currCode = element.value;
let countryCode = countryList[currCode];
let newSrc =`https://flagsapi.com/${countryCode}/flat/64.png`;
let img = element.parentElement.querySelector("img");
img.src = newSrc;
};

btn.addEventListener("click", async(evt)=>{
    evt.preventDefault();
let amount = document.querySelector(".amount input");
let amtValue = amount.value;
if(amtValue==="" || amtValue <0){
    amtValue =1;
    amount.value="1";
}
 //console.log(fromCurr.value , toCurr.value);

const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
let response = await fetch(URL);
let data = await response.json();
let rate = data[toCurr.value.toLowerCase()];
//console.log(rate);
let finalAmount = amtValue*rate;
msg.innerText = `${amtValue} ${fromCurr.value}= ${finalAmount} ${toCurr.value}`;

});





