const form = document.getElementById("form");
const username = document.getElementById("name");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");
const telephone = document.getElementById("tel");

form.addEventListener("submit", function(e){

    const isRequiredValid = checkRequired([username, email, subject, message, telephone]);
    let isFormValid = isRequiredValid;
    if(isRequiredValid){
        const isUsernameValid = checkLength(username, 5, 20);
        const istelephoneValid = checkPhoneN(telephone, 10);
        const isEmailValid = checkEmail(email);
        const isSubjectValid = checkLength(subject, 5, 50);
        const isMessageValid = checkLength(message, 10, 500);

        isFormValid = isUsernameValid && isEmailValid && isSubjectValid && isMessageValid && istelephoneValid;  
    }
    
    if(isFormValid){
        alert("Message sent successfully!");
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
    }
    else if(input.value.length > max){
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
        else
            showSuccess(element);
    });
    return isValid;
}

function getFieldName(element){
    return element.id.charAt(0).toUpperCase() + element.id.slice(1);
}

function checkEmail(input){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())){
        showSuccess(input);
        return true;
    }
    showError(input, "Email is not valid");
    return false;
}

function checkPhoneN(input, length){
    const re = /^\d+$/;
    if(re.test(input.value.trim()) && input.value.trim().length === length){
        showSuccess(input);
        return true;
    }
    showError(input, `Phone number must be ${length} digits long and contain only numbers`);
    return false;
}

function showError(element, message){
    const formGroup = element.parentElement;
    formGroup.className = "form-group error";
    alert(message);
}

function showSuccess(element){
    const formGroup = element.parentElement;
    formGroup.className = "form-group success";
}