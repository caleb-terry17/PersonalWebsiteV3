// global JavaScript tasks

///////////////////
// global variables
///////////////////

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
    // "#5690E6" : "#800000",
    // "#800000": "#5690E6",
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

    // testing::delete
    // localStorage.setItem("color2", "#FEFE0E");
    // localStorage.setItem("color2", "#5690E6"); 
    // localStorage.setItem("color3", "#000000");
    // localStorage.setItem("color4", "#FFF"); 
    // localStorage.setItem("colorIconDesc", "(dark)");
    // console.log(localStorage.getItem("color1"));
    // console.log(localStorage.getItem("color2"));
    // console.log(localStorage.getItem("color3"));
    // console.log(localStorage.getItem("color4"));

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
// hover effect on current page tab
///////////////////

// will change current page header text to be highlighted 
function highlightHeader(page) {
    // setting current page header color
    document.getElementById(page).style.color = localStorage.getItem("color2");
}