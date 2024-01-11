let infoParagraph = document.getElementById('info');
let colorOptions = [];
let targetColor;
let gameOver = false;
document.getElementById('input').value = 3
function generateRandomHexColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function removeColorButtons() {
    let colorButtonsContainer = document.getElementById('color-buttons');
    while (colorButtonsContainer.firstChild) {
        colorButtonsContainer.removeChild(colorButtonsContainer.firstChild);
    }
}
function resetGame() {
    infoParagraph = document.getElementById('info');
    infoParagraph.textContent = '';
    setupGame();
}
function setupGame() {
    gameOver = false;
    let dificulty = document.getElementById('input').value
    let targetColorDiv = document.getElementById('target-color');
    let hexCodeDiv = document.getElementById('hex-code');
    let colorButtonsContainer = document.getElementById('color-buttons');
    infoParagraph = document.getElementById('info');
    removeColorButtons();
    targetColor = generateRandomHexColor();
    targetColorDiv.style.backgroundColor = 'white';
    hexCodeDiv.textContent = targetColor;
    let random = Math.floor(Math.random() * dificulty)
    for (let i = 0; i < dificulty; i++) {
        let randomColor = generateRandomHexColor();
        let button = document.createElement('button');
        button.className = 'color-button';
        button.id = "button"+i;
        if (i === random) {
            button.style.backgroundColor = targetColor;
        }else{
            button.style.backgroundColor = randomColor;
        }
        button.addEventListener('click', function () {
            checkGuess(this);
        });
        colorButtonsContainer.appendChild(button);
    }
}
function checkGuess(button){
    if (gameOver) {
        return;
    }
    let targetColorRgb = hexToRgb(targetColor)
    if(button.style.backgroundColor===targetColorRgb){
        info.textContent = "congratulation you won";
        gameOver = true;  
    }else{
        info.textContent = "L skill isue bozo";
        button.style.display = "none";
    }
}

function getRgb(hex) {
hex = hex.replace(/^#/, '');
let bigint = parseInt(hex, 16);
let r = (bigint >> 16) & 255;
let g = (bigint >> 8) & 255;
let b = bigint & 255;
return [r, g, b];
}

function rgbToHex(rgb) {
let values = rgb.substring(4, rgb.length - 1).split(',').map(value => parseInt(value));
return '#' + values.map(component => {
    let hex = component.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
}).join('');
}
function hexToRgb(hex) {
hex = hex.replace(/^#/, '');
let bigint = parseInt(hex, 16);
let r = (bigint >> 16) & 255;
let g = (bigint >> 8) & 255;
let b = bigint & 255;
return `rgb(${r}, ${g}, ${b})`;
}
window.addEventListener('load', function () {
    setupGame();
});