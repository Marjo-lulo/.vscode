const form = document.getElementById("registration-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");

form.addEventListener("submit", function (e){
    e.preventDefault();
    

    const isRequiredValid = checkRequired([username, email, password, confirmPassword]);

    let isFormValid = isRequiredValid;
    if(isRequiredValid){
        const isUsernameValid = checkLength(username, 3, 15);
        const isEmailValid = checkEmail(email);
        const isPasswordValid = checkLength(password, 6, 25);
        const isConfirmPasswordValid = checkPasswordsMatch(password, confirmPassword);

        isFormValid = isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid;
    }
    
    if(isFormValid){
        alert("Registration successful!");
        form.reset();

        document.querySelectorAll(".form-group").forEach(group => {
            group.className = "form-group";
        });
    }
});

function checkLength(input, min, max){
    if(input.value.length < min){
        showError(input, `${getFieldName(input)} must be at least ${min} characters long`);
        return false;
    }else if(input.value.length > max){
        showError(input, `${getFieldName(input)} must be less than ${max} characters long`);
        return false;
    }
    return true;
}

function checkRequired(inputArr){
    let isValid = true;
    inputArr.forEach(element => {
        if(element.value.trim() === ""){
            showError(element, `${getFieldName(element)} is required`);
            isValid = false;
        }
        else{
            showSuccess(element);
        }
    });
    return isValid;
}

function getFieldName(element){
    return element.id.charAt(0).toUpperCase() + element.id.slice(1);
}

function checkPasswordsMatch(password, confirmPassword){
    if(password.value !== confirmPassword.value){
        showError(confirmPassword, "Passwords do not match");
        return false;
    }
    return true;
}

function checkEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(email.value.trim())){
        showSuccess(email);
        return true;
    }else{
        showError(email, "Email is not valid");
        return false;
    }
}

function showError(element, message){
    const formGroup = element.parentElement;
    formGroup.className = "form-group error";
    const small = formGroup.querySelector("small");
    small.innerText = message;
}

function showSuccess(element){
    const formGroup = element.parentElement;
    formGroup.className = "form-group success";
}