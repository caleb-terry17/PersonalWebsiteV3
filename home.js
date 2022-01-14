// javascript for home page

///////////////////
// global variables
///////////////////

// hold id for picture cycle
let imageCycleId;

// hold index of current image
let imageCycleIdx = 0;

// to reference the icon item
let navIcon = document.getElementById("navIcon");

// to reference the icon for toggling colors
let colorIcon = document.getElementById("colorIcon");

// to reference the inner text next to color icon
let colorIconDesc = document.getElementById("colorIconDesc");

// to hold value of style sheet
let style = document.documentElement.style;

// for easy reference to change navIcon classes
let icons = {
    "fa fa-bars": "fa fa-times",
    "fa fa-times": "fa fa-bars",
    "fa fa-moon-o": "fa fa-lightbulb-o",
    "fa fa-lightbulb-o": "fa fa-moon-o"
}

// to hold colors for easy swaps
let colors = {
    "#5690E6" : "#FEFE0E",
    "#FEFE0E": "#5690E6",
    "#FFF": "#000000",
    "#000000": "#FFF"
}

// to hold descriptions for easy swaps
let descriptions = {
    "(dark)": "(light)",
    "(light)": "(dark)"
}

///////////////////
// toggle nav menu icon
///////////////////

// to change nav icon on toggle
function changeIcon() {
    navIcon.className = icons[navIcon.className];
}

///////////////////
// toggle color scheme
///////////////////

// load in current color scheme
function loadToggle() {
    // if values are null >> yet to be set
    if (localStorage.getItem("color1") == null || 
        localStorage.getItem("color2") == null ||
        localStorage.getItem("color3") == null || 
        localStorage.getItem("color4") == null ||
        localStorage.getItem("colorIcon") == null ||
        localStorage.getItem("colorIconDesc") == null ||
        localStorage.getItem("color1") == undefined || 
        localStorage.getItem("color2") == undefined ||
        localStorage.getItem("color3") == undefined || 
        localStorage.getItem("color4") == undefined ||
        localStorage.getItem("colorIcon") == undefined ||
        localStorage.getItem("colorIconDesc") == undefined) { 
        // localStorage.setItem("color1", "#800000");
        localStorage.setItem("color1", "#FEFE0E");
        localStorage.setItem("color2", "#5690E6"); 
        localStorage.setItem("color3", "#000000");
        localStorage.setItem("color4", "#FFF"); 
        localStorage.setItem("colorIcon", "fa fa-moon-o");
        localStorage.setItem("colorIconDesc", "(dark)");
    }

    // color1
    style.setProperty("--color1", localStorage.getItem("color1"));
    // color2
    style.setProperty("--color2", localStorage.getItem("color2"));
    // color3
    style.setProperty("--color3", localStorage.getItem("color3"));
    // color4
    style.setProperty("--color4", localStorage.getItem("color4"));
    // color icon
    colorIcon.className = localStorage.getItem("colorIcon");
    // color icon description
    colorIconDesc.innerHTML = localStorage.getItem("colorIconDesc");
}

// chnage color codes
function invertColors() {
    // setting colors
    localStorage.setItem("color1", colors[style.getPropertyValue("--color1")]);
    localStorage.setItem("color2", colors[style.getPropertyValue("--color2")]);
    localStorage.setItem("color3", colors[style.getPropertyValue("--color3")]);
    localStorage.setItem("color4", colors[style.getPropertyValue("--color4")]);

    // swap(color3, color4)
    style.setProperty("--color1", localStorage.getItem("color1"));
    style.setProperty("--color2", localStorage.getItem("color2"));
    style.setProperty("--color3", localStorage.getItem("color3"));
    style.setProperty("--color4", localStorage.getItem("color4"));

    // swap icon
    colorIcon.className = icons[colorIcon.className];
    // storing icon
    localStorage.setItem("colorIcon", colorIcon.className);

    // swap icon html
    colorIconDesc.innerHTML = descriptions[colorIconDesc.innerHTML];
    // storing new desc
    localStorage.setItem("colorIconDesc", colorIconDesc.innerHTML);
}

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

// NOTE: was messing up the hovering feature, need to fix

// ///////////////////
// // get y positions of elements
// ///////////////////

// let headerPos;
// let portfolioPos;
// let experiencePos;

// // event listener to track scrolling
// window.addEventListener("scroll", updateNav, false);

// // gets the position of the element input
// function getPosition(elem) {
//     var yPos = 0;
//     while (elem) {
//         // update y position
//         yPos += (elem.offsetTop - elem.scrollTop + elem.clientTop);
//         elem = elem.offsetParent;
//     }
//     return yPos;
// }

// // retrieves and sets the position of each section 
// function setPositions() {
//     headerPos = getPosition(document.getElementById("homeSection"));
//     portfolioPos = getPosition(document.getElementById("portfolioSection"));
//     experiencePos = getPosition(document.getElementById("experienceSection"));
// }

// // updates the nav item that is highlighted
// function updateNav() {
//     let currPos = document.documentElement.scrollTop;
//     console.log("curr: " + currPos);
//     console.log("port: " + portfolioPos);
//     if (currPos < portfolioPos) { highlightHeader("home"); }
//     else if (currPos < experiencePos) { highlightHeader("portfolio"); }
//     else { highlightHeader("experience"); }
// }

// ///////////////////
// // nav bar highlighting text feature
// ///////////////////

// // will change current page header text to be highlighted 
// function highlightHeader(page) {
//     // resetting all to default color
//     document.getElementById("home").style.color = localStorage.getItem("color3");
//     document.getElementById("portfolio").style.color = localStorage.getItem("color3");
//     document.getElementById("experience").style.color = localStorage.getItem("color3");
//     // setting current page header color
//     document.getElementById(page).style.color = localStorage.getItem("color2");
// }