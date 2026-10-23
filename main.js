// References to DOM Elements
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const book = document.querySelector("#book");

const paper1 = document.querySelector("#p1");
const paper2 = document.querySelector("#p2");
const paper3 = document.querySelector("#p3");

// Background Layers
const bgLayers = [
    document.querySelector("#bg1"),
    document.querySelector("#bg2")
];

// Background Images
const backgroundImages = [
    "./images/bg1.jpg",
    "./images/bg2.jpg",
    "./images/bg3.jpg",
    "./images/bg4.jpg"
];

let backgroundIndex = 0;
let activeBgLayer = 0;

// Set Initial Background
bgLayers[0].style.backgroundImage =
    `url("${backgroundImages[0]}")`;

// Preload Background Images
backgroundImages.forEach((src) => {
    const img = new Image();
    img.src = src;
});

// Change Background Smoothly
function changeBackground(direction) {
    backgroundIndex =
        (backgroundIndex + direction + backgroundImages.length)
        % backgroundImages.length;

    const nextBgLayerIndex = 1 - activeBgLayer;
    const nextBgLayer = bgLayers[nextBgLayerIndex];

    nextBgLayer.style.backgroundImage =
        `url("${backgroundImages[backgroundIndex]}")`;

    nextBgLayer.classList.add("active");
    bgLayers[activeBgLayer].classList.remove("active");

    activeBgLayer = nextBgLayerIndex;
}

// Event Listeners
prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);

// Book Logic
let currentLocation = 1;
let numOfPapers = 3;
let maxLocation = numOfPapers + 1;

// Open Book

function openBook() {
    book.style.transform = "translateX(50%)";

    // Calculate arrow movement based on the book's size
    const arrowShift = book.offsetWidth / 2 + 5;

    prevBtn.style.transform = `translateX(-${arrowShift}px)`;
    nextBtn.style.transform = `translateX(${arrowShift}px)`;
}

// Close Book
function closeBook(isAtBeginning) {
    if (isAtBeginning) {
        book.style.transform = "translateX(0%)";
    } else {
        book.style.transform = "translateX(100%)";
    }

    prevBtn.style.transform = "translateX(0px)";
    nextBtn.style.transform = "translateX(0px)";
}

// Next Page
function goNextPage() {
    if (currentLocation < maxLocation) {
        switch (currentLocation) {
            case 1:
                openBook();
                paper1.classList.add("flipped");
                paper1.style.zIndex = 1;
                break;

            case 2:
                paper2.classList.add("flipped");
                paper2.style.zIndex = 2;
                break;

            case 3:
                paper3.classList.add("flipped");
                paper3.style.zIndex = 3;
                closeBook(false);
                break;

            default:
                return;
        }

        // Change to the next background
        changeBackground(1);

        currentLocation++;
    }
}

// Previous Page
function goPrevPage() {
    if (currentLocation > 1) {
        switch (currentLocation) {
            case 2:
                closeBook(true);
                paper1.classList.remove("flipped");
                paper1.style.zIndex = 3;
                break;

            case 3:
                paper2.classList.remove("flipped");
                paper2.style.zIndex = 2;
                break;

            case 4:
                openBook();
                paper3.classList.remove("flipped");
                paper3.style.zIndex = 1;
                break;

            default:
                return;
        }

        // Return to the previous background
        changeBackground(-1);

        currentLocation--;
    }
}