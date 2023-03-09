const form = document.getElementById("form");
const cardNumber = document.getElementById("ccn");
const cardHolder = document.getElementById("cch");
const cvv = document.getElementById("cvv");
const cardExpiry = document.getElementById("cardExpiry")
const container = document.querySelector(".container")

form.addEventListener('submit', (e) => {
    e.preventDefault();

    checkCardInputs();
});

function checkCardInputs() {
    const cardNumberValue = cardNumber.value;
    const cardHolderValue = cardHolder.value;
    const cvvValue = cvv.value;
    const expiryValue = cardExpiry.value;

    if (cardNumberValue === "") {
        setErrorFor(cardNumber, "Please fill card number.");
    } else {
        setSuccessFor(cardNumber);
    }

    if (cardHolderValue === "") {
        setErrorFor(cardHolder, "Please fill the name on the card.");
    } else {
        setSuccessFor(cardHolder);
    }

    if (cvvValue === "") {
        setErrorFor(cvv, "Please fill the cvv number.");
    } else if (cvvValue.length < 3) {
        setErrorFor(cvv, "Must be the 3 numbers on the back of the card");
    } else {
        setSuccessFor(cvv);
    }

    if (expiryValue === "") {
        setErrorFor(cardExpiry, "Please fill expiration date of the card.");
    } else if (expiryValue.length < 4) {
        setErrorFor(cardExpiry, "Please fill expiration date of the card.");
    } else {
        setSuccessFor(cardExpiry);
    }

    const formControls = form.querySelectorAll(".form-control");

    const formIsValid = [...formControls].every((formControl) => {
        return formControl.className == "form-control success";
    });

    if (formIsValid) {
        container.innerHTML = `<div class="pay-success">
      <h1>THANK YOU!</h1>
      <p>
        With your purchase you are supporting filmmakers all over the world!
      </p>
      <a class="button-watch" href="index.html">START WATCHING</a></div>`

    } else {
        console.log("Form is invalid");
    }
}



function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");

    small.innerText = message;
    input.style.borderColor = "#e74c3e";
    formControl.className = "form-control error";
};

function setSuccessFor(input) {
    const formControl = input.parentElement;
    input.style.borderColor = "#2ecc71";
    formControl.className = "form-control success";
};