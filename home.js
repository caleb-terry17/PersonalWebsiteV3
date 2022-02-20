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