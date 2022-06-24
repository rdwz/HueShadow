let firstColour = document.getElementById("gradient-colour-one");
let secondColour = document.getElementById("gradient-colour-two");
let thirdColour = document.getElementById("gradient-colour-three");
let currentDirection = 'to top right';
const gradientCss = document.getElementById("gradient-output-code");

document.getElementsByTagName("body")[0].style.backgroundImage = `linear-gradient(${currentDirection}, ${firstColour.value.toString().toUpperCase()}, ${secondColour.value.toString().toUpperCase()}, ${thirdColour.value.toString().toUpperCase()})`;

// Set direction for the gradient
function setDirection(value, _this) {
    const directions = document.querySelectorAll(".gradient-direction-options button");
    for(let i of directions) {
        i.classList.remove("active");
    }
    _this.classList.add("active");
    currentDirection = value;
}

// Generate a gradient, apply to background and insert code on the screen
function generateGradient() {
    if(currentDirection == "radial") {
        gradientCss.innerText = `background: radial-gradient(${firstColour.value.toString().toUpperCase()}, ${secondColour.value.toString().toUpperCase()}, ${thirdColour.value.toString().toUpperCase()});`

        document.getElementsByTagName("body")[0].style.backgroundImage = `radial-gradient(${firstColour.value.toString().toUpperCase()}, ${secondColour.value.toString().toUpperCase()}, ${thirdColour.value.toString().toUpperCase()})`;
    } else {
        gradientCss.innerText = `background: linear-gradient(${currentDirection}, ${firstColour.value.toString().toUpperCase()}, ${secondColour.value.toString().toUpperCase()}, ${thirdColour.value.toString().toUpperCase()});`

        document.getElementsByTagName("body")[0].style.backgroundImage = `linear-gradient(${currentDirection}, ${firstColour.value.toString().toUpperCase()}, ${secondColour.value.toString().toUpperCase()}, ${thirdColour.value.toString().toUpperCase()})`;
    }
}

// Generate a random gradient
function generateRandomGradient() {
    firstColour.value = generateRandomHex();
    secondColour.value = generateRandomHex();
    thirdColour.value = generateRandomHex();
    generateGradient();
}

// Generate random hex code
function generateRandomHex() {
    const chars = '0123456789ABCDEF';
    let hex = "#";
    for(let i = 0; i < 6; i++) {
        hex += chars[Math.floor(Math.random() * 16)];
    }

    return hex;
}

// Change gradient when spacebar is pressed
document.addEventListener("keypress", (e) => {
    generateRandomGradient();
})

// Add functionality to copy the generated CSS code
function copyGradientCSS() {

    const textarea = document.createElement("textarea");
    textarea.value = gradientCss.innerText;
    document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	textarea.remove();

    document.getElementById("gradient-output-code-copied").style.display = "inline-block";
    gradientCss.style.opacity = 0.2;
    
    setTimeout(() => {
        gradientCss.style.opacity = 1;
        document.getElementById("gradient-output-code-copied").style.display = "none";
    }, 1000);
}