const form = document.getElementById("form");
const username = document.getElementById("username");
const subject = document.getElementById("subject");
const email = document.getElementById("email");
const msg = document.getElementById("msg");
const container = document.querySelector(".container");

form.addEventListener('submit', (e) => {
    e.preventDefault();

    checkInputs();
});

function checkInputs() {
    const usernameValue = username.value;
    const subjectValue = subject.value;
    const emailValue = email.value;
    const msgValue = msg.value;

    if (usernameValue === "") {
        setErrorFor(username, "Name is required.");
    } else {
        setSuccessFor(username);
    }

    if (subjectValue === "") {
        setErrorFor(subject, "Subject is required.");
    } else if (subjectValue.length < 5) {
        setErrorFor(subject, "Must have at least 5 characters.");
    } else {
        setSuccessFor(subject);
    }

    if (emailValue === "") {
        setErrorFor(email, "Email is required.");
    } else if (!checkEmail(emailValue)) {
        console.log("invalido");
        setErrorFor(email, "Please insert a valid email.");
    } else {
        console.log("valido");
        setSuccessFor(email);
    }

    if (msgValue === "") {
        setErrorFor(msg, "Message is required.");
    } else if (msgValue.length < 15) {
        setErrorFor(msg, "Must have at least 15 characters.");
    } else {
        setSuccessFor(msg);
    }
    

    const formControls = form.querySelectorAll(".form-control");

    const formIsValid = [...formControls].every((formControl) => {
      return formControl.className == "form-control success";
    });

    if (formIsValid) {
        container.innerHTML = `<div class="contact-success">
      <h1>THANK YOU!</h1>
      <p>
        We will be in contact with you shortly.
      </p>
      <a class="button-watch" href="index.html">BACK TO HOMEPAGE</a></div>`

    } else {
        console.log("Form is invalid");
    }
}

function setErrorFor(input, message, isTextArea = false) {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");

    small.innerText = message;
    input.style.borderColor = "#e74c3e";
    formControl.className = "form-control error";
};

function setSuccessFor(input, isTextArea = false) {
    const formControl = input.parentElement;
    input.style.borderColor = "#2ecc71";
    formControl.className = "form-control success";
};

function checkEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
    );
};

msg.style.borderColor = "darkgrey";