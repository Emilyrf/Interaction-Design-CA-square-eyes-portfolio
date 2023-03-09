cart = JSON.parse(localStorage.getItem("cart"));
document.getElementById("cartAmount").innerText = cart.length;