"use strict";

var state, theme, lengthOfPromodo, lengthOfteaBreak, minsLeft, secsLeft;

/****    Google Colors defined in Javascript   ******/
var googleRed500 = "#F44336";
var googleRed700 = "#D32F2F";
var myRed ="#ff2b33";
       
var googleGrey500 = "#9E9E9E";
var googleGrey700 = "#616161";
       
var dialColor = googleRed500;




/****************   DEFINE SOUND FILES    ******************/
/*
breakSound a mix of:
http://www.freesound.org/people/JasonElrod/sounds/85475/
http://www.freesound.org/people/stijn/sounds/22890/

*/

/*var breakTimeSound = new Audio("../assets/mp3/stirr.mp3"); */
//Local version dosn't play directly from Github, so use a Dropbox link instead

var breakTimeSound = new Audio("https://dl.dropboxusercontent.com/s/hl3kqpxnx65chic/tea-kettle-whistle%20-%20stirr%20v2.mp3?dl=0");
/*
startSound a mix of:
https://www.freesound.org/people/AlienXXX/sounds/168560/
https://www.freesound.org/people/Spol/sounds/337671/
http://www.freesound.org/people/Puniho/sounds/165912/
*/


/* var startSound = new Audio("../assets/mp3/here_we_go.mp3"); */
//Local version dosn't play directly from Github, so use a Dropbox link instead

var startSound = new Audio("https://dl.dropboxusercontent.com/s/07f52tjp7vc7h91/funky-beat_with%20here_we_go.mp3?dl=0");


/********************************************************************************************/
/*************************                 DEFINE ID's          *****************************/
var promodiInput = document.querySelector("input");
var promodoTimeLength = document.getElementById("promodoTimeLength");
var promodoCountingDown = document.getElementById("promodoCountingDown");
var promodoTeadBreakTime = document.getElementById("promodoTeadBreakTime");
var minutesLabel_readyState_id = document.getElementById("minutesLabel_readyState_id");
var secondsLabel_readyState_id = document.getElementById("secondsLabel_readyState_id");
var minutesLabel_countdown_id = document.getElementById("minutesLabel_countdown_id");
var secondsLabel_countdown_id = document.getElementById("secondsLabel_countdown_id");
var minutesLabel_teaBreak_id = document.getElementById("minutesLabel_teaBreak_id");
var secondsLabel_teaBreak_id = document.getElementById("secondsLabel_teaBreak_id");
var mainInfo_countdown = document.getElementById("mainInfo_countdown");
var mainInfo_teaBreak = document.getElementById("mainInfo_teaBreak");
var timerAdjust = document.getElementById("timerAdjust");
var skipBreakButt = document.getElementById("skipBreakButt");





/********************************************************************************************/
/******************       CHANGE THEME  blueREd to dark and vice versa      *****************/
/*
Note how the 'dark' and 'blueRed' themes are labled so that there classes are easy to add and rtemove with a more 'dry' function i.e.  theTheme + "_classLabelHere"
*/
function change_theme(theTheme){
    
    $( ".page" ).addClass( theTheme + "_page" );
    $( "#themeButt" ).addClass( theTheme + "_themeButt" );
    $( "#mainInfo_ready" ).addClass( theTheme + "_mainInfo_ready" );
    $( "#mainInfo_countdown" ).addClass( theTheme + "_mainInfo_countdown" );
    $( "#mainInfo_teaBreak" ).addClass( theTheme + "_mainInfo_teaBreak" );
    $( "#taskDoneButt" ).addClass( theTheme + "_taskDoneButt" );
    $( "#skipBreakButt" ).addClass( theTheme + "_skipBreakButt" );
    $( "#counterGraphic_ready" ).addClass( theTheme + "_counterGraphic_ready" );
}



function remove_theme(theTheme){
    $( ".page" ).removeClass( theTheme + "_page" );
    $( "#themeButt" ).removeClass( theTheme + "_themeButt" );
    $( "#mainInfo_ready" ).removeClass( theTheme + "_mainInfo_ready" );
    $( "#mainInfo_countdown" ).removeClass( theTheme + "_mainInfo_countdown" );
    $( "#mainInfo_teaBreak" ).removeClass( theTheme + "_mainInfo_teaBreak" );
    $( "#taskDoneButt" ).removeClass( theTheme + "_taskDoneButt" );
    $( "#skipBreakButt" ).removeClass( theTheme + "_skipBreakButt" );
    $( "#counterGraphic_ready" ).removeClass( theTheme + "_counterGraphic_ready" );
}


function blueRed_theme(){
    change_theme("blueRed");
}



function remove_blueRed_theme(){
    remove_theme("blueRed");
}



function dark_theme(){
    change_theme("dark");
}



function remove_dark_theme(){
    remove_theme("dark");
}


/********************************************************************************************/
/******************      SET THE STATES ON SCREEN BY CONTROLING THE CSS     *****************/

function readyState(){
    mainInfo_ready.setAttribute('data-state', "on");
    mainInfo_countdown.setAttribute('data-state', "off");
    mainInfo_teaBreak.setAttribute('data-state', "off");
    timerAdjust.setAttribute('data-state', "on");
    taskDoneButt.setAttribute('data-state', "off");
    skipBreakButt.setAttribute('data-state', "off");
    secondsLabel_readyState_id.setAttribute('data-mins_secs_note', "off");
    minutesLabel_readyState_id.setAttribute('data-mins_secs_note', "on");
    lengthOfPromodo = promodiInput.value;
}


function countdownState(){
    mainInfo_ready.setAttribute('data-state', "off");
    mainInfo_countdown.setAttribute('data-state', "on");
    mainInfo_teaBreak.setAttribute('data-state', "off");
    timerAdjust.setAttribute('data-state', "off");
    taskDoneButt.setAttribute('data-state', "on");
    skipBreakButt.setAttribute('data-state', "off");
    secondsLabel_countdown_id.setAttribute('data-mins_secs_note', "off");
    minutesLabel_countdown_id.setAttribute('data-mins_secs_note', "on");
}
            


function teaBreakState(){
    mainInfo_ready.setAttribute('data-state', "off");
    mainInfo_countdown.setAttribute('data-state', "off");
    mainInfo_teaBreak.setAttribute('data-state', "on");
    timerAdjust.setAttribute('data-state', "off");
    taskDoneButt.setAttribute('data-state', "off");
    skipBreakButt.setAttribute('data-state', "on");
    secondsLabel_readyState_id.setAttribute('data-mins_secs_note', "off");
    minutesLabel_readyState_id.setAttribute('data-mins_secs_note', "on");
}



/********************************************************************/
/******************      COUNTER  DIAL  GRAPHIC     *****************/
/* 
see https://www.youtube.com/watch?v=oOu8y51VwMM 
and https://youtu.be/8jvoTV54nXw
*/

var r =135; // radius of dial

 
        //create svg canvas  and attach it to the counterGraphic_ready id     
        var canvas = d3.select("#counterGraphic_counting").append("svg")  
            .attr("width", 270)
            .attr("height", 270);
       
        /* re-centre the circle to be in the middle of the svg i.e. 270/2 = 135
            note how the ; isn't on the end as this is infact an chain of objects. 
            This is common in d3 */
        var group = canvas.append("g") 
            .attr("transform", "translate(135, 135)");

// the dial function creates the arc
    function theDial(dialAngle, theColor){

        
        var arc = d3.svg.arc()
        .innerRadius(70)   
        .outerRadius(r)
        .startAngle(0)
        .endAngle(dialAngle); 
    
    
    group.append("path")
        .attr("d", arc)    //  'd' is a path data in svg
        .attr("fill", theColor);   /// theColor depends on the theme
    
       }
       

/********************************************************************/
/***********************      SWITCH  STATE        *****************/
/*  Switch staet checks the sate flag and make sure the next state is called.
Its creates a mini-state machine flow
WE could have stored 'state' in a data attribute in the HTML,
but I decided to use a global variable to keep everything inside JS
*/

function switchState(){

    switch(state) {
    case "ready":
        console.log("the state is = " + state + "\n");
        readyState();
        console.log("**  end of ready state\n");
        break;
            
    case "countdown":
        console.log("the state is = " + state + "\n");
        countdownState();
        minuteCount();
        console.log("**  end of countdown state\n");
        break;
            
     case "teaBreak":
        console.log("the state is = " + state + "\n");    
        teaBreakState();
        teaBreakCountDown(lengthOfteaBreak -1);  // -1 second to round minute down slightly
        console.log("**  end of teaBreak state\n");
        break;       
            
    default:
        alert("ERROR in switchState");
    }
    
    
}


/********************************************************************/
/***********************     FLIP THE THEME        *****************/
function changeTheme(){
    
    if(theme=="blueRed"){
        remove_blueRed_theme();
        dark_theme();
        theme="dark";
    }
    else if(theme=="dark"){
        remove_dark_theme();
        blueRed_theme();
        theme="blueRed";
    }
    
}




/************************************************************************/
/****************    CALCULATE MINS & SECONDS LEFT     ******************/
/*
Both minutes and secods left are calculated twice for countdown and teaBreak
so they have been made into seperate functions
*/
    function minsLeft(seconds){
        return Math.floor(seconds/60);
    }
     
     
    function secsLeft(seconds){
        var wholeMin = Math.floor(seconds/60);
        return seconds - (wholeMin)*60;
    } 
     
     


/**********************************************************************/
/***************     COUNTDOWN & TEA BRAEK TIMERS      ****************/
/*
Idealy this and the teabreak counter should be merged to make the code
more 'dry' (don't repeate yourself).
I'd probaly do this on a future update but since there isn't too much code,
however for simplisity for now I've kept ech timer seperate.
*/

/***  Promodo Countdown *****/
    function countDown(secs){
        
        console.log("seconds count " + secs + "\n");
        // remember 'secs' is seconds remaining
        
        var angleOfTimeUsed = 6.283 - (secs/(lengthOfPromodo*9.55));
        // Calculate angles for time used so far, in radians
         
        console.log("angleOfTimeUsed = " + angleOfTimeUsed + "\n");
        
         theDial(angleOfTimeUsed, function(){ return((theme=="dark")?googleGrey500:googleRed500);});  /// draw dial svg
        
        if(secs < 60){
            secondsLabel_countdown_id.setAttribute('data-mins_secs_note', "on");
            minutesLabel_countdown_id.setAttribute('data-mins_secs_note', "off");
            promodoCountingDown.innerHTML = secsLeft(secs);
            }
        
        if(secs > 60){
            secondsLabel_countdown_id.setAttribute('data-mins_secs_note', "off");
            minutesLabel_countdown_id.setAttribute('data-mins_secs_note', "on");
            promodoCountingDown.innerHTML = minsLeft(secs)+1;  // +1 so rounded up to the nearest whole minute
            }
        
        
        if((secs < 1) || (state!="countdown")) {
		  clearTimeout(timer);
            
          breakTimeSound.play();
        
          d3.select("#counterGraphic_counting").selectAll("svg > g > *").remove(); // remove the paths drawn but nothing else
          state = "teaBreak";
            
          console.log("TIMER FINISHED");
          
          switchState(); /* this dosn't feel right but can't see another way */
       }
        
        
	   else if(secs >= 1){ 
           secs--;
           var timer = setTimeout('countDown('+ secs +')',1000);
           }

        
 }


/***  teaBreak Countdown *****/

    function teaBreakCountDown(secs){
        
        console.log("teaBreak seconds count " + secs + "\n");
        
        if((secs < 60)){
            secondsLabel_teaBreak_id.setAttribute('data-mins_secs_note', "on");
            minutesLabel_teaBreak_id.setAttribute('data-mins_secs_note', "off");
            promodoTeadBreakTime.innerHTML = secsLeft(secs);
            }
        
        if((secs > 60)){
            secondsLabel_teaBreak_id.setAttribute('data-mins_secs_note', "off");
            minutesLabel_teaBreak_id.setAttribute('data-mins_secs_note', "on");
            promodoTeadBreakTime.innerHTML = minsLeft(secs)+1;  // +1 so rounded up to the nearest whole minute
            }
        
        
        if((secs < 1) || (state!="teaBreak")) {
		  clearTimeout(timer);
          state = "ready";
          console.log("TIMER FINISHED");
          console.log("the state is = " + state + "\n");
            switchState(); /* this dosn't feel right but can't see another way */
       }
        
        
	   else if(secs >= 1){ 
           secs--;
           var timer = setTimeout('teaBreakCountDown('+ secs +')',1000); 
           }
  
 }



/****** Minute Count *************/
/*
Part of the countdown sate. 
The minute count finds the number of second required 
to countdown, then counts down
*/


    function minuteCount() {
        var secondsCount = (lengthOfPromodo * 60) - 1;  // take off one second
        startSound.play();
        countDown(secondsCount);
        console.log("minute count finished **\n");
   }



/**********************************************************************/
/***************     COUNTDOWN & TEA BREAK TIMERS      ****************/
/*
Rather than having lots od addEvenListers, the event bubbling handling technique was employed.
see page  260 and 331 of "JavaScript and JQuery: Interactive Front-End Web Development" 

http://javascriptbook.com/code/c07/event-delegation.html
http://javascriptbook.com/code/c07/js/event-delegation.js

and also
http://javascriptbook.com/code/c07/event-delegation.html
http://javascriptbook.com/code/c07/js/event-delegation.js
*/

function checkInput(theID){
    
    console.log("theLabel  " + theID + "\n");
    
    switch(theID) {
            
    /********** Ready state  **********/        
    case "mainInfo_ready":
        state="countdown";
        switchState();
        break; 
            
    case "promodoTimeLength":
        state="countdown";
        switchState();
        break;     
            
    case "pausedNote":
        state="countdown";
        switchState();
        break;   
            
            
    case "wholeDonutGraphic":
        state="countdown";
        switchState();
        break;   

            
    /********** countdown state  **********/
    case "taskDoneButt":
        state="teaBreak";
        switchState();
        break;  
            
    case "taskDoneButt_svg":
        state="teaBreak";
        switchState();
        break;  
            
    case "taskDoneButt_svg_use":
        state="teaBreak";
        switchState();
        break;  
                   
            
    /********** teaBreak state  **********/   
    case "skipBreakButt":
        state="ready";
        switchState();
        break;                        
    
            
    case "skipBreakButt_svg":
        state="ready";
        switchState();
        break;     
            
            
    case "skipBreakButt_svg_use":
        state="ready";
        switchState();
        break;     
            
    /********** teaBreak state  **********/                  
    case "themeButt":
         changeTheme();  
         break;
            
     case "themeButt_svg":
         changeTheme();  
         break;                 
            
     case "themeButt_svg_use":
         changeTheme();  
         break;           
            
            
    default:
        break;
    }
    
    
}




            
function initialize(){

    /* Initalise the 'theme' global variable 'blueRed' */
    
    theme="blueRed";
    change_theme(theme); // make sure taskDone and skipBreak buttons set properly
    
    //Initialise the data-state attribute to READY state
    state = "ready";
    switchState();
    
    lengthOfPromodo = 20;
    
    lengthOfteaBreak = 4 * 60;   /* tea break length in seconds to reduce functions usage */
    
    promodoTimeLength.innerHTML =  lengthOfPromodo;
    
}





/******
Reference for make range input work in js
http://stackoverflow.com/questions/18544890/onchange-event-on-input-type-range-is-not-triggering-in-firefox-while-dragging
*******/

var rangeListener = function() {
    window.requestAnimationFrame(function() {
        promodoTimeLength.innerHTML = promodiInput.value;
        lengthOfPromodo = promodiInput.value;
        });
    };

    promodiInput.addEventListener("mousedown", function() {
        rangeListener();
        promodiInput.addEventListener("mousemove", rangeListener);
    });
    
    promodiInput.addEventListener("mouseup", function() {
        promodiInput.removeEventListener("mousemove", rangeListener);
    });




/*********   EVENT ID BUBBLING   *****************/
/*
This function identifies click events and uses the 
event object 'e' built into the web browser.
The ID is checked using a switch case statement above
*/
$('.page').on('click',function(e) {
      
    console.log(e.target.id);
    
    checkInput(e.target.id);
    
    
    }
);


/*******  INITALISE when all code has downloaded  ********/

window.onload = function() {
    
  initialize();
};