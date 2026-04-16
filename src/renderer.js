// DOM Reference
// Map out where the interactions/mechanics occurs to send and receive signals.
// Get buttons
const hideButton = document.getElementById("hideButton");
const exitButton = document.getElementById("exitButton");
const startButton = document.getElementById("startButton");
const endButton = document.getElementById("endButton");

// Get data from user input
// WARNING HTML inputs always return strings (text)!
// You must use parseInt() to convert the string (text) into an integer. 
// Parse will be completed inside of the event listeners.
const hoursInput = document.getElementById("hours");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");

// When the start button is clicked on, the button will change to "Pause".
// Get the element containing the start button's content "Start".
// Use 'querySelector()' method to find and select the element.
const startButtonSpan = startButton.querySelector("span");

// Event handling
// Set-up a (event) listener for the buttons.
startButton.addEventListener("click", () => {
    const currentButtonStatus = startButtonSpan.textContent; 

    if (currentButtonStatus === "Start") {
        // ACTION: Start the timer.
        startButtonSpan.textContent = "Pause";
        // When clicking the start button will send a message or log to console.
        console.log("Start button clicked.");
        console.log("Timer has started.");
    }
    else if (currentButtonStatus === "Resume") {
        startButtonSpan.textContent = "Pause";
        // When clicking the resume button will send a message or log to console.
        console.log("Resume button clicked.");
        console.log("Timer has resumed.");
    }
    else if (currentButtonStatus === "Pause") {
        // ACTION: Freeze the timer.
        startButtonSpan.textContent = "Resume";
        console.log("Pause button clicked");
        console.log("Time is paused.");
    }

    // 'let' is a variable declaration.
    //'let' tell the computer to remember a piece of information that might change later.
    // 'const' is for data that will never change, 'let' is for data that do/could change.
    
    // '|| 0' is a logical OR with a Default Value.
    // If the user is lazy and does not fill in the the inputs, parseInt() will return 
    // NaN (Not a Number), which can break the app because NaN + 10 is not possible.
    // Thus, if the box is empty or the input fails, the computer will default to using 0.

    // Gets the data user input and parse it.
    let hours = parseInt(hoursInput.value) || 0;
    let minutes = parseInt(minutesInput.value) || 0;
    let seconds = parseInt(secondsInput.value) || 0;
});

endButton.addEventListener("click", () => {
    // When clicking the end button will send a message or log to console.
    console.log("End button clicked.");

    startButtonSpan.textContent = "Start";
    hoursInput.value = "";
    minutesInput.value = "";
    secondsInput.value = "";
    console.log("Timer has ended and has been reset to Start.");
});

hideButton.addEventListener("click", () => {
    // When clicking the hide button will send a message or log to console.
    console.log("Hide button clicked.");
});

exitButton.addEventListener("click", () => {
    // When clicking the exit button will send a message or log to console.
    console.log("Exit button clicked.");
});