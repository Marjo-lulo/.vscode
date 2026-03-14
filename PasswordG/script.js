const passwordInput = document.getElementById('password');
const lengthSlider = document.getElementById('length');
const lengthDisplay = document.getElementById('length-value');
const uppercaseCheckbox = document.getElementById('uppercase');
const lowercaseCheckbox = document.getElementById('lowercase');
const numbersCheckbox = document.getElementById('numbers');
const symbolsCheckbox = document.getElementById('symbols');
const generateButton = document.getElementById('generate-btn');
const copyButton = document.getElementById('copy-btn');
const strengthBar = document.querySelector('.strength-bar');
const strengthText = document.querySelector('.strength-container p');
const strengthLabel = document.getElementById('strength-label');

const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

lengthSlider.addEventListener("input", () => {
    lengthDisplay.textContent = lengthSlider.value;
});

generateButton.addEventListener("click", makePassword);

function makePassword(){
    const length = Number(lengthSlider.value);
    const includeuppercase = uppercaseCheckbox.checked;
    const includelowercase = lowercaseCheckbox.checked;
    const includenumbers = numbersCheckbox.checked;
    const includesymbols = symbolsCheckbox.checked;

    if (!includeuppercase && !includelowercase && !includenumbers && !includesymbols) {
        alert("Please select at least one character type!");
        return;
    }

    const newPassword = createRandomPassword(length, includeuppercase, includelowercase, includenumbers, includesymbols);
    passwordInput.value = newPassword;
    evaluateStrength(newPassword);
}

function createRandomPassword(length, includeuppercase, includelowercase, includenumbers, includesymbols) {
    let allChars = "";
    if(includeuppercase) allChars += uppercaseChars;
    if(includelowercase) allChars += lowercaseChars;
    if(includenumbers) allChars += numberChars;
    if(includesymbols) allChars += symbolChars;

    let password = "";
    for (let i = 0; i < length; i++){
        const randomIndex = Math.floor(Math.random()* allChars.length);
        password += allChars[randomIndex];
    }
    return password;
}

function evaluateStrength(password){
    const passwordLength = password.length;
    const hasUppercase = /[A-Z]/.test([password]);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSymbols = /[!@#$%^&*()_+~`|}{[\]:;?><,./-=]/.test(password);

    let strengthScore = 0;
    strengthScore += Math.min(passwordLength * 2, 40);
    if (hasUppercase) strengthScore += 15;
    if (hasLowercase) strengthScore += 15;
    if (hasNumbers) strengthScore += 15;
    if (hasSymbols) strengthScore += 15;

    if (passwordLength < 8) strengthScore = Math.min(strengthScore, 40);
    const safeScore = Math.max(5, Math.min(100, strengthScore));

    if (strengthScore <= 40) {
        strengthBar.style.width = safeScore + "%";
        strengthBar.style.backgroundColor = "#fc8181";
        strengthLabel.textContent = "Weak";
    }

    else if (strengthScore <= 70){
        strengthBar.style.width = safeScore + "%";
        strengthBar.style.backgroundColor = "#fdb38d";
        strengthLabel.textContent = "Medium";
    }
    
    else{
        strengthBar.style.width = safeScore + "%";
        strengthBar.style.backgroundColor = "#68d391";
        strengthLabel.textContent = "Strong";
    }      
}

window.addEventListener("DOMContentLoaded", makePassword);

copyButton.addEventListener("click", () => {
    if (!passwordInput.value) return;

    navigator.clipboard.writeText(passwordInput.value)
    .then(() => showCopySuccess())
    .catch(() => {
        alert("Failed to copy password.");
    });
});

function showCopySuccess() {
    copyButton.classList.remove("far", "fa-copy");
    copyButton.classList.add("fas", "fa-check");
    copyButton.style.color = "#48bb78";

    setTimeout(() => {
        copyButton.classList.remove("fas", "fa-check");
        copyButton.classList.add("far", "fa-copy");
        copyButton.style.color = "#4a5568";
    }, 1500);
}