const inputContainer=document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');
const countdownEl=document.getElementById('countdown');
const countdownHeader=document.getElementById('countdown-title');
const resetBtn=document.getElementById('countdown-button');
const timeEl=document.querySelectorAll('span');
const complete = document.getElementById('complete');
const completeBtn =document.getElementById('complete-button');
const completeInfo = document.getElementById('complete-info');
let countdownTitle='';
let countdownDate='';
let countdownValue;
let countdownActive;
let storage;
const second=1000;
const min=second*60;
const hour= min *60;
const day = hour * 24;
//Set date isostring returns date and time in string
const today =new Date().toISOString().split('T')[0];
console.log(today)
function updateDom(){
    countdownActive = setInterval(() => {
    //getTime returns milisecs since 1 jan 1970

        
    let now = new Date().getTime();
    const dist =countdownValue - now;
    console.log(dist);
    const days = Math.floor(dist/day);
    const hours = Math.floor((dist%day)/hour);
    const minutes = Math.floor((dist%hour)/min);
    const seconds = Math.floor((dist%min)/second);;
    console.log(days,hours,minutes,seconds)

    //Hide input element 
    inputContainer.hidden=true;
   
    if(dist<0){
        complete.hidden=false;
        countdownEl.hidden=true;
        completeInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
        clearInterval(countdownActive);
        countdownDate='';
        countdownTitle='';
    }else{
    //show countdown elements/time remaining
    countdownEl.hidden = false;
    countdownHeader.textContent=`${countdownTitle}`;
    timeEl[0].textContent = days;
    timeEl[1].textContent = hours;
    timeEl[2].textContent = minutes;
    timeEl[3].textContent = seconds;
    
    }},second);
    
}
 function update(evt){
     evt.preventDefault();
     countdownTitle=evt.srcElement[0].value;
     countdownDate=evt.srcElement[1].value;
     console.log(countdownDate,countdownTitle);
     storage = {
         title:countdownTitle,
         date:countdownDate
     }
     //get value of date
       localStorage.setItem('countdown',JSON.stringify(storage));
     countdownValue= new Date(countdownDate).getTime();
     console.log(countdownValue);
     if(countdownDate==='' || countdownTitle ===''){
         alert('Enter valid date or title')
     }else{
     updateDom();
     }
 }

 //Store countdown
 function getStorage(){
     if(localStorage.getItem('countdown')){
         inputContainer.hidden=true;
         storage=JSON.parse(localStorage.getItem('countdown'));
         countdownTitle=storage.title;
         countdownDate = storage.date;
         countdownValue= new Date(countdownDate).getTime();
         updateDom();

     }
 }
 
 
 //Reset countdown
 function reset(){
     //show and hide elements
     inputContainer.hidden=false;
     countdownEl.hidden=true;
     complete.hidden=true;
     //Clear interval
     clearInterval(countdownActive);
     //Clear title and date
     countdownTitle ='';
     countdownDate=''; 
     //Reset local storage
     localStorage.removeItem('countdown');
    }
//event listener
dateEl.setAttribute('min',today);
countdownForm.addEventListener('submit',update);
resetBtn.addEventListener('click',reset);
completeBtn.addEventListener('click',reset)

//on load, check local storage

window.onload = getStorage;