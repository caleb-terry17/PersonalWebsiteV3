// javascript for home page

///////////////////
// global variables
///////////////////

// hold id for picture cycle
let imageCycleId;

// hold index of current image
let imageCycleIdx = 0;

///////////////////
// cycle through pictures on home page 
///////////////////

// will start image cycle
function startPictureCycle() {
    // resetting cycle idx count to 0
    imageCycleIdx = 0;
    // setting homepage img
    document.images["homepageImg"].src = "images/homepageBackground" + imageCycleIdx + ".JPG";
    // starting cycle of pictures (every 4 seconds)
    imageCycleId = setInterval(function () {
        document.images["homepageImg"].src = "images/homepageBackground" + (++imageCycleIdx) % 5 + ".JPG";  // 5 is the current # of pictures to iterate through
    }, 3000);
}

// will stop time loop after unload
function stopPictureCycle() {
    clearInterval(imageCycleId);
}

///////////////////
// get y positions of elements
///////////////////

let headerPos;
let portfolioPos;
let experiencePos;

// event listener to track scrolling
window.addEventListener("scroll", updateNav, false);

// gets the position of the element input
function getPosition(elem) {
    var yPos = 0;
   
    while (elem) {
        // update y position
        yPos += (elem.offsetTop - elem.scrollTop + elem.clientTop);
        elem = elem.offsetParent;
    }
    return yPos;
}

// retrieves and sets the position of each section 
function setPositions() {
    headerPos = getPosition(document.getElementById("homeSection"));
    portfolioPos = getPosition(document.getElementById("portfolioSection"));
    experiencePos = getPosition(document.getElementById("experienceSection"));
}

// updates the nav item that is highlighted
function updateNav() {
    let currPos = document.documentElement.scrollTop;
    console.log("curr: " + currPos);
    console.log("port: " + portfolioPos);
    if (currPos < portfolioPos) { highlightHeader("home"); }
    else if (currPos < experiencePos) { highlightHeader("portfolio"); }
    else { highlightHeader("experience"); }
}

///////////////////
// nav bar highlighting text feature
///////////////////

// will change current page header text to be highlighted 
function highlightHeader(page) {
    // resetting all to default color
    document.getElementById("home").style.color = localStorage.getItem("color3");
    document.getElementById("portfolio").style.color = localStorage.getItem("color3");
    document.getElementById("experience").style.color = localStorage.getItem("color3");
    // setting current page header color
    document.getElementById(page).style.color = localStorage.getItem("color2");
}