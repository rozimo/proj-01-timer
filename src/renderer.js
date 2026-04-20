// Global scope
let timerInterval = null; 
// The interval will be in seconds because hours will convert 
// to minutes and minutes will convert to seconds.
let totalSeconds = 0;

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

// Get click sound for the buttons.
const clickSound = document.getElementById("clickSound");
// Get end timer sound.
const endSound = document.getElementById("endSound");

// Event handling
// Set-up a (event) listener for the buttons.
// The start button is the engine of the timer.
startButton.addEventListener("click", () => {
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
    let inputTotal = (hours * 3600) + (minutes * 60) + seconds;

    const currentButtonStatus = startButtonSpan.textContent;

    if (currentButtonStatus === "Start" && inputTotal <= 0) {
        console.log("Please enter a time before starting.");
        return;
    }

    clickSound.play();

    if (currentButtonStatus === "Start") {
        // ACTION: Start the timer.
        startButtonSpan.textContent = "Pause";
        // When clicking the start button will send a message or log to console.
        console.log("Start button clicked.");
        console.log("Timer has started.");

        // Get the total seconds of user input
        totalSeconds = inputTotal;

        updateTimerDisplay();

        // Create the interval using the method setInterval().
        // The method setInterval() is a timing loop and thinks in milliseconds. 1000 milliseconds == 1 second.
        // In this case, I used setInterval(..., 1000).
        timerInterval = setInterval(() => {
            
            // Update the numbers on screen immediately
            updateTimerDisplay();

            // Check if we hit zero
            if (totalSeconds <= 0) {
                clearInterval(timerInterval);
                timerInterval = null; // Reset the interval variable
                startButtonSpan.textContent = "Start";
                
                endSound.currentTime = 0; // Rewind sound to start
                endSound.play();          // Play sound
                console.log("Timer has ended!");
                return;
            }
            totalSeconds--;
        }, 1000);
    }
    else if (currentButtonStatus === "Resume") {
        clickSound.play();
        startButtonSpan.textContent = "Pause";
        console.log("Timer has resumed.");

        timerInterval = setInterval(() => {
            
            // Update the display
            updateTimerDisplay();

            // Check for end
            if (totalSeconds <= 0) {
                clearInterval(timerInterval);
                timerInterval = null;
                startButtonSpan.textContent = "Start";
                
                endSound.currentTime = 0;
                endSound.play();
                return;
            }
            totalSeconds--;
        }, 1000);
    }
    else if (currentButtonStatus === "Pause") {
        clickSound.play();
        // ACTION: Freeze the timer.
        startButtonSpan.textContent = "Resume";
        console.log("Pause button clicked");
        console.log("Time is paused.");

        clearInterval(timerInterval); 
        timerInterval = null;
    }
});

// The end button is the brakes of the timer.
endButton.addEventListener("click", () => {
    clearInterval(timerInterval);
    timerInterval = null;
    
    clickSound.play();
    // When clicking the end button will send a message or log to console.
    console.log("End button clicked.");

    startButtonSpan.textContent = "Start";
    hoursInput.value = "";
    minutesInput.value = "";
    secondsInput.value = "";
    console.log("Timer has ended and has been reset to Start.");
});

hideButton.addEventListener("click", () => {
    clickSound.play();
    // When clicking the hide button will send a message or log to console.
    console.log("Hide button clicked.");
});

exitButton.addEventListener("click", () => {
    clickSound.play();
    // When clicking the exit button will send a message or log to console.
    console.log("Exit button clicked.");
});

// Update the timer display.
// Logic of transition.
function updateTimerDisplay() {
    // Logic, the math.
    let h = Math.floor(totalSeconds / 3600);
    let m = Math.floor((totalSeconds % 3600) / 60);
    let s = totalSeconds % 60;

    // Rendering, send back the data to the UI
    hoursInput.value = h.toString().padStart(2, '0');
    minutesInput.value = m.toString().padStart(2, '0');
    secondsInput.value = s.toString().padStart(2, '0');
}

// Function to format the input field itself
function formatLeadingZeros(event) {
    let value = event.target.value;
    if (value !== "") {
        // Pads the number to 2 digits (e.g., "1" becomes "01")
        event.target.value = value.toString().padStart(2, '0');
    }
}

// Attach the listener to all three input boxes
hoursInput.addEventListener("blur", formatLeadingZeros);
minutesInput.addEventListener("blur", formatLeadingZeros);
secondsInput.addEventListener("blur", formatLeadingZeros);