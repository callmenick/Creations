( function( window ){

  'use strict';

  // vars
  var spinner = document.querySelector("#spinner__multisquare"),
      frame1 = document.querySelector(".frame1"),
      frame2 = document.querySelector(".frame2"),
      frame3 = document.querySelector(".frame3"),
      frame1BgPath = document.querySelector(".frame__content--pattern-design"),
      frame1BgPathLen = frame1BgPath.getTotalLength(),
      frame2BgPath = document.querySelector(".frame__content--pattern-function"),
      frame2BgPathLen = frame2BgPath.getTotalLength(),
      timer = 5000;

  // Cross-browser transition end event listeners using Modernizr
  var transEndEventNames = {
    "WebkitTransition" : "webkitTransitionEnd",
    "MozTransition"    : "transitionend",
    "OTransition"      : "oTransitionEnd",
    "msTransition"     : "MSTransitionEnd",
    "transition"       : "transitionend"
  },
  transEndEventName = transEndEventNames[ Modernizr.prefixed('transition') ];

  // reset background paths
  function resetStroke( path, length ) {
    path.style.strokeDasharray = length + ' ' + length;
    path.style.strokeDashoffset = length;
  }

  // animate path function
  function animatePath( path, animationTime ) {
    path.style.strokeDashoffset = "0";
    path.style.transition = path.style.WebkitTransition = "none";
    path.style.transition = path.style.WebkitTransition = "stroke-dashoffset "+ animationTime +"s linear";
  }

  // init svg paths
  resetStroke( frame1BgPath, frame1BgPathLen );
  resetStroke( frame2BgPath, frame2BgPathLen );

  // on load
  window.onload = function() {
    window.setTimeout( function() {
      spinner.classList.add("hidden");
      frame1.classList.add("frame1__pos1");
    }, 2000 );
  }

  // after frame1 transitions
  frame1.addEventListener( transEndEventName, function() {
    animatePath(frame1BgPath, 4);
    window.setTimeout( function() {
      frame1.classList.add("frame1__pos2");
      frame2.classList.add("frame2__pos1");
    }, timer );
  });

  // after frame2 transitions
  frame2.addEventListener( transEndEventName, function() {
    animatePath(frame2BgPath, 9);
    window.setTimeout( function() {
      frame1.classList.add("frame1__pos3");
      frame2.classList.add("frame2__pos2");
      frame3.classList.add("frame3__pos1");
    }, timer );
  });

  // after frame 3 transitions
  frame3.addEventListener( transEndEventName, function() {
    var subHeadings = frame3.querySelectorAll(".frame__content--alt-subheading");
    for ( var i = 0; i < subHeadings.length; i++ ) {
      var subHeading = subHeadings[i],
          delay = i*500 + 500; //i*1000 + 1000
      frame3Handler( subHeading, delay );
    }
  });

  // frame 3 handler
  function frame3Handler( subHeading, delay ) {
    window.setTimeout( function() {
      subHeading.classList.add("active");
    }, delay );
  }

  // after last subheading transition
  frame3.querySelector(".frame__content--alt-subheading.last").addEventListener( transEndEventName, function() {
    frame3.querySelector(".frame__highlight--container").classList.add("active");
  });

})( window );