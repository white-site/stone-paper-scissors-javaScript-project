let com = document.querySelector(".com"); // Selects the container for the computer's images
let newGame = document.querySelector("#newGame"); // Selects the "New Game" button
let user = document.querySelectorAll(".User"); // Selects all the user's choice images (stone, paper, scissors)
let stone = document.querySelector(".stone"); // Selects the computer's stone image
let paper = document.querySelector(".paper"); // Selects the computer's paper image
let sesiorr = document.querySelector(".sesiorr"); // Selects the computer's scissors image
let mymode = document.querySelector("#mode"); // Selects the "change mode" button
let paragraph = document.querySelectorAll('p'); // Selects all paragraph elements on the page
let userScore = document.querySelector("#user-score"); // Selects the user's score display
let compScore = document.querySelector("#comp-score"); // Selects the computer's score display
let draw = document.querySelector("#Draw"); // Selects the draw count display
let Stext = document.querySelector("#Stext"); // Selects the status text display (e.g., "You win!")

// --- Game State Variables ---
let us = 0; // Tracks the user's score
let cs = 0; // Tracks the computer's score
let Draw = 0; // Tracks the number of draws
let curmode = "light"; // Keeps track of the current color mode

// --- Initial Setup ---
// These lines remove the CSS classes from the computer's images to ensure they don't have initial styling before the game starts.
stone.classList.remove("stone");
paper.classList.remove("paper");
sesiorr.classList.remove("sesiorr");

// --- Event Listeners ---

// Event listener for the "New Game" button
newGame.addEventListener("click", () => {
    removeCss(); // Clears any highlight on the computer's last choice
    draw.innerHTML = 0; // Resets the draw count on the screen
    userScore.innerHTML = 0; // Resets the user's score on the screen
    compScore.innerHTML = 0; // Resets the computer's score on the screen
    Stext.innerHTML = "New Game Start"; // Updates the status message
});

// Event listener for the "change mode" button
mymode.addEventListener("click", () => {
    // Check if the current mode is light
    if (curmode === "light") {
        document.querySelector("body").style.backgroundColor = 'black'; // Change body background to black
        paragraph.forEach((p) => {
            p.style.color = "white"; // Change all paragraph text to white
        });
        curmode = "dark"; // Update the mode variable
    } else { // If the current mode is dark
        curmode = "light"; // Update the mode variable
        paragraph.forEach((p) => {
            p.style.color = "black"; // Change all paragraph text to black
        });
        document.querySelector("body").style.backgroundColor = '#ADD8E6'; // Change body background to light blue
    }
});

// Event listener for each of the user's choice images
user.forEach((input) => {
    input.addEventListener("click", () => {
        removeCss(); // Remove the highlight from the previous computer choice
        let Comchoices = ComputerInput(); // Get the computer's random choice
        let userInput = input.getAttribute("id"); // Get the user's choice by its id (e.g., "stone")

        // Apply a CSS class to the computer's corresponding image to highlight its choice
        if (Comchoices == "stone") {
            stone.classList.add("stone");
        } else if (Comchoices == "paper") {
            paper.classList.add("paper");
        } else {
            sesiorr.classList.add("sesiorr");
        }

        playGame(userInput, Comchoices); // Call the main game logic function with both choices
    });
});

// --- Game Functions ---

// Function to remove all highlighting classes from the computer's images
const removeCss = () => {
    stone.classList.remove("stone");
    paper.classList.remove("paper");
    sesiorr.classList.remove("sesiorr");
};

// Function to generate the computer's random choice
const ComputerInput = () => {
    const choices = ["stone", "paper", "Scissor"]; // Array of possible choices
    const randInx = Math.floor(Math.random() * 3); // Generate a random index (0, 1, or 2)
    return choices[randInx]; // Return the choice at the random index
};

// Main game logic function to determine the winner
const playGame = (userInput, Comchoices) => {
    // If it's a draw
    if (userInput === Comchoices) {
        gameDraw();
    } else { // If it's not a draw, determine who wins
        let Uwin = true; // Assume the user wins initially
        if (userInput === "stone") {
            // User wins against scissors, loses against paper
            Uwin = Comchoices === "paper" ? false : true;
        } else if (userInput === "paper") {
            // User wins against stone, loses against scissors
            Uwin = Comchoices === "Scissor" ? false : true;
        } else { // User chose "Scissor"
            // User wins against paper, loses against stone
            Uwin = Comchoices === "stone" ? false : true;
        }
        showWinner(Uwin); // Call the function to update the score and message
    }
};

// Function to update the score and display the result message
const showWinner = (UWin) => {
    if (UWin) {
        us++; // Increment user's score
        userScore.innerHTML = us; // Update user score display
        Stext.innerHTML = "You win"; // Display win message
    } else {
        cs++; // Increment computer's score
        compScore.innerHTML = cs; // Update computer score display
        Stext.innerHTML = "You lose"; // Display lose message
    }
};

// Function to handle a draw
const gameDraw = () => {
    Draw++; // Increment draw count
    draw.innerHTML = Draw; // Update draw count display
    Stext.innerHTML = "Game is Draw"; // Display draw message
};